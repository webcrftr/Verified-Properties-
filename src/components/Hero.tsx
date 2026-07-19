/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ArrowRight, Phone, MessageSquare, ShieldCheck, MapPin, Award, Building, Search } from 'lucide-react';
import { BUSINESS_DETAILS } from '../data';

interface HeroProps {
  onSearch: (filters: {
    location: string;
    category: string;
    budgetIndex: number;
    trigger: number;
  }) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('all');
  const [budgetIndex, setBudgetIndex] = useState(5); // Default to ₹1 Crore+ (unlimited)
  const [showSuggestions, setShowSuggestions] = useState(false);

  const allLocations = [
    'Naigaon East',
    'Global Arena',
    'Ornate Serenity',
    'Vasai West',
    'Vasai East',
    'Virar East',
    'Virar',
    'Palghar',
    'Sunteck WestWorld',
    'Sunteck Maxx World',
    'Nakshatra Nirvaana'
  ];

  const suggestions = useMemo(() => {
    if (!location) return [];
    return allLocations.filter(loc =>
      loc.toLowerCase().includes(location.toLowerCase()) &&
      loc.toLowerCase() !== location.toLowerCase()
    );
  }, [location]);

  const budgetLabels = [
    "₹20 Lakhs",
    "₹30 Lakhs",
    "₹40 Lakhs",
    "₹50 Lakhs",
    "₹75 Lakhs",
    "₹1 Crore+"
  ];

  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFindProperties = () => {
    onSearch({
      location,
      category,
      budgetIndex,
      trigger: Date.now()
    });

    // Smooth scroll
    setTimeout(() => {
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
    }, 100);
  };

