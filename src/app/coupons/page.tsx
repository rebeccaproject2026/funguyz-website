'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Sparkles, Ticket, Copy, Check, ShieldCheck, Star, Truck } from 'lucide-react';

const COUPONS = [
  {
    code: 'LAUNCH20',
    discount: '20% OFF',
    title: 'Grand Opening Special',
    description: 'Celebrate our new Canada-wide shipping and delivery website launch. 20% off your entire order!',
    expiry: 'Expires: Dec 31, 2026',
    terms: 'Cannot be combined with other active codes. Does not apply on bundles.',
    featured: true,
    icon: Star,
    gradient: 'from-[#ff4fa3] to-[#a855f7]',
    badge: '🔥 Most Popular',
  },
  {
    code: 'BULK25',
    discount: '25% OFF',
    title: 'Orders Over $500',
    description: 'Spend over $500 and unlock 25% off your entire cart. Perfect for stocking up.',
    expiry: 'Never Expires',
    terms: 'Minimum cart value of $500 required before tax and shipping. Does not apply on bundles.',
    featured: false,
    icon: Sparkles,
    gradient: 'from-[#f59e0b] to-[#ef4444]',
    badge: '💰 Big Saver',
  },
  {
    code: 'FREESHIP200',
    discount: 'FREE SHIPPING',
    discountLabel: true,
    title: 'Free Delivery Over $200',
    description: 'Enjoy free discreet delivery & shipping across Canada on orders over $200.',
    expiry: 'Never Expires',
    terms: 'Applies to orders with a subtotal of $200 or more before tax. Canada-wide. Does not apply on bundles.',
    featured: false,
    icon: Truck,
    gradient: 'from-[#10b981] to-[#059669]',
    badge: '🚚 Free Shipping',
  },
];

