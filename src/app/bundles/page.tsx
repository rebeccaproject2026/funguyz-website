'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Truck, 
  Star, 
  Smile, 
  Brain, 
  Compass, 
  Coffee, 
  Leaf, 
  ArrowRight, 
  HelpCircle, 
  Award, 
  Zap, 
  Package, 
  Gift,
  Check
} from 'lucide-react';

export default function BundlesCollectionPage() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // Cart interaction
  const { addToCart } = useCart();

  // Custom Build Your Own Bundle States
  const [buildMushroom, setBuildMushroom] = useState<{ name: string; price: number }>({ name: 'Golden Teacher', price: 40 });
  const [buildEdible, setBuildEdible] = useState<{ name: string; price: number }>({ name: 'Gummies', price: 25 });
  const [buildCapsule, setBuildCapsule] = useState<{ name: string; price: number }>({ name: 'Focus Capsules', price: 28 });
  const [buildMicrodose, setBuildMicrodose] = useState<{ name: string; price: number }>({ name: 'Daily Wellness', price: 26 });

  // Custom Bundle Price Calculations
  const buildSubtotal = buildMushroom.price + buildEdible.price + buildCapsule.price + buildMicrodose.price;
  const buildDiscount = buildSubtotal * 0.15; // 15% discount for building custom bundle
  const buildFinalPrice = buildSubtotal - buildDiscount;

  const handleAddCustomBundle = () => {
    addToCart({
      title: `Custom Bundle (${buildMushroom.name} + ${buildEdible.name} + ${buildCapsule.name} + ${buildMicrodose.name})`,
      category: 'Bundles',
      price: `$${buildFinalPrice.toFixed(2)}`,
      imageSrc: '/images/hero_composition.webp'
    });
  };

  return (
    <main className="bg-[#fff8f3] text-[#1b1533] min-h-screen selection:bg-[#ff4fa3] selection:text-white antialiased font-sans">
      <Header />

      {/* 1. Main Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-tr from-[#fffbf8] via-[#fffcfb] to-[#fff3ec] border-b border-purple-100/50 py-16 px-4 md:px-8">
        {/* Faded Background Glows */}
        <div className="absolute left-[5%] top-[10%] w-[300px] h-[300px] rounded-full bg-[#ffe8db]/30 blur-[90px] pointer-events-none" />
        <div className="absolute right-[5%] bottom-[5%] w-[300px] h-[300px] rounded-full bg-[#e0f2fe]/40 blur-[90px] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl relative z-10 grid gap-10 md:grid-cols-[1.2fr_1fr] items-center">
          
          {/* Left Side Hero Content */}
          <div className="flex flex-col items-start text-left gap-4">
            
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 logo-font leading-none">
              <a href="/" className="hover:text-[#ff4fa3] transition-colors">Home</a>
              <span>&gt;</span>
              <span className="text-slate-600">Bundles</span>
            </div>

            <h1 className="mt-2 text-4xl md:text-5xl font-black text-[#1b1533] uppercase leading-[0.95] tracking-tight logo-font">
              Save More With <br />
              <span className="text-[#ff4fa3]">Premium Bundles</span>
            </h1>
            
            <p className="text-xs md:text-sm font-semibold leading-relaxed text-slate-500 max-w-md">
              Hand-picked mushroom bundles designed for better value, convenience and variety. Curated compounds to secure the ultimate synergistic savings.
            </p>

            {/* Value Propositions / Benefits list */}
            <div className="grid gap-2.5 sm:grid-cols-3 w-full max-w-md mt-2">
              {[
                { label: 'Save Up To 25%', desc: '🔥 Extra Savings' },
                { label: 'Express Shipping', desc: '🚚 Fast Discreet Delivery' },
                { label: 'Most Popular Choice', desc: '⭐ Best Value' }
              ].map((prop, idx) => (
                <div key={idx} className="bg-white/80 border border-pink-100/30 rounded-xl p-2.5 shadow-sm text-left">
                  <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold leading-none">{prop.desc}</span>
                  <strong className="block text-[11px] font-black text-[#1b1533] logo-font mt-1.5 leading-none">{prop.label}</strong>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-4 w-full">
              <button
                onClick={() => document.getElementById('featured-bundles')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center rounded-2xl bg-[#ff4fa3] text-white border border-[#ff4fa3] px-8 py-3.5 text-xs font-black uppercase tracking-wider shadow-md shadow-pink-100 transition-all duration-300 hover:bg-black hover:text-[#ff4fa3] hover:border-black hover:-translate-y-0.5 active:translate-y-0 cursor-pointer gap-1.5 logo-font"
              >
                Shop Bundles <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </button>
              <button
                onClick={() => document.getElementById('build-bundle')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center rounded-2xl bg-white text-[#1b1533] border border-slate-200 hover:border-[#ff4fa3] px-8 py-3.5 text-xs font-black uppercase tracking-wider shadow-sm transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer logo-font"
              >
                Build Your Bundle
              </button>
            </div>

          </div>

          {/* Right Side: Visual FunGuyz Bundle Box */}
          <div className="relative flex justify-center items-center h-full w-full">
            {/* Floating compositions back circle glow */}
            <div className="absolute h-[320px] w-[320px] rounded-full bg-gradient-to-tr from-[#ff4fa3]/10 via-[#2fdfff]/10 to-[#7b5cff]/10 blur-3xl pointer-events-none animate-pulse" />
            
            {/* Premium contained delivery box container */}
            <div className="relative w-full max-w-[340px] aspect-square rounded-[40px] border border-white/60 bg-white/35 backdrop-blur-md p-6 shadow-2xl flex flex-col justify-between items-center overflow-hidden animate-float">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font border border-pink-100 bg-white/75 px-3 py-1 rounded-full shadow-sm">
                FunGuyz Box
              </span>
              
              {/* Floating miniature cards inside */}
              <div className="grid grid-cols-2 gap-3.5 w-full mt-4">
                {[
                  { label: 'Magic Mushrooms', icon: '🍄', bg: 'from-purple-500/5 to-purple-500/10' },
                  { label: 'Gummies', icon: '🍬', bg: 'from-pink-500/5 to-pink-500/10' },
                  { label: 'Capsules', icon: '💊', bg: 'from-cyan-500/5 to-cyan-500/10' },
                  { label: 'Microdose Products', icon: '⚡', bg: 'from-emerald-500/5 to-emerald-500/10' }
                ].map((elem, idx) => (
                  <div key={idx} className={`bg-gradient-to-tr ${elem.bg} border border-white/60 bg-white/70 rounded-2xl p-3 flex flex-col justify-center items-center text-center shadow-sm group hover:-translate-y-0.5 transition-transform`}>
                    <span className="text-2.5xl animate-bounce" style={{ animationDelay: `${idx * 0.15}s` }}>{elem.icon}</span>
                    <strong className="block text-[10px] font-black uppercase text-[#1b1533] logo-font mt-2 leading-none">{elem.label}</strong>
                  </div>
                ))}
              </div>

              {/* Secure seal stamp */}
              <div className="flex items-center gap-1 mt-4 text-[9px] font-bold text-slate-400">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Laboratory Pure Seals Included
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Trust Bar (4 Columns) */}
      <section className="bg-white border-b border-purple-100/30 py-6 px-4">
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:divide-x md:divide-purple-100/50">
          {[
            { val: 'Bundle Discounts', desc: '✓ Extra 15% - 25% Off' },
            { val: '$20.00 Flat Rate', desc: '✓ Fast Discreet Delivery' },
            { val: 'Lab Tested', desc: '✓ Guaranteed Pure Potency' },
            { val: 'Customer Favorites', desc: '✓ Highest Rated Curations' }
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center gap-1">
              <span className="text-sm md:text-base font-black text-[#1b1533] uppercase logo-font leading-none">{stat.val}</span>
              <span className="text-[10px] font-bold text-slate-400 mt-1">{stat.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Bundles Section */}
      <section id="featured-bundles" className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="text-center space-y-2 mb-12 max-w-md mx-auto">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Featured Packs</span>
          <h2 className="text-3xl font-black text-[#1b1533] uppercase logo-font">Shop Our Curated Stacks</h2>
          <p className="text-xs text-slate-400">Pre-packaged compound selections formulated by request to ensure maximum synergistic benefits and massive savings.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          
          {/* Starter Bundle */}
          <div className="bg-white border border-slate-100 rounded-[36px] p-6 shadow-sm flex flex-col justify-between items-start text-left gap-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative group">
            <span className="absolute left-6 top-6 bg-slate-50 border border-slate-100 text-slate-500 rounded-full px-3.5 py-1 text-[8.5px] font-black uppercase tracking-widest leading-none">
              Entry Level
            </span>
            <div className="w-full text-right">
              <span className="text-3xl">🌱</span>
            </div>

            <div className="space-y-1.5 w-full mt-4">
              <h3 className="text-xl font-black text-[#1b1533] uppercase logo-font leading-none">Starter Bundle</h3>
              <span className="block text-[10px] text-slate-400 font-bold uppercase">Perfect For Beginners</span>
              
              {/* Product Checklist */}
              <div className="pt-4 space-y-2 border-t border-slate-100/70 mt-4">
                {[
                  'Golden Teacher (Dried)',
                  'Blue Raspberry Gummies',
                  'Focus Wellness Capsules'
                ].map((prod, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>{prod}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full border-t border-slate-100/70 pt-4 flex items-baseline justify-between mt-auto">
              <div>
                <span className="block text-[8px] text-slate-400 font-black uppercase tracking-wider">Save 15%</span>
                <strong className="text-2xl font-black text-[#1b1533] logo-font">$149.00</strong>
              </div>
              <button
                onClick={() => addToCart({
                  title: 'Starter Bundle',
                  category: 'Bundles',
                  price: '$149.00',
                  imageSrc: '/images/hero_composition.webp'
                })}
                className="rounded-2xl bg-[#ff4fa3] text-white border border-[#ff4fa3] px-6 py-3 text-xs font-black uppercase tracking-wider transition-all duration-200 hover:bg-black hover:text-[#ff4fa3] hover:border-black cursor-pointer logo-font shadow-sm"
              >
                Buy Bundle
              </button>
            </div>
          </div>

          {/* Best Seller Bundle */}
          <div className="bg-white border-2 border-[#ff4fa3] rounded-[36px] p-6 shadow-md flex flex-col justify-between items-start text-left gap-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group">
            <span className="absolute left-6 top-6 bg-[#ff4fa3] text-white rounded-full px-3.5 py-1 text-[8.5px] font-black uppercase tracking-widest leading-none shadow-sm shadow-pink-100 flex items-center gap-1 animate-pulse">
              <Sparkles className="h-3 w-3 fill-current" /> Best Seller
            </span>
            <div className="w-full text-right">
              <span className="text-3xl">🔥</span>
            </div>

            <div className="space-y-1.5 w-full mt-4">
              <h3 className="text-xl font-black text-[#1b1533] uppercase logo-font leading-none">Best Seller Bundle</h3>
              <span className="block text-[10px] text-slate-400 font-bold uppercase">Customer Favorite Stack</span>
              
              {/* Product Checklist */}
              <div className="pt-4 space-y-2 border-t border-slate-100/70 mt-4">
                {[
                  'Golden Teacher (Dried)',
                  'Penis Envy (Dried)',
                  'Gummies (Infused)',
                  'Wellness Stacks (Capsules)'
                ].map((prod, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>{prod}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full border-t border-slate-100/70 pt-4 flex items-baseline justify-between mt-auto">
              <div>
                <span className="block text-[8px] text-slate-400 font-black uppercase tracking-wider">Save 20%</span>
                <strong className="text-2xl font-black text-[#ff4fa3] logo-font">$249.00</strong>
              </div>
              <button
                onClick={() => addToCart({
                  title: 'Best Seller Bundle',
                  category: 'Bundles',
                  price: '$249.00',
                  imageSrc: '/images/hero_composition.webp'
                })}
                className="rounded-2xl bg-[#ff4fa3] text-white border border-[#ff4fa3] px-6 py-3 text-xs font-black uppercase tracking-wider transition-all duration-200 hover:bg-black hover:text-[#ff4fa3] hover:border-black cursor-pointer logo-font shadow-md shadow-pink-100"
              >
                Buy Bundle
              </button>
            </div>
          </div>

          {/* Ultimate Bundle */}
          <div className="bg-white border border-slate-100 rounded-[36px] p-6 shadow-sm flex flex-col justify-between items-start text-left gap-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative group">
            <span className="absolute left-6 top-6 bg-[#7b5cff]/10 border border-[#7b5cff]/20 text-[#7b5cff] rounded-full px-3.5 py-1 text-[8.5px] font-black uppercase tracking-widest leading-none">
              👑 Premium Bundle
            </span>
            <div className="w-full text-right">
              <span className="text-3xl">✨</span>
            </div>

            <div className="space-y-1.5 w-full mt-4">
              <h3 className="text-xl font-black text-[#1b1533] uppercase logo-font leading-none">Ultimate Bundle</h3>
              <span className="block text-[10px] text-slate-400 font-bold uppercase">Maximum Compound Variety</span>
              
              {/* Product Checklist */}
              <div className="pt-4 space-y-2 border-t border-slate-100/70 mt-4">
                {[
                  'Multiple Dried Strains',
                  'Fruity Edibles (Gummies)',
                  'Cognitive Wellness Capsules',
                  'Daily Microdose Blends'
                ].map((prod, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>{prod}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full border-t border-slate-100/70 pt-4 flex items-baseline justify-between mt-auto">
              <div>
                <span className="block text-[8px] text-slate-400 font-black uppercase tracking-wider">Save 25%</span>
                <strong className="text-2xl font-black text-[#1b1533] logo-font">$399.00</strong>
              </div>
              <button
                onClick={() => addToCart({
                  title: 'Ultimate Bundle',
                  category: 'Bundles',
                  price: '$399.00',
                  imageSrc: '/images/hero_composition.webp'
                })}
                className="rounded-2xl bg-[#ff4fa3] text-white border border-[#ff4fa3] px-6 py-3 text-xs font-black uppercase tracking-wider transition-all duration-200 hover:bg-black hover:text-[#ff4fa3] hover:border-black cursor-pointer logo-font shadow-sm"
              >
                Buy Bundle
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Build Your Own Bundle Section (Large Interactive Section) */}
      <section id="build-bundle" className="mx-auto max-w-7xl px-4 py-16 md:px-8 border-t border-purple-100/30">
        
        <div className="text-center space-y-2 mb-12 max-w-md mx-auto">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Interactive Builder</span>
          <h2 className="text-3xl font-black text-[#1b1533] uppercase logo-font">Build Your Own Bundle</h2>
          <p className="text-xs text-slate-400">Design your perfect compounding routine. Select one product from each compounding block below and save a flat **15% off** the total sum!</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] items-start">
          
          {/* Left Steps Deck */}
          <div className="bg-white border border-slate-100 rounded-[32px] p-6 md:p-8 shadow-sm space-y-8 text-left">
            
            {/* Step 1: Choose Mushrooms */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-7 w-7 rounded-lg bg-[#ff4fa3]/5 text-[#ff4fa3] flex items-center justify-center text-xs font-black logo-font">1</span>
                <h3 className="text-base font-black text-[#1b1533] uppercase logo-font">Choose Strains (Mushrooms)</h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { name: 'Golden Teacher', price: 40, desc: 'Earthy, introspective favorite' },
                  { name: 'Penis Envy', price: 50, desc: 'Maximum potency visuals profile' },
                  { name: 'Blue Meanies', price: 45, desc: 'Highly potent energetic genetics' },
                  { name: 'Jack Frost', price: 48, desc: 'Rare clean crystals and euphoria' }
                ].map((opt) => (
                  <button
                    key={opt.name}
                    type="button"
                    onClick={() => setBuildMushroom({ name: opt.name, price: opt.price })}
                    className={`rounded-2xl border p-4 text-left cursor-pointer transition-all flex justify-between items-center ${
                      buildMushroom.name === opt.name
                        ? 'border-[#ff4fa3] bg-pink-50/10 shadow-sm'
                        : 'border-slate-100 hover:border-pink-300'
                    }`}
                  >
                    <div className="leading-tight">
                      <span className="block text-xs font-black uppercase text-[#1b1533] logo-font">{opt.name}</span>
                      <span className="block text-[9px] text-slate-400 font-semibold mt-0.5">{opt.desc}</span>
                    </div>
                    <strong className="text-emerald-600 text-xs font-black logo-font shrink-0 ml-2">+${opt.price}</strong>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Choose Edibles */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-7 w-7 rounded-lg bg-[#ff4fa3]/5 text-[#ff4fa3] flex items-center justify-center text-xs font-black logo-font">2</span>
                <h3 className="text-base font-black text-[#1b1533] uppercase logo-font">Choose Edibles</h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { name: 'Mushroom Gummies', price: 25 },
                  { name: 'Belgian Chocolate', price: 22 },
                  { name: 'Infused Chai Tea', price: 18 }
                ].map((opt) => (
                  <button
                    key={opt.name}
                    type="button"
                    onClick={() => setBuildEdible({ name: opt.name, price: opt.price })}
                    className={`rounded-2xl border p-4 text-left cursor-pointer transition-all flex flex-col justify-between items-start gap-3 h-28 ${
                      buildEdible.name === opt.name
                        ? 'border-[#ff4fa3] bg-pink-50/10 shadow-sm'
                        : 'border-slate-100 hover:border-pink-300'
                    }`}
                  >
                    <span className="block text-xs font-black uppercase text-[#1b1533] logo-font leading-tight">{opt.name}</span>
                    <strong className="text-emerald-600 text-xs font-black logo-font mt-auto">+${opt.price}</strong>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Choose Capsules */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-7 w-7 rounded-lg bg-[#ff4fa3]/5 text-[#ff4fa3] flex items-center justify-center text-xs font-black logo-font">3</span>
                <h3 className="text-base font-black text-[#1b1533] uppercase logo-font">Choose Wellness Capsules</h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { name: 'Focus Capsules', price: 28 },
                  { name: 'Energy Capsules', price: 28 },
                  { name: 'Relax Capsules', price: 30 }
                ].map((opt) => (
                  <button
                    key={opt.name}
                    type="button"
                    onClick={() => setBuildCapsule({ name: opt.name, price: opt.price })}
                    className={`rounded-2xl border p-4 text-left cursor-pointer transition-all flex flex-col justify-between items-start gap-3 h-28 ${
                      buildCapsule.name === opt.name
                        ? 'border-[#ff4fa3] bg-pink-50/10 shadow-sm'
                        : 'border-slate-100 hover:border-pink-300'
                    }`}
                  >
                    <span className="block text-xs font-black uppercase text-[#1b1533] logo-font leading-tight">{opt.name}</span>
                    <strong className="text-emerald-600 text-xs font-black logo-font mt-auto">+${opt.price}</strong>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Choose Microdose */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-7 w-7 rounded-lg bg-[#ff4fa3]/5 text-[#ff4fa3] flex items-center justify-center text-xs font-black logo-font">4</span>
                <h3 className="text-base font-black text-[#1b1533] uppercase logo-font">Choose Microdose Blends</h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { name: 'Daily Wellness', price: 26 },
                  { name: 'Creative Boost', price: 30 },
                  { name: 'Mood Support', price: 28 }
                ].map((opt) => (
                  <button
                    key={opt.name}
                    type="button"
                    onClick={() => setBuildMicrodose({ name: opt.name, price: opt.price })}
                    className={`rounded-2xl border p-4 text-left cursor-pointer transition-all flex flex-col justify-between items-start gap-3 h-28 ${
                      buildMicrodose.name === opt.name
                        ? 'border-[#ff4fa3] bg-pink-50/10 shadow-sm'
                        : 'border-slate-100 hover:border-pink-300'
                      }`}
                  >
                    <span className="block text-xs font-black uppercase text-[#1b1533] logo-font leading-tight">{opt.name}</span>
                    <strong className="text-emerald-600 text-xs font-black logo-font mt-auto">+${opt.price}</strong>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Side: Sticky Order Summary */}
          <div className="bg-white border border-slate-100 rounded-[32px] p-6 md:p-8 shadow-sm space-y-6 sticky top-24 text-left">
            <h3 className="text-lg font-black text-[#1b1533] uppercase logo-font border-b border-slate-100 pb-3">Your Custom Bundle</h3>
            
            <div className="space-y-3.5 divide-y divide-slate-50">
              
              {/* Selected Mushroom */}
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 pt-3 first:pt-0">
                <div>
                  <span className="block text-[8px] text-slate-400 font-bold uppercase">Step 1: Strains</span>
                  <strong className="text-slate-800 logo-font">{buildMushroom.name}</strong>
                </div>
                <strong className="text-slate-800 font-black">${buildMushroom.price.toFixed(2)}</strong>
              </div>

              {/* Selected Edible */}
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 pt-3">
                <div>
                  <span className="block text-[8px] text-slate-400 font-bold uppercase">Step 2: Edibles</span>
                  <strong className="text-slate-800 logo-font">{buildEdible.name}</strong>
                </div>
                <strong className="text-slate-800 font-black">${buildEdible.price.toFixed(2)}</strong>
              </div>

              {/* Selected Capsule */}
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 pt-3">
                <div>
                  <span className="block text-[8px] text-slate-400 font-bold uppercase">Step 3: Capsules</span>
                  <strong className="text-slate-800 logo-font">{buildCapsule.name}</strong>
                </div>
                <strong className="text-slate-800 font-black">${buildCapsule.price.toFixed(2)}</strong>
              </div>

              {/* Selected Microdose */}
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 pt-3">
                <div>
                  <span className="block text-[8px] text-slate-400 font-bold uppercase">Step 4: Microdosing</span>
                  <strong className="text-slate-800 logo-font">{buildMicrodose.name}</strong>
                </div>
                <strong className="text-slate-800 font-black">${buildMicrodose.price.toFixed(2)}</strong>
              </div>

            </div>

            {/* Price Calculations */}
            <div className="border-t border-slate-100 pt-6 space-y-3.5 text-xs font-bold text-slate-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <strong className="text-slate-800">${buildSubtotal.toFixed(2)}</strong>
              </div>
              <div className="flex justify-between text-[#ff4fa3]">
                <span>Bundle Discount (15% Off)</span>
                <strong>-${buildDiscount.toFixed(2)}</strong>
              </div>
              <div className="flex justify-between">
                <span>Discreet Shipping</span>
                <strong className="text-[#ff4fa3]">$20.00</strong>
              </div>
              <div className="border-t border-slate-100 pt-4 flex justify-between text-sm">
                <span className="text-slate-800 uppercase logo-font">Final Price</span>
                <strong className="text-[#ff4fa3] font-black logo-font text-base">${buildFinalPrice.toFixed(2)}</strong>
              </div>
            </div>

            {/* Add Custom Bundle CTA */}
            <button
              type="button"
              onClick={handleAddCustomBundle}
              className="w-full inline-flex items-center justify-center rounded-2xl bg-[#ff4fa3] text-white border border-[#ff4fa3] py-4 text-xs font-black uppercase tracking-wider shadow-md shadow-pink-100 transition-all duration-300 hover:bg-black hover:text-[#ff4fa3] hover:border-black hover:-translate-y-0.5 active:translate-y-0 cursor-pointer gap-2 logo-font mt-2"
            >
              <Gift className="h-4.5 w-4.5" /> Buy Custom Bundle
            </button>

          </div>

        </div>
      </section>

      {/* 5. Why Buy Bundles (6 Benefit Cards) */}
      <section className="bg-white border-t border-b border-purple-100/30 py-16 px-4 md:px-8">
        <div className="mx-auto max-w-7xl space-y-10 text-center">
          
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font leading-none">Synergy & Value</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#1b1533] uppercase logo-font">Why Buy Bundles?</h2>
            <p className="text-xs text-slate-400 max-w-md mx-auto">compounding different psilocybin methods elevates the therapeutic threshold while securing massive discounts.</p>
          </div>

          {/* 6 Benefit Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-left">
            {[
              { title: 'More Savings', desc: 'Save up to 25% off compared to purchasing each organic compound individually.', icon: Smile },
              { title: 'More Variety', desc: 'Test multiple dried strains, edibles, and capsules inside one secure parcel.', icon: Sparkles },
              { title: 'Discreet Shipping', desc: 'Secure guaranteed $20.00 Express Delivery with every bundle.', icon: Truck },
              { title: 'Exclusive Products', desc: 'Secure priority access to our rare, limited-run cultivation genetic batches.', icon: Compass },
              { title: 'Best Sellers Included', desc: 'Our curations strictly feature our highest rated customer favorite stacks.', icon: Award },
              { title: 'Beginner Friendly', desc: 'Carefully engineered stacks that offer highly safe, guided entry points.', icon: Leaf }
            ].map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="flex items-start gap-4 p-5 rounded-3xl bg-[#fff8f3] border border-pink-100/10 hover:border-pink-300/40 transition-colors shadow-sm">
                  <div className="h-10 w-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-[#ff4fa3] shrink-0 shadow-sm">
                    <Icon className="h-5 w-5 stroke-[2.2]" />
                  </div>
                  <div className="leading-tight text-left">
                    <h4 className="text-xs font-black uppercase text-[#1b1533] logo-font">{benefit.title}</h4>
                    <p className="text-[10.5px] font-semibold text-slate-400 mt-1.5 leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. Popular Bundle Combinations Section */}
      <section className="bg-gradient-to-tr from-[#fffdfc] to-[#fff7f2] py-16 border-b border-purple-100/30 px-4">
        <div className="mx-auto max-w-7xl space-y-6 text-left">
          <div className="space-y-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Trending Stacks</span>
            <h3 className="text-xl font-black text-[#1b1533] uppercase logo-font">Popular Bundle Combinations</h3>
          </div>

          {/* Horizontal scrollable flex deck */}
          <div className="flex gap-4 overflow-x-auto scrollbar-none pb-2">
            {[
              { name: 'Focus Bundle', items: 'Golden Teacher + Focus Capsules', price: '$79.99' },
              { name: 'Creative Bundle', items: 'Jack Frost + Edible Gummies', price: '$89.99' },
              { name: 'Weekend Bundle', items: 'Penis Envy + Belgian Chocolate', price: '$99.99' },
              { name: 'Wellness Bundle', items: 'Capsules + Daily Microdose', price: '$69.99' },
              { name: 'Explorer Bundle', items: 'Strains + Edibles + Capsules', price: '$159.99' }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="flex flex-col justify-between bg-white p-5 rounded-3xl border border-slate-100 shadow-sm shrink-0 min-w-[230px] group transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer"
                onClick={() => addToCart({
                  title: item.name,
                  category: 'Bundles',
                  price: item.price,
                  imageSrc: '/images/hero_composition.webp'
                })}
              >
                <div>
                  <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider leading-none">Pre-Packaged</span>
                  <strong className="block text-sm font-black text-[#1b1533] logo-font leading-snug mt-2">{item.name}</strong>
                  <span className="block text-[9.5px] text-slate-400 font-semibold mt-1.5 leading-relaxed">{item.items}</span>
                </div>
                <div className="flex items-center justify-between mt-6 pt-3 border-t border-slate-50 w-full">
                  <strong className="text-emerald-600 text-xs font-black logo-font">{item.price}</strong>
                  <span className="text-[9px] font-black text-[#ff4fa3] uppercase tracking-wider group-hover:underline">Quick Buy</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Customer Reviews Section */}
      <section className="bg-white py-16 border-b border-purple-100/30 px-4">
        <div className="mx-auto max-w-7xl space-y-10 text-center">
          
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Reviews</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#1b1533] uppercase logo-font">Verified Bundle Reviews</h2>
            <p className="text-xs text-slate-400 max-w-md mx-auto">Explore real compound synergy results and savings feedback from verified FunGuyz customers.</p>
          </div>

          {/* 3 Review Cards */}
          <div className="grid gap-6 md:grid-cols-3 text-left">
            {[
              { name: 'David K.', rate: 5, date: 'May 20, 2026', text: 'The Starter Bundle is absolute perfection. Golden Teacher dried strain for the weekends, and the capsules for my daily work flow. Saved almost $30 too! Extremely professional packaging.', label: 'Verified Buyer' },
              { name: 'Sarah L.', rate: 5, date: 'May 14, 2026', text: 'Got the Best Seller Bundle. Fast delivery, vacuum sealed, completely odorless. The Blue Raspberry Gummies are insanely tasty and onset is very steady.', label: 'Verified Buyer' },
              { name: 'Marcus R.', rate: 5, date: 'May 02, 2026', text: 'I build my own bundle every month now. Capsules + microdosing has completely replaced my morning energy drinks. High-end packaging and flat 15% discount makes it a no-brainer.', label: 'Verified Buyer' }
            ].map((rev, idx) => (
              <div key={idx} className="bg-[#fff8f3]/25 border border-pink-100/10 rounded-[32px] p-6 shadow-sm flex flex-col justify-between items-start gap-4">
                <div className="flex items-center justify-between w-full">
                  <div className="flex gap-0.5">
                    {Array.from({ length: rev.rate }).map((_, star) => (
                      <Star key={star} className="h-4 w-4 fill-current text-amber-400 stroke-none" />
                    ))}
                  </div>
                  <span className="text-[9px] font-black uppercase text-[#ff4fa3] logo-font bg-pink-50/50 px-2 py-0.5 rounded-full">{rev.label}</span>
                </div>

                <p className="text-xs text-slate-500 font-semibold leading-relaxed my-2">"{rev.text}"</p>

                <div className="border-t border-slate-100/50 pt-3 mt-auto w-full flex items-center justify-between text-[10px] font-bold text-slate-400">
                  <strong>{rev.name}</strong>
                  <span>{rev.date}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. Bundle Comparison Table Section */}
      <section className="bg-white py-16 px-4 md:px-8 border-b border-purple-100/30">
        <div className="mx-auto max-w-4xl space-y-8 text-center">
          
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Curation Grid</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#1b1533] uppercase logo-font">Compare Our Bundles</h2>
            <p className="text-xs text-slate-400">Compare products, savings, and prices across our pre-packaged curations to find your optimal stack.</p>
          </div>

          {/* Comparison Table */}
          <div className="bg-[#fffdfb] border border-purple-100/30 rounded-3xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse text-xs md:text-sm font-semibold">
              <thead>
                <tr className="bg-[#fff8f3] text-[#1b1533] uppercase logo-font border-b border-purple-100/30 text-[10px] tracking-wider font-black">
                  <th className="p-4">Bundle Tier</th>
                  <th className="p-4">Included Products</th>
                  <th className="p-4">Discount</th>
                  <th className="p-4 text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100/20">
                {[
                  { name: 'Starter Bundle', prods: 'Golden Teacher + Gummies + Focus Stacks', save: 'Save 15%', price: '$149.00' },
                  { name: 'Best Seller Bundle', prods: 'Golden Teacher + Penis Envy + Edibles + Capsules', save: 'Save 20%', price: '$249.00' },
                  { name: 'Ultimate Bundle', prods: 'Dried Strains + Gummies + Capsules + Microdose', save: 'Save 25%', price: '$399.00' }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 text-[#1b1533] font-black uppercase logo-font">{row.name}</td>
                    <td className="p-4 text-slate-500">{row.prods}</td>
                    <td className="p-4 text-[#ff4fa3] font-black uppercase">{row.save}</td>
                    <td className="p-4 text-right text-emerald-600 font-black logo-font">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* 9. Accordion FAQ Section */}
      <section className="bg-white py-16 px-4 md:px-8 border-b border-purple-100/30">
        <div className="mx-auto max-w-3xl space-y-8 text-center">
          
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Got Questions?</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#1b1533] uppercase logo-font">Bundle FAQ Section</h2>
            <p className="text-xs text-slate-400">Discover everything you need to know about customizing packages, active compound synergies, and discreet shipping.</p>
          </div>

          {/* Accordion list */}
          <div className="space-y-4 divide-y divide-purple-100/40 border border-purple-100/30 bg-[#fffdfb] rounded-3xl p-6 shadow-sm text-left">
            {[
              { q: 'How do bundle discounts work?', a: 'Our bundle discounts are automatically baked into the price, saving you between 15% and 25% compared to buying individual products.' },
              { q: 'Can I customize pre-packaged bundles?', a: 'Our three main featured bundles are pre-packaged to ensure lightning-fast courier dispatch. However, you can use our "Build Your Own Bundle" engine above to create a fully customized package tailored precisely to your goals.' },
              { q: 'What are the shipping charges for bundles?', a: 'All orders (including bundles) are shipped via a flat-rate discreet vacuum-sealed courier or Express service for $20.00 flat.' },
              { q: 'Can I replace products inside a pre-packaged bundle?', a: 'Pre-packaged bundles cannot be altered, but our "Build Your Own Bundle" tool gives you total freedom to swap mushrooms, edibles, capsules, and microdose compounds.' }
            ].map((faqItem, idx) => (
              <div key={idx} className={`pt-4 first:pt-0 ${openFaqIdx === idx ? 'pb-2' : ''}`}>
                <button
                  onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left cursor-pointer group focus:outline-none py-1"
                >
                  <strong className="text-xs md:text-sm font-black text-[#1b1533] uppercase logo-font group-hover:text-[#ff4fa3] transition-colors flex items-center gap-2.5">
                    <HelpCircle className="h-4.5 w-4.5 text-[#ff4fa3] shrink-0 stroke-[2.2]" /> {faqItem.q}
                  </strong>
                  <ChevronDown className={`h-4.5 w-4.5 text-slate-400 group-hover:text-[#ff4fa3] transition-transform duration-300 shrink-0 stroke-[2.5] ${
                    openFaqIdx === idx ? 'rotate-180' : ''
                  }`} />
                </button>
                <div className={`transition-all duration-300 overflow-hidden ${
                  openFaqIdx === idx ? 'max-h-[300px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                }`}>
                  <p className="text-xs font-semibold leading-relaxed text-slate-500 pl-7 bg-white/40 p-3.5 rounded-xl border border-pink-50/20 shadow-inner">
                    {faqItem.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. Related Categories Card Section */}
      <section className="bg-[#fff8f3] py-16 px-4 md:px-8 border-b border-purple-100/30">
        <div className="mx-auto max-w-7xl space-y-8 text-center">
          
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Browse More</span>
            <h3 className="text-2xl md:text-3xl font-black text-[#1b1533] uppercase logo-font">Explore Other Collections</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">Explore our laboratory-tested organic product catalogs, ranging from dried strains to daily wellness supplements.</p>
          </div>

          {/* Related categories grid */}
          <div className="grid gap-6 sm:grid-cols-4">
            {[
              { name: 'Magic Mushrooms', slug: 'magic-mushrooms', desc: 'Premium organic dried magic mushroom strains.', icon: '🍄', bg: 'bg-[#FF4fa3]/5 text-[#ff4fa3] border-[#ff4fa3]/20' },
              { name: 'Edibles', slug: 'edibles', desc: 'Delicious chocolate bars and premium gummies.', icon: '🍬', bg: 'bg-[#2FDFFF]/5 text-[#00b4d8] border-[#2FDFFF]/20' },
              { name: 'Capsules', slug: 'capsules', desc: 'Tasteless measured high-density capsules.', icon: '💊', bg: 'bg-[#7B5CFF]/5 text-[#7b5cff] border-[#7b5cff]/20' },
              { name: 'Microdose', slug: 'microdose', desc: 'Unleash your creative problem-solving potential.', icon: '⚡', bg: 'bg-[#FF4fa3]/5 text-[#ff4fa3] border-[#ff4fa3]/20' }
            ].map((relCat, idx) => (
              <div key={idx} className="bg-white border border-slate-100 rounded-[32px] p-5 shadow-sm flex flex-col justify-between items-start text-left gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all group">
                <div className="w-full flex justify-between items-start">
                  <div className="h-11 w-11 rounded-2xl bg-[#fff8f3] flex items-center justify-center text-2xl border border-slate-50">
                    {relCat.icon}
                  </div>
                  <span className={`rounded-full border px-2.5 py-0.5 text-[8.5px] font-bold uppercase tracking-widest ${relCat.bg}`}>
                    Active
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-black uppercase text-slate-400 leading-none logo-font">Collection</h4>
                  <h3 className="text-base font-black text-[#1b1533] uppercase logo-font leading-tight truncate">{relCat.name}</h3>
                  <p className="text-[10px] font-semibold text-slate-400 leading-relaxed line-clamp-3">{relCat.desc}</p>
                </div>

                <a 
                  href={`/category/${relCat.slug}`}
                  className="w-full inline-flex items-center justify-center rounded-2xl bg-slate-50 text-slate-800 border border-slate-200/80 py-3 text-xs font-black uppercase tracking-wider group-hover:bg-[#ff4fa3] group-hover:text-white group-hover:border-[#ff4fa3] transition-all duration-200 cursor-pointer gap-1.5 logo-font"
                >
                  Explore Catalog <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                </a>
              </div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
