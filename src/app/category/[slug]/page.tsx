'use client';
import Link from 'next/link';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';
import {
  Sparkles,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Flame,
  Heart,
  ShoppingCart,
  ShieldCheck,
  Truck,
  Layers,
  Star,
  Smile,
  Brain,
  Compass,
  Coffee,
  Leaf,
  ArrowRight,
  HelpCircle,
  Eye,
  Award,
  Zap,
  Package,
  Gift,
  Plus,
  Check
} from 'lucide-react';

interface CategoryDetails {
  title: string;
  categoryName: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  heroImage: string;
  stats: { label: string; val: string; desc: string }[];
  popularItems: { name: string; price: string; badge: string; image: string }[];
  faq: { q: string; a: string }[];
  infoTitle: string;
  infoDesc: string;
  infoBenefits: { title: string; desc: string; icon: React.ComponentType<any> }[];
  accentColor: string;
  accentBg: string;
  titleTag?: string;
  metaDescription?: string;
  keywords?: string;
}

// Full custom category descriptions, items, and FAQs
const categoryDataMap: Record<string, CategoryDetails> = {
  'magic-mushrooms': {
    title: 'Premium Magic Mushrooms',
    categoryName: 'Magic Mushrooms',
    shortDesc: 'Explore carefully selected premium mushroom strains crafted for quality, consistency and customer satisfaction. Expertly curated genetics ranging from mild, beginner-friendly strains to premium maximum potency profiles.',
    fullDesc: 'Dried magic mushrooms (Psilocybe Cubensis) have been utilized for centuries in spiritual, therapeutic, and transformative wellness rituals. At FunGuyz, we work with Canada’s elite mycological growers to guarantee absolute genetic purity. Every crop is harvested inside state-of-the-art sterile cleanrooms, ensuring high active alkaloid density and zero chemical contaminants. Our dried strains are perfectly preserved and shipped in double-sealed, discreet vacuum packs to maintain absolute freshness. Whether you are looking for visual, transcendent journeys with Penis Envy and Jack Frost or balanced, introspective sessions with Golden Teachers, we provide the highest quality available.',
    icon: '🍄',
    heroImage: '/images/cat_mushrooms.webp',
    stats: [
      { label: 'Products', val: '25+', desc: 'Organic Strains Available' },
      { label: 'Standard', val: '100% Tested', desc: 'Laboratory Pure Cultivars' },
      { label: 'Shipping', val: 'Fast & Discreet', desc: 'Double Sealed Packaging' },
      { label: 'Rating', val: '4.9 ★★★★★', desc: 'From 5,000+ Reviews' }
    ],
    popularItems: [
      { name: 'Golden Teacher', price: '$59.99', badge: 'Top Rated', image: '/images/prod_golden_teacher.webp' },
      { name: 'Penis Envy', price: '$79.99', badge: 'Premium', image: '/images/prod_penis_envy.webp' },
      { name: 'Blue Meanies', price: '$64.99', badge: 'Best Seller', image: '/images/prod_penis_envy.webp' },
      { name: 'Jack Frost', price: '$69.99', badge: 'Rare', image: '/images/prod_golden_teacher.webp' },
      { name: 'Albino Penis Envy', price: '$84.99', badge: 'Max Potency', image: '/images/prod_penis_envy.webp' },
      { name: 'Tidal Wave', price: '$74.99', badge: 'New', image: '/images/prod_golden_teacher.webp' },
      { name: 'B+ Strain', price: '$49.99', badge: 'Beginner', image: '/images/prod_golden_teacher.webp' }
    ],
    faq: [
      { q: 'How should I store dried magic mushrooms?', a: 'Keep them in an airtight, vacuum-sealed container inside a cool, dark place. Avoid humidity and direct exposure to light to maintain potency for up to a year.' },
      { q: 'What is the difference in potency between Penis Envy and Golden Teacher?', a: 'Penis Envy is widely regarded as one of the most potent Psilocybe Cubensis strains, often containing up to 2x the active alkaloid density compared to Golden Teachers, which are known for a gentler, more introspective journey.' },
      { q: 'Are your dried magic mushrooms laboratory tested?', a: 'Yes, all our crops are grown in state-of-the-art sterile cleanrooms and undergo rigorous batch tests to ensure absolute genetic purity and zero contaminants.' }
    ],
    infoTitle: 'Why Choose Our Magic Mushrooms?',
    infoDesc: 'Our dried magic mushrooms represent the pinnacle of organic Canadian mycology. By partnering with elite commercial growers, we ensure that every single flush is cultivated under clean laboratory standards. The result is pure, high-potency psilocybin containing robust levels of active compounds to guarantee complete customer satisfaction.',
    infoBenefits: [
      { title: 'Mood Support', desc: 'Promotes deep emotional healing and positive mood lift.', icon: Smile },
      { title: 'Creativity', desc: 'Allows access to deep creative flow states and abstract ideas.', icon: Sparkles },
      { title: 'Focus', desc: 'Fosters intense mental concentration and task absorption.', icon: Brain },
      { title: 'Mindfulness', desc: 'Enhances self-awareness and present-moment connection.', icon: Compass },
      { title: 'Relaxation', desc: 'Fights daily stress, leaving you in a state of absolute calm.', icon: Coffee },
      { title: 'Natural Wellness', desc: '100% organic mycological extracts, zero synthetic pesticides.', icon: Leaf }
    ],
    accentColor: '#FF4FA3',
    accentBg: 'bg-[#FF4fa3]/5 text-[#ff4fa3] border-[#ff4fa3]/20',
    titleTag: 'Magic Mushroom Delivery Canada | Premium Strains | FunGuyz',
    metaDescription: 'Browse premium magic mushroom strains with fast delivery across Toronto, the GTA and Canada-wide shipping.',
    keywords: 'magic mushroom delivery, mushroom delivery Canada, psilocybin mushrooms Canada, mushroom strains, FunGuyz'
  },
  'edibles': {
    titleTag: 'Mushroom Edibles Delivery Canada | FunGuyz',
    metaDescription: 'Shop mushroom chocolates, gummies and infused edibles with fast delivery across Toronto, the GTA and Canada-wide shipping.',
    keywords: 'mushroom edibles Canada, mushroom chocolate delivery, mushroom gummies Canada, edible delivery Canada',
    title: 'Delicious Mushroom Edibles',
    categoryName: 'Edibles',
    shortDesc: 'Discover gummies, chocolates and teas crafted for taste, quality and a smooth shopping experience. Our precise, lab-tested edible formulations offer a tasty, controlled, and smoke-free way to navigate your wellness journey.',
    fullDesc: 'Psilocybin edibles are the ideal choice for individuals seeking a precise, delicious, and stomach-friendly alternative to dried raw mushrooms. Our premium catalog includes highly concentrated fruit gummies (watermelon, blue raspberry, strawberry, peach) and luxury Belgian chocolates (milk chocolate, dark chocolate, cookies & cream). Every single batch is manufactured inside certified culinary facilities, infusing exact milligram doses of pure psilocybin extract. This ensures a highly consistent onset, balanced energy, and zero digestion discomfort. Enjoy a smooth experience with delicious gourmet flavors, wrapped in certified food-grade packaging.',
    icon: '🍬',
    heroImage: '/images/cat_edibles.webp',
    stats: [
      { label: 'Products', val: '18+', desc: 'Delicious Edibles In-Stock' },
      { label: 'Formulation', val: 'Lab Infused', desc: 'Gourmet Culinary Grade' },
      { label: 'Dosage', val: 'Precise mg', desc: 'Accurate Block Molding' },
      { label: 'Rating', val: '4.8 ★★★★★', desc: 'From 3,200+ Taste Reviews' }
    ],
    popularItems: [
      { name: 'Blue Raspberry Gummies', price: '$34.99', badge: 'Best Seller', image: '/images/prod_blue_gummies.webp' },
      { name: 'Watermelon Gummies', price: '$34.99', badge: 'Popular', image: '/images/prod_blue_gummies.webp' },
      { name: 'Milk Chocolate Bar', price: '$27.99', badge: 'Smooth', image: '/images/prod_blue_gummies.webp' },
      { name: 'Dark Chocolate Bar', price: '$29.99', badge: 'Organic', image: '/images/prod_blue_gummies.webp' },
      { name: 'Mushroom Tea', price: '$24.99', badge: 'Calming', image: '/images/prod_blue_gummies.webp' }
    ],
    faq: [
      { q: 'How long do mushroom edibles take to kick in?', a: 'Edibles typically take between 30 to 60 minutes to onset. The active psilocybin is absorbed through the digestive tract, so we highly recommend waiting at least 90 minutes before considering an additional dose.' },
      { q: 'Are your gummies vegan or gluten-free?', a: 'Most of our premium fruit gummies are organic, gluten-free, and pectin-based (vegan friendly). Please check individual product ingredient labels for detailed culinary specifications.' },
      { q: 'How should I dose mushroom chocolates?', a: 'Our chocolate bars are molded into grid-blocks with precise micro-doses of psilocybin extract per square. This makes it incredibly easy to start with one square (100mg to 250mg) and scale up as desired.' }
    ],
    infoTitle: 'Why Choose Our Edibles?',
    infoDesc: 'Our mushroom edibles eliminate the earthy taste of raw mushrooms, replacing it with gourmet Belgian chocolates and juicy organic gummies. Infused with laboratory-isolated psilocybin extract, these products bypass the stomach discomfort sometimes associated with dried raw material.',
    infoBenefits: [
      { title: 'Mood Support', desc: 'Drives warm social energy and mild mood elevation.', icon: Smile },
      { title: 'Creativity', desc: 'Expands thought associations and artistic visual flair.', icon: Sparkles },
      { title: 'Focus', desc: 'Brings steady concentration without over-stimulating.', icon: Brain },
      { title: 'Mindfulness', desc: 'Reduces internal chatter, connecting you to the present.', icon: Compass },
      { title: 'Relaxation', desc: 'Gently relaxes tense muscles and mental resistance.', icon: Coffee },
      { title: 'Natural Wellness', desc: 'Crafted with premium natural ingredients and pure distillates.', icon: Leaf }
    ],
    accentColor: '#2FDFFF',
    accentBg: 'bg-[#2FDFFF]/5 text-[#00b4d8] border-[#2FDFFF]/20'
  },
  'capsules': {
    title: 'Premium Mushroom Capsules',
    categoryName: 'Capsules',
    shortDesc: 'Shop convenient capsules designed for simple daily use, wellness support and easy product selection. Tasteless, precisely measured capsule supplements designed for therapeutic mental health support.',
    fullDesc: 'Psilocybin capsules are formulated for wellness-focused individuals seeking the tasteless convenience of daily supplements. Our capsules blend precise micro-doses of organic Psilocybe Cubensis alongside powerful adaptogenic botanicals like Lion’s Mane, Reishi, Chaga, and Cordyceps. This creates a powerful synergistic stack that promotes brain neuroplasticity, elevates cognitive focus, balances daily mood states, and naturally fights physical fatigue. Processed inside clean laboratory standards, our vegetarian capsule shells dissolve smoothly, delivering steady, clean absorption without any digestive discomfort.',
    icon: '💊',
    heroImage: '/images/cat_capsules.webp',
    stats: [
      { label: 'Products', val: '14+', desc: 'Capsule Packs Available' },
      { label: 'Purity', val: '100% Veggie', desc: 'Cellulose Dissolving Shells' },
      { label: 'Blend', val: 'Synergistic', desc: 'Psilocybin + Adaptogens' },
      { label: 'Rating', val: '4.9 ★★★★★', desc: 'From 2,400+ Active Stacks' }
    ],
    popularItems: [
      { name: 'Golden Teacher Capsules', price: '$39.99', badge: 'Wellness', image: '/images/prod_teacher_capsules.webp' },
      { name: 'Focus Capsules', price: '$31.99', badge: 'Focus', image: '/images/prod_teacher_capsules.webp' },
      { name: 'Energy Capsules', price: '$31.99', badge: 'Energy', image: '/images/prod_teacher_capsules.webp' },
      { name: 'Relax Capsules', price: '$35.99', badge: 'Calm', image: '/images/prod_teacher_capsules.webp' },
      { name: 'Lion’s Mane Capsules', price: '$29.99', badge: 'Cognitive', image: '/images/prod_teacher_capsules.webp' }
    ],
    faq: [
      { q: 'What are the key benefits of taking mushroom capsules?', a: 'Capsules offer a tasteless, highly convenient, and discreet way to incorporate adaptogens and psilocybin into your daily wellness routine. They are precisely measured, preventing any accidental dosing errors.' },
      { q: 'Can I take capsules on an empty stomach?', a: 'Yes, our capsule shells are made from fast-dissolving vegetable cellulose and are mixed with ginger root or peppermint to prevent any form of digestion discomfort or nausea.' },
      { q: 'How long does a capsule bottle last?', a: 'Our standard capsule bottles contain 30 precisely formulated capsules. Depending on your scheduling stack (such as taking 1 capsule every 3 days), a single bottle will easily last 2 to 3 months.' }
    ],
    infoTitle: 'Why Choose Our Capsules?',
    infoDesc: 'Our high-density wellness capsules are crafted under strict laboratory parameters to bring you tasteless, convenient daily supplementation. By blending raw active psilocybin with certified organic adaptogens, our formulas support long-term brain health and general cognitive well-being.',
    infoBenefits: [
      { title: 'Mood Support', desc: 'Helps balance serotonin pathways to stabilize daily mood.', icon: Smile },
      { title: 'Creativity', desc: 'Encourages dynamic lateral thinking and synaptic mapping.', icon: Sparkles },
      { title: 'Focus', desc: 'Stimulates Brain-Derived Neurotrophic Factor (BDNF).', icon: Brain },
      { title: 'Mindfulness', desc: 'Soothes neurological static to help ground meditation.', icon: Compass },
      { title: 'Relaxation', desc: 'Supports adrenal function to prevent physical burnout.', icon: Coffee },
      { title: 'Natural Wellness', desc: 'Pesticide-free mycological blends mixed with clean botanicals.', icon: Leaf }
    ],
    accentColor: '#7B5CFF',
    accentBg: 'bg-[#7B5CFF]/5 text-[#7b5cff] border-[#7b5cff]/20'
  },
  'microdose': {
    title: 'Premium Microdose Capsules',
    categoryName: 'Microdose',
    shortDesc: 'Explore the complete FunGuyz collection of premium microdose capsules available for delivery throughout Toronto, Mississauga, Brampton, Scarborough, North York, Etobicoke, Vaughan, Markham, Richmond Hill, Pickering, Ajax, Whitby, Oshawa, Newmarket, Aurora, Barrie, and surrounding GTA communities. Our collection includes Golden Teacher Microdose, Penis Envy Microdose, Stamets Stack, Creativity Blend, Productivity Blend, and Wellness Blend capsules, all prepared with quality, consistency, and customer satisfaction in mind.',
    fullDesc: 'Microdosing involves consuming sub-perceptual quantities of psilocybin (typically 50mg to 250mg) on a scheduled basis (such as the Fadiman or Stamets stack). At this low level, there are zero visual hallucinations or cognitive distortions; instead, users experience enhanced creative problem-solving, elevated focus, reduced social anxiety, and positive mood elevation. All our microdose capsules are blended with pristine organic ingredients to support cognitive longevity. Ideal for professionals, creatives, and anyone seeking high-performance mental clarity.',
    icon: '⚡',
    heroImage: '/images/cat_microdose.webp',
    titleTag: 'Microdose Capsules Delivery Canada | FunGuyz',
    metaDescription: 'Browse microdose capsules and blends with fast delivery across Toronto, the GTA and Canada-wide shipping.',
    keywords: 'microdose capsules Canada, microdose delivery Canada, mushroom microdose, microdosing Canada',
    stats: [
      { label: 'Products', val: '12+', desc: 'Productivity Stacks' },
      { label: 'Experience', val: 'Sub-Perceptual', desc: 'No Hallucinations/Trips' },
      { label: 'Protocol', val: 'Fadiman / Stamets', desc: 'Safe Scheduled Intake' },
      { label: 'Rating', val: '4.9 ★★★★★', desc: 'From 4,100+ Daily Creators' }
    ],
    popularItems: [
      { name: 'Microdose Daily Blend', price: '$29.99', badge: 'Daily', image: '/images/prod_daily_blend.webp' },
      { name: 'Focus & Clarity', price: '$32.99', badge: 'Clarity', image: '/images/prod_daily_blend.webp' },
      { name: 'Stamets Stack', price: '$44.99', badge: 'Synergy', image: '/images/prod_daily_blend.webp' },
      { name: 'Premium Microdose Blend', price: '$39.99', badge: 'Maximum', image: '/images/prod_daily_blend.webp' },
      { name: 'Golden Teacher Microdose', price: '$34.99', badge: 'Popular', image: '/images/prod_daily_blend.webp' }
    ],
    faq: [
      { q: 'Will microdosing make me feel high or hallucinate?', a: 'No. A true microdose is "sub-perceptual," meaning it is taken at a low level (typically 50mg to 200mg) that does not cause visual distortions, hallucinations, or cognitive impairment. You can go about your professional day completely as normal.' },
      { q: 'What microdosing schedule should I follow?', a: 'We highly recommend the Fadiman Protocol (1 day on, 2 days off) or the Stamets Stack (4 days on, 3 days off) to prevent your body from building a tolerance to the active psilocybin compounds.' },
      { q: 'How does microdosing elevate focus and creativity?', a: 'Psilocybin promotes brain neuroplasticity and active communication between regions that don\'t usually talk to each other, while temporarily turning down the Default Mode Network (DMN), facilitating flow states and outside-the-box thinking.' }
    ],
    infoTitle: 'Why Choose Our Microdose Blends?',
    infoDesc: 'Our microdose capsules are custom formulated to promote high cognitive output and deep mental flow. Processed under pharmaceutical cleanroom standards, our scheduled stacks are the absolute premium option for modern Canadian creatives, professionals, and students.',
    infoBenefits: [
      { title: 'Mood Support', desc: 'Subtly boosts serotonin activity to ward off mild anxiety.', icon: Smile },
      { title: 'Creativity', desc: 'Unlocks cognitive flexibility and original problem-solving.', icon: Sparkles },
      { title: 'Focus', desc: 'Helps sustain deep work blocks without nervous jitters.', icon: Brain },
      { title: 'Mindfulness', desc: 'Dissolves cognitive noise, leaving a clean mental canvas.', icon: Compass },
      { title: 'Relaxation', desc: 'Relaxes overstimulated central nervous systems.', icon: Coffee },
      { title: 'Natural Wellness', desc: 'Clean, plant-derived micro-capsules crafted with zero synthetic binders.', icon: Leaf }
    ],
    accentColor: '#FF4FA3',
    accentBg: 'bg-[#FF4fa3]/5 text-[#ff4fa3] border-[#ff4fa3]/20'
  }
};


