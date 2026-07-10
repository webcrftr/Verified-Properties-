/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Star, BadgeCheck, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section id="why-us" className="py-24 bg-[#111827] text-white border-b border-[#374151]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-20">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#F0D36B] font-semibold block mb-3">
            CLIENT SATISFACTION
          </span>
          <h2 className="text-4xl sm:text-5xl font-light font-serif text-white">
            What Our <span className="font-serif italic font-bold text-[#F0D36B]">Clients Say</span>
          </h2>
          <div className="h-[1px] w-24 bg-[#E8C75A] mx-auto mt-6"></div>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-[#D1D5DB] mt-4 uppercase tracking-wider leading-relaxed">
            Hear from families and local businesses who bought, rented, or invested under the guidance of Verified Properties.
          </p>
        </div>

        {/* Carousel slide layout for mobile, split grid on desktop */}
        <div className="hidden lg:grid grid-cols-3 gap-8">
          {TESTIMONIALS.map((test, index) => (
            <div
              key={index}
              className="bg-[#1F2937]/90 backdrop-blur-md p-8 border border-[#374151] relative flex flex-col justify-between hover:border-[#D9B84C]/35 transition-all duration-300"
            >
              <div>
                {/* Gold Quote icon decoration */}
                <div className="absolute top-6 right-6 opacity-5">
                  <Quote className="h-10 w-10 text-[#F0D36B] rotate-180" />
                </div>

                {/* Rating layout */}
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(test.stars)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-[#F0D36B] fill-[#E8C75A]" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-sm sm:text-base text-[#FFFFFF] italic leading-relaxed mb-6 font-serif font-light">
                  "{test.text}"
                </p>
              </div>

              {/* Author bio row with verified badge */}
              <div className="border-t border-[#374151] pt-5 mt-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold tracking-wider font-serif text-white">{test.name}</h4>
                  <p className="text-[10px] text-[#F0D36B] font-mono uppercase tracking-wider mt-0.5">{test.role}</p>
                </div>
                <span className="px-2.5 py-1 bg-[#F0D36B]/10 text-[#F0D36B] text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 border border-[#374151]">
                  <BadgeCheck className="h-3 w-3" />
                  <span>Verified Buyer</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Responsive Mobile / Tablet Slider view */}
        <div className="block lg:hidden max-w-xl mx-auto">
          <div className="bg-[#1F2937]/90 backdrop-blur-md p-6 sm:p-8 border border-[#374151] relative min-h-[250px] flex flex-col justify-between">
            <div>
              {/* Quote icon */}
              <div className="absolute top-4 right-4 opacity-5">
                <Quote className="h-8 w-8 text-[#F0D36B]" />
              </div>

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(TESTIMONIALS[currentIndex].stars)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-[#F0D36B] fill-[#E8C75A]" />
                ))}
              </div>

              {/* Body text */}
              <p className="text-sm sm:text-base text-[#FFFFFF] italic leading-relaxed mb-6 font-serif font-light">
                "{TESTIMONIALS[currentIndex].text}"
              </p>
            </div>

            {/* Author details */}
            <div className="border-t border-[#374151] pt-4 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold tracking-wider font-serif text-white">{TESTIMONIALS[currentIndex].name}</h4>
                <p className="text-[9px] text-[#F0D36B] font-mono uppercase tracking-wider mt-0.5">{TESTIMONIALS[currentIndex].role}</p>
              </div>
              <span className="px-2 py-0.5 bg-[#F0D36B]/10 text-[#F0D36B] text-[8px] font-bold uppercase tracking-wider flex items-center gap-1 border border-[#374151]">
                <BadgeCheck className="h-3 w-3" />
                <span>Verified Client</span>
              </span>
            </div>
          </div>

          {/* Slider controls button block */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handlePrev}
              className="p-3 bg-white/5 border border-[#374151] hover:border-[#D9B84C] text-white active:scale-95 transition-all cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 bg-white/5 border border-[#374151] hover:border-[#D9B84C] text-white active:scale-95 transition-all cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
