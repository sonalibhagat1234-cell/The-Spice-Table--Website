import React from 'react';
import { Phone, MessageCircle, Utensils, Calendar } from 'lucide-react';
import { restaurantInfo } from '../data/restaurant';

interface MobileActionBarProps {
  onOpenReservation: () => void;
}

export const MobileActionBar: React.FC<MobileActionBarProps> = ({ onOpenReservation }) => {
  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      id="mobile-sticky-action-bar"
      aria-label="Mobile quick actions"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8E0D5] px-3 py-2 shadow-2xl lg:hidden"
    >
      <div className="grid grid-cols-4 gap-1.5 max-w-md mx-auto">
        {/* Call */}
        <a
          id="mobile-bar-call"
          href={`tel:${restaurantInfo.phoneRaw}`}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[#1F1D1A] hover:bg-[#FAF7F2] active:bg-[#F3ECE1] transition-colors"
        >
          <Phone className="w-4 h-4 text-[#C85A32] mb-0.5" />
          <span className="text-[10px] font-semibold tracking-tight">Call</span>
        </a>

        {/* WhatsApp */}
        <a
          id="mobile-bar-whatsapp"
          href={`https://wa.me/${restaurantInfo.whatsappRaw}?text=Hi%20The%20Spice%20Table,%20I%20have%20an%20enquiry.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[#1F1D1A] hover:bg-[#FAF7F2] active:bg-[#F3ECE1] transition-colors"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600 mb-0.5" />
          <span className="text-[10px] font-semibold tracking-tight">WhatsApp</span>
        </a>

        {/* Menu */}
        <button
          id="mobile-bar-menu"
          onClick={scrollToMenu}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[#1F1D1A] hover:bg-[#FAF7F2] active:bg-[#F3ECE1] transition-colors cursor-pointer"
        >
          <Utensils className="w-4 h-4 text-[#C85A32] mb-0.5" />
          <span className="text-[10px] font-semibold tracking-tight">Menu</span>
        </button>

        {/* Reserve */}
        <button
          id="mobile-bar-reserve"
          onClick={onOpenReservation}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-[#C85A32] text-white hover:bg-[#9E3D1B] active:scale-95 transition-all shadow-sm cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-white mb-0.5" />
          <span className="text-[10px] font-bold tracking-tight">Reserve</span>
        </button>
      </div>
    </aside>
  );
};
