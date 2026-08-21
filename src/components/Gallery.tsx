import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { galleryItems } from '../data/gallery';

export const Gallery: React.FC = () => {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Food', 'Ambiance', 'Kitchen', 'Desserts'];

  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

  const handleOpenLightbox = (index: number) => {
    setActiveImageIndex(index);
  };

  const handleCloseLightbox = useCallback(() => {
    setActiveImageIndex(null);
  }, []);

  const handleNextImage = useCallback(() => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) => ((prev! + 1) % filteredItems.length));
  }, [activeImageIndex, filteredItems.length]);

  const handlePrevImage = useCallback(() => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
  }, [activeImageIndex, filteredItems.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === 'Escape') {
        handleCloseLightbox();
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, handleCloseLightbox, handleNextImage, handlePrevImage]);

  const activeItem = activeImageIndex !== null ? filteredItems[activeImageIndex] : null;

  return (
    <section id="gallery" className="py-24 bg-[#FAF7F2] border-b border-[#E8E0D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#C85A32] block mb-2">
            Visual Ambiance & Culinary Craft
          </span>
          <h2
            id="gallery-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F1D1A] tracking-tight"
          >
            A Taste of The Spice Table
          </h2>
          <div className="w-12 h-0.5 bg-[#C85A32] mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-[#4A4642] font-light">
            Glimpse into our dining hall, our charcoal hearths, and the artistry in every dish served.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center space-x-2 mb-10 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setActiveImageIndex(null);
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#C85A32] text-white shadow-xs'
                  : 'bg-white text-[#4A4642] border border-[#E8E0D5] hover:border-[#C85A32]/40 hover:text-[#C85A32]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div
          id="gallery-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              id={`gallery-thumb-${index}`}
              onClick={() => handleOpenLightbox(index)}
              className="group relative rounded-2xl overflow-hidden aspect-4/3 sm:aspect-square bg-[#E8E0D5] cursor-pointer border border-[#E8E0D5] hover:border-[#C85A32] shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1D1A]/90 via-[#1F1D1A]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#E0C794] mb-1">
                  {item.category}
                </span>
                <h3 className="font-serif text-lg font-bold text-white leading-tight">
                  {item.title}
                </h3>
                <div className="mt-2 flex items-center text-xs text-neutral-300">
                  <Eye className="w-3.5 h-3.5 mr-1 text-[#E8835C]" />
                  <span>Click to view</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          id="gallery-lightbox-modal"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 select-none"
          onClick={handleCloseLightbox}
        >
          {/* Close button */}
          <button
            id="lightbox-close-btn"
            onClick={handleCloseLightbox}
            className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm transition-colors focus:outline-none cursor-pointer"
            aria-label="Close image preview"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            id="lightbox-prev-btn"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevImage();
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors focus:outline-none cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            id="lightbox-next-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleNextImage();
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors focus:outline-none cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Image Container */}
          <div
            id="lightbox-content-box"
            className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black max-h-[70vh]">
              <img
                id="lightbox-active-img"
                src={activeItem.image}
                alt={activeItem.title}
                className="max-w-full max-h-[70vh] object-contain mx-auto"
              />
            </div>

            <div className="mt-4 text-center text-white max-w-xl">
              <span className="text-[11px] uppercase tracking-widest text-[#E0C794] font-semibold">
                {activeItem.category} • Image {(activeImageIndex ?? 0) + 1} of {filteredItems.length}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold mt-1">
                {activeItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 font-light mt-1">
                {activeItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
