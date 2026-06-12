'use client';
import Link from 'next/link';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Newsletter } from '@/components/Newsletter';
import {
  Sparkles,
  Calendar,
  Clock,
  User,
  ArrowRight,
  BookOpen,
  Smile,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface Article {
  title: string;
  desc: string;
  category: string;
  date: string;
  time: string;
  img: string;
  slug: string;
}

const ARTICLES_DATA: Article[] = [
  {
    title: 'Integrating Psychedelics: Bringing Insights Home',
    desc: 'How to successfully bridge the breakthroughs of a psilocybin trip into your daily relationships, career focus, and wellness goals. Integration maps are the absolute core of long-term healing.',
    category: 'Integrate',
    date: 'May 28, 2026',
    time: '6 min read',
    img: '/images/blog_4.webp',
    slug: 'integrating-your-psychedelic-experience'
  },
  {
    title: 'Mindset & Intention: The Set and Setting Blueprint',
    desc: 'Why aligning your internal emotional environment and external physical settings holds the key to avoiding negative visual sessions and achieving absolute peace.',
    category: 'Mindset',
    date: 'May 24, 2026',
    time: '5 min read',
    img: '/images/blog_3.webp',
    slug: 'setting-your-intentions:-psychedelic-journeys'
  },
  {
    title: 'Adrenal Recovery: Combating Burnout with Adaptogens',
    desc: 'Exploring how adaptogenic mushroom stacks (like Lion\'s Mane, Cordyceps, and Reishi) regulate cortisol pathways to combat physical fatigue and restore brain neurogenesis.',
    category: 'Recovery',
    date: 'May 18, 2026',
    time: '7 min read',
    img: '/images/blog_2.webp',
    slug: 'clinical-studies-microdosing-stress'
  },
  {
    title: 'Microdosing as a Morning Coffee Alternative',
    desc: 'Many high-performance professionals are trading caffeine for sub-perceptual microdoses to experience steady, jitter-free focus, cognitive clarity, and mental stamina.',
    category: 'Lifestyle',
    date: 'May 12, 2026',
    time: '5 min read',
    img: '/images/blog_1.webp',
    slug: 'the-art-of-microdosing:-a-beginner’s-guide'
  }
];

export default function WellnessArticlesPage() {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredArticles = activeTab === 'all'
    ? ARTICLES_DATA
    : ARTICLES_DATA.filter(a => a.category.toLowerCase() === activeTab.toLowerCase());

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
              <span className="text-slate-600">Wellness & Lifestyle</span>
            </div>

            {/* Title */}
            <div className="space-y-1">
              <span className="text-[12px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Mindset & Intention</span>
              <h1 className="text-3xl md:text-5xl font-black text-[#1b1533] uppercase tracking-tight logo-font leading-none">
                Wellness & <br />
                <span className="text-[#ff4fa3]">Lifestyle Hub</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-xs md:text-sm font-semibold leading-relaxed text-slate-500 max-w-md">
              Discover mental balance, stress regulation articles, and structured insights helping you bring mindful benefits into your active lifestyle.
            </p>

            <button
              onClick={() => document.getElementById('articles-grid-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-xs font-black uppercase tracking-wider text-[#ff4fa3] hover:text-black transition-colors duration-200 logo-font border-b-2 border-transparent hover:border-black pb-0.5"
            >
              Explore Articles &rarr;
            </button>

          </div>

          {/* Right Hero Block */}
          <div className="relative flex justify-center items-center select-none animate-float hidden md:flex">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ff4fa3]/10 to-[#7b5cff]/15 rounded-[40px] rotate-3 scale-95 blur-sm" />
            <div className="relative bg-white/70 backdrop-blur-md border border-pink-100/60 rounded-[40px] p-6 shadow-[0_24px_70px_rgba(255,79,163,0.12)] max-w-xs text-left space-y-3">
              <Smile className="h-6 w-6 text-[#ff4fa3]" />
              <h3 className="text-xs font-black uppercase text-[#1b1533] logo-font">Lifestyle Sync</h3>
              <p className="text-[12px] font-semibold text-slate-400 leading-normal">
                Structured tips mapping adrenal recovery, sleep quality, and calm workplace performance.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Highlighted Featured Article Banner */}
      <section className="mx-auto max-w-7xl px-4 pt-16 md:px-8">
        <div className="text-left mb-6">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font border border-pink-100 bg-white px-3 py-1 rounded-full shadow-sm">Featured wellness Read</span>
        </div>

        <div className="bg-white border border-slate-100 rounded-[44px] p-6 md:p-8 shadow-sm grid gap-8 lg:grid-cols-[1.2fr_1fr] items-center hover:shadow-md transition-shadow group">

          {/* Article Cover */}
          <div className="aspect-video w-full rounded-[32px] overflow-hidden bg-slate-100 shadow-sm relative">
            <img
              src={ARTICLES_DATA[0].img}
              alt={ARTICLES_DATA[0].title}
              className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-500"
            />
          </div>

          {/* Article details */}
          <div className="flex flex-col items-start gap-4 text-left">
            <span className="rounded bg-[#ff4fa3]/5 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#ff4fa3]">
              {ARTICLES_DATA[0].category}
            </span>
            <h2 className="text-xl md:text-3xl font-black uppercase tracking-tight text-[#1b1533] logo-font leading-tight">
              {ARTICLES_DATA[0].title}
            </h2>
            <p className="text-xs md:text-sm font-semibold leading-relaxed text-slate-400">
              {ARTICLES_DATA[0].desc}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-[12px] font-bold text-slate-400 border-b border-slate-100 pb-4 w-full">
              <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-[#ff4fa3]" /> {ARTICLES_DATA[0].date}</span>
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-[#ff4fa3]" /> {ARTICLES_DATA[0].time}</span>
              <span className="flex items-center gap-1"><User className="h-3.5 w-3.5 text-[#ff4fa3]" /> Wellness Team</span>
            </div>

            <Link
              href={`/blog/${ARTICLES_DATA[0].slug}`}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#ff4fa3] text-white py-3.5 px-6 text-xs font-black uppercase tracking-wider transition-all duration-200 hover:bg-black hover:text-[#ff4fa3] hover:border-black cursor-pointer logo-font shadow-sm shadow-pink-100"
            >
              Read Article <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </Link>
          </div>

        </div>
      </section>

      {/* 3. Article Grid with Category Tabs */}
      <section id="articles-grid-section" className="mx-auto max-w-7xl px-4 py-16 md:px-8">

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none flex-nowrap justify-center pb-8 border-b border-slate-100/50 mb-10">
          {['all', 'Integrate', 'Mindset', 'Recovery', 'Lifestyle'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-2xl px-5 py-2.5 text-xs font-black uppercase tracking-wider logo-font transition-all border cursor-pointer ${activeTab.toLowerCase() === tab.toLowerCase()
                ? 'bg-[#ff4fa3] border-[#ff4fa3] text-white shadow-md shadow-pink-100'
                : 'bg-white border-slate-200 text-slate-700 hover:border-[#ff4fa3]'
                }`}
            >
              {tab === 'all' ? 'All Articles' : `${tab}`}
            </button>
          ))}
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2">
          {filteredArticles.map((article, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-[32px] p-5 shadow-sm flex flex-col justify-between items-start text-left gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">

              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 relative">
                <img
                  src={article.img}
                  alt={article.title}
                  className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
              </div>

              <div className="space-y-2 w-full">
                <span className="inline-block rounded bg-[#ff4fa3]/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#ff4fa3]">
                  {article.category}
                </span>
                <h3 className="text-base font-black uppercase text-[#1b1533] logo-font leading-snug line-clamp-2 group-hover:text-[#ff4fa3] transition-colors">{article.title}</h3>
                <p className="text-[12px] font-semibold leading-relaxed text-slate-400 line-clamp-3">{article.desc}</p>
              </div>

              <div className="border-t border-slate-100 pt-4 mt-auto w-full flex items-center justify-between text-[12px] font-bold text-slate-400">
                <div className="flex gap-2">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.time}</span>
                </div>
                <Link
                  href={`/blog/${article.slug}`}
                  className="text-[12px] font-black uppercase tracking-wider text-[#ff4fa3] hover:underline logo-font flex items-center gap-1"
                >
                  Read Article <ChevronRight className="h-3 w-3 stroke-[2.5]" />
                </Link>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 4. Related Links Section */}
      <section className="bg-[#fff8f3] py-16 px-4 md:px-8 border-t border-purple-100/30">
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
                <Link
                  href={link.url}
                  className="w-full inline-flex items-center justify-center rounded-2xl bg-slate-50 text-slate-800 border border-slate-200/80 py-3 text-xs font-black uppercase tracking-wider group-hover:bg-[#ff4fa3] group-hover:text-white group-hover:border-[#ff4fa3] transition-all duration-200 cursor-pointer gap-1.5 logo-font"
                >
                  Explore Guide <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                </Link>
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
