import React, {
  Component, Suspense, createContext, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState,
} from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer, MeshReflectorMaterial, useTexture } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { servicesData } from '../config/services';
import { useBooking } from '../context/BookingContext';

gsap.registerPlugin(ScrollTrigger);

const GOLD = '#C8A46A';
const CREAM = '#F2EBDD';
const CHAR = '#14110F';
const INK = '#0B0A09';

const SPACING = 9;
const FIRST_Z = -12;
const N = servicesData.length;
const LAST_Z = FIRST_Z - (N - 1) * SPACING;
const END_Z = LAST_Z - 20;
const exhibitPos = (i: number) => new THREE.Vector3(i % 2 === 0 ? 3.4 : -3.4, 0, FIRST_Z - i * SPACING);

/* ───────────── TUNING (close-up shot) ─────────────
   Camera vertical FOV is 38°, so visible height at distance d ≈ 0.689 * d.
   HERO_SIZE (largest dimension of the hero photo) / (0.689 * CAM_DIST) ≈ share of the viewport height.
   3.2 / (0.689 * 5.2) ≈ 0.89 of height is the *max* dimension; real photos are usually wider than tall,
   so width ends up ≈ 50–60% of a 16:9 viewport. Lower HERO_SIZE or raise CAM_DIST if it feels too big. */
const HERO_Y = 2.1;      // height of the hero photo's centre above the floor
const HERO_SIZE = 3.2;   // world units, largest side of the hero photo
const CAM_DIST = 5.2;    // camera distance in front of the hero when a service is active
const CAM_Y = 2.0;
const LOOK_Y = 1.75;     // looking slightly below the object pushes it up in frame, clear of the text block
const CAM_X_FACTOR = 0.85;
const DEBUG = false;     // true → axes + grid on every exhibit, magenta wireframe where an image failed to load

