'use client';
import Link from 'next/link';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Newsletter } from '@/components/Newsletter';
import { useCart } from '@/context/CartContext';
import { 
  Sparkles, 
  Search, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Award,
  Zap,
  Leaf,
  Plus,
  ArrowRight
} from 'lucide-react';

interface Strain {
  name: string;
  potency: 'mild' | 'high' | 'extreme';
  potencyPct: string;
  origin: string;
  visuals: string;
  mindset: string;
  desc: string;
  product: { name: string; price: string; img: string };
}

const STRAINS_DATA: Strain[] = [
  {
    name: 'Golden Teacher',
    potency: 'mild',
    potencyPct: 'Moderate (0.6% - 0.8% Psilocybin)',
    origin: 'Gulf Coast Region',
    visuals: 'Soft color trails, warm sensory enhancements.',
    mindset: 'Highly introspective, philosophical, calm.',
    desc: 'The gold standard for beginners and therapeutic stackers alike. Celebrated for its gentle entry and warm, philosophical guidance.',
    product: { name: 'Golden Teacher (Dried)', price: '$59.99', img: '/images/prod_golden_teacher.webp' }
  },
  {
    name: 'B+ Strain',
    potency: 'mild',
    potencyPct: 'Mild (0.5% - 0.7% Psilocybin)',
    origin: 'Unknown Botanical Origin',
    visuals: 'Gentle light glowing, warm environment shifts.',
    mindset: 'High-energy, social connectivity, warm smiles.',
    desc: 'Extremely popular for its balanced flushes and resilient genetics. Ideal for individuals seeking mood support without intense sensory shifts.',
    product: { name: 'B+ Strains (Dried)', price: '$49.99', img: '/images/prod_golden_teacher.webp' }
  },
  {
    name: 'Blue Meanies',
    potency: 'high',
    potencyPct: 'High (0.9% - 1.2% Psilocybin)',
    origin: 'Australian Genetics',
    visuals: 'Vibrant geometric shifts, color saturation.',
    mindset: 'Energetic rush, creativity flow, mild euphoria.',
    desc: 'Named after its severe blue bruising indicators. Delivers a punch of active psilocybin, ideal for experienced microdose focus plans.',
    product: { name: 'Blue Meanies (Dried)', price: '$64.99', img: '/images/prod_penis_envy.webp' }
  },
  {
    name: 'Jack Frost',
    potency: 'high',
    potencyPct: 'High (1.0% - 1.3% Psilocybin)',
    origin: 'Albino Mutation Cultivar',
    visuals: 'Beautiful crystal visual trails, sound synesthesia.',
    mindset: 'Transcendent, emotional clarity, clean meditation.',
    desc: 'A gorgeous flat albino mutation presenting pristine white caps. Provides a clean, visual-heavy session with low digestive tension.',
    product: { name: 'Jack Frost Strains (Dried)', price: '$69.99', img: '/images/prod_golden_teacher.webp' }
  },
  {
    name: 'Penis Envy',
    potency: 'extreme',
    potencyPct: 'Maximum (1.4% - 1.8% Psilocybin)',
    origin: 'Amazon Basin Mutant',
    visuals: 'Intense fractal geometry, deep visual projections.',
    mindset: 'Ego dissolution, absolute transcendence, heavy thoughts.',
    desc: 'Widely recognized as one of the most potent cultivars in existence. For experienced psychonauts seeking deep transformational journeys.',
    product: { name: 'Penis Envy (Dried)', price: '$79.99', img: '/images/prod_penis_envy.webp' }
  },
  {
    name: 'Albino Penis Envy (APE)',
    potency: 'extreme',
    potencyPct: 'Maximum (1.5% - 2.0% Psilocybin)',
    origin: 'PE x PF Albino Genetics',
    visuals: 'Maximum visual saturation, geometric architecture.',
    mindset: 'Deep space exploration, emotional breakthroughs.',
    desc: 'The albino cross-mutation of Penis Envy, presenting thick blue caps. Contains exceptionally high active compound density.',
    product: { name: 'Albino Penis Envy', price: '$84.99', img: '/images/prod_penis_envy.webp' }
  }
];

