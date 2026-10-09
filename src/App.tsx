import React, { useState } from 'react';
import { BookingProvider } from './context/BookingContext';
import { useLenis } from './hooks/useLenis';
import { Loader } from './components/Loader';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MorphTransition } from './components/MorphTransition';
import { Services } from './components/Services';
import { CraftSection } from './components/CraftSection';
import { About } from './components/About';
import { Testimonials } from './components/Testimonials';
import { Visit } from './components/Visit';
import { BookingCTA } from './components/BookingCTA';
import { BookingModal } from './components/BookingModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Footer } from './components/Footer';

const SalonContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Lenis smooth scroll and GSAP synchronization
  useLenis();

  return (
    <div className="relative min-h-screen bg-[#0B0A09] text-[#F2EBDD]">
      {/* Cinematic Brand Intro Loader */}
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      {/* Desktop Magnetic Custom Cursor */}
      <CustomCursor />

      {/* Navigation Header */}
      <Navbar />

      {/* Main Experience Flow */}
      <main className="relative">
        <Hero />
        <MorphTransition variant="dark-cream" />
        <About />
        <MorphTransition variant="cream-dark" />
        <CraftSection />
        <MorphTransition variant="dark-cream" />
        <Services />
        <MorphTransition variant="cream-dark" />
        <Testimonials />
        <Visit />
        <BookingCTA />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Quick Action */}
      <WhatsAppButton />

      {/* Reservation & Booking Modal */}
      <BookingModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BookingProvider>
      <SalonContent />
    </BookingProvider>
  );
};

export default App;
