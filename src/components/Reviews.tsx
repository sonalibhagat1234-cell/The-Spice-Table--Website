import React from 'react';
import { Star, Quote, MessageSquare } from 'lucide-react';
import { reviewsData } from '../data/reviews';
import { restaurantInfo } from '../data/restaurant';

export const Reviews: React.FC = () => {
  return (
    <section id="reviews" className="py-24 bg-[#F3ECE1]/60 border-b border-[#E8E0D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#C85A32] block mb-2">
              Guest Testimonials
            </span>
            <h2
              id="reviews-heading"
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F1D1A] tracking-tight"
            >
              What Our Guests Say
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#4A4642] font-light">
              Moments of joy, family gatherings, and authentic flavors shared by our patrons.
            </p>
          </div>

          {/* Rating Summary Card */}
          <div
            id="reviews-rating-summary"
            className="mt-6 md:mt-0 bg-white px-6 py-4 rounded-2xl border border-[#E8E0D5] shadow-xs flex items-center space-x-4"
          >
            <div className="text-center pr-4 border-r border-[#E8E0D5]">
              <div className="font-serif text-3xl font-bold text-[#C85A32]">
                {restaurantInfo.googleRating}
                <span className="text-sm font-normal text-[#7A736C]">/5</span>
              </div>
              <div className="text-[10px] uppercase tracking-wider text-[#7A736C] font-semibold">
                Google Rating
              </div>
            </div>

            <div>
              <div className="flex text-[#C5A059] mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <div className="text-xs text-[#4A4642] font-medium">
                {restaurantInfo.ratingCount}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviewsData.map((review, idx) => (
            <div
              key={review.id}
              id={`review-card-${idx}`}
              className="bg-white p-7 rounded-2xl border border-[#E8E0D5] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Top: Star rating & Quote icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#C5A059]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-[#C85A32]/25" />
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#383430] font-light leading-relaxed mb-6 italic">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-[#FAF7F2]">
                <div className="font-serif text-base font-bold text-[#1F1D1A]">
                  — {review.author}
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#7A736C] mt-0.5">
                  <span>{review.location}</span>
                  <span>{review.date}</span>
                </div>
                {review.recommendedDish && (
                  <div className="mt-2 text-[10px] text-[#C85A32] font-medium bg-[#C85A32]/5 px-2 py-1 rounded-md">
                    Loved: {review.recommendedDish}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Demo Disclaimer */}
        <div className="mt-8 text-center text-xs text-[#7A736C]/70">
          * Fictional demo testimonials created for client demonstration purposes.
        </div>

      </div>
    </section>
  );
};
