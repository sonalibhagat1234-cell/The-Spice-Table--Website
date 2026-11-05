import React from 'react';
import { MapPin, Phone, Mail, Clock, Navigation, ExternalLink, Calendar } from 'lucide-react';
import { restaurantInfo } from '../data/restaurant';

export const LocationContact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-[#F3ECE1]/60 border-b border-[#E8E0D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#C85A32] block mb-2">
            Find Our Restaurant
          </span>
          <h2
            id="contact-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F1D1A] tracking-tight"
          >
            Visit Us
          </h2>
          <div className="w-12 h-0.5 bg-[#C85A32] mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-[#4A4642] font-light">
            Conveniently situated in the heart of Nagpur with valet parking and welcoming dining spaces.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* Contact Details Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {/* Address */}
            <div id="contact-address-card" className="bg-white p-6 rounded-2xl border border-[#E8E0D5] shadow-xs flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-[#C85A32]/10 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-5 h-5 text-[#C85A32]" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1F1D1A]">Our Address</h3>
                <p className="text-xs sm:text-sm text-[#4A4642] font-light mt-1">
                  {restaurantInfo.fullAddress}
                </p>
                <span className="inline-block text-[11px] text-[#C85A32] font-medium mt-1">
                  Valet parking available
                </span>
              </div>
            </div>

            {/* Phone */}
            <div id="contact-phone-card" className="bg-white p-6 rounded-2xl border border-[#E8E0D5] shadow-xs flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-[#C85A32]/10 flex items-center justify-center shrink-0 mt-0.5">
                <Phone className="w-5 h-5 text-[#C85A32]" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1F1D1A]">Phone & Table Booking</h3>
                <span
                  className="text-xs sm:text-sm font-semibold text-[#1F1D1A] block mt-1"
                >
                  {restaurantInfo.phone}
                </span>
                <span className="text-[11px] text-[#7A736C]">Portfolio demonstration only</span>
              </div>
            </div>

            {/* Email */}
            <div id="contact-email-card" className="bg-white p-6 rounded-2xl border border-[#E8E0D5] shadow-xs flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-[#C85A32]/10 flex items-center justify-center shrink-0 mt-0.5">
                <Mail className="w-5 h-5 text-[#C85A32]" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1F1D1A]">Email Enquiries</h3>
                <a
                  href={`mailto:${restaurantInfo.email}`}
                  className="text-xs sm:text-sm font-medium text-[#C85A32] hover:underline block mt-1"
                >
                  {restaurantInfo.email}
                </a>
                <span className="text-[11px] text-[#7A736C]">Catering & private event bookings</span>
              </div>
            </div>

            {/* Hours */}
            <div id="contact-hours-card" className="bg-white p-6 rounded-2xl border border-[#E8E0D5] shadow-xs flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-[#C85A32]/10 flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-5 h-5 text-[#C85A32]" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1F1D1A]">Operating Hours</h3>
                <p className="text-xs sm:text-sm text-[#4A4642] font-light mt-1">
                  {restaurantInfo.days}: <strong>{restaurantInfo.hours}</strong>
                </p>
                <span className="text-[11px] text-emerald-700 font-medium">Lunch & Dinner Service</span>
              </div>
            </div>
          </div>

          {/* Map Representation & Directions Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E8E0D5] shadow-xs overflow-hidden flex flex-col justify-between">
            {/* Visual Map Representation */}
            <div className="relative w-full h-72 sm:h-80 bg-[#E8E0D5] overflow-hidden group">
              {/* Map Graphic / Background Pattern */}
              <div className="absolute inset-0 bg-[#E5DFD5] opacity-90">
                {/* SVG Map Grid roads styling for high-end aesthetic */}
                <svg className="w-full h-full text-[#D4CCC0]" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="map-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#map-grid)" />
                  <path d="M -50 150 Q 200 80 500 200 T 900 120" fill="none" stroke="#FAF7F2" strokeWidth="16" />
                  <path d="M 120 -50 L 300 450" fill="none" stroke="#FAF7F2" strokeWidth="12" />
                  <path d="M 450 -50 L 250 450" fill="none" stroke="#FAF7F2" strokeWidth="8" />
                </svg>
              </div>

              {/* Pin Marker Card in the Center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="bg-[#1F1D1A] text-white px-4 py-2 rounded-xl shadow-xl border border-white/20 flex items-center space-x-2 text-xs font-semibold whitespace-nowrap animate-bounce">
                  <span className="w-2 h-2 rounded-full bg-[#C85A32]" />
                  <span>THE SPICE TABLE</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#C85A32] border-4 border-white shadow-xl flex items-center justify-center text-white -mt-1">
                  <MapPin className="w-4 h-4" />
                </div>
              </div>

              {/* Landmark badges */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-md text-[11px] font-medium text-[#4A4642] border border-[#E8E0D5] shadow-xs">
                Civil Lines, Nagpur
              </div>

              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-md text-[11px] font-medium text-[#4A4642] border border-[#E8E0D5] shadow-xs">
                Nagpur Junction • 10 mins
              </div>
            </div>

            {/* Action Bottom Bar */}
            <div className="p-6 sm:p-8 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-serif text-lg font-bold text-[#1F1D1A]">
                  Plan Your Route
                </h4>
                <p className="text-xs text-[#5C5650] font-light">
                  Easily navigate via Google Maps or Apple Maps.
                </p>
              </div>

              <a
                id="get-directions-btn"
                href={`https://www.google.com/maps/search/?api=1&query=The+Spice+Table+Nagpur+Maharashtra`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#C85A32] hover:bg-[#9E3D1B] text-white shadow-sm transition-colors cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 mr-2" />
                <span>Get Directions</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1.5 opacity-80" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
