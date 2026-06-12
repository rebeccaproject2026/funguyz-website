'use client';
import Link from 'next/link';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  Bookmark, 
  ChevronRight, 
  ArrowLeft,
  BookOpen
} from 'lucide-react';

const blogPostsData = [
  {
    title: 'Magic Mushrooms 101: A Beginner\'s Guide',
    desc: 'Understand the dosage, effects, and benefits before your first journey.',
    category: 'Guides',
    date: 'May 10, 2026',
    time: '5 min read',
    image: '/images/blog_1.webp',
  },
  {
    title: 'How Edibles Work: What You Need to Know',
    desc: 'Why edibles feel different and how long the peak effects typically last.',
    category: 'Edibles',
    date: 'May 6, 2026',
    time: '6 min read',
    image: '/images/blog_2.webp',
  },
  {
    title: 'Microdosing Benefits For Daily Wellness',
    desc: 'Discover why thousands of professionals are microdosing for focus.',
    category: 'Research',
    date: 'May 2, 2026',
    time: '5 min read',
    image: '/images/blog_3.webp',
  },
  {
    title: 'Different Mushroom Strains And Their Effects',
    desc: 'From Golden Teacher to Penis Envy - find the perfect strain for you.',
    category: 'Strains',
    date: 'Apr 28, 2026',
    time: '7 min read',
    image: '/images/blog_4.webp',
  },
  {
    title: 'The Ultimate Guide to Mushroom Tea Brewing',
    desc: 'Learn how to brew a perfect cup of soothing mushroom tea at home easily.',
    category: 'Recipes',
    date: 'Apr 24, 2026',
    time: '4 min read',
    image: '/images/blog_1.webp',
  },
  {
    title: 'Psilocybin and Neuroplasticity: The Science',
    desc: 'How magic mushrooms stimulate new neural pathways and connections in the brain.',
    category: 'Science',
    date: 'Apr 20, 2026',
    time: '8 min read',
    image: '/images/blog_2.webp',
  },
  {
    title: 'Setting Your Intentions: Psychedelic Journeys',
    desc: 'Why set and setting are crucial for a positive and transformational experience.',
    category: 'Mindset',
    date: 'Apr 15, 2026',
    time: '6 min read',
    image: '/images/blog_3.webp',
  },
  {
    title: 'Integrating Your Psychedelic Experience',
    desc: 'Essential tips for carrying the insights of your journey into everyday life.',
    category: 'Therapy',
    date: 'Apr 10, 2026',
    time: '5 min read',
    image: '/images/blog_4.webp',
  },
  {
    title: 'The Art of Microdosing: A Beginner’s Guide',
    desc: 'Everything you need to know about starting a sub-perceptual psilocybin microdose ritual safely.',
    category: 'Guides',
    date: 'Apr 28, 2026',
    time: '4 min read',
    image: '/images/blog_1.webp',
  },
  {
    title: 'A Deep Dive Into Golden Teacher Strains',
    desc: 'Exploring the genetic origin, potency characteristics, and spiritual introspection profiles of the beloved Golden Teacher.',
    category: 'Guides',
    date: 'May 05, 2026',
    time: '7 min read',
    image: '/images/blog_1.webp',
  },
  {
    title: 'Clinical Studies on Microdosing & Stress',
    desc: 'Reviewing recent clinical research abstracts demonstrating psilocybin efficacy in regulating cortisol levels.',
    category: 'Science',
    date: 'Apr 28, 2026',
    time: '9 min read',
    image: '/images/blog_2.webp',
  }
];