export default function DedicatedCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const slugKey = slug.toLowerCase();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('default');

  // Sidebar Interactive Filter States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStrength, setSelectedStrength] = useState<string>('all');
  const [selectedEffect, setSelectedEffect] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(true);

  const [dbProducts, setDbProducts] = useState<any[]>([]);

  React.useEffect(() => {
    async function fetchProducts() {
      const cachedGlobalString = sessionStorage.getItem('globalRelatedProducts');
      const cachedGlobalProducts = cachedGlobalString ? JSON.parse(cachedGlobalString) : [];

      if (cachedGlobalProducts && cachedGlobalProducts.length > 0) {
        setDbProducts(cachedGlobalProducts);
        return;
      }

      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.success) {
          setDbProducts(data.products);
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('globalRelatedProducts', JSON.stringify(data.products));
          }
        }
      } catch (err) {
        console.error('Failed to fetch global products', err);
      }
    }
    fetchProducts();
  }, []);

  // FAQ accordion open states (mapped by index)
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

  const category = categoryDataMap[slugKey] || categoryDataMap['magic-mushrooms'];




  // ==========================================
  // RENDER CUSTOM BUNDLES COLLECTION PAGE (LEGACY ROUTE - DISABLED)
  // ==========================================
  if (slugKey === 'bundles-legacy') {
    return null;
  }
  if (false) {
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
              <div className="flex items-center gap-1.5 text-[12px] font-black uppercase tracking-widest text-slate-400 logo-font leading-none">
                <Link href="/" className="hover:text-[#ff4fa3] transition-colors">Home</Link>
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
                  { label: 'Express Shipping', desc: '🚚 $20 Flat Rate Delivery' },
                  { label: 'Most Popular Choice', desc: '⭐ Best Value' }
                ].map((prop, idx) => (
                  <div key={idx} className="bg-white/80 border border-pink-100/30 rounded-xl p-2.5 shadow-sm text-left">
                    <span className="block text-[12px] uppercase tracking-wider text-slate-400 font-bold leading-none">{prop.desc}</span>
                    <strong className="block text-[12px] font-black text-[#1b1533] logo-font mt-1.5 leading-none">{prop.label}</strong>
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
                      <strong className="block text-[12px] font-black uppercase text-[#1b1533] logo-font mt-2 leading-none">{elem.label}</strong>
                    </div>
                  ))}
                </div>

                {/* Secure seal stamp */}
                <div className="flex items-center gap-1 mt-4 text-[12px] font-bold text-slate-400">
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
                <span className="text-[12px] font-bold text-slate-400 mt-1">{stat.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Featured Bundles Section */}
        <section id="featured-bundles" className="mx-auto max-w-7xl px-4 py-16 md:px-8">
          <div className="text-center space-y-2 mb-12 max-w-md mx-auto">
            <span className="text-[12px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Featured Packs</span>
            <h2 className="text-3xl font-black text-[#1b1533] uppercase logo-font">Shop Our Curated Stacks</h2>
            <p className="text-xs text-slate-400">Pre-packaged compound selections formulated by request to ensure maximum synergistic benefits and massive savings.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">

            {/* Starter Bundle */}
            <div className="bg-white border border-slate-100 rounded-[36px] p-6 shadow-sm flex flex-col justify-between items-start text-left gap-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative group">
              <span className="absolute left-6 top-6 bg-slate-50 border border-slate-100 text-slate-500 rounded-full px-3.5 py-1 text-[10px] font-black uppercase tracking-widest leading-none">
                Entry Level
              </span>
              <div className="w-full text-right">
                <span className="text-3xl">🌱</span>
              </div>

              <div className="space-y-1.5 w-full mt-4">
                <h3 className="text-xl font-black text-[#1b1533] uppercase logo-font leading-none">Starter Bundle</h3>
                <span className="block text-[12px] text-slate-400 font-bold uppercase">Perfect For Beginners</span>

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
                  <span className="block text-[12px] text-slate-400 font-black uppercase tracking-wider">Save 15%</span>
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
              <span className="absolute left-6 top-6 bg-[#ff4fa3] text-white rounded-full px-3.5 py-1 text-[10px] font-black uppercase tracking-widest leading-none shadow-sm shadow-pink-100 flex items-center gap-1 animate-pulse">
                <Flame className="h-3 w-3 fill-current" /> Best Seller
              </span>
              <div className="w-full text-right">
                <span className="text-3xl">🔥</span>
              </div>

              <div className="space-y-1.5 w-full mt-4">
                <h3 className="text-xl font-black text-[#1b1533] uppercase logo-font leading-none">Best Seller Bundle</h3>
                <span className="block text-[12px] text-slate-400 font-bold uppercase">Customer Favorite Stack</span>

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
                  <span className="block text-[12px] text-slate-400 font-black uppercase tracking-wider">Save 20%</span>
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
              <span className="absolute left-6 top-6 bg-[#7b5cff]/10 border border-[#7b5cff]/20 text-[#7b5cff] rounded-full px-3.5 py-1 text-[10px] font-black uppercase tracking-widest leading-none">
                👑 Premium Bundle
              </span>
              <div className="w-full text-right">
                <span className="text-3xl">✨</span>
              </div>

              <div className="space-y-1.5 w-full mt-4">
                <h3 className="text-xl font-black text-[#1b1533] uppercase logo-font leading-none">Ultimate Bundle</h3>
                <span className="block text-[12px] text-slate-400 font-bold uppercase">Maximum Compound Variety</span>

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
                  <span className="block text-[12px] text-slate-400 font-black uppercase tracking-wider">Save 25%</span>
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
            <span className="text-[12px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Interactive Builder</span>
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
                    { name: 'Golden Teacher', price: 40, desc: 'Earthy, introspective favority' },
                    { name: 'Penis Envy', price: 50, desc: 'Maximum potency visuals profile' },
                    { name: 'Blue Meanies', price: 45, desc: 'Highly potent energetic genetics' },
                    { name: 'Jack Frost', price: 48, desc: 'Rare clean crystals and euphoria' }
                  ].map((opt) => (
                    <button
                      key={opt.name}
                      type="button"
                      onClick={() => setBuildMushroom({ name: opt.name, price: opt.price })}
                      className={`rounded-2xl border p-4 text-left cursor-pointer transition-all flex justify-between items-center ${buildMushroom.name === opt.name
                        ? 'border-[#ff4fa3] bg-pink-50/10 shadow-sm'
                        : 'border-slate-100 hover:border-pink-300'
                        }`}
                    >
                      <div className="leading-tight">
                        <span className="block text-xs font-black uppercase text-[#1b1533] logo-font">{opt.name}</span>
                        <span className="block text-[12px] text-slate-400 font-semibold mt-0.5">{opt.desc}</span>
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
                      className={`rounded-2xl border p-4 text-left cursor-pointer transition-all flex flex-col justify-between items-start gap-3 h-28 ${buildEdible.name === opt.name
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
                      className={`rounded-2xl border p-4 text-left cursor-pointer transition-all flex flex-col justify-between items-start gap-3 h-28 ${buildCapsule.name === opt.name
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
                      className={`rounded-2xl border p-4 text-left cursor-pointer transition-all flex flex-col justify-between items-start gap-3 h-28 ${buildMicrodose.name === opt.name
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
                    <span className="block text-[12px] text-slate-400 font-bold uppercase">Step 1: Strains</span>
                    <strong className="text-slate-800 logo-font">{buildMushroom.name}</strong>
                  </div>
                  <strong className="text-slate-800 font-black">${buildMushroom.price.toFixed(2)}</strong>
                </div>

                {/* Selected Edible */}
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 pt-3">
                  <div>
                    <span className="block text-[12px] text-slate-400 font-bold uppercase">Step 2: Edibles</span>
                    <strong className="text-slate-800 logo-font">{buildEdible.name}</strong>
                  </div>
                  <strong className="text-slate-800 font-black">${buildEdible.price.toFixed(2)}</strong>
                </div>

                {/* Selected Capsule */}
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 pt-3">
                  <div>
                    <span className="block text-[12px] text-slate-400 font-bold uppercase">Step 3: Capsules</span>
                    <strong className="text-slate-800 logo-font">{buildCapsule.name}</strong>
                  </div>
                  <strong className="text-slate-800 font-black">${buildCapsule.price.toFixed(2)}</strong>
                </div>

                {/* Selected Microdose */}
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 pt-3">
                  <div>
                    <span className="block text-[12px] text-slate-400 font-bold uppercase">Step 4: Microdosing</span>
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
              <span className="text-[12px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font leading-none">Synergy & Value</span>
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
                      <p className="text-[12px] font-semibold text-slate-400 mt-1.5 leading-relaxed">{benefit.desc}</p>
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
              <span className="text-[12px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Trending Stacks</span>
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
                    <span className="block text-[12px] text-slate-400 font-bold uppercase tracking-wider leading-none">Pre-Packaged</span>
                    <strong className="block text-sm font-black text-[#1b1533] logo-font leading-snug mt-2">{item.name}</strong>
                    <span className="block text-[12px] text-slate-400 font-semibold mt-1.5 leading-relaxed">{item.items}</span>
                  </div>
                  <div className="flex items-center justify-between mt-6 pt-3 border-t border-slate-50 w-full">
                    <strong className="text-emerald-600 text-xs font-black logo-font">{item.price}</strong>
                    <span className="text-[12px] font-black text-[#ff4fa3] uppercase tracking-wider group-hover:underline">Quick Buy</span>
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
              <span className="text-[12px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Reviews</span>
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
                    <span className="text-[10px] font-black uppercase text-[#ff4fa3] logo-font bg-pink-50/50 px-2 py-0.5 rounded-full">{rev.label}</span>
                  </div>

                  <p className="text-xs text-slate-500 font-semibold leading-relaxed my-2">"{rev.text}"</p>

                  <div className="border-t border-slate-100/50 pt-3 mt-auto w-full flex items-center justify-between text-[12px] font-bold text-slate-400">
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
              <span className="text-[12px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Curation Grid</span>
              <h2 className="text-2xl md:text-3xl font-black text-[#1b1533] uppercase logo-font">Compare Our Bundles</h2>
              <p className="text-xs text-slate-400">Compare products, savings, and prices across our pre-packaged curations to find your optimal stack.</p>
            </div>

            {/* Comparison Table */}
            <div className="bg-[#fffdfb] border border-purple-100/30 rounded-3xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse text-xs md:text-sm font-semibold">
                <thead>
                  <tr className="bg-[#fff8f3] text-[#1b1533] uppercase logo-font border-b border-purple-100/30 text-[12px] tracking-wider font-black">
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
              <span className="text-[12px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Got Questions?</span>
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
                    <ChevronDown className={`h-4.5 w-4.5 text-slate-400 group-hover:text-[#ff4fa3] transition-transform duration-300 shrink-0 stroke-[2.5] ${openFaqIdx === idx ? 'rotate-180' : ''
                      }`} />
                  </button>
                  <div className={`transition-all duration-300 overflow-hidden ${openFaqIdx === idx ? 'max-h-[300px] opacity-100 mt-2' : 'max-h-0 opacity-0'
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
              <span className="text-[12px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Browse More</span>
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
                    <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${relCat.bg}`}>
                      Active
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xs font-black uppercase text-slate-400 leading-none logo-font">Collection</h4>
                    <h3 className="text-base font-black text-[#1b1533] uppercase logo-font leading-tight truncate">{relCat.name}</h3>
                    <p className="text-[12px] font-semibold text-slate-400 leading-relaxed line-clamp-3">{relCat.desc}</p>
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

  // ==========================================
  // RENDER STANDARD CATEGORY PAGES
  // ==========================================
  // Filter products by category
  const baseFilteredProducts = dbProducts.filter((p: any) => p.category?.name === category.categoryName || p.category?.name?.includes(category.categoryName.replace('Magic ', '')));

  // Filter products interactively
  const activeFilteredProducts = baseFilteredProducts.filter((product) => {
    const title = (product.name || '').toLowerCase();
    const tag = (product.tags?.[0] || 'Premium').toLowerCase();
    const priceNum = product.price || 0;

    // 1. Text Search Filter
    if (searchQuery && !title.includes(searchQuery.toLowerCase())) {
      return false;
    }

    // 2. Price Range Filter
    if (selectedPriceRange === 'under35' && priceNum >= 35) return false;
    if (selectedPriceRange === '35to60' && (priceNum < 35 || priceNum > 60)) return false;
    if (selectedPriceRange === 'over60' && priceNum <= 60) return false;

    // 3. Strength Filter
    if (selectedStrength === 'mild' && !(tag.includes('beginner') || tag.includes('calm') || tag.includes('daily') || tag.includes('wellness') || tag.includes('smooth'))) return false;
    if (selectedStrength === 'moderate' && !(tag.includes('rated') || tag.includes('seller') || tag.includes('organic') || tag.includes('focus') || tag.includes('clarity') || tag.includes('popular') || tag.includes('gourmet'))) return false;
    if (selectedStrength === 'maximum' && !(tag.includes('premium') || tag.includes('max') || tag.includes('rare') || tag.includes('synergy') || tag.includes('potent') || tag.includes('new'))) return false;

    // 4. Effects Filter
    if (selectedEffect === 'focus' && !(title.includes('focus') || title.includes('clarity') || title.includes('teacher') || title.includes('stamets') || tag.includes('focus') || tag.includes('wellness'))) return false;
    if (selectedEffect === 'spiritual' && !(title.includes('envy') || title.includes('meanies') || title.includes('frost') || title.includes('wave') || tag.includes('premium') || tag.includes('max') || tag.includes('rare'))) return false;
    if (selectedEffect === 'relax' && !(title.includes('relax') || title.includes('tea') || title.includes('chocolate') || title.includes('blend') || tag.includes('smooth') || tag.includes('calm'))) return false;
    if (selectedEffect === 'energy' && !(title.includes('energy') || title.includes('gummies') || title.includes('booster') || tag.includes('seller') || tag.includes('new') || tag.includes('daily'))) return false;

    return true;
  });

  // Sort logic
  const sortedProducts = [...activeFilteredProducts].sort((a, b) => {
    const priceA = a.price || 0;
    const priceB = b.price || 0;

    if (sortBy === 'price-asc') return priceA - priceB;
    if (sortBy === 'price-desc') return priceB - priceA;
    if (sortBy === 'name-asc') return (a.name || '').localeCompare(b.name || '');
    return 0; // default
  });

  // Related categories data (excludes active category)
  const relatedCategoriesList = Object.keys(categoryDataMap)
    .filter((key) => categoryDataMap[key].categoryName !== category.categoryName)
    .map((key) => categoryDataMap[key]);

  return (
    <main className="bg-[#fff8f3] text-[#1b1533] min-h-screen selection:bg-[#ff4fa3] selection:text-white antialiased font-sans">
      <Header />

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-tr from-[#fffbf8] via-[#fffcfb] to-[#fff3ec] border-b border-purple-100/50 py-16 px-4 md:px-8">

        {/* Soft decorative background glows */}
        <div className="absolute left-[5%] top-[10%] w-[250px] h-[250px] rounded-full bg-[#ffe8db]/20 blur-[80px] pointer-events-none" />
        <div className="absolute right-[10%] top-[20%] w-[300px] h-[300px] rounded-full bg-pink-200/10 blur-[90px] pointer-events-none animate-pulse" />

        <div className="mx-auto max-w-7xl relative z-10 grid gap-8 md:grid-cols-[1.4fr_1fr] items-center">

          {/* Left Column: Content */}
          <div className="flex flex-col items-start text-left gap-4">

            {/* Breadcrumbs */}
            <div className="flex items-center gap-1.5 text-[12px] font-black uppercase tracking-widest text-slate-400 logo-font leading-none">
              <Link href="/" className="hover:text-[#ff4fa3] transition-colors">Home</Link>
              <span>/</span>
              <Link href="/shop" className="hover:text-[#ff4fa3] transition-colors">Shop</Link>
              <span>/</span>
              <span className="text-slate-600">{category.categoryName}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-4 mt-1">
              {/* Badge Icon */}
              <div className="h-14 w-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-2xl animate-pulse shrink-0">
                {category.icon}
              </div>

              <div>
                <span className="text-[12px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font leading-none">Collection</span>
                <h1 className="mt-1 text-3xl md:text-4xl font-black text-[#1b1533] uppercase leading-none tracking-tight logo-font">{category.title}</h1>
              </div>
            </div>

            {/* Descriptions & Inline Expandable "Read More" SEO Link */}
            <div className="max-w-2xl mt-2 text-left">
              <p className="text-xs md:text-sm font-semibold leading-relaxed text-slate-500">
                <span className="text-slate-600 font-bold">
                  {category.shortDesc}
                </span>
                {isExpanded && (
                  <span className="block mt-3 p-4 rounded-xl bg-white border border-pink-50/50 text-xs text-slate-500 font-semibold leading-relaxed shadow-sm transition-all duration-300 animate-fade-in">
                    {category.fullDesc}
                  </span>
                )}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-[#ff4fa3] hover:text-black hover:underline font-black text-[12px] uppercase tracking-wider ml-2 cursor-pointer logo-font inline-flex items-center gap-0.5 mt-2 md:mt-0"
                >
                  {isExpanded ? (
                    <>
                      Read Less <ChevronUp className="h-3 w-3 stroke-[2.5]" />
                    </>
                  ) : (
                    <>
                      ... Read More <ChevronDown className="h-3 w-3 stroke-[2.5]" />
                    </>
                  )}
                </button>
              </p>
            </div>

            {/* Shop Collection CTA Button */}
            <button
              onClick={() => document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-2 inline-flex items-center justify-center rounded-2xl bg-[#ff4fa3] text-white border border-[#ff4fa3] px-8 py-3.5 text-xs font-black uppercase tracking-wider shadow-md shadow-pink-100 transition-all duration-300 hover:bg-black hover:text-[#ff4fa3] hover:border-black hover:-translate-y-0.5 active:translate-y-0 cursor-pointer gap-2 logo-font"
            >
              Shop Collection <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </button>

          </div>

          {/* Right Column: Floating product image card */}
          <div className="relative flex justify-center items-center h-full w-full">
            <div className="relative w-full max-w-[290px] aspect-square rounded-[32px] overflow-hidden border-4 border-white shadow-xl shadow-pink-100/50 bg-white/50 p-2 transition-transform duration-500 hover:scale-[1.03] animate-float">
              <img
                src={category.heroImage}
                className="w-full h-full object-cover rounded-[24px]"
                alt={category.categoryName}
              />
              {/* Glass reflection overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/30 pointer-events-none" />
            </div>
          </div>

        </div>
      </section>

      {/* Stats Bar Section */}
      <section className="bg-white border-b border-purple-100/30 py-6 px-4">
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:divide-x md:divide-purple-100/50">
          {category.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center gap-1">
              <span className="text-lg md:text-xl font-black text-[#1b1533] uppercase logo-font leading-none">{stat.val}</span>
              <strong className="text-[12px] font-black uppercase tracking-wider text-slate-500 mt-1">{stat.label}</strong>
              <span className="text-[12px] font-bold text-slate-400">{stat.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Product Catalog & Listings Area */}
      <section id="catalog-section" className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[250px_1fr] items-start">

          {/* Left Sidebar Filter Section */}
          <aside className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#1b1533] logo-font flex items-center gap-1.5">
                <Filter className="h-4 w-4 text-[#ff4fa3]" /> Filter Catalog
              </h3>
              {(searchQuery || selectedPriceRange !== 'all' || selectedStrength !== 'all' || selectedEffect !== 'all' || !inStockOnly) && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedPriceRange('all');
                    setSelectedStrength('all');
                    setSelectedEffect('all');
                    setInStockOnly(true);
                  }}
                  className="text-[12px] font-black uppercase text-[#ff4fa3] hover:underline cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>

            {/* 1. Text Search Input */}
            <div className="space-y-2">
              <label className="block text-[12px] font-black uppercase tracking-wider text-slate-400">Search Products</label>
              <div className="flex items-center bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2 focus-within:border-[#ff4fa3] focus-within:bg-white transition-all shadow-inner">
                <Search className="h-4 w-4 text-slate-400 mr-2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Teacher"
                  className="w-full bg-transparent border-none text-[12px] font-semibold text-[#1b1533] outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* 2. Potency/Strength */}
            <div className="space-y-2.5">
              <label className="block text-[12px] font-black uppercase tracking-wider text-slate-400">Genetics Potency</label>
              <div className="space-y-2">
                {[
                  { id: 'all', label: 'All Strengths' },
                  { id: 'mild', label: 'Mild (Beginner)' },
                  { id: 'moderate', label: 'Moderate (Medium)' },
                  { id: 'maximum', label: 'Maximum (Highly Potent)' }
                ].map((opt) => (
                  <label key={opt.id} className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer">
                    <input
                      type="radio"
                      name="strength"
                      checked={selectedStrength === opt.id}
                      onChange={() => setSelectedStrength(opt.id)}
                      className="h-4 w-4 accent-[#ff4fa3]"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 3. Intended Effects */}
            <div className="space-y-2.5">
              <label className="block text-[12px] font-black uppercase tracking-wider text-slate-400">Intended Effects</label>
              <div className="space-y-2">
                {[
                  { id: 'all', label: 'All Effects' },
                  { id: 'focus', label: 'Focus & Clarity' },
                  { id: 'spiritual', label: 'Spiritual Ascent' },
                  { id: 'relax', label: 'Relax & Calm' },
                  { id: 'energy', label: 'Energy Boost' }
                ].map((opt) => (
                  <label key={opt.id} className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer">
                    <input
                      type="radio"
                      name="effect"
                      checked={selectedEffect === opt.id}
                      onChange={() => setSelectedEffect(opt.id)}
                      className="h-4 w-4 accent-[#ff4fa3]"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 4. Price range */}
            <div className="space-y-2.5">
              <label className="block text-[12px] font-black uppercase tracking-wider text-slate-400">Price Tier</label>
              <div className="space-y-2">
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'under35', label: 'Under $35.00' },
                  { id: '35to60', label: '$35.00 - $60.00' },
                  { id: 'over60', label: 'Over $60.00' }
                ].map((opt) => (
                  <label key={opt.id} className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      checked={selectedPriceRange === opt.id}
                      onChange={() => setSelectedPriceRange(opt.id)}
                      className="h-4 w-4 accent-[#ff4fa3]"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 5. Availability Checkbox */}
            <div className="pt-2 border-t border-slate-100">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="h-4 w-4 rounded accent-[#ff4fa3]"
                />
                <span>In Stock Only</span>
              </label>
            </div>

          </aside>

          {/* Right Product Grid Area */}
          <div className="space-y-6">

            {/* Grid Header Controls */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-purple-100/40 pb-6 text-xs font-bold text-slate-400">
              <div>
                Showing <span className="text-[#ff4fa3] font-black">{sortedProducts.length}</span> premium formulations in <strong className="text-slate-800 uppercase logo-font">{category.categoryName}</strong>
              </div>

              {/* Sorting and Grid controls */}
              <div className="flex items-center bg-white border border-slate-200/80 rounded-2xl px-3 py-2 text-xs font-bold text-slate-500 self-start sm:self-auto shadow-sm">
                <ArrowUpDown className="h-3.5 w-3.5 text-[#ff4fa3] mr-1.5" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border-none outline-none text-slate-700 cursor-pointer pr-1 font-bold"
                >
                  <option value="default">Default Sorting</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Product Name: A-Z</option>
                </select>
              </div>
            </div>

            {/* Active product grid */}
            {sortedProducts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sortedProducts.map((p, i) => (
                  <ProductCard key={p._id || p[0]} p={p} i={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-[32px] border border-slate-100 flex flex-col items-center gap-2 shadow-sm">
                <Sparkles className="h-10 w-10 text-slate-300 animate-pulse" />
                <b className="text-base font-black text-[#1b1533] uppercase logo-font">No formulations found</b>
                <p className="text-xs text-slate-400 max-w-xs leading-relaxed">We could not find any active product combinations matching your active sidebar filters. Please clear filters to browse the complete catalog.</p>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* Category Information Section */}
      <section className="bg-white border-t border-b border-purple-100/30 py-16 px-4 md:px-8">
        <div className="mx-auto max-w-7xl grid gap-12 md:grid-cols-2 items-center">

          {/* Left Column: Premium Feature Image Card */}
          <div className="relative w-full max-w-[420px] aspect-video sm:aspect-square rounded-[36px] overflow-hidden border-4 border-slate-50 shadow-lg mx-auto bg-slate-50">
            <img
              src={category.heroImage}
              className="w-full h-full object-cover"
              alt="Mycological Cultivation Quality"
            />
            {/* Custom glowing floating micro-elements */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md border border-slate-100 px-4 py-2.5 rounded-2xl flex items-center gap-2.5 shadow-md">
              <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0" />
              <div className="leading-none text-left">
                <strong className="block text-[12px] font-black text-slate-800 uppercase logo-font">Lab Certified</strong>
                <span className="text-[12px] text-slate-400 font-bold">100% Contaminant Free</span>
              </div>
            </div>
          </div>

          {/* Right Column: Benefits Header & Grid */}
          <div className="space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-[12px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font leading-none">Why Choose FunGuyz</span>
              <h2 className="text-2xl md:text-3xl font-black text-[#1b1533] uppercase logo-font leading-tight">{category.infoTitle}</h2>
              <p className="text-xs md:text-sm font-semibold text-slate-500 leading-relaxed">{category.infoDesc}</p>
            </div>

            {/* 6 Benefits Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {category.infoBenefits.map((benefit, idx) => {
                const BenefitIcon = benefit.icon;
                return (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-[#fff8f3] border border-pink-100/10 hover:border-pink-300/40 transition-colors">
                    <div className="h-8 w-8 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-[#ff4fa3] shrink-0 shadow-sm">
                      <BenefitIcon className="h-4 w-4 stroke-[2.2]" />
                    </div>
                    <div className="leading-tight text-left">
                      <h4 className="text-xs font-black uppercase text-[#1b1533] logo-font">{benefit.title}</h4>
                      <p className="text-[12px] font-semibold text-slate-400 mt-0.5 leading-snug">{benefit.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* Popular Items / Popular Strains Strip */}
      <section className="bg-gradient-to-tr from-[#fffdfc] to-[#fff7f2] py-12 border-b border-purple-100/30 px-4">
        <div className="mx-auto max-w-7xl space-y-6 text-left">
          <div className="space-y-1">
            <span className="text-[12px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Trending Strains</span>
            <h3 className="text-xl font-black text-[#1b1533] uppercase logo-font">Popular Strains & Formulations</h3>
          </div>

          {/* Horizontal scrollable flex deck */}
          <div className="flex gap-4 overflow-x-auto scrollbar-none pb-2">
            {category.popularItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 bg-white p-2.5 rounded-2xl border border-slate-100 shadow-sm shrink-0 min-w-[210px] group transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
                onClick={() => setSearchQuery(item.name)}
              >
                <div className="h-10 w-10 bg-slate-50 border border-slate-100/50 p-1.5 rounded-xl shrink-0">
                  <img src={item.image} className="h-full w-full object-contain rounded-lg" alt={item.name} />
                </div>
                <div className="leading-tight text-left">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase">{item.badge}</span>
                  <strong className="block text-xs font-black text-[#1b1533] logo-font leading-snug truncate max-w-[130px]">{item.name}</strong>
                  <span className="block text-[12px] font-black text-[#ff4fa3] mt-0.5">
                    {(() => {
                      const dbMatch = dbProducts.find((p: any) => {
                        const name1 = (p.name || '').toLowerCase();
                        const name2 = item.name.toLowerCase();
                        return name1 === name2 || name1.includes(name2) || name2.includes(name1);
                      });
                      return dbMatch ? `$${dbMatch.price.toFixed(2)}` : item.price;
                    })()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Strip Section */}
      <section className="bg-white py-10 border-b border-purple-100/30">
        <div className="mx-auto max-w-7xl px-4 grid grid-cols-3 md:grid-cols-6 gap-4 text-center">
          {[
            { title: 'Mood Support', icon: Smile, color: 'text-amber-500 bg-amber-50/50 border-amber-100/30' },
            { title: 'Creativity', icon: Sparkles, color: 'text-pink-500 bg-pink-50/50 border-pink-100/30' },
            { title: 'Focus', icon: Brain, color: 'text-sky-500 bg-sky-50/50 border-sky-100/30' },
            { title: 'Mindfulness', icon: Compass, color: 'text-emerald-500 bg-emerald-50/50 border-emerald-100/30' },
            { title: 'Relaxation', icon: Coffee, color: 'text-indigo-500 bg-indigo-50/50 border-indigo-100/30' },
            { title: 'Natural Wellness', icon: Leaf, color: 'text-rose-500 bg-rose-50/50 border-rose-100/30' }
          ].map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div key={idx} className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-[#fff8f3]/35 border border-pink-50/20 hover:scale-103 transition-transform cursor-default">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center border shadow-sm shrink-0 ${benefit.color}`}>
                  <Icon className="h-5 w-5 stroke-[2]" />
                </div>
                <strong className="text-[12px] font-black uppercase tracking-wider text-slate-500 leading-tight logo-font">{benefit.title}</strong>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-16 px-4 md:px-8 border-b border-purple-100/30">
        <div className="mx-auto max-w-3xl space-y-8 text-center">
          <div className="space-y-2">
            <span className="text-[12px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Got Questions?</span>
            <h3 className="text-2xl md:text-3xl font-black text-[#1b1533] uppercase logo-font">Category Questions & Answers</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">Explore frequently asked customer questions regarding {category.categoryName} dosages, storage, and standard active effects.</p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4 divide-y divide-purple-100/40 border border-purple-100/30 bg-[#fffdfb] rounded-3xl p-6 shadow-sm text-left">
            {category.faq.map((faqItem, idx) => (
              <div key={idx} className={`pt-4 first:pt-0 ${openFaqIdx === idx ? 'pb-2' : ''}`}>
                <button
                  onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left cursor-pointer group focus:outline-none py-1"
                >
                  <strong className="text-xs md:text-sm font-black text-[#1b1533] uppercase logo-font group-hover:text-[#ff4fa3] transition-colors flex items-center gap-2.5">
                    <HelpCircle className="h-4.5 w-4.5 text-[#ff4fa3] shrink-0 stroke-[2.2]" /> {faqItem.q}
                  </strong>
                  <ChevronDown className={`h-4.5 w-4.5 text-slate-400 group-hover:text-[#ff4fa3] transition-transform duration-300 shrink-0 stroke-[2.5] ${openFaqIdx === idx ? 'rotate-180' : ''
                    }`} />
                </button>
                <div className={`transition-all duration-300 overflow-hidden ${openFaqIdx === idx ? 'max-h-[300px] opacity-100 mt-2' : 'max-h-0 opacity-0'
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

      {/* Related Categories Card Section */}
      <section className="bg-[#fff8f3] py-16 px-4 md:px-8 border-b border-purple-100/30">
        <div className="mx-auto max-w-7xl space-y-8 text-center">
          <div className="space-y-2">
            <span className="text-[12px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Browse More</span>
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
                  <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${relCat.bg}`}>
                    Active
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-black uppercase text-slate-400 leading-none logo-font">Collection</h4>
                  <h3 className="text-base font-black text-[#1b1533] uppercase logo-font leading-tight truncate">{relCat.name}</h3>
                  <p className="text-[12px] font-semibold text-slate-400 leading-relaxed line-clamp-3">{relCat.desc}</p>
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
