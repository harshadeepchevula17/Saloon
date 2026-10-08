import React, { useState, useEffect } from 'react';
import { useBooking } from '../context/BookingContext';
import { siteConfig } from '../config/site';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const NAV_LINKS = [
  { name: 'HOME', href: '#hero' },
  { name: 'THE MENU', href: '#services' },
  { name: 'CRAFT', href: '#craft' },
  { name: 'ABOUT', href: '#about' },
  { name: 'ARTISANS', href: '#barbers' },
  { name: 'WORK', href: '#work' },
  { name: 'VOICES', href: '#testimonials' },
  { name: 'VISIT', href: '#visit' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openBooking } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMobileMenu = () => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      setIsMobileMenuOpen(true);
    } else {
      document.body.style.overflow = 'unset';
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? 'py-4 bg-[#0B0A09]/85 backdrop-blur-md border-b border-[#F2EBDD]/10'
            : 'py-8 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            className="flex items-center gap-2 group cursor-pointer"
            data-cursor="H&S"
          >
            <span className="font-display text-2xl md:text-3xl font-extrabold tracking-wider text-[#F2EBDD] group-hover:text-[#C8A46A] transition-colors">
              H <span className="font-serif italic text-[#C8A46A]">&</span> S
            </span>
            <span className="text-[10px] tracking-[0.25em] text-[#8C847A] uppercase font-sans border-l border-[#8C847A]/30 pl-2 hidden sm:inline-block">
              SALON
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-xs font-mono tracking-[0.2em] text-[#8C847A] hover:text-[#F2EBDD] transition-colors duration-300 relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C8A46A] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Action Button & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => openBooking()}
              data-cursor="BOOK"
              className="relative px-5 py-2.5 text-xs font-mono font-bold tracking-widest uppercase bg-[#C8A46A] text-[#0B0A09] hover:bg-[#DFC18A] transition-all duration-300 shadow-sm flex items-center gap-1.5"
            >
              <span>BOOK CHAIR</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-[#F2EBDD] hover:text-[#C8A46A] focus:outline-none transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#0B0A09] flex flex-col justify-between p-8 pt-28 lg:hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-6'
        }`}
      >
        <div className="flex flex-col space-y-4">
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="font-display text-3xl font-black text-[#F2EBDD] hover:text-[#C8A46A] transition-colors tracking-wider border-b border-[#F2EBDD]/10 pb-3 flex items-center justify-between"
            >
              <span>{link.name}</span>
              <span className="text-[10px] font-mono text-[#8C847A] tracking-widest">
                0{index + 1}
              </span>
            </a>
          ))}
        </div>

        <div className="pt-6 border-t border-[#F2EBDD]/10 space-y-4">
          <p className="text-xs font-mono text-[#8C847A] tracking-widest uppercase">
            {siteConfig.address.city}, {siteConfig.address.state}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm text-[#C8A46A]">{siteConfig.phoneDisplay}</span>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openBooking();
              }}
              className="px-6 py-3 bg-[#C8A46A] text-[#0B0A09] text-xs font-bold font-mono tracking-widest uppercase"
            >
              RESERVE
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