export default function MushroomStrainsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activePotency, setActivePotency] = useState<string>('all');
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(0);
  const { addToCart } = useCart();

  // Filter Strains based on potency and search
  const filteredStrains = STRAINS_DATA.filter(strain => {
    const matchesSearch = searchQuery.trim() === '' || 
      strain.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      strain.desc.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPotency = activePotency === 'all' || strain.potency === activePotency;
    return matchesSearch && matchesPotency;
  });

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
              <span className="text-slate-600">Strains Directory</span>
            </div>

            {/* Title */}
            <div className="space-y-1">
              <span className="text-[12px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Mycological Strains</span>
              <h1 className="text-3xl md:text-5xl font-black text-[#1b1533] uppercase tracking-tight logo-font leading-none">
                Explore Mushroom <br />
                <span className="text-[#ff4fa3]">Strains Directory</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-xs md:text-sm font-semibold leading-relaxed text-slate-500 max-w-md">
              Browse genetic origin records, active alkaloid ratings, and physiological effects across our premium organic dried magic mushroom flushes.
            </p>

            <button 
              onClick={() => document.getElementById('strains-directory-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-xs font-black uppercase tracking-wider text-[#ff4fa3] hover:text-black transition-colors duration-200 logo-font border-b-2 border-transparent hover:border-black pb-0.5"
            >
              Search Directory &rarr;
            </button>

          </div>

          {/* Right Hero Block */}
          <div className="relative flex justify-center items-center select-none animate-float hidden md:flex">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ff4fa3]/10 to-[#7b5cff]/15 rounded-[40px] rotate-3 scale-95 blur-sm" />
            <div className="relative bg-white/70 backdrop-blur-md border border-pink-100/60 rounded-[40px] p-6 shadow-[0_24px_70px_rgba(255,79,163,0.12)] max-w-xs text-left space-y-3">
              <Leaf className="h-6 w-6 text-[#ff4fa3]" />
              <h3 className="text-xs font-black uppercase text-[#1b1533] logo-font">Strain Genetics</h3>
              <p className="text-[12px] font-semibold text-slate-400 leading-normal">
                Double-tested organic flushes processed in sterile cleanrooms to preserve raw genetic potency.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Interactive Strain Catalog Section */}
      <section id="strains-directory-section" className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        
        {/* Search & Potency tab filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10">
          
          {/* Potency selectors */}
          <div className="flex gap-2 overflow-x-auto scrollbar-none flex-nowrap w-full md:w-auto pb-2 md:pb-0">
            {['all', 'mild', 'high', 'extreme'].map(p => (
              <button
                key={p}
                onClick={() => setActivePotency(p)}
                className={`rounded-2xl px-5 py-2.5 text-xs font-black uppercase tracking-wider logo-font transition-all border cursor-pointer ${
                  activePotency === p
                    ? 'bg-[#ff4fa3] border-[#ff4fa3] text-white shadow-md shadow-pink-100'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-[#ff4fa3]'
                }`}
              >
                {p === 'all' ? 'All Strains' : `${p} Potency`}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="w-full md:max-w-xs flex items-center gap-2.5 bg-white border border-slate-200 rounded-2xl px-4 py-2.5 focus-within:border-[#ff4fa3] transition-all shadow-sm">
            <Search className="h-4 w-4 text-slate-400 shrink-0" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search genetic logs..."
              className="w-full bg-transparent text-xs font-semibold text-[#1b1533] outline-none placeholder:text-slate-400"
            />
          </div>

        </div>

        {/* Dynamic Strain Cards Grid */}
        {filteredStrains.length > 0 ? (
          <div className="grid gap-8 lg:grid-cols-2 text-left">
            {filteredStrains.map((strain, idx) => (
              <div key={idx} className="bg-white border border-slate-100 rounded-[36px] p-6 md:p-8 shadow-sm flex flex-col justify-between items-start gap-6 hover:shadow-md transition-shadow relative overflow-hidden group">
                
                {/* Potency Badge */}
                <div className={`absolute top-6 right-6 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${
                  strain.potency === 'mild'
                    ? 'border-green-200 bg-green-50 text-green-600'
                    : strain.potency === 'high'
                    ? 'border-purple-200 bg-purple-50 text-purple-600'
                    : 'border-pink-200 bg-pink-50 text-pink-600'
                }`}>
                  {strain.potency} Potency
                </div>

                <div className="space-y-4 w-full">
                  <div className="space-y-1">
                    <span className="block text-[12px] font-black text-slate-400 uppercase tracking-widest">Strain Cultivar</span>
                    <h3 className="text-xl font-black text-[#1b1533] uppercase logo-font leading-none">{strain.name}</h3>
                    <p className="text-[12px] font-bold text-[#ff4fa3]">{strain.potencyPct}</p>
                  </div>

                  <p className="text-xs font-semibold leading-relaxed text-slate-400 border-b border-slate-50 pb-4">
                    {strain.desc}
                  </p>

                  {/* Strain characteristics list */}
                  <div className="grid gap-3 sm:grid-cols-3 text-left">
                    <div>
                      <span className="block text-[12px] font-black text-slate-400 uppercase tracking-widest">Origin</span>
                      <strong className="block text-[12px] font-bold text-slate-700 leading-tight mt-1 truncate">{strain.origin}</strong>
                    </div>
                    <div>
                      <span className="block text-[12px] font-black text-slate-400 uppercase tracking-widest">Visual Shifting</span>
                      <strong className="block text-[12px] font-bold text-slate-700 leading-tight mt-1 truncate" title={strain.visuals}>{strain.visuals}</strong>
                    </div>
                    <div>
                      <span className="block text-[12px] font-black text-slate-400 uppercase tracking-widest">Cognitive State</span>
                      <strong className="block text-[12px] font-bold text-slate-700 leading-tight mt-1 truncate" title={strain.mindset}>{strain.mindset}</strong>
                    </div>
                  </div>
                </div>

                {/* Integrated Product Card */}
                <div className="w-full bg-[#fff8f3]/60 border border-pink-100/10 rounded-2xl p-4 flex items-center justify-between gap-4 mt-2">
                  <div className="flex items-center gap-3">
                    <div className="h-14 w-14 bg-white rounded-xl overflow-hidden flex items-center justify-center border border-slate-100 shrink-0 relative">
                      <img src={strain.product.img} alt={strain.product.name} className="object-contain max-h-[44px]" />
                    </div>
                    <div>
                      <span className="block text-[12px] font-black text-[#ff4fa3] uppercase tracking-wider logo-font">Recommend crop</span>
                      <strong className="block text-xs font-black uppercase text-[#1b1533] logo-font leading-tight">{strain.product.name}</strong>
                      <span className="block text-[12px] text-slate-400 font-bold mt-1 leading-none">{strain.product.price}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      addToCart({
                        title: strain.product.name,
                        category: 'Magic Mushrooms',
                        price: strain.product.price,
                        imageSrc: strain.product.img
                      });
                    }}
                    className="rounded-xl bg-[#ff4fa3] text-white border border-[#ff4fa3] py-2.5 px-4 text-[12px] font-black uppercase tracking-wider hover:bg-black hover:text-[#ff4fa3] hover:border-black cursor-pointer transition-all logo-font flex items-center gap-1 shrink-0"
                  >
                    <Plus className="h-3.5 w-3.5" /> Quick Buy
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-slate-100 rounded-[36px] space-y-3">
            <span className="text-3xl">🔍</span>
            <h4 className="text-sm font-black uppercase text-[#1b1533] logo-font">No Strain Profiles Found</h4>
            <p className="text-xs text-slate-400 font-semibold max-w-xs mx-auto">Try clearing your filters or search another cultivar name.</p>
          </div>
        )}

      </section>

      {/* 3. Strains FAQ Accordion */}
      <section className="bg-white py-16 px-4 md:px-8 border-b border-purple-100/30">
        <div className="mx-auto max-w-4xl space-y-10 text-center">
          
          <div className="space-y-2">
            <span className="text-[12px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font leading-none">Strain Science</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#1b1533] uppercase logo-font">Strain Genetics FAQs</h2>
            <p className="text-xs text-slate-400 max-w-md mx-auto">Discover mycological answers regarding strain variations, alkaloid testing, and potency factors.</p>
          </div>

          <div className="space-y-4 divide-y divide-purple-100/40 border border-purple-100/30 bg-[#fffdfb] rounded-3xl p-6 shadow-sm text-left">
            {[
              { q: 'Why are Penis Envy strains significantly more potent?', a: 'Penis Envy (PE) genetics carry a distinct Amazonian mutation. This mutant cultivar holds a much slower spore drop cycle, allowing active flushes to concentrate up to 1.5x to 2x higher active psilocybin alkaloid density compared to standard cultivars like B+ or Golden Teacher.' },
              { q: 'How do visuals differ across mild, high, and extreme potency tiers?', a: 'Visual shifts depend on active compound volume. Mild strains trigger soft color enhancements and trailing lines. High strains introduce vibrant fractals and geometric breathing. Extreme strains (Ape/PE) can dissolve spatial barriers, resulting in absolute ego dissolution.' },
              { q: 'Are albino strains visually distinct?', a: 'Yes. Albino strains (e.g. Jack Frost, APER, APE) carry zero pigmentation due to PF genetic crosses. Their caps are pristine white with beautiful blue sorting margins, indicating extremely dense active psilocybin layers.' }
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

      {/* 4. Related Links Section */}
      <section className="bg-[#fff8f3] py-16 px-4 md:px-8">
        <div className="mx-auto max-w-7xl text-center space-y-8">
          <div className="space-y-2">
            <span className="text-[12px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Learn Suite</span>
            <h3 className="text-2xl font-black text-[#1b1533] uppercase logo-font">Related Guides & Stacks</h3>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { name: 'Beginner Guide', url: '/blog/beginner-guide', desc: 'Warm onboarding instructions & recommender quiz.', icon: '🌱' },
              { name: 'Microdose Guide', url: '/blog/microdose-guide', desc: 'Detailed protocol calendar blueprints.', icon: '⚡' },
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

      {/* 5. Newsletter */}
      <Newsletter />

      <Footer />
    </main>
  );
}
