'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { products, getProductSlug, getCategorySlug, getProductSeoMetadata, getProductSections, mushroomPricingTable } from '@/data/products';
import { useCart } from '@/context/CartContext';
import {
  Sparkles,
  ShoppingBag,
  Star,
  ShieldCheck,
  Truck,
  Heart,
  Check,
  ChevronRight,
  ChevronLeft,
  Minus,
  Plus,
  AlertCircle,
  Lock,
  ArrowRight,
  BookOpen,
  Dna,
  TrendingUp,
  ThumbsUp,
  Activity,
  HelpCircle,
  MessageSquare
} from 'lucide-react';

const imageMap: Record<string, string> = {
  // Magic Mushrooms
  'Golden Teacher': '/images/prod_golden_teacher.webp',
  'Penis Envy': '/images/prod_penis_envy.webp',
  'Blue Meanies': '/images/prod_penis_envy.webp',
  'Albino Penis Envy (APE)': '/images/prod_penis_envy.webp',
  'Tidal Wave': '/images/prod_golden_teacher.webp',
  'Jack Frost': '/images/prod_golden_teacher.webp',
  'Jedi Mind Fuck (JMF)': '/images/prod_golden_teacher.webp',
  'Mazatapec': '/images/prod_golden_teacher.webp',
  'B+': '/images/prod_golden_teacher.webp',
  'Treasure Coast': '/images/prod_golden_teacher.webp',
  'Melmac': '/images/prod_penis_envy.webp',
  'Enigma': '/images/prod_penis_envy.webp',
  'Hillbilly': '/images/prod_golden_teacher.webp',
  'Thai Pink Buffalo': '/images/prod_golden_teacher.webp',

  // Edibles
  'Golden Teacher Original Chocolate (GT OG)': '/images/prod_blue_gummies.webp',
  'Golden Teacher Concentrated Chocolate (GT CC)': '/images/prod_blue_gummies.webp',
  'Penis Envy Original Chocolate (PE OG)': '/images/prod_blue_gummies.webp',
  'Penis Envy Refined Concentrate Chocolate (PE RC)': '/images/prod_blue_gummies.webp',
  'Penis Envy Concentrated Chocolate (PE CC)': '/images/prod_blue_gummies.webp',
  'Blue Raspberry Gummies': '/images/prod_blue_gummies.webp',
  'Watermelon Gummies': '/images/prod_blue_gummies.webp',
  'Strawberry Gummies': '/images/prod_blue_gummies.webp',
  'Mango Gummies': '/images/prod_blue_gummies.webp',
  'Green Apple Gummies': '/images/prod_blue_gummies.webp',
  'Mixed Berry Gummies': '/images/prod_blue_gummies.webp',
  'Golden Teacher S\'Mores': '/images/prod_blue_gummies.webp',
  'Penis Envy S\'Mores': '/images/prod_blue_gummies.webp',
  'Cookies & Cream S\'Mores': '/images/prod_blue_gummies.webp',

  // Capsules
  'Lion\'s Mane Capsules': '/images/prod_teacher_capsules.webp',
  'Reishi Capsules': '/images/prod_teacher_capsules.webp',
  'Cordyceps Capsules': '/images/prod_teacher_capsules.webp',
  'Turkey Tail Capsules': '/images/prod_teacher_capsules.webp',
  'Chaga Capsules': '/images/prod_teacher_capsules.webp',
  'Golden Teacher Extract': '/images/prod_teacher_capsules.webp',
  'Penis Envy Extract': '/images/prod_teacher_capsules.webp',
  'Lion\'s Mane Tincture': '/images/prod_teacher_capsules.webp',
  'Reishi Tincture': '/images/prod_teacher_capsules.webp',
  'Cordyceps Tincture': '/images/prod_teacher_capsules.webp',

  // Microdose
  'Golden Teacher Microdose': '/images/prod_daily_blend.webp',
  'Penis Envy Microdose': '/images/prod_daily_blend.webp',
  'Stamets Stack Microdose': '/images/prod_daily_blend.webp',
  'Creativity Microdose Blend': '/images/prod_daily_blend.webp',
  'Productivity Microdose Blend': '/images/prod_daily_blend.webp',
  'Wellness Microdose Blend': '/images/prod_daily_blend.webp'
};

