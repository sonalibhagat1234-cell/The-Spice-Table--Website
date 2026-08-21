import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from 'lucide-react';
import { restaurantInfo } from '../data/restaurant';
import { LegalModal } from './LegalModal';

export const Footer: React.FC = () => {
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Menu', href: '#menu' },
    { label: 'About', href: '#about' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="main-footer" className="bg-[#141211] text-neutral-300 pt-16 pb-24 md:pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-4">
            <span className="font-serif tracking-wider text-2xl font-bold text-white uppercase block">
              {restaurantInfo.name}
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-[#E8835C] font-medium block mt-1">
              Contemporary Indian Restaurant
            </span>
            <p className="mt-4 text-sm text-neutral-400 font-light leading-relaxed max-w-sm">
              {restaurantInfo.tagline}
            </p>
            <p className="mt-2 text-xs text-neutral-400 font-light leading-relaxed">
              Crafting traditional Indian culinary experiences in Nagpur with fresh ingredients and modern presentation.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 mt-6">
              <a
                id="footer-instagram-link"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#C85A32] border border-white/10 flex items-center justify-center text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                id="footer-facebook-link"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#C85A32] border border-white/10 flex items-center justify-center text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-neutral-400 hover:text-[#E8835C] transition-colors inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-neutral-400">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                <span>{restaurantInfo.fullAddress}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#C85A32] shrink-0" />
                <a href={`tel:${restaurantInfo.phoneRaw}`} className="hover:text-white transition-colors">
                  {restaurantInfo.phone}
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#C85A32] shrink-0" />
                <a href={`mailto:${restaurantInfo.email}`} className="hover:text-white transition-colors">
                  {restaurantInfo.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Opening Hours */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider mb-4">
              Opening Hours
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-neutral-400">
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">{restaurantInfo.days}</span>
                  <span>{restaurantInfo.hours}</span>
                </div>
              </div>
              <p className="text-[11px] text-neutral-400 pt-2 border-t border-white/5">
                Kitchen closes 30 minutes prior to closing time.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <div>
            © 2026 {restaurantInfo.name}. All rights reserved.
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => setLegalModalType('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setLegalModalType('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
          </div>
        </div>

      </div>

      {/* Modal for Privacy / Terms */}
      {legalModalType && (
        <LegalModal
          type={legalModalType}
          onClose={() => setLegalModalType(null)}
        />
      )}
    </footer>
  );
};