  const handlePopularAreaClick = (area: string) => {
    setLocation(area);
    setShowSuggestions(false);
    onSearch({
      location: area,
      category,
      budgetIndex,
      trigger: Date.now()
    });

    // Smooth scroll
    setTimeout(() => {
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
    }, 100);
  };

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
      className="relative min-h-[95vh] sm:min-h-screen flex items-center justify-center bg-[#FAFAF8] pt-24 pb-16 overflow-hidden"
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAF8] via-[#FAFAF8]/70 to-[#FAFAF8]/90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAFAF8]/80 via-transparent to-[#FAFAF8]/50"></div>
      </div>

      {/* Decorative Gold subtle light beams */}
      <div className="absolute right-10 top-1/4 w-[500px] h-[500px] bg-[#C4514F]/5 rounded-full filter blur-[120px] pointer-events-none"></div>
      <div className="absolute left-10 bottom-1/8 w-[400px] h-[400px] bg-[#C4514F]/3 rounded-full filter blur-[100px] pointer-events-none"></div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 flex flex-col items-center text-center">
        
        {/* RERA and Trust Ribbon */}
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#F5EFE7] border border-[#E7E1D9] backdrop-blur-md mb-8 animate-fade-in-up">
          <Award className="h-4 w-4 text-[#C4514F]" />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#1E1E1E]">
            Government Approved RERA Consultant: 
          </span>
          <span className="text-[10px] font-mono font-bold text-[#C4514F] tracking-wider pl-1 border-l border-[#E7E1D9] ml-1">
            {BUSINESS_DETAILS.reraNo}
          </span>
        </div>

        {/* Primary Headline in Editorial style */}
        <h1 className="max-w-4xl text-5xl sm:text-7xl lg:text-8xl font-light font-sans text-[#1E1E1E] leading-[0.95] tracking-tight mb-8">
          Find Your <br />
          <span className="font-serif italic font-bold text-[#C4514F]">Dream Property</span>
        </h1>

        {/* Subtitle description */}
        <p className="max-w-2xl text-xs sm:text-base text-[#5B5B5B] mb-10 leading-relaxed uppercase tracking-wider font-sans font-normal">
          Verified flats, premium commercial spaces, retail shops, and lucrative land plots in 
          <span className="text-[#C4514F] font-semibold"> Naigaon, Vasai, Virar, and Palghar</span>. Guided by expert local insights and zero-risk legal checks.
        </p>

        {/* Interactive Call-To-Action buttons with Editorial layout */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4">
          <button
            onClick={handleScrollToProperties}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-[#C4514F] text-white hover:bg-[#B13E3B] transition-colors duration-300 font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300 shadow-md transform hover:-translate-y-0.5 w-full sm:w-auto cursor-pointer"
          >
            <span>View Listings</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          
          <button
            onClick={handleScrollToContact}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-[#F5EFE7] text-[#1E1E1E] font-bold text-xs uppercase tracking-widest border border-[#E7E1D9] hover:bg-white hover:text-[#FAFAF8] transition-colors duration-300 w-full sm:w-auto cursor-pointer"
          >
            <Phone className="h-4 w-4 text-[#C4514F]" />
            <span>Schedule Consultation</span>
          </button>
        </div>

        {/* Floating Property Search Panel */}
        <div className="w-full max-w-[1200px] mt-12 mb-4 px-4 sm:px-0 animate-fade-in-up">
          <div className="bg-[#FFFFFF]/80 backdrop-blur-xl backdrop-blur-xl border border-[#C4514F]/35 rounded-[18px] shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-5 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 items-center lg:h-[85px] py-2 lg:py-0">
              
              {/* Column 1 — Search Location */}
              <div ref={suggestionsRef} className="lg:col-span-4 space-y-1 text-left relative">
                <label className="text-[10px] font-bold uppercase text-[#C4514F] tracking-[0.15em] flex items-center gap-1.5 select-none">
                  <MapPin className="h-3.5 w-3.5 text-[#C4514F]" /> Search Location
                </label>
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#1E1E1E]/45 h-3.5 w-3.5" />
                  <input
                    type="text"
                    placeholder="Search Naigaon, Vasai, Virar, Palghar..."
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    className="w-full pl-9 pr-4 py-2 bg-[#F5EFE7] text-xs text-[#1E1E1E] font-medium border border-[#E7E1D9] rounded-lg focus:border-[#C4514F] focus:outline-none transition-all placeholder-white/30 h-[40px]"
                  />
                  
                  {/* Autocomplete Suggestions */}
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute z-50 left-0 right-0 mt-1.5 bg-[#FFFFFF]/90 backdrop-blur-md/95 backdrop-blur-md border border-[#E7E1D9] rounded-lg shadow-2xl max-h-48 overflow-y-auto">
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setLocation(suggestion);
                            setShowSuggestions(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-[#C4514F]/15 hover:text-[#C4514F] text-xs text-white border-b border-[#E7E1D9]/50 last:border-b-0 transition-colors cursor-pointer"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-[#5B5B5B]/50 block leading-tight">Search by locality, project or landmark</span>
              </div>

              {/* Column 2 — Property Category */}
              <div className="lg:col-span-3 space-y-1 text-left">
                <label className="text-[10px] font-bold uppercase text-[#C4514F] tracking-[0.15em] flex items-center gap-1.5 select-none">
                  <Building className="h-3.5 w-3.5 text-[#C4514F]" /> Property Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAFAF8] border border-[#E7E1D9] rounded-lg text-xs text-[#1E1E1E]/90 font-semibold focus:border-[#C4514F] focus:outline-none cursor-pointer h-[40px]"
                >
                  <option value="all" className="bg-[#FFFFFF]/90 backdrop-blur-md">All Categories</option>
                  <option value="1 BHK" className="bg-[#FFFFFF]/90 backdrop-blur-md">1 BHK</option>
                  <option value="2 BHK" className="bg-[#FFFFFF]/90 backdrop-blur-md">2 BHK</option>
                  <option value="3 BHK" className="bg-[#FFFFFF]/90 backdrop-blur-md">3 BHK</option>
                  <option value="apartment" className="bg-[#FFFFFF]/90 backdrop-blur-md">Residential Apartments</option>
                  <option value="commercial" className="bg-[#FFFFFF]/90 backdrop-blur-md">Commercial</option>
                  <option value="shop" className="bg-[#FFFFFF]/90 backdrop-blur-md">Retail Shops</option>
                  <option value="office" className="bg-[#FFFFFF]/90 backdrop-blur-md">Office Spaces</option>
                  <option value="land" className="bg-[#FFFFFF]/90 backdrop-blur-md">Land</option>
                  <option value="plots" className="bg-[#FFFFFF]/90 backdrop-blur-md">Plots</option>
                  <option value="villas" className="bg-[#FFFFFF]/90 backdrop-blur-md">Villas</option>
                  <option value="luxury" className="bg-[#FFFFFF]/90 backdrop-blur-md">Luxury Homes</option>
                </select>
                <span className="text-[9px] text-[#5B5B5B]/50 block leading-tight">Filter by property type or layout</span>
              </div>

              {/* Column 3 — Budget */}
              <div className="lg:col-span-3 space-y-1 text-left">
                <div className="flex justify-between items-center select-none">
                  <label className="text-[10px] font-bold uppercase text-[#C4514F] tracking-[0.15em]">
                    Budget
                  </label>
                  <span className="text-[11px] font-bold text-[#C4514F] bg-[#C4514F]/10 px-2 py-0.5 rounded">
                    {budgetLabels[budgetIndex]}
                  </span>
                </div>
                <div className="pt-2">
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="1"
                    value={budgetIndex}
                    onChange={(e) => setBudgetIndex(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-[#F5EFE7] rounded-lg appearance-none cursor-pointer accent-[#C4514F]"
                  />
                </div>
                <div className="flex justify-between text-[8px] text-[#5B5B5B]/50 pt-0.5 select-none font-mono">
                  <span>₹20 Lakhs</span>
                  <span>₹50 Lakhs</span>
                  <span>₹1 Cr+</span>
                </div>
              </div>

              {/* Column 4 — Search Button */}
              <div className="lg:col-span-2 pt-2 lg:pt-3">
                <button
                  onClick={handleFindProperties}
                  className="w-full h-[44px] bg-[#C4514F] text-white hover:bg-[#B13E3B] transition-colors duration-300 font-bold text-xs uppercase tracking-widest rounded-lg transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transform hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer outline-none"
                >
                  <Search className="h-4 w-4" />
                  <span>FIND PROPERTIES</span>
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Popular Areas Pills */}
        <div className="mt-4 mb-4 flex flex-wrap items-center justify-center gap-2 max-w-4xl px-4 animate-fade-in-up">
          <span className="text-[10px] font-bold text-[#C4514F] uppercase tracking-wider mr-2 select-none">
            Popular Areas
          </span>
          {[
            'Naigaon East',
            'Global Arena',
            'Nakshatra Primus',
            'Vasai West',
            'Virar',
            'Palghar',
            'Sunteck WestWorld',
            'Sunteck Maxx World',
            'Nakshatra Nirvaana'
          ].map((area, idx) => (
            <button
              key={idx}
              onClick={() => handlePopularAreaClick(area)}
              className="px-3 py-1.5 bg-[#F5EFE7] border border-[#E7E1D9] hover:border-[#C4514F] hover:bg-[#B13E3B] hover:text-[#1E1E1E] text-[11px] font-medium text-[#1E1E1E] rounded-full transition-all duration-300 cursor-pointer shadow-sm select-none"
            >
              {area}
            </button>
          ))}
        </div>

        {/* Core Stats / USP Grid with sharp layout blocks (Editorial structure) */}
        <div className="mt-16 sm:mt-24 grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-b border-[#E7E1D9] w-full">
          {[
            { label: 'RERA Registered Listings', value: '100%', detail: 'Legally Valid Cards' },
            { label: 'Happy Families', value: '250+', detail: 'Settled Suburbs' },
            { label: 'Years Experience', value: '8+', detail: 'Consultancy Excellence' },
            { label: 'Brokerage Consultation', value: 'End-to-End', detail: 'Stress-Free Buy/Rent' }
          ].map((stat, i) => (
            <div
              key={i}
              className={`p-6 bg-transparent flex flex-col justify-center items-center ${
                i < 3 ? 'border-b md:border-b-0 md:border-r border-[#E7E1D9]' : 'border-b md:border-b-0 border-[#E7E1D9] sm:border-b-0'
              }`}
            >
              <span className="text-3xl sm:text-4xl font-serif italic font-bold text-[#C4514F] mb-2">{stat.value}</span>
              <span className="text-[10px] font-bold text-[#1E1E1E] uppercase tracking-[0.15em] mb-1 text-center">{stat.label}</span>
              <span className="text-[9px] uppercase tracking-wider text-[#5B5B5B] text-center">{stat.detail}</span>
            </div>
          ))}
        </div>

        {/* Key quick locations markers */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-[#5B5B5B]/50 text-[10px] tracking-widest uppercase">
          <span className="text-[#C4514F] font-semibold">OUR PRIME FOCUS AREAS:</span>
          <div className="flex items-center gap-1 font-medium text-[#1E1E1E]">
            <MapPin className="h-3 w-3 text-[#C4514F]" />
            <span>Naigaon East</span>
          </div>
          <div className="w-1 h-1 bg-[#EADCCB] rounded-full"></div>
          <div className="flex items-center gap-1 font-medium text-[#1E1E1E]">
            <MapPin className="h-3 w-3 text-[#C4514F]" />
            <span>Vasai</span>
          </div>
          <div className="w-1 h-1 bg-[#EADCCB] rounded-full"></div>
          <div className="flex items-center gap-1 font-medium text-[#1E1E1E]">
            <MapPin className="h-3 w-3 text-[#C4514F]" />
            <span>Virar</span>
          </div>
          <div className="w-1 h-1 bg-[#EADCCB] rounded-full"></div>
          <div className="flex items-center gap-1 font-medium text-[#1E1E1E]">
            <MapPin className="h-3 w-3 text-[#C4514F]" />
            <span>Palghar Suburbs</span>
          </div>
        </div>

      </div>

      {/* Elegant Solid Border Transition instead of cheesy wave bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#F5EFE7]"></div>
    </section>
  );
}
