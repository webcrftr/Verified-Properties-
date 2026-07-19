/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, CheckCircle2, TrendingUp, Target, Eye, HelpingHand } from 'lucide-react';
import { BUSINESS_DETAILS } from '../data';

interface AboutUsProps {
  onNavigate: (path: string) => void;
}

export default function AboutUs({ onNavigate }: AboutUsProps) {
  return (
    <div className="py-16 sm:py-24 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-16 sm:mb-24 animate-fade-in">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C4514F] font-semibold block mb-3">
            LEGALITY & INTEGRITY FIRST
          </span>
          <h1 className="text-4xl sm:text-5xl font-light font-serif text-[#1E1E1E] tracking-tight">
            About <span className="font-serif italic font-bold text-[#C4514F]">Verified Properties</span>
          </h1>
          <p className="text-[#5B5B5B] text-sm max-w-xl mx-auto mt-4 font-sans uppercase tracking-widest leading-relaxed">
            Registered Real Estate Advisory Office in Naigaon standard Arena Belt
          </p>
          <div className="h-[1px] w-24 bg-[#C4514F] mx-auto mt-6"></div>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-24">
          
          {/* Visual Profile card */}
          <div className="lg:col-span-5 relative flex flex-col justify-between">
            <div className="absolute inset-0 bg-[#C4514F]/5 pointer-events-none"></div>
            
            <div className="relative bg-[#FFFFFF]/85 backdrop-blur-md border border-[#E7E1D9] p-8 sm:p-10 backdrop-blur-md h-full flex flex-col justify-between shadow-xl">
              <div>
                <span className="text-[#C4514F] text-[10px] font-mono tracking-widest uppercase block mb-3">
                  ESTABLISHED CONTROLLER
                </span>
                <h3 className="text-3xl font-light font-serif text-[#1E1E1E] mb-6">
                  Mansi <span className="italic font-bold text-[#C4514F]">Gaikwad</span>
                </h3>
                <p className="text-[#5B5B5B] text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                  "At Verified Properties, we believe that real estate transactions are not just business trades—they are emotional and financial milestones. Our sole purpose is to make property evaluation, acquisition, and rentals stress-free and legally bulletproof."
                </p>
              </div>

              {/* RERA License badge overlay */}
              <div className="border-t border-[#E7E1D9] pt-6 mt-6 flex items-center gap-4">
                <div className="bg-[#C4514F]/10 p-3 text-[#C4514F] border border-[#C4514F]/30">
                  <Shield className="h-5 w-5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1E1E1E] uppercase tracking-wider">Licensed Agent No</h4>
                  <p className="text-[11px] font-mono text-[#C4514F]">{BUSINESS_DETAILS.reraNo}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Story Details */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <h2 className="text-2xl sm:text-3xl font-light font-serif text-[#1E1E1E] leading-tight">
              An Advisory Formed on <span className="font-serif italic font-semibold text-[#C4514F]">Real Valuations & Safety</span>
            </h2>
            
            <p className="text-[#5B5B5B] text-sm sm:text-base leading-relaxed">
              Verified Properties stands as Naigaon East's premier real estate consultant. We pre-vet, check, and filter properties to ensure absolute zero-litigation risks, clean historical titles, and authenticated valuations. Under the precise leadership of <strong>Mansi Gaikwad</strong>, we represent listings that empower home buyers, commercial retail entrepreneurs, and long-term land investors.
            </p>

            <p className="text-[#5B5B5B] text-sm sm:text-base leading-relaxed">
              Whether you are looking to purchase a scenic 1BHK or 2BHK garden apartment near Naigaon Transit node, rent a commercial retail shop, or acquire high-appreciating residential Non-Agricultural (NA) land layouts near Vasai, Virar, and Palghar, Verified Properties delivers accurate intelligence without builder markups or artificial pressure.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {[
                '100% Verified Legal Titles',
                'Pre-Vetted Standard Contracts',
                'MahaRERA Registered Projects',
                'Bank Loan Assistance Services',
                'Zero-brokerage on direct listings',
                'Transparent local boundary research'
              ].map((bullet, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-[#C4514F] flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-[#1E1E1E]/90 font-medium uppercase tracking-wide">{bullet}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Mission & Vision Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          
          {/* Mission Card */}
          <div className="p-8 sm:p-10 bg-[#FFFFFF]/80 backdrop-blur-md border border-[#E7E1D9] relative overflow-hidden group hover:border-[#C4514F]/25 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="p-3 bg-[#FAFAF8] text-[#C4514F] border border-[#E7E1D9] w-fit mb-6">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-wider text-[#1E1E1E] mb-4">Our Sacred Mission</h3>
              <p className="text-xs sm:text-sm text-[#5B5B5B] leading-relaxed font-sans mb-6">
                Curating, inspecting, and legally validating every real estate listing under standard MahaRERA parameters. We eliminate the information asymmetry in Palghar district real-estate markets, ensuring families can secure high-quality apartments and commercial suites with total financial safety.
              </p>
            </div>
            <div className="text-[10px] font-mono text-[#C4514F] tracking-widest uppercase">Safe Handover Priorities</div>
          </div>

          {/* Vision Card */}
          <div className="p-8 sm:p-10 bg-[#FFFFFF]/80 backdrop-blur-md border border-[#E7E1D9] relative overflow-hidden group hover:border-[#C4514F]/25 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="p-3 bg-[#FAFAF8] text-[#C4514F] border border-[#E7E1D9] w-fit mb-6">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-wider text-[#1E1E1E] mb-4">Our Forward Vision</h3>
              <p className="text-xs sm:text-sm text-[#5B5B5B] leading-relaxed font-sans mb-6">
                To establish the benchmark for real estate transparency across Naigaon East. We envision a property ecosystem where title search documents are clear, pricing is strictly public, and every land transaction is completed without litigation risk or third-party manipulation.
              </p>
            </div>
            <div className="text-[10px] font-mono text-[#C4514F] tracking-widest uppercase">Zero-Litigation Horizons</div>
          </div>

        </div>

        {/* Core Values / Why Customers Trust Us Info */}
        <div className="p-8 sm:p-12 bg-[#F5EFE7] border border-[#E7E1D9]/50 text-center max-w-4xl mx-auto space-y-6">
          <div className="p-3 bg-[#FAFAF8] border border-[#E7E1D9] text-[#C4514F] w-fit mx-auto">
            <HelpingHand className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-light font-serif text-[#1E1E1E]">
            Driven by <span className="font-serif italic font-semibold text-[#C4514F]">Fiduciary Responsibility</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#5B5B5B] leading-relaxed max-w-2xl mx-auto font-sans">
            We are not high-volume listing aggregators. We represent a selected catalog of assets where legal titles have been validated up to 30 years back. Direct collaboration with us ensures stamp registrations, bank document filings, and keys are handed over cleanly.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('/enquiry')}
              className="px-6 py-3 bg-[#C4514F] text-white hover:bg-[#B13E3B] transition-colors duration-300 font-extrabold text-xs uppercase tracking-widest transition-colors cursor-pointer"
            >
              Consult with Mansi Gaikwad
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