function getGalleryImagesList(title: string, category: string, mainImg: string): string[] {
  if (category === 'Edibles') {
    return [mainImg, '/images/cat_edibles.webp', '/images/footer_gummies.webp', '/images/blog_2.webp'];
  }
  if (category === 'Capsules') {
    return [mainImg, '/images/cat_capsules.webp', '/images/prod_daily_blend.webp', '/images/blog_3.webp'];
  }
  if (category === 'Microdose') {
    return [mainImg, '/images/cat_microdose.webp', '/images/prod_teacher_capsules.webp', '/images/blog_4.webp'];
  }
  return [mainImg, '/images/cat_mushrooms.webp', '/images/hero_composition.webp', '/images/blog_1.webp'];
}

function getFallbackImage(category: string): string {
  if (category === 'Edibles') return '/images/cat_edibles.webp';
  if (category === 'Capsules') return '/images/cat_capsules.webp';
  if (category === 'Microdose') return '/images/cat_microdose.webp';
  return '/images/cat_mushrooms.webp';
}

function getCompoundsForCategory(category: string) {
  if (category === 'Edibles') return { thc: '0%', cbd: 'Psilocybin', cbn: 'Trace' };
  if (category === 'Capsules') return { thc: 'Sub-P', cbd: 'Adaptogens', cbn: 'NGF' };
  if (category === 'Microdose') return { thc: '50-200mg', cbd: 'Lion\'s Mane', cbn: 'Niacin' };
  return { thc: '0.63%', cbd: '0.05%', cbn: '0.02%' };
}

