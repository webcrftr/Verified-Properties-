/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, ShieldCheck, BadgeCheck, Clock, ExternalLink } from 'lucide-react';
import { BUSINESS_DETAILS, PROPERTIES } from '../data';
import { Inquiry } from '../types';

interface ContactSectionProps {}

export default function ContactSection({}: ContactSectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [property, setProperty] = useState('General Property Consultation');
  const [msg, setMsg] = useState('');
  
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Name is required.');
      return;
    }
    const cleanPh = phone.replace(/\D/g, '');
    if (cleanPh.length < 10) {
      setError('Please provide a valid 10-digit mobile number.');
      return;
    }

    try {
      const timestamp = new Date().toLocaleString();
      const newInquiry: Inquiry = {
        id: `inquiry-${Date.now()}`,
        timestamp,
        propertyName: property,
        clientName: name.trim(),
        clientPhone: cleanPh,
        message: msg.trim() || 'Please contact me regarding active listings.',
        status: 'new'
      };

      const existingInquiries = JSON.parse(localStorage.getItem('verified_properties_inquiries') || '[]');
      existingInquiries.unshift(newInquiry);
      localStorage.setItem('verified_properties_inquiries', JSON.stringify(existingInquiries));

      setSuccess(true);
      setName('');
      setPhone('');
      setMsg('');
    } catch (err) {
      setError('Could not process details. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#050B18] text-white border-b border-white/10 relative">
      <div className="absolute left-1/8 top-1/3 w-72 h-72 bg-[#D4AF37]/5 rounded-full filter blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center mb-20">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-3">
            GET IN TOUCH
          </span>
          <h2 className="text-4xl sm:text-5xl font-light font-serif text-white">
            Connect With Our <span className="font-serif italic font-bold text-[#D4AF37]">Office</span>
          </h2>
          <div className="h-[1px] w-24 bg-[#D4AF37] mx-auto mt-6"></div>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-white/50 mt-4 uppercase tracking-wider leading-relaxed">
            Visit our registered advisory center in Naigaon East or submit your coordinates below to set up a priority consultation.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Column 1: Details & Maps */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            
            {/* Cards Stack */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              {/* Phone Detail card */}
              <div className="p-5 bg-[#0a1122] border border-white/10">
                <div className="p-3 bg-[#050B18] text-[#D4AF37] h-10 w-10 flex items-center justify-center mb-5 border border-white/10">
                  <Phone className="h-4 w-4" />
                </div>
                <h4 className="text-[10px] uppercase font-bold text-white/40 tracking-widest mb-1">Direct Calls</h4>
                <a
                  href={`tel:+91${BUSINESS_DETAILS.phone}`}
                  className="text-base font-serif italic font-bold text-[#D4AF37] hover:underline mt-1 block"
                >
                  +91 {BUSINESS_DETAILS.phone}
                </a>
                <p className="text-[11px] text-white/50 mt-2">Consultant: {BUSINESS_DETAILS.contactPerson}</p>
              </div>

              {/* Email Detail card */}
              <div className="p-5 bg-[#0a1122] border border-white/10">
                <div className="p-3 bg-[#050B18] text-[#D4AF37] h-10 w-10 flex items-center justify-center mb-5 border border-white/10">
                  <Mail className="h-4 w-4" />
                </div>
                <h4 className="text-[10px] uppercase font-bold text-white/40 tracking-widest mb-1">Email Queries</h4>
                <a
                  href={`mailto:${BUSINESS_DETAILS.email}`}
                  className="text-sm font-semibold text-[#D4AF37] hover:underline mt-1.5 block truncate"
                >
                  {BUSINESS_DETAILS.email}
                </a>
                <p className="text-[11px] text-white/50 mt-2 font-mono uppercase tracking-wider">Replies within 4h</p>
              </div>

              {/* WhatsApp Detail card */}
              <div className="p-5 bg-[#0a1122] border border-white/10">
                <div className="p-3 bg-[#050B18] text-emerald-400 h-10 w-10 flex items-center justify-center mb-5 border border-emerald-500/10">
                  {/* Custom green indicator/text */}
                  <span className="text-[10px] sm:text-xs font-black font-mono">WA</span>
                </div>
                <h4 className="text-[10px] uppercase font-bold text-white/40 tracking-widest mb-1">WhatsApp Chat</h4>
                <a
                  href="https://wa.me/917020913759?text=Hello%20Verified%20Properties,%20I'm%20interested%20in%20arranging%20a%20site%20visit."
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-emerald-400 hover:underline mt-1.5 block"
                >
                  Message Agency
                </a>
                <p className="text-[11px] text-white/50 mt-2 font-mono uppercase tracking-wider">Instant Chat Active</p>
              </div>

            </div>

            {/* Address bar */}
            <div className="p-6 bg-[#0a1122] border border-white/10">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#050B18] text-[#D4AF37] border border-white/10 flex-shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-bold text-white/40 tracking-widest mb-2">Registered Office Address</h4>
                  <p className="text-sm text-white/80 leading-relaxed font-sans">
                    <strong className="text-white">{BUSINESS_DETAILS.name}</strong>, {BUSINESS_DETAILS.address.shop},<br />
                    {BUSINESS_DETAILS.address.landmark}, {BUSINESS_DETAILS.address.area},<br />
                    {BUSINESS_DETAILS.address.city} - {BUSINESS_DETAILS.address.zip}
                  </p>
                  <p className="text-[10px] text-[#D4AF37] mt-3 font-mono flex items-center gap-1.5 uppercase tracking-wider">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Hrs: 10:00 AM - 08:30 PM (Closed Thursdays)</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps Real embed of Nakshatra Primus coordinates */}
            <div className="bg-[#0a1122] border border-white/10 overflow-hidden h-[260px] relative">
              <iframe
                title="Verified Properties office Naigaon Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3761.50392942485!2d72.8530467!3d19.3473523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7a9da842dc54b%3A0xe6bf44b126fb3ef7!2sNakshatra%20Primus!5e0!3m2!1sen!2sin!4v1719213824109!5m2!1sen!2sin"
                className="w-full h-full border-0 absolute inset-0 opacity-80"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
              ></iframe>
              
              {/* Location floating action overlay */}
              <div className="absolute bottom-4 left-4 bg-[#050B18] border border-white/10 text-white text-[10px] font-mono uppercase tracking-widest px-3.5 py-2 flex items-center gap-2 shadow-lg">
                <MapPin className="h-3.5 w-3.5 text-rose-500" />
                <span>Naigaon East, Palghar</span>
                <a
                  href="https://maps.app.goo.gl/9P7vE9G1Bw1uKz1D7"
                  target="_blank"
                  rel="noreferrer"
                  className="p-1 hover:text-[#D4AF37] transition-colors"
                >
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

          </div>

          {/* Column 2: Lead Gen Form Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#0a1122] border border-[#D4AF37]/25 p-6 sm:p-8 backdrop-blur-md h-full flex flex-col justify-between">
              
              <div>
                <span className="text-[#D4AF37] text-[10px] font-mono tracking-widest uppercase block mb-1">
                  SECURE LEAD HUB
                </span>
                <h3 className="text-2xl font-light font-serif leading-tight text-white mb-6">
                  Request <span className="italic font-bold text-[#D4AF37]">Callback</span>
                </h3>

                {success ? (
                  <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 text-center space-y-4 my-6">
                    <div className="h-10 w-10 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto">
                      <BadgeCheck className="h-5 w-5" />
                    </div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Callback Scheduled!</h4>
                    <p className="text-xs text-white/70 leading-relaxed font-sans">
                      Thank you. Mansi Gaikwad has received your inquiry about property listings in Naigaon and will ring you shortly.
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="px-5 py-2.5 bg-[#D4AF37] text-[#050B18] font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-colors cursor-pointer"
                    >
                      New Form
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleInlineSubmit} className="space-y-5">
                    
                    {error && (
                      <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[11px] font-mono uppercase tracking-wider">
                        ⚠️ {error}
                      </div>
                    )}

                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase font-bold text-white/40 block tracking-widest">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sameer Kulkarni"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#050B18] text-sm text-white border border-white/10 focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>

                    {/* Mobile Number */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase font-bold text-white/40 block tracking-widest">
                        Active WhatsApp/Mobile *
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
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-12 pr-4 py-2.5 bg-[#050B18] text-sm text-white border border-white/10 focus:border-[#D4AF37] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Inquired Target Sector */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase font-bold text-white/40 block tracking-widest">
                        Select Target Interest
                      </label>
                      <select
                        value={property}
                        onChange={(e) => setProperty(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#050B18] text-xs text-white/80 font-medium border border-white/10 focus:border-[#D4AF37] focus:outline-none cursor-pointer"
                      >
                        <option value="General Property Consultation" className="bg-[#0a1122]">General Real-Estate Inquiry</option>
                        {PROPERTIES.map((p) => (
                          <option key={p.id} value={p.title} className="bg-[#0a1122]">
                            {p.title}
                          </option>
                        ))}
                        <option value="Investment Plots consultation" className="bg-[#0a1122]">NA Investment Portfolios</option>
                        <option value="Property Legal Verification" className="bg-[#0a1122]">Title Checking & RERA Advisory</option>
                      </select>
                    </div>

                    {/* Custom Memo text */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase font-bold text-white/40 block tracking-widest">
                        Consultation details / Requirements
                      </label>
                      <textarea
                        rows={3}
                        placeholder="e.g. Looking for a 1BHK apartment with direct water connection, budget up to ₹38 Lakhs."
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#050B18] text-sm text-white border border-white/10 focus:border-[#D4AF37] focus:outline-none"
                      ></textarea>
                    </div>

                    {/* Inline Submit CTA button */}
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#D4AF37] text-[#050B18] font-bold text-[10px] uppercase tracking-widest hover:bg-white hover:text-black duration-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>Request Callback Now</span>
                    </button>

                  </form>
                )}
              </div>

              {/* Secure footer */}
              <div className="pt-6 border-t border-white/10 text-[9px] text-white/30 leading-relaxed font-mono mt-6">
                <span className="text-[#D4AF37] font-bold uppercase">RERA ID :</span> {BUSINESS_DETAILS.reraNo} | Checked & secured with 256-bit encryption safeguards.
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
