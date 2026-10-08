// Generates crisp, high-resolution (1024x1024) transparent studio tool textures
// This ensures 100% uptime, zero 404s, and photorealistic metallic / leather / carbon textures

function createTextureCanvas(width = 1024, height = 1024): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, width, height);
  return { canvas, ctx };
}

// 1. Photorealistic Japanese Steel Shears
export function getScissorsTexture(): string {
  const { canvas, ctx } = createTextureCanvas(1024, 1024);

  ctx.save();
  ctx.translate(512, 512);
  ctx.rotate(-Math.PI / 6);

  // Soft ambient contact shadow underneath
  ctx.shadowColor = 'rgba(0, 0, 0, 0.75)';
  ctx.shadowBlur = 35;
  ctx.shadowOffsetY = 15;

  // Blade 1 (Upper)
  const blade1Grad = ctx.createLinearGradient(-350, -40, 250, 40);
  blade1Grad.addColorStop(0, '#7A756D');
  blade1Grad.addColorStop(0.3, '#E8E2D8');
  blade1Grad.addColorStop(0.5, '#FFFFFF');
  blade1Grad.addColorStop(0.7, '#A8A299');
  blade1Grad.addColorStop(1, '#5E5952');

  ctx.fillStyle = blade1Grad;
  ctx.beginPath();
  ctx.moveTo(320, 0); // Tip
  ctx.quadraticCurveTo(50, -25, -120, -15);
  ctx.lineTo(-240, -90);
  ctx.quadraticCurveTo(-320, -110, -320, -40);
  ctx.quadraticCurveTo(-320, 20, -240, 10);
  ctx.lineTo(-120, 0);
  ctx.quadraticCurveTo(50, 15, 320, 0);
  ctx.fill();

  // Blade 2 (Lower crossed)
  const blade2Grad = ctx.createLinearGradient(-350, 40, 250, -40);
  blade2Grad.addColorStop(0, '#5E5952');
  blade2Grad.addColorStop(0.4, '#C8C2B8');
  blade2Grad.addColorStop(0.6, '#FFFFFF');
  blade2Grad.addColorStop(0.8, '#8A847B');
  blade2Grad.addColorStop(1, '#4A453F');

  ctx.fillStyle = blade2Grad;
  ctx.beginPath();
  ctx.moveTo(310, 15);
  ctx.quadraticCurveTo(60, 35, -110, 15);
  ctx.lineTo(-230, 95);
  ctx.quadraticCurveTo(-310, 115, -310, 45);
  ctx.quadraticCurveTo(-310, -15, -230, -5);
  ctx.lineTo(-110, 0);
  ctx.quadraticCurveTo(60, -5, 310, 15);
  ctx.fill();

  // Finger Loop 1 Hole Cutout
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.ellipse(-280, -65, 38, 26, 0.3, 0, Math.PI * 2);
  ctx.fill();

  // Finger Loop 2 Hole Cutout
  ctx.beginPath();
  ctx.ellipse(-270, 70, 38, 26, -0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';

  // Gold / Brass Tension Pivot Screw
  const pivotGrad = ctx.createRadialGradient(-115, 2, 2, -115, 2, 22);
  pivotGrad.addColorStop(0, '#FFF5D6');
  pivotGrad.addColorStop(0.5, '#C8A46A');
  pivotGrad.addColorStop(1, '#785A24');
  ctx.fillStyle = pivotGrad;
  ctx.beginPath();
  ctx.arc(-115, 2, 22, 0, Math.PI * 2);
  ctx.fill();

  // Pivot Screw Groove
  ctx.strokeStyle = '#3A2A10';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-128, 2);
  ctx.lineTo(-102, 2);
  ctx.stroke();

  // Laser Etched "H&S 440C" Mark
  ctx.font = 'bold 12px monospace';
  ctx.fillStyle = 'rgba(40, 35, 30, 0.7)';
  ctx.fillText('H & S  440C', -50, -4);

  ctx.restore();
  return canvas.toDataURL('image/png');
}

