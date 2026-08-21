import React, { useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhyChooseUs } from './components/WhyChooseUs';
import { SignatureDishes } from './components/SignatureDishes';
import { About } from './components/About';
import { Menu } from './components/Menu';
import { SpecialOffer } from './components/SpecialOffer';
import { Gallery } from './components/Gallery';
import { Reviews } from './components/Reviews';
import { Reservation } from './components/Reservation';
import { LocationContact } from './components/LocationContact';
import { ContactCTA } from './components/ContactCTA';
import { Footer } from './components/Footer';
import { MobileActionBar } from './components/MobileActionBar';
import { BackToTop } from './components/BackToTop';

export default function App() {
  const handleScrollToReservation = useCallback(() => {
    const resElement = document.getElementById('reservation');
    if (resElement) {
      resElement.scrollIntoView({ behavior: 'smooth' });
      // Give focus to name input after scrolling
      setTimeout(() => {
        const nameInput = document.getElementById('res-name');
        if (nameInput) {
          nameInput.focus();
        }
      }, 600);
    }
  }, []);

  const handleClaimOffer = useCallback(() => {
    const resElement = document.getElementById('reservation');
    if (resElement) {
      resElement.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const specialReq = document.getElementById('res-special-request') as HTMLTextAreaElement | null;
        if (specialReq && !specialReq.value) {
          specialReq.value = 'Weekend Family Feast offer (₹1,499)';
        }
      }, 600);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1F1D1A] relative selection:bg-[#C85A32]/20 selection:text-[#9E3D1B]">
      {/* Top Navigation */}
      <Navbar onOpenReservation={handleScrollToReservation} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero onOpenReservation={handleScrollToReservation} />

        {/* 2. Why Choose Us */}
        <WhyChooseUs />

        {/* 3. Signature Dishes */}
        <SignatureDishes />

        {/* 4. About Our Story */}
        <About />

        {/* 5. Interactive Full Menu */}
        <Menu />

        {/* 6. Weekend Special Offer */}
        <SpecialOffer onClaimOffer={handleClaimOffer} />

        {/* 7. Gallery with Lightbox */}
        <Gallery />

        {/* 8. Customer Reviews */}
        <Reviews />

        {/* 9. Reservation Section */}
        <Reservation />

        {/* 10. Location & Contact */}
        <LocationContact />

        {/* 11. Final CTA */}
        <ContactCTA onOpenReservation={handleScrollToReservation} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Action Bar */}
      <MobileActionBar onOpenReservation={handleScrollToReservation} />

      {/* Back to Top */}
      <BackToTop />
    </div>
  );
}
