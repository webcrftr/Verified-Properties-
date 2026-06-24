/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Home, ClipboardCheck, TrendingUp, KeyRound, Building2, Map } from 'lucide-react';

export default function ServicesSection() {
  const services = [
    {
      icon: <Home className="h-6 w-6 text-[#D4AF37]" />,
      title: 'Residential Property Buying',
      details: 'Comprehensive matching of customized budget constraints with legitimate 1BHK, 2BHK, & 3BHK flats near Naigaon/Vasai/Virar railway lines. Includes direct bank loan sanction coordination.'
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-[#D4AF37]" />,
      title: 'Fast Selling & Brokerage',
      details: 'Professional marketing strategies to expose your residential apartment or commercial asset to high-intent local buyers, optimizing sales valuations with minimal listing friction.'
    },
    {
      icon: <KeyRound className="h-6 w-6 text-[#D4AF37]" />,
      title: 'Premium Rental & Leasing',
      details: 'Vetted rental coordination for shops, corporate offices, and families. We manage the official structural police verification, rent agreements, and escrow security deposit arrangements.'
    },
    {
      icon: <ClipboardCheck className="h-6 w-6 text-[#D4AF37]" />,
      title: 'Structural Property Verification',
      details: 'Critical evaluation of titles, 7/12 extracts, structural approvals, builder histories, mutation logs, and RERA authenticity. Protect your hard-earned wealth from construction traps.'
    },
    {
      icon: <Map className="h-6 w-6 text-[#D4AF37]" />,
      title: 'Investment Land & Plots',
      details: 'Curating safe Non-Agricultural (NA) plots with massive upside potential within Palghar’s industrial corridors. We manage boundaries, zoning reports, and layout legalities.'
    },
    {
      icon: <Building2 className="h-6 w-6 text-[#D4AF37]" />,
      title: 'Corporate Leasing & Office Layouts',
      details: 'Sourcing double-height showrooms, corner retail spaces, and fully air-conditioned office workspaces matching specific employee counts and logistics links in Global Arena.'
    }
  ];

  return (
    <section id="services" className="py-24 bg-[#050B18] text-white border-b border-white/10 relative overflow-hidden">
      
      {/* Absolute subtle ambient light */}
      <div className="absolute right-1/4 top-1/4 w-80 h-80 bg-[#D4AF37]/5 rounded-full filter blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-3">
            SERVICES & EXPERTISE
          </span>
          <h2 className="text-4xl sm:text-5xl font-light font-serif text-white">
            Our Consultant <span className="font-serif italic font-bold text-[#D4AF37]">Offerings</span>
          </h2>
          <div className="h-[1px] w-24 bg-[#D4AF37] mx-auto mt-6"></div>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-white/50 mt-5 uppercase tracking-wider leading-relaxed">
            Providing tailored real estate brokerage and advisory modules crafted to optimize financial outcomes with 100% transparency.
          </p>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc, i) => (
            <div
              key={i}
              className="p-8 bg-[#0a1122] border border-white/10 hover:border-[#D4AF37]/35 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Icon Container with thin brass framing */}
                <div className="bg-[#050B18] border border-white/10 p-3.5 inline-flex mb-6 group-hover:border-[#D4AF37]/45 transition-all">
                  {svc.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-light font-serif text-white mb-4 group-hover:text-[#D4AF37] transition-colors">
                  {svc.title}
                </h3>
                
                {/* Description */}
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-8 font-sans">
                  {svc.details}
                </p>
              </div>

              {/* Minimal visual feedback link */}
              <div className="flex items-center gap-2 text-[10px] font-mono text-[#D4AF37] tracking-[0.15em] uppercase font-bold">
                <span>TAILORED CONSULTATION</span>
                <span className="w-1.5 h-1.5 bg-[#D4AF37]"></span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
