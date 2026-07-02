/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Search, MapPin, Grid, Layers, ShieldCheck, CheckCircle2, ChevronRight, ChevronLeft, X, Phone, Calendar, Maximize2,
  Building, Dumbbell, Gamepad2, Compass, Activity, Sparkles, Smile, Flower2, Users, Shield, Eye, Video, ArrowUpDown, Flame, Car, Train, GraduationCap, HeartPulse, Landmark, Milestone, Zap, Download 
} from 'lucide-react';
import { PROPERTIES } from '../data';
import { Property, PropertyType, TransactionType } from '../types';
import { motion } from 'motion/react';

const IconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'building': Building,
  'dumbbell': Dumbbell,
  'gamepad': Gamepad2,
  'map': Compass,
  'activity': Activity,
  'sparkles': Sparkles,
  'smile': Smile,
  'flower': Flower2,
  'users': Users,
  'shield': Shield,
  'eye': Eye,
  'video': Video,
  'arrow-up-down': ArrowUpDown,
  'flame': Flame,
  'car': Car,
  'train': Train,
  'graduation-cap': GraduationCap,
  'heart-pulse': HeartPulse,
  'sun': Sparkles, // fallback
  'landmark': Landmark,
  'milestone': Milestone,
  'zap': Zap,
  'download': Download,
  'phone': Phone
};

interface LazyVideoProps {
  src: string;
  fallbackImage: string;
  title: string;
}

function LazyVideo({ src, fallbackImage, title }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || hasError) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoElement.play().catch((err) => {
              // Ignore standard autoplay block logs
            });
          } else {
            videoElement.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(videoElement);

    return () => {
      observer.disconnect();
    };
  }, [hasError]);

  const handleVideoError = () => {
    const videoElement = videoRef.current;
    if (videoElement && videoElement.error) {
      const code = videoElement.error.code;
      // Aborted errors (1) occur naturally when React mounts/unmounts or scrolls away.
      // Network errors (2) can also be transient or partial content related.
      // Only set error for decode failures (3) or completely unsupported source (4).
      if (code === 3 || code === 4) {
        setHasError(true);
      }
    }
  };

  if (hasError) {
    return (
      <img
        src={fallbackImage}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
      onError={handleVideoError}
    />
  );
}

interface PropertiesGridProps {
  onOpenEnquiry: (propertyName?: string) => void;
  isFeaturedOnly?: boolean;
  onNavigate?: (path: string) => void;
  heroSearchFilters?: {
    location: string;
    category: string;
    budgetIndex: number;
    trigger: number;
  } | null;
}

