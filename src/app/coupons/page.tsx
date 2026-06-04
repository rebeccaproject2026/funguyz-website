'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Sparkles, Ticket, Copy, Check, ShieldCheck } from 'lucide-react';

const COUPONS = [
  {
    code: 'FUN30',
    discount: '30% OFF',
    title: 'New Customer Welcome Deal',
    description: 'Get 30% off your very first magic mushroom order. Excludes bundles.',
    expiry: 'Never Expires',
    terms: 'Valid for new customers only. One use per account.'
  },
  {
    code: 'LAUNCH20',
    discount: '20% OFF',
    title: 'Grand Opening Special',
    description: 'Celebrate our new Canada-wide shipping and delivery options.',
    expiry: 'Expires: Dec 31, 2026',
    terms: 'Cannot be combined with other active codes.'
  },
  {
    code: 'SHROOMFREE',
    discount: 'FREE SHIPPING',
    title: 'Orders Over $150',
    description: 'Enjoy free discreet delivery across Canada on larger orders.',
    expiry: 'Never Expires',
    terms: 'Applies automatically at checkout for eligible totals.'
  }
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
        </div>
      </section>

      {/* Coupons Grid Section */}
      <section className="mx-auto max-w-5xl px-4 py-16 md:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {COUPONS.map((coupon) => {
            const isCopied = copiedCode === coupon.code;
            return (
              <div 
                key={coupon.code} 
                className="bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md hover:border-pink-100 transition-all duration-300"
              >
                {/* Visual Accent Corner */}
                <div className="absolute right-0 top-0 w-16 h-16 bg-[#ff4fa3]/5 rounded-bl-[40px] transition-colors group-hover:bg-[#ff4fa3]/10" />

                <div className="space-y-4">
                  {/* Discount Indicator */}
                  <div className="inline-flex items-center gap-1 text-[22px] font-black text-[#ff4fa3] logo-font leading-none">
                    <Ticket className="h-5.5 w-5.5 stroke-[2.2] text-[#ff4fa3]" />
                    <span>{coupon.discount}</span>
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
                      <>
                        <Check className="h-4 w-4 stroke-[2.5]" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" /> Copy Code
                      </>
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
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
