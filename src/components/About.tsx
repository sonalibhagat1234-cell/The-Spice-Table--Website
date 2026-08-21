import React from 'react';
import { restaurantInfo } from '../data/restaurant';
import { UtensilsCrossed, Award, Users } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#FAF7F2] border-b border-[#E8E0D5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Imagery & Visual Story */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/5">
                <img
                  id="about-chef-image"
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=900&auto=format&fit=crop"
                  alt="Executive Chef preparing Indian delicacies at The Spice Table"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Floating Decorative Badge */}
              <div
                id="about-experience-badge"
                className="absolute -bottom-6 -right-4 sm:-right-6 bg-white p-5 rounded-2xl shadow-xl border border-[#E8E0D5] max-w-[200px] flex items-center space-x-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#C85A32]/10 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-[#C85A32]" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#7A736C] font-semibold">Excellence in</div>
                  <div className="font-serif text-sm font-bold text-[#1F1D1A]">Nagpur Dining</div>
                </div>
              </div>

              {/* Subtle accent backdrop */}
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-[#C85A32]/10 rounded-3xl -z-10" />
            </div>
          </div>

          {/* Right Column: Our Story & Statistics */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#C85A32] block mb-2">
              Culinary Heritage
            </span>
            <h2
              id="about-heading"
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F1D1A] tracking-tight mb-6"
            >
              Our Story
            </h2>

            <p className="text-base sm:text-lg text-[#383430] font-normal leading-relaxed mb-6">
              At The Spice Table, we believe great food brings people together. Our kitchen combines traditional Indian recipes with a contemporary dining experience, using fresh ingredients and time-honoured cooking techniques.
            </p>

            <p className="text-sm sm:text-base text-[#5C5650] font-light leading-relaxed mb-10">
              From slow-simmered rich gravies fired over traditional charcoal hearths to artisanal flatbreads rolled by hand, every plate reflects a deep passion for balance, fragrance, and genuine warmth. Whether you are gathering for a Sunday family feast or an intimate evening celebration, we craft every moment with care.
            </p>

            {/* Three Statistics with Subtle Styling */}
            <div
              id="about-stats-grid"
              className="grid grid-cols-3 gap-4 pt-8 border-t border-[#E8E0D5]"
            >
              <div id="stat-established" className="flex flex-col">
                <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#C85A32]">
                  {restaurantInfo.established}
                </span>
                <span className="text-xs sm:text-sm font-medium text-[#7A736C] uppercase tracking-wider mt-1">
                  Established
                </span>
              </div>

              <div id="stat-dishes" className="flex flex-col">
                <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F1D1A]">
                  {restaurantInfo.dishesCount}
                </span>
                <span className="text-xs sm:text-sm font-medium text-[#7A736C] uppercase tracking-wider mt-1">
                  Dishes
                </span>
              </div>

              <div id="stat-guests" className="flex flex-col">
                <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F1D1A]">
                  {restaurantInfo.guestsServed}
                </span>
                <span className="text-xs sm:text-sm font-medium text-[#7A736C] uppercase tracking-wider mt-1">
                  Guests Served
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
