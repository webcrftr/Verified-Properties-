/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import PropertiesGrid from './components/PropertiesGrid';
import ServicesSection from './components/ServicesSection';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import EnquiryPage from './components/EnquiryPage';
import BookSiteVisitPage from './components/BookSiteVisitPage';
import WhyChooseUs from './components/WhyChooseUs';
import FloatingActions from './components/FloatingActions';
import { BUSINESS_DETAILS } from './data';
import { ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Search filter state for bridging Hero search and Properties grid
  const [heroSearchFilters, setHeroSearchFilters] = useState<{
    location: string;
    category: string;
    budgetIndex: number;
    trigger: number;
  } | null>(null);

  // Custom client-side router matching pathnames
  const [currentPath, setCurrentPath] = useState(() => {
    let path = window.location.pathname;
    if (path.includes('?')) {
      path = path.split('?')[0];
    }
    if (path.endsWith('.html')) {
      path = path.slice(0, -5);
    }
    if (path === '/index' || path === '') {
      path = '/';
    }
    return path;
  });

  useEffect(() => {
    const handlePopState = () => {
      let path = window.location.pathname;
      if (path.includes('?')) {
        path = path.split('?')[0];
      }
      if (path.endsWith('.html')) {
        path = path.slice(0, -5);
      }
      if (path === '/index' || path === '') {
        path = '/';
      }
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    let normalizedPath = path;
    if (normalizedPath.includes('?')) {
      normalizedPath = normalizedPath.split('?')[0];
    }
    if (normalizedPath.endsWith('.html')) {
      normalizedPath = normalizedPath.slice(0, -5);
    }
    if (normalizedPath === '/index' || normalizedPath === '') {
      normalizedPath = '/';
    }
    
    window.history.pushState({}, '', path);
    setCurrentPath(normalizedPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dynamic SEO Injection for Local SEO Schema markup + customized Titles/Meta description per page
  useEffect(() => {
    // 1. Setup Local Business JSON-LD Schema
    const reraSchema = {
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      'name': BUSINESS_DETAILS.name,
      'image': '/src/assets/images/verified_properties_hero_1782216213939.jpg',
      'telephone': `+91${BUSINESS_DETAILS.phone}`,
      'email': BUSINESS_DETAILS.email,
      'url': window.location.origin,
      'priceRange': '₹₹₹',
      'reraNo': BUSINESS_DETAILS.reraNo,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': `${BUSINESS_DETAILS.address.shop}, ${BUSINESS_DETAILS.address.landmark}`,
        'addressLocality': BUSINESS_DETAILS.address.area,
        'addressRegion': BUSINESS_DETAILS.address.city,
        'postalCode': BUSINESS_DETAILS.address.zip,
        'addressCountry': 'IN'
      },
      'areaServed': [
        { '@type': 'AdministrativeArea', 'name': 'Naigaon' },
        { '@type': 'AdministrativeArea', 'name': 'Vasai' },
        { '@type': 'AdministrativeArea', 'name': 'Virar' },
        { '@type': 'AdministrativeArea', 'name': 'Palghar' },
        { '@type': 'AdministrativeArea', 'name': 'Mumbai' }
      ],
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': '19.347352',
        'longitude': '72.853046'
      }
    };

    const scriptId = 'rera-local-seo-jsonld';
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement;
    
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = scriptId;
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }
    scriptElement.text = JSON.stringify(reraSchema);

    // 2. Setup Page Specific SEO Title & Meta Description on active path
    let title = '';
    let description = '';

    switch (currentPath) {
      case '/':
      case '/index':
        title = `${BUSINESS_DETAILS.name} | Real Estate Naigaon, Vasai, Virar`;
        description = `Verified Properties by Mansi Gaikwad (RERA A99000026853). Premium residential flats, retail shops, office work spaces, and development plots for sale in Naigaon standard Arena, Vasai, and Palghar regions.`;
        break;
      case '/properties':
        title = `Verified Property Listings | Premium Flats, Shops & Land Plots`;
        description = `Browse real pre-vetted premium flat configurations, corporate office units, ground retail shops, and commercial spaces. Secure direct builder pricing with Verified Properties.`;
        break;
      case '/services':
        title = `Expert Real Estate services | Verified Title Safeguards`;
        description = `Discover our range of consultant systems including buyer representations, NRI advisory services, 30-year document checking, and RERA property validations in Palghar corridor.`;
        break;
      case '/why-us':
        title = `Why Choose Verified Properties | Legal Title Security & Advisory`;
        description = `Learn how our 100% verified zero-litigation policy and professional local authority intelligence prevent buyers from encountering fraudulent real-estate schemes in Naigaon.`;
        break;
      case '/about':
        title = `About Verified Properties | Mansi Gaikwad - MahaRERA Agent`;
        description = `Meet Mansi Gaikwad (RERA Agent Reg No A99000026853) and explore her story of establishing Naigaon East's most trusted zero-litigation real estate boutique.`;
        break;
      case '/contact':
        title = `Contact Verified Properties | Book Free On-Site Consultation`;
        description = `Arrange a free site tour or secure legal consults in Naigaon. Call us directly, send real-time emails, message on WhatsApp, or get office coordinates on Google Maps.`;
        break;
      case '/enquiry':
        title = `Property Enquiry Desk | Verified Properties`;
        description = `Inquire about luxury flats, shop layouts, or land assets. Secure verified builder pricing and professional advisory checking.`;
        break;
      case '/book-site-visit':
        title = `Book Private Site Visit | Verified Properties`;
        description = `Schedule a private site visit to Naigaon, Vasai, or Virar properties. Complimentary travel and full legal disclosures included.`;
        break;
      default:
        title = `Verified Properties | Integrity First Real Estate`;
        description = `Pre-vetted premium real-estate properties and advisory checks by MahaRERA registered agent Mansi Gaikwad in Palghar districts.`;
    }

    document.title = title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    return () => {
      // Clean up script on unmount
      const existing = document.getElementById(scriptId);
      if (existing) {
        existing.remove();
      }
    };
  }, [currentPath]);

  // Render correct sub-page with beautiful motion animations
  const renderActivePage = () => {
    switch (currentPath) {
      case '/':
      case '/index':
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Hero onSearch={setHeroSearchFilters} />
            <PropertiesGrid 
              isFeaturedOnly={true} 
              onNavigate={navigate} 
              heroSearchFilters={heroSearchFilters}
            />
            <Testimonials />
          </motion.div>
        );
      case '/properties':
        return (
          <motion.div
            key="properties"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="pt-28 pb-10 bg-[#020610] border-b border-[#D4AF37]/15">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left mt-2">
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-[0.25em] font-bold">Exclusive Portfolio</span>
                <h1 className="text-3xl sm:text-4xl font-light font-serif mt-2 text-white">Active Verified Listings</h1>
              </div>
            </div>
            <PropertiesGrid 
              onNavigate={navigate} 
              heroSearchFilters={heroSearchFilters}
            />
          </motion.div>
        );
      case '/services':
        return (
          <motion.div
            key="services"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="pt-28 pb-10 bg-[#020610] border-b border-[#D4AF37]/15">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left mt-2">
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-[0.25em] font-bold">Corporate Departments</span>
                <h1 className="text-3xl sm:text-4xl font-light font-serif mt-2 text-white">Our Consulting Services</h1>
              </div>
            </div>
            <ServicesSection />
          </motion.div>
        );
      case '/why-us':
        return (
          <motion.div
            key="why-us"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="pt-28 pb-10 bg-[#020610] border-b border-[#D4AF37]/15">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left mt-2">
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-[0.25em] font-bold">Our Guarantees</span>
                <h1 className="text-3xl sm:text-4xl font-light font-serif mt-2 text-white">Why Buyers Trust Us</h1>
              </div>
            </div>
            <WhyChooseUs onNavigate={navigate} />
          </motion.div>
        );
      case '/about':
        return (
          <motion.div
            key="about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="pt-28 pb-10 bg-[#020610] border-b border-[#D4AF37]/15">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left mt-2">
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-[0.25em] font-bold">Agency Credentials</span>
                <h1 className="text-3xl sm:text-4xl font-light font-serif mt-2 text-white">About the Consultant</h1>
              </div>
            </div>
            <AboutUs onNavigate={navigate} />
          </motion.div>
        );
      case '/contact':
        return (
          <motion.div
            key="contact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="pt-28 pb-10 bg-[#020610] border-b border-[#D4AF37]/15">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left mt-2">
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-[0.25em] font-bold">Office Terminal</span>
                <h1 className="text-3xl sm:text-4xl font-light font-serif mt-2 text-white">Contact Agency Details</h1>
              </div>
            </div>
            <ContactSection />
          </motion.div>
        );
      case '/enquiry':
        return (
          <motion.div
            key="enquiry"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <EnquiryPage onNavigate={navigate} />
          </motion.div>
        );
      case '/book-site-visit':
        return (
          <motion.div
            key="book-site-visit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <BookSiteVisitPage onNavigate={navigate} />
          </motion.div>
        );
      default:
        return (
          <div className="py-36 text-center text-white">
            <h2 className="text-3xl font-serif">Page Not Found</h2>
            <p className="text-xs text-white/50 mt-2">The path does not map to any active premium listings section.</p>
            <button
              onClick={() => navigate('/')}
              className="mt-6 px-6 py-2.5 bg-[#D4AF37] text-[#050B18] text-xs font-mono font-bold uppercase tracking-widest hover:bg-[#EEF4F8] transition-colors cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#050B18] text-white selection:bg-[#D4AF37] selection:text-[#050B18]">
      
      {/* 1. Header with dynamic navigation */}
      <Header
        currentPath={currentPath}
        onNavigate={navigate}
      />

      {/* 2. Main content pages frame with fluid layout */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {renderActivePage()}
        </AnimatePresence>
      </main>

      {/* 3. Global Footer with RERA registration details & sitemap mappings */}
      <footer className="bg-[#020610] border-t border-[#D4AF37]/15 pt-16 pb-24 sm:pb-12 text-[#EEF4F8]/70 text-sm mt-auto select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Column 1: Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="bg-[#D4AF37] p-1.5 text-[#050B18] tracking-widest font-bold">
                <ShieldCheck className="h-5 w-5 stroke-[2]" />
              </div>
              <span className="text-xl font-bold tracking-tighter text-[#D4AF37] font-serif italic">
                VERIFIED<span className="text-white font-sans not-italic font-bold tracking-tight text-sm ml-1">PROPERTIES</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-sm text-white/60 font-sans">
              {BUSINESS_DETAILS.description}
            </p>
            <p className="text-xs text-[#D4AF37] font-mono tracking-wide leading-relaxed">
              📢 Registered under Maharashtra Real Estate Regulatory Authority.
            </p>
          </div>

          {/* Column 2: Mapped sitemap links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] font-mono">Sitemap</h4>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'Home Page', path: '/' },
                { label: 'Premium Listings', path: '/properties' },
                { label: 'Consultant Services', path: '/services' },
                { label: 'Why Choose Us', path: '/why-us' },
                { label: 'About Consultant', path: '/about' },
                { label: 'Contact Details', path: '/contact' },
                { label: 'Property Enquiry', path: '/enquiry' },
                { label: 'Book Site Visit', path: '/book-site-visit' }
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="hover:text-white hover:underline transition-colors block text-left text-white/70 cursor-pointer bg-transparent"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact layout summary */}
          <div className="md:col-span-4 space-y-3 border-t md:border-t-0 border-white/5 pt-6 md:pt-0">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] font-mono">Contact Details</h4>
            <div className="space-y-2 text-xs leading-relaxed text-white/80 font-sans">
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span>{BUSINESS_DETAILS.address.shop}, Near Global Arena, Naigaon East, Palghar, Maharashtra - 401208</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#D4AF37]" />
                <a href={`tel:+91${BUSINESS_DETAILS.phone}`} className="hover:underline text-[#D4AF37] font-bold">
                  +91 {BUSINESS_DETAILS.phone} (Mansi Gaikwad)
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#D4AF37]" />
                <a href={`mailto:${BUSINESS_DETAILS.email}`} className="hover:underline">
                  {BUSINESS_DETAILS.email}
                </a>
              </p>
            </div>
          </div>

        </div>

        {/* Legal copyrights and RERA details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/15 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono">
          <div className="text-center sm:text-left space-y-1">
            <p>© {new Date().getFullYear()} Verified Properties. All Rights Reserved.</p>
            <p className="text-white/40">Registered Office: Shop No. 9, Nakshatra Primus A-Wing, Naigaon East.</p>
          </div>
          
          <div className="flex items-center gap-4 text-white/40">
            <span className="text-[#D4AF37] font-bold">RERA Registration: {BUSINESS_DETAILS.reraNo}</span>
          </div>
        </div>
      </footer>

      {/* 5. WhatsApp widget floats + Mobile Persist actions */}
      <FloatingActions onNavigate={navigate} />

    </div>
  );
}