/* ───────────── hooks ───────────── */
const useMedia = (q: string) => {
  const [v, setV] = useState(() => (typeof window !== 'undefined' ? window.matchMedia(q).matches : false));
  useEffect(() => {
    const mq = window.matchMedia(q);
    const on = () => setV(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [q]);
  return v;
};
const hasWebGL = () => {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
};

/* ───────────── shared geometry / materials (created once, disposed on unmount) ───────────── */
type Ctx = {
  g: Record<'box' | 'ring' | 'disc', THREE.BufferGeometry>;
  m: Record<'dark' | 'mirror' | 'brass' | 'strip', THREE.MeshStandardMaterial>;
};
const SceneCtx = createContext<Ctx>(null!);
const useScene = () => useContext(SceneCtx);

const SceneProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = useMemo<Ctx>(
    () => ({
      g: {
        box: new THREE.BoxGeometry(1, 1, 1),
        ring: new THREE.TorusGeometry(1, 0.06, 12, 64),
        disc: new THREE.CircleGeometry(1, 48),
      },
      m: {
        brass: new THREE.MeshStandardMaterial({ color: GOLD, metalness: 1, roughness: 0.34 }),
        dark: new THREE.MeshStandardMaterial({ color: '#0e0c0a', metalness: 0.6, roughness: 0.4 }),
        mirror: new THREE.MeshStandardMaterial({ color: '#040404', metalness: 1, roughness: 0.08 }),
        strip: new THREE.MeshStandardMaterial({
          color: CREAM, emissive: CREAM, emissiveIntensity: 1.2, toneMapped: false,
        }),
      },
    }),
    []
  );
  useEffect(
    () => () => {
      Object.values(value.g).forEach((x) => x.dispose());
      Object.values(value.m).forEach((x) => x.dispose());
    },
    [value]
  );
  return <SceneCtx.Provider value={value}>{children}</SceneCtx.Provider>;
};

type V3 = [number, number, number];

const Ring: React.FC<{ r: number; p?: V3; rot?: V3 }> = ({ r, p, rot }) => {
  const c = useScene();
  return <mesh geometry={c.g.ring} material={c.m.brass} scale={r} position={p} rotation={rot} />;
};
const Inst: React.FC<{ geo: THREE.BufferGeometry; mat: THREE.Material; items: number[][] }> = ({ geo, mat, items }) => {
  const ref = useRef<THREE.InstancedMesh>(null!);
  useLayoutEffect(() => {
    const o = new THREE.Object3D();
    items.forEach((it, i) => {
      o.position.set(it[0], it[1], it[2]);
      o.scale.set(it[3], it[4], it[5]);
      o.updateMatrix();
      ref.current.setMatrixAt(i, o.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  }, [items]);
  return <instancedMesh ref={ref} args={[geo, mat, items.length]} frustumCulled={false} />;
};
const Mirror = ({ r, p, rot }: { r: number; p?: V3; rot?: V3 }) => {
  const c = useScene();
  return (
    <group position={p} rotation={rot}>
      <Ring r={r} />
      <mesh geometry={c.g.disc} material={c.m.mirror} scale={r} position={[0, 0, -0.02]} />
    </group>
  );
};

/* ───────────── photographic objects ───────────── */
// Files live in  public/images/services/*.png  and are referenced WITHOUT "/public".
const IMG = {
  scissors: '/images/services/scissors.png',
  comb: '/images/services/comb.png',
  razor: '/images/services/razor.png',
  clipper: '/images/services/clipper.png',
  chair: '/images/services/barber-chair.png',
  mirror: '/images/services/mirror.png',
  brush: '/images/services/shaving-brush.png',
  bottle: '/images/services/grooming-bottle.png',
  towel: '/images/services/towel.png',
} as const;

if (typeof window !== 'undefined') useTexture.preload(Object.values(IMG));

// A missing/broken file must not take the whole canvas down: catch it per object.
class AssetBoundary extends Component<{ src: string; children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(e: unknown) { console.warn(`[Services] could not load ${this.props.src}. Is it in public/images/services/ ?`, e); }
  render() {
    if (!this.state.failed) return this.props.children;
    return DEBUG ? (
      <mesh><planeGeometry args={[1.5, 1.5]} /><meshBasicMaterial color="#ff00ff" wireframe /></mesh>
    ) : null;
  }
}

const Photo: React.FC<{ src: string; position: V3; size: number }> = ({ src, position, size }) => {
  const texture = useTexture(src);
  const { gl } = useThree();
  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());
    texture.needsUpdate = true;
  }, [texture, gl]);
  // keep the real aspect ratio: `size` is the largest side
  const img = texture.image as { width: number; height: number };
  const aspect = img.width / img.height;
  const w = aspect >= 1 ? size : size * aspect;
  const h = aspect >= 1 ? size / aspect : size;
  return (
    <mesh position={position} renderOrder={1}>
      <planeGeometry args={[w, h]} />
      <meshBasicMaterial map={texture} transparent alphaTest={0.05} depthWrite toneMapped={false} side={THREE.DoubleSide} />
    </mesh>
  );
};
const RealisticObject: React.FC<{ src: string; position: V3; size: number }> = (props) => (
  <AssetBoundary src={props.src}>
    <Suspense fallback={null}>
      <Photo {...props} />
    </Suspense>
  </AssetBoundary>
);

type Item = { src: string; pos: V3; size: number };
// first entry = hero (always drawn); the rest are supporting props (hidden on mobile). Positions are relative to the hero centre.
const COMPOSITIONS: Item[][] = [
  [ // haircut
    { src: IMG.scissors, pos: [0, 0, 0], size: HERO_SIZE + 0.2 },
    { src: IMG.comb, pos: [2.1, -1.0, -0.5], size: 1.6 },
  ],
  [ // beard
    { src: IMG.razor, pos: [0, 0, 0], size: HERO_SIZE + 0.2 },
    { src: IMG.brush, pos: [2.1, -1.0, -0.5], size: 1.7 },
  ],
  [ // flagship
    { src: IMG.mirror, pos: [0, 0.5, -1.4], size: 4.4 },
    { src: IMG.chair, pos: [0, 0, 0], size: HERO_SIZE },
  ],
  [ // styling
    { src: IMG.comb, pos: [0, 0, 0], size: HERO_SIZE },
    { src: IMG.bottle, pos: [2.1, -0.9, -0.5], size: 1.6 },
  ],
  [ // premium
    { src: IMG.chair, pos: [0, 0, 0], size: HERO_SIZE },
    { src: IMG.razor, pos: [2.2, -0.9, -0.5], size: 1.4 },
    { src: IMG.scissors, pos: [-2.2, -0.7, -0.5], size: 1.4 },
  ],
];

const Composition: React.FC<{ i: number; lite: boolean }> = ({ i, lite }) => {
  const items = COMPOSITIONS[i % COMPOSITIONS.length];
  // the flagship case lists its backdrop mirror first, so hero detection is by index per case
  const heroIdx = i % COMPOSITIONS.length === 2 ? 1 : 0;
  return (
    <>
      {items.map((it, k) => (k === heroIdx || !lite) && <RealisticObject key={it.src + k} src={it.src} position={it.pos} size={it.size} />)}
    </>
  );
};

/* soft contact shadow: radial gradient, never a hard rectangle */
const useShadowTexture = () => {
  const tex = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const x = c.getContext('2d')!;
    const g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, 'rgba(0,0,0,0.6)');
    g.addColorStop(0.5, 'rgba(0,0,0,0.25)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = g;
    x.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }, []);
  useEffect(() => () => tex.dispose(), [tex]);
  return tex;
};

