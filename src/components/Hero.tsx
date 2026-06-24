/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Phone, MessageSquare, ShieldCheck, MapPin, Award } from 'lucide-react';
import { BUSINESS_DETAILS } from '../data';

interface HeroProps {
  onOpenEnquiry: (propertyName?: string) => void;
}

export default function Hero({ onOpenEnquiry }: HeroProps) {
  const handleScrollToProperties = () => {
    const element = document.getElementById('properties');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleScrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[95vh] sm:min-h-screen flex items-center justify-center bg-[#050B18] pt-24 pb-16 overflow-hidden"
    >
      {/* Background Graphic Content with high quality loaded image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/verified_properties_hero_1782216213939.jpg"
          alt="Luxury Real Estate Sunset Skyscraper"
          className="w-full h-full object-cover object-center opacity-25 scale-100 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Deep navy/black gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050B18] via-[#050B18]/70 to-[#050B18]/90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#050B18]/80 via-transparent to-[#050B18]/50"></div>
      </div>

      {/* Decorative Gold subtle light beams */}
      <div className="absolute right-10 top-1/4 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full filter blur-[120px] pointer-events-none"></div>
      <div className="absolute left-10 bottom-1/8 w-[400px] h-[400px] bg-[#D4AF37]/3 rounded-full filter blur-[100px] pointer-events-none"></div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 flex flex-col items-center text-center">
        
        {/* RERA and Trust Ribbon */}
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 border border-white/10 backdrop-blur-md mb-8 animate-fade-in-up">
          <Award className="h-4 w-4 text-[#D4AF37]" />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/80">
            Government Approved RERA Consultant: 
          </span>
          <span className="text-[10px] font-mono font-bold text-[#D4AF37] tracking-wider pl-1 border-l border-white/20 ml-1">
            {BUSINESS_DETAILS.reraNo}
          </span>
        </div>

        {/* Primary Headline in Editorial style */}
        <h1 className="max-w-4xl text-5xl sm:text-7xl lg:text-8xl font-light font-sans text-white leading-[0.95] tracking-tight mb-8">
          Find Your <br />
          <span className="font-serif italic font-bold text-[#D4AF37]">Dream Property</span>
        </h1>

        {/* Subtitle description */}
        <p className="max-w-2xl text-xs sm:text-base text-white/70 mb-10 leading-relaxed uppercase tracking-wider font-sans font-normal">
          Verified flats, premium commercial spaces, retail shops, and lucrative land plots in 
          <span className="text-[#D4AF37] font-semibold"> Naigaon, Vasai, Virar, and Palghar</span>. Guided by expert local insights and zero-risk legal checks.
        </p>

        {/* Interactive Call-To-Action buttons with Editorial layout */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4">
          <button
            onClick={handleScrollToProperties}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-[#D4AF37] text-[#050B18] font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300 shadow-md transform hover:-translate-y-0.5 w-full sm:w-auto"
          >
            <span>View Listings</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          
          <button
            onClick={handleScrollToContact}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white/5 text-white font-bold text-xs uppercase tracking-widest border border-white/15 hover:bg-white hover:text-[#050B18] transition-colors duration-300 w-full sm:w-auto"
          >
            <Phone className="h-4 w-4 text-[#D4AF37]" />
            <span>Schedule Consultation</span>
          </button>
        </div>

        {/* Core Stats / USP Grid with sharp layout blocks (Editorial structure) */}
        <div className="mt-16 sm:mt-24 grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-b border-white/10 w-full">
          {[
            { label: 'RERA Registered Listings', value: '100%', detail: 'Legally Valid Cards' },
            { label: 'Happy Families', value: '250+', detail: 'Settled Suburbs' },
            { label: 'Years Experience', value: '8+', detail: 'Consultancy Excellence' },
            { label: 'Brokerage Consultation', value: 'End-to-End', detail: 'Stress-Free Buy/Rent' }
          ].map((stat, i) => (
            <div
              key={i}
              className={`p-6 bg-transparent flex flex-col justify-center items-center ${
                i < 3 ? 'border-b md:border-b-0 md:border-r border-white/10' : 'border-b md:border-b-0 border-white/10 sm:border-b-0'
              }`}
            >
              <span className="text-3xl sm:text-4xl font-serif italic font-bold text-[#D4AF37] mb-2">{stat.value}</span>
              <span className="text-[10px] font-bold text-white uppercase tracking-[0.15em] mb-1 text-center">{stat.label}</span>
              <span className="text-[9px] uppercase tracking-wider text-white/50 text-center">{stat.detail}</span>
            </div>
          ))}
        </div>

        {/* Key quick locations markers */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/40 text-[10px] tracking-widest uppercase">
          <span className="text-[#D4AF37] font-semibold">OUR PRIME FOCUS AREAS:</span>
          <div className="flex items-center gap-1 font-medium text-white/80">
            <MapPin className="h-3 w-3 text-[#D4AF37]" />
            <span>Naigaon East</span>
          </div>
          <div className="w-1 h-1 bg-white/20 rounded-full"></div>
          <div className="flex items-center gap-1 font-medium text-white/80">
            <MapPin className="h-3 w-3 text-[#D4AF37]" />
            <span>Vasai</span>
          </div>
          <div className="w-1 h-1 bg-white/20 rounded-full"></div>
          <div className="flex items-center gap-1 font-medium text-white/80">
            <MapPin className="h-3 w-3 text-[#D4AF37]" />
            <span>Virar</span>
          </div>
          <div className="w-1 h-1 bg-white/20 rounded-full"></div>
          <div className="flex items-center gap-1 font-medium text-white/80">
            <MapPin className="h-3 w-3 text-[#D4AF37]" />
            <span>Palghar Suburbs</span>
          </div>
        </div>

      </div>

      {/* Elegant Solid Border Transition instead of cheesy wave bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10"></div>
    </section>
  );
}
