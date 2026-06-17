'use client';
import Link from 'next/link';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

import React, { useState, useRef } from 'react';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  Gift,
  Headphones,
  HeartPulse,
  Leaf,
  Lock,
  PackageCheck,
  ShieldCheck,
  Smile,
  Sparkles,
  Star,
  Truck,
  Zap,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { MushroomLoader } from '@/components/MushroomLoader';


const categoryImages: Record<string, string> = {
  'Magic Mushrooms': '/images/cat_mushrooms.webp',
  'Edibles': '/images/cat_edibles.webp',
  'Capsules': '/images/cat_capsules.webp',
  'Microdose': '/images/cat_microdose.webp',
};

const categoryGradients: Record<string, string> = {
  'Magic Mushrooms': 'from-[#f3efff] to-white border-[#eadff8]',
  'Edibles': 'from-[#fff0f6] to-white border-[#ffe3e3]',
  'Capsules': 'from-[#eef9ff] to-white border-[#e0f2fe]',
  'Microdose': 'from-[#f0fdf4] to-white border-[#dcfce7]',
};

const benefitCards = [
  ['Enhances Mood', 'Promotes happiness, positivity and mental clarity', Smile],
  ['Boosts Creativity', 'Unlocks creative potential and divergent thinking', Sparkles],
  ['Reduces Stress', 'Helps your nervous system relax and unwind', Leaf],
  ['Improves Focus', 'Sharpen your mind, flow state and concentration', Zap],
  ['Mindful Living', 'Supports mindfulness, connection and inner peace', HeartPulse],
  ['Natural & Safe', '100% organic, lab tested pure products', ShieldCheck],
];

// Removed static blogPosts array as it is now fetched from the database

