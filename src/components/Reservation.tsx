import React, { useState } from 'react';
import { Calendar, Clock, Users, Phone, Mail, User, MessageSquare, MessageCircle, Sparkles, AlertCircle } from 'lucide-react';
import { ReservationFormData, ConfirmedReservation } from '../types';
import { restaurantInfo } from '../data/restaurant';
import { ReservationSuccessModal } from './ReservationSuccessModal';
import { GOOGLE_APPS_SCRIPT_URL, isAppsScriptConfigured } from '../config/reservationConfig';

export const Reservation: React.FC = () => {
  const [formData, setFormData] = useState<ReservationFormData>({
    name: '',
    phone: '',
    email: '',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow's date
    time: '07:30 PM',
    guests: '2 People',
    specialRequest: '',
  });

  // Honeypot anti-spam field (hidden from legitimate visitors)
  const [honeypot, setHoneypot] = useState('');

  const [errors, setErrors] = useState<Partial<Record<keyof ReservationFormData, string>>>({});
  const [confirmedReservation, setConfirmedReservation] = useState<ConfirmedReservation | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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
    const trimmedName = formData.name.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedEmail = formData.email.trim();
    const cleanPhoneDigits = trimmedPhone.replace(/[^0-9]/g, '');

    // 1. Full Name validation
    if (!trimmedName) {
      newErrors.name = 'Please enter your full name.';
    } else if (trimmedName.length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    } else if (trimmedName.length > 80) {
      newErrors.name = 'Name must be 80 characters or fewer.';
    }

    // 2. Phone Number validation
    if (!trimmedPhone) {
      newErrors.phone = 'Please enter your contact phone number.';
    } else if (cleanPhoneDigits.length < 10 || cleanPhoneDigits.length > 15) {
      newErrors.phone = 'Please enter a valid phone number (10 to 15 digits).';
    } else if (trimmedPhone.length > 25) {
      newErrors.phone = 'Phone number input is too long.';
    }

    // 3. Email Address validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!trimmedEmail) {
      newErrors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(trimmedEmail)) {
      newErrors.email = 'Please enter a valid email address.';
    } else if (trimmedEmail.length > 100) {
      newErrors.email = 'Email address must be 100 characters or fewer.';
    }

    // 4. Number of Guests validation
    if (!formData.guests) {
      newErrors.guests = 'Please select the number of guests.';
    }

    // 5. Reservation Date validation (no past dates allowed)
    if (!formData.date) {
      newErrors.date = 'Please select a date for your visit.';
    } else {
      const today = new Date().toISOString().split('T')[0];
      if (formData.date < today) {
        newErrors.date = 'Reservation date cannot be in the past.';
      }
    }

    // 6. Preferred Time validation
    if (!formData.time) {
      newErrors.time = 'Please select a preferred time slot.';
    } else if (!timeSlots.includes(formData.time)) {
      newErrors.time = 'Please select a valid time slot from the list.';
    }

    // 7. Special Request validation (optional, limit length)
    if (formData.specialRequest && formData.specialRequest.length > 500) {
      newErrors.specialRequest = 'Special request must be 500 characters or fewer.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Honeypot anti-spam check: If filled by automated bots, reject immediately
    if (honeypot.trim() !== '') {
      setSubmitError("We couldn't submit your reservation right now. Please try again or contact the restaurant directly.");
      return;
    }

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Prepare payload with trimmed client inputs (includes full names and aliases)
    const payload = {
      // Standard exact names as required
      'Full Name': formData.name.trim(),
      'Phone Number': formData.phone.trim(),
      'Email Address': formData.email.trim(),
      'Number of Guests': formData.guests,
      'Reservation Date': formData.date,
      'Preferred Time': formData.time,
      'Special Request': formData.specialRequest?.trim() || '',
      // camelCase names
      fullName: formData.name.trim(),
      phoneNumber: formData.phone.trim(),
      emailAddress: formData.email.trim(),
      numberOfGuests: formData.guests,
      reservationDate: formData.date,
      preferredTime: formData.time,
      specialRequest: formData.specialRequest?.trim() || '',
      // Short aliases
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      guests: formData.guests,
      date: formData.date,
      time: formData.time,
      honeypot: honeypot.trim(),
    };

    try {
      // Check if Google Apps Script URL has been configured by the owner
      if (!isAppsScriptConfigured()) {
        console.warn(
          'Google Apps Script Web App URL is not yet configured. Please set VITE_GOOGLE_APPS_SCRIPT_URL.'
        );
        throw new Error('CONFIG_REQUIRED');
      }

      // Send reservation request to Google Apps Script Web App
      // Using Content-Type: 'text/plain;charset=utf-8' is a CORS simple request,
      // which avoids the OPTIONS preflight that Google Apps Script Web Apps block.
      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      let result: { success?: boolean; reservationId?: string; message?: string } | null = null;
      try {
        const text = await response.text();
        result = JSON.parse(text);
      } catch (parseErr) {
        // Non-JSON response, handle based on status below
      }

      if (result && result.success) {
        // Success: Google Apps Script assigned Reservation ID and set Status to Pending
        setConfirmedReservation({
          ...formData,
          reservationId: result.reservationId || `ST-${formData.date.replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`,
          status: 'Pending',
        });
        setIsSubmitted(true);
        setSubmitError(null);
      } else if (response.ok && !result) {
        // Endpoint succeeded with 200 OK
        setConfirmedReservation({
          ...formData,
          reservationId: `ST-${formData.date.replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`,
          status: 'Pending',
        });
        setIsSubmitted(true);
        setSubmitError(null);
      } else {
        // Server returned an explicit error message or non-200 status
        setSubmitError(
          result?.message || "We couldn't submit your reservation request right now. Please try again or visit our location."
        );
      }
    } catch (err: unknown) {
      // User-friendly error message — do not expose technical errors or credentials
      setSubmitError("We couldn't submit your reservation request right now. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setConfirmedReservation(null);
    setIsSubmitted(false);
    // Reset form fields after confirmed submission
    setFormData({
      name: '',
      phone: '',
      email: '',
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      time: '07:30 PM',
      guests: '2 People',
      specialRequest: '',
    });
    setErrors({});
    setSubmitError(null);
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

            {/* Direct WhatsApp CTA Box (Demo placeholder) */}
            <div className="bg-white p-6 rounded-3xl border border-[#E8E0D5] shadow-xs text-center">
              <MessageCircle className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
              <h4 className="font-serif text-lg font-bold text-[#1F1D1A] mb-1">
                WhatsApp Reservations
              </h4>
              <p className="text-xs text-[#5C5650] mb-4">
                Online demo mode: direct WhatsApp links are disabled for portfolio demonstration.
              </p>
              <div
                id="direct-whatsapp-reservation-disabled"
                className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider bg-neutral-100 text-neutral-500 border border-neutral-200 cursor-not-allowed select-none"
              >
                <MessageCircle className="w-4 h-4 mr-2 text-neutral-400" />
                <span>Demo Contact – Not a Real Number</span>
              </div>
            </div>
          </div>

          {/* Main Reservation Form */}
          <div className="lg:col-span-8 bg-white p-8 sm:p-10 rounded-3xl border border-[#E8E0D5] shadow-sm">
            <form id="restaurant-reservation-form" onSubmit={handleSubmit} noValidate className="space-y-6">
              
              {/* Invisible Honeypot Anti-Spam Field */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website-hp-field">Leave this field blank</label>
                <input
                  id="website-hp-field"
                  type="text"
                  name="website_hp"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

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
                      maxLength={80}
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={isSubmitting || isSubmitted}
                      className={`w-full pl-10 pr-4 py-3 text-sm bg-[#FAF7F2] border rounded-xl focus:outline-none focus:bg-white text-[#1F1D1A] ${
                        errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-[#E8E0D5] focus:border-[#C85A32]'
                      } disabled:opacity-75`}
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
                      maxLength={25}
                      placeholder="e.g. 98XXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={isSubmitting || isSubmitted}
                      className={`w-full pl-10 pr-4 py-3 text-sm bg-[#FAF7F2] border rounded-xl focus:outline-none focus:bg-white text-[#1F1D1A] ${
                        errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-[#E8E0D5] focus:border-[#C85A32]'
                      } disabled:opacity-75`}
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
                      maxLength={100}
                      placeholder="e.g. rahul@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={isSubmitting || isSubmitted}
                      className={`w-full pl-10 pr-4 py-3 text-sm bg-[#FAF7F2] border rounded-xl focus:outline-none focus:bg-white text-[#1F1D1A] ${
                        errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-[#E8E0D5] focus:border-[#C85A32]'
                      } disabled:opacity-75`}
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
                      disabled={isSubmitting || isSubmitted}
                      className="w-full pl-10 pr-4 py-3 text-sm bg-[#FAF7F2] border border-[#E8E0D5] rounded-xl focus:outline-none focus:bg-white focus:border-[#C85A32] text-[#1F1D1A] disabled:opacity-75"
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
                      disabled={isSubmitting || isSubmitted}
                      className={`w-full px-4 py-3 text-sm bg-[#FAF7F2] border rounded-xl focus:outline-none focus:bg-white text-[#1F1D1A] ${
                        errors.date ? 'border-red-500' : 'border-[#E8E0D5] focus:border-[#C85A32]'
                      } disabled:opacity-75`}
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
                      disabled={isSubmitting || isSubmitted}
                      className={`w-full px-4 py-3 text-sm bg-[#FAF7F2] border rounded-xl focus:outline-none focus:bg-white text-[#1F1D1A] ${
                        errors.time ? 'border-red-500' : 'border-[#E8E0D5] focus:border-[#C85A32]'
                      } disabled:opacity-75`}
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
                    maxLength={500}
                    placeholder="E.g., Window seating, birthday celebration, mild spicy food preferences..."
                    value={formData.specialRequest}
                    onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                    disabled={isSubmitting || isSubmitted}
                    className="w-full pl-10 pr-4 py-3 text-sm bg-[#FAF7F2] border border-[#E8E0D5] rounded-xl focus:outline-none focus:bg-white focus:border-[#C85A32] text-[#1F1D1A] disabled:opacity-75"
                  />
                </div>
                {errors.specialRequest && <p className="text-xs text-red-600 mt-1">{errors.specialRequest}</p>}
              </div>

              {/* Error Banner */}
              {submitError && (
                <div
                  id="res-submit-error-banner"
                  role="alert"
                  className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-medium flex items-start space-x-2"
                >
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Submit Button */}
              <div>
                <button
                  id="submit-reservation-btn"
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="w-full py-4 px-6 rounded-2xl text-sm font-semibold uppercase tracking-wider bg-[#C85A32] hover:bg-[#9E3D1B] text-white shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{isSubmitting ? 'SUBMITTING...' : 'REQUEST RESERVATION'}</span>
                </button>
                <p className="text-center text-[11px] text-[#7A736C] mt-3">
                  No payment required now. Our team will verify table availability instantly.
                </p>
                <p className="text-center text-[11px] text-[#7A736C]/90 mt-1 font-light">
                  Your information is used only to process your reservation request.
                </p>
              </div>

            </form>
          </div>

        </div>

      </div>

      {/* Success Modal */}
      {confirmedReservation && (
        <ReservationSuccessModal
          data={confirmedReservation}
          reservationId={confirmedReservation.reservationId}
          status={confirmedReservation.status}
          onClose={handleModalClose}
        />
      )}
    </section>
  );
};
