/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Calendar, Clock, Send, ShieldCheck, BadgeCheck, MessageSquare, Car } from 'lucide-react';
import { BUSINESS_DETAILS, PROPERTIES } from '../data';
import { SiteVisit } from '../types';

interface BookSiteVisitPageProps {
  onNavigate: (path: string) => void;
}

export default function BookSiteVisitPage({ onNavigate }: BookSiteVisitPageProps) {
  // Form fields
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [selectedProperty, setSelectedProperty] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('11:00 AM - 01:00 PM');
  const [visitorsCount, setVisitorsCount] = useState('2');
  const [pickupRequired, setPickupRequired] = useState(false);
  const [pickupLocation, setPickupLocation] = useState('');
  const [notes, setNotes] = useState('');

  // Submission & validation state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Auto-fill property from query parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const propertyParam = params.get('property');
    if (propertyParam) {
      // Stripping "Site Visit:" prefix if it exists from older button behaviors
      const cleanParam = propertyParam.replace('Site Visit: ', '').replace('Site Visit Request: ', '');
      const matched = PROPERTIES.find(
        (p) =>
          p.title.toLowerCase() === cleanParam.toLowerCase() ||
          cleanParam.toLowerCase().includes(p.title.toLowerCase())
      );
      if (matched) {
        setSelectedProperty(matched.title);
      } else {
        setSelectedProperty(cleanParam);
      }
    } else {
      setSelectedProperty(PROPERTIES[0]?.title || '');
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!clientName.trim()) {
      setValidationError('Please enter your full name.');
      return;
    }

    const phoneClean = clientPhone.replace(/\D/g, '');
    if (phoneClean.length < 10) {
      setValidationError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!visitDate) {
      setValidationError('Please select a preferred date for the site visit.');
      return;
    }

    if (pickupRequired && !pickupLocation.trim()) {
      setValidationError('Please specify a pickup location for transportation.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Format notes to include pickup details, visitors, and personal notes for total backwards-compatibility
      const formattedNotes = `Visitors: ${visitorsCount} | Pickup: ${pickupRequired ? `Yes (${pickupLocation.trim()})` : 'No'} | Notes: ${notes.trim() || 'No special requirements.'}`;

      const timestamp = new Date().toLocaleString();
      const matchedProperty = PROPERTIES.find(p => p.title === selectedProperty);

      // Extend SiteVisit inside our custom schema if possible, or save details nicely
      const newVisit: SiteVisit & { visitorsCount?: string, pickupRequired?: boolean, pickupLocation?: string } = {
        id: `visit-${Date.now()}`,
        timestamp,
        propertyName: selectedProperty,
        propertyId: matchedProperty?.id || 'unknown',
        clientName: clientName.trim(),
        clientPhone: phoneClean,
        visitDate,
        visitTime,
        status: 'pending',
        visitorsCount,
        pickupRequired,
        pickupLocation: pickupRequired ? pickupLocation.trim() : '',
        notes: formattedNotes
      };

      // Save to localStorage Site Visits array
      const existingVisits = JSON.parse(localStorage.getItem('verified_properties_site_visits') || '[]');
      existingVisits.unshift(newVisit);
      localStorage.setItem('verified_properties_site_visits', JSON.stringify(existingVisits));

      setIsSubmitted(true);

      // Clear fields
      setClientName('');
      setClientPhone('');
      setVisitDate('');
      setPickupLocation('');
      setNotes('');
      setPickupRequired(false);
    } catch (err) {
      console.error('Error saving site visit booking:', err);
      setValidationError('Failed to schedule site visit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppURL = () => {
    const textBase = `Hi Mansi Gaikwad, I'd like to book a Site Visit for property: *${selectedProperty}*. Name: ${clientName || '(not entered)'}, Mobile: ${clientPhone || '(not entered)'}. Date: ${visitDate || '(not entered)'}, Time: ${visitTime}, Visitors: ${visitorsCount}, Pickup Required: ${pickupRequired ? `Yes (${pickupLocation})` : 'No'}. Notes: ${notes}`;
    return `https://wa.me/917020913759?text=${encodeURIComponent(textBase)}`;
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-[#FAFAF8] text-[#1E1E1E] min-h-screen">
      
      {/* Premium Hero Section */}
      <div className="relative pt-36 pb-20 bg-[#FAFAF8] border-b border-[#E7E1D9] overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img
            src="/src/assets/images/verified_properties_hero_1782216213939.jpg"
            alt="Luxury home showcase view"
            className="w-full h-full object-cover object-center scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#FAFAF8] opacity-80"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center sm:text-left">
          <span className="text-[10px] font-mono text-[#C4514F] uppercase tracking-[0.25em] font-bold">Exclusive Site Tours</span>
          <h1 className="text-4xl sm:text-5xl font-light font-serif mt-2 text-[#1E1E1E]">
            Book <span className="italic font-bold text-[#C4514F]">Site Visit</span>
          </h1>
          <p className="mt-4 max-w-xl text-xs sm:text-sm text-[#5B5B5B] font-sans uppercase tracking-wider leading-relaxed">
            Arrange a complimentary private tour of our pre-vetted luxury projects in Naigaon, Vasai, or Virar. High-end transit and legal brief included.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
           {/* Column 1: Informational Details & Call Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            
            <div className="space-y-6">
              <span className="text-[10px] font-mono text-[#C4514F] uppercase tracking-[0.2em] font-bold block">
                COMPLIMENTARY TRAVEL
              </span>
              <h3 className="text-2xl font-light font-serif text-[#1E1E1E]">
                Transit & <span className="italic font-bold text-[#C4514F]">Advisory Support</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#5B5B5B] leading-relaxed font-sans">
                We provide end-to-end luxury transportation assistance for all site bookings. Select the pickup option in the scheduler form, and an air-conditioned luxury cruiser will be dispatched to your location.
              </p>

              {/* Direct Call & WhatsApp row */}
              <div className="grid grid-cols-1 gap-4 pt-2">
                <a
                  href={`tel:+91${BUSINESS_DETAILS.phone}`}
                  className="flex items-center justify-center gap-2.5 py-3 px-4 bg-[#C4514F] text-white hover:bg-[#B13E3B] transition-colors duration-300 font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all cursor-pointer shadow-md"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call: +91 {BUSINESS_DETAILS.phone}</span>
                </a>
                
                <a
                  href={getWhatsAppURL()}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2.5 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-md"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Book via WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Perks Cards Stack */}
            <div className="p-5 bg-[#FFFFFF]/90 backdrop-blur-md border border-[#E7E1D9] space-y-4">
              <h4 className="text-[10px] uppercase font-bold text-[#C4514F] tracking-widest font-mono">SITE VISIT PRIVILEGES</h4>
              
              <div className="space-y-3 text-xs text-[#5B5B5B]">
                <p className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Zero Brokerage Fees:</strong> Access direct builder layouts, floor pricing, and pre-negotiated deals.</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Private Air-Conditioned Pick & Drop:</strong> Available across Naigaon, Vasai Road, and Virar stations.</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Full Legal Briefing:</strong> View official MahaRERA certified folders, title certificates, and floor approvals.</span>
                </p>
              </div>
            </div>

            {/* RERA license marker */}
            <div className="p-4 bg-[#F5EFE7] border border-[#E7E1D9] text-[10px] text-[#5B5B5B] leading-relaxed font-mono">
              <span className="text-[#C4514F] font-bold">📢 AGENT CREDENTIALS:</span> Mansi Gaikwad is a registered MahaRERA advisor (License No: A99000026853). All site bookings are managed with absolute integrity.
            </div>

          </div>

          {/* Column 2: Gorgeous Site Visit Booking Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFFFF]/90 backdrop-blur-md border border-[#E7E1D9] p-6 sm:p-10 backdrop-blur-md flex flex-col justify-between h-full">
              
              {isSubmitted ? (
                <div className="py-16 text-center space-y-6">
                  <div className="h-16 w-16 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto rounded-full">
                    <BadgeCheck className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-light font-serif text-[#1E1E1E]">Visit Scheduled Successfully!</h3>
                  <p className="text-xs sm:text-sm text-[#5B5B5B] leading-relaxed font-sans max-w-sm mx-auto">
                    Mansi Gaikwad has logged your visit to <strong className="text-[#C4514F]">{selectedProperty}</strong>. Our driver and dedicated coordinator will call you back to confirm pickup coordinates.
                  </p>
                  
                  <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-2.5 bg-[#F5EFE7] border border-[#E7E1D9] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#F5EFE7] transition-colors cursor-pointer"
                    >
                      Book Another Visit
                    </button>
                    <button
                      onClick={() => onNavigate('/')}
                      className="px-6 py-2.5 bg-[#C4514F] text-white hover:bg-[#B13E3B] transition-colors duration-300 font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors cursor-pointer"
                    >
                      Back To Home
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <span className="text-[#C4514F] text-[10px] font-mono tracking-widest uppercase block mb-1">
                      SCHEDULER ENGINE
                    </span>
                    <h3 className="text-2xl font-light font-serif text-[#1E1E1E]">
                      Arrange <span className="italic font-bold text-[#C4514F]">Private Tour</span>
                    </h3>
                  </div>

                  {validationError && (
                    <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[11px] font-mono uppercase tracking-wider">
                      ⚠️ {validationError}
                    </div>
                  )}

                  {/* Property Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-[#5B5B5B]/50 block tracking-widest">
                      Select Target Property *
                    </label>
                    <select
                      value={selectedProperty}
                      onChange={(e) => setSelectedProperty(e.target.value)}
                      className="w-full px-4 py-3 bg-[#FAFAF8] text-xs text-[#1E1E1E] font-medium border border-[#E7E1D9] focus:border-[#C4514F] focus:outline-none cursor-pointer"
                    >
                      {PROPERTIES.map((p) => (
                        <option key={p.id} value={p.title} className="bg-[#FFFFFF]/90 backdrop-blur-md">
                          {p.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Two Column Name / Mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-[#5B5B5B]/50 block tracking-widest">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sameer Kulkarni"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-4 py-3 bg-[#FAFAF8] text-sm text-[#1E1E1E] border border-[#E7E1D9] focus:border-[#C4514F] focus:outline-none placeholder-white/20"
                      />
                    </div>

                    {/* Mobile Number */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-[#5B5B5B]/50 block tracking-widest">
                        Mobile Number *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#C4514F] text-xs font-mono">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          placeholder="7020913759"
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 bg-[#FAFAF8] text-sm text-[#1E1E1E] border border-[#E7E1D9] focus:border-[#C4514F] focus:outline-none placeholder-white/20"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Preferred Date & Time Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Date */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-[#5B5B5B]/50 block tracking-widest">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        required
                        min={todayStr}
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#FAFAF8] text-sm text-[#1E1E1E] border border-[#E7E1D9] focus:border-[#C4514F] focus:outline-none text-[#1E1E1E] cursor-pointer"
                      />
                    </div>

                    {/* Time slots */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-[#5B5B5B]/50 block tracking-widest">
                        Preferred Time *
                      </label>
                      <select
                        value={visitTime}
                        onChange={(e) => setVisitTime(e.target.value)}
                        className="w-full px-4 py-3 bg-[#FAFAF8] text-xs text-[#1E1E1E] font-medium border border-[#E7E1D9] focus:border-[#C4514F] focus:outline-none cursor-pointer"
                      >
                        <option value="10:00 AM - 12:00 PM" className="bg-[#FFFFFF]/90 backdrop-blur-md">10:00 AM - 12:00 PM (Morning Slot)</option>
                        <option value="12:00 PM - 02:00 PM" className="bg-[#FFFFFF]/90 backdrop-blur-md">12:00 PM - 02:00 PM (Mid-day Slot)</option>
                        <option value="02:00 PM - 04:00 PM" className="bg-[#FFFFFF]/90 backdrop-blur-md">02:00 PM - 04:00 PM (Afternoon Slot)</option>
                        <option value="04:00 PM - 06:00 PM" className="bg-[#FFFFFF]/90 backdrop-blur-md">04:00 PM - 06:00 PM (Sunset Slot)</option>
                        <option value="06:00 PM - 08:00 PM" className="bg-[#FFFFFF]/90 backdrop-blur-md">06:00 PM - 08:00 PM (Evening Slot)</option>
                      </select>
                    </div>
                  </div>

                  {/* Visitors Count */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-[#5B5B5B]/50 block tracking-widest">
                      Number of Visitors *
                    </label>
                    <select
                      value={visitorsCount}
                      onChange={(e) => setVisitorsCount(e.target.value)}
                      className="w-full px-4 py-3 bg-[#FAFAF8] text-xs text-[#1E1E1E] font-medium border border-[#E7E1D9] focus:border-[#C4514F] focus:outline-none cursor-pointer"
                    >
                      <option value="1" className="bg-[#FFFFFF]/90 backdrop-blur-md">1 Person</option>
                      <option value="2" className="bg-[#FFFFFF]/90 backdrop-blur-md">2 People (Recommended)</option>
                      <option value="3" className="bg-[#FFFFFF]/90 backdrop-blur-md">3 People</option>
                      <option value="4" className="bg-[#FFFFFF]/90 backdrop-blur-md">4 People</option>
                      <option value="5+" className="bg-[#FFFFFF]/90 backdrop-blur-md">Family Group (5+ People)</option>
                    </select>
                  </div>

                  {/* Pickup Required Checkbox & Location Panel */}
                  <div className="p-4 bg-[#F5EFE7] border border-[#E7E1D9] space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={pickupRequired}
                        onChange={(e) => setPickupRequired(e.target.checked)}
                        className="h-4.5 w-4.5 border border-[#E7E1D9] bg-[#FAFAF8] accent-[#C4514F] cursor-pointer"
                      />
                      <span className="text-xs font-bold uppercase text-[#C4514F] tracking-wider flex items-center gap-1.5">
                        <Car className="h-4 w-4" /> Transit Pickup Service Needed?
                      </span>
                    </label>

                    {pickupRequired && (
                      <div className="space-y-1.5 animate-fade-in">
                        <label className="text-[9px] uppercase font-bold text-[#5B5B5B] block tracking-widest">
                          Specify Pickup Location *
                        </label>
                        <input
                          type="text"
                          required={pickupRequired}
                          placeholder="e.g. Naigaon Railway Station East ticket desk, or local hotel..."
                          value={pickupLocation}
                          onChange={(e) => setPickupLocation(e.target.value)}
                          className="w-full px-4 py-2.5 bg-[#FAFAF8] text-xs text-[#1E1E1E] border border-[#E7E1D9] focus:border-[#C4514F] focus:outline-none placeholder-white/20"
                        />
                      </div>
                    )}
                  </div>

                  {/* Notes */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-[#5B5B5B]/50 block tracking-widest">
                      Special Requests / Notes
                    </label>
                    <textarea
                      rows={2.5}
                      placeholder="e.g. Wheelchair assistance, specific builder blueprints needed..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-4 py-3 bg-[#FAFAF8] text-sm text-[#1E1E1E] border border-[#E7E1D9] focus:border-[#C4514F] focus:outline-none placeholder-white/20"
                    ></textarea>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#C4514F] text-white hover:bg-[#B13E3B] transition-colors duration-300 font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">BOOKING site visit...</span>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>BOOK SITE VISIT</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