export default function PropertiesGrid({ 
  onOpenEnquiry, 
  isFeaturedOnly = false, 
  onNavigate,
  heroSearchFilters
}: PropertiesGridProps) {
  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<PropertyType | 'all'>('all');
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionType | 'all'>('all');
  const [activePropertyDetail, setActivePropertyDetail] = useState<Property | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
  const [brochureRequested, setBrochureRequested] = useState(false);

  // Sync Hero Search Filters
  useEffect(() => {
    if (heroSearchFilters && heroSearchFilters.trigger > 0) {
      setSearchTerm(heroSearchFilters.location);
      
      const cat = heroSearchFilters.category;
      if (cat === 'all') {
        setSelectedType('all');
      } else if (cat === 'apartment') {
        setSelectedType('apartment');
      } else if (cat === 'commercial') {
        setSelectedType('commercial');
      } else if (cat === 'shop') {
        setSelectedType('shop');
      } else if (cat === 'office') {
        setSelectedType('office');
      } else if (cat === 'land' || cat === 'plots') {
        setSelectedType('land');
      } else {
        setSelectedType('all');
      }
    }
  }, [heroSearchFilters]);

  // Swipe support refs
  const touchStartX = useRef<number | null>(null);
  const lightboxTouchStartX = useRef<number | null>(null);

  // Auto-play carousel for details modal slider
  useEffect(() => {
    if (!activePropertyDetail) return;
    const propertyImages = activePropertyDetail.gallery || [activePropertyDetail.image];
    if (propertyImages.length <= 1) return;

    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % propertyImages.length);
    }, 4000); // Auto-advance every 4 seconds

    return () => clearInterval(interval);
  }, [activePropertyDetail]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent, imagesLength: number) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    if (Math.abs(diffX) > 50) { // Threshold
      if (diffX > 0) {
        setActiveImageIndex((prev) => (prev === imagesLength - 1 ? 0 : prev + 1));
      } else {
        setActiveImageIndex((prev) => (prev === 0 ? imagesLength - 1 : prev - 1));
      }
    }
    touchStartX.current = null;
  };

  const handleLightboxTouchStart = (e: React.TouchEvent) => {
    lightboxTouchStartX.current = e.touches[0].clientX;
  };

  const handleLightboxTouchEnd = (e: React.TouchEvent, imagesLength: number) => {
    if (lightboxTouchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = lightboxTouchStartX.current - touchEndX;

    if (Math.abs(diffX) > 50) { // Threshold
      if (diffX > 0) {
        setLightboxImageIndex((prev) => (prev === imagesLength - 1 ? 0 : prev + 1));
      } else {
        setLightboxImageIndex((prev) => (prev === 0 ? imagesLength - 1 : prev - 1));
      }
    }
    lightboxTouchStartX.current = null;
  };

  // Filter listings based on input states
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((prop) => {
      // 1. Basic search term check
      const matchesSearch = !searchTerm ? true : (
        prop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prop.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prop.description.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // 2. Local select filters
      const matchesType = selectedType === 'all' || prop.type === selectedType;
      const matchesTransaction =
        selectedTransaction === 'all' || prop.transaction === selectedTransaction;

      // 3. Hero search specific checks (Budget & Category constraints)
      let matchesHeroBudget = true;
      let matchesHeroCategory = true;

      if (heroSearchFilters && heroSearchFilters.trigger > 0) {
        // Budget mapping indexes:
        // 0: ₹20 Lakhs (2,000,000)
        // 1: ₹30 Lakhs (3,000,000)
        // 2: ₹40 Lakhs (4,000,000)
        // 3: ₹50 Lakhs (5,000,000)
        // 4: ₹75 Lakhs (7,500,000)
        // 5: ₹1 Crore+ (unlimited: 999999999)
        const budgets = [2000000, 3000000, 4000000, 5000000, 7500000, 999999999];
        const maxBudget = budgets[heroSearchFilters.budgetIndex] || 999999999;
        
        matchesHeroBudget = prop.numericPriceVal <= maxBudget;

        const cat = heroSearchFilters.category;
        if (cat !== 'all') {
          if (cat === '1 BHK') {
            matchesHeroCategory = prop.configuration === '1 BHK' || prop.title.toLowerCase().includes('1bhk') || prop.title.toLowerCase().includes('1 bhk');
          } else if (cat === '2 BHK') {
            matchesHeroCategory = prop.configuration === '2 BHK' || prop.title.toLowerCase().includes('2bhk') || prop.title.toLowerCase().includes('2 bhk');
          } else if (cat === '3 BHK') {
            matchesHeroCategory = prop.configuration === '3 BHK' || prop.title.toLowerCase().includes('3bhk') || prop.title.toLowerCase().includes('3 bhk');
          } else if (cat === 'apartment') {
            matchesHeroCategory = prop.type === 'apartment';
          } else if (cat === 'commercial') {
            matchesHeroCategory = prop.type === 'commercial' || prop.type === 'office' || prop.type === 'shop';
          } else if (cat === 'shop') {
            matchesHeroCategory = prop.type === 'shop';
          } else if (cat === 'office') {
            matchesHeroCategory = prop.type === 'office';
          } else if (cat === 'land' || cat === 'plots') {
            matchesHeroCategory = prop.type === 'land';
          } else if (cat === 'villas') {
            matchesHeroCategory = prop.description.toLowerCase().includes('villa') || prop.type === 'land';
          } else if (cat === 'luxury') {
            matchesHeroCategory = prop.numericPriceVal >= 5000000 || prop.title.toLowerCase().includes('elite') || prop.title.toLowerCase().includes('luxury') || prop.id === 'prop-002' || prop.id === 'prop-006' || prop.id === 'prop-007';
          }
        }
      }

      return matchesSearch && matchesType && matchesTransaction && matchesHeroBudget && matchesHeroCategory;
    });
  }, [searchTerm, selectedType, selectedTransaction, heroSearchFilters]);

  // Check if any active search criteria has been specified
  const hasActiveSearchFilter = useMemo(() => {
    return !!searchTerm || selectedType !== 'all' || selectedTransaction !== 'all' || (!!heroSearchFilters && heroSearchFilters.trigger > 0);
  }, [searchTerm, selectedType, selectedTransaction, heroSearchFilters]);

  // If no exact match is found, display all available properties (PROPERTIES)
  const isNoExactMatch = filteredProperties.length === 0 && hasActiveSearchFilter;
  const displayedProperties = useMemo(() => {
    if (isNoExactMatch) {
      return PROPERTIES;
    }
    return filteredProperties;
  }, [filteredProperties, isNoExactMatch]);

  const handleOpenDetailModal = (property: Property) => {
    setActivePropertyDetail(property);
    setActiveImageIndex(0);
  };

  const handleCloseDetailModal = () => {
    setActivePropertyDetail(null);
    setIsLightboxOpen(false);
    setBrochureRequested(false);
  };

  const handleEnquireFromDetail = (propertyName: string) => {
    setActivePropertyDetail(null);
    setIsLightboxOpen(false);
    setBrochureRequested(false);
    onOpenEnquiry(propertyName);
  };

  const typeLabels: Record<PropertyType, string> = {
    apartment: 'Residential Flat',
    commercial: 'Commercial Space',
    shop: 'Retail Shop',
    office: 'Office Space',
    land: 'Land / NA Plot',
  };

  return (
    <section id="properties" className="py-24 bg-[#050B18] text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-3">
            CURATED REAL ESTATE HOLDINGS
          </span>
          <h2 className="text-3xl sm:text-5xl font-light font-serif text-white">
            Our Exclusive <span className="font-serif italic font-bold text-[#D4AF37]">Properties</span>
          </h2>
          <div className="h-[1px] w-24 bg-[#D4AF37] mx-auto mt-6"></div>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-white/60 mt-4 uppercase tracking-wider font-sans">
            Search our active collection of premium checked properties across Naigaon, Vasai, Virar, and Palghar suburbs.
          </p>
        </div>

        {/* Filter Bar with Editorial styling */}
        {!isFeaturedOnly && (
          <div className="bg-[#0a1122] p-6 sm:p-8 border border-white/10 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
              
              {/* Search Input */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-bold uppercase text-[#D4AF37] tracking-[0.15em] block">
                  Search Properties
                </label>
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-white/45 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Enter location, project name, or property type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white/5 text-sm text-white font-medium border border-white/10 focus:border-[#D4AF37] focus:outline-none focus:ring-0 transition-all placeholder-white/30"
                  />
                </div>
              </div>

              {/* Property Type Dropdown */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-[#D4AF37] tracking-[0.15em] block">
                  Property Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as PropertyType | 'all')}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 text-xs text-white/80 font-semibold focus:border-[#D4AF37] focus:outline-none cursor-pointer"
                >
                  <option value="all" className="bg-[#0a1122]">All Types</option>
                  <option value="apartment" className="bg-[#0a1122]">Residentials (Flats)</option>
                  <option value="shop" className="bg-[#0a1122]">Retail Shops</option>
                  <option value="office" className="bg-[#0a1122]">Office Workspaces</option>
                  <option value="commercial" className="bg-[#0a1122]">Commercial Complexes</option>
                  <option value="land" className="bg-[#0a1122]">Land Plots (NA)</option>
                </select>
              </div>

              {/* Buy / Rent Dropdown */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-[#D4AF37] tracking-[0.15em] block">
                  Transaction
                </label>
                <select
                  value={selectedTransaction}
                  onChange={(e) => setSelectedTransaction(e.target.value as TransactionType | 'all')}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 text-xs text-white/80 font-semibold focus:border-[#D4AF37] focus:outline-none cursor-pointer"
                >
                  <option value="all" className="bg-[#0a1122]">Buy / Rent (All)</option>
                  <option value="sale" className="bg-[#0a1122]">For Sale</option>
                  <option value="rent" className="bg-[#0a1122]">For Rent</option>
                </select>
              </div>

            </div>

            {/* Quick Info Tags */}
            <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-white/10 text-xs text-white/40">
              <span className="font-bold uppercase tracking-wider text-[#D4AF37] mr-2">Showing:</span>
              <span className="px-3 py-1 bg-white/5 text-white/80 font-mono text-[11px]">
                {displayedProperties.length} Properties
              </span>
              {selectedType !== 'all' && (
                <span className="px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] font-bold text-[11px] uppercase tracking-wider">
                  {typeLabels[selectedType]}
                </span>
              )}
              {selectedTransaction !== 'all' && (
                <span className="px-3 py-1 bg-emerald-500/15 text-emerald-400 font-bold text-[11px] uppercase tracking-wider">
                  For {selectedTransaction === 'sale' ? 'Sale' : 'Rent'}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Fallback alert banner for no exact matches */}
        {isNoExactMatch && (
          <div className="mb-8 p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/35 text-center text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#D4AF37] rounded-lg">
            ⚠️ No exact matches found for your criteria. Showing all available premium properties.
          </div>
        )}

        {/* Empty state container */}
        {displayedProperties.length === 0 && (
          <div className="text-center py-20 bg-[#0a1122] border border-white/10 p-8">
            <Layers className="h-10 w-10 text-white/30 mx-auto mb-4" />
            <h3 className="text-lg font-bold font-serif text-white">No Properties Found</h3>
            <p className="text-xs text-white/50 mt-2 max-w-sm mx-auto leading-relaxed">
              We couldn't find any listings matching "{searchTerm}". Try clearing your filters or contact Mansi Gaikwad to inquire about off-market properties.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedType('all');
                setSelectedTransaction('all');
              }}
              className="mt-6 px-6 py-2.5 bg-[#D4AF37] text-[#050B18] text-xs font-bold uppercase tracking-widest cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Results Count Label */}
        {!isFeaturedOnly && (
          <div className="mt-8 mb-8 flex items-center justify-between border-b border-white/5 pb-5">
            <p className="text-white/60 text-[11px] sm:text-xs font-sans tracking-[0.16em] uppercase flex items-center gap-2 select-none">
              <span>SHOWING</span>
              <strong className="text-white text-sm font-extrabold pr-0.5">{displayedProperties.length}</strong>
              <span>MATCHING PREMIUM REAL ESTATE ASSETS</span>
            </p>
            <div className="hidden sm:block text-[10px] font-mono text-[#D4AF37]/80">
              MahaRERA Registered Listings Only
            </div>
          </div>
        )}

        {/* Properties Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(isFeaturedOnly ? displayedProperties.slice(0, 3) : displayedProperties).map((prop) => {
            // High fidelity editorial sub-tags map 
            const getSecondaryBadge = (item: typeof prop) => {
              if (item.id === 'prop-001') return 'RERA APPROVED';
              if (item.id === 'prop-002') return 'LUXURY RESIDENCE';
              if (item.id === 'prop-003') return 'READY POSSESSION 2026';
              if (item.id === 'prop-004') return 'LUXURY HIGH-RISE';
              if (item.id === 'prop-005') return '33 STOREY TOWERS';
              if (item.id === 'prop-006') return '₹501 BOOKING OFFER';
              if (item.id === 'prop-007') return 'PREMIUM LOCATION';
              if (item.id === 'prop-008') return 'UNDER CONSTRUCTION';
              return 'RERA REGISTERED';
            };

            const statusText = prop.constructionStatus || 'AVAILABLE';
            const isUnderConstruction = statusText === 'UNDER CONSTRUCTION';

            return (
              <article
                key={prop.id}
                className="bg-[#050B18] border border-white/10 overflow-hidden hover:border-[#D4AF37]/35 transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                {/* Card Image Banner */}
                <div className="relative overflow-hidden aspect-[4/3] bg-black/40">
                  {prop.id === 'prop-008' ? (
                    <LazyVideo
                      src="/videos/property1.mp4"
                      fallbackImage={prop.image}
                      title={prop.title}
                    />
                  ) : (
                    <img
                      src={prop.image}
                      alt={prop.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  
                  {/* High Quality Styled Badges Left */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 items-start">
                    <span className="px-3.5 py-1.5 text-[9px] font-black uppercase tracking-widest text-[#050B18] bg-[#D4AF37] shadow-lg leading-none">
                      {prop.id === 'prop-006' ? 'LIMITED TIME OFFER' : (prop.id === 'prop-005' ? 'GRAND LAUNCH' : (prop.id === 'prop-003' || prop.id === 'prop-004' ? 'NEW LAUNCH' : `FOR ${prop.transaction.toUpperCase()}`))}
                    </span>
                    <span className="px-2.5 py-1 text-[8px] font-mono font-bold uppercase tracking-wider bg-black/85 text-[#D4AF37] border border-[#D4AF37]/30 shadow-md">
                      {getSecondaryBadge(prop)}
                    </span>
                  </div>

                  {/* MahaRERA Badge with Gold Shield Overlay Bottom Right */}
                  {prop.id !== 'prop-002' && prop.id !== 'prop-003' && prop.id !== 'prop-004' && prop.id !== 'prop-005' && prop.id !== 'prop-006' && (
                    <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5">
                      {prop.reraApproved && prop.reraNo && (
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-[#050B18]/90 border border-emerald-500/30 rounded-full text-[9px] font-mono font-semibold tracking-wider text-emerald-400">
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                          RERA: {prop.reraNo}
                        </div>
                      )}
                      <div className="p-1 px-1.5 bg-[#050B18]/90 border border-[#D4AF37]/45 text-[#D4AF37] shadow-md">
                        <ShieldCheck className="h-3.5 w-3.5 fill-[#D4AF37]/10" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Property Details summary section */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    
                    {/* Category Type & Construction Status */}
                    <div className="flex items-center justify-between pb-1">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] font-mono">
                        {prop.id === 'prop-006' ? 'Affordable Premium Apartments' : (prop.id === 'prop-003' || prop.id === 'prop-004' || prop.id === 'prop-005' ? 'Luxury Residential Apartments' : typeLabels[prop.type])}
                      </span>
                      <span className={`text-[9px] font-bold tracking-widest uppercase font-mono px-2 py-0.5 border ${
                        isUnderConstruction 
                          ? 'text-amber-400 bg-amber-500/5 border-amber-500/20' 
                          : 'text-emerald-400 bg-emerald-500/5 border-emerald-500/20'
                      }`}>
                        {statusText}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg font-bold mt-2 text-white line-clamp-1 group-hover:text-[#D4AF37] transition-colors leading-snug tracking-tight uppercase font-sans">
                      {prop.title}
                    </h3>

                    {/* Location Pin */}
                    <div className="flex items-center gap-1.5 text-white/50 text-[11px] mt-2.5 font-sans">
                      <MapPin className="h-3.5 w-3.5 text-[#D4AF37] flex-shrink-0" />
                      <span className="truncate">
                        {prop.id === 'prop-001' || prop.id === 'prop-002' || prop.id === 'prop-003' ? 'Naigaon East, Palghar' : (prop.id === 'prop-004' ? 'Vasai East, Palghar' : (prop.id === 'prop-005' ? 'Yashwant Smart City, Vasai East' : (prop.id === 'prop-006' ? 'Near Global City, Virar West' : prop.location)))}
                      </span>
                    </div>

                    {/* Specifications grid (Bento style specs block) */}
                    <div className="grid grid-cols-2 gap-2 mt-4 text-[10px] font-mono uppercase tracking-wider text-white/70">
                      <div className="py-2 px-3 bg-white/5 border border-white/5 flex flex-col justify-between items-start">
                        <span className="text-white/40 text-[9px] mb-1">Configuration</span>
                        <span className="font-bold text-white">
                          {prop.configuration || (prop.bedrooms ? `${prop.bedrooms} BHK` : 'Commercial')}
                        </span>
                      </div>
                      <div className="py-2 px-3 bg-white/5 border border-white/5 flex flex-col justify-between items-start">
                        <span className="text-white/40 text-[9px] mb-1">Carpet Area</span>
                        <span className="font-bold text-white truncate w-full">
                          {prop.area}
                        </span>
                      </div>
                      <div className="py-2 px-3 bg-white/5 border border-white/5 flex flex-col justify-between items-start">
                        <span className="text-white/40 text-[9px] mb-1">Tower</span>
                        <span className="font-bold text-[#D4AF37]">
                          {prop.tower || 'Premium Tower'}
                        </span>
                      </div>
                      <div className="py-2 px-3 bg-white/5 border border-white/5 flex flex-col justify-between items-start">
                        <span className="text-white/40 text-[9px] mb-1">Status</span>
                        <span className="font-bold text-emerald-400">
                          {statusText}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price and CTA Card bottom bar */}
                  <div className="border-t border-white/10 pt-4 mt-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        {prop.builder && (
                          <span className="text-[9px] font-bold text-[#D4AF37]/85 block tracking-wider uppercase mb-1">
                            Builder: {prop.builder}
                          </span>
                        )}
                        <span className="text-[8px] uppercase font-bold text-white/40 block tracking-widest leading-none mb-1">ESTIMATED PRICE</span>
                        <span className="text-base font-bold text-[#D4AF37] tracking-tight">
                          {prop.price}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleOpenDetailModal(prop)}
                        className="py-2.5 border border-white/20 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer bg-transparent outline-none flex items-center justify-center"
                      >
                        View Details
                      </button>
                      
                      <button
                        onClick={() => onOpenEnquiry(prop.title)}
                        className="py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer outline-none flex items-center justify-center"
                      >
                        Enquire Now
                      </button>
                    </div>

                    <button
                      onClick={() => onOpenEnquiry(`Site Visit: ${prop.title}`)}
                      className="w-full py-2.5 bg-[#D4AF37] text-[#050B18] hover:bg-white hover:text-black text-[10px] font-extrabold uppercase tracking-widest transition-colors cursor-pointer shadow-md flex items-center justify-center gap-1.5 outline-none"
                    >
                      <Calendar className="h-3.5 w-3.5" /> Book Site Visit
                    </button>

                    <a
                      href={`https://wa.me/917020913759?text=Hi%20Verified%20Properties,%20I%20am%20interested%20in%20arranging%20a%20site%20visit%20for%20${encodeURIComponent(prop.title)}.%20Please%20let%20me%20know%20your%20availability.`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-widest text-center shadow-md flex items-center justify-center gap-1.5 transition-colors outline-none"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>

              </article>
            );
          })}
        </div>

        {isFeaturedOnly && (
          <div className="mt-16 text-center">
            <button
              onClick={() => onNavigate && onNavigate('/properties')}
              className="px-8 py-3.5 bg-[#D4AF37] text-[#050B18] hover:bg-white hover:text-black text-xs font-extrabold uppercase tracking-widest transition-all duration-300 inline-block cursor-pointer shadow-lg outline-none"
            >
              Browse All Premium Listings
            </button>
          </div>
        )}

      </div>

      {/* DETAILED PROPERTY PREVIEW MODAL */}
      {activePropertyDetail && (() => {
        const propertyImages = activePropertyDetail.gallery || [activePropertyDetail.image];
        return (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#0a1122] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-white/10 text-white">
              
              {/* Close modal button floating */}
              <button
                onClick={handleCloseDetailModal}
                className="absolute top-4 right-4 z-20 p-2 bg-[#050B18] border border-white/10 text-white hover:bg-[#D4AF37] hover:text-[#050B18] transition-all cursor-pointer outline-none"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Header Image Slider */}
              <div 
                className="relative h-[250px] sm:h-[380px] bg-black/60 group/slider overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchEnd={(e) => handleTouchEnd(e, propertyImages.length)}
              >
                <img
                  src={propertyImages[activeImageIndex]}
                  alt={`${activePropertyDetail.title} - View ${activeImageIndex + 1}`}
                  className="w-full h-full object-cover opacity-90 transition-all duration-500 cursor-zoom-in"
                  onClick={() => {
                    setLightboxImageIndex(activeImageIndex);
                    setIsLightboxOpen(true);
                  }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1122] via-[#0a1122]/30 to-transparent pointer-events-none"></div>
                
                {/* Slider Controls */}
                {propertyImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImageIndex((prev) => (prev === 0 ? propertyImages.length - 1 : prev - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-[#D4AF37] text-white hover:text-[#050B18] transition-all rounded-full border border-white/15 outline-none cursor-pointer"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setActiveImageIndex((prev) => (prev === propertyImages.length - 1 ? 0 : prev + 1))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-[#D4AF37] text-white hover:text-[#050B18] transition-all rounded-full border border-white/15 outline-none cursor-pointer"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    
                    {/* Slide Indicators Counter */}
                    <div className="absolute top-4 left-4 bg-black/75 border border-white/10 px-3 py-1 text-[9px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
                      IMAGE {activeImageIndex + 1} / {propertyImages.length}
                    </div>
                  </>
                )}

                {/* Fullscreen Expand Button */}
                <button
                  onClick={() => {
                    setLightboxImageIndex(activeImageIndex);
                    setIsLightboxOpen(true);
                  }}
                  className="absolute bottom-4 right-4 p-2.5 bg-black/75 hover:bg-[#D4AF37] text-white hover:text-[#050B18] border border-white/10 shadow-lg transition-all rounded-full outline-none cursor-pointer"
                  title="View Fullscreen"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>

                <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                  <span className="px-3 py-1 bg-[#D4AF37] text-[#050B18] text-[9px] font-black uppercase tracking-widest leading-none pointer-events-auto">
                    {activePropertyDetail.id === 'prop-006' ? 'LIMITED TIME OFFER' : (activePropertyDetail.id === 'prop-005' ? 'GRAND LAUNCH' : (activePropertyDetail.id === 'prop-003' || activePropertyDetail.id === 'prop-004' ? 'NEW LAUNCH' : `FOR ${activePropertyDetail.transaction.toUpperCase()}`))}
                  </span>
                  
                  <h3 className="text-2xl sm:text-3xl font-bold font-sans uppercase text-white mt-3 leading-tight drop-shadow-md pointer-events-auto">
                    {activePropertyDetail.title}
                  </h3>
                  
                  <div className="flex items-center gap-1.5 text-white/80 text-xs sm:text-sm mt-2 pointer-events-auto">
                    <MapPin className="h-4 w-4 text-[#D4AF37]" />
                    <span>{activePropertyDetail.id === 'prop-001' || activePropertyDetail.id === 'prop-002' || activePropertyDetail.id === 'prop-003' ? 'Naigaon East, Palghar' : (activePropertyDetail.id === 'prop-004' ? 'Vasai East, Palghar' : (activePropertyDetail.id === 'prop-005' ? 'Madhuban Gate, Yashwant Smart City, Vasai East' : (activePropertyDetail.id === 'prop-006' ? 'Near Global City, Virar West, Palghar, Maharashtra' : activePropertyDetail.location)))}</span>
                  </div>
                </div>
              </div>

              {/* Inner Content Grid */}
              <div className="p-6 sm:p-8 space-y-8">
                
                {/* Meta specifications pill bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 bg-white/5 border border-white/5 flex flex-col justify-between">
                    <span className="text-[9px] text-white/40 uppercase font-bold tracking-widest">Property Type</span>
                    <span className="text-xs font-semibold text-white uppercase tracking-wider mt-1">
                      {activePropertyDetail.id === 'prop-006' ? 'Affordable Premium Apartments' : (activePropertyDetail.id === 'prop-002' || activePropertyDetail.id === 'prop-003' || activePropertyDetail.id === 'prop-004' || activePropertyDetail.id === 'prop-005' ? 'Luxury Residential Apartments' : typeLabels[activePropertyDetail.type])}
                    </span>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/5 flex flex-col justify-between">
                    <span className="text-[9px] text-white/40 uppercase font-bold tracking-widest">Configurations</span>
                    <span className="text-xs font-semibold text-white uppercase tracking-wider mt-1">
                      {activePropertyDetail.configuration || activePropertyDetail.area}
                    </span>
                  </div>
                  <div className="p-4 bg-white/5 border border-[#D4AF37]/25 bg-[#D4AF37]/5 flex flex-col justify-between">
                    <span className="text-[9px] text-[#D4AF37] uppercase font-bold tracking-widest">Price Quote</span>
                    <span className="text-xs font-bold text-[#D4AF37] mt-1">
                      {activePropertyDetail.price}
                    </span>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/5 flex flex-col justify-between">
                    <span className="text-[9px] text-white/40 uppercase font-bold tracking-widest">Tower / Status</span>
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 mt-1 uppercase tracking-wider">
                      {activePropertyDetail.tower || 'Available'}
                    </span>
                  </div>
                </div>

                {/* Image Gallery Grid - Click to Expand */}
                {propertyImages.length > 1 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <h4 className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-[0.2em] font-mono">Interactive Media Gallery ({propertyImages.length} Photos)</h4>
                      <span className="text-[9px] text-white/40 font-mono hidden sm:inline">Click any thumbnail to inspect</span>
                    </div>
                    <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                      {propertyImages.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setActiveImageIndex(idx);
                            setLightboxImageIndex(idx);
                            setIsLightboxOpen(true);
                          }}
                          className={`aspect-square overflow-hidden border transition-all ${
                            activeImageIndex === idx 
                              ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/35 scale-95' 
                              : 'border-white/10 hover:border-white/40'
                          }`}
                        >
                          <img
                            src={img}
                            alt={`${activePropertyDetail.title} Thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                 {/* RERA approval detail bar when present */}
                {activePropertyDetail.id !== 'prop-002' && activePropertyDetail.id !== 'prop-003' && activePropertyDetail.id !== 'prop-004' && activePropertyDetail.reraApproved && (
                  <div className="p-5 bg-emerald-500/5 border border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="h-6 w-6 text-emerald-400 shrink-0" />
                      <div>
                        <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">RERA Registered Asset</h4>
                        <p className="text-xs text-white/70 mt-1">Verified & compliant with Maharashtra Real Estate Regulatory Authority structures.</p>
                      </div>
                    </div>
                    {activePropertyDetail.reraNo && (
                      <span className="font-mono text-xs font-bold text-[#050B18] bg-[#D4AF37] px-3 py-1 uppercase tracking-wider shrink-0">
                        {activePropertyDetail.reraNo}
                      </span>
                    )}
                  </div>
                )}

                {/* Deep descriptive outline */}
                <div className="space-y-2">
                  <h4 className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-[0.2em]">Property Description</h4>
                  <p className="text-sm text-white/70 leading-relaxed font-sans">
                    {activePropertyDetail.description}
                  </p>
                </div>

                {/* Custom Configuration Section for Akhand Elite */}
                {activePropertyDetail.id === 'prop-004' && (
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <h4 className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-[0.2em] font-mono">Available Configurations</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-5 bg-white/5 border border-white/5 hover:border-[#D4AF37]/30 transition-all flex flex-col justify-between">
                        <div>
                          <span className="px-2 py-0.5 bg-[#D4AF37] text-[#050B18] text-[8px] font-black uppercase tracking-wider">LAVISH</span>
                          <h5 className="text-lg font-bold text-white mt-2">1 BHK</h5>
                          <p className="text-xs text-white/50 mt-1 font-mono">Carpet Area: 440 Sq.Ft.</p>
                        </div>
                        <div className="mt-4 border-t border-white/10 pt-3">
                          <span className="text-[9px] text-white/40 block">STARTING FROM</span>
                          <span className="text-base font-bold text-[#D4AF37]">₹39.99 Lakhs</span>
                        </div>
                      </div>

                      <div className="p-5 bg-white/5 border border-white/5 hover:border-[#D4AF37]/30 transition-all flex flex-col justify-between">
                        <div>
                          <span className="px-2 py-0.5 bg-[#D4AF37] text-[#050B18] text-[8px] font-black uppercase tracking-wider">LUXURIOUS</span>
                          <h5 className="text-lg font-bold text-white mt-2">2 BHK</h5>
                          <p className="text-xs text-white/50 mt-1 font-mono">Carpet Area: 710 Sq.Ft.</p>
                        </div>
                        <div className="mt-4 border-t border-white/10 pt-3">
                          <span className="text-[9px] text-white/40 block">STARTING FROM</span>
                          <span className="text-base font-bold text-[#D4AF37]">₹62.99 Lakhs</span>
                        </div>
                      </div>

                      <div className="p-5 bg-white/5 border border-dashed border-white/15 flex flex-col items-center justify-center text-center">
                        <Sparkles className="h-6 w-6 text-[#D4AF37]/60 mb-2 animate-pulse" />
                        <h5 className="text-sm font-semibold text-white uppercase tracking-wider">More Layouts</h5>
                        <p className="text-[11px] text-white/50 mt-1">Custom configurations & higher floor preferences available on request.</p>
                        <button
                          onClick={() => {
                            setActivePropertyDetail(null);
                            onOpenEnquiry(`Custom Config Request: ${activePropertyDetail.title}`);
                          }}
                          className="mt-3.5 px-3 py-1.5 bg-[#D4AF37]/10 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#050B18] text-[9px] font-bold uppercase tracking-wider transition-all border border-[#D4AF37]/30 cursor-pointer"
                        >
                          Enquire Custom Layout
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Special Offer Banner for SUPER HOMEZ */}
                {activePropertyDetail.specialOffer && (
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <div className="bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] p-0.5 rounded-[12px] shadow-lg overflow-hidden">
                      <div className="bg-[#050B18]/95 p-6 rounded-[11px] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
                        {/* Shimmer/light beam effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none"></div>
                        <div className="space-y-2 relative z-10">
                          <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#bf953f] to-[#b38728] text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-inner animate-pulse">
                            {activePropertyDetail.specialOffer.title}
                          </span>
                          <h4 className="text-xl sm:text-2xl font-black font-sans bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] bg-clip-text text-transparent uppercase tracking-tight">
                            {activePropertyDetail.specialOffer.mainText}
                          </h4>
                          <p className="text-base sm:text-lg font-bold text-white uppercase tracking-wider">
                            ✨ {activePropertyDetail.specialOffer.subHeading}
                          </p>
                        </div>
                        <div className="relative z-10 shrink-0">
                          <button
                            onClick={() => {
                              setActivePropertyDetail(null);
                              onOpenEnquiry(`Book for ₹501 Offer: ${activePropertyDetail.title}`);
                            }}
                            className="px-6 py-3 bg-[#D4AF37] hover:bg-white transition-all text-[#050B18] font-black text-xs uppercase tracking-widest rounded-none border border-white/20 active:scale-95"
                          >
                            Claim Offer Now
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Highlight cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4">
                      {activePropertyDetail.specialOffer.highlights.map((hl, idx) => (
                        <div key={idx} className="p-3.5 bg-gradient-to-b from-[#D4AF37]/5 to-transparent border border-[#D4AF37]/15 hover:border-[#D4AF37]/45 transition-all flex flex-col justify-center items-center text-center relative overflow-hidden group">
                          <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-[#D4AF37]"></div>
                          <CheckCircle2 className="h-4 w-4 text-[#D4AF37] mb-2" />
                          <span className="text-[10px] font-bold text-white uppercase tracking-wider leading-snug">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Custom Configuration Section for Nakshatra Aazstha and Super Homez */}
                {(activePropertyDetail.id === 'prop-005' || activePropertyDetail.id === 'prop-006') && activePropertyDetail.configurations && (
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <h4 className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-[0.2em] font-mono">Available Configurations</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {activePropertyDetail.configurations.map((config, index) => (
                        <div key={index} className="p-5 bg-white/5 border border-white/5 hover:border-[#D4AF37]/35 hover:bg-[#D4AF37]/5 transition-all duration-300 flex flex-col justify-between">
                          <div>
                            <span className="px-2 py-0.5 bg-[#D4AF37] text-[#050B18] text-[8px] font-black uppercase tracking-wider">
                              {config.name.includes('Grand') ? 'GRAND' : (config.name.includes('Spacious') ? 'SPACIOUS' : (config.name.includes('Royal') ? 'ROYAL' : (config.name.includes('Luxury') ? 'LUXURY' : 'PREMIUM')))}
                            </span>
                            <h5 className="text-base font-bold text-white mt-2 font-sans tracking-tight uppercase">{config.name}</h5>
                            <p className="text-xs text-white/50 mt-1 font-mono">Carpet Area: {config.area}</p>
                          </div>
                          <div className="mt-4 border-t border-white/10 pt-3">
                            <span className="text-[9px] text-white/40 block">STARTING FROM</span>
                            <span className="text-base font-bold text-[#D4AF37]">{config.price}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Custom 5-Level Grand Clubhouse Section for Nakshatra Aazstha */}
                {activePropertyDetail.id === 'prop-005' && activePropertyDetail.grandClubhouse && (
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <h4 className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-[0.2em] font-mono">5-Level Grand Clubhouse</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {activePropertyDetail.grandClubhouse.map((lvl, index) => (
                        <div key={index} className="p-5 bg-[#050B18]/60 border border-[#D4AF37]/15 hover:border-[#D4AF37]/35 transition-all flex flex-col justify-between">
                          <div className="flex items-center gap-2.5 pb-2.5 border-b border-white/10">
                            <span className="p-1 px-2 bg-[#D4AF37]/15 text-[#D4AF37] text-[9px] font-black uppercase tracking-wider">{lvl.level}</span>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {lvl.items.map((item, itemIdx) => (
                              <span key={itemIdx} className="px-3 py-1 bg-white/5 text-white/90 text-xs font-semibold tracking-wider border border-white/5">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Custom Payment Plans Section for Nakshatra Aazstha */}
                {activePropertyDetail.id === 'prop-005' && activePropertyDetail.paymentPlans && (
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <h4 className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-[0.2em] font-mono">Exclusive Payment Plans</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {activePropertyDetail.paymentPlans.map((plan, index) => (
                        <div key={index} className="p-5 bg-[#050B18]/40 border border-[#D4AF37]/20 hover:border-[#D4AF37]/45 transition-all flex flex-col justify-between relative overflow-hidden group">
                          <div className="absolute top-0 right-0 p-2 bg-[#D4AF37]/10 text-[#D4AF37] border-l border-b border-white/5">
                            <CheckCircle2 className="h-4 w-4" />
                          </div>
                          <div>
                            <h5 className="text-xs font-black text-white uppercase tracking-widest">{plan.title}</h5>
                            <p className="text-sm text-[#D4AF37] font-bold mt-2.5 uppercase tracking-wide">{plan.detail}</p>
                            <p className="text-[11px] text-white/60 mt-1 font-sans">{plan.extra}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Custom Launch Benefits Section for Nakshatra Aazstha */}
                {activePropertyDetail.id === 'prop-005' && activePropertyDetail.launchBenefits && (
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <h4 className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-[0.2em] font-mono">Launch Benefits</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {activePropertyDetail.launchBenefits.map((benefit, index) => (
                        <div key={index} className="p-4 bg-white/5 border border-white/5 hover:border-[#D4AF37]/20 transition-all flex items-center gap-3">
                          <div className="p-1.5 bg-[#D4AF37]/15 text-[#D4AF37]">
                            <Sparkles className="h-4 w-4" />
                          </div>
                          <span className="text-xs font-semibold text-white/95 uppercase tracking-wider">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Project Details */}
                <div className="space-y-4">
                  <h4 className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-[0.2em]">Project Specifications & Details</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activePropertyDetail.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="h-4 w-4 text-[#D4AF37] flex-shrink-0" />
                        <span className="text-xs sm:text-sm font-medium text-white/80 uppercase tracking-wider">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main Highlights List */}
                {activePropertyDetail.highlights && (
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <h4 className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-[0.2em] font-mono">Main Highlights</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {activePropertyDetail.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-4 w-4 text-[#D4AF37] shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-white/95">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Amenities with Premium Icon Cards */}
                {activePropertyDetail.amenities && (
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <h4 className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-[0.2em] font-mono">Premium Amenities</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {activePropertyDetail.amenities.map((amenity, idx) => {
                        const IconComponent = IconMap[amenity.icon] || Building;
                        return (
                          <div 
                            key={idx} 
                            className="p-4 bg-white/5 border border-white/5 hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/5 transition-all duration-300 flex flex-col items-center text-center gap-2.5 group"
                          >
                            <div className="p-2.5 bg-[#050B18] border border-white/10 group-hover:border-[#D4AF37]/50 text-[#D4AF37] transition-all">
                              <IconComponent className="h-5 w-5" />
                            </div>
                            <span className="text-[11px] font-semibold text-white/90 uppercase tracking-wider">{amenity.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Location Advantages */}
                {activePropertyDetail.advantages && (
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <h4 className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-[0.2em] font-mono">Location Advantages</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activePropertyDetail.advantages.map((adv, idx) => {
                        const IconComponent = IconMap[adv.icon] || MapPin;
                        return (
                          <div 
                            key={idx} 
                            className="p-4 bg-white/5 border border-white/5 flex items-center gap-3.5 hover:bg-white/[0.07] transition-colors"
                          >
                            <div className="p-2 bg-[#D4AF37]/15 text-[#D4AF37]">
                              <IconComponent className="h-4 w-4" />
                            </div>
                            <span className="text-xs sm:text-sm text-white/90 font-medium">{adv.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="h-px bg-white/10"></div>

                {/* Bottom Conversion Row / Custom CTA Section */}
                {activePropertyDetail.id === 'prop-003' || activePropertyDetail.id === 'prop-004' || activePropertyDetail.id === 'prop-005' || activePropertyDetail.id === 'prop-006' ? (
                  <div className="border border-[#D4AF37]/30 bg-[#0B1320]/80 p-6 sm:p-8 rounded-[18px] backdrop-blur-md space-y-6 mt-6 select-none relative overflow-hidden">
                    {/* Decorative gold spotlight */}
                    <div className="absolute right-0 top-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full filter blur-2xl pointer-events-none"></div>
                    
                    <div className="text-center sm:text-left space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-semibold block">EXQUISITE OPPORTUNITY</span>
                      <h4 className="text-xl sm:text-2xl font-light font-serif text-white">
                        {activePropertyDetail.id === 'prop-003' ? (
                          <>Book Your <span className="font-serif italic font-bold text-[#D4AF37]">Dream Home</span> Today</>
                        ) : activePropertyDetail.id === 'prop-005' ? (
                          <>Live Above the <span className="font-serif italic font-bold text-[#D4AF37]">Ordinary</span></>
                        ) : activePropertyDetail.id === 'prop-006' ? (
                          <>Your Dream Home is <span className="font-serif italic font-bold text-[#D4AF37]">Just ₹501 Away!</span></>
                        ) : (
                          <>Upgrade Your <span className="font-serif italic font-bold text-[#D4AF37]">Lifestyle Today</span></>
                        )}
                      </h4>
                      <p className="text-xs sm:text-sm text-white/70 font-sans mt-1">
                        {activePropertyDetail.id === 'prop-003' 
                          ? 'Pay Only 10% & Reserve Your Dream Home' 
                          : activePropertyDetail.id === 'prop-005'
                          ? 'Book Your Dream Home at Nakshatra Aazstha Today'
                          : activePropertyDetail.id === 'prop-006'
                          ? 'Book Today and Enjoy No EMI Till Possession'
                          : 'Experience Luxury Living at Akhand Elite, Vasai East'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
                      <button
                        onClick={() => {
                          setActivePropertyDetail(null);
                          onOpenEnquiry(`Site Visit: ${activePropertyDetail.title}`);
                        }}
                        className="py-3.5 px-4 bg-[#D4AF37] hover:bg-white text-[#050B18] text-[11px] font-black uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 outline-none cursor-pointer"
                      >
                        <Calendar className="h-4 w-4" />
                        <span>Schedule Site Visit</span>
                      </button>

                      <a
                        href="tel:+917020913759"
                        className="py-3.5 px-4 bg-[#0a1122] border border-white/20 hover:bg-white/10 text-white text-[11px] font-black uppercase tracking-widest text-center transition-all flex items-center justify-center gap-2 outline-none cursor-pointer"
                      >
                        <Phone className="h-4 w-4 text-[#D4AF37]" />
                        <span>Call Now</span>
                      </a>

                      <a
                        href={activePropertyDetail.id === 'prop-003' 
                          ? `https://wa.me/917020913759?text=Hello%2C%20I%27m%20interested%20in%20JSB%20Nakshatra%20Nirvaana%20residential%20project.%20Please%20share%20pricing%20details.`
                          : activePropertyDetail.id === 'prop-005'
                          ? `https://wa.me/917020913759?text=Hello%2C%20I%27m%20interested%20in%20Nakshatra%20Aazstha%20Vasai%20East%20residential%20project.%20Please%20share%20pricing%20details.`
                          : activePropertyDetail.id === 'prop-006'
                          ? `https://wa.me/917020913759?text=Hello%2C%20I%27m%20interested%20in%20Super%20Homez%20Virar%20West%20residential%20project.%20Please%20share%20pricing%20details.`
                          : `https://wa.me/917020913759?text=Hello%2C%20I%27m%20interested%20in%20Akhand%20Elite%20Vasai%20East%20residential%20project.%20Please%20share%20pricing%20details.`}
                        target="_blank"
                        rel="noreferrer"
                        className="py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-black uppercase tracking-widest text-center shadow-md flex items-center justify-center gap-2 transition-all outline-none"
                      >
                        <span className="font-mono bg-white/20 px-1.5 py-0.5 rounded text-[9px] tracking-normal">WA</span>
                        <span>WhatsApp</span>
                      </a>

                      <button
                        onClick={() => {
                          setBrochureRequested(true);
                        }}
                        className="py-3.5 px-4 bg-white/5 border border-white/15 hover:border-[#D4AF37] hover:bg-white/10 text-white text-[11px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 outline-none cursor-pointer"
                      >
                        <Download className="h-4 w-4 text-[#D4AF37]" />
                        <span>Download Brochure</span>
                      </button>
                    </div>

                    {brochureRequested && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs text-center font-semibold uppercase tracking-wider rounded-lg"
                      >
                        ✨ Brochure Download Link Sent to your registered number!
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <div className="border-t border-white/10 pt-6 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <p className="text-[9px] text-white/40 uppercase tracking-widest">Consulting Agent</p>
                        <p className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider mt-0.5">Mansi Gaikwad</p>
                        <p className="text-xs text-white/50">MahaRERA Reg No: A99000026853</p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-[9px] text-white/40 uppercase tracking-widest">Direct Phone Contact</p>
                        <a href="tel:+917020913759" className="text-sm font-extrabold text-white hover:underline block mt-0.5">
                          +91 7020913759
                        </a>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        onClick={() => handleEnquireFromDetail(activePropertyDetail.title)}
                        className="w-full py-3.5 bg-white/5 border border-white/20 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-widest cursor-pointer text-center transition-colors outline-none"
                      >
                        Enquire Now
                      </button>

                      <button
                        onClick={() => {
                          setActivePropertyDetail(null);
                          onOpenEnquiry(`Site Visit Request: ${activePropertyDetail.title}`);
                        }}
                        className="w-full py-3.5 bg-[#D4AF37] text-[#050B18] hover:bg-white hover:text-black text-xs font-black uppercase tracking-widest cursor-pointer text-center transition-colors shadow-md outline-none flex items-center justify-center gap-1.5"
                      >
                        <Calendar className="h-4 w-4" /> Book Site Visit
                      </button>
                      
                      <a
                        href={`https://wa.me/917020913759?text=Hi%20Verified%20Properties,%20I%27m%20interested%20in%20arranging%20a%20site%20visit%20for%20${encodeURIComponent(activePropertyDetail.title)}.%20Please%20let%20me%20know%20your%20availability.`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-widest text-center shadow-md flex items-center justify-center gap-2 transition-colors outline-none"
                      >
                        <span className="font-mono bg-white/20 px-1.5 py-0.5 rounded text-[10px]">WA</span>
                        <span>WhatsApp Chat</span>
                      </a>
                    </div>
                  </div>
                )}

              </div>

            </div>
          </div>
        );
      })()}

      {/* FULLSCREEN LIGHTBOX GALLERY POPUP */}
      {isLightboxOpen && activePropertyDetail && (() => {
        const propertyImages = activePropertyDetail.gallery || [activePropertyDetail.image];
        return (
          <div className="fixed inset-0 z-[100] bg-black/98 flex flex-col justify-between p-4 sm:p-6 select-none">
            
            {/* Lightbox Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-[0.2em] font-bold">PREMIUM GALLERY INSPECTION</span>
                <h4 className="text-base font-sans font-medium text-white uppercase mt-0.5">{activePropertyDetail.title}</h4>
              </div>
              
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-2.5 bg-white/5 hover:bg-white/20 border border-white/10 text-white transition-all cursor-pointer rounded-full outline-none"
                aria-label="Close Lightbox"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Lightbox Body with Main Image & Slide Controls */}
            <div 
              className="relative flex-grow flex items-center justify-center my-4"
              onTouchStart={handleLightboxTouchStart}
              onTouchEnd={(e) => handleLightboxTouchEnd(e, propertyImages.length)}
            >
              <img
                src={propertyImages[lightboxImageIndex]}
                alt={`${activePropertyDetail.title} Full view ${lightboxImageIndex + 1}`}
                className="max-w-full max-h-[70vh] object-contain shadow-2xl border border-white/5"
                referrerPolicy="no-referrer"
              />
              
              {/* Left/Right Controls */}
              {propertyImages.length > 1 && (
                <>
                  <button
                    onClick={() => setLightboxImageIndex((prev) => (prev === 0 ? propertyImages.length - 1 : prev - 1))}
                    className="absolute left-2 sm:left-6 p-3 bg-black/60 hover:bg-[#D4AF37] text-white hover:text-[#050B18] transition-all rounded-full border border-white/10 cursor-pointer outline-none"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => setLightboxImageIndex((prev) => (prev === propertyImages.length - 1 ? 0 : prev + 1))}
                    className="absolute right-2 sm:right-6 p-3 bg-black/60 hover:bg-[#D4AF37] text-white hover:text-[#050B18] transition-all rounded-full border border-white/10 cursor-pointer outline-none"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            {/* Lightbox Footer with Navigation Strip */}
            <div className="border-t border-white/5 pt-4 space-y-4">
              <div className="flex items-center justify-between text-xs text-white/55 font-mono">
                <span>EXPLORING PROPERTY MEDIA FILES</span>
                <span className="text-[#D4AF37] font-bold">IMAGE {lightboxImageIndex + 1} OF {propertyImages.length}</span>
              </div>

              {/* Thumbnail Strip */}
              {propertyImages.length > 1 && (
                <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-thin max-w-4xl mx-auto">
                  {propertyImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setLightboxImageIndex(idx)}
                      className={`h-12 w-16 flex-shrink-0 overflow-hidden border transition-all ${
                        lightboxImageIndex === idx 
                          ? 'border-[#D4AF37] scale-105 opacity-100 ring-2 ring-[#D4AF37]/30' 
                          : 'border-white/10 opacity-50 hover:opacity-80'
                      }`}
                    >
                      <img
                        src={img}
                        alt="Mini Thumbnail"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>
        );
      })()}

    </section>
  );
}