const faqs = [
  {
    q: 'Are your products legal in Canada?',
    a: 'Our products are shipped discreetly and safely across Canada. While the legal landscape is evolving, we operate with strict quality control and customer privacy as our top priorities.',
  },
  {
    q: 'How long does shipping take?',
    a: 'We offer fast shipping across Canada. Orders typically arrive in 2-4 business days, depending on your location. All orders are provided with a tracking number.',
  },
  {
    q: 'Is my order discreet?',
    a: 'Yes, absolutely. We use plain, vacuum-sealed packaging with no external branding or reference to mushrooms. Your privacy is 100% secure.',
  },
  {
    q: 'How should I store my products?',
    a: 'Keep dried mushrooms and edibles in a cool, dark, dry place. Capsules and tinctures should also be kept away from direct sunlight.',
  },
  {
    q: 'Do you offer refunds?',
    a: 'We stand by the quality of our products. If you are not completely satisfied, please contact our support team within 7 days and we will make it right.',
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeReview, setActiveReview] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [bestSellersSwiper, setBestSellersSwiper] = useState<any>(null);
  const bestSellersRef = useRef<HTMLDivElement>(null);

  const { data: prodData, isLoading: isLoadingProducts } = useSWR('/api/products', fetcher);
  const { data: catData } = useSWR('/api/categories', fetcher);
  const { data: blogData } = useSWR('/api/blogs', fetcher);

  const dbProducts = prodData?.success ? prodData.products : [];
  const dbCategories = catData?.success ? catData.categories : [];
  const dbBlogs = blogData?.success ? blogData.blogs : [];

  // Use DB products for rendering
  const displayProducts = dbProducts;


  const reviews = [
    {
      name: 'Jake M.',
      tag: 'Verified Buyer',
      text: 'Best quality products I have tried so far. Everything was fresh, vacuum-sealed and arrived super fast. Customer support helped me with dosage recommendations. Highly recommended!',
      rating: 5,
      avatar: 'J',
      gradient: 'from-[#ff4fa3] to-[#e03b87]'
    },
    {
      name: 'Sarah K.',
      tag: 'Verified Buyer',
      text: 'The fruit gummies are incredibly delicious! Strong, consistent effects, and no heavy body load. Discreet packaging is a huge plus for apartment delivery.',
      rating: 5,
      avatar: 'S',
      gradient: 'from-[#7b5cff] to-[#6532d6]'
    },
    {
      name: 'Mikey D.',
      tag: 'Verified Buyer',
      text: 'Microdosing capsules have completely changed my daily work ritual. I feel sharper, more creative, and less overwhelmed. Outstanding supplement quality.',
      rating: 5,
      avatar: 'M',
      gradient: 'from-amber-400 to-orange-500'
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollBestSellers = (direction: 'left' | 'right') => {
    if (bestSellersSwiper) {
      if (direction === 'left') {
        bestSellersSwiper.slidePrev();
      } else {
        bestSellersSwiper.slideNext();
      }
    }
  };

  const scrollBlog = (direction: 'left' | 'right') => {
    if (swiperInstance) {
      if (direction === 'left') {
        swiperInstance.slidePrev();
      } else {
        swiperInstance.slideNext();
      }
    }
  };

  return (
    <main className="bg-[#fff8f3] text-[#1b1533] min-h-screen font-sans selection:bg-[#ff4fa3] selection:text-white antialiased">
      <Header />

      {/* 1. Hero Section */}
      <section className="overflow-hidden bg-gradient-to-tr from-[#fffdfb] via-[#fffbf9] to-[#fff5f0] px-4 pt-10 pb-10 md:px-8 lg:pt-10 lg:pb-10 relative flex items-center">
        {/* Background elements to replicate mockup layout perfectly */}
        {/* 1. Warm peach glow on left */}
        <div className="absolute left-[10%] top-[10%] w-[400px] h-[400px] rounded-full bg-[#ffe8db]/35 blur-[90px] pointer-events-none z-0" />

        {/* 2. Fluffy pink cloud mist at the bottom right */}
        <div className="absolute right-[-80px] bottom-[-60px] w-[400px] h-[350px] rounded-full bg-gradient-to-tr from-[#ffb6d3]/50 via-[#ffd2e5]/40 to-[#ebdfff]/30 blur-[40px] pointer-events-none z-0" />
        <div className="absolute right-[-40px] bottom-[-20px] w-[280px] h-[280px] rounded-full bg-gradient-to-br from-[#ffdbe7]/70 to-[#ffc9df]/60 blur-[20px] opacity-80 pointer-events-none z-0" />

        {/* 3. Soft cyan glow on the top right */}
        <div className="absolute right-[20%] top-[-100px] w-[380px] h-[380px] rounded-full bg-[#e0f2fe]/70 blur-[70px] pointer-events-none z-0" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] relative z-10 w-full">
          <div className="flex flex-col gap-4">
            {/* Top Premium Badge Pill */}
            <div className="inline-flex items-center gap-2 rounded-full bg-[#ff4fa3]/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[#ff4fa3]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Premium. Pure. Powerful.</span>
            </div>

            <h1 className="max-w-3xl text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-[1.05] tracking-wide text-[#1b1533] logo-font">
              Fast Mushroom <span className="text-[#ff4fa3]">Delivery</span>
              <span className="block mt-1 sm:mt-2 text-[#3b82f6]">
                in Toronto, GTA & Canada
              </span>
            </h1>
            <p className="max-w-lg text-sm sm:text-base font-semibold leading-relaxed sm:leading-8 text-slate-600/90">
              Premium mushrooms, edibles, capsules and microdose products crafted for quality, wellness and mindful living.
            </p>

            {/* Bottom Floating Trust Badges Card */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-0 sm:divide-x divide-slate-100 items-center bg-white border border-slate-100 rounded-2xl p-3 shadow-sm mt-4 max-w-2xl w-full">
              {[
                ['Lab Tested', 'For Purity', ShieldCheck, 'text-pink-500 bg-pink-50'],
                ['100% Natural', 'Premium Quality', Leaf, 'text-emerald-500 bg-emerald-50'],
                ['Discreet Delivery', 'Private & Secure', Truck, 'text-indigo-500 bg-indigo-50'],
              ].map(([title, desc, Icon, colors]: any, idx) => (
                <div
                  key={title}
                  className="flex items-center gap-1.5 sm:gap-2.5 px-1 sm:px-3 justify-start sm:justify-start"
                >
                  <span className={`grid h-7 w-7 sm:h-9.5 sm:w-9.5 shrink-0 place-items-center rounded-full ${colors} shadow-sm`}>
                    <Icon className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5 stroke-[2.2]" />
                  </span>
                  <span className="text-[12px] sm:text-[12px] lg:text-[12px] font-bold uppercase tracking-widest text-[#1b1533] logo-font leading-tight">
                    {title}
                    <small className="block text-[12px] sm:text-[12px] lg:text-[12px] font-medium text-slate-400 normal-case mt-0.5 tracking-normal leading-normal">{desc}</small>
                  </span>
                </div>
              ))}
            </div>

            {/* Hero CTA buttons */}
            <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <Link
                href="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl bg-[#ff4fa3] text-white border border-[#ff4fa3] px-6 sm:px-9 py-4 text-xs font-black uppercase tracking-wider shadow-md shadow-pink-100 transition-all duration-300 hover:bg-black hover:text-[#ff4fa3] hover:border-black hover:-translate-y-0.5 active:translate-y-0 cursor-pointer gap-2 logo-font whitespace-nowrap"
              >
                <ShoppingBag className="h-4.5 w-4.5" />
                <span>Shop Now</span>
              </Link>
              <Link
                href="#featured-products"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 sm:px-9 py-4 text-xs font-black uppercase tracking-wider text-[#1b1533] shadow-sm transition-all duration-300 hover:bg-black hover:text-[#ff4fa3] hover:border-black hover:-translate-y-0.5 active:translate-y-0 cursor-pointer gap-2 logo-font whitespace-nowrap"
              >
                <Sparkles className="h-4.5 w-4.5 text-[#ff4fa3]" />
                <span>Explore Collections</span>
              </Link>
            </div>
          </div>

          {/* Hero Premium 3D Art Composition - Restored with pedestal and transparent image */}
          <div className="relative flex items-center justify-center min-h-[300px] sm:min-h-[400px] lg:min-h-[480px]">
            {/* Soft inner radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,79,163,0.04),transparent_60%)] pointer-events-none z-0" />

            {/* 3D Pedestal Rendered in pure CSS matching mockup */}
            <div className="absolute bottom-4 sm:bottom-8 w-[280px] sm:w-[440px] h-[40px] sm:h-[65px] bg-white rounded-[100%] shadow-[0_16px_40px_rgba(27,21,51,0.05),0_4px_12px_rgba(27,21,51,0.02)] border border-slate-100/80 flex items-center justify-center z-0">
              {/* Top Surface Lip */}
              <div className="absolute inset-0.5 rounded-[100%] border border-slate-200/25 bg-gradient-to-b from-white to-slate-50/50" />
            </div>

            <img
              src="/images/hero_composition.webp"
              alt="Premium 3D Mushroom Gummies and Product Bag Composition"
              className="max-w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(27,21,51,0.08)] select-none pointer-events-none transition-transform duration-700 hover:scale-103 relative z-10 -my-12 lg:-my-20"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      {/* 2. Feature Strip (Elevated 3D Cards Grid) */}
      <section className="bg-slate-50/50 px-4 py-6 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 md:grid-cols-4">
          {[
            ['EXPRESS SHIPPING', '$20.00 Canada-Wide', Truck, 'bg-purple-50 text-[#7b5cff] group-hover:bg-[#7b5cff] border-[#7b5cff]/10 hover:border-b-[#7b5cff]'],
            ['10% OFF FIRST ORDER', 'Use Code: FUNGUYZ10', Gift, 'bg-pink-50 text-[#ff4fa3] group-hover:bg-[#ff4fa3] border-[#ff4fa3]/10 hover:border-b-[#ff4fa3]'],
            ['DISCREET PACKAGING', 'No Branding, 100% Private', PackageCheck, 'bg-sky-50 text-[#0ea5e9] group-hover:bg-[#0ea5e9] border-[#0ea5e9]/10 hover:border-b-[#0ea5e9]'],
            ['LOYALTY REWARDS', 'Earn Points & Save More', Award, 'bg-emerald-50 text-[#10b981] group-hover:bg-[#10b981] border-emerald-500/10 hover:border-b-emerald-500'],
          ].map(([title, desc, Icon, classes]: any) => (
            <div
              key={title}
              className={`group bg-white border border-slate-100 rounded-3xl p-4 shadow-[0_12px_36px_rgba(27,21,51,0.03)] hover:shadow-[0_24px_50px_rgba(27,21,51,0.07)] hover:-translate-y-1.5 active:translate-y-0 transition-all duration-300 flex items-center gap-4 cursor-pointer border-b-4 ${classes.split(' ').slice(4).join(' ')}`}
            >
              <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${classes.split(' ').slice(0, 4).join(' ')} group-hover:text-white transition-all duration-300 shadow-sm`}>
                <Icon className="h-5.5 w-5.5 stroke-[2.2]" />
              </span>
              <span className="text-xs lg:text-[13px] font-bold uppercase tracking-widest text-[#1b1533] logo-font leading-tight">
                <span className="block">{title}</span>
                <span className="font-medium text-slate-400/95 text-[12px] lg:text-[12px] normal-case tracking-normal leading-normal mt-0.5">{desc}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Shop By Category */}
      <section id="shop-by-category" className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="flex flex-col items-center gap-1.5 text-center mb-8">
          <span className="text-[12px] font-bold uppercase tracking-widest text-[#ff4fa3]">Premium Selection</span>
          <h2 className="text-3xl font-black tracking-tight text-[#1b1533] uppercase md:text-4xl logo-font">SHOP BY CATEGORY</h2>
          <div className="h-1 w-12 rounded bg-[#ff4fa3] mt-1.5" />
        </div>

        <div className="mt-4 grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
          {dbCategories.slice(0, 4).map((kind: any, idx: any) => {
            const name = kind.name;
            const desc = kind.description || kind.desc;
            const slug = kind.slug || name.toLowerCase().replace(/\s+/g, '-');
            const linkUrl = `/category/${slug}`;
            const image = categoryImages[name] || '/images/cat_mushrooms.webp';
            const gradient = categoryGradients[name] || 'from-slate-50 to-white border-slate-100';

            return (
              <Link
                key={idx}
                href={linkUrl}
                className="group relative aspect-[4/5] w-full overflow-hidden rounded-[24px] sm:rounded-[32px] shadow-[0_12px_36px_rgba(27,21,51,0.04)] hover:shadow-[0_24px_50px_rgba(27,21,51,0.15)] hover:-translate-y-1.5 transition-all duration-500 cursor-pointer block"
              >
                {/* Cover Image */}
                <img
                  src={image}
                  alt={name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Rich Bottom-Heavy Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b1533]/90 via-[#1b1533]/40 to-transparent group-hover:from-[#1b1533]/95 transition-all duration-300" />

                {/* Overlay Content aligned at the bottom */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex flex-col items-center text-center gap-1.5 sm:gap-2 z-10 w-full">
                  <h3 className="text-lg sm:text-xl font-bold tracking-wider text-white logo-font uppercase">{name}</h3>
                  <p className="mx-auto max-w-[210px] text-[10px] sm:text-[12px] font-medium leading-relaxed text-slate-200/90 hidden sm:block">
                    {desc}
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1 sm:gap-1.5 self-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 sm:px-5 sm:py-2 text-[10px] sm:text-[12px] font-bold uppercase tracking-widest text-white shadow-sm transition-all duration-300 hover:bg-[#ff4fa3] hover:border-[#ff4fa3] hover:text-white hover:-translate-y-0.5 active:translate-y-0 cursor-pointer logo-font">
                    Shop Now <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 stroke-[2.5]" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. Best Sellers */}
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-purple-100/50 pb-3.5">
          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-bold uppercase tracking-widest text-[#ff4fa3]">Trending Now</span>
            <h2 className="text-3xl font-black tracking-tight text-[#1b1533] uppercase md:text-4xl logo-font">BEST SELLERS</h2>
          </div>
          <div className="flex items-center gap-5">
            {/* Carousel navigation arrows */}
            <div className="flex gap-2.5">
              <button
                onClick={() => scrollBestSellers('left')}
                className="grid h-9 w-9 place-items-center rounded-2xl border border-slate-200 bg-white text-[#1b1533] hover:bg-[#ff4fa3] hover:text-white hover:border-[#ff4fa3] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer shadow-sm"
              >
                <ChevronLeft className="h-4.5 w-4.5 stroke-[2.5]" />
              </button>
              <button
                onClick={() => scrollBestSellers('right')}
                className="grid h-9 w-9 place-items-center rounded-2xl border border-slate-200 bg-white text-[#1b1533] hover:bg-[#ff4fa3] hover:text-white hover:border-[#ff4fa3] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer shadow-sm"
              >
                <ChevronRight className="h-4.5 w-4.5 stroke-[2.5]" />
              </button>
            </div>

            {/* View All Products Button */}
            <Link
              href="/shop?filter=best-sellers"
              className="inline-flex items-center justify-center rounded-2xl bg-[#ff4fa3] text-white border border-[#ff4fa3] px-6 py-2.5 text-[12px] font-black uppercase tracking-wider shadow-md shadow-pink-100 transition-all duration-300 hover:bg-black hover:text-[#ff4fa3] hover:border-black hover:-translate-y-0.5 active:translate-y-0 cursor-pointer gap-1.5 logo-font"
            >
              View All Products <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
            </Link>
          </div>
        </div>

        {/* Elite Swiper Carousel Slider Container (4 slides on desktop) */}
        {isLoadingProducts ? (
          <div className="flex justify-center items-center py-20 w-full">
            <MushroomLoader className="scale-150" />
          </div>
        ) : (
          <Swiper
            onSwiper={setBestSellersSwiper}
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className="mt-8 w-full"
          >
            {displayProducts.map((p: any, i: any) => (
              <SwiperSlide key={p._id || p[0]} className="!h-auto pb-4">
                <ProductCard p={p} i={i} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>

      {/* 5. Why Choose FunGuyz (Designed as a full-width solid black banner) */}
      <div className="w-full bg-black border-y border-zinc-900 shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
        <section className="mx-auto max-w-7xl px-4 py-8 md:px-8">
          <div className="grid overflow-hidden rounded-3xl border border-zinc-800 bg-[#0c0a0f] shadow-lg lg:grid-cols-[1fr_2.5fr]">
            <div className="flex flex-col justify-center items-start bg-gradient-to-br from-[#ff4fa3] to-[#e03b87] p-8 text-left text-white logo-font leading-none">
              <span className="text-[24px] lg:text-[26px] font-black uppercase tracking-wider text-pink-100/95">WHY CHOOSE</span>
              <span className="text-5xl md:text-6xl lg:text-[62px] font-black uppercase tracking-widest text-white mt-2">FUNGUYZ?</span>
            </div>
            <div className="grid gap-4 lg:gap-0 p-6 sm:grid-cols-2 lg:grid-cols-4 bg-[#0c0a0f]">
              {[
                ['Premium Quality', 'Lab Tested Products', Sparkles],
                ['Discreet Shipping', 'Canada Wide Safe', Truck],
                ['Secure Checkout', 'SSL Encrypted Key', Lock],
                ['24/7 Support', 'We Are Here For You', Headphones],
              ].map(([title, desc, Icon]: any) => (
                <div key={title} className="h-full p-4 text-center flex flex-col items-center justify-center gap-2.5 border-zinc-800/30 lg:border-r lg:border-zinc-700 lg:last:border-r-0 lg:px-4">
                  <Icon className="h-8 w-8 text-[#ff4fa3] stroke-[2.5]" />
                  <b className="whitespace-nowrap text-[14px] lg:text-[15px] font-black uppercase tracking-wider text-white mt-1.5 logo-font">{title}</b>
                  <span className="block whitespace-nowrap text-[12px] lg:text-[12px] font-medium text-slate-400 leading-normal">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>


      {/* 7. Featured Products Grid (8 Products in 2 Rows) */}
      <div className="w-full bg-gradient-to-b from-pink-100 via-purple-100/70 to-white border-y border-purple-100/20 py-16">
        <section id="featured-products" className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex flex-col items-center gap-1.5 text-center mb-10">
            <span className="text-[12px] font-bold uppercase tracking-widest text-[#ff4fa3]">Trending Now</span>
            <h2 className="text-3xl font-black tracking-tight text-[#1b1533] uppercase md:text-4xl logo-font">FEATURED PRODUCTS</h2>
            <div className="h-1 w-12 rounded bg-[#ff4fa3] mt-1.5" />
          </div>

          <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
            {displayProducts.slice(0, 8).map((p: any, i: any) => (
              <div key={p._id || p[0]} className="w-full">
                <ProductCard p={p} i={i} />
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-2xl bg-[#ff4fa3] text-white border border-[#ff4fa3] px-8 py-3.5 text-xs font-black uppercase tracking-wider shadow-md shadow-pink-100 transition-all duration-300 hover:bg-black hover:text-[#ff4fa3] hover:border-black hover:-translate-y-0.5 active:translate-y-0 cursor-pointer gap-2 logo-font"
            >
              View All Products <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </Link>
          </div>
        </section>
      </div>

      {/* 7. The Benefits */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="flex flex-col items-center gap-1.5 text-center mb-8">
          <span className="text-[12px] font-bold uppercase tracking-widest text-[#ff4fa3]">Why Mushrooms?</span>
          <h2 className="text-3xl font-black tracking-tight text-[#1b1533] uppercase md:text-4xl logo-font">THE BENEFITS</h2>
          <div className="h-1 w-12 rounded bg-[#ff4fa3] mt-1.5" />
        </div>

        <div className="mt-12 rounded-3xl border border-purple-100 bg-white p-8 shadow-sm">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6">
            {benefitCards.map(([title, desc, Icon]: any) => (
              <div key={title} className="text-center flex flex-col items-center gap-3 group">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-[#7b5cff]/5 text-[#7b5cff] group-hover:bg-[#ff4fa3]/5 group-hover:text-[#ff4fa3] transition-all duration-300">
                  <Icon className="h-5.5 w-5.5 stroke-[2.5]" />
                </span>
                <b className="text-[12px] font-black uppercase tracking-wider text-[#1b1533] mt-1">{title}</b>
                <span className="text-[12px] font-semibold leading-relaxed text-slate-400">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Testimonials & FAQ Section */}
      <div className="w-full bg-white border-y border-slate-100/50 py-16">
        <section className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex flex-col items-center gap-1.5 text-center mb-10">
            <span className="text-[12px] font-bold uppercase tracking-widest text-[#ff4fa3]">Customer Care</span>
            <h2 className="text-3xl font-black tracking-tight text-[#1b1533] uppercase md:text-4xl logo-font">REVIEWS & FAQ</h2>
            <div className="h-1 w-12 rounded bg-[#ff4fa3] mt-1.5" />
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] items-start">
            {/* Testimonials */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1 border-l-4 border-[#ff4fa3] pl-4 mb-2">
                <span className="text-[12px] font-bold uppercase tracking-widest text-slate-400">Real Reviews</span>
                <h3 className="text-lg font-black tracking-tight text-[#1b1533] uppercase logo-font">WHAT OUR CUSTOMERS SAY</h3>
              </div>

              {/* Ultra Modern Sliding Review Card Carousel */}
              <div className="relative rounded-3xl border-2 border-pink-200/80 bg-[#fffdfd] p-8 sm:p-10 shadow-[0_15px_35px_rgba(255,79,163,0.08)] hover:shadow-[0_25px_50px_rgba(255,79,163,0.15)] flex flex-col gap-6 min-h-[300px] justify-between group transition-all duration-300 hover:-translate-y-0.5">
                {/* Decorative Giant Quote icon (Moved inside padding and darkened to prevent clipping) */}
                <span className="absolute top-3 right-6 text-[110px] font-serif font-black text-pink-200/70 leading-none select-none pointer-events-none group-hover:text-pink-300/80 transition-colors duration-300">
                  ”
                </span>

                <div className="flex flex-col gap-4 z-10">
                  {/* Rating Stars row */}
                  <div className="flex gap-1 text-amber-400">
                    {Array.from({ length: reviews[activeReview].rating }).map((_, star) => (
                      <Star key={star} className="h-4.5 w-4.5 fill-current stroke-none" />
                    ))}
                  </div>

                  {/* Review Text quote */}
                  <p className="text-[14.5px] sm:text-[16px] font-semibold leading-relaxed text-slate-600/90 italic transition-all duration-500">
                    "{reviews[activeReview].text}"
                  </p>
                </div>

                {/* Profile detail row */}
                <div className="flex items-center justify-between border-t border-pink-100/40 pt-5 z-10">
                  <div className="flex items-center gap-4">
                    <span className={`grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br ${reviews[activeReview].gradient} font-extrabold text-white text-base shadow-sm`}>
                      {reviews[activeReview].avatar}
                    </span>
                    <div>
                      <b className="block text-sm font-black uppercase tracking-wider text-[#1b1533]">{reviews[activeReview].name}</b>
                      <span className="inline-flex items-center gap-1 text-[12px] font-black uppercase tracking-wider text-emerald-600 mt-0.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {reviews[activeReview].tag}
                      </span>
                    </div>
                  </div>

                  {/* Interactive chevrons next to avatar signature row */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveReview((activeReview - 1 + reviews.length) % reviews.length)}
                      className="grid h-8 w-8 place-items-center rounded-2xl border border-slate-100 bg-white text-[#1b1533] hover:bg-[#ff4fa3] hover:text-white hover:border-[#ff4fa3] transition-all duration-300 cursor-pointer shadow-sm"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setActiveReview((activeReview + 1) % reviews.length)}
                      className="grid h-8 w-8 place-items-center rounded-2xl border border-slate-100 bg-white text-[#1b1533] hover:bg-[#ff4fa3] hover:text-white hover:border-[#ff4fa3] transition-all duration-300 cursor-pointer shadow-sm"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Navigation Indicators underneath review container */}
              <div className="flex justify-center gap-2 mt-2">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveReview(i)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${activeReview === i ? 'w-6 bg-[#ff4fa3]' : 'w-2 bg-pink-100 hover:bg-[#ff4fa3]/40'
                      }`}
                  />
                ))}
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1 border-l-4 border-[#ff4fa3] pl-4 mb-2">
                <span className="text-[12px] font-bold uppercase tracking-widest text-slate-400">Got Questions?</span>
                <h3 className="text-lg font-black tracking-tight text-[#1b1533] uppercase logo-font">FREQUENTLY ASKED QUESTIONS</h3>
              </div>

              <div className="divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div key={index} className="transition-colors duration-200">
                      <button
                        onClick={() => toggleFaq(index)}
                        className="flex w-full items-center justify-between px-6 py-4.5 text-left text-xs font-black uppercase tracking-wider text-[#1b1533] hover:text-[#ff4fa3] focus:outline-none"
                      >
                        <span>{faq.q}</span>
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-slate-50 text-slate-400">
                          {isOpen ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                        </span>
                      </button>
                      <div
                        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'
                          }`}
                      >
                        <p className="text-xs font-semibold leading-relaxed text-slate-500 border-t border-slate-50 pt-3">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 9. From The Blog */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-purple-100/50 pb-3.5 mb-8">
          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-bold uppercase tracking-widest text-[#ff4fa3]">Latest Research</span>
            <h2 className="text-3xl font-black tracking-tight text-[#1b1533] uppercase md:text-4xl logo-font">FROM THE BLOG</h2>
          </div>
          <div className="flex items-center gap-5">
            {/* Carousel navigation arrows */}
            <div className="flex gap-2.5">
              <button
                onClick={() => scrollBlog('left')}
                className="grid h-9 w-9 place-items-center rounded-2xl border border-slate-200 bg-white text-[#1b1533] hover:bg-[#ff4fa3] hover:text-white hover:border-[#ff4fa3] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer shadow-sm"
              >
                <ChevronLeft className="h-4.5 w-4.5 stroke-[2.5]" />
              </button>
              <button
                onClick={() => scrollBlog('right')}
                className="grid h-9 w-9 place-items-center rounded-2xl border border-slate-200 bg-white text-[#1b1533] hover:bg-[#ff4fa3] hover:text-white hover:border-[#ff4fa3] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer shadow-sm"
              >
                <ChevronRight className="h-4.5 w-4.5 stroke-[2.5]" />
              </button>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-2xl bg-[#ff4fa3] text-white border border-[#ff4fa3] px-6 py-2.5 text-xs font-black uppercase tracking-wider shadow-md shadow-pink-100 transition-all duration-300 hover:bg-black hover:text-[#ff4fa3] hover:border-black hover:-translate-y-0.5 active:translate-y-0 cursor-pointer gap-2 logo-font"
            >
              View All Articles <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>

        {/* Elite Swiper Carousel Slider Container (No browser cutting, no scrollbar tracks) */}
        <Swiper
          onSwiper={setSwiperInstance}
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
          className="mt-8 w-full"
        >
          {dbBlogs.map((post: any) => {
            const publishDate = new Date(post.publishedAt);
            const formattedDate = publishDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            return (
              <SwiperSlide key={post._id || post.title} className="!h-auto">
                <Link href={`/blog/${post.slug}`} className="block h-full w-full">
                  <article className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-0.5 h-full w-full">
                    <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5 flex flex-col gap-3">
                      <div className="flex items-center justify-between text-[12px] font-black uppercase tracking-wider text-slate-400">
                        <span className="bg-[#ff4fa3]/5 text-[#ff4fa3] px-2 py-0.5 rounded">{post.category}</span>
                        <span>{formattedDate}</span>
                      </div>
                      <h3 className="font-black text-sm text-[#1b1533] line-clamp-2 leading-snug group-hover:text-[#ff4fa3] transition-colors duration-200 mt-1">
                        {post.title}
                      </h3>
                      <p className="text-[12px] font-semibold text-slate-500 leading-relaxed line-clamp-2">
                        {post.desc}
                      </p>
                      <div className="mt-2 flex items-center gap-1.5 text-[12px] font-black uppercase tracking-wider text-slate-400">
                        <Clock className="h-3 w-3 stroke-[2.5]" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>

      {/* 10. Instagram Grid & Trust Section */}
      <div className="w-full bg-white border-t border-slate-100/50 py-16 mt-8">
        <section className="mx-auto grid max-w-7xl gap-10 px-4 md:px-8 lg:grid-cols-[1.2fr_1fr]">

          {/* Instagram Square Feed Row */}
          <div className="rounded-3xl border border-slate-100 bg-[#fafafa] p-6 shadow-sm flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-purple-100/50 pb-4">
              <div className="flex items-center gap-4">
                {/* 80px Instagram Icon */}
                <div
                  className="flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#fccc63] via-[#cd486b] to-[#4c68d7] text-white shadow-md shadow-pink-100/30"
                  style={{ width: '80px', height: '80px' }}
                >
                  <svg className="h-9 w-9 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-black uppercase tracking-widest text-slate-400 logo-font">FOLLOW US ON INSTAGRAM</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#ff4fa3] logo-font mt-0.5 tracking-tight">@funguyz.ca</h2>
                </div>
              </div>

              {/* Follow Now Button styled exactly like e-commerce theme buttons */}
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-[#ff4fa3] text-white border border-[#ff4fa3] px-6 py-2.5 text-[12px] font-black uppercase tracking-widest shadow-md shadow-pink-100 transition-all duration-300 hover:bg-black hover:text-[#ff4fa3] hover:border-black hover:-translate-y-0.5 active:translate-y-0 cursor-pointer logo-font shrink-0"
              >
                Follow Now
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-6 mt-2 w-full">
              {[
                '/images/cat_mushrooms.webp',
                '/images/prod_blue_gummies.webp',
                '/images/blog_1.webp',
                '/images/prod_teacher_capsules.webp',
                '/images/blog_4.webp',
                '/images/hero_composition.webp',
              ].map((img, i) => (
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  key={i}
                  className="group relative aspect-square overflow-hidden rounded-2xl bg-slate-50 border border-slate-100/50 flex items-center justify-center cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <img
                    src={img}
                    alt={`Instagram preview ${i}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
                    loading="lazy"
                  />
                  {/* Glowing hover overlay */}
                  <div className="absolute inset-0 bg-[#7b5cff]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-[12px] font-black uppercase tracking-widest bg-black/45 px-2 py-1 rounded-xl backdrop-blur-sm scale-90 group-hover:scale-100 transition-transform duration-300 logo-font">
                      View
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Happy Customers Trust Info - Re-Themed Brand-Pink Colorful Card */}
          <div
            className="rounded-3xl bg-cover bg-center text-[#1b1533] p-8 shadow-xl shadow-pink-100/30 border-2 border-pink-100/60 flex flex-col gap-5 relative overflow-hidden group"
            style={{ backgroundImage: "url('/images/colorful_footer_bg.webp')" }}
          >
            {/* High-contrast white glassmorphic overlay for perfect legibility */}
            <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px]" />

            {/* Glowing background highlights */}
            <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-[#ff4fa3]/5 blur-2xl pointer-events-none" />
            <div className="absolute -left-16 -bottom-16 w-32 h-32 rounded-full bg-purple-100/30 blur-2xl pointer-events-none" />

            <div className="flex flex-col gap-2 relative z-10">
              <span className="text-[12px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">TRUSTED BY THOUSANDS</span>
              <h3 className="text-xl font-black text-[#1b1533] mt-1 leading-tight logo-font">Guaranteed Quality & Certified Safety</h3>
              <p className="text-[12px] font-medium text-slate-500 leading-relaxed mt-1">
                We prioritize premium organic sourcing, strict laboratory verification, and fully secure, discrete shipping for your complete peace of mind.
              </p>
            </div>

            {/* Premium Rating Dashboard Row */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#ff4fa3]/5 border border-[#ff4fa3]/10 backdrop-blur-sm relative z-10">
              <div className="flex flex-col">
                <span className="text-4xl font-black text-[#ff4fa3] leading-none tracking-tight">4.9</span>
                <span className="text-[12px] font-black uppercase tracking-widest text-slate-400 mt-1">Rating</span>
              </div>
              <div className="h-8 w-px bg-[#ff4fa3]/20" />
              <div className="flex flex-col flex-1 gap-1">
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, star) => (
                    <Star key={star} className="h-3.5 w-3.5 fill-current stroke-none" />
                  ))}
                </div>
                <span className="text-[12px] font-black uppercase tracking-wider text-[#1b1533] logo-font">
                  2,500+ Verified Reviews
                </span>
              </div>
              <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 text-emerald-700 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider border border-emerald-500/25 shrink-0">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Safe Site
              </span>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
