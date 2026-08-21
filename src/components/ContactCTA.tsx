import React from 'react';
import { Calendar, Utensils } from 'lucide-react';

interface ContactCTAProps {
  onOpenReservation: () => void;
}

export const ContactCTA: React.FC<ContactCTAProps> = ({ onOpenReservation }) => {
  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="ready-cta" className="py-20 bg-[#1F1D1A] text-white relative overflow-hidden text-center">
      {/* Warm Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C85A32]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#E8835C] block mb-3">
          Join Us Today
        </span>

        <h2
          id="cta-heading"
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4"
        >
          Ready for a Great Meal?
        </h2>

        <p className="text-base sm:text-xl text-neutral-300 font-light max-w-xl mx-auto mb-10 leading-relaxed">
          &ldquo;Gather your people. We&apos;ll take care of the rest.&rdquo;
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="cta-reserve-btn"
            onClick={onOpenReservation}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-semibold tracking-wide bg-[#C85A32] text-white hover:bg-[#9E3D1B] shadow-lg shadow-[#C85A32]/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <Calendar className="w-4 h-4 mr-2" />
            <span>Reserve a Table</span>
          </button>

          <button
            id="cta-menu-btn"
            onClick={scrollToMenu}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-semibold tracking-wide bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <Utensils className="w-4 h-4 mr-2 text-[#E0C794]" />
            <span>View Menu</span>
          </button>
        </div>
      </div>
    </section>
  );
};