// 2. Photorealistic Japanese Straight Razor
export function getRazorTexture(): string {
  const { canvas, ctx } = createTextureCanvas(1024, 1024);

  ctx.save();
  ctx.translate(512, 512);
  ctx.rotate(-Math.PI / 10);

  // Soft shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
  ctx.shadowBlur = 30;
  ctx.shadowOffsetY = 14;

  // Hollow Ground Steel Blade
  const bladeGrad = ctx.createLinearGradient(50, -100, 380, 0);
  bladeGrad.addColorStop(0, '#6A655E');
  bladeGrad.addColorStop(0.3, '#E6E0D6');
  bladeGrad.addColorStop(0.5, '#FFFFFF');
  bladeGrad.addColorStop(0.8, '#9E988F');
  bladeGrad.addColorStop(1, '#4A4640');

  ctx.fillStyle = bladeGrad;
  ctx.beginPath();
  ctx.moveTo(350, -60); // Blade point
  ctx.lineTo(60, -45); // Tang junction
  ctx.quadraticCurveTo(10, -35, -20, -10); // Tang
  ctx.lineTo(-30, 10);
  ctx.quadraticCurveTo(10, 0, 60, 5); // Bottom spine
  ctx.lineTo(350, 0); // Razor edge
  ctx.closePath();
  ctx.fill();

  // Razor Razor Edge (Honed Mirrored Line)
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(60, 5);
  ctx.lineTo(350, 0);
  ctx.stroke();

  // Carbon / Ebony Scale Handle
  const handleGrad = ctx.createLinearGradient(-350, 100, 40, -30);
  handleGrad.addColorStop(0, '#151210');
  handleGrad.addColorStop(0.5, '#282420');
  handleGrad.addColorStop(1, '#151210');

  ctx.fillStyle = handleGrad;
  ctx.beginPath();
  ctx.moveTo(20, -25);
  ctx.quadraticCurveTo(-150, -80, -340, 20);
  ctx.quadraticCurveTo(-360, 40, -340, 60);
  ctx.quadraticCurveTo(-150, -10, 30, 10);
  ctx.closePath();
  ctx.fill();

  // Brass Pivot Pin
  ctx.fillStyle = '#C8A46A';
  ctx.beginPath();
  ctx.arc(0, -5, 7, 0, Math.PI * 2);
  ctx.fill();

  // Brass Tail Pin
  ctx.beginPath();
  ctx.arc(-330, 38, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
  return canvas.toDataURL('image/png');
}

// 3. Photorealistic Precision Carbon Barber Comb
export function getCombTexture(): string {
  const { canvas, ctx } = createTextureCanvas(1024, 1024);

  ctx.save();
  ctx.translate(512, 512);

  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowBlur = 25;
  ctx.shadowOffsetY = 12;

  // Comb Spine
  const spineGrad = ctx.createLinearGradient(-350, 0, 350, 0);
  spineGrad.addColorStop(0, '#1A1816');
  spineGrad.addColorStop(0.5, '#322E2A');
  spineGrad.addColorStop(1, '#1A1816');

  ctx.fillStyle = spineGrad;
  ctx.beginPath();
  ctx.roundRect(-350, -50, 700, 32, 6);
  ctx.fill();

  // Graduated Teeth (Fine + Medium sections)
  ctx.fillStyle = '#26221E';
  const numTeeth = 72;
  const startX = -340;
  const toothWidth = 5.5;
  const gap = 4.2;

  for (let i = 0; i < numTeeth; i++) {
    const x = startX + i * (toothWidth + gap);
    const toothLength = i < 36 ? 75 : 82;
    ctx.fillRect(x, -18, toothWidth, toothLength);
  }

  // Laser Etched Gold Logo on Spine
  ctx.font = 'bold 11px monospace';
  ctx.fillStyle = '#C8A46A';
  ctx.fillText('H & S  PRECISION CARBON  0.5MM', -110, -30);

  ctx.restore();
  return canvas.toDataURL('image/png');
}

// 4. Photorealistic Cordless Gold & Matte Black Clipper
export function getClipperTexture(): string {
  const { canvas, ctx } = createTextureCanvas(1024, 1024);

  ctx.save();
  ctx.translate(512, 512);
  ctx.rotate(-Math.PI / 12);

  ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
  ctx.shadowBlur = 35;
  ctx.shadowOffsetY = 16;

  // Steel Taper Blade
  const bladeGrad = ctx.createLinearGradient(0, -250, 0, -180);
  bladeGrad.addColorStop(0, '#ECE7DF');
  bladeGrad.addColorStop(0.6, '#9E988F');
  bladeGrad.addColorStop(1, '#504C46');
  ctx.fillStyle = bladeGrad;
  ctx.beginPath();
  ctx.roundRect(-90, -260, 180, 70, 6);
  ctx.fill();

  // Blade Serrated Teeth
  ctx.fillStyle = '#3A3630';
  for (let x = -85; x <= 80; x += 6) {
    ctx.fillRect(x, -265, 3, 22);
  }

  // Gold Metallic Housing Body
  const bodyGrad = ctx.createLinearGradient(-100, 0, 100, 0);
  bodyGrad.addColorStop(0, '#8A682D');
  bodyGrad.addColorStop(0.3, '#E6C88A');
  bodyGrad.addColorStop(0.5, '#FFF2D2');
  bodyGrad.addColorStop(0.8, '#B88F46');
  bodyGrad.addColorStop(1, '#664A1B');

  ctx.fillStyle = bodyGrad;
  ctx.beginPath();
  ctx.roundRect(-80, -190, 160, 360, 24);
  ctx.fill();

  // Black Textured Rubber Grip Inset
  ctx.fillStyle = '#151311';
  ctx.beginPath();
  ctx.roundRect(-62, -100, 124, 200, 16);
  ctx.fill();

  // Diamond Grip Pattern
  ctx.strokeStyle = '#2A2622';
  ctx.lineWidth = 1;
  for (let y = -90; y < 90; y += 12) {
    ctx.beginPath();
    ctx.moveTo(-55, y);
    ctx.lineTo(55, y + 10);
    ctx.stroke();
  }

  // Gold Power Switch & Brand Badge
  ctx.fillStyle = '#C8A46A';
  ctx.beginPath();
  ctx.roundRect(-24, 115, 48, 20, 6);
  ctx.fill();

  ctx.font = 'bold 13px monospace';
  ctx.fillStyle = '#F2EBDD';
  ctx.fillText('H & S', -18, -40);

  ctx.restore();
  return canvas.toDataURL('image/png');
}

// 5. Photorealistic Amber Glass Botanical Tonic Bottle
export function getBottleTexture(): string {
  const { canvas, ctx } = createTextureCanvas(1024, 1024);

  ctx.save();
  ctx.translate(512, 512);

  ctx.shadowColor = 'rgba(0, 0, 0, 0.75)';
  ctx.shadowBlur = 30;
  ctx.shadowOffsetY = 16;

  // Amber Glass Bottle Body
  const glassGrad = ctx.createLinearGradient(-120, 0, 120, 0);
  glassGrad.addColorStop(0, '#3A1E08');
  glassGrad.addColorStop(0.25, '#8C4814');
  glassGrad.addColorStop(0.5, '#D68234');
  glassGrad.addColorStop(0.75, '#8C4814');
  glassGrad.addColorStop(1, '#3A1E08');

  ctx.fillStyle = glassGrad;
  ctx.beginPath();
  ctx.roundRect(-100, -120, 200, 320, 28);
  ctx.fill();

  // Bottle Shoulder & Neck
  ctx.beginPath();
  ctx.moveTo(-100, -120);
  ctx.quadraticCurveTo(-90, -190, -40, -210);
  ctx.lineTo(-40, -260);
  ctx.lineTo(40, -260);
  ctx.lineTo(40, -210);
  ctx.quadraticCurveTo(90, -190, 100, -120);
  ctx.closePath();
  ctx.fill();

  // Black Matte Dropper Cap & Pipette Ring
  ctx.fillStyle = '#141210';
  ctx.beginPath();
  ctx.roundRect(-46, -330, 92, 70, 8);
  ctx.fill();
  ctx.fillStyle = '#C8A46A'; // Gold collar
  ctx.fillRect(-44, -260, 88, 14);

  // Luxury Parchment Label
  const labelGrad = ctx.createLinearGradient(-80, 0, 80, 0);
  labelGrad.addColorStop(0, '#EAE3D4');
  labelGrad.addColorStop(0.5, '#F9F5EC');
  labelGrad.addColorStop(1, '#EAE3D4');
  ctx.fillStyle = labelGrad;
  ctx.beginPath();
  ctx.roundRect(-78, -60, 156, 180, 4);
  ctx.fill();

  // Label Typography
  ctx.fillStyle = '#0B0A09';
  ctx.font = 'bold 16px "Big Shoulders Display", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('H & S ATELIER', 0, -20);

  ctx.font = 'italic 11px serif';
  ctx.fillStyle = '#8C847A';
  ctx.fillText('Botanical Beard Elixir', 0, 5);

  ctx.font = '9px monospace';
  ctx.fillStyle = '#3A352F';
  ctx.fillText('CEDAR & ARGAN', 0, 35);
  ctx.fillText('50 ML / 1.7 FL OZ', 0, 75);

  // Gold border on label
  ctx.strokeStyle = '#C8A46A';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(-72, -54, 144, 168);

  ctx.restore();
  return canvas.toDataURL('image/png');
}
