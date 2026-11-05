import React, { useState, useEffect } from 'react';
import { Menu as MenuIcon, X, Phone, Utensils, Calendar, ChevronRight } from 'lucide-react';
import { restaurantInfo } from '../data/restaurant';

interface NavbarProps {
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenReservation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section
      const sections = ['home', 'menu', 'about', 'gallery', 'reviews', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Menu', href: '#menu', id: 'menu' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Gallery', href: '#gallery', id: 'gallery' },
    { label: 'Reviews', href: '#reviews', id: 'reviews' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm border-b border-[#E8E0D5] py-3.5'
          : 'bg-gradient-to-b from-[#1F1D1A]/80 via-[#1F1D1A]/40 to-transparent py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          id="navbar-brand-logo"
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="group flex flex-col items-start focus:outline-none"
        >
          <span
            className={`font-serif tracking-wider text-xl sm:text-2xl font-bold uppercase transition-colors ${
              isScrolled ? 'text-[#1F1D1A]' : 'text-white'
            }`}
          >
            {restaurantInfo.name}
          </span>
          <span
            className={`text-[10px] tracking-[0.25em] uppercase font-medium transition-colors ${
              isScrolled ? 'text-[#C85A32]' : 'text-[#E0C794]'
            }`}
          >
            Nagpur • Contemporary Indian
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav-menu" className="hidden lg:flex items-center space-x-8" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                id={`nav-link-${link.id}`}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium transition-all relative py-1 hover:text-[#C85A32] ${
                  isScrolled
                    ? isActive
                      ? 'text-[#C85A32] font-semibold'
                      : 'text-[#4A4642]'
                    : isActive
                    ? 'text-[#E0C794] font-semibold'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C85A32] rounded-full transition-all" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action CTA */}
        <div className="hidden lg:flex items-center space-x-4">
          <span
            id="navbar-phone-text"
            className={`flex items-center text-xs font-medium space-x-1.5 ${
              isScrolled ? 'text-[#4A4642]' : 'text-white/90'
            }`}
          >
            <Phone className="w-3.5 h-3.5 text-[#C85A32]" />
            <span>{restaurantInfo.phone}</span>
          </span>

          <button
            id="navbar-reserve-btn"
            onClick={onOpenReservation}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold bg-[#C85A32] text-white shadow-sm hover:bg-[#9E3D1B] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 mr-2" />
            Reserve a Table
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center space-x-2 lg:hidden">
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg transition-colors focus:outline-none ${
              isScrolled
                ? 'text-[#1F1D1A] hover:bg-[#F3ECE1]'
                : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer-overlay"
          className="fixed inset-0 top-[60px] bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            id="mobile-drawer-panel"
            className="bg-[#FAF7F2] border-b border-[#E8E0D5] px-6 py-6 shadow-xl space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col space-y-2 border-b border-[#E8E0D5] pb-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    id={`mobile-nav-${link.id}`}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`flex items-center justify-between py-2.5 px-3 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-[#C85A32]/10 text-[#C85A32] font-semibold'
                        : 'text-[#1F1D1A] hover:bg-[#F3ECE1]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-[#C85A32]/60" />
                  </a>
                );
              })}
            </div>

            <div className="pt-2 space-y-3">
              <button
                id="mobile-reserve-cta-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full flex items-center justify-center py-3 px-4 rounded-xl text-sm font-semibold uppercase tracking-wider bg-[#C85A32] text-white shadow hover:bg-[#9E3D1B] transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Reserve a Table
              </button>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#4A4642] px-2 pt-2 gap-1">
                <span className="flex items-center">
                  <Utensils className="w-3.5 h-3.5 mr-1 text-[#C85A32]" />
                  11:00 AM – 11:00 PM
                </span>
                <span className="font-medium text-[#C85A32]">
                  {restaurantInfo.phone}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
