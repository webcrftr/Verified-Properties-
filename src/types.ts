/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PropertyType = 'apartment' | 'commercial' | 'shop' | 'office' | 'land';

export type TransactionType = 'sale' | 'rent';

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  transaction: TransactionType;
  price: string;
  numericPriceVal: number; // For filtering (e.g., in Lakhs or absolute rupees, or rent budget)
  priceLabel: string; // e.g., "₹ 38 Lakhs onwards" or "₹ 12,000 / month"
  location: string;
  area: string;
  bedrooms?: number; // for apartments
  bathrooms?: number;
  reraApproved: boolean;
  reraNo?: string;
  image: string;
  description: string;
  features: string[];
  constructionStatus?: string; // e.g., 'UNDER CONSTRUCTION' or 'AVAILABLE'
  gallery?: string[];
  configuration?: string;
  tower?: string;
  builder?: string;
  highlights?: string[];
  amenities?: { name: string; icon: string }[];
  advantages?: { name: string; icon: string }[];
  configurations?: { name: string; area: string; price: string }[];
  paymentPlans?: { title: string; detail: string; extra: string }[];
  grandClubhouse?: { level: string; items: string[] }[];
  launchBenefits?: string[];
  specialOffer?: {
    title: string;
    mainText: string;
    subHeading: string;
    highlights: string[];
  };
}

export interface Inquiry {
  id: string;
  timestamp: string;
  propertyName?: string;
  propertyId?: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  message: string;
  status: 'new' | 'contacted' | 'archived';
}

export interface SiteVisit {
  id: string;
  timestamp: string;
  propertyName: string;
  propertyId: string;
  clientName: string;
  clientPhone: string;
  visitDate: string;
  visitTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

export interface BusinessSchema {
  name: string;
  tagline: string;
  reraNo: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: {
    shop: string;
    landmark: string;
    area: string;
    city: string;
    zip: string;
  };
}
