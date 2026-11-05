import React from 'react';
import { CheckCircle2, MessageCircle, Calendar, Clock, Users, X } from 'lucide-react';
import { ReservationFormData } from '../types';
import { restaurantInfo } from '../data/restaurant';

interface ReservationSuccessModalProps {
  data: ReservationFormData;
  reservationId?: string;
  status?: string;
  onClose: () => void;
}

export const ReservationSuccessModal: React.FC<ReservationSuccessModalProps> = ({
  data,
  reservationId,
  status = 'Pending',
  onClose,
}) => {
  const displayId = reservationId || 'Pending Server Assignment';
  const whatsappMessage = encodeURIComponent(
    `Hello The Spice Table! I submitted a table reservation request (ID: ${reservationId || 'Pending'}) for ${data.name} on ${data.date} at ${data.time} for ${data.guests} guests. Please confirm our booking.`
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
          className="absolute top-5 right-5 p-2 rounded-full text-[#7A736C] hover:text-[#1F1D1A] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Heading */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-100/80 border border-amber-200 text-[#C85A32] flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F1D1A]">
            Reservation Request Received!
          </h3>

          <p className="text-xs uppercase tracking-widest text-[#C85A32] font-semibold mt-1">
            Thank you for choosing The Spice Table
          </p>

          <p className="mt-2 text-xs sm:text-sm text-[#4A4642] font-light leading-relaxed">
            Your reservation request has been received and is currently <strong className="font-semibold text-amber-700">pending confirmation</strong>.
          </p>
        </div>

        {/* Booking Details Summary Box */}
        <div className="bg-[#FAF7F2] rounded-2xl p-4 sm:p-5 border border-[#E8E0D5] space-y-3 mb-6">
          <div className="flex items-center justify-between border-b border-[#E8E0D5] pb-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C85A32]">
              Booking Summary
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800 border border-amber-200">
              Status: {status}
            </span>
          </div>

          {reservationId && (
            <div className="flex items-center justify-between text-xs py-1 px-2.5 bg-white rounded-lg border border-[#E8E0D5]">
              <span className="text-[#7A736C] font-medium">Reservation ID:</span>
              <span className="font-mono font-bold text-[#1F1D1A] text-xs sm:text-sm tracking-wide">
                {displayId}
              </span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm text-[#1F1D1A] pt-1">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-[#C85A32] shrink-0" />
              <span><strong>Date:</strong> {data.date}</span>
            </div>

            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[#C85A32] shrink-0" />
              <span><strong>Time:</strong> {data.time}</span>
            </div>

            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-[#C85A32] shrink-0" />
              <span><strong>Guests:</strong> {data.guests}</span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-[#C85A32] font-bold">📞</span>
              <span className="truncate"><strong>Phone:</strong> {data.phone}</span>
            </div>
          </div>

          {data.specialRequest && (
            <div className="pt-2 border-t border-[#E8E0D5] text-xs text-[#5C5650]">
              <strong>Special Request:</strong> {data.specialRequest}
            </div>
          )}
        </div>

        <p className="text-center text-xs text-[#7A736C] font-light mb-5">
          Our team will contact you to confirm your reservation.
        </p>

        {/* Demo Action & Close */}
        <div className="space-y-3">
          <div
            id="whatsapp-confirm-disabled"
            className="w-full inline-flex items-center justify-center py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-neutral-100 text-neutral-500 border border-neutral-200 select-none"
          >
            <MessageCircle className="w-4 h-4 mr-2 text-neutral-400" />
            <span>WhatsApp Disabled – Demo Contact</span>
          </div>

          <button
            id="done-reservation-btn"
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-[#FAF7F2] text-[#4A4642] hover:bg-[#F3ECE1] transition-colors border border-[#E8E0D5] cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