/* ───────────── exhibit ───────────── */
const Exhibit: React.FC<{ i: number; active: boolean; lite: boolean; onSelect: () => void }> = ({ i, active, lite, onSelect }) => {
  const { g, m } = useScene();
  const { size } = useThree();
  const pos = useMemo(() => exhibitPos(i), [i]);
  const root = useRef<THREE.Group>(null!);
  const spot = useRef<THREE.SpotLight>(null!);
  const target = useMemo(() => new THREE.Object3D(), []);
  const shadow = useShadowTexture();
  const base = i === 2 ? 1.1 : 1;
  const fit = Math.min(1, size.width / size.height / 1.2); // shrink on portrait screens so the hero still fits
  const frameMat = useMemo(() => {
    const x = m.brass.clone();
    x.emissive = new THREE.Color(GOLD);
    x.emissiveIntensity = 0.08;
    return x;
  }, [m]);
  useEffect(() => () => frameMat.dispose(), [frameMat]);

  const side = pos.x > 0 ? 1 : -1;
  useFrame((_, dt) => {
    frameMat.emissiveIntensity = THREE.MathUtils.damp(frameMat.emissiveIntensity, active ? 0.9 : 0.08, 4, dt);
    const k = THREE.MathUtils.damp(root.current.scale.x, base * (active ? 1.02 : 1), 3, dt);
    root.current.scale.setScalar(k);
    if (spot.current) spot.current.intensity = THREE.MathUtils.damp(spot.current.intensity, active ? 110 : 18, 4, dt);
    // no object rotation: the camera is the only thing that moves
  });

  return (
    <group
      ref={root}
      position={pos}
      rotation={[0, side * -0.35, 0]}
      onClick={onSelect}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = '')}
    >
      {/* backdrop panel centred behind the hero (z = -1.7, i.e. behind the photo plane at z = 0) */}
      <group position={[0, 2.6, -1.7]}>
        <mesh geometry={g.box} material={m.dark} scale={[4.8, 5.2, 0.12]} />
        {([[0, 2.5, 4.7, 0.04], [0, -2.5, 4.7, 0.04], [-2.35, 0, 0.04, 5], [2.35, 0, 0.04, 5]] as number[][]).map(([x, y, w, h], k) => (
          <mesh key={k} geometry={g.box} material={frameMat} position={[x, y, 0.08]} scale={[w, h, 0.04]} />
        ))}
      </group>

      {/* contact shadow on the floor under the object */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <planeGeometry args={[HERO_SIZE * 1.3, HERO_SIZE * 0.7]} />
        <meshBasicMaterial map={shadow} transparent depthWrite={false} toneMapped={false} />
      </mesh>

      {/* photo group: counter-rotated so the planes face +Z (toward the approaching camera), not edge-on */}
      <group position={[0, HERO_Y, 0]} rotation={[0, side * 0.35, 0]} scale={fit}>
        <Composition i={i} lite={lite} />
      </group>

      {DEBUG && (
        <>
          <axesHelper args={[3]} />
          <gridHelper args={[10, 10]} />
        </>
      )}

      {!lite && (
        <>
          <spotLight ref={spot} position={[0, 7, 2]} angle={0.42} penumbra={0.9} intensity={18} color="#fff1d6" target={target} />
          <primitive object={target} position={[0, 1.6, 0]} />
        </>
      )}
    </group>
  );
};

