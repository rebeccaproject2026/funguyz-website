'use client';
import Link from 'next/link';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Newsletter } from '@/components/Newsletter';
import { useCart } from '@/context/CartContext';
import { 
  Sparkles, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Calendar,
  Clock,
  Sparkle,
  Smile,
  Brain,
  Zap,
  ArrowRight,
  Plus
} from 'lucide-react';

export default function MicrodoseGuidePage() {
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(0);
  const [activeProtocol, setActiveProtocol] = useState<'fadiman' | 'stamets'>('fadiman');
  const { addToCart } = useCart();

  // Calendar structures
  const fadimanDays = [
    { name: 'Mon', type: 'active', desc: 'Dose Day (0.1g)' },
    { name: 'Tue', type: 'rest', desc: 'Transition Day' },
    { name: 'Wed', type: 'rest', desc: 'Normal Day' },
    { name: 'Thu', type: 'active', desc: 'Dose Day (0.1g)' },
    { name: 'Fri', type: 'rest', desc: 'Transition Day' },
    { name: 'Sat', type: 'rest', desc: 'Normal Day' },
    { name: 'Sun', type: 'active', desc: 'Dose Day (0.1g)' }
  ];

  const stametsDays = [
    { name: 'Mon', type: 'active', desc: 'Dose Day (0.1g)' },
    { name: 'Tue', type: 'active', desc: 'Dose Day (0.1g)' },
    { name: 'Wed', type: 'active', desc: 'Dose Day (0.1g)' },
    { name: 'Thu', type: 'active', desc: 'Dose Day (0.1g)' },
    { name: 'Fri', type: 'rest', desc: 'Rest Day' },
    { name: 'Sat', type: 'rest', desc: 'Rest Day' },
    { name: 'Sun', type: 'rest', desc: 'Rest Day' }
  ];

  const activeDays = activeProtocol === 'fadiman' ? fadimanDays : stametsDays;

  return (
    <main className="bg-[#fff8f3] text-[#1b1533] min-h-screen selection:bg-[#ff4fa3] selection:text-white antialiased font-sans">
      <Header />

      {/* 1. Category-Style Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-tr from-[#fffbf8] via-[#fffcfb] to-[#fff3ec] border-b border-purple-100/50 py-16 px-4 md:px-8 min-h-[350px] flex items-center">
        <div className="absolute left-[5%] top-[10%] w-[300px] h-[300px] rounded-full bg-[#ffe8db]/30 blur-[90px] pointer-events-none" />
        <div className="absolute right-[5%] bottom-[5%] w-[300px] h-[300px] rounded-full bg-[#e0f2fe]/40 blur-[90px] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl relative z-10 grid gap-10 md:grid-cols-[1.3fr_1fr] items-center w-full">
          
          {/* Left Hero Block */}
          <div className="flex flex-col items-start text-left gap-4">
            
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-[12px] font-black uppercase tracking-widest text-slate-400 logo-font leading-none">
              <Link href="/" className="hover:text-[#ff4fa3] transition-colors">Home</Link>
              <span>&gt;</span>
              <Link href="/blog" className="hover:text-[#ff4fa3] transition-colors">Blog</Link>
              <span>&gt;</span>
              <span className="text-slate-600">Microdose Guide</span>
            </div>

            {/* Title */}
            <div className="space-y-1">
              <span className="text-[12px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Productivity & Flow</span>
              <h1 className="text-3xl md:text-5xl font-black text-[#1b1533] uppercase tracking-tight logo-font leading-none">
                The Art Of <br />
                <span className="text-[#ff4fa3]">Microdosing</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-xs md:text-sm font-semibold leading-relaxed text-slate-500 max-w-md">
              Learn how sub-perceptual psilocybin doses stimulate BDNF brain factors and optimize theta waves, and explore scheduling charts below.
            </p>

            <button 
              onClick={() => document.getElementById('protocol-planner-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-xs font-black uppercase tracking-wider text-[#ff4fa3] hover:text-black transition-colors duration-200 logo-font border-b-2 border-transparent hover:border-black pb-0.5"
            >
              Interactive Planner &rarr;
            </button>

          </div>

          {/* Right Hero Block */}
          <div className="relative flex justify-center items-center select-none animate-float hidden md:flex">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ff4fa3]/10 to-[#7b5cff]/15 rounded-[40px] rotate-3 scale-95 blur-sm" />
            <div className="relative bg-white/70 backdrop-blur-md border border-pink-100/60 rounded-[40px] p-6 shadow-[0_24px_70px_rgba(255,79,163,0.12)] max-w-xs text-left space-y-3">
              <Calendar className="h-6 w-6 text-[#ff4fa3]" />
              <h3 className="text-xs font-black uppercase text-[#1b1533] logo-font">Protocol Calendars</h3>
              <p className="text-[12px] font-semibold text-slate-400 leading-normal">
                Determine your optimal intake schedules using the verified Fadiman Protocol or the Stamets Stack.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Microdosing Benefits Cards */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="text-center space-y-2 mb-12 max-w-md mx-auto">
          <span className="text-[12px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Wellness Yield</span>
          <h2 className="text-2xl md:text-3xl font-black text-[#1b1533] uppercase logo-font">Microdose wellness Benefits</h2>
          <p className="text-xs text-slate-400 font-semibold">Sub-perceptual ingestion triggers profound, long-term cognitive and emotional improvements.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3 text-left">
          {[
            { title: 'Elevate Concentration', desc: 'Promotes sustained attention spans and flow states without jittery caffeine crashes.', icon: Brain },
            { title: 'Balance daily Stress', desc: 'Regulates hyperactive adrenaline glands to cultivate calm, mindful days.', icon: Smile },
            { title: 'Expand Lateral Thought', desc: 'Bypasses standard mental grooves to promote abstract, out-of-the-box ideas.', icon: Sparkle }
          ].map((benefit, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm hover:shadow-md transition-shadow relative group">
              <div className="h-10 w-10 rounded-xl bg-pink-50 flex items-center justify-center text-[#ff4fa3] shrink-0 mb-4">
                <benefit.icon className="h-5 w-5 stroke-[2.2]" />
              </div>
              <h3 className="text-xs font-black uppercase text-[#1b1533] logo-font mb-2">{benefit.title}</h3>
              <p className="text-[12px] font-semibold leading-relaxed text-slate-400">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Interactive Protocol Calendar Planner Widget */}
      <section id="protocol-planner-section" className="bg-gradient-to-tr from-[#fffbf8] to-[#fff3ec] border-t border-b border-purple-100/40 py-16 px-4">
        <div className="mx-auto max-w-4xl bg-white border border-pink-100/50 rounded-[44px] p-6 md:p-10 shadow-[0_32px_90px_rgba(255,79,163,0.07)] text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 h-44 w-44 rounded-full bg-[#ff4fa3]/5 blur-3xl pointer-events-none" />
          
          <div className="space-y-2 mb-8 max-w-md mx-auto">
            <span className="text-[12px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Interactive Planner</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#1b1533] uppercase logo-font">Protocol Calendar Planner</h2>
            <p className="text-xs text-slate-400 font-semibold leading-relaxed">Toggle between the two primary clinical microdosing blueprints to map your active days, transition days, and body rest cycles.</p>
          </div>

          {/* Toggle buttons */}
          <div className="flex justify-center gap-3 mb-8">
            <button
              onClick={() => setActiveProtocol('fadiman')}
              className={`rounded-2xl px-6 py-3 text-xs font-black uppercase tracking-wider logo-font transition-all border cursor-pointer ${
                activeProtocol === 'fadiman'
                  ? 'bg-[#ff4fa3] border-[#ff4fa3] text-white shadow-md shadow-pink-100'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-[#ff4fa3]'
              }`}
            >
              Fadiman Protocol
            </button>
            <button
              onClick={() => setActiveProtocol('stamets')}
              className={`rounded-2xl px-6 py-3 text-xs font-black uppercase tracking-wider logo-font transition-all border cursor-pointer ${
                activeProtocol === 'stamets'
                  ? 'bg-[#ff4fa3] border-[#ff4fa3] text-white shadow-md shadow-pink-100'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-[#ff4fa3]'
              }`}
            >
              Stamets Stack
            </button>
          </div>

          {/* Calendar Grid display */}
          <div className="grid grid-cols-7 gap-2 text-left mb-6">
            {activeDays.map((day, idx) => (
              <div 
                key={idx} 
                className={`border rounded-2xl p-3 flex flex-col justify-between h-28 transition-all ${
                  day.type === 'active'
                    ? 'border-[#ff4fa3] bg-[#ff4fa3]/5 text-[#ff4fa3] shadow-sm'
                    : 'border-slate-100 bg-[#fff8f3]/20 text-slate-400'
                }`}
              >
                <strong className={`text-[12px] font-black uppercase logo-font ${day.type === 'active' ? 'text-[#ff4fa3]' : 'text-slate-500'}`}>{day.name}</strong>
                <div className="mt-auto text-left">
                  <span className={`block text-[12px] font-black uppercase tracking-wider leading-none logo-font ${day.type === 'active' ? 'text-[#ff4fa3]' : 'text-slate-400'}`}>
                    {day.type === 'active' ? '⚡ Active' : '🕊️ Rest'}
                  </span>
                  <span className="block text-[12px] font-bold leading-tight mt-1 truncate">{day.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Protocol descriptions panel */}
          <div className="bg-[#fff8f3]/50 border border-pink-100/30 rounded-[32px] p-5 max-w-xl mx-auto text-left space-y-3">
            {activeProtocol === 'fadiman' ? (
              <div className="space-y-1">
                <strong className="block text-xs font-black text-[#1b1533] uppercase logo-font">Fadiman Protocol (1 On, 2 Off):</strong>
                <p className="text-[12px] font-semibold leading-relaxed text-slate-400">
                  Developed by Dr. James Fadiman. You consume a microdose on Day 1, experience sub-clinical residuals on Day 2, rest completely on Day 3, and repeat. Perfect for beginners to observe specific state contrasts.
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <strong className="block text-xs font-black text-[#1b1533] uppercase logo-font">Stamets Stack (4 On, 3 Off):</strong>
                <p className="text-[12px] font-semibold leading-relaxed text-slate-400">
                  Engineered by mycologist Paul Stamets. You microdose for 4 consecutive days (e.g. Mon-Thu) to accumulate cognitive focus factors, followed by 3 full days of rest (Fri-Sun) to reset serotonin receptor sensitivity.
                </p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 4. Best Products for Microdosing */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 text-center">
        <div className="space-y-2 mb-10 max-w-md mx-auto">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font border border-pink-100 bg-white px-3 py-1 rounded-full shadow-sm leading-none">Catalog Picks</span>
          <h2 className="text-2xl md:text-3xl font-black text-[#1b1533] uppercase logo-font mt-3">Best Stacking Products</h2>
          <p className="text-xs text-slate-400 font-semibold leading-relaxed font-semibold">Choose from our precisely formulated, tasteless vegetarian capsules and low-dose blends.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 text-left">
          {[
            { title: 'Focus & Clarity Capsules', desc: 'Blends GT psilocybin extract alongside Lion\'s Mane adaptogens.', price: '$31.99', img: '/images/prod_teacher_capsules.webp' },
            { title: 'Microdose Daily Blend', desc: 'Sub-perceptual daily capsules for general wellness & energy.', price: '$29.99', img: '/images/prod_daily_blend.webp' },
            { title: 'Stamets Stack Packs', desc: 'The Paul Stamets synergistic stack pre-packaged.', price: '$44.99', img: '/images/prod_daily_blend.webp' }
          ].map((prod, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-[36px] p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col justify-between items-start text-left gap-4 group">
              <div className="h-44 w-full bg-[#fff8f3]/60 rounded-2xl overflow-hidden flex items-center justify-center relative">
                <img src={prod.img} alt={prod.title} className="object-contain max-h-[140px] group-hover:scale-102 transition-transform duration-500" />
              </div>
              <div className="space-y-1.5 w-full">
                <span className="text-[12px] font-black text-[#ff4fa3] uppercase tracking-wider logo-font">Wellness</span>
                <h3 className="text-base font-black uppercase text-[#1b1533] logo-font truncate">{prod.title}</h3>
                <p className="text-[12px] font-semibold text-slate-400 leading-normal">{prod.desc}</p>
              </div>
              <div className="w-full pt-3 border-t border-slate-100 flex items-center justify-between">
                <strong className="text-sm font-black text-[#1b1533] logo-font">{prod.price}</strong>
                <button
                  onClick={() => addToCart({
                    title: prod.title,
                    category: 'Microdose',
                    price: prod.price,
                    imageSrc: prod.img
                  })}
                  className="rounded-xl bg-[#ff4fa3] text-white border border-[#ff4fa3] px-5 py-2 text-[12px] font-black uppercase tracking-wider hover:bg-black hover:text-[#ff4fa3] hover:border-black cursor-pointer transition-all logo-font flex items-center gap-1.5"
                >
                  <Plus className="h-3.5 w-3.5" /> Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Microdosing FAQ Accordion */}
      <section className="bg-white py-16 px-4 md:px-8 border-b border-purple-100/30">
        <div className="mx-auto max-w-4xl space-y-10 text-center">
          
          <div className="space-y-2">
            <span className="text-[12px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font leading-none">Protocol Help</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#1b1533] uppercase logo-font">Microdose Schedule FAQs</h2>
            <p className="text-xs text-slate-400 max-w-md mx-auto">Get detailed mycological answers regarding active compound integration and schedule plans.</p>
          </div>

          <div className="space-y-4 divide-y divide-purple-100/40 border border-purple-100/30 bg-[#fffdfb] rounded-3xl p-6 shadow-sm text-left">
            {[
              { q: 'Why is taking rest days in the schedule necessary?', a: 'Rest days are crucial. The human body quickly builds a tolerance to active psilocybin compounds. Taking scheduled rest days resets your serotonin receptors, keeping sub-perceptual microdoses fully effective over long durations.' },
              { q: 'What is the Stamets Stack recipe?', a: 'Paul Stamets stack integrates low-dose active psilocybin alongside Lion\'s Mane (for brain neurogenesis and cell health) and Niacin/Vitamin B3 (which aids active blood circulation to help direct adaptogens to peripheral nerve endings).' },
              { q: 'How long should a standard microdosing course last?', a: 'We recommend maintaining a protocol for 4 to 8 weeks, followed by a 2-week Integration Break. This allows you to carry focus and mood benefits forward into daily life while fully resetting tolerance.' }
            ].map((faq, idx) => (
              <div key={idx} className={`pt-4 first:pt-0 ${activeFaqIdx === idx ? 'pb-2' : ''}`}>
                <button
                  onClick={() => setActiveFaqIdx(activeFaqIdx === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left cursor-pointer group focus:outline-none py-1"
                >
                  <strong className="text-xs md:text-sm font-black text-[#1b1533] uppercase logo-font group-hover:text-[#ff4fa3] transition-colors flex items-center gap-2.5">
                    <HelpCircle className="h-4.5 w-4.5 text-[#ff4fa3] shrink-0 stroke-[2.2]" /> {faq.q}
                  </strong>
                  <ChevronDown className={`h-4.5 w-4.5 text-slate-400 group-hover:text-[#ff4fa3] transition-transform duration-300 shrink-0 stroke-[2.5] ${
                    activeFaqIdx === idx ? 'rotate-180' : ''
                  }`} />
                </button>
                <div className={`transition-all duration-300 overflow-hidden ${
                  activeFaqIdx === idx ? 'max-h-[300px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                }`}>
                  <p className="text-xs font-semibold leading-relaxed text-slate-500 pl-7 bg-white/40 p-3.5 rounded-xl border border-pink-50/20 shadow-inner">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Related Links Section */}
      <section className="bg-[#fff8f3] py-16 px-4 md:px-8">
        <div className="mx-auto max-w-7xl text-center space-y-8">
          <div className="space-y-2">
            <span className="text-[12px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Learn Suite</span>
            <h3 className="text-2xl font-black text-[#1b1533] uppercase logo-font">Related Guides & Stacks</h3>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { name: 'Beginner Guide', url: '/blog/beginner-guide', desc: 'Warm onboarding instructions & recommender quiz.', icon: '🌱' },
              { name: 'Mushroom Strains', url: '/blog/mushroom-strains', desc: 'Explore genetic histories and potency ranges.', icon: '🍄' },
              { name: 'Clinical Research', url: '/blog/research-and-studies', desc: 'Read active science and therapeutic abstracts.', icon: '🔬' }
            ].map((link, idx) => (
              <div key={idx} className="bg-white border border-slate-100 rounded-[32px] p-5 shadow-sm flex flex-col justify-between items-start text-left gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all group">
                <div className="h-11 w-11 rounded-2xl bg-[#fff8f3] flex items-center justify-center text-2xl border border-slate-50">
                  {link.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="text-[12px] font-black uppercase text-slate-400 logo-font leading-none">Learn</h4>
                  <h3 className="text-sm font-black text-[#1b1533] uppercase logo-font leading-tight">{link.name}</h3>
                  <p className="text-[12px] font-semibold text-slate-400 leading-relaxed line-clamp-3">{link.desc}</p>
                </div>
                <a 
                  href={link.url}
                  className="w-full inline-flex items-center justify-center rounded-2xl bg-slate-50 text-slate-800 border border-slate-200/80 py-3 text-xs font-black uppercase tracking-wider group-hover:bg-[#ff4fa3] group-hover:text-white group-hover:border-[#ff4fa3] transition-all duration-200 cursor-pointer gap-1.5 logo-font"
                >
                  Explore Guide <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Newsletter */}
      <Newsletter />

      <Footer />
    </main>
  );
}
