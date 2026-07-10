/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, Clock, Handshake, ShieldAlert, BadgePercent, MapPin, CheckCircle, PhoneCall } from 'lucide-react';
import { BUSINESS_DETAILS } from '../data';

interface WhyChooseUsProps {
  onNavigate: (path: string) => void;
}

export default function WhyChooseUs({ onNavigate }: WhyChooseUsProps) {
  const securitySteps = [
    {
      icon: <Shield className="h-6 w-6 text-[#F0D36B]" />,
      title: 'MahaRERA Registration Validation',
      desc: 'We verify the developer\'s legal credentials on the MahaRERA portal. We ensure the specific wing, carpet layouts, and final handover dates exactly match government records.'
    },
    {
      icon: <ShieldAlert className="h-6 w-6 text-[#F0D36B]" />,
      title: 'Litigation & Title Clearance Checks',
      desc: 'Our legal partners review land extraction documents (7/12 extracts), non-agricultural (NA) certificates, and historical ownership chains to prevent pending bank disputes and litigation risks.'
    },
    {
      icon: <Clock className="h-6 w-6 text-[#F0D36B]" />,
      title: 'Deep Local Authority Insights',
      desc: 'In-depth intelligence regarding Palghar, Naigaon, Vasai, and Virar municipal boundary infrastructure. We evaluate water pipeline status, transit networks, road development scopes, and green zones.'
    },
    {
      icon: <Handshake className="h-6 w-6 text-[#F0D36B]" />,
      title: 'End-to-End Deal Handholding',
      desc: 'We assist with every physical and digital legal milestone: negotiation with developers, stamp duty payment calculations, registry office filing, tax-saving guidance, and bank loan approvals.'
    },
    {
      icon: <BadgePercent className="h-6 w-6 text-[#F0D36B]" />,
      title: 'Transparent Pricing with Zero Hype',
      desc: 'We offer genuine builder pricing with zero artificial markups or hidden brokerage on direct developer listings. Rest assured your hard-earned wealth is guided transparently.'
    },
    {
      icon: <MapPin className="h-6 w-6 text-[#F0D36B]" />,
      title: 'Curated Direct Site Visits',
      desc: 'No random, high-volume properties. We shortlist standard, legally pre-approved configurations matching your budget, then provide premium, fully accompanied site visits.'
    }
  ];

  const stats = [
    { val: '100%', label: 'Zero litigation track record' },
    { val: '220+', label: 'Happy families settled' },
    { val: '15+', label: 'Years combined consulting experience' },
    { val: '100%', label: 'MahaRERA compliant listings' }
  ];

  return (
    <div className="py-16 sm:py-24 bg-[#111827]">
      
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 sm:mb-24">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#F0D36B] font-semibold block mb-3">
          TRUST & SECURITY BLUEPRINT
        </span>
        <h1 className="text-4xl sm:text-5xl font-light font-serif text-white tracking-tight">
          Why Choose <span className="font-serif italic font-bold text-[#F0D36B]">Verified Properties</span>?
        </h1>
        <p className="text-[#D1D5DB] text-sm max-w-2xl mx-auto mt-4 font-sans leading-relaxed">
          Investing in real estate is a major life milestone. We serve as your fiduciary advisor in Naigaon standard Arena corridor, guiding you safely past document loopholes and construction delays.
        </p>
        <div className="h-[1px] w-24 bg-[#E8C75A] mx-auto mt-6"></div>
      </div>

      {/* Trust Pillars Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {securitySteps.map((step, idx) => (
            <div 
              key={idx} 
              className="p-8 bg-[#1F2937]/85 backdrop-blur-md border border-[#374151] hover:border-[#D9B84C]/35 transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="border-b border-[#374151] pb-4 mb-6 flex items-center justify-between">
                  {step.icon}
                  <span className="text-[11px] font-mono text-[#F0D36B] font-semibold">0{idx + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4 leading-snug font-sans group-hover:text-[#F0D36B] transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed font-sans">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Highlight Ribbon */}
      <div className="bg-[#111827] border-y border-[#374151]/50 py-12 sm:py-16 mb-24 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, sIdx) => (
              <div key={sIdx} className="space-y-1">
                <p className="text-4xl sm:text-5xl font-mono text-[#F0D36B] font-bold">{stat.val}</p>
                <p className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#D1D5DB]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Guarantee Card */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
        <div className="p-8 sm:p-12 bg-gradient-to-br from-[#1F2937] to-[#111827] border border-[#D9B84C]/30 relative overflow-hidden text-center space-y-6">
          <div className="absolute -top-16 -right-16 h-32 w-32 bg-[#F0D36B]/5 rounded-full blur-2xl"></div>
          
          <span className="px-3.5 py-1.5 bg-[#F0D36B]/10 border border-[#D9B84C]/30 text-[#F0D36B] text-[9px] uppercase tracking-widest font-mono font-bold inline-block">
            MahaRERA Compliant Guarantee
          </span>
          
          <h2 className="text-2xl sm:text-3xl font-light font-serif text-white">
            Looking for a <span className="font-serif italic font-semibold text-[#F0D36B]">Zero-Litigation</span> Property?
          </h2>
          
          <p className="text-xs sm:text-sm text-[#D1D5DB] max-w-xl mx-auto leading-relaxed font-sans">
            Mansi Gaikwad can help verify documents, arrange direct site tours, and arrange legal stamp registrations. Zero pressure, pure professional guidance.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={() => onNavigate('/enquiry')}
              className="w-full sm:w-auto px-6 py-3 bg-[#E8C75A] text-white hover:bg-[#F5DD87] transition-colors duration-300 font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors shadow-lg cursor-pointer"
            >
              Request Free Consultation
            </button>
            <button
              onClick={() => onNavigate('/contact')}
              className="w-full sm:w-auto px-6 py-3 border border-[#374151] hover:border-[#D9B84C] text-white text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer bg-transparent"
            >
              Contact Agent
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
