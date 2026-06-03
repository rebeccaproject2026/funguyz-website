'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Newsletter } from '@/components/Newsletter';
import { 
  Sparkles, 
  Shield, 
  Bookmark, 
  Share2, 
  ChevronRight, 
  FileText, 
  Clock, 
  Calendar, 
  User, 
  HelpCircle,
  Truck,
  Coins,
  CreditCard,
  RotateCcw,
  Sparkle,
  Scale
} from 'lucide-react';

interface PolicyData {
  title: string;
  category: string;
  lastUpdated: string;
  toc: { anchor: string; label: string }[];
  content: { anchor: string; sectionTitle: string; paragraphs: string[] }[];
}

const infoContentMap: Record<string, PolicyData> = {
  'shipping-policy': {
    title: 'Discreet Shipping & Delivery Policy',
    category: 'Logistics',
    lastUpdated: 'June 1, 2026',
    toc: [
      { anchor: 'packaging', label: '1. Scent-Free Packaging' },
      { anchor: 'rates', label: '2. Transit Timelines & Rates' },
      { anchor: 'insurance', label: '3. Package Delivery Insurance' }
    ],
    content: [
      {
        anchor: 'packaging',
        sectionTitle: '1. Double Vacuum-Sealed, Scent-Free Packaging',
        paragraphs: [
          'We guarantee 100% discretion on every order. Every flush, capsule, and edible formulation is packed inside double vacuum-sealed, odorless medical-grade bags. This absolute scent-containment protocol ensures that zero botanical indicators escape the packet.',
          'These bags are then securely shipped inside plain, unmarked cardboard boxes or heavy-duty padded bubble envelopes. There is absolutely zero reference to psilocybin, mushrooms, wellness, or FunGuyz on the exterior of the parcel. It looks completely identical to a generic Amazon, cosmetics, or household package.'
        ]
      },
      {
        anchor: 'rates',
        sectionTitle: '2. Shipping Rates & Transit Timelines',
        paragraphs: [
          'We ship to every single province and territory in Canada utilizing Canada Post Express Delivery. National express delivery typically takes 1-3 business days depending on location.',
          'For metro Toronto and Ottawa areas, same-day express local courier delivery is available for orders placed before 2:00 PM EST. Use our interactive calculator widget below to estimate your shipping rates and delivery timeline.'
        ]
      },
      {
        anchor: 'insurance',
        sectionTitle: '3. Full Package Transit Insurance',
        paragraphs: [
          'Every package shipped by the FunGuyz store carries full transit insurance. If your discreet package is lost, delayed, or damaged by Canada Post, we immediately dispatch a replacement order via express shipping.',
          'Once your parcel is sorted at the local Ontario postal terminal, an active tracking link is automatically generated and emailed to your registered profile.'
        ]
      }
    ]
  },
  'payment-methods': {
    title: 'Secure & Encrypted Payment Methods',
    category: 'Billing',
    lastUpdated: 'June 1, 2026',
    toc: [
      { anchor: 'gateways', label: '1. Secure Payment Gateways' },
      { anchor: 'etransfer', label: '2. Interac e-Transfer Guide' }
    ],
    content: [
      {
        anchor: 'gateways',
        sectionTitle: '1. Secure Payment Gateways',
        paragraphs: [
          'To preserve client identity and support financial security, we offer a secure, fully encrypted payment gateway: Interac e-Transfer.',
          'We advocate for Interac e-Transfer as it offers the absolute highest degree of client anonymity, bypassing standard card logs entirely.'
        ]
      },
      {
        anchor: 'etransfer',
        sectionTitle: '2. Sending Interac e-Transfers',
        paragraphs: [
          'Sending your e-Transfer is highly secure and straightforward. Simply log in to your Canadian online banking portal, add pay@funguyz.ca as your contact, and send the payment.',
          'Please ensure you specify your unique Order ID in the payment message memo. This allows our automated systems to instantly match the transfer and release your order for cleanroom packing.'
        ]
      }
    ]
  },
  'returns-and-refunds': {
    title: 'Returns & Refund Policy Guarantee',
    category: 'Customer Care',
    lastUpdated: 'June 1, 2026',
    toc: [
      { anchor: 'guarantee', label: '1. Satisfaction Guarantee' },
      { anchor: 'process', label: '2. Return-Free Refund Process' },
      { anchor: 'timelines', label: '3. Reimbursement Timelines' }
    ],
    content: [
      {
        anchor: 'guarantee',
        sectionTitle: '1. 100% Satisfaction Guarantee',
        paragraphs: [
          'Our primary goal is supporting your long-term wellness. If you are not completely thrilled with the quality, potency, or clinical experience of your organic formulations, we offer a full money-back guarantee.',
          'Simply open a support ticket or email hello@funguyz.ca within 14 days of delivery. Our wellness consultants will immediately review your request.'
        ]
      },
      {
        anchor: 'process',
        sectionTitle: '2. Return-Free Refund Process',
        paragraphs: [
          'To ensure complete customer safety, discretion, and privacy, we never ask clients to physically mail back organic products. Physical returns are completely bypassed.',
          'This return-free policy prevents any compromised packaging from transit and keeps your customer profile fully anonymous.'
        ]
      },
      {
        anchor: 'timelines',
        sectionTitle: '3. Reimbursement Timelines',
        paragraphs: [
          'Accepted refunds are credited directly back to your account via Interac e-Transfer within 2 to 4 business days.',
          'If a replacement order is preferred, our dispatch teams will immediately ship a new package with express shipping.'
        ]
      }
    ]
  },
  'cookie-policy': {
    title: 'Client Cookie Policy',
    category: 'Security',
    lastUpdated: 'June 1, 2026',
    toc: [
      { anchor: 'usage', label: '1. How We Use Cookies' },
      { anchor: 'tracking', label: '2. Analytics & Tracking' },
      { anchor: 'preferences', label: '3. Managing Preferences' }
    ],
    content: [
      {
        anchor: 'usage',
        sectionTitle: '1. Flawless Shopping Session Cookies',
        paragraphs: [
          'We utilize browser cookies to keep your shopping cart contents saved, maintain your active dashboard login session, and coordinate theme settings.',
          'These cookies contain zero personal identifiers and are encrypted locally on your hard drive.'
        ]
      },
      {
        anchor: 'tracking',
        sectionTitle: '2. Anonymized Analytics Telemetry',
        paragraphs: [
          'We use lightweight, secure, and self-hosted analytics platforms to monitor store layout responsiveness. We never transfer cookie telemetry to third-party ad retargeting scripts.',
          'Our analytics strictly track speed and layout performance to optimize page loading times.'
        ]
      },
      {
        anchor: 'preferences',
        sectionTitle: '3. Managing Cookie Preferences',
        paragraphs: [
          'You can wipe your browser cookies at any time via your browser privacy settings. Please note that clearing cookies will empty your active shopping cart and log you out of your account console.'
        ]
      }
    ]
  },
  'privacy-policy': {
    title: 'Privacy & Data Protection Policy',
    category: 'Legal',
    lastUpdated: 'June 1, 2026',
    toc: [
      { anchor: 'collection', label: '1. Information We Collect' },
      { anchor: 'usage', label: '2. Data Usage Disclosures' },
      { anchor: 'wiping', label: '3. Purchase History Wiping' }
    ],
    content: [
      {
        anchor: 'collection',
        sectionTitle: '1. Information We Securely Collect',
        paragraphs: [
          'We only collect essential details to compile and dispatch your delivery: an encrypted email contact, shipping address, and order recipient name.',
          'All communication data is routed through military-grade SSL channels to eliminate eavesdropping risk.'
        ]
      },
      {
        anchor: 'usage',
        sectionTitle: '2. Isolated Server Data Usage',
        paragraphs: [
          'We maintain a strict "zero tracking" standard. Your information is isolated on highly secured off-network servers and is strictly used for shipment generation. We never sell or share details.'
        ]
      },
      {
        anchor: 'wiping',
        sectionTitle: '3. Data Purging & History Wiping',
        paragraphs: [
          'To support absolute anonymity, users can request the permanent deletion of their account profile and transaction records at any time. Simply email hello@funguyz.ca and our database administrators will permanently purge all details from our systems.'
        ]
      }
    ]
  },
  'responsible-use': {
    title: 'Responsible Use Guidelines',
    category: 'Wellness',
    lastUpdated: 'June 1, 2026',
    toc: [
      { anchor: 'onboarding', label: '1. Onboarding Principles' },
      { anchor: 'dosage', label: '2. Safe Dosage Planner' },
      { anchor: 'hazards', label: '3. Operating & Age Warnings' }
    ],
    content: [
      {
        anchor: 'onboarding',
        sectionTitle: '1. General Onboarding Principles',
        paragraphs: [
          'Active botanical psilocybin compounds are powerful organic compounds. We advocate for highly safe, structured, and intentional consumption rituals.',
          'Always begin with a microdose or mild dose, especially if you are new to organic compounds, to gauge your body sensitivity.'
        ]
      },
      {
        anchor: 'dosage',
        sectionTitle: '2. Clean Dosage Protocols',
        paragraphs: [
          'Microdose protocols (typically 50mg-200mg) should follow strict schedules (such as 1 day active followed by 2 days of rest) to prevent active tolerance build-up.',
          'For moderate or higher doses, always ensure you have a comfortable, stress-free setting (set and setting) and a trusted guide.'
        ]
      },
      {
        anchor: 'hazards',
        sectionTitle: '3. Machinery & Age Warnings',
        paragraphs: [
          'Never consume psilocybin products before operating vehicles, heavy machinery, or entering active environments. Keep all products locked securely away from minors and pets.'
        ]
      }
    ]
  },
  'legal-disclaimer': {
    title: 'Mycological Research & Legal Disclaimer',
    category: 'Legal',
    lastUpdated: 'June 1, 2026',
    toc: [
      { anchor: 'science', label: '1. Educational Research' },
      { anchor: 'medical', label: '2. Medical Disclaimer' },
      { anchor: 'compliance', label: '3. Mycological Standards' }
    ],
    content: [
      {
        anchor: 'science',
        sectionTitle: '1. Educational Research Referencing',
        paragraphs: [
          'All scientific guides, strain descriptions, potency indexes, and educational articles provided on this storefront are published strictly as reference databases for botanical and mycological research.'
        ]
      },
      {
        anchor: 'medical',
        sectionTitle: '2. Clinical Health Disclaimer',
        paragraphs: [
          'All information published on our platform does not constitute professional medical advice, diagnosis, or health treatment plans. Always consult with certified medical experts before introducing active organic flushes to your routine.'
        ]
      },
      {
        anchor: 'compliance',
        sectionTitle: '3. Lab Testing & Batch Standards',
        paragraphs: [
          'We maintain rigorous quality standards. We laboratory-test every crop flush to guarantee pure genetic cultivars, organic purity, and zero trace chemical fertilizers.'
        ]
      }
    ]
  },
  'age-verification': {
    title: '19+ Age Restriction Policy',
    category: 'Compliance',
    lastUpdated: 'June 1, 2026',
    toc: [
      { anchor: 'limit', label: '1. 19+ Age Restriction' },
      { anchor: 'scans', label: '2. Verification Checks' },
      { anchor: 'refusal', label: '3. Dispatch Refusal' }
    ],
    content: [
      {
        anchor: 'limit',
        sectionTitle: '1. Strict 19+ Age Requirement',
        paragraphs: [
          'You must be 19 years of age or older to enter our digital storefront, explore our products, register a profile, or request secure express deliveries in Canada.'
        ]
      },
      {
        anchor: 'scans',
        sectionTitle: '2. Automated Age Scans',
        paragraphs: [
          'During checkout, our logistical systems perform non-invasive age confirmation searches. We strictly enforce this standard across all Canadian provinces and territories.'
        ]
      },
      {
        anchor: 'refusal',
        sectionTitle: '3. Shipment Refusal Measures',
        paragraphs: [
          'We reserve the right to request a discrete photo ID upload to verify your birthdate before packaging and shipping orders. Orders from underage profiles are instantly cancelled and refunded.'
        ]
      }
    ]
  },
  'terms-and-conditions': {
    title: 'Dispensary Terms & Conditions',
    category: 'Terms',
    lastUpdated: 'June 1, 2026',
    toc: [
      { anchor: 'agreement', label: '1. Service Agreements' },
      { anchor: 'dispatch', label: '2. Product Dispatch Terms' },
      { anchor: 'liability', label: '3. Liability Limitations' }
    ],
    content: [
      {
        anchor: 'agreement',
        sectionTitle: '1. User Service Agreement',
        paragraphs: [
          'By navigating our storefront, registering a wellness profile, or placing orders, you agree to comply with all terms, policies, age limits, and responsible use parameters.'
        ]
      },
      {
        anchor: 'dispatch',
        sectionTitle: '2. Cleanroom Dispatch Guarantees',
        paragraphs: [
          'We guarantee that every product shipped matches the exact weight, genetic cultivar potency, and organic quality described in our catalog. Shipping is coordinated strictly through insured Canada Post Express Delivery.'
        ]
      },
      {
        anchor: 'liability',
        sectionTitle: '3. Educational & Safety Liability',
        paragraphs: [
          'Users are fully responsible for their dosage planning and responsible use protocols. FunGuyz holds zero liability for adverse outcomes due to reckless or unsafe consumption behaviors.'
        ]
      }
    ]
  }
};

