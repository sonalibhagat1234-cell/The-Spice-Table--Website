import React from 'react';
import { Leaf, Flame, ChefHat, HeartHandshake } from 'lucide-react';
import { features } from '../data/restaurant';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Leaf':
        return <Leaf className="w-6 h-6 text-[#C85A32]" />;
      case 'Flame':
        return <Flame className="w-6 h-6 text-[#C85A32]" />;
      case 'ChefHat':
        return <ChefHat className="w-6 h-6 text-[#C85A32]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-[#C85A32]" />;
      default:
        return <Leaf className="w-6 h-6 text-[#C85A32]" />;
    }
  };

  return (
    <section id="why-choose-us" className="py-20 bg-[#FAF7F2] border-b border-[#E8E0D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#C85A32] block mb-2">
            The Dining Experience
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F1D1A] tracking-tight">
            More Than Just a Meal
          </h2>
          <div className="w-12 h-0.5 bg-[#C85A32] mx-auto mt-4" />
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              id={`feature-card-${idx}`}
              className="group bg-white p-8 rounded-2xl border border-[#E8E0D5] hover:border-[#C85A32]/40 transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex flex-col items-start"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#E8E0D5] group-hover:bg-[#C85A32]/10 group-hover:border-[#C85A32]/30 flex items-center justify-center mb-6 transition-colors">
                {getIcon(feature.iconName)}
              </div>

              <h3 className="font-serif text-xl font-bold text-[#1F1D1A] mb-3 group-hover:text-[#C85A32] transition-colors">
                {feature.title}
              </h3>

              <p className="text-sm text-[#4A4642] leading-relaxed font-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
