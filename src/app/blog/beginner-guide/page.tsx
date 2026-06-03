'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Newsletter } from '@/components/Newsletter';
import { useCart } from '@/context/CartContext';
import { 
  Sparkles, 
  ChevronRight, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  BookOpen, 
  Compass, 
  Plus, 
  Award,
  ArrowRight
} from 'lucide-react';

export default function BeginnerGuidePage() {
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(0);
  const { addToCart } = useCart();

  // Quiz States
  const [quizStep, setQuizStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState({
    intent: '',
    experience: '',
    format: ''
  });

  const handleQuizAnswer = (key: 'intent' | 'experience' | 'format', val: string) => {
    setQuizAnswers({ ...quizAnswers, [key]: val });
    if (quizStep < 3) {
      setQuizStep(quizStep + 1);
    } else {
      setQuizStep(4); // Show results
    }
  };

  const resetQuiz = () => {
    setQuizAnswers({ intent: '', experience: '', format: '' });
    setQuizStep(1);
  };

  // Recommender Decision Matrix
  const getRecommendation = () => {
    const { intent, format } = quizAnswers;
    if (intent === 'journey') {
      return {
        title: 'Penis Envy (Maximum Potency)',
        category: 'Magic Mushrooms',
        price: '$79.99',
        imageSrc: '/images/prod_penis_envy.webp',
        desc: 'Widely regarded as one of the most potent Psilocybe Cubensis dried strains in the world. Ideal for visual, transcendent journeys.'
      };
    }
    if (format === 'sweet') {
      return {
        title: 'Blue Raspberry Gummies (Infused)',
        category: 'Edibles',
        price: '$34.99',
        imageSrc: '/images/prod_blue_gummies.webp',
        desc: 'A delicious, precisely measured fruit gummie infused with pure psilocybin extract. A highly consistent, stomach-friendly onset.'
      };
    }
    return {
      title: 'Focus & Clarity Capsules (30ct)',
      category: 'Capsules',
      price: '$31.99',
      imageSrc: '/images/prod_teacher_capsules.webp',
      desc: 'Formulated for daily wellness, blending low-dose psilocybin alongside Lion\'s Mane adaptogens to raise focus and clear brain fog.'
    };
  };

  const rec = getRecommendation();

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
            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 logo-font leading-none">
              <a href="/" className="hover:text-[#ff4fa3] transition-colors">Home</a>
              <span>&gt;</span>
              <a href="/blog" className="hover:text-[#ff4fa3] transition-colors">Blog</a>
              <span>&gt;</span>
              <span className="text-slate-600">Beginner Guide</span>
            </div>

            {/* Title */}
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Wellness Onboarding</span>
              <h1 className="text-3xl md:text-5xl font-black text-[#1b1533] uppercase tracking-tight logo-font leading-none">
                Beginner's Guide <br />
                <span className="text-[#ff4fa3]">To Psilocybin</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-xs md:text-sm font-semibold leading-relaxed text-slate-500 max-w-md">
              Welcome to your clinical, structured roadmap. Explore how to safely navigate microdosing, choose suitable cultivars, and map safe dosage thresholds.
            </p>

            <button 
              onClick={() => document.getElementById('quiz-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-xs font-black uppercase tracking-wider text-[#ff4fa3] hover:text-black transition-colors duration-200 logo-font border-b-2 border-transparent hover:border-black pb-0.5"
            >
              Take Product Quiz &rarr;
            </button>

          </div>

          {/* Right Hero Block */}
          <div className="relative flex justify-center items-center select-none animate-float hidden md:flex">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ff4fa3]/10 to-[#7b5cff]/15 rounded-[40px] rotate-3 scale-95 blur-sm" />
            <div className="relative bg-white/70 backdrop-blur-md border border-pink-100/60 rounded-[40px] p-6 shadow-[0_24px_70px_rgba(255,79,163,0.12)] max-w-xs text-left space-y-3">
              <BookOpen className="h-6 w-6 text-[#ff4fa3]" />
              <h3 className="text-xs font-black uppercase text-[#1b1533] logo-font">Safe Onboarding</h3>
              <p className="text-[10px] font-semibold text-slate-400 leading-normal">
                Expert instructions covering set, setting, intent alignment, and low-tolerance dosage stacks.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Step-by-Step Onboarding Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="text-center space-y-2 mb-12 max-w-md mx-auto">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Roadmap</span>
          <h2 className="text-2xl md:text-3xl font-black text-[#1b1533] uppercase logo-font">4-Step Onboarding Roadmap</h2>
          <p className="text-xs text-slate-400 font-semibold">Follow our basic structural guidelines to guarantee a warm, safe, and positive wellness experience.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-left">
          {[
            { step: '01', title: 'Determine Intent', desc: 'Are you microdosing for daily cognitive focus and anxiety relief, or exploring spiritual visual trips? Aligning intent shapes your dose and strain.', icon: Compass },
            { step: '02', title: 'Align Environment', desc: 'Choose a familiar, safe, and stress-free setting (set & setting). Ensure you have zero active professional tasks and are in a calm state.', icon: ShieldCheck },
            { step: '03', title: 'Weight & Dosage', desc: 'Doses scale by weight and chemistry. Beginners should strictly start at sub-perceptual levels (50mg-150mg) to gauge body sensitivity safely.', icon: Award },
            { step: '04', title: 'Detailed Logging', desc: 'Log your active dosage days, emotional focus levels, and rest periods. Structured tracking yields the highest neuroplastic gains.', icon: Sparkles }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm hover:shadow-md transition-shadow relative group">
              <span className="absolute right-6 top-6 text-3xl font-black text-slate-100 logo-font group-hover:text-pink-100 transition-colors">{item.step}</span>
              <div className="h-10 w-10 rounded-xl bg-pink-50 flex items-center justify-center text-[#ff4fa3] shrink-0 mb-4">
                <item.icon className="h-5 w-5 stroke-[2.2]" />
              </div>
              <h3 className="text-xs font-black uppercase text-[#1b1533] logo-font mb-2">{item.title}</h3>
              <p className="text-[11px] font-semibold leading-relaxed text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Interactive "What's My Product?" Quiz Widget */}
      <section id="quiz-section" className="bg-gradient-to-tr from-[#fffbf8] to-[#fff3ec] border-t border-b border-purple-100/40 py-16 px-4">
        <div className="mx-auto max-w-3xl bg-white border border-pink-100/50 rounded-[44px] p-6 md:p-10 shadow-[0_32px_90px_rgba(255,79,163,0.07)] text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 h-44 w-44 rounded-full bg-[#ff4fa3]/5 blur-3xl pointer-events-none" />
          
          <div className="space-y-2 mb-8 max-w-md mx-auto">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Recommender Engine</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#1b1533] uppercase logo-font">What Product Is Right For Me?</h2>
            <p className="text-xs text-slate-400 font-semibold leading-relaxed">Take our quick 3-question onboarding quiz to identify the optimal strain format, dosage, and category matching your experience level.</p>
          </div>

          {/* Quiz Step 1: Intent */}
          {quizStep === 1 && (
            <div className="space-y-6 animate-scale-up">
              <span className="block text-[10px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Question 1 of 3</span>
              <strong className="block text-sm font-black text-[#1b1533] uppercase logo-font">What is your primary wellness goal?</strong>
              <div className="grid gap-3 sm:grid-cols-3 text-left">
                {[
                  { id: 'focus', title: 'Focus & Mood Lift', desc: 'Sub-perceptual daily energy, no highs.' },
                  { id: 'relax', title: 'Stress & Calm', desc: 'Muscle relaxation and cortisol regulation.' },
                  { id: 'journey', title: 'Spiritual Ascent', desc: 'Visual meditation and abstract thinking.' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleQuizAnswer('intent', opt.id)}
                    className="rounded-2xl border border-slate-100 hover:border-[#ff4fa3] hover:bg-pink-50/5 p-5 text-left cursor-pointer transition-all flex flex-col justify-between h-32"
                  >
                    <span className="block text-xs font-black uppercase text-[#1b1533] logo-font">{opt.title}</span>
                    <span className="block text-[9px] text-slate-400 font-semibold leading-normal mt-2">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quiz Step 2: Experience */}
          {quizStep === 2 && (
            <div className="space-y-6 animate-scale-up">
              <span className="block text-[10px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Question 2 of 3</span>
              <strong className="block text-sm font-black text-[#1b1533] uppercase logo-font">What is your psychedelic experience level?</strong>
              <div className="grid gap-3 sm:grid-cols-2 text-left">
                {[
                  { id: 'none', title: 'Complete Beginner', desc: 'No prior experience with raw flushes or compounds.' },
                  { id: 'some', title: 'Experienced', desc: 'Have trialled microdoses or visual trips before.' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleQuizAnswer('experience', opt.id)}
                    className="rounded-2xl border border-slate-100 hover:border-[#ff4fa3] hover:bg-pink-50/5 p-5 text-left cursor-pointer transition-all flex flex-col justify-between h-32"
                  >
                    <span className="block text-xs font-black uppercase text-[#1b1533] logo-font">{opt.title}</span>
                    <span className="block text-[9px] text-slate-400 font-semibold leading-normal mt-2">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quiz Step 3: Format */}
          {quizStep === 3 && (
            <div className="space-y-6 animate-scale-up">
              <span className="block text-[10px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Question 3 of 3</span>
              <strong className="block text-sm font-black text-[#1b1533] uppercase logo-font">What product medium do you prefer?</strong>
              <div className="grid gap-3 sm:grid-cols-3 text-left">
                {[
                  { id: 'tasteless', title: 'Tasteless Capsule', desc: 'Convenient Cellulose capsule supplements.' },
                  { id: 'sweet', title: 'Sweet Edible', desc: 'Delicious chocolate blocks or gummies.' },
                  { id: 'traditional', title: 'Dried Strains', desc: 'Traditional raw dried mushroom flushes.' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleQuizAnswer('format', opt.id)}
                    className="rounded-2xl border border-slate-100 hover:border-[#ff4fa3] hover:bg-pink-50/5 p-5 text-left cursor-pointer transition-all flex flex-col justify-between h-32"
                  >
                    <span className="block text-xs font-black uppercase text-[#1b1533] logo-font">{opt.title}</span>
                    <span className="block text-[9px] text-slate-400 font-semibold leading-normal mt-2">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quiz Results Panel */}
          {quizStep === 4 && (
            <div className="space-y-6 animate-scale-up text-center max-w-xl mx-auto">
              <span className="text-[10px] font-black uppercase tracking-widest text-green-500 logo-font border border-green-200 bg-green-50 px-3 py-1 rounded-full shadow-sm leading-none">Your Recommendation Match</span>
              
              <div className="bg-[#fff8f3]/60 border border-pink-100/50 rounded-3xl p-5 md:p-6 grid gap-6 md:grid-cols-[1fr_1.5fr] items-center text-left">
                <div className="h-44 w-full bg-white rounded-2xl overflow-hidden flex items-center justify-center border border-slate-100 relative">
                  <img src={rec.imageSrc} alt={rec.title} className="object-contain max-h-[140px]" />
                </div>
                <div className="space-y-2">
                  <span className="text-[8px] font-black uppercase text-[#ff4fa3] tracking-wider logo-font">{rec.category}</span>
                  <h3 className="text-base md:text-lg font-black uppercase text-[#1b1533] logo-font leading-snug">{rec.title}</h3>
                  <p className="text-[10px] font-semibold leading-relaxed text-slate-400">{rec.desc}</p>
                  
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <strong className="text-sm font-black text-[#1b1533] logo-font">{rec.price}</strong>
                    <button
                      onClick={() => {
                        addToCart({
                          title: rec.title,
                          category: rec.category,
                          price: rec.price,
                          imageSrc: rec.imageSrc
                        });
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#ff4fa3] text-white border border-[#ff4fa3] py-2 px-4 text-[10px] font-black uppercase tracking-wider hover:bg-black hover:text-[#ff4fa3] hover:border-black cursor-pointer transition-all logo-font"
                    >
                      <Plus className="h-3.5 w-3.5" /> Add To Cart
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={resetQuiz}
                  className="rounded-2xl border border-slate-200 bg-white text-slate-700 hover:border-[#ff4fa3] px-6 py-3 text-xs font-black uppercase tracking-wider transition-all logo-font cursor-pointer"
                >
                  Retake Quiz
                </button>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 4. Beginner Guide FAQs Accordion */}
      <section className="bg-white py-16 px-4 md:px-8 border-b border-purple-100/30">
        <div className="mx-auto max-w-4xl space-y-10 text-center">
          
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font leading-none">onboarding help</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#1b1533] uppercase logo-font">Beginner Stacking FAQs</h2>
            <p className="text-xs text-slate-400 max-w-md mx-auto">Discover essential beginner safety questions answered clearly by our clinical mycologists.</p>
          </div>

          <div className="space-y-4 divide-y divide-purple-100/40 border border-purple-100/30 bg-[#fffdfb] rounded-3xl p-6 shadow-sm text-left">
            {[
              { q: 'Will a microdose make me hallucinate or feel high?', a: 'No, absolutely not. A true microdose is "sub-perceptual" (typically 50mg-200mg). You will experience subtle, glowing cognitive concentration, stress relief, and mood support, but zero visuals or trips. You can easily go about your daily work routine.' },
              { q: 'How long should a beginner start microdosing for?', a: 'We recommend trialling a microdosing routine for 4 to 6 weeks. Following a protocol like the Fadiman stack prevents tolerance. After 6 weeks, take a 1-2 week integration break before resuming.' },
              { q: 'Can I take psilocybin capsules alongside morning coffee?', a: 'Yes. However, coffee is a mild CNS stimulant. For beginners, we recommend trying your microdose capsule with green tea or water first to ensure you have a calm, focused, and jitter-free session.' }
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

      {/* 5. Related Links Section */}
      <section className="bg-[#fff8f3] py-16 px-4 md:px-8">
        <div className="mx-auto max-w-7xl text-center space-y-8">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Learn Suite</span>
            <h3 className="text-2xl font-black text-[#1b1533] uppercase logo-font">Related Guides & Stacks</h3>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { name: 'Microdose Guide', url: '/blog/microdose-guide', desc: 'Detailed protocol calendar blueprints.', icon: '⚡' },
              { name: 'Mushroom Strains', url: '/blog/mushroom-strains', desc: 'Explore genetic histories and potency ranges.', icon: '🍄' },
              { name: 'Clinical Research', url: '/blog/research-and-studies', desc: 'Read active science and therapeutic abstracts.', icon: '🔬' }
            ].map((link, idx) => (
              <div key={idx} className="bg-white border border-slate-100 rounded-[32px] p-5 shadow-sm flex flex-col justify-between items-start text-left gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all group">
                <div className="h-11 w-11 rounded-2xl bg-[#fff8f3] flex items-center justify-center text-2xl border border-slate-50">
                  {link.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="text-[8px] font-black uppercase text-slate-400 logo-font leading-none">Learn</h4>
                  <h3 className="text-sm font-black text-[#1b1533] uppercase logo-font leading-tight">{link.name}</h3>
                  <p className="text-[10px] font-semibold text-slate-400 leading-relaxed line-clamp-3">{link.desc}</p>
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

      {/* 6. Newsletter */}
      <Newsletter />

      <Footer />
    </main>
  );
}