/* ───────────── environment ───────────── */
const Studio: React.FC<{ lite: boolean }> = ({ lite }) => {
  const { g, m } = useScene();
  const len = 22 - END_Z;
  const midZ = (22 + END_Z) / 2;
  const strips = useMemo(() => {
    const a: number[][] = [];
    for (let z = 14; z > END_Z + 2; z -= lite ? 10 : 5) [-8.85, 8.85].forEach((x) => a.push([x, 4.5, z, 0.06, 7, 0.06]));
    return a;
  }, [lite]);
  // thin dark fins for foreground depth. Moved outboard (±6.5) so they never clip the close-up camera or cover the hero.
  const fins = useMemo(() => {
    const a: number[][] = [];
    for (let i = 0; i <= N; i++) a.push([i % 2 === 0 ? 6.5 : -6.5, 4.5, FIRST_Z + SPACING / 2 - i * SPACING, 0.18, 9, 0.5]);
    return a;
  }, []);
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, midZ]}>
        <planeGeometry args={[40, len]} />
        {lite ? (
          <meshStandardMaterial color={CHAR} roughness={0.6} metalness={0.4} />
        ) : (
          <MeshReflectorMaterial color={CHAR} resolution={512} blur={[300, 100]} mixBlur={1} mixStrength={14} roughness={0.9} metalness={0.5} mirror={0.5} />
        )}
      </mesh>
      {[-9, 9].map((x) => (
        <mesh key={x} material={m.dark} position={[x, 5, midZ]} rotation={[0, x > 0 ? -Math.PI / 2 : Math.PI / 2, 0]}>
          <planeGeometry args={[len, 10]} />
        </mesh>
      ))}
      <mesh position={[0, 5, END_Z]}>
        <planeGeometry args={[40, 10]} />
        <meshStandardMaterial color={INK} />
      </mesh>
      <Inst geo={g.box} mat={m.strip} items={strips} />
      {!lite && <Inst geo={g.box} mat={m.dark} items={fins} />}
      {/* entrance mirror the camera passes */}
      <Mirror r={4.4} p={[-5.6, 3.6, 1]} rot={[0, 0.5, 0]} />
      {/* exit mirror: fills the viewport at the end of the journey */}
      <Mirror r={3.8} p={[0, 3.2, LAST_Z - 14]} />
    </group>
  );
};

const Dust: React.FC<{ count: number }> = ({ count }) => {
  const ref = useRef<THREE.Points>(null!);
  const pos = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * 16;
      a[i * 3 + 1] = Math.random() * 8;
      a[i * 3 + 2] = 18 - Math.random() * (18 - END_Z);
    }
    return a;
  }, [count]);
  useFrame((s) => {
    ref.current.position.y = Math.sin(s.clock.elapsedTime * 0.2) * 0.15;
    ref.current.position.x = Math.cos(s.clock.elapsedTime * 0.1) * 0.15;
  });
  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
      </bufferGeometry>
      <pointsMaterial color={GOLD} size={0.03} transparent opacity={0.45} depthWrite={false} />
    </points>
  );
};

const Lights: React.FC<{ active: number; lite: boolean }> = ({ active, lite }) => {
  const amb = useRef<THREE.AmbientLight>(null!);
  const follow = useRef<THREE.PointLight>(null!);
  useFrame(({ camera }, dt) => {
    amb.current.intensity = THREE.MathUtils.damp(amb.current.intensity, active >= 0 ? 0.07 : 0.2, 3, dt);
    if (follow.current) follow.current.position.copy(camera.position).add(new THREE.Vector3(0, 1.5, -2));
  });
  return (
    <>
      <ambientLight ref={amb} intensity={0.2} />
      {lite && <pointLight ref={follow} intensity={40} distance={16} color="#fff1d6" />}
    </>
  );
};