export default function BlogDetailsClient({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  const normalizedSlug = decodeURIComponent(slug).toLowerCase();
  let post = blogPostsData.find(p => p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === normalizedSlug || (p as any).slug === normalizedSlug);
  if (!post) {
    post = blogPostsData[0]; // Fallback to first post
  }

  return (
    <main className="bg-[#fff8f3] text-[#1b1533] min-h-screen selection:bg-[#ff4fa3] selection:text-white antialiased">
      <Header />

      {/* Breadcrumbs Row */}
      <div className="bg-slate-50 border-b border-slate-100/50 py-3.5 px-4 md:px-8 text-xs font-bold text-slate-400 select-none">
        <div className="mx-auto max-w-7xl flex items-center gap-2">
          <Link href="/" className="hover:text-[#ff4fa3]">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/blog" className="hover:text-[#ff4fa3]">Blog</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-600 truncate max-w-xs">{post.title}</span>
        </div>
      </div>

      {/* Article Details Container */}
      <article className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        
        {/* Back Link */}
        <a 
          href="/blog" 
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#ff4fa3] hover:text-black mb-8 transition-colors duration-200 logo-font"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Research Hub
        </a>

        {/* Hero Metadata */}
        <div className="space-y-4">
          <span className="inline-block rounded bg-[#ff4fa3]/5 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#ff4fa3] shadow-sm">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-[#1b1533] uppercase leading-tight logo-font">
            {post.title}
          </h1>

          {/* Metadata Badges Row */}
          <div className="flex flex-wrap items-center gap-6 text-slate-400 text-xs font-semibold border-b border-slate-100 pb-6">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-[#ff4fa3]" /> {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-[#ff4fa3]" /> {post.time}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4 text-[#ff4fa3]" /> Cultivation Expert
            </span>
            
            {/* Social Share & Bookmark Controls */}
            <div className="ml-auto flex items-center gap-3">
              <button 
                onClick={() => {
                  setBookmarked(!bookmarked);
                  alert(bookmarked ? 'Bookmark removed.' : 'Article bookmarked successfully!');
                }}
                className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                  bookmarked 
                    ? 'bg-pink-50 border-pink-100 text-[#ff4fa3]' 
                    : 'bg-white border-slate-200 text-slate-400 hover:text-[#ff4fa3]'
                }`}
              >
                <Bookmark className="h-4.5 w-4.5" />
              </button>
              <button 
                onClick={() => alert('Article link copied to clipboard!')}
                className="p-1.5 rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-[#ff4fa3] transition-all cursor-pointer"
              >
                <Share2 className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Full-width Cover Image */}
        <div className="mt-8 aspect-video w-full overflow-hidden rounded-[32px] border border-slate-100 bg-slate-100 shadow-sm relative">
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
        </div>

        {/* Dynamic Rich-text Reading Body */}
        <div className="mt-10 space-y-6 text-xs md:text-sm font-semibold text-slate-500 leading-relaxed max-w-3xl">
          <p className="text-[#1b1533] text-sm md:text-base font-black leading-relaxed">
            {post.desc} In this detailed clinical research summary, we unpack the practical applications, modern dosage frameworks, and long-term neurological impacts of this active protocol.
          </p>

          <h2 className="text-xl font-black text-[#1b1533] uppercase logo-font pt-4">1. Understanding the Botanical Genetics</h2>
          <p>
            The botanical strains of psilocybe cubensis (such as the Golden Teacher or Penis Envy) carry specific active chemical alkaloids that interact directly with the serotonin receptors in the prefrontal cortex of the human brain. This interaction is responsible for cellular-level cognitive alterations, synesthesia, and deep neurochemical adjustments.
          </p>

          <blockquote className="border-l-4 border-[#ff4fa3] bg-[#fffdfd] p-5 rounded-r-2xl font-medium italic text-[#1b1533]/85 shadow-sm">
            "Microdosing psilocybin has proven effective in increasing daily focus, raising theta-wave brain cycles, and reducing sub-clinical symptoms of anxiety and depressive stress cycles."
          </blockquote>

          <h2 className="text-xl font-black text-[#1b1533] uppercase logo-font pt-4">2. Safe Practice and Intention Setting</h2>
          <p>
            When utilizing active natural supplements, setting your explicit intent, surrounding yourself in a safe, stress-free environment (the set and setting principle), and maintaining a detailed microdose log are essential metrics to achieve a transformative, long-term cognitive upgrade.
          </p>
          <p>
            All products supplied by FunGuyz operate with the highest standards of safety. We recommend starting with a standard Fadiman Protocol: one day of microdosing followed by two days of rest to maintain absolute botanical balance.
          </p>
        </div>

        {/* Author Bio Card */}
        <div className="mt-16 bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm flex items-center gap-4">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-tr from-[#ff4fa3] to-[#7b5cff] font-extrabold text-white text-lg">
            🍄
          </span>
          <div>
            <span className="text-[12px] font-black uppercase tracking-widest text-[#ff4fa3]">Written By</span>
            <b className="block text-sm font-black text-[#1b1533] uppercase logo-font mt-0.5">FunGuyz Mycological Team</b>
            <p className="text-[12px] text-slate-400 mt-1 font-semibold leading-relaxed">
              Our clinical research mycologists publish regular science-backed guides regarding microdosing protocols, psilocybin studies, and wellness applications.
            </p>
          </div>
        </div>

      </article>

      <Footer />
    </main>
  );
}