export default function CouponsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <main className="bg-[#fff8f3] text-[#1b1533] min-h-screen selection:bg-[#ff4fa3] selection:text-white antialiased font-sans">
      <Header />

      {/* Header Banner */}
      <section className="bg-gradient-to-tr from-[#fffdfb] via-[#fffbf9] to-[#fff5f0] border-b border-purple-100/50 py-16 px-4 md:px-8 text-center relative overflow-hidden">
        <div className="absolute left-[5%] top-[10%] w-[300px] h-[300px] rounded-full bg-[#ffe8db]/30 blur-[80px] pointer-events-none" />
        <div className="absolute right-[5%] bottom-[5%] w-[300px] h-[300px] rounded-full bg-[#e0f2fe]/40 blur-[80px] pointer-events-none" />
        
        <div className="mx-auto max-w-3xl relative z-10 flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#ff4fa3]/5 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#ff4fa3]">
            <Sparkles className="h-3 w-3" /> Exclusive Savings Hub
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#1b1533] uppercase logo-font" style={{ letterSpacing: '0.4em' }}>
            Active Promo Codes
          </h1>
          <p className="text-xs md:text-sm font-semibold leading-relaxed text-slate-500 max-w-xl">
            Save on your premium psilocybin experience. Copy any coupon code below and apply it during checkout for instant discounts.
          </p>

          {/* Exclusions Note */}
          <div className="mt-2 inline-flex items-center gap-2 bg-amber-50 border border-amber-200/60 rounded-xl px-4 py-2.5 text-[11px] font-semibold text-amber-700 max-w-lg text-center">
            <span className="text-base">⚠️</span>
            <span>Coupons <strong>do not apply</strong> on bundle products, sale items, or combined with other discount codes.</span>
          </div>
        </div>
      </section>

      {/* Coupons Grid Section */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-8">

        {/* Featured LAUNCH20 Card — Full width, extra prominent */}
        {COUPONS.filter(c => c.featured).map((coupon) => {
          const isCopied = copiedCode === coupon.code;
          const IconComp = coupon.icon;
          return (
            <div
              key={coupon.code}
              className="relative mb-8 rounded-[36px] overflow-hidden shadow-[0_24px_80px_rgba(255,79,163,0.2)] border-2 border-[#ff4fa3]/30"
            >
              {/* Dark gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e] via-[#2d0a3a] to-[#0f0620]" />
              {/* Glow orbs */}
              <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#ff4fa3]/20 blur-[60px] pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#7b5cff]/20 blur-[60px] pointer-events-none" />

              <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Left: Info */}
                <div className="flex-1 text-center md:text-left">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-1.5 bg-[#ff4fa3]/20 border border-[#ff4fa3]/30 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#ff4fa3] mb-4">
                    <span>{coupon.badge}</span>
                  </div>

                  {/* Discount Amount */}
                  <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                    <span className="text-5xl md:text-6xl font-black text-white logo-font leading-none drop-shadow-[0_0_30px_rgba(255,79,163,0.5)]">
                      {coupon.discount}
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-black text-white logo-font uppercase tracking-tight mb-2">
                    {coupon.title}
                  </h2>
                  <p className="text-sm font-semibold text-slate-300 leading-relaxed max-w-md">
                    {coupon.description}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-3 font-semibold">{coupon.expiry} &nbsp;·&nbsp; {coupon.terms}</p>
                </div>

                {/* Right: Code Copy */}
                <div className="flex flex-col items-center gap-4 shrink-0 w-full md:w-auto">
                  <div className="bg-white/5 border border-white/10 rounded-2xl px-8 py-4 text-center w-full md:w-56">
                    <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Coupon Code</span>
                    <strong className="block text-2xl font-black text-[#ff4fa3] tracking-[0.2em] logo-font">{coupon.code}</strong>
                  </div>
                  <button
                    onClick={() => handleCopy(coupon.code)}
                    className="w-full md:w-56 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#ff4fa3] to-[#a855f7] text-white py-4 text-xs font-black uppercase tracking-wider shadow-lg shadow-pink-500/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer gap-2 logo-font"
                  >
                    {isCopied ? (
                      <><Check className="h-4 w-4 stroke-[2.5]" /> Copied!</>
                    ) : (
                      <><Copy className="h-4 w-4" /> Copy Code</>
                    )}
                  </button>
                  <a
                    href="/shop"
                    className="w-full md:w-56 inline-flex items-center justify-center rounded-2xl bg-white/10 border border-white/20 text-white py-3.5 text-xs font-black uppercase tracking-wider hover:bg-white/20 transition-all cursor-pointer gap-2 logo-font"
                  >
                    Shop Now →
                  </a>
                </div>
              </div>
            </div>
          );
        })}

        {/* Rest of Coupons Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {COUPONS.filter(c => !c.featured).map((coupon) => {
            const isCopied = copiedCode === coupon.code;
            const IconComp = coupon.icon;
            return (
              <div
                key={coupon.code}
                className="bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md hover:border-pink-100 transition-all duration-300"
              >
                {/* Visual Accent Corner */}
                <div className="absolute right-0 top-0 w-16 h-16 bg-[#ff4fa3]/5 rounded-bl-[40px] transition-colors group-hover:bg-[#ff4fa3]/10" />

                {/* Badge */}
                <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                  <span>{coupon.badge}</span>
                </div>

                <div className="space-y-4">
                  {/* Discount Indicator */}
                  <div className="inline-flex items-center gap-2 logo-font leading-none">
                    <Ticket className="h-5.5 w-5.5 stroke-[2.2] text-[#ff4fa3] shrink-0" />
                    {coupon.discountLabel ? (
                      <span className="flex flex-col leading-tight font-black text-[20px]">
                        <span className="text-[#ff4fa3]">Free Delivery</span>
                        <span className="text-[#1b1533]">Free Shipping</span>
                      </span>
                    ) : (
                      <span className="text-[22px] font-black text-[#ff4fa3]">{coupon.discount}</span>
                    )}
                  </div>

                  {/* Title & Info */}
                  <div>
                    <h3 className="text-base font-black text-[#1b1533] logo-font uppercase tracking-tight">{coupon.title}</h3>
                    <p className="text-[12px] font-semibold text-slate-500 leading-relaxed mt-2">{coupon.description}</p>
                  </div>
                </div>

                {/* Code Copy & Action */}
                <div className="mt-8 pt-4 border-t border-slate-50 space-y-3">
                  <div className="flex items-center justify-between bg-[#fff8f3] rounded-2xl border border-pink-100/30 p-3.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Coupon Code</span>
                    <strong className="text-sm font-black text-[#ff4fa3] tracking-widest logo-font">{coupon.code}</strong>
                  </div>

                  <button
                    onClick={() => handleCopy(coupon.code)}
                    className="w-full inline-flex items-center justify-center rounded-2xl bg-[#ff4fa3] text-white border border-[#ff4fa3] py-3.5 text-xs font-black uppercase tracking-wider shadow-md shadow-pink-100 hover:bg-black hover:text-[#ff4fa3] hover:border-black transition-all duration-300 cursor-pointer gap-2 logo-font"
                  >
                    {isCopied ? (
                      <><Check className="h-4 w-4 stroke-[2.5]" /> Copied!</>
                    ) : (
                      <><Copy className="h-4 w-4" /> Copy Code</>
                    )}
                  </button>

                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 pl-1">
                    <span>{coupon.expiry}</span>
                    <span className="underline cursor-help hover:text-slate-600" title={coupon.terms}>Terms Apply</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Safety & Trust Banner */}
      <section className="mx-auto max-w-4xl px-4 pb-20 md:px-8">
        <div className="border border-pink-100 bg-[#fffdfd] rounded-[32px] p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm">
          <div className="h-14 w-14 rounded-2xl bg-pink-50 flex items-center justify-center text-[#ff4fa3] shrink-0">
            <ShieldCheck className="h-8 w-8 stroke-[1.8]" />
          </div>
          <div className="text-center md:text-left space-y-1">
            <h4 className="text-sm font-black text-[#1b1533] uppercase logo-font">100% Secure & Privacy Protected</h4>
            <p className="text-[12px] text-slate-400 font-semibold leading-relaxed">
              Discounts are processed instantly at checkout. We guarantee unmarked secure box packaging and direct courier deliveries across Canada with full privacy safeguards.
              <span className="block mt-1 text-amber-500 font-bold">⚠️ Coupons do not apply on bundle products, sale items, or when combined with other discount codes.</span>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

