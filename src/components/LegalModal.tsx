import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms';
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  return (
    <div
      id="legal-modal-overlay"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#E8E0D5] max-h-[85vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#7A736C] hover:text-[#1F1D1A] hover:bg-[#FAF7F2]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-[#C85A32] mb-3">
          <ShieldCheck className="w-5 h-5" />
          <span className="text-xs uppercase tracking-wider font-semibold">Demo Restaurant Documentation</span>
        </div>

        <h3 className="font-serif text-2xl font-bold text-[#1F1D1A] mb-4">
          {type === 'privacy' ? 'Privacy Policy' : 'Terms & Table Booking Conditions'}
        </h3>

        <div className="text-xs sm:text-sm text-[#4A4642] space-y-4 font-light leading-relaxed">
          {type === 'privacy' ? (
            <>
              <p>
                At <strong>The Spice Table (Nagpur)</strong>, we respect your privacy. All reservation contact information provided through this static demonstration website is used solely to verify and arrange dining table availability.
              </p>
              <p>
                We do not sell, distribute, or share personal contact numbers or emails with third-party advertising brokers.
              </p>
              <p>
                For questions regarding demo data or website customization for restaurant businesses, contact <code>sonali.aiautomation@gmail.com</code>.
              </p>
            </>
          ) : (
            <>
              <p>
                Tables are reserved for up to 15 minutes past the confirmed booking time before being released to walk-in patrons.
              </p>
              <p>
                Special requests (including dietary allergies, seating locations, and party celebrations) will be accommodated based on daily dining hall occupancy and kitchen preparation capacity.
              </p>
              <p>
                All menu item prices are in Indian Rupees (₹) and subject to applicable local taxes.
              </p>
            </>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-[#E8E0D5] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full text-xs font-semibold bg-[#1F1D1A] text-white hover:bg-[#C85A32] transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
