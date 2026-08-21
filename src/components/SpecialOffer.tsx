import React from 'react';
import { specialOffer } from '../data/restaurant';
import { CheckCircle2, Sparkles, Calendar, ArrowRight } from 'lucide-react';

interface SpecialOfferProps {
  onClaimOffer: () => void;
}

export const SpecialOffer: React.FC<SpecialOfferProps> = ({ onClaimOffer }) => {
  return (
    <section id="special-offer" className="py-20 bg-[#1F1D1A] text-white relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#C85A32]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -top-20 w-96 h-96 bg-[#C5A059]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-[#2A2623] to-[#1E1B18] rounded-3xl p-8 sm:p-12 lg:p-14 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Badge */}
              <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-[#C85A32]/20 border border-[#C85A32]/40 text-[#E8835C] text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{specialOffer.badge}</span>
              </div>

              {/* Title */}
              <h2
                id="special-offer-title"
                className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4"
              >
                {specialOffer.title}
              </h2>

              {/* Subtitle / Description */}
              <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed mb-6">
                {specialOffer.description}
              </p>

              {/* Included items checklist */}
              <div className="w-full space-y-2.5 mb-8">
                {specialOffer.itemsIncluded.map((item, idx) => (
                  <div key={idx} className="flex items-center text-xs sm:text-sm text-neutral-200">
                    <CheckCircle2 className="w-4 h-4 text-[#E0C794] mr-2.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Price & CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 w-full sm:w-auto pt-4 border-t border-white/10">
                <div className="flex items-baseline space-x-3">
                  <span className="font-serif text-4xl sm:text-5xl font-bold text-[#E0C794]">
                    ₹{specialOffer.price}
                  </span>
                  <span className="text-base text-neutral-400 line-through">
                    ₹{specialOffer.originalPrice}
                  </span>
                  <span className="text-xs text-[#E8835C] font-semibold bg-[#C85A32]/20 px-2 py-0.5 rounded-sm">
                    Save 25%
                  </span>
                </div>

                <button
                  id="claim-special-offer-btn"
                  onClick={onClaimOffer}
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide bg-[#C85A32] text-white hover:bg-[#9E3D1B] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C85A32]/30 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Reserve Table for This Offer</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>

              <div className="mt-4 text-[11px] text-neutral-400">
                {specialOffer.validity}
              </div>
            </div>

            {/* Right Image Feature */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden aspect-4/3 shadow-2xl border-2 border-white/10 group">
                <img
                  id="special-offer-image"
                  src={specialOffer.image}
                  alt={specialOffer.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-xs text-white/90 font-medium">
                  Includes Biryani + 2 Starters + 4 Artisanal Drinks + Dessert
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