export default function CategoryProductPage({ params }: { params: Promise<{ categorySlug: string; productSlug: string }> }) {
  const { categorySlug, productSlug } = React.use(params);
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const [selectedWeight, setSelectedWeight] = useState<string>('3.5g');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [openFaqTab, setOpenFaqTab] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [newReviewRating, setNewReviewRating] = useState<number>(5);
  const [newReviewText, setNewReviewText] = useState<string>('');
  const [reviewsList, setReviewsList] = useState<any[]>([
    ['Sarah M.', 'Outstanding customer service and extremely discreet packaging. The Golden Teacher provided an incredibly smooth, visual, and introspective mindset journey. Delivered in 2 days to Vancouver!', 5],
    ['David K.', 'Excellent gummies! The watermelon flavor is completely organic and has zero heavy body load. Ideal microdosing stack for creative coding and design focus!', 5]
  ]);

  // Match product by both categorySlug AND productSlug for precision routing
  let matched = products.find(p =>
    getCategorySlug(p[1]) === categorySlug && getProductSlug(p[0]) === productSlug
  );
  // Fallback: match only by productSlug across all categories
  if (!matched) {
    matched = products.find(p => getProductSlug(p[0]) === productSlug);
  }
  // Final fallback
  if (!matched) {
    matched = products[0];
  }

  const seoData = getProductSeoMetadata(matched[0], matched[1]);
  const sectionsData = getProductSections(matched[0], matched[1], seoData.description);

  const sectionsList = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'appearance', label: 'Appearance', icon: Sparkles },
    { id: 'genetics', label: 'Genetics', icon: Dna },
    { id: 'popularity', label: 'Popularity', icon: TrendingUp },
    { id: 'why-choose-us', label: 'Why Choose It', icon: ThumbsUp },
    { id: 'strain-info', label: 'Strain Information', icon: Activity },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'reviews', label: `Reviews (${reviewsList.length})`, icon: MessageSquare }
  ];

  const basePriceNum = parseFloat(matched[2].replace('$', ''));
  const pricingMap: Record<string, number> = mushroomPricingTable[matched[0]] || {
    '3.5g': basePriceNum
  };

  const mainImg = imageMap[matched[0]] || getFallbackImage(matched[1]);
  const galleryImages = getGalleryImagesList(matched[0], matched[1], mainImg);

  const productData = {
    title: seoData.h1,
    category: matched[1],
    price: matched[2],
    originalPrice: matched[4],
    imageSrc: mainImg,
    reviews: matched[6] || '48 reviews',
    rating: matched[7] || 5,
    pricingMap,
    desc: seoData.description,
    compounds: getCompoundsForCategory(matched[1]),
    slug: getProductSlug(matched[0])
  };

  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);
  const activeImage = selectedGalleryImage || mainImg;

  const [prevSlug, setPrevSlug] = useState(productSlug);
  if (productSlug !== prevSlug) {
    setPrevSlug(productSlug);
    setSelectedGalleryImage(null);
  }

  const handlePrevImage = () => {
    const currentIndex = galleryImages.indexOf(activeImage);
    if (currentIndex !== -1) {
      const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      setSelectedGalleryImage(galleryImages[prevIndex]);
    }
  };

  const handleNextImage = () => {
    const currentIndex = galleryImages.indexOf(activeImage);
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % galleryImages.length;
      setSelectedGalleryImage(galleryImages[nextIndex]);
    }
  };

  const wishlisted = isWishlisted(productData.title);
  const calculatedPrice = productData.pricingMap[selectedWeight] || parseFloat(productData.price.replace('$', ''));
  const calculatedOriginalPrice = Math.round(calculatedPrice * 1.25);

  const handleAddToCart = () => {
    addToCart({
      title: `${productData.title} (${selectedWeight})`,
      category: productData.category,
      price: `$${calculatedPrice.toFixed(2)}`,
      imageSrc: productData.imageSrc
    }, quantity);
  };

  return (
    <main className="bg-[#fff8f3] text-[#1b1533] min-h-screen selection:bg-[#ff4fa3] selection:text-white antialiased">
      <Header />

      {/* Breadcrumbs Row */}
      <div className="bg-slate-50 border-b border-slate-100/50 py-3.5 px-4 md:px-8 text-xs font-bold text-slate-400 select-none">
        <div className="mx-auto max-w-7xl flex items-center gap-2">
          <a href="/" className="hover:text-[#ff4fa3]">Home</a>
          <ChevronRight className="h-3 w-3" />
          <a href="/shop" className="hover:text-[#ff4fa3]">Shop</a>
          <ChevronRight className="h-3 w-3" />
          <a href={`/category/${getCategorySlug(matched[1])}`} className="hover:text-[#ff4fa3]">{matched[1]}</a>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-600">{productData.title}</span>
        </div>
      </div>

      {/* Main Single Product Layout */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">

        <div className="grid gap-12 lg:grid-cols-2 items-start">

          {/* Left Block: Gallery */}
          <div className="space-y-6">
            <div className="relative aspect-square w-full rounded-[24px] sm:rounded-[40px] bg-white border border-slate-100 shadow-sm overflow-hidden flex items-center justify-center group">
              <img
                src={activeImage}
                alt={productData.title}
                className="h-full w-full object-cover pointer-events-none transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-[#ff4fa3]/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#ff4fa3] shadow-sm backdrop-blur-md">
                <Sparkles className="h-3 w-3" /> 100% Lab Tested
              </span>
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/80 backdrop-blur-md text-[#1b1533] border border-slate-200/50 shadow-md hover:bg-[#ff4fa3] hover:text-white hover:scale-105 active:scale-95 transition-all cursor-pointer z-10"
                    aria-label="Previous Image"
                  >
                    <ChevronLeft className="h-5 w-5 stroke-[2.5]" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/80 backdrop-blur-md text-[#1b1533] border border-slate-200/50 shadow-md hover:bg-[#ff4fa3] hover:text-white hover:scale-105 active:scale-95 transition-all cursor-pointer z-10"
                    aria-label="Next Image"
                  >
                    <ChevronRight className="h-5 w-5 stroke-[2.5]" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedGalleryImage(img)}
                  className={`aspect-square rounded-2xl border bg-white overflow-hidden flex items-center justify-center hover:border-[#ff4fa3] transition-all cursor-pointer ${activeImage === img ? 'border-[#ff4fa3] ring-2 ring-pink-50' : 'border-slate-100'
                    }`}
                >
                  <img src={img} className="h-full w-full object-cover" alt="Thumbnail" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Block: Product Info */}
          <div className="flex flex-col">
            <span className="text-[12px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font leading-none">{productData.category}</span>
            <h1 className="mt-3.5 text-2xl sm:text-4xl md:text-5xl font-black text-[#1b1533] uppercase leading-none tracking-tight logo-font">{productData.title}</h1>

            <div className="flex items-center gap-2 mt-4 text-xs font-semibold leading-none text-amber-500">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, star) => (
                  <Star key={star} className="h-4 w-4 fill-current text-amber-400 stroke-none" />
                ))}
              </div>
              <span className="text-slate-400 font-bold ml-1">({productData.reviews})</span>
            </div>

            <div className="flex items-baseline gap-2.5 mt-6">
              <span className="text-2xl sm:text-3xl font-black text-[#ff4fa3] logo-font">${calculatedPrice.toFixed(2)}</span>
              <span className="text-sm font-semibold text-slate-400 line-through">${calculatedOriginalPrice.toFixed(2)}</span>
            </div>

            <p className="mt-6 text-xs md:text-sm font-semibold text-slate-500 leading-relaxed border-b border-slate-100 pb-6">
              {productData.desc} All online packages are processed inside certified facilities, featuring vacuum-sealed medical packaging with zero external branding for absolute security and discrete Canadian shipping.
            </p>

            {productData.category === 'Magic Mushrooms' && (
              <div className="mt-6 space-y-3">
                <span className="block text-[12px] font-black uppercase tracking-wider text-slate-400">Select Dosage / Weight:</span>
                <div className="grid grid-cols-4 gap-2 w-full sm:w-auto">
                  {['3.5g', '7g', '14g', '28g'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedWeight(s)}
                      className={`rounded-2xl py-3 text-xs font-black uppercase tracking-wider logo-font transition-all duration-200 cursor-pointer border text-center ${selectedWeight === s
                          ? 'bg-[#ff4fa3] border-[#ff4fa3] text-white shadow-md shadow-pink-100'
                          : 'bg-white border-slate-200 text-[#1b1533] shadow-sm hover:border-[#ff4fa3] hover:text-[#ff4fa3]'
                        }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <div className="flex gap-3 w-full sm:w-auto">
                <div className="flex-1 sm:flex-initial flex items-center justify-between border border-slate-200 bg-white rounded-2xl p-1.5 w-full sm:w-36 h-12 shadow-sm shrink-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="grid h-9 w-9 place-items-center rounded-xl bg-slate-50 text-[#1b1533] hover:bg-slate-100 hover:text-[#ff4fa3] transition-colors cursor-pointer"
                  >
                    <Minus className="h-4.5 w-4.5 stroke-[2.5]" />
                  </button>
                  <span className="text-sm font-black text-[#1b1533] logo-font px-2">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="grid h-9 w-9 place-items-center rounded-xl bg-slate-50 text-[#1b1533] hover:bg-slate-100 hover:text-[#ff4fa3] transition-colors cursor-pointer"
                  >
                    <Plus className="h-4.5 w-4.5 stroke-[2.5]" />
                  </button>
                </div>

                <button
                  onClick={() => toggleWishlist({ title: productData.title, category: productData.category, price: productData.price, imageSrc: productData.imageSrc })}
                  className={`grid sm:hidden h-12 w-12 place-items-center rounded-2xl border transition-all cursor-pointer shrink-0 ${wishlisted ? 'bg-pink-50 border-pink-100 text-[#ff4fa3]' : 'bg-white border-slate-200 text-slate-400 hover:border-pink-300 hover:text-[#ff4fa3] shadow-sm'
                    }`}
                >
                  <Heart className={`h-5 w-5 ${wishlisted ? 'fill-[#ff4fa3] text-[#ff4fa3]' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full sm:flex-1 inline-flex items-center justify-center rounded-2xl bg-[#ff4fa3] text-white border border-[#ff4fa3] py-4 text-xs font-black uppercase tracking-wider shadow-md shadow-pink-100 transition-all duration-300 hover:bg-black hover:text-[#ff4fa3] hover:border-black hover:-translate-y-0.5 active:translate-y-0 cursor-pointer gap-2.5 logo-font h-12 whitespace-nowrap"
              >
                <ShoppingBag className="h-4.5 w-4.5" /> Add to Shopping Cart
              </button>

              <button
                onClick={() => toggleWishlist({ title: productData.title, category: productData.category, price: productData.price, imageSrc: productData.imageSrc })}
                className={`hidden sm:grid h-12 w-12 place-items-center rounded-2xl border transition-all cursor-pointer shrink-0 ${wishlisted ? 'bg-pink-50 border-pink-100 text-[#ff4fa3]' : 'bg-white border-slate-200 text-slate-400 hover:border-pink-300 hover:text-[#ff4fa3] shadow-sm'
                  }`}
              >
                <Heart className={`h-5 w-5 ${wishlisted ? 'fill-[#ff4fa3] text-[#ff4fa3]' : ''}`} />
              </button>
            </div>

            <div className="grid grid-cols-3 divide-x divide-slate-100 items-center bg-white border border-slate-100 rounded-2xl p-4 shadow-sm mt-8 w-full text-center">
              <div className="flex flex-col items-center gap-1.5">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                <span className="text-[12px] font-black uppercase tracking-wider text-[#1b1533] leading-none mt-1">Lab Tested</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Truck className="h-5 w-5 text-pink-500" />
                <span className="text-[12px] font-black uppercase tracking-wider text-[#1b1533] leading-none mt-1">Discreet Mail</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <AlertCircle className="h-5 w-5 text-indigo-500" />
                <span className="text-[12px] font-black uppercase tracking-wider text-[#1b1533] leading-none mt-1">Secure Key</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Sidebar + Sections */}
        <div className="mt-16 grid gap-8 lg:grid-cols-[280px_1fr] items-start">

          <aside className="lg:sticky lg:top-24 space-y-2 bg-white border border-slate-100 rounded-[28px] p-5 shadow-sm overflow-x-auto lg:overflow-x-visible scrollbar-none flex lg:flex-col gap-2 lg:gap-0 flex-nowrap z-20">
            <span className="hidden lg:block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3 px-3 leading-none logo-font">Product Profile</span>
            {sectionsList.map((sec) => {
              const IconComponent = sec.icon;
              return (
                <button
                  key={sec.id}
                  onClick={() => {
                    setActiveSection(sec.id);
                    document.getElementById(`sec-${sec.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className={`flex items-center gap-3.5 px-4.5 py-3.5 text-xs font-black uppercase tracking-widest rounded-2xl cursor-pointer transition-all duration-200 whitespace-nowrap lg:w-full text-left leading-none ${activeSection === sec.id
                      ? 'bg-[#ff4fa3] text-white shadow-md shadow-pink-100'
                      : 'text-slate-500 hover:text-[#ff4fa3] hover:bg-slate-50'
                    }`}
                >
                  <IconComponent className="h-4.5 w-4.5 shrink-0 stroke-[2.2]" />
                  <span className="logo-font">{sec.label}</span>
                </button>
              );
            })}
          </aside>

          <div className="space-y-12">

            {/* 1. Overview */}
            <section id="sec-overview" className="bg-white border border-slate-100 rounded-[32px] p-6 md:p-8 shadow-sm space-y-6 scroll-mt-28">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="h-10 w-10 rounded-xl bg-pink-50 flex items-center justify-center text-[#ff4fa3]">
                  <BookOpen className="h-5 w-5 stroke-[2.2]" />
                </div>
                <h3 className="text-lg font-black text-[#1b1533] uppercase logo-font">{sectionsData.overview.title}</h3>
              </div>
              <p className="text-xs md:text-sm font-semibold leading-relaxed text-slate-500">{sectionsData.overview.content}</p>
              <div className="grid gap-3 sm:grid-cols-3">
                {sectionsData.overview.highlights.map((hl, index) => (
                  <div key={index} className="bg-[#fff8f3] border border-pink-100/10 rounded-2xl p-4 flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#ff4fa3] shrink-0 stroke-[2.5]" />
                    <span className="text-[12px] font-black uppercase text-[#1b1533] logo-font">{hl}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 space-y-4 border-t border-slate-100">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Chemical Analysis</span>
                  <h4 className="text-xs font-black text-[#1b1533] uppercase logo-font">Potency Profile Summary</h4>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { label: 'THC Analysis', val: productData.compounds.thc, color: 'pink' },
                    { label: 'CBD Analysis', val: productData.compounds.cbd, color: 'purple' },
                    { label: 'CBN Analysis', val: productData.compounds.cbn, color: 'indigo' },
                  ].map((item, idx) => (
                    <div key={idx} className="border border-slate-100 rounded-2xl p-4 bg-[#fffdfd] flex items-center gap-3.5">
                      <div className={`h-9 w-9 shrink-0 rounded-xl bg-${item.color}-50 flex items-center justify-center font-black text-${item.color}-500 text-xs`}>
                        {item.val}
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Level</span>
                        <strong className="block text-xs font-black uppercase text-[#1b1533] mt-0.5">{item.label}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 2. Appearance */}
            <section id="sec-appearance" className="bg-white border border-slate-100 rounded-[32px] p-6 md:p-8 shadow-sm space-y-6 scroll-mt-28">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="h-10 w-10 rounded-xl bg-pink-50 flex items-center justify-center text-[#ff4fa3]">
                  <Sparkles className="h-5 w-5 stroke-[2.2]" />
                </div>
                <h3 className="text-lg font-black text-[#1b1533] uppercase logo-font">{sectionsData.appearance.title}</h3>
              </div>
              <p className="text-xs md:text-sm font-semibold leading-relaxed text-slate-500">{sectionsData.appearance.content}</p>
              <div className="space-y-2.5">
                {sectionsData.appearance.details.map((detail, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="h-5 w-5 rounded-full bg-pink-50 text-[#ff4fa3] flex items-center justify-center text-[10px] font-black shrink-0">✓</span>
                    <span className="text-xs md:text-sm font-semibold text-slate-500 leading-normal">{detail}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. Genetics */}
            <section id="sec-genetics" className="bg-white border border-slate-100 rounded-[32px] p-6 md:p-8 shadow-sm space-y-6 scroll-mt-28">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="h-10 w-10 rounded-xl bg-pink-50 flex items-center justify-center text-[#ff4fa3]">
                  <Dna className="h-5 w-5 stroke-[2.2]" />
                </div>
                <h3 className="text-lg font-black text-[#1b1533] uppercase logo-font">{sectionsData.genetics.title}</h3>
              </div>
              <p className="text-xs md:text-sm font-semibold leading-relaxed text-slate-500">{sectionsData.genetics.content}</p>
              <div className="bg-[#fff8f3] border border-pink-100/10 rounded-2xl p-5 flex items-center gap-4">
                <div className="h-11 w-11 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-[#ff4fa3] font-bold text-sm shrink-0">🧬</div>
                <div className="leading-tight">
                  <span className="block text-[10px] font-black uppercase text-slate-400">Genetic Lineage Origin</span>
                  <strong className="block text-xs font-black text-[#1b1533] uppercase logo-font mt-1">{sectionsData.genetics.origin}</strong>
                </div>
              </div>
            </section>

            {/* 4. Popularity */}
            <section id="sec-popularity" className="bg-white border border-slate-100 rounded-[32px] p-6 md:p-8 shadow-sm space-y-6 scroll-mt-28">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="h-10 w-10 rounded-xl bg-pink-50 flex items-center justify-center text-[#ff4fa3]">
                  <TrendingUp className="h-5 w-5 stroke-[2.2]" />
                </div>
                <h3 className="text-lg font-black text-[#1b1533] uppercase logo-font">{sectionsData.popularity.title}</h3>
              </div>
              <p className="text-xs md:text-sm font-semibold leading-relaxed text-slate-500">{sectionsData.popularity.content}</p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-wider logo-font">
                ⭐ {sectionsData.popularity.rank}
              </div>
            </section>

            {/* 5. Why Choose It */}
            <section id="sec-why-choose-us" className="bg-white border border-slate-100 rounded-[32px] p-6 md:p-8 shadow-sm space-y-6 scroll-mt-28">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="h-10 w-10 rounded-xl bg-pink-50 flex items-center justify-center text-[#ff4fa3]">
                  <ThumbsUp className="h-5 w-5 stroke-[2.2]" />
                </div>
                <h3 className="text-lg font-black text-[#1b1533] uppercase logo-font">{sectionsData.whyChooseUs.title}</h3>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {sectionsData.whyChooseUs.points.map((point, index) => (
                  <div key={index} className="flex items-start gap-3.5 p-4.5 rounded-2xl bg-slate-50/50 border border-slate-100/50">
                    <span className="h-6 w-6 rounded-lg bg-pink-50 text-[#ff4fa3] flex items-center justify-center text-xs font-black shrink-0">✓</span>
                    <div className="leading-tight">
                      <strong className="block text-xs font-black text-[#1b1533] uppercase logo-font">{point.title}</strong>
                      <p className="text-[12px] font-semibold text-slate-400 mt-1 leading-normal">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 6. Strain Information */}
            <section id="sec-strain-info" className="bg-white border border-slate-100 rounded-[32px] p-6 md:p-8 shadow-sm space-y-6 scroll-mt-28">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="h-10 w-10 rounded-xl bg-pink-50 flex items-center justify-center text-[#ff4fa3]">
                  <Activity className="h-5 w-5 stroke-[2.2]" />
                </div>
                <h3 className="text-lg font-black text-[#1b1533] uppercase logo-font">{sectionsData.strainInfo.title}</h3>
              </div>
              <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-inner bg-slate-50/10">
                <div className="divide-y divide-slate-100">
                  {sectionsData.strainInfo.specs.map((spec, index) => (
                    <div key={index} className="grid grid-cols-[1.5fr_2fr] p-3 text-xs md:text-sm">
                      <span className="font-black text-[#1b1533] uppercase logo-font shrink-0">{spec.label}</span>
                      <span className="text-slate-500 font-semibold text-right sm:text-left">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 7. FAQ */}
            <section id="sec-faq" className="bg-white border border-slate-100 rounded-[32px] p-6 md:p-8 shadow-sm space-y-6 scroll-mt-28">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="h-10 w-10 rounded-xl bg-pink-50 flex items-center justify-center text-[#ff4fa3]">
                  <HelpCircle className="h-5 w-5 stroke-[2.2]" />
                </div>
                <h3 className="text-lg font-black text-[#1b1533] uppercase logo-font">{sectionsData.faq.title}</h3>
              </div>
              <div className="space-y-4">
                {sectionsData.faq.items.map((item, index) => {
                  const isOpen = openFaqTab === index;
                  return (
                    <div key={index} className="border border-slate-100 rounded-2xl bg-white overflow-hidden shadow-sm">
                      <button
                        onClick={() => setOpenFaqTab(isOpen ? null : index)}
                        className="flex w-full items-center justify-between px-5 py-4 text-left text-xs font-black uppercase tracking-wider text-[#1b1533] hover:text-[#ff4fa3] focus:outline-none cursor-pointer"
                      >
                        <span className="logo-font">{item.q}</span>
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-slate-50 text-slate-400">
                          {isOpen ? <Minus className="h-3 w-3 stroke-[2.5]" /> : <Plus className="h-3 w-3 stroke-[2.5]" />}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 text-xs font-semibold leading-relaxed text-slate-500 border-t border-slate-50 pt-3">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 8. Reviews */}
            <section id="sec-reviews" className="bg-white border border-slate-100 rounded-[32px] p-6 md:p-8 shadow-sm space-y-6 scroll-mt-28">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="h-10 w-10 rounded-xl bg-pink-50 flex items-center justify-center text-[#ff4fa3]">
                  <MessageSquare className="h-5 w-5 stroke-[2.2]" />
                </div>
                <h3 className="text-lg font-black text-[#1b1533] uppercase logo-font">Reviews ({reviewsList.length})</h3>
              </div>

              <div className="space-y-6">
                {reviewsList.map(([name, text, rating], i) => (
                  <div key={i} className="border-b border-slate-100 pb-5 last:border-b-0">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-pink-100 text-pink-600 font-extrabold text-sm uppercase leading-none">
                        {name[0]}
                      </span>
                      <div>
                        <b className="block text-xs font-black text-[#1b1533] uppercase logo-font leading-none">{name}</b>
                        <div className="flex gap-0.5 text-amber-400 mt-1">
                          {Array.from({ length: rating || 5 }).map((_, star) => (
                            <Star key={star} className="h-3 w-3 fill-current stroke-none" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-xs font-semibold leading-relaxed text-slate-500 pl-13 italic">"{text}"</p>
                  </div>
                ))}
              </div>

              <div className="h-px bg-slate-100 my-6" />

              {!isLoggedIn ? (
                <div className="rounded-3xl border border-pink-100/80 bg-[#fffdfd] p-6 shadow-sm flex flex-col items-center justify-center text-center gap-4 max-w-xl">
                  <div className="h-12 w-12 rounded-2xl bg-pink-50 flex items-center justify-center text-[#ff4fa3]">
                    <Lock className="h-5 w-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-[#1b1533] uppercase logo-font leading-none">Write a Customer Review</h4>
                    <p className="text-[12px] text-slate-400 mt-2 font-semibold leading-normal max-w-[280px]">You must be logged in to write a review on this product.</p>
                  </div>
                  <button
                    onClick={() => setIsLoggedIn(true)}
                    className="rounded-2xl bg-[#ff4fa3] text-white border border-[#ff4fa3] px-6 py-2.5 text-[12px] font-black uppercase tracking-widest shadow-md shadow-pink-100 transition-all duration-300 hover:bg-black hover:text-[#ff4fa3] hover:border-black hover:-translate-y-0.5 active:translate-y-0 cursor-pointer logo-font flex items-center gap-1.5"
                  >
                    <span>Login to your Account</span> <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                  </button>
                </div>
              ) : (
                <div className="bg-slate-50/50 border border-slate-100 rounded-3xl p-6 max-w-xl space-y-4">
                  <h4 className="text-xs font-black text-[#1b1533] uppercase logo-font leading-none">Write a Customer Review</h4>
                  <div className="space-y-1.5">
                    <span className="block text-[12px] font-black uppercase tracking-wider text-slate-400">Select Rating:</span>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReviewRating(star)}
                          className="hover:scale-110 transition-transform duration-100 focus:outline-none cursor-pointer"
                        >
                          <Star className={`h-4.5 w-4.5 stroke-none ${star <= newReviewRating ? 'fill-amber-400' : 'fill-slate-200'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[12px] font-black uppercase tracking-wider text-slate-400">Your Review:</label>
                    <textarea
                      value={newReviewText}
                      onChange={(e) => setNewReviewText(e.target.value)}
                      placeholder="Share your thoughts on the taste, potency, or experience..."
                      className="w-full h-24 rounded-2xl border border-slate-200 bg-white p-4 text-xs font-semibold outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-pink-50/50 transition-all resize-none"
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (!newReviewText.trim()) return;
                      setReviewsList([...reviewsList, ['Valued Customer', newReviewText.trim(), newReviewRating]]);
                      setNewReviewText('');
                    }}
                    className="inline-flex items-center justify-center rounded-2xl bg-[#ff4fa3] text-white border border-[#ff4fa3] px-6 py-2.5 text-[12px] font-black uppercase tracking-wider shadow-md shadow-pink-100 hover:bg-black hover:text-[#ff4fa3] hover:border-black hover:-translate-y-0.5 active:translate-y-0 cursor-pointer logo-font"
                  >
                    Submit Review
                  </button>
                </div>
              )}
            </section>

          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="mx-auto max-w-7xl px-4 py-16 border-t border-purple-100/50 md:px-8">
        <h2 className="text-3xl font-black text-[#1b1533] uppercase logo-font">Related Formulations</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((p, i) => (
            <ProductCard key={p[0]} p={p} i={i} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
