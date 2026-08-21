import React, { useState } from 'react';
import { Calendar, Clock, Users, Phone, Mail, User, MessageSquare, MessageCircle, Sparkles } from 'lucide-react';
import { ReservationFormData } from '../types';
import { restaurantInfo } from '../data/restaurant';
import { ReservationSuccessModal } from './ReservationSuccessModal';

export const Reservation: React.FC = () => {
  const [formData, setFormData] = useState<ReservationFormData>({
    name: '',
    phone: '',
    email: '',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow's date
    time: '19:30',
    guests: '2 People',
    specialRequest: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ReservationFormData, string>>>({});
  const [submittedData, setSubmittedData] = useState<ReservationFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM',
    '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM'
  ];

  const guestOptions = [
    '1 Person', '2 People', '3 People', '4 People', '5 People',
    '6 People', '7-8 People (Family)', '9-12 People (Party)', '12+ People (Large Gathering)'
  ];

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ReservationFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your contact phone number.';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date for your visit.';
    }

    if (!formData.time) {
      newErrors.time = 'Please select a preferred time slot.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // =========================================================================
    // FUTURE: Connect reservation form to n8n webhook, Formspree, or backend API:
    // Example:
    // await fetch('https://your-n8n-webhook-instance.com/webhook/reservation', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // });
    // =========================================================================

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData({ ...formData });
      // Reset optional fields
      setFormData({
        name: '',
        phone: '',
        email: '',
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        time: '19:30',
        guests: '2 People',
        specialRequest: '',
      });
      setErrors({});
    }, 400);
  };

  return (
    <section id="reservation" className="py-24 bg-[#FAF7F2] border-b border-[#E8E0D5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#C85A32] block mb-2">
            Table Booking
          </span>
          <h2
            id="reservation-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F1D1A] tracking-tight"
          >
            Reserve Your Table
          </h2>
          <div className="w-12 h-0.5 bg-[#C85A32] mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-[#4A4642] font-light">
            Book in advance for family dining, private celebrations, or corporate dinners in Nagpur.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          
          {/* Reservation Info & WhatsApp Sidebox */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#1F1D1A] text-white p-7 rounded-3xl shadow-lg relative overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-[#C85A32]/30 flex items-center justify-center mb-4">
                <Sparkles className="w-4 h-4 text-[#E0C794]" />
              </div>

              <h3 className="font-serif text-xl font-bold text-white mb-2">
                Instant Hospitality
              </h3>
              <p className="text-xs text-neutral-300 font-light leading-relaxed mb-6">
                Special arrangements for birthdays, anniversaries, candle-light tables, and custom spice preferences are welcomed.
              </p>

              <div className="space-y-3 text-xs text-neutral-200 border-t border-white/10 pt-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-[#C85A32]" />
                  <span>Tables held for 15 mins post booking time</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-[#C85A32]" />
                  <span>Large groups (10+) receive curated set menus</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp CTA Box */}
            <div className="bg-white p-6 rounded-3xl border border-[#E8E0D5] shadow-xs text-center">
              <MessageCircle className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <h4 className="font-serif text-lg font-bold text-[#1F1D1A] mb-1">
                Prefer WhatsApp Booking?
              </h4>
              <p className="text-xs text-[#5C5650] mb-4">
                Chat directly with our host for instant reservations.
              </p>
              {/* FUTURE: Connect WhatsApp CTA to automated business bot */}
              <a
                id="direct-whatsapp-reservation-link"
                href={`https://wa.me/${restaurantInfo.whatsappRaw}?text=Hi%20The%20Spice%20Table,%20I%20would%20like%20to%20reserve%20a%20table.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider bg-emerald-700 hover:bg-emerald-800 text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                <span>WhatsApp Us Now</span>
              </a>
            </div>
          </div>

          {/* Main Reservation Form */}
          <div className="lg:col-span-8 bg-white p-8 sm:p-10 rounded-3xl border border-[#E8E0D5] shadow-sm">
            <form id="restaurant-reservation-form" onSubmit={handleSubmit} noValidate className="space-y-6">
              
              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="res-name" className="block text-xs font-semibold uppercase tracking-wider text-[#4A4642] mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#7A736C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="res-name"
                      type="text"
                      placeholder="e.g. Ankit Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full pl-10 pr-4 py-3 text-sm bg-[#FAF7F2] border rounded-xl focus:outline-none focus:bg-white text-[#1F1D1A] ${
                        errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-[#E8E0D5] focus:border-[#C85A32]'
                      }`}
                      required
                    />
                  </div>
                  {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="res-phone" className="block text-xs font-semibold uppercase tracking-wider text-[#4A4642] mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#7A736C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="res-phone"
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full pl-10 pr-4 py-3 text-sm bg-[#FAF7F2] border rounded-xl focus:outline-none focus:bg-white text-[#1F1D1A] ${
                        errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-[#E8E0D5] focus:border-[#C85A32]'
                      }`}
                      required
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Row 2: Email & Number of Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="res-email" className="block text-xs font-semibold uppercase tracking-wider text-[#4A4642] mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#7A736C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="res-email"
                      type="email"
                      placeholder="e.g. ankit@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full pl-10 pr-4 py-3 text-sm bg-[#FAF7F2] border rounded-xl focus:outline-none focus:bg-white text-[#1F1D1A] ${
                        errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-[#E8E0D5] focus:border-[#C85A32]'
                      }`}
                      required
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="res-guests" className="block text-xs font-semibold uppercase tracking-wider text-[#4A4642] mb-2">
                    Number of Guests *
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-[#7A736C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      id="res-guests"
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 text-sm bg-[#FAF7F2] border border-[#E8E0D5] rounded-xl focus:outline-none focus:bg-white focus:border-[#C85A32] text-[#1F1D1A]"
                    >
                      {guestOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Row 3: Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="res-date" className="block text-xs font-semibold uppercase tracking-wider text-[#4A4642] mb-2">
                    Date *
                  </label>
                  <div className="relative">
                    <input
                      id="res-date"
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className={`w-full px-4 py-3 text-sm bg-[#FAF7F2] border rounded-xl focus:outline-none focus:bg-white text-[#1F1D1A] ${
                        errors.date ? 'border-red-500' : 'border-[#E8E0D5] focus:border-[#C85A32]'
                      }`}
                      required
                    />
                  </div>
                  {errors.date && <p className="text-xs text-red-600 mt-1">{errors.date}</p>}
                </div>

                <div>
                  <label htmlFor="res-time" className="block text-xs font-semibold uppercase tracking-wider text-[#4A4642] mb-2">
                    Preferred Time *
                  </label>
                  <div className="relative">
                    <select
                      id="res-time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className={`w-full px-4 py-3 text-sm bg-[#FAF7F2] border rounded-xl focus:outline-none focus:bg-white text-[#1F1D1A] ${
                        errors.time ? 'border-red-500' : 'border-[#E8E0D5] focus:border-[#C85A32]'
                      }`}
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.time && <p className="text-xs text-red-600 mt-1">{errors.time}</p>}
                </div>
              </div>

              {/* Row 4: Special Requests */}
              <div>
                <label htmlFor="res-special-request" className="block text-xs font-semibold uppercase tracking-wider text-[#4A4642] mb-2">
                  Special Request (Optional)
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-[#7A736C] absolute left-3.5 top-3.5" />
                  <textarea
                    id="res-special-request"
                    rows={3}
                    placeholder="E.g., Window seating, birthday celebration, mild spicy food preferences..."
                    value={formData.specialRequest}
                    onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 text-sm bg-[#FAF7F2] border border-[#E8E0D5] rounded-xl focus:outline-none focus:bg-white focus:border-[#C85A32] text-[#1F1D1A]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  id="submit-reservation-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl text-sm font-semibold uppercase tracking-wider bg-[#C85A32] hover:bg-[#9E3D1B] text-white shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center cursor-pointer disabled:opacity-75"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{isSubmitting ? 'Processing Request...' : 'Request Reservation'}</span>
                </button>
                <p className="text-center text-[11px] text-[#7A736C] mt-3">
                  No payment required now. Our team will verify table availability instantly.
                </p>
              </div>

            </form>
          </div>

        </div>

      </div>

      {/* Success Modal */}
      {submittedData && (
        <ReservationSuccessModal
          data={submittedData}
          onClose={() => setSubmittedData(null)}
        />
      )}
    </section>
  );
};
