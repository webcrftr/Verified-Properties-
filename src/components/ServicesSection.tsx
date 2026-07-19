/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Home, ClipboardCheck, TrendingUp, KeyRound, Building2, Map } from 'lucide-react';

export default function ServicesSection() {
  const services = [
    {
      icon: <Home className="h-6 w-6 text-[#C4514F]" />,
      title: 'Residential Property Buying',
      details: 'Comprehensive matching of customized budget constraints with legitimate 1BHK, 2BHK, & 3BHK flats near Naigaon/Vasai/Virar railway lines. Includes direct bank loan sanction coordination.'
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-[#C4514F]" />,
      title: 'Fast Selling & Brokerage',
      details: 'Professional marketing strategies to expose your residential apartment or commercial asset to high-intent local buyers, optimizing sales valuations with minimal listing friction.'
    },
    {
      icon: <KeyRound className="h-6 w-6 text-[#C4514F]" />,
      title: 'Premium Rental & Leasing',
      details: 'Vetted rental coordination for shops, corporate offices, and families. We manage the official structural police verification, rent agreements, and escrow security deposit arrangements.'
    },
    {
      icon: <ClipboardCheck className="h-6 w-6 text-[#C4514F]" />,
      title: 'Structural Property Verification',
      details: 'Critical evaluation of titles, 7/12 extracts, structural approvals, builder histories, mutation logs, and RERA authenticity. Protect your hard-earned wealth from construction traps.'
    },
    {
      icon: <Map className="h-6 w-6 text-[#C4514F]" />,
      title: 'Investment Land & Plots',
      details: 'Curating safe Non-Agricultural (NA) plots with massive upside potential within Palghar’s industrial corridors. We manage boundaries, zoning reports, and layout legalities.'
    },
    {
      icon: <Building2 className="h-6 w-6 text-[#C4514F]" />,
      title: 'Corporate Leasing & Office Layouts',
      details: 'Sourcing double-height showrooms, corner retail spaces, and fully air-conditioned office workspaces matching specific employee counts and logistics links in Global Arena.'
    }
  ];

  return (
    <section id="services" className="py-24 bg-[#FAFAF8] text-[#1E1E1E] border-b border-[#E7E1D9] relative overflow-hidden">
      
      {/* Absolute subtle ambient light */}
      <div className="absolute right-1/4 top-1/4 w-80 h-80 bg-[#C4514F]/5 rounded-full filter blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C4514F] font-semibold block mb-3">
            SERVICES & EXPERTISE
          </span>
          <h2 className="text-4xl sm:text-5xl font-light font-serif text-[#1E1E1E]">
            Our Consultant <span className="font-serif italic font-bold text-[#C4514F]">Offerings</span>
          </h2>
          <div className="h-[1px] w-24 bg-[#C4514F] mx-auto mt-6"></div>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-[#5B5B5B] mt-5 uppercase tracking-wider leading-relaxed">
            Providing tailored real estate brokerage and advisory modules crafted to optimize financial outcomes with 100% transparency.
          </p>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc, i) => (
            <div
              key={i}
              className="p-8 bg-[#FFFFFF]/90 backdrop-blur-md border border-[#E7E1D9] hover:border-[#C4514F]/35 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Icon Container with thin brass framing */}
                <div className="bg-[#FAFAF8] border border-[#E7E1D9] p-3.5 inline-flex mb-6 group-hover:border-[#C4514F]/45 transition-all">
                  {svc.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-light font-serif text-[#1E1E1E] mb-4 group-hover:text-[#C4514F] transition-colors">
                  {svc.title}
                </h3>
                
                {/* Description */}
                <p className="text-[#5B5B5B] text-xs sm:text-sm leading-relaxed mb-8 font-sans">
                  {svc.details}
                </p>
              </div>

              {/* Minimal visual feedback link */}
              <div className="flex items-center gap-2 text-[10px] font-mono text-[#C4514F] tracking-[0.15em] uppercase font-bold">
                <span>TAILORED CONSULTATION</span>
                <span className="w-1.5 h-1.5 bg-[#C4514F]"></span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
