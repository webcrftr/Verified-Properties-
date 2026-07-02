/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar, Clock, Send, ShieldCheck, HeartHandshake, PhoneCall } from 'lucide-react';
import { PROPERTIES } from '../data';
import { Inquiry, SiteVisit } from '../types';
import { motion } from 'motion/react';

interface EnquiryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledProperty?: string;
}

export default function EnquiryFormModal({ isOpen, onClose, prefilledProperty }: EnquiryFormModalProps) {
  // Toggle between 'enquiry' and 'site_visit'
  const [formType, setFormType] = useState<'enquiry' | 'visit'>(() => {
    if (prefilledProperty && prefilledProperty.startsWith('Site Visit:')) {
      return 'visit';
    }
    return 'enquiry';
  });
  
  // Form fields
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(() => {
    if (prefilledProperty) {
      if (prefilledProperty.startsWith('Site Visit:')) {
        const title = prefilledProperty.replace('Site Visit: ', '');
        const matched = PROPERTIES.find((p) => p.title.toLowerCase() === title.toLowerCase());
        return matched ? matched.title : title;
      }
      const matched = PROPERTIES.find((p) => 
        prefilledProperty.toLowerCase() === p.title.toLowerCase() || 
        prefilledProperty.toLowerCase().includes(p.title.toLowerCase())
      );
      return matched ? matched.title : prefilledProperty;
    }
    return PROPERTIES[0]?.title || '';
  });
  const [clientMessage, setClientMessage] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('');

  // Submission state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Sync prefilled property dynamically
  useEffect(() => {
    if (prefilledProperty) {
      if (prefilledProperty.startsWith('Site Visit:')) {
        setFormType('visit');
        const title = prefilledProperty.replace('Site Visit: ', '');
        const matched = PROPERTIES.find((p) => p.title.toLowerCase() === title.toLowerCase());
        if (matched) {
          setSelectedProperty(matched.title);
        } else {
          setSelectedProperty(title);
        }
      } else {
        const matched = PROPERTIES.find((p) => 
          prefilledProperty.toLowerCase() === p.title.toLowerCase() || 
          prefilledProperty.toLowerCase().includes(p.title.toLowerCase())
        );
        if (matched) {
          setSelectedProperty(matched.title);
        } else {
          setSelectedProperty(prefilledProperty);
        }
      }
    }
  }, [prefilledProperty]);

  const modalRef = useRef<HTMLDivElement>(null);

  // Disable body scroll when open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    // Phone inspection (India 10 digits check)
    if (!clientName.trim()) {
      setValidationError('Please enter your full name.');
      return;
    }
    const phoneClean = clientPhone.replace(/\D/g, '');
    if (phoneClean.length < 10) {
      setValidationError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (formType === 'visit') {
      if (!visitDate) {
        setValidationError('Please select a preferred date for the site visit.');
        return;
      }
      if (!visitTime) {
        setValidationError('Please select a convenient time slot.');
        return;
      }
    }

    try {
      // Save to localStorage so admin/Mansi Gaikwad can retrieve them dynamically
      const timestamp = new Date().toLocaleString();
      
      if (formType === 'enquiry') {
        const newInquiry: Inquiry = {
          id: `inquiry-${Date.now()}`,
          timestamp,
          propertyName: selectedProperty,
          clientName: clientName.trim(),
          clientPhone: phoneClean,
          clientEmail: clientEmail.trim() || undefined,
          message: clientMessage.trim() || 'Interested in property details.',
          status: 'new'
        };

        const existingInquiries = JSON.parse(localStorage.getItem('verified_properties_inquiries') || '[]');
        existingInquiries.unshift(newInquiry);
        localStorage.setItem('verified_properties_inquiries', JSON.stringify(existingInquiries));

      } else {
        const newVisit: SiteVisit = {
          id: `visit-${Date.now()}`,
          timestamp,
          propertyName: selectedProperty,
          propertyId: PROPERTIES.find(p => p.title === selectedProperty)?.id || 'unknown',
          clientName: clientName.trim(),
          clientPhone: phoneClean,
          visitDate,
          visitTime,
          status: 'pending'
        };

        const existingVisits = JSON.parse(localStorage.getItem('verified_properties_site_visits') || '[]');
        existingVisits.unshift(newVisit);
        localStorage.setItem('verified_properties_site_visits', JSON.stringify(existingVisits));
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error('Error saving inquiry:', err);
      setValidationError('Something went wrong. Please try again.');
    }
  };

  // WhatsApp redirection url builders
  const getWhatsAppURL = () => {
    const textBase = formType === 'enquiry'
      ? `Hi Mansi Gaikwad, I'm interested in inquiring about property: *${selectedProperty}*. My Name: ${clientName}, Phone: ${clientPhone}. Message: ${clientMessage || 'Please share brochure and pricing.'}`
      : `Hi Mansi Gaikwad, I'd like to book a Site Visit for: *${selectedProperty}*. Name: ${clientName}, Mobile: ${clientPhone}. Date: ${visitDate}, Time: ${visitTime}. Please confirm booking.`;
    return `https://wa.me/917020913759?text=${encodeURIComponent(textBase)}`;
  };

  const handleCloseSuccess = () => {
    setIsSubmitted(false);
    setClientName('');
    setClientPhone('');
    setClientEmail('');
    setClientMessage('');
    setVisitDate('');
    setVisitTime('');
    onClose();
  };

  return (
    <div 
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-4 text-white"
    >
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-[#0B1320] w-[95%] sm:w-[90%] md:w-full md:max-w-3xl overflow-hidden shadow-[0_20px_50px_rgba(212,175,55,0.15)] relative border border-[#D4AF37]/35 rounded-[20px] select-text"
      >
        
        {/* Header background accents */}
        <div className="bg-[#050B18] p-6 sm:p-8 text-center relative border-b border-white/10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/5 border border-white/10 text-white hover:bg-[#D4AF37] hover:text-[#050B18] transition-all cursor-pointer rounded-full flex items-center justify-center hover:scale-105"
            aria-label="Close form"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-3 select-none">
            ⭐ Exclusive Property Assistance
          </div>
          <h3 className="text-2xl sm:text-3xl font-light font-serif text-white mt-1">
            Lead <span className="font-serif italic font-semibold text-[#D4AF37]">Submission Desk</span>
          </h3>
          <p className="text-xs sm:text-sm text-white/70 mt-2.5 max-w-xl mx-auto leading-relaxed">
            Get expert assistance for your dream property. Submit your enquiry and our consultant will contact you shortly.
          </p>
          <p className="text-[10px] text-white/40 uppercase tracking-widest mt-2 select-none">Directly received by Consultant Mansi Gaikwad</p>
        </div>

        {/* Dynamic Success view state */}
        {isSubmitted ? (
          <div className="p-8 text-center space-y-6">
            <div className="h-12 w-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 stroke-[2.5]" />
            </div>
            
            <div className="space-y-2">
              <h4 className="text-lg font-bold font-serif text-white uppercase tracking-wider">Form Received!</h4>
              <p className="text-xs text-white/60 max-w-sm mx-auto leading-relaxed font-sans">
                Thank you, <span className="font-bold text-[#D4AF37]">{clientName}</span>. Your request has been stored on our local server and Mansi Gaikwad will contact you shortly.
              </p>
            </div>

            {/* High Conversion WhatsApp Redirect Button */}
            <div className="p-5 bg-emerald-500/5 border border-emerald-500/20 flex flex-col items-center gap-3">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                ⭐ Get Instant Updates on WhatsApp
              </span>
              <p className="text-xs text-white/60 leading-snug font-sans">
                Click below to instantly ping Mansi on WhatsApp. It auto-fills your property selections!
              </p>
              <a
                href={getWhatsAppURL()}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase text-xs tracking-widest text-center shadow-md flex items-center justify-center gap-2"
              >
                <span>Activate WhatsApp Chat</span>
              </a>
            </div>

            <button
              onClick={handleCloseSuccess}
              className="w-full py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-widest cursor-pointer"
            >
              Close Window
            </button>
          </div>
        ) : (
          /* Main Interactive Form fields */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            
            {/* Form Type tabs */}
            <div className="grid grid-cols-2 gap-1 bg-white/5 p-1 border border-white/10">
              <button
                type="button"
                onClick={() => setFormType('enquiry')}
                className={`py-2 text-[10px] uppercase tracking-wider font-bold transition-all cursor-pointer ${
                  formType === 'enquiry'
                    ? 'bg-[#D4AF37] text-[#050B18] shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Send Enquiry
              </button>
              <button
                type="button"
                onClick={() => setFormType('visit')}
                className={`py-2 text-[10px] uppercase tracking-wider font-bold transition-all cursor-pointer ${
                  formType === 'visit'
                    ? 'bg-[#D4AF37] text-[#050B18] shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Schedule Visit
              </button>
            </div>

            {/* Validation Display error message */}
            {validationError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/25 text-rose-300 text-[11px] font-mono uppercase tracking-wider">
                ⚠️ {validationError}
              </div>
            )}

            {/* Form Fields Stack */}
            <div className="space-y-4 max-h-[45vh] overflow-y-auto px-1">
              
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-bold text-white/40 block tracking-widest">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anand Satam"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#050B18] text-sm text-white border border-white/10 focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              {/* Mobile Phone Number (Must be Indian standard) */}
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-bold text-white/40 block tracking-widest">
                  Active Mobile Number *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#D4AF37] text-xs font-mono">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="7020913759"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full pl-12 pr-4 py-2.5 bg-[#050B18] text-sm text-white border border-white/10 focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              {/* Property Selector */}
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-bold text-white/40 block tracking-widest">
                  Select Target Property *
                </label>
                <select
                  value={selectedProperty}
                  onChange={(e) => setSelectedProperty(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#050B18] text-xs text-white/80 font-medium border border-white/10 focus:border-[#D4AF37] focus:outline-none cursor-pointer"
                >
                  {PROPERTIES.map((p) => (
                    <option key={p.id} value={p.title} className="bg-[#0a1122]">
                      {p.title} ({p.location.split(',')[0]})
                    </option>
                  ))}
                  <option value="General Property Consultation" className="bg-[#0a1122]">General Property Consultation</option>
                </select>
              </div>

              {/* Dynamic Visit Controls */}
              {formType === 'visit' ? (
                <div className="grid grid-cols-2 gap-3 transition-all">
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase font-bold text-white/40 block tracking-widest">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#050B18] text-xs text-white border border-white/10 focus:border-[#D4AF37] focus:outline-none cursor-pointer"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase font-bold text-white/40 block tracking-widest">
                      Convenient Slot *
                    </label>
                    <select
                      value={visitTime}
                      required
                      onChange={(e) => setVisitTime(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#050B18] text-xs text-white border border-white/10 focus:border-[#D4AF37] focus:outline-none cursor-pointer"
                    >
                      <option value="" className="bg-[#0a1122]">Select Time</option>
                      <option value="10:00 AM - 12:00 PM" className="bg-[#0a1122]">Morning (10am - 12pm)</option>
                      <option value="12:00 PM - 03:00 PM" className="bg-[#0a1122]">Midday (12pm - 3pm)</option>
                      <option value="03:00 PM - 06:00 PM" className="bg-[#0a1122]">Evening (3pm - 6pm)</option>
                      <option value="06:00 PM - 08:30 PM" className="bg-[#0a1122]">Late Evening (6pm - 8:30pm)</option>
                    </select>
                  </div>
                </div>
              ) : (
                /* Enquiry email & custom memo */
                <>
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase font-bold text-white/40 block tracking-widest">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. investor@gmail.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#050B18] text-sm text-white border border-white/10 focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase font-bold text-white/40 block tracking-widest">
                      Your Message / Specific Question
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. What is the down payment amount? Are stamp duty registration charges included?"
                      value={clientMessage}
                      onChange={(e) => setClientMessage(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#050B18] text-sm text-white border border-white/10 focus:border-[#D4AF37] focus:outline-none"
                    ></textarea>
                  </div>
                </>
                )}

            </div>

            {/* CTA text highlight */}
            <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-4 py-3 text-center text-[11px] sm:text-xs font-bold text-[#D4AF37] uppercase tracking-widest rounded-lg select-none">
              🔥 Get the Best Deal Before Prices Increase!
            </div>

            {/* Gavel secure disclosures */}
            <div className="flex gap-2.5 text-[9px] text-white/40 font-mono leading-relaxed bg-white/5 p-3 border border-white/5">
              <ShieldCheck className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              <span>We never share details. Verified Properties adheres to RERA guidelines. Submission securely encrypts state files on local cloud targets.</span>
            </div>

            {/* Bottom Actions button */}
            <button
              type="submit"
              className="w-full py-4 bg-[#D4AF37] hover:bg-white hover:text-black text-[#050B18] text-xs font-bold uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Submit Secure Enquiry</span>
            </button>

          </form>
        )}

      </motion.div>
    </div>
  );
}
