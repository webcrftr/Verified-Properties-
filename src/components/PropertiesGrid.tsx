/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, MapPin, Grid, Layers, ShieldCheck, CheckCircle2, ChevronRight, ChevronLeft, X, Phone, Calendar, Maximize2 } from 'lucide-react';
import { PROPERTIES } from '../data';
import { Property, PropertyType, TransactionType } from '../types';

interface PropertiesGridProps {
  onOpenEnquiry: (propertyName?: string) => void;
  isFeaturedOnly?: boolean;
  onNavigate?: (path: string) => void;
}

export default function PropertiesGrid({ onOpenEnquiry, isFeaturedOnly = false, onNavigate }: PropertiesGridProps) {
  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<PropertyType | 'all'>('all');
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionType | 'all'>('all');
  const [activePropertyDetail, setActivePropertyDetail] = useState<Property | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);

  // Filter listings based on input states
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((prop) => {
      const matchesSearch =
        prop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prop.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prop.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = selectedType === 'all' || prop.type === selectedType;
      
      const matchesTransaction =
        selectedTransaction === 'all' || prop.transaction === selectedTransaction;

      return matchesSearch && matchesType && matchesTransaction;
    });
  }, [searchTerm, selectedType, selectedTransaction]);

  const handleOpenDetailModal = (property: Property) => {
    setActivePropertyDetail(property);
    setActiveImageIndex(0);
  };

  const handleCloseDetailModal = () => {
    setActivePropertyDetail(null);
    setIsLightboxOpen(false);
  };

  const handleEnquireFromDetail = (propertyName: string) => {
    setActivePropertyDetail(null);
    setIsLightboxOpen(false);
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
                {filteredProperties.length} Properties
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

        {/* Empty state container */}
        {filteredProperties.length === 0 && (
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
              <strong className="text-white text-sm font-extrabold pr-0.5">{filteredProperties.length}</strong>
              <span>MATCHING PREMIUM REAL ESTATE ASSETS</span>
            </p>
            <div className="hidden sm:block text-[10px] font-mono text-[#D4AF37]/80">
              MahaRERA Registered Listings Only
            </div>
          </div>
        )}

        {/* Properties Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(isFeaturedOnly ? filteredProperties.slice(0, 3) : filteredProperties).map((prop) => {
            // High fidelity editorial sub-tags map 
            const getSecondaryBadge = (item: typeof prop) => {
              if (item.id === 'prop-001') return 'RERA APPROVED';
              if (item.id === 'prop-002') return 'PREMIUM LUXURY';
              if (item.id === 'prop-003') return 'HIGH ROI BUSINESS';
              if (item.id === 'prop-004') return 'READY TO OCCUPY';
              if (item.id === 'prop-005') return 'EXECUTIVE SUITE';
              if (item.id === 'prop-006') return 'HIGH YIELD INVESTMENT';
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
                  <img
                    src={prop.image}
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* High Quality Styled Badges Left */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 items-start">
                    <span className="px-3.5 py-1.5 text-[9px] font-black uppercase tracking-widest text-[#050B18] bg-[#D4AF37] shadow-lg leading-none">
                      FOR {prop.transaction.toUpperCase()}
                    </span>
                    <span className="px-2.5 py-1 text-[8px] font-mono font-bold uppercase tracking-wider bg-black/85 text-[#D4AF37] border border-[#D4AF37]/30 shadow-md">
                      {getSecondaryBadge(prop)}
                    </span>
                  </div>

                  {/* MahaRERA Badge with Gold Shield Overlay Bottom Right */}
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
                </div>

                {/* Property Details summary section */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    
                    {/* Category Type & Construction Status */}
                    <div className="flex items-center justify-between pb-1">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] font-mono">
                        {typeLabels[prop.type]}
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
                        {prop.id === 'prop-001' ? 'Naigaon East, Palghar' : prop.location}
                      </span>
                    </div>

                    {/* Specifications grid (Bento style specs block) */}
                    <div className="grid grid-cols-2 gap-2 mt-4 text-[10px] font-mono uppercase tracking-wider text-white/70">
                      <div className="py-2 px-3 bg-white/5 border border-white/5 flex flex-col justify-between items-start">
                        <span className="text-white/40 text-[9px] mb-1">Configuration</span>
                        <span className="font-bold text-white">{prop.id === 'prop-001' ? '1 BHK' : (prop.bedrooms ? `${prop.bedrooms} BHK` : 'Commercial')}</span>
                      </div>
                      <div className="py-2 px-3 bg-white/5 border border-white/5 flex flex-col justify-between items-start">
                        <span className="text-white/40 text-[9px] mb-1">Carpet Area</span>
                        <span className="font-bold text-white truncate w-full">{prop.id === 'prop-001' ? '392 Sq.Ft. Usable' : prop.area}</span>
                      </div>
                      <div className="py-2 px-3 bg-white/5 border border-white/5 flex flex-col justify-between items-start">
                        <span className="text-white/40 text-[9px] mb-1">Tower</span>
                        <span className="font-bold text-[#D4AF37]">{prop.tower || 'Premium Tower'}</span>
                      </div>
                      <div className="py-2 px-3 bg-white/5 border border-white/5 flex flex-col justify-between items-start">
                        <span className="text-white/40 text-[9px] mb-1">Status</span>
                        <span className="font-bold text-emerald-400">{statusText}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price and CTA Card bottom bar */}
                  <div className="border-t border-white/10 pt-4 mt-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[8px] uppercase font-bold text-white/40 block tracking-widest leading-none mb-1">ESTIMATED PRICE</span>
                        <span className="text-base font-bold text-[#D4AF37] tracking-tight">
                          {prop.id === 'prop-001' ? '₹31 Lakhs Onwards' : prop.price}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleOpenDetailModal(prop)}
                        className="py-2.5 border border-white/20 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer bg-transparent outline-none"
                      >
                        View Details
                      </button>
                      
                      <button
                        onClick={() => onOpenEnquiry(prop.title)}
                        className="py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer outline-none"
                      >
                        Enquire Now
                      </button>
                    </div>

                    <button
                      onClick={() => onOpenEnquiry(`Site Visit: ${prop.title}`)}
                      className="w-full py-2.5 bg-[#D4AF37] text-[#050B18] hover:bg-white hover:text-black text-[10px] font-extrabold uppercase tracking-widest transition-colors cursor-pointer shadow-md flex items-center justify-center gap-1.5"
                    >
                      <Calendar className="h-3.5 w-3.5" /> Book Site Visit
                    </button>
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
              <div className="relative h-[250px] sm:h-[380px] bg-black/60 group/slider overflow-hidden">
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
                    FOR {activePropertyDetail.transaction.toUpperCase()}
                  </span>
                  
                  <h3 className="text-2xl sm:text-3xl font-bold font-sans uppercase text-white mt-3 leading-tight drop-shadow-md pointer-events-auto">
                    {activePropertyDetail.title}
                  </h3>
                  
                  <div className="flex items-center gap-1.5 text-white/80 text-xs sm:text-sm mt-2 pointer-events-auto">
                    <MapPin className="h-4 w-4 text-[#D4AF37]" />
                    <span>{activePropertyDetail.location}</span>
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
                      {activePropertyDetail.id === 'prop-001' ? '1 BHK Apartment' : typeLabels[activePropertyDetail.type]}
                    </span>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/5 flex flex-col justify-between">
                    <span className="text-[9px] text-white/40 uppercase font-bold tracking-widest">Carpet Area</span>
                    <span className="text-xs font-semibold text-white uppercase tracking-wider mt-1">
                      {activePropertyDetail.id === 'prop-001' ? '392 Sq.Ft. Usable' : activePropertyDetail.area}
                    </span>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/5 flex flex-col justify-between">
                    <span className="text-[9px] text-white/40 uppercase font-bold tracking-widest">Price Quote</span>
                    <span className="text-xs font-bold text-[#D4AF37] mt-1">
                      {activePropertyDetail.id === 'prop-001' ? '₹31 Lakhs Onwards' : activePropertyDetail.price}
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
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* RERA approval detail bar when present */}
                {activePropertyDetail.reraApproved && (
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

                {/* Specific features grid layout */}
                <div className="space-y-4">
                  <h4 className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-[0.2em]">Amenities & Key Highlights</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activePropertyDetail.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="h-4 w-4 text-[#D4AF37] flex-shrink-0" />
                        <span className="text-xs sm:text-sm font-medium text-white/80 uppercase tracking-wider">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-white/10"></div>

                {/* Bottom Conversion Row with all 3 CTA Buttons requested */}
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
                      className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-widest text-center shadow-md flex items-center justify-center gap-2 transition-colors"
                    >
                      <span className="font-mono bg-white/20 px-1.5 py-0.5 rounded text-[10px]">WA</span>
                      <span>WhatsApp Chat</span>
                    </a>
                  </div>
                </div>

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
            <div className="relative flex-grow flex items-center justify-center my-4">
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
