'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Newsletter } from '@/components/Newsletter';
import { 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Package, 
  Truck, 
  Info, 
  CreditCard, 
  RotateCcw, 
  User, 
  HelpCircle,
  ShieldCheck
} from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
  category: string;
}

const ALL_FAQS: FAQItem[] = [
  // Orders
  {
    category: 'orders',
    q: 'How can I change or cancel my order?',
    a: 'Orders can be modified or cancelled within 1 hour of placing them. Please email hello@funguyz.ca with your Order ID and requested changes. Once our cleanroom packaging teams vacuum-seal your parcel, we are unable to make alterations.'
  },
  {
    category: 'orders',
    q: 'Will I receive an order confirmation email?',
    a: 'Yes, absolutely. The instant you complete your checkout, an encrypted invoice and confirmation email will be sent to your registered address. This email will contain your unique Order ID and payment verification steps.'
  },
  {
    category: 'orders',
    q: 'What should I do if my order is put on hold?',
    a: 'Orders are typically placed on hold while we await e-Transfer payment authorization. If you have already sent your Interac transaction, please verify that it was sent to pay@funguyz.ca and that your Order ID was specified in the payment memo.'
  },

  // Shipping
  {
    category: 'shipping',
    q: 'How discreet is the package delivery?',
    a: 'We guarantee 100% discretion. Every order is packed inside double vacuum-sealed, odorless medical-grade bags. These are placed inside unmarked, generic cardboard boxes or padded bubble mailers. There is zero reference to psilocybin, mushrooms, or FunGuyz on the exterior.'
  },
  {
    category: 'shipping',
    q: 'How long does shipping take across Canada?',
    a: 'We ship all national parcels via Canada Post Express Delivery, taking 1-3 business days depending on your location. For Greater Toronto (GTA) and Ottawa metropolitan areas, same-day local courier delivery is available for orders placed before 2:00 PM EST.'
  },
  {
    category: 'shipping',
    q: 'How much do shipping and delivery cost?',
    a: 'We offer a flat rate of $20.00 for both Canada Post Express Delivery (national shipping) and local courier same-day delivery (for GTA & Ottawa). Free shipping tiers are not active, keeping our flat-rate shipping insured and fully guaranteed.'
  },

  // Products
  {
    category: 'products',
    q: 'Are your mushroom flushes and edibles lab tested?',
    a: 'Yes, 100%. Every single harvest flush is batch-tested in certified laboratory facilities to guarantee precise active alkaloid concentrations, zero biological contaminants, and absolute raw genetic purity.'
  },
  {
    category: 'products',
    q: 'How should I store dried mushrooms to maintain potency?',
    a: 'Keep dried magic mushrooms inside airtight glass jars (like mason jars) or sealed vacuum bags, in a cool, dark, and dry environment. Storing them alongside silica desiccant packs inside a dark cupboard preserves potency for over 12 months.'
  },
  {
    category: 'products',
    q: 'What is microdosing and what routine should I follow?',
    a: 'Microdosing is the consumption of sub-perceptual amounts of psilocybin (50mg-250mg) to boost focus, neuroplasticity, and mood without visuals. We highly advocate for the Fadiman Protocol: 1 day active microdose followed by 2 days of rest.'
  },

  // Payments
  {
    category: 'payments',
    q: 'What secure payment methods do you accept?',
    a: 'To protect customer identity and banking security, we process orders strictly via secure Interac e-Transfer.'
  },
  {
    category: 'payments',
    q: 'How do I send my payment via Interac e-Transfer?',
    a: 'After checkout, send your e-Transfer to pay@funguyz.ca. Use your unique Order ID as the secure payment password. Once received, our automated systems instantly process the payment and clear your order for dispatch.'
  },
  {
    category: 'payments',
    q: 'Is my e-Transfer payment secure?',
    a: 'Yes. Interac e-Transfer is handled directly through your Canadian financial institution. We do not store or track any card numbers or raw bank details, keeping your transaction fully anonymous.'
  },

  // Returns
  {
    category: 'returns',
    q: 'What is your money-back guarantee policy?',
    a: 'Your health and satisfaction are our top priorities. If you are not completely thrilled with the quality or experience of your purchase, we offer a 100% money-back refund guarantee.'
  },
  {
    category: 'returns',
    q: 'Do I have to physically return the products?',
    a: 'No. Due to the sensitive biological nature of organic compounds, we never ask clients to physically return items. This maintains absolute customer safety, anonymity, and privacy.'
  },
  {
    category: 'returns',
    q: 'How long does a refund take to process?',
    a: 'Once approved, refunds are credited back to your account via Interac e-Transfer within 2 to 4 business days. Replacement packages are shipped immediately via express shipping.'
  },

  // Account
  {
    category: 'account',
    q: 'Is my account information safe with FunGuyz?',
    a: 'Absolutely. We maintain isolated servers and highly encrypted security databases. Customer addresses, email channels, and transaction histories are safeguarded and never shared with third-party networks.'
  },
  {
    category: 'account',
    q: 'Can I permanently delete my account and purchase records?',
    a: 'Yes. We respect your right to privacy. Simply send an email request to hello@funguyz.ca asking to purge your customer profile. Once verified, our database administrators will permanently delete all account traces and histories from our systems.'
  },
  {
    category: 'account',
    q: 'How do I earn and redeem wellness loyalty rewards?',
    a: 'Logged-in members automatically accumulate loyalty points with every dollar spent. These points can be redeemed during checkout for discount coupons, free compound gifts, or shipping upgrades.'
  }
];