/* ───────────── camera ───────────── */
const buildRig = () => {
  const p: THREE.Vector3[] = [new THREE.Vector3(0, 2.6, 18), new THREE.Vector3(-1.2, 1.9, 3.5)];
  const l: THREE.Vector3[] = [new THREE.Vector3(0, 2.6, -6), new THREE.Vector3(-5.6, 3.4, 1)];
  for (let i = 0; i < N; i++) {
    const e = exhibitPos(i);
    // close-up: nearly head-on, CAM_DIST in front of the hero, aimed at the hero's centre
    p.push(new THREE.Vector3(e.x * CAM_X_FACTOR, CAM_Y, e.z + CAM_DIST));
    l.push(new THREE.Vector3(e.x, LOOK_Y, e.z));
  }
  p.push(new THREE.Vector3(0, 2.3, LAST_Z - 9.5));
  l.push(new THREE.Vector3(0, 3, LAST_Z - 14));
  // scroll-share per segment: bigger = slower. The smoothstep in toIndex already eases in/out at every exhibit (the "hold").
  const w = Array.from({ length: p.length - 1 }, (_, j) => (j === 0 ? 1.2 : j === p.length - 2 ? 1.3 : j >= 1 && j <= N + 1 ? 1.5 : 1));
  const sum = w.reduce((a, b) => a + b, 0);
  const knots = [0];
  w.forEach((x) => knots.push(knots[knots.length - 1] + x / sum));
  return {
    pos: new THREE.CatmullRomCurve3(p, false, 'catmullrom', 0.4),
    look: new THREE.CatmullRomCurve3(l, false, 'catmullrom', 0.4),
    knots,
    count: p.length,
  };
};
const toIndex = (p: number, k: number[]) => {
  for (let j = 0; j < k.length - 1; j++) {
    if (p <= k[j + 1] || j === k.length - 2) {
      const u = THREE.MathUtils.clamp((p - k[j]) / (k[j + 1] - k[j]), 0, 1);
      return j + 0.5 * u + 0.5 * u * u * (3 - 2 * u);
    }
  }
  return 0;
};

const CameraRig: React.FC<{
  progress: React.MutableRefObject<number>;
  onActive: (i: number) => void;
  lite: boolean;
  focus: THREE.Vector3;
}> = ({ progress, onActive, lite, focus }) => {
  const { camera } = useThree();
  const rig = useMemo(buildRig, []);
  const sm = useRef(0);
  const last = useRef(-2);
  const P = useMemo(() => new THREE.Vector3(), []);
  const L = useMemo(() => new THREE.Vector3(), []);
  useFrame((s, dt) => {
    sm.current = THREE.MathUtils.damp(sm.current, progress.current, 3, dt);
    const ti = toIndex(sm.current, rig.knots);
    const t = Math.min(ti / (rig.count - 1), 0.9999);
    rig.pos.getPoint(t, P);
    rig.look.getPoint(t, L);
    if (!lite) {
      P.x += s.pointer.x * 0.18;
      P.y += s.pointer.y * 0.08;
    }
    camera.position.copy(P);
    camera.lookAt(L);
    focus.copy(L); // depth-of-field focuses wherever the camera is looking (the hero while a service is active)
    const r = Math.round(ti);
    const idx = r - 2;
    const next = Math.abs(ti - r) < 0.4 && idx >= 0 && idx < N ? idx : -1;
    if (next !== last.current) {
      last.current = next;
      onActive(next);
    }
  });
  return null;
};