const RELATED_LINKS = [
  { slug: 'shipping-policy', label: 'Shipping Policy' },
  { slug: 'payment-methods', label: 'Payment Methods' },
  { slug: 'returns-and-refunds', label: 'Returns & Refunds' },
  { slug: 'responsible-use', label: 'Responsible Use' },
  { slug: 'privacy-policy', label: 'Privacy Policy' },
  { slug: 'terms-and-conditions', label: 'Terms & Conditions' }
];

export default function DynamicInfoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const slugKey = slug.toLowerCase();

  // Widget States: Shipping Calculator
  const [shipVal, setShipVal] = useState(130);
  const [shipRegion, setShipRegion] = useState<'GTA' | 'Ottawa' | 'National'>('GTA');

  // Widget States: Payment Switcher
  const [activePayTab, setActivePayTab] = useState<'etransfer' | 'creditcard' | 'cod'>('etransfer');

  // Widget States: Dosage Advisor Planner
  const [userWeight, setUserWeight] = useState(160); // lbs
  const [userIntent, setUserIntent] = useState<'micro' | 'gentle' | 'trip'>('micro');

  const content = infoContentMap[slugKey] || infoContentMap['shipping-policy'];

  // --- Shipping Calculation logic ---
  const isFree = false;
  const shipCost = 20;
  const speed = shipRegion === 'GTA' ? 'Same-Day (Under 4 Hrs)' : shipRegion === 'Ottawa' ? 'Same-Day (2-4 Hrs)' : '1-3 Business Days';

  // --- Dosage Calculation logic ---
  const weightKg = userWeight * 0.453592;
  const doseRange = userIntent === 'micro'
    ? { min: 0.05, max: 0.15, text: 'Sub-perceptual daily wellness, no visuals.' }
    : userIntent === 'gentle'
    ? { min: 0.5, max: 1.5, text: 'Gentle cognitive shift, glowing focus.' }
    : { min: 2.0, max: 3.5, text: 'Deep transcendent, spiritual journey.' };
  
  const scheduleText = userIntent === 'micro'
    ? 'Fadiman Stack: 1 day active, 2 days rest.'
    : 'Trips should be scheduled with at least 2 weeks between sessions to prevent tolerance.';

  return (
    <main className="bg-[#fff8f3] text-[#1b1533] min-h-screen selection:bg-[#ff4fa3] selection:text-white antialiased font-sans">
      <Header />

      {/* 1. Category-Style Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-tr from-[#fffbf8] via-[#fffcfb] to-[#fff3ec] border-b border-purple-100/50 py-16 px-4 md:px-8 min-h-[380px] flex items-center">
        <div className="absolute left-[5%] top-[10%] w-[300px] h-[300px] rounded-full bg-[#ffe8db]/30 blur-[90px] pointer-events-none" />
        <div className="absolute right-[5%] bottom-[5%] w-[300px] h-[300px] rounded-full bg-[#e0f2fe]/40 blur-[90px] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl relative z-10 grid gap-10 md:grid-cols-[1.3fr_1fr] items-center w-full">
          
          {/* Left Hero Content */}
          <div className="flex flex-col items-start text-left gap-4">
            
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 logo-font leading-none">
              <a href="/" className="hover:text-[#ff4fa3] transition-colors">Home</a>
              <span>&gt;</span>
              <span className="text-slate-600 truncate max-w-xs">{content.title}</span>
            </div>

            {/* Title & Badge */}
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">{content.category} Section</span>
              <h1 className="text-3xl md:text-5xl font-black text-[#1b1533] uppercase tracking-tight logo-font leading-none">
                {content.title.split(' ').slice(0, 2).join(' ')} <br />
                <span className="text-[#ff4fa3]">{content.title.split(' ').slice(2).join(' ')}</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-xs md:text-sm font-semibold leading-relaxed text-slate-500 max-w-md">
              Learn about our strictly laboratory-tested mycological processes, military-grade secure servers, return guarantees, and dosage advisors.
            </p>

            <div className="flex items-center gap-6 text-slate-400 text-xs font-semibold pt-2 border-t border-slate-100 w-full">
              <span className="flex items-center gap-1.5 shrink-0">
                <FileText className="h-4 w-4 text-[#ff4fa3]" /> Official Store policy
              </span>
              <span className="text-emerald-600 shrink-0 font-bold">• Verified Active</span>
            </div>

          </div>

          {/* Right Hero Block: Floating Illustrative Card */}
          <div className="relative flex justify-center items-center select-none animate-float hidden md:flex">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ff4fa3]/10 to-[#7b5cff]/15 rounded-[40px] rotate-3 scale-95 blur-sm" />
            <div className="relative bg-white/70 backdrop-blur-md border border-pink-100/60 rounded-[40px] p-6 shadow-[0_24px_70px_rgba(255,79,163,0.12)] text-left space-y-4 max-w-xs">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#ff4fa3] to-[#7b5cff] flex items-center justify-center text-white text-lg">
                🛡️
              </div>
              <h3 className="text-xs font-black uppercase text-[#1b1533] logo-font">Assurance Stamp</h3>
              <p className="text-[10px] font-semibold text-slate-400 leading-normal">
                Discreet Canada Post mailings, return-free refunds, and 256-bit encrypted e-Transfer channels protect your privacy.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Sticky Sidebar Article Layout */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 grid gap-10 lg:grid-cols-[1fr_2.5fr] items-start">
        
        {/* Sticky Sidebar Navigation Desk (Left Column) */}
        <aside className="space-y-6 lg:sticky lg:top-24 text-left">
          
          {/* Table Of Contents */}
          <div className="bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#1b1533] logo-font border-b border-slate-50 pb-2 flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#ff4fa3]" /> Page Contents
            </h4>
            <nav className="flex flex-col gap-2.5 text-xs font-bold text-slate-400">
              {content.toc.map((tocItem) => (
                <button
                  key={tocItem.anchor}
                  onClick={() => document.getElementById(tocItem.anchor)?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full text-left hover:text-[#ff4fa3] transition-colors leading-normal"
                >
                  {tocItem.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Sticky Sidebar: Switch pages */}
          <div className="bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#1b1533] logo-font border-b border-slate-50 pb-2">
              Related Policies
            </h4>
            <ul className="space-y-2.5 text-xs font-bold text-slate-400">
              {RELATED_LINKS.filter(link => link.slug !== slugKey).slice(0, 4).map((link) => (
                <li key={link.slug}>
                  <a 
                    href={`/info/${link.slug}`} 
                    className="flex items-center gap-1 hover:text-[#ff4fa3] transition-colors"
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-[#ff4fa3] shrink-0" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Metadata details */}
          <div className="bg-[#fff8f3] border border-pink-100/40 rounded-[28px] p-5 space-y-2 text-[10px] font-bold text-slate-400">
            <div className="flex justify-between">
              <span>Last Updated</span>
              <strong className="text-[#1b1533] font-black">{content.lastUpdated}</strong>
            </div>
            <div className="flex justify-between">
              <span>Authority</span>
              <strong className="text-[#1b1533] font-black uppercase logo-font">FunGuyz Store</strong>
            </div>
            <div className="flex justify-between">
              <span>Audit Stamp</span>
              <strong className="text-green-500 font-bold">100% Verified</strong>
            </div>
          </div>

        </aside>

        {/* Content Card Layout (Center Column) */}
        <div className="bg-white border border-slate-100 rounded-[44px] p-6 md:p-12 shadow-sm text-left space-y-10">
          
          {/* Header Action metadata */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="space-y-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Compliance Protocol</span>
              <h2 className="text-xl font-black uppercase text-[#1b1533] logo-font">{content.title}</h2>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  setIsBookmarked(!isBookmarked);
                  alert(isBookmarked ? 'Bookmark removed.' : 'Policy bookmarked!');
                }}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  isBookmarked 
                    ? 'bg-pink-50 border-pink-100 text-[#ff4fa3]' 
                    : 'bg-white border-slate-200 text-slate-400 hover:text-[#ff4fa3]'
                }`}
              >
                <Bookmark className="h-4 w-4" />
              </button>
              <button 
                onClick={() => alert('Link copied to clipboard!')}
                className="p-2 rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-[#ff4fa3] cursor-pointer"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Dynamic Article content and paragraphs mapping */}
          <div className="space-y-10 text-xs md:text-sm font-semibold text-slate-500 leading-relaxed max-w-3xl">
            {content.content.map((sec, sIdx) => (
              <div key={sIdx} id={sec.anchor} className="space-y-4 pt-6 first:pt-0">
                <h3 className="text-base md:text-lg font-black text-[#1b1533] uppercase logo-font">
                  {sec.sectionTitle}
                </h3>
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>
                    {p}
                  </p>
                ))}

                {/* --- EMBED INTEGRATED INTERACTIVE WIDGETS --- */}

                {/* 1. SHIPPING POLICY WIDGET */}
                {slugKey === 'shipping-policy' && sec.anchor === 'rates' && (
                  <div className="border border-pink-100 bg-[#fff8f3]/40 rounded-[32px] p-6 space-y-6 mt-6 animate-scale-up">
                    <div className="text-center space-y-1">
                      <span className="text-[8px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Interactive Calculator</span>
                      <h4 className="text-xs font-black uppercase text-[#1b1533] logo-font">Shipping Rate Calculator</h4>
                      <p className="text-[10px] text-slate-400 font-semibold leading-none">Drag the slider to adjust your mock order size and select your region.</p>
                    </div>

                    <div className="space-y-4">
                      {/* Slider Input */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-black text-[#1b1533] uppercase logo-font">
                          <span>Order Subtotal</span>
                          <strong>${shipVal}</strong>
                        </div>
                        <input 
                          type="range"
                          min="30"
                          max="250"
                          value={shipVal}
                          onChange={(e) => setShipVal(Number(e.target.value))}
                          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#ff4fa3]"
                        />
                      </div>

                      {/* Region Buttons */}
                      <div className="grid grid-cols-3 gap-2">
                        {['GTA', 'Ottawa', 'National'].map((r) => (
                          <button
                            key={r}
                            onClick={() => setShipRegion(r as any)}
                            className={`rounded-xl border py-2.5 text-[10px] font-black uppercase tracking-wide logo-font transition-all ${
                              shipRegion === r 
                                ? 'border-[#ff4fa3] bg-[#ff4fa3]/5 text-[#ff4fa3] shadow-sm'
                                : 'border-slate-200 bg-white text-slate-600 hover:border-pink-300'
                            }`}
                          >
                            {r} Metro
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Result outputs */}
                    <div className="bg-white border border-slate-100 rounded-2xl p-4 grid grid-cols-3 gap-2 text-center divide-x divide-slate-100">
                      <div>
                        <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Shipping Cost</span>
                        <strong className={`block text-xs font-black logo-font mt-1.5 ${isFree ? 'text-green-500' : 'text-[#1b1533]'}`}>
                          {isFree ? 'FREE' : `$${shipCost}.00`}
                        </strong>
                      </div>
                      <div>
                        <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Transit Timings</span>
                        <strong className="block text-xs font-black text-[#ff4fa3] logo-font mt-1.5 leading-none">{speed}</strong>
                      </div>
                      <div>
                        <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Shipping Tier</span>
                        <strong className="block text-[10px] font-bold text-slate-500 mt-1.5 leading-none">
                          Flat Rate Shipping
                        </strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. PAYMENT METHODS WIDGET */}
                {slugKey === 'payment-methods' && sec.anchor === 'etransfer' && (
                  <div className="border border-pink-100 bg-[#fff8f3]/40 rounded-[32px] p-6 space-y-4 mt-6 animate-scale-up">
                    <div className="text-center space-y-1">
                      <span className="text-[8px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Secure Payment</span>
                      <h4 className="text-xs font-black uppercase text-[#1b1533] logo-font">Interac e-Transfer Guide</h4>
                      <p className="text-[10px] text-slate-400 font-semibold leading-none">Accepted payments are processed strictly via e-Transfer.</p>
                    </div>

                    {/* Step description */}
                    <div className="bg-white border border-slate-100 rounded-2xl p-5 text-left text-xs font-semibold leading-relaxed text-slate-500">
                      <div className="space-y-2">
                        <strong className="block text-xs font-black text-[#1b1533] uppercase logo-font">Interac e-Transfer Instructions:</strong>
                        <ol className="list-decimal pl-4 space-y-1.5 text-[11px] font-bold text-slate-500">
                          <li>Check out with Interac e-Transfer.</li>
                          <li>Send payment through your online banking portal to <code className="bg-pink-50 text-[#ff4fa3] px-1 rounded">pay@funguyz.ca</code>.</li>
                          <li>Set your security password as your unique <code className="bg-slate-100 px-1 rounded text-slate-800 font-black">Order ID</code>.</li>
                          <li>Our systems authorize transaction confirmations instantly upon receipt.</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. RETURNS & REFUNDS WIDGET */}
                {slugKey === 'returns-and-refunds' && sec.anchor === 'process' && (
                  <div className="border border-pink-100 bg-[#fff8f3]/40 rounded-[32px] p-6 space-y-6 mt-6 animate-scale-up text-center">
                    <div className="space-y-1">
                      <span className="text-[8px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Dispensary Standard</span>
                      <h4 className="text-xs font-black uppercase text-[#1b1533] logo-font">Return-Free Refund timeline</h4>
                      <p className="text-[10px] text-slate-400 font-semibold leading-none">Our process has zero physical mailing requirements.</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 relative">
                      {/* Line connector */}
                      <div className="absolute top-5 left-[15%] right-[15%] h-0.5 bg-slate-100 pointer-events-none" />
                      
                      {[
                        { title: '1. Contact Support', desc: 'Email details & Order ID.', icon: HelpCircle },
                        { title: '2. Quality Check', desc: 'wellness experts review reports.', icon: Shield },
                        { title: '3. Reimburse', desc: 'Direct e-Transfer credit.', icon: Coins }
                      ].map((step, idx) => (
                        <div key={idx} className="relative z-10 flex flex-col items-center gap-2">
                          <div className="h-10 w-10 rounded-full bg-white border border-pink-100 flex items-center justify-center text-[#ff4fa3] shadow-sm">
                            <step.icon className="h-4.5 w-4.5 stroke-[2]" />
                          </div>
                          <div>
                            <strong className="block text-[10px] font-black text-[#1b1533] uppercase logo-font leading-none">{step.title}</strong>
                            <span className="block text-[8px] text-slate-400 font-bold mt-1 leading-tight">{step.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. RESPONSIBLE USE DOSAGE WIDGET */}
                {slugKey === 'responsible-use' && sec.anchor === 'dosage' && (
                  <div className="border border-pink-100 bg-[#fff8f3]/40 rounded-[32px] p-6 space-y-6 mt-6 animate-scale-up">
                    <div className="text-center space-y-1">
                      <span className="text-[8px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Interactive Planner</span>
                      <h4 className="text-xs font-black uppercase text-[#1b1533] logo-font">Dosage Advisor & Planner</h4>
                      <p className="text-[10px] text-slate-400 font-semibold leading-none">Determine your optimal dosage based on body weight and intended intent.</p>
                    </div>

                    <div className="space-y-4">
                      {/* Weight slider */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-black text-[#1b1533] uppercase logo-font">
                          <span>Body Weight</span>
                          <strong>{userWeight} lbs ({weightKg.toFixed(0)} kg)</strong>
                        </div>
                        <input 
                          type="range"
                          min="90"
                          max="260"
                          value={userWeight}
                          onChange={(e) => setUserWeight(Number(e.target.value))}
                          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#ff4fa3]"
                        />
                      </div>

                      {/* Intent selection buttons */}
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'micro', label: 'Microdose' },
                          { id: 'gentle', label: 'Gentle shift' },
                          { id: 'trip', label: 'Spiritual trip' }
                        ].map((intent) => (
                          <button
                            key={intent.id}
                            onClick={() => setUserIntent(intent.id as any)}
                            className={`rounded-xl border py-2.5 text-[9px] font-black uppercase tracking-wide logo-font transition-all ${
                              userIntent === intent.id
                                ? 'border-[#ff4fa3] bg-[#ff4fa3]/5 text-[#ff4fa3] shadow-sm'
                                : 'border-slate-200 bg-white text-slate-600 hover:border-pink-300'
                            }`}
                          >
                            {intent.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Result outputs */}
                    <div className="bg-white border border-slate-100 rounded-2xl p-5 text-left space-y-4">
                      <div className="grid grid-cols-2 gap-4 divide-x divide-slate-100">
                        <div>
                          <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Recommended Dose</span>
                          <strong className="block text-sm font-black text-[#ff4fa3] logo-font mt-2">
                            {doseRange.min.toFixed(2)}g - {doseRange.max.toFixed(2)}g
                          </strong>
                        </div>
                        <div className="pl-4">
                          <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Intended Outcome</span>
                          <span className="block text-[10.5px] font-bold text-slate-600 mt-2 leading-tight">
                            {doseRange.text}
                          </span>
                        </div>
                      </div>
                      <div className="border-t border-slate-100 pt-3">
                        <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Recommended Schedule</span>
                        <p className="text-[10px] font-semibold text-slate-500 mt-1">{scheduleText}</p>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            ))}
          </div>

          {/* Secure assurance banner at article bottom */}
          <div className="border border-pink-100 bg-[#fffdfd] rounded-[32px] p-6 flex items-start gap-4 shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-pink-50 flex items-center justify-center text-[#ff4fa3] shrink-0 mt-0.5">
              <Shield className="h-5.5 w-5.5" />
            </div>
            <div>
              <b className="block text-xs font-black text-[#1b1533] uppercase logo-font">Verified Official Dispensary Statement</b>
              <p className="text-[10.5px] text-slate-400 mt-1 font-semibold leading-relaxed">
                This document is certified by the FunGuyz compliance and client care departments. All regulations, policies, rates, and guides are actively verified and monitored to protect the anonymity and wellness of our clients.
              </p>
            </div>
          </div>

        </div>

      </section>

      {/* 3. Related Links Cards strip */}
      <section className="bg-white border-t border-b border-purple-100/30 py-16 px-4 md:px-8">
        <div className="mx-auto max-w-7xl text-center space-y-8">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Browse More</span>
            <h3 className="text-2xl font-black text-[#1b1533] uppercase logo-font">Explore Other Policy Chapters</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">Explore alternative compliance sheets, age restrictions, e-Transfer safety guides, and return policies.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-4">
            {RELATED_LINKS.filter(l => l.slug !== slugKey).slice(0, 4).map((link, idx) => (
              <div key={idx} className="bg-[#fff8f3]/30 border border-slate-100 rounded-[32px] p-5 shadow-sm flex flex-col justify-between items-start text-left gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all group">
                <div className="w-full flex justify-between items-start">
                  <div className="h-11 w-11 rounded-2xl bg-[#fff8f3] flex items-center justify-center text-2xl border border-slate-50">
                    📄
                  </div>
                  <span className="rounded-full border border-slate-200 px-2.5 py-0.5 text-[8.5px] font-bold uppercase tracking-widest text-slate-400 bg-white">
                    Policy
                  </span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-[8px] font-black uppercase text-slate-400 logo-font leading-none">Chapter</h4>
                  <h3 className="text-sm font-black text-[#1b1533] uppercase logo-font leading-tight truncate w-full">{link.label}</h3>
                  <p className="text-[9.5px] font-semibold text-slate-400 leading-normal line-clamp-3">Read authoritative terms, guidelines, and compliance maps under the official {link.label} statement.</p>
                </div>
                <a 
                  href={`/info/${link.slug}`}
                  className="w-full inline-flex items-center justify-center rounded-2xl bg-slate-50 text-slate-800 border border-slate-200/80 py-3 text-xs font-black uppercase tracking-wider group-hover:bg-[#ff4fa3] group-hover:text-white group-hover:border-[#ff4fa3] transition-all duration-200 cursor-pointer gap-1.5 logo-font"
                >
                  Read Policy <ChevronRight className="h-3.5 w-3.5 stroke-[2.5]" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Newsletter */}
      <Newsletter />

      <Footer />
    </main>
  );
}
