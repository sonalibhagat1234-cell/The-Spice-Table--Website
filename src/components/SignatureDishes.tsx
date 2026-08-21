import React from 'react';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';
import { signatureDishes } from '../data/menu';

export const SignatureDishes: React.FC = () => {
  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="signature-dishes" className="py-20 bg-[#F3ECE1]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#C85A32] block mb-2">
              Chef's Masterpieces
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F1D1A] tracking-tight">
              Our Signature Dishes
            </h2>
            <p className="mt-2 text-base text-[#4A4642] font-light">
              A few favourites from our kitchen.
            </p>
          </div>

          <button
            id="explore-full-menu-top-btn"
            onClick={scrollToMenu}
            className="mt-4 md:mt-0 inline-flex items-center text-sm font-semibold text-[#C85A32] hover:text-[#9E3D1B] group transition-colors cursor-pointer"
          >
            <span>Explore Full Menu</span>
            <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {signatureDishes.map((dish, idx) => (
            <div
              key={dish.id}
              id={`signature-dish-${idx}`}
              className="group bg-white rounded-2xl overflow-hidden border border-[#E8E0D5] hover:border-[#C85A32]/40 transition-all duration-300 hover:shadow-lg flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-4/3 overflow-hidden bg-[#FAF7F2]">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Dietary Veg/Non-Veg icon */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs p-1.5 rounded-md border border-black/10 shadow-xs">
                  <div
                    className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                      dish.isVeg
                        ? 'border-emerald-600'
                        : 'border-red-600'
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        dish.isVeg ? 'bg-emerald-600' : 'bg-red-600'
                      }`}
                    />
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
                  {dish.isBestseller && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#C85A32] text-white shadow-xs">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Bestseller
                    </span>
                  )}
                  {dish.isSpicy && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-100 text-red-700 border border-red-200">
                      <Flame className="w-2.5 h-2.5 mr-0.5" />
                      Spicy
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-serif text-xl font-bold text-[#1F1D1A] group-hover:text-[#C85A32] transition-colors">
                      {dish.name}
                    </h3>
                    <span className="font-serif text-lg font-bold text-[#C85A32] ml-2">
                      ₹{dish.price}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#4A4642] font-light leading-relaxed mb-4">
                    {dish.description}
                  </p>
                </div>

                {dish.portion && (
                  <div className="pt-3 border-t border-[#E8E0D5]/60 text-[11px] text-[#7A736C]">
                    {dish.portion}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button
            id="explore-full-menu-bottom-btn"
            onClick={scrollToMenu}
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide bg-[#1F1D1A] text-white hover:bg-[#C85A32] transition-all transform hover:-translate-y-0.5 shadow-md cursor-pointer"
          >
            <span>Explore Full Menu</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};
