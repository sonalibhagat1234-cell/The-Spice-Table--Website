import React from 'react';
import { Star, MapPin, Clock, ArrowDown, Utensils, Calendar } from 'lucide-react';
import { restaurantInfo } from '../data/restaurant';

interface HeroProps {
  onOpenReservation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation }) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#181615]"
    >
      {/* Background Image with warm gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          id="hero-bg-image"
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1920&auto=format&fit=crop"
          alt="The Spice Table Restaurant Ambiance in Nagpur"
          className="w-full h-full object-cover object-center opacity-30 scale-105 transform duration-1000 ease-out"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#181615] via-[#181615]/75 to-[#181615]/40" />
      </div>

      {/* Decorative Warm Ambient Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-[#C85A32]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Subtle Pill Tag */}
        <div
          id="hero-badge"
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#E0C794] text-xs font-medium uppercase tracking-[0.2em] mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C85A32] animate-pulse" />
          <span>Contemporary Indian Dining • Nagpur</span>
        </div>

        {/* Main Headline */}
        <h1
          id="hero-main-title"
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-7.5xl font-bold text-white tracking-tight leading-[1.08] max-w-4xl text-balance"
        >
          Authentic Flavours.
          <span className="block font-serif italic font-normal text-[#E8835C] mt-1 sm:mt-2">
            Memorable Experiences.
          </span>
        </h1>

        {/* Subtitle description */}
        <p
          id="hero-subtitle"
          className="mt-6 text-base sm:text-lg md:text-xl text-neutral-300 max-w-2xl font-light leading-relaxed text-balance"
        >
          Contemporary Indian cuisine crafted with fresh ingredients, traditional flavours and a modern touch.
        </p>

        {/* Action Buttons */}
        <div
          id="hero-cta-group"
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            id="hero-view-menu-btn"
            onClick={() => scrollToSection('menu')}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide bg-white text-[#1F1D1A] hover:bg-[#F3ECE1] hover:text-[#C85A32] shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <Utensils className="w-4 h-4 mr-2 text-[#C85A32]" />
            View Menu
          </button>

          <button
            id="hero-reserve-btn"
            onClick={onOpenReservation}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide bg-[#C85A32] text-white hover:bg-[#9E3D1B] shadow-lg shadow-[#C85A32]/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Reserve a Table
          </button>
        </div>

        {/* Trust Badges & Opening Info */}
        <div
          id="hero-trust-bar"
          className="mt-12 pt-8 border-t border-white/10 w-full max-w-3xl flex flex-wrap items-center justify-center gap-y-4 gap-x-8 text-xs sm:text-sm text-neutral-300"
        >
          {/* Rating */}
          <div id="hero-rating-badge" className="flex items-center space-x-1.5">
            <div className="flex text-[#E0C794]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="font-semibold text-white">4.8</span>
            <span className="text-neutral-400">Google Rating ({restaurantInfo.ratingCount})</span>
          </div>

          {/* Location */}
          <div id="hero-location-info" className="flex items-center space-x-1.5 text-neutral-200">
            <MapPin className="w-4 h-4 text-[#C85A32]" />
            <span className="font-medium">{restaurantInfo.city}, {restaurantInfo.state}</span>
          </div>

          {/* Opening Hours */}
          <div id="hero-hours-info" className="flex items-center space-x-1.5 text-neutral-200">
            <Clock className="w-4 h-4 text-[#C85A32]" />
            <span>
              <span className="text-emerald-400 font-medium">Open Today</span> · {restaurantInfo.hours}
            </span>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <button
          id="hero-scroll-indicator"
          onClick={() => scrollToSection('why-choose-us')}
          className="mt-12 flex flex-col items-center text-neutral-400 hover:text-white transition-colors cursor-pointer group"
          aria-label="Scroll to learn more"
        >
          <span className="text-[11px] uppercase tracking-widest font-medium mb-1.5 opacity-70 group-hover:opacity-100">
            Discover
          </span>
          <ArrowDown className="w-4 h-4 animate-bounce text-[#E8835C]" />
        </button>
      </div>
    </section>
  );
};