const POPULAR_QUESTIONS = [
  'How discreet is the package delivery?',
  'How do I send my payment via Interac e-Transfer?',
  'What is your money-back guarantee policy?',
  'What is microdosing and what routine should I follow?'
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('orders');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  // Filter FAQs based on active category OR search query
  const filteredFAQs = ALL_FAQS.filter(faq => {
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      return faq.q.toLowerCase().includes(query) || faq.a.toLowerCase().includes(query);
    }
    return faq.category === activeCategory;
  });

  const categoriesList = [
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'shipping', label: 'Shipping', icon: Truck },
    { id: 'products', label: 'Products', icon: Info },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'returns', label: 'Returns', icon: RotateCcw },
    { id: 'account', label: 'Account', icon: User }
  ];

  const handlePopularClick = (questionText: string) => {
    setSearchQuery(questionText);
    setOpenIdx(0); // Open the first result of the search query
  };

  return (
    <main className="bg-[#fff8f3] text-[#1b1533] min-h-screen selection:bg-[#ff4fa3] selection:text-white antialiased font-sans">
      <Header />

      {/* 1. Category Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-tr from-[#fffbf8] via-[#fffcfb] to-[#fff3ec] border-b border-purple-100/50 py-16 px-4 md:px-8 min-h-[350px] flex items-center">
        {/* Faded Background Glows */}
        <div className="absolute left-[5%] top-[10%] w-[300px] h-[300px] rounded-full bg-[#ffe8db]/30 blur-[90px] pointer-events-none" />
        <div className="absolute right-[5%] bottom-[5%] w-[300px] h-[300px] rounded-full bg-[#e0f2fe]/40 blur-[90px] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl relative z-10 grid gap-10 md:grid-cols-[1.3fr_1fr] items-center w-full">
          
          {/* Left Side Content */}
          <div className="flex flex-col items-start text-left gap-4">
            
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 logo-font leading-none">
              <a href="/" className="hover:text-[#ff4fa3] transition-colors">Home</a>
              <span>&gt;</span>
              <span className="text-slate-600">FAQ</span>
            </div>

            {/* Title */}
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Support Database</span>
              <h1 className="text-3xl md:text-5xl font-black text-[#1b1533] uppercase tracking-tight logo-font leading-none">
                Frequently Asked <br />
                <span className="text-[#ff4fa3]">Questions</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-xs md:text-sm font-semibold leading-relaxed text-slate-500 max-w-md">
              Find instant, helpful answers regarding cleanroom order processing, double vacuum-sealed express delivery timelines, secure payments, and returns.
            </p>

            {/* Read More Mock Link */}
            <button 
              onClick={() => document.getElementById('faq-accordion-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-xs font-black uppercase tracking-wider text-[#ff4fa3] hover:text-black transition-colors duration-200 logo-font border-b-2 border-transparent hover:border-black pb-0.5"
            >
              Explore Accordions &rarr;
            </button>

          </div>

          {/* Right Side Visual Illustration */}
          <div className="relative flex justify-center items-center select-none animate-float hidden md:flex">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ff4fa3]/10 to-[#7b5cff]/15 rounded-[40px] rotate-3 scale-95 blur-sm" />
            
            <div className="relative bg-white/70 backdrop-blur-md border border-pink-100/60 rounded-[40px] p-8 shadow-[0_24px_70px_rgba(255,79,163,0.12)] text-left space-y-4 max-w-xs">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-[#ff4fa3] to-[#7b5cff] flex items-center justify-center text-white text-lg shadow-md shadow-pink-500/10">
                💡
              </div>
              <h3 className="text-sm font-black uppercase text-[#1b1533] logo-font">Need Quick Help?</h3>
              <p className="text-[10.5px] font-semibold text-slate-400 leading-normal">
                Use our dynamic search filters below to find detailed descriptions of active alkaloid test reports, payment passwords, and shipment security.
              </p>
              <div className="flex items-center gap-1.5 text-[9px] font-black uppercase text-[#ff4fa3] tracking-widest logo-font pt-2 border-t border-slate-100">
                <ShieldCheck className="h-3.5 w-3.5" /> 100% Encrypted Database
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Interactive FAQ Catalog & Live Search */}
      <section id="faq-accordion-section" className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        
        {/* Search Bar Widget */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-full px-5 py-3.5 focus-within:border-[#ff4fa3] focus-within:ring-4 focus-within:ring-pink-50/50 transition-all shadow-sm">
            <Search className="h-5 w-5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setOpenIdx(0); // auto-expand first match
              }}
              placeholder="Search our mycological FAQ database..."
              className="w-full bg-transparent text-xs md:text-sm font-semibold text-[#1b1533] outline-none placeholder:text-slate-400"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-[10px] font-black uppercase text-slate-400 hover:text-[#ff4fa3] logo-font px-2"
              >
                Clear
              </button>
            )}
          </div>

          {/* Popular Shortcuts */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-[10px] font-bold text-slate-400">
            <span>Try searching:</span>
            {POPULAR_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handlePopularClick(q)}
                className="bg-white border border-slate-200 rounded-full px-3 py-1 text-slate-600 hover:border-[#ff4fa3] hover:text-[#ff4fa3] transition-all cursor-pointer shadow-sm"
              >
                {q.length > 25 ? `${q.substring(0, 25)}...` : q}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Category Tabs selector (Only show when not searching) */}
        {!searchQuery && (
          <div className="flex gap-3 justify-center overflow-x-auto scrollbar-none flex-nowrap pb-4 border-b border-slate-100/50">
            {categoriesList.map(cat => {
              const CatIcon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setOpenIdx(0);
                  }}
                  className={`flex items-center gap-2 rounded-2xl px-5 py-3.5 text-xs font-black uppercase tracking-wider logo-font transition-all duration-200 cursor-pointer border ${
                    activeCategory === cat.id
                      ? 'bg-[#ff4fa3] border-[#ff4fa3] text-white shadow-md shadow-pink-100'
                      : 'bg-white border-slate-200 text-[#1b1533] shadow-sm hover:border-[#ff4fa3] hover:text-[#ff4fa3]'
                  }`}
                >
                  <CatIcon className="h-4 w-4 shrink-0" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Dynamic Search Header */}
        {searchQuery && (
          <div className="text-center mb-8">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Search Results</span>
            <h3 className="text-sm font-black uppercase text-slate-500 logo-font mt-1">
              Found {filteredFAQs.length} matching questions for "{searchQuery}"
            </h3>
          </div>
        )}

        {/* Dynamic Accordions Deck */}
        <div className="max-w-4xl mx-auto mt-10">
          <div className="bg-white border border-slate-100 rounded-[36px] p-6 md:p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100/50 pb-4 mb-4">
              <HelpCircle className="h-4.5 w-4.5 text-[#ff4fa3] shrink-0" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 logo-font">
                {searchQuery ? 'Matching Search' : `${activeCategory} Category`} Frequently Asked
              </span>
            </div>

            {filteredFAQs.length > 0 ? (
              <div className="space-y-4">
                {filteredFAQs.map((item, idx) => {
                  const isOpen = openIdx === idx;
                  return (
                    <div 
                      key={idx} 
                      className={`border rounded-2xl transition-all duration-300 ${
                        isOpen 
                          ? 'border-[#ff4fa3]/30 bg-pink-50/5 shadow-sm' 
                          : 'border-slate-100 hover:border-pink-100'
                      }`}
                    >
                      <button
                        onClick={() => setOpenIdx(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-5 text-xs md:text-sm font-black text-left uppercase text-[#1b1533] logo-font cursor-pointer select-none gap-4"
                      >
                        <span>{item.q}</span>
                        {isOpen ? (
                          <ChevronUp className="h-4.5 w-4.5 text-[#ff4fa3] shrink-0 stroke-[2.5]" />
                        ) : (
                          <ChevronDown className="h-4.5 w-4.5 text-slate-400 shrink-0 stroke-[2.5]" />
                        )}
                      </button>

                      <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        <p className="px-5 pb-5 text-xs md:text-sm font-semibold leading-relaxed text-slate-500 border-t border-slate-100/50 pt-3">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 space-y-3">
                <span className="text-3xl">🔍</span>
                <h4 className="text-sm font-black uppercase text-[#1b1533] logo-font">No Matching Questions Found</h4>
                <p className="text-xs text-slate-400 font-semibold max-w-xs mx-auto">Try checking your spelling or search another topic. You can also reach our customer support ticket system directly.</p>
              </div>
            )}
          </div>

          {/* Contact trigger link card */}
          <div className="border border-pink-100 bg-[#fffdfd] rounded-[32px] p-6 mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-start gap-4 text-left">
              <div className="h-10 w-10 rounded-xl bg-pink-50 flex items-center justify-center text-[#ff4fa3] shrink-0 mt-0.5">
                <ShieldCheck className="h-5.5 w-5.5" />
              </div>
              <div>
                <b className="block text-xs font-black text-[#1b1533] uppercase logo-font">Still Need Assistance?</b>
                <p className="text-[10px] text-slate-400 mt-1 font-semibold leading-relaxed">
                  Our dedicated mycological support specialists are online 7 days a week to guide your dosage plans, tracking code updates, and billing confirmations.
                </p>
              </div>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl bg-[#1b1533] text-white py-3.5 px-6 text-xs font-black uppercase tracking-wider hover:bg-[#ff4fa3] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer logo-font shrink-0"
            >
              Contact Support
            </a>
          </div>
        </div>

      </section>

      {/* 3. Newsletter Section */}
      <Newsletter />

      <Footer />
    </main>
  );
}
