import React from 'react';
import { CheckCircle2, MessageCircle, Calendar, Clock, Users, X } from 'lucide-react';
import { ReservationFormData } from '../types';
import { restaurantInfo } from '../data/restaurant';

interface ReservationSuccessModalProps {
  data: ReservationFormData;
  onClose: () => void;
}

export const ReservationSuccessModal: React.FC<ReservationSuccessModalProps> = ({
  data,
  onClose,
}) => {
  const whatsappMessage = encodeURIComponent(
    `Hello The Spice Table! I submitted a table reservation for ${data.name} on ${data.date} at ${data.time} for ${data.guests} guests. Please confirm our booking.`
  );

  return (
    <div
      id="reservation-success-modal"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E8E0D5] relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-success-modal-btn"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#7A736C] hover:text-[#1F1D1A] hover:bg-[#FAF7F2] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Heading */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F1D1A]">
            Reservation Request Received
          </h3>

          <p className="mt-2 text-sm text-[#4A4642] font-light">
            Thank you, <strong className="font-semibold text-[#1F1D1A]">{data.name}</strong>. We have received your reservation request and will contact you shortly to confirm.
          </p>
        </div>

        {/* Booking Details Summary Box */}
        <div className="bg-[#FAF7F2] rounded-2xl p-4 sm:p-5 border border-[#E8E0D5] space-y-3 mb-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#C85A32]">
            Booking Summary
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm text-[#1F1D1A]">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-[#C85A32]" />
              <span><strong>Date:</strong> {data.date}</span>
            </div>

            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[#C85A32]" />
              <span><strong>Time:</strong> {data.time}</span>
            </div>

            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-[#C85A32]" />
              <span><strong>Guests:</strong> {data.guests}</span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-[#C85A32] font-bold">📞</span>
              <span><strong>Phone:</strong> {data.phone}</span>
            </div>
          </div>

          {data.specialRequest && (
            <div className="pt-2 border-t border-[#E8E0D5] text-xs text-[#5C5650]">
              <strong>Special Request:</strong> {data.specialRequest}
            </div>
          )}
        </div>

        {/* WhatsApp Fast Confirmation & Close */}
        <div className="space-y-3">
          <a
            id="whatsapp-confirm-btn"
            href={`https://wa.me/${restaurantInfo.whatsappRaw}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center py-3.5 px-4 rounded-xl text-sm font-semibold bg-emerald-700 hover:bg-emerald-800 text-white shadow-md transition-colors"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            <span>Instant Confirmation via WhatsApp</span>
          </a>

          <button
            id="done-reservation-btn"
            onClick={onClose}
            className="w-full py-3 px-4 rounded-xl text-sm font-semibold bg-[#FAF7F2] text-[#4A4642] hover:bg-[#F3ECE1] transition-colors border border-[#E8E0D5]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
