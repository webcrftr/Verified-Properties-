/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Send, ShieldCheck, BadgeCheck, Clock, ExternalLink, MessageSquare } from 'lucide-react';
import { BUSINESS_DETAILS, PROPERTIES } from '../data';
import { Inquiry } from '../types';

interface EnquiryPageProps {
  onNavigate: (path: string) => void;
}

export default function EnquiryPage({ onNavigate }: EnquiryPageProps) {
  // Form fields
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [city, setCity] = useState('');
  const [budget, setBudget] = useState('₹30 - ₹40 Lakhs');
  const [selectedProperty, setSelectedProperty] = useState('General Real-Estate Inquiry');
  const [clientMessage, setClientMessage] = useState('');

  // Submission & validation state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Auto-fill property from query parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const propertyParam = params.get('property');
    if (propertyParam) {
      const matched = PROPERTIES.find(
        (p) =>
          p.title.toLowerCase() === propertyParam.toLowerCase() ||
          propertyParam.toLowerCase().includes(p.title.toLowerCase())
      );
      if (matched) {
        setSelectedProperty(matched.title);
      } else {
        setSelectedProperty(propertyParam);
      }
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

    if (!city.trim()) {
      setValidationError('Please enter your current city.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Format details beautifully into the message for CRM display compatibility
      const fullMessage = `City: ${city.trim()} | Budget: ${budget} | Requirements: ${clientMessage.trim() || 'Interested in property details.'}`;

      const timestamp = new Date().toLocaleString();
      const newInquiry: Inquiry = {
        id: `inquiry-${Date.now()}`,
        timestamp,
        propertyName: selectedProperty,
        clientName: clientName.trim(),
        clientPhone: phoneClean,
        clientEmail: clientEmail.trim() || undefined,
        message: fullMessage,
        status: 'new'
      };

      // Save to localStorage
      const existingInquiries = JSON.parse(localStorage.getItem('verified_properties_inquiries') || '[]');
      existingInquiries.unshift(newInquiry);
      localStorage.setItem('verified_properties_inquiries', JSON.stringify(existingInquiries));

      setIsSubmitted(true);
      
      // Clear form
      setClientName('');
      setClientPhone('');
      setClientEmail('');
      setCity('');
      setClientMessage('');
    } catch (err) {
      console.error('Error saving inquiry:', err);
      setValidationError('Failed to submit enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppURL = () => {
    const textBase = `Hi Mansi Gaikwad, I'm interested in inquiring about property: *${selectedProperty}*. Name: ${clientName || '(not entered)'}, Mobile: ${clientPhone || '(not entered)'}, City: ${city || '(not entered)'}, Budget: ${budget}. Message: ${clientMessage || 'Please share brochure and pricing.'}`;
    return `https://wa.me/917020913759?text=${encodeURIComponent(textBase)}`;
  };

  return (
    <div className="bg-[#FAFAF8] text-[#1E1E1E] min-h-screen">
      
      {/* Premium Hero Section */}
      <div className="relative pt-36 pb-20 bg-[#FAFAF8] border-b border-[#E7E1D9] overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img
            src="/src/assets/images/verified_properties_hero_1782216213939.jpg"
            alt="Luxury estate asset grid backdrop"
            className="w-full h-full object-cover object-center scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#FAFAF8] opacity-80"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center sm:text-left">
          <span className="text-[10px] font-mono text-[#C4514F] uppercase tracking-[0.25em] font-bold">Premium Advisory</span>
          <h1 className="text-4xl sm:text-5xl font-light font-serif mt-2 text-[#1E1E1E]">
            Property <span className="italic font-bold text-[#C4514F]">Enquiry Desk</span>
          </h1>
          <p className="mt-4 max-w-xl text-xs sm:text-sm text-[#5B5B5B] font-sans uppercase tracking-wider leading-relaxed">
            Submit your coordinates or directly dial our advisory board to receive prompt, verified legal representations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Column 1: Company Contact Details, Interactive CTAs & Maps */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            
            <div className="space-y-6">
              <span className="text-[10px] font-mono text-[#C4514F] uppercase tracking-[0.2em] font-bold block">
                AGENCY ADVISORS
              </span>
              <h3 className="text-2xl font-light font-serif text-[#1E1E1E]">
                Contact <span className="italic font-bold text-[#C4514F]">Information</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#5B5B5B] leading-relaxed font-sans">
                Our consultancy verifies 100% of titles through our 30-year documentation validation checking. Reach out to secure authentic property bookings.
              </p>

              {/* Direct call & whatsapp quick tools row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <a
                  href={`tel:+91${BUSINESS_DETAILS.phone}`}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-[#C4514F] text-white hover:bg-[#B13E3B] transition-colors duration-300 font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all cursor-pointer shadow-md"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call: +91 {BUSINESS_DETAILS.phone}</span>
                </a>
                
                <a
                  href={getWhatsAppURL()}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-md"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>WhatsApp Enquiry</span>
                </a>
              </div>
            </div>

            {/* Address Bar */}
            <div className="p-6 bg-[#FFFFFF]/90 backdrop-blur-md border border-[#E7E1D9]">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#FAFAF8] text-[#C4514F] border border-[#E7E1D9] flex-shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-bold text-[#5B5B5B]/50 tracking-widest mb-2">Registered Office Address</h4>
                  <p className="text-sm text-[#1E1E1E] leading-relaxed font-sans">
                    <strong className="text-[#1E1E1E]">{BUSINESS_DETAILS.name}</strong>, {BUSINESS_DETAILS.address.shop},<br />
                    {BUSINESS_DETAILS.address.landmark}, {BUSINESS_DETAILS.address.area},<br />
                    {BUSINESS_DETAILS.address.city} - {BUSINESS_DETAILS.address.zip}
                  </p>
                  <p className="text-[10px] text-[#C4514F] mt-3 font-mono flex items-center gap-1.5 uppercase tracking-wider">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Hrs: 10:00 AM - 08:30 PM (Closed Thursdays)</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps Real embed of Nakshatra Primus coordinates */}
            <div className="bg-[#FFFFFF]/90 backdrop-blur-md border border-[#E7E1D9] overflow-hidden h-[260px] relative">
              <iframe
                title="Verified Properties office Naigaon Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3761.50392942485!2d72.8530467!3d19.3473523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7a9da842dc54b%3A0xe6bf44b126fb3ef7!2sNakshatra%20Primus!5e0!3m2!1sen!2sin!4v1719213824109!5m2!1sen!2sin"
                className="w-full h-full border-0 absolute inset-0 opacity-85"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
              ></iframe>
              
              <div className="absolute bottom-4 left-4 bg-[#FAFAF8] border border-[#E7E1D9] text-[#1E1E1E] text-[10px] font-mono uppercase tracking-widest px-3.5 py-2 flex items-center gap-2 shadow-lg">
                <MapPin className="h-3.5 w-3.5 text-rose-500" />
                <span>Naigaon East, Palghar</span>
                <a
                  href="https://maps.app.goo.gl/9P7vE9G1Bw1uKz1D7"
                  target="_blank"
                  rel="noreferrer"
                  className="p-1 hover:text-[#C4514F] transition-colors"
                >
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* RERA disclaimer */}
            <div className="p-4 bg-[#F5EFE7] border border-[#E7E1D9] text-[10px] text-[#5B5B5B] leading-relaxed font-mono">
              <span className="text-[#C4514F] font-bold">📢 RERA DISCLAIMER:</span> {BUSINESS_DETAILS.name} is a registered real estate broker under MahaRERA Reg No: <strong className="text-[#C4514F]">{BUSINESS_DETAILS.reraNo}</strong>. All listed assets and structural metrics are pre-screened to secure legal security.
            </div>

          </div>

          {/* Column 2: Elegant Glassmorphic Enquiry Form */}
          <div className="lg:col-span-6">
            <div className="bg-[#FFFFFF]/90 backdrop-blur-md border border-[#E7E1D9] p-6 sm:p-10 backdrop-blur-md flex flex-col justify-between h-full">
              
              {isSubmitted ? (
                <div className="py-16 text-center space-y-6">
                  <div className="h-16 w-16 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto rounded-full">
                    <BadgeCheck className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-light font-serif text-[#1E1E1E]">Enquiry Submitted!</h3>
                  <p className="text-xs sm:text-sm text-[#5B5B5B] leading-relaxed font-sans max-w-sm mx-auto">
                    Mansi Gaikwad has received your details and target requirements. We will contact you back with direct builder pricing within 4 hours.
                  </p>
                  
                  <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-2.5 bg-[#F5EFE7] border border-[#E7E1D9] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#F5EFE7] transition-colors cursor-pointer"
                    >
                      New Enquiry
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
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <span className="text-[#C4514F] text-[10px] font-mono tracking-widest uppercase block mb-1">
                      SECURE APPLICATION
                    </span>
                    <h3 className="text-2xl font-light font-serif text-[#1E1E1E]">
                      Enquire <span className="italic font-bold text-[#C4514F]">About Property</span>
                    </h3>
                  </div>

                  {validationError && (
                    <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[11px] font-mono uppercase tracking-wider">
                      ⚠️ {validationError}
                    </div>
                  )}

                  {/* Property Name Auto-selected */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-[#5B5B5B]/50 block tracking-widest">
                      Selected Property *
                    </label>
                    <select
                      value={selectedProperty}
                      onChange={(e) => setSelectedProperty(e.target.value)}
                      className="w-full px-4 py-3 bg-[#FAFAF8] text-xs text-[#1E1E1E] font-medium border border-[#E7E1D9] focus:border-[#C4514F] focus:outline-none cursor-pointer"
                    >
                      <option value="General Real-Estate Inquiry" className="bg-[#FFFFFF]/90 backdrop-blur-md">General Real-Estate Inquiry</option>
                      {PROPERTIES.map((p) => (
                        <option key={p.id} value={p.title} className="bg-[#FFFFFF]/90 backdrop-blur-md">
                          {p.title}
                        </option>
                      ))}
                      <option value="Investment Plots Portfolio" className="bg-[#FFFFFF]/90 backdrop-blur-md">Investment Plots Portfolio</option>
                      <option value="Legal Document Checker" className="bg-[#FFFFFF]/90 backdrop-blur-md">Legal Document Checking & Advisory</option>
                    </select>
                  </div>

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

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-[#5B5B5B]/50 block tracking-widest">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. sameer@gmail.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-[#FAFAF8] text-sm text-[#1E1E1E] border border-[#E7E1D9] focus:border-[#C4514F] focus:outline-none placeholder-white/20"
                    />
                  </div>

                  {/* City */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-[#5B5B5B]/50 block tracking-widest">
                      Your City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mumbai"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-3 bg-[#FAFAF8] text-sm text-[#1E1E1E] border border-[#E7E1D9] focus:border-[#C4514F] focus:outline-none placeholder-white/20"
                    />
                  </div>

                  {/* Budget Dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-[#5B5B5B]/50 block tracking-widest">
                      Purchase Budget Range *
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-4 py-3 bg-[#FAFAF8] text-xs text-[#1E1E1E] font-medium border border-[#E7E1D9] focus:border-[#C4514F] focus:outline-none cursor-pointer"
                    >
                      <option value="Under ₹30 Lakhs" className="bg-[#FFFFFF]/90 backdrop-blur-md">Under ₹30 Lakhs</option>
                      <option value="₹30 - ₹40 Lakhs" className="bg-[#FFFFFF]/90 backdrop-blur-md">₹30 - ₹40 Lakhs</option>
                      <option value="₹40 - ₹50 Lakhs" className="bg-[#FFFFFF]/90 backdrop-blur-md">₹40 - ₹50 Lakhs</option>
                      <option value="₹50 - ₹60 Lakhs" className="bg-[#FFFFFF]/90 backdrop-blur-md">₹50 - ₹60 Lakhs</option>
                      <option value="₹60 - ₹80 Lakhs" className="bg-[#FFFFFF]/90 backdrop-blur-md">₹60 - ₹80 Lakhs</option>
                      <option value="₹80 Lakhs - ₹1 Crore" className="bg-[#FFFFFF]/90 backdrop-blur-md">₹80 Lakhs - ₹1 Crore</option>
                      <option value="Above ₹1 Crore" className="bg-[#FFFFFF]/90 backdrop-blur-md">Above ₹1 Crore</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-[#5B5B5B]/50 block tracking-widest">
                      Your Message
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Specify configurations, required floor, preferred payment structures..."
                      value={clientMessage}
                      onChange={(e) => setClientMessage(e.target.value)}
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
                      <span className="animate-pulse">PROCESSING ENQUIRY...</span>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>SUBMIT ENQUIRY NOW</span>
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