/* ───────────── static fallback (reduced motion / no WebGL) ───────────── */
const StaticMenu: React.FC = () => {
  const { openBooking } = useBooking();
  return (
    <section id="services" className="w-full bg-[#0B0A09] py-28 text-[#F2EBDD] md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <span className="mb-3 block font-sans text-xs uppercase tracking-[0.3em] text-[#C8A46A]">The Menu</span>
        <h2 className="mb-16 font-display text-5xl font-black uppercase leading-none sm:text-7xl md:text-8xl">
          Precision, <span className="font-serif font-normal italic text-[#C8A46A]">tailored to you.</span>
        </h2>
        <div className="divide-y divide-[#F2EBDD]/10 border-y border-[#F2EBDD]/10">
          {servicesData.map((s) => (
            <button key={s.id} onClick={() => openBooking(s.id)} data-cursor="BOOK" className="flex w-full flex-col justify-between gap-4 py-10 text-left md:flex-row md:items-center">
              <div className="flex items-baseline gap-6">
                <span className="font-display text-xl text-[#C8A46A]">{s.number}</span>
                <h3 className="font-display text-4xl font-black uppercase sm:text-6xl">{s.name}</h3>
              </div>
              <div className="flex items-center gap-6 font-sans text-sm text-[#8C847A]">
                <span className="max-w-xs">{s.description}</span>
                <span className="whitespace-nowrap text-[#F2EBDD]">{s.duration} · FROM {s.startingPrice}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ───────────── section ───────────── */
const smooth01 = (x: number) => { const t = Math.min(1, Math.max(0, x)); return t * t * (3 - 2 * t); };

export const Services: React.FC = () => {
  const { openBooking } = useBooking();
  const reduced = useMedia('(prefers-reduced-motion: reduce)');
  const mobile = useMedia('(max-width: 767px)');
  const webgl = useMemo(() => (typeof document !== 'undefined' ? hasWebGL() : false), []);

  const wrapRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const focus = useMemo(() => new THREE.Vector3(), []);
  const introRef = useRef<HTMLDivElement>(null);
  const introIn = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const exitRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(-1);
  const [inView, setInView] = useState(false);
  const [mounted, setMounted] = useState(false);

  const fallback = reduced || !webgl;

  useEffect(() => {
    if (fallback || !wrapRef.current) return;
    const io = new IntersectionObserver(([e]) => {
      setInView(e.isIntersecting);
      if (e.isIntersecting) setMounted(true);
    }, { rootMargin: '100% 0px' });
    io.observe(wrapRef.current);
    return () => io.disconnect();
  }, [fallback]);

  useEffect(() => {
    if (fallback || !wrapRef.current) return;
    const st = ScrollTrigger.create({
      trigger: wrapRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress;
        progress.current = p;
        if (introRef.current) {
          const o = 1 - smooth01(p / 0.1);
          introRef.current.style.opacity = String(o);
        }
        if (exitRef.current) exitRef.current.style.opacity = String(smooth01((p - 0.93) / 0.07));
        if (barRef.current) barRef.current.style.transform = `scaleY(${p})`;
      },
    });
    return () => st.kill();
  }, [fallback]);

  useEffect(() => {
    if (!mounted || fallback) return;
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(lineRef.current, { scaleX: 0, opacity: 1 }, { scaleX: 1, duration: 1.1, ease: 'power3.inOut' })
      .to(lineRef.current, { opacity: 0, duration: 0.5 }, '>-0.1')
      .to(coverRef.current, { opacity: 0, duration: 1.4, ease: 'power2.out' }, '<')
      .fromTo(introIn.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, '-=0.7');
    return () => { tl.kill(); };
  }, [mounted, fallback]);

  if (fallback) return <StaticMenu />;

  const runway = mobile ? (N + 1) * 85 : (N + 2) * 100;

  return (
    <section id="services" className="relative w-full bg-[#0B0A09] text-[#F2EBDD]">
      <div ref={wrapRef} style={{ height: `${runway}vh` }} className="relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {mounted && (
            <Canvas
              frameloop={inView ? 'always' : 'never'}
              dpr={mobile ? [1, 1.25] : [1, 1.75]}
              camera={{ fov: 38, near: 0.1, far: 80, position: [0, 2.6, 18] }}
              gl={{ antialias: !mobile, powerPreference: 'high-performance' }}
            >
              <color attach="background" args={[INK]} />
              <fog attach="fog" args={[INK, mobile ? 5 : 7, mobile ? 30 : 42]} />
              <SceneProvider>
                <Lights active={active} lite={mobile} />
                <Environment resolution={mobile ? 64 : 256}>
                  <Lightformer form="rect" intensity={1.6} position={[0, 6, -4]} scale={[10, 1, 1]} color="#fff1d6" />
                  <Lightformer form="rect" intensity={0.9} position={[-6, 3, 2]} scale={[1, 6, 1]} color={CREAM} />
                  <Lightformer form="rect" intensity={0.9} position={[6, 3, 2]} scale={[1, 6, 1]} color={GOLD} />
                </Environment>
                <Studio lite={mobile} />
                <Dust count={mobile ? 120 : 500} />
                {servicesData.map((s, i) => (
                  <Exhibit key={s.id} i={i} lite={mobile} active={active === i} onSelect={() => openBooking(s.id)} />
                ))}
                <CameraRig progress={progress} onActive={setActive} lite={mobile} focus={focus} />
              </SceneProvider>
              {!mobile && (
                <EffectComposer multisampling={0}>
                  {/* subtle: focus follows the camera's look target (the hero), everything else softens */}
                  <DepthOfField target={focus} focalLength={0.08} bokehScale={2} height={480} />
                  <Bloom intensity={0.45} luminanceThreshold={0.9} luminanceSmoothing={0.2} mipmapBlur />
                  <Noise opacity={0.04} />
                  <Vignette offset={0.25} darkness={0.85} />
                </EffectComposer>
              )}
            </Canvas>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0A09]/85 via-transparent to-[#0B0A09]/45" />

          {/* intro title */}
          <div ref={introRef} className="pointer-events-none absolute inset-x-0 top-0 mx-auto max-w-7xl px-6 pt-28 md:px-12 md:pt-36">
            <div ref={introIn} style={{ opacity: 0 }}>
              <span className="mb-3 block font-sans text-xs font-medium uppercase tracking-[0.3em] text-[#C8A46A]">The Menu</span>
              <h2 className="font-display text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl md:text-8xl">
                Precision, <br />
                <span className="font-serif font-normal normal-case italic text-[#C8A46A]">tailored to you.</span>
              </h2>
            </div>
          </div>

          {/* service text: crossfades as the camera arrives */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-[52%] max-w-7xl px-6 md:px-12">
            {servicesData.map((s, i) => {
              const on = active === i;
              return (
                <div
                  key={s.id}
                  aria-hidden={!on}
                  className={`absolute inset-x-6 bottom-8 flex flex-col gap-5 transition-all duration-[900ms] ease-out md:inset-x-12 md:bottom-14 md:flex-row md:items-end md:justify-between ${
                    on ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                  }`}
                >
                  <div>
                    <span className="font-display text-2xl font-bold tracking-wider text-[#C8A46A] md:text-3xl">{s.number}</span>
                    <h3 className="mt-1 font-display text-5xl font-black uppercase leading-[0.9] tracking-tight sm:text-7xl md:text-8xl">{s.name}</h3>
                    <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-[#F2EBDD]/75">{s.description}</p>
                  </div>
                  <div className={`flex items-center gap-6 ${on ? 'pointer-events-auto' : ''}`}>
                    <div className="md:text-right">
                      <span className="block font-sans text-[11px] font-medium uppercase tracking-widest text-[#8C847A]">{s.duration}</span>
                      <span className="font-sans text-xl font-semibold">From {s.startingPrice}</span>
                    </div>
                    <button
                      tabIndex={on ? 0 : -1}
                      onClick={() => openBooking(s.id)}
                      data-cursor="BOOK"
                      className="flex h-11 items-center gap-2 rounded-full border border-[#C8A46A]/70 px-5 font-sans text-xs font-semibold uppercase tracking-widest text-[#C8A46A] transition-colors hover:bg-[#C8A46A] hover:text-[#0B0A09] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2EBDD]"
                    >
                      Book now <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pointer-events-none absolute right-5 top-1/2 hidden h-40 w-px -translate-y-1/2 bg-[#F2EBDD]/15 md:block">
            <div ref={barRef} className="h-full w-full origin-top scale-y-0 bg-[#C8A46A]" />
          </div>

          {/* exit: the mirror goes dark, then the next section */}
          <div ref={exitRef} className="pointer-events-none absolute inset-0 bg-[#0B0A09]" style={{ opacity: 0 }} />
          {/* opening cover + gold line */}
          <div ref={coverRef} className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#0B0A09]">
            <div ref={lineRef} className="h-px w-[60%] origin-center bg-[#C8A46A]" style={{ transform: 'scaleX(0)' }} />
          </div>
        </div>
      </div>
    </section>
  );
};