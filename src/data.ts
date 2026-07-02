/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Property, BusinessSchema } from './types';

export const BUSINESS_DETAILS: BusinessSchema & { description: string } = {
  name: 'Verified Properties',
  tagline: 'Real Estate & Investment Consultant',
  description: 'Your trusted partner for buying, selling, renting, and investing in premium real estate across Naigaon, Vasai, Virar, and the wider Mumbai-Palghar suburbs. With clear RERA verification and deep local market expertise, we build pathways to your dream property and high-yield investments.',
  reraNo: 'A99000026853',
  contactPerson: 'Mansi Gaikwad',
  phone: '7020913759',
  email: 'verifiedproperties20@gmail.com',
  address: {
    shop: 'Nakshatra Primus, A-Wing, Shop No. 9',
    landmark: 'Near Global Arena',
    area: 'Naigaon East',
    city: 'Palghar',
    zip: '401208'
  }
};

export const PROPERTIES: Property[] = [
  {
    id: 'prop-001',
    title: 'Sunteck WestWorld',
    type: 'apartment',
    transaction: 'sale',
    price: 'Starting From ₹31 Lakhs',
    numericPriceVal: 3100000,
    priceLabel: '₹31 Lakhs Onwards',
    location: 'Sunteck WestWorld, Near Naigaon Railway Station, Naigaon East, Palghar - 401208',
    area: '392 Sq.Ft. Usable',
    bedrooms: 1,
    bathrooms: 1,
    reraApproved: true,
    reraNo: 'P99000017195',
    constructionStatus: 'Available',
    image: 'https://iili.io/CTQW6Hg.md.jpg',
    description: 'Sunteck WestWorld in Naigaon East is a beautifully structured premium residential township offering 1 BHK apartments with modern amenities and scenic open layouts. Perfectly situated near the Naigaon Railway Station, this grand G+22 storey tower features state-of-the-art high-speed elevators, kids play zone, manicured landscaping, multi-tier security, and comprehensive resident parking.',
    features: [
      '392 Sq.Ft. Usable Carpet Area',
      'G+22 Storey Premium Tower',
      'Modern Amenities',
      'High-Speed Elevators',
      "Children's Play Area",
      'Landscaped Garden',
      '24x7 Security',
      'Parking Available'
    ],
    gallery: [
      'https://iili.io/CTQW6Hg.md.jpg',
      'https://iili.io/CTQwDIs.md.jpg',
      'https://iili.io/CTQwZpn.md.jpg',
      'https://iili.io/CTQwQkX.md.jpg',
      'https://iili.io/CTQwbhG.md.jpg',
      'https://iili.io/CTQwmQf.md.jpg',
      'https://iili.io/CTQwyB4.md.jpg',
      'https://iili.io/CTQN9El.md.jpg',
      'https://iili.io/CTQNH42.md.jpg',
      'https://iili.io/CTQN3v9.md.jpg'
    ],
    configuration: '1 BHK',
    tower: 'G+22 Storey'
  },
  {
    id: 'prop-002',
    title: 'Sunteck Maxx World',
    type: 'apartment',
    transaction: 'sale',
    price: 'Starting From ₹33 Lakhs',
    numericPriceVal: 3300000,
    priceLabel: '₹33 Lakhs Onwards',
    location: 'Sunteck Maxx World, Naigaon East, Palghar, Maharashtra',
    area: '407 Sq.Ft.',
    bedrooms: 1,
    bathrooms: 1,
    reraApproved: false,
    constructionStatus: 'Available',
    image: 'https://iili.io/CuWWQTb.md.jpg',
    description: 'Sunteck Maxx World offers premium 1 BHK smart residential flats with expansive modern layouts in Naigaon East. Built to ultra-premium design standards, the G+23 storey tower provides top-tier urban connectivity, rich community spaces, state-of-the-art elevators, and comprehensive security systems for the perfect lifestyle.',
    features: [
      '1 BHK Smart Homes',
      '407 Sq.Ft Usable Carpet',
      'G+23 Storey Tower',
      'Modern Lifestyle Amenities',
      'Clubhouse',
      "Children's Play Area",
      'Landscaped Gardens',
      'High-Speed Elevators',
      '24x7 Security',
      'Ample Parking'
    ],
    gallery: [
      'https://iili.io/CuWWQTb.md.jpg',
      'https://iili.io/CuWhT0B.md.jpg',
      'https://iili.io/CuWhIfV.md.jpg',
      'https://iili.io/CuWhxiQ.md.jpg',
      'https://iili.io/CuWhuUP.md.jpg',
      'https://iili.io/CuWhlWv.md.jpg',
      'https://iili.io/CuWh0sR.md.jpg',
      'https://iili.io/CuWhczJ.md.jpg',
      'https://iili.io/CuWhYba.md.jpg',
      'https://iili.io/CuWhMgI.md.jpg',
      'https://iili.io/CuWhjbs.md.jpg',
      'https://iili.io/CuWhX5X.md.jpg',
      'https://iili.io/CuWhhen.md.jpg',
      'https://iili.io/CuWhNzG.md.jpg',
      'https://iili.io/CuWhOXf.md.jpg'
    ],
    configuration: '1 BHK',
    tower: 'G+23 Storey'
  },
  {
    id: 'prop-003',
    title: 'Nakshatra Primus Ground Retail Shop',
    type: 'shop',
    transaction: 'sale',
    price: '₹88 Lakhs',
    numericPriceVal: 8800000,
    priceLabel: '₹88 Lakhs',
    location: 'A-Wing Retail Arcade, Nakshatra Primus, Naigaon East',
    area: '450 Sq.Ft.',
    reraApproved: true,
    reraNo: 'P99000021650',
    constructionStatus: 'AVAILABLE',
    image: '/src/assets/images/commercial_shop_space_1782216253457.jpg',
    description: 'Exclusive, high-visibility corner shop situated directly in Naigaon East\'s busiest commercial avenue. Characterized by premium high double-height shutter architecture, standard utility fit-outs, and heavy commercial foot traffic from surrounding luxury high-rises. Extremely suitable for medical dispensaries, modern branded franchise outlets, supermarkets, or fine dining food outlets.',
    features: ['Road Frontage Layout', 'Double-Height Ceiling', 'Dedicated Toilet Space', '3-Phase High Voltage power', 'Customer Car Parking Zone', 'Vastu Compliant Entrance']
  },
  {
    id: 'prop-004',
    title: 'Hill Vista Residence 2BHK',
    type: 'apartment',
    transaction: 'rent',
    price: '₹15,500 / month',
    numericPriceVal: 15500,
    priceLabel: '₹15,500 / mo',
    location: 'Vasai East, Palghar',
    area: '980 Sq.Ft.',
    bedrooms: 2,
    bathrooms: 2,
    reraApproved: true,
    reraNo: 'P99000078241',
    constructionStatus: 'AVAILABLE',
    image: '/src/assets/images/luxury_apartment_interior_1782216234114.jpg',
    description: 'A stellar semi-furnished 2BHK model high-rise home located inside a prominent vasai residential colony. Experience beautiful sunset views from two wide balconies with safety grilles. The complex features manicured jogging circuits, interactive child playgrounds, and is well-served by shared rickshaws, standard public transport, and nearby premium local markets.',
    features: ['Fitted Wooden Cupboards', 'Dynamic Rooftop Vista', 'Intercom Security Hub', 'Gated Parking Lot', 'Clubhouse and Play zone Access', 'Underground municipal water tank']
  },
  {
    id: 'prop-005',
    title: 'Heritage Prime Commercial Suite',
    type: 'office',
    transaction: 'rent',
    price: '₹32,000 / month',
    numericPriceVal: 32000,
    priceLabel: '₹32,000 / mo',
    location: 'Vasai West, Palghar',
    area: '820 Sq.Ft.',
    reraApproved: true,
    reraNo: 'P99000049281',
    constructionStatus: 'AVAILABLE',
    image: '/src/assets/images/commercial_shop_space_1782216253457.jpg',
    description: 'A completely renovated and fully furnished executive workspace in Vasai West. Equipped with beautiful contemporary office furniture including corporate designer desks, fully air-conditioned interiors, visual conference rooms, isolated servers, and security cameras. Perfect for chartered financial practices, law associations, growing software startups, or dental practices.',
    features: ['12 Ready Workstations', 'Premium Executive Cabins', 'Conference Room with TV', 'Fiber Optic High-Speed Internet', 'Integrated Server Rack Space', 'Pantry Room with Microwave']
  },
  {
    id: 'prop-006',
    title: 'Elite Highpoint Avenue Complex',
    type: 'commercial',
    transaction: 'sale',
    price: '₹1.85 Crores',
    numericPriceVal: 18500000,
    priceLabel: '₹1.85 Cr',
    location: 'Global Arena, Naigaon East',
    area: '1,500 Sq.Ft.',
    reraApproved: true,
    reraNo: 'P99000021485',
    constructionStatus: 'AVAILABLE',
    image: '/src/assets/images/commercial_shop_space_1782216253457.jpg',
    description: 'An executive double-floor high exposure commercial building situated right in Naigaon\'s high-end corporate district (Global Arena corridor). Generous road-front window frames allow retail signage to capture heavy daily commuters. A solid asset choice for gym franchises, commercial diagnostic clinics, financial banks, or corporate regional offices.',
    features: ['Prime Logo Signage Branding', 'Triple Phase electricity grids', 'Generous floor dimensions', 'Ample Client Parking', 'Central AC trunk structural ready', 'Loading and unloading dock area']
  },
  {
    id: 'prop-007',
    title: 'Vikas Meadows NA Plot Layout',
    type: 'land',
    transaction: 'sale',
    price: '₹1.20 Crores onwards',
    numericPriceVal: 12000000,
    priceLabel: '₹1.2 Cr+',
    location: 'Virar East, Palghar',
    area: '4,500 Sq.Ft.',
    reraApproved: true,
    reraNo: 'P99000109848',
    constructionStatus: 'AVAILABLE',
    image: '/src/assets/images/premium_land_plot_1782216288249.jpg',
    description: 'Fully cleared, Non-Agriculture (NA) certified residential plotting project located in the fast-appreciating green belt of Virar East. Perfect architectural foundation to design independent custom high-end private villas, leisure farmlands, or secure land bank assets. Features wide paved inner roads, central compound gating, and heavy commercial real-estate appreciation potential.',
    features: ['Clear Title Handover', 'Individual 7/12 Extract Document', 'Fully Compound-Walled Gated boundary', 'Water pipelines connected', 'Underground power layout', 'Proximity to Western Express Highway']
  },
  {
    id: 'prop-008',
    title: 'Nakshatra Primus Plaza Suite',
    type: 'office',
    transaction: 'sale',
    price: '₹42 Lakhs onwards',
    numericPriceVal: 4200000,
    priceLabel: '₹42 Lakhs+',
    location: 'Nakshatra Primus, Naigaon East, Palghar',
    area: '520 Sq.Ft.',
    reraApproved: true,
    reraNo: 'P99000021650',
    constructionStatus: 'UNDER CONSTRUCTION',
    image: '/src/assets/images/commercial_shop_space_1782216253457.jpg',
    description: 'Located in the prime business park Nakshatra Primus Commercial Complex. Boasting multi-lift systems, security checkpoints, and fully glazed window fronts. Ideal office location for retail advisors, real-estate investors, financial analysts, and corporate business owners.',
    features: ['Glass Facade Structure', 'Modern Conference Space', 'Underground Car Parking', '24/7 Backup Electrical Grid', 'Executive Lounge Lobby']
  }
];

export const TESTIMONIALS = [
  {
    name: 'Sandeep Raut',
    role: 'Homeowner, Nakshatra Primus',
    text: 'Mansi Gaikwad is incredibly professional. She helped us verify all the legal documentation, RERA registration, and secure a great bank home loan smoothly. Highly recommend Verified Properties!',
    stars: 5,
    location: 'Naigaon East'
  },
  {
    name: 'Anjali Sharma',
    role: 'Business Owner',
    text: 'I was looking for a premium corner shop in Naigaon for my fitness studio. Verified Properties guided me to a prime location with excellent foot traffic. Clear deals with direct builder verification.',
    stars: 5,
    location: 'Naigaon East'
  },
  {
    name: 'Nitin Patil',
    role: 'Investment Partner',
    text: 'As an NRI investor in lands and plots, local trust is paramount. RERA checks and land boundary checks provided by Verified Properties gave me supreme confidence to invest in two land plots in Vasai-Virar.',
    stars: 5,
    location: 'Vasai West'
  }
];
