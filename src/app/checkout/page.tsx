'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { 
  Sparkles, 
  ShoppingBag, 
  ShieldCheck, 
  CreditCard, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Truck, 
  MapPin, 
  User, 
  Mail, 
  Phone,
  Zap,
  Package,
  DollarSign
} from 'lucide-react';

export default function CheckoutPage() {
  const { cartItems, subtotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'etransfer'>('etransfer');
  const [shippingMethod, setShippingMethod] = useState<'sameday' | 'express'>('express');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: 'ON',
    postcode: ''
  });
  
  const [isCompleted, setIsCompleted] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any>(null);
  const [errors, setErrors] = useState<string[]>([]);

  // Calculate pricing metrics
  const parsedSubtotal = subtotal;
  const shippingCost = 20.00;
  const taxes = parsedSubtotal * 0.13; // 13% HST Ontario
  const grandTotal = parsedSubtotal + shippingCost + taxes;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const activeErrors: string[] = [];

    // Basic validation
    if (!formData.firstName) activeErrors.push('First Name is required');
    if (!formData.lastName) activeErrors.push('Last Name is required');
    if (!formData.email) activeErrors.push('Email address is required');
    if (!formData.phone) activeErrors.push('Phone number is required');
    if (!formData.address) activeErrors.push('Street address is required');
    if (!formData.city) activeErrors.push('City is required');
    if (!formData.postcode) activeErrors.push('Postal Code is required');

    // e-Transfer and Cash payment methods require no card field validations

    if (activeErrors.length > 0) {
      setErrors(activeErrors);
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }

    // Success order generation
    const trackingCode = `CX${Math.floor(100000000 + Math.random() * 900000000)}CA`;
    setCompletedOrder({
      orderId: `#FG-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      trackingCode,
      grandTotal: `$${grandTotal.toFixed(2)}`,
      items: [...cartItems],
      formData
    });
    
    setErrors([]);
    clearCart(); // Empty client e-commerce cart
    setIsCompleted(true);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  if (isCompleted && completedOrder) {
    return (
      <main className="bg-[#fff8f3] text-[#1b1533] min-h-screen selection:bg-[#ff4fa3] selection:text-white antialiased">
        <Header />
        
        {/* Success Confirmation Page */}
        <section className="mx-auto max-w-3xl px-4 py-16 text-center">
          <div className="bg-white border border-slate-100 rounded-[32px] p-8 md:p-12 shadow-sm flex flex-col items-center gap-6">
            <div className="h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 animate-bounce">
              <CheckCircle2 className="h-10 w-10 stroke-[2.2]" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Order Placed Successfully!</span>
              <h1 className="text-3xl font-black text-[#1b1533] uppercase logo-font">Thank You For Your Order</h1>
              <p className="text-xs font-semibold text-slate-500 leading-relaxed max-w-md mx-auto">
                Your discreet package is currently being processed. You will receive an email confirmation containing your invoices and shipping details.
              </p>
            </div>

            {/* Receipt Summary Grid */}
            <div className="w-full grid gap-4 sm:grid-cols-4 bg-slate-50 border border-slate-100 rounded-2xl p-5 text-left text-xs font-bold text-slate-400 mt-4">
              <div>
                <span className="block text-[8px] uppercase tracking-wider">Order ID</span>
                <strong className="block text-slate-800 text-sm mt-1 logo-font">{completedOrder.orderId}</strong>
              </div>
              <div>
                <span className="block text-[8px] uppercase tracking-wider">Date</span>
                <strong className="block text-slate-800 text-sm mt-1 logo-font">{completedOrder.date}</strong>
              </div>
              <div>
                <span className="block text-[8px] uppercase tracking-wider">Total amount</span>
                <strong className="block text-[#ff4fa3] text-sm mt-1 logo-font">{completedOrder.grandTotal}</strong>
              </div>
              <div>
                <span className="block text-[8px] uppercase tracking-wider">Canada Post</span>
                <strong className="block text-emerald-600 text-sm mt-1 logo-font">{completedOrder.trackingCode}</strong>
              </div>
            </div>

            {/* Interac e-Transfer Action Instructions */}
            <div className="w-full border border-pink-100 bg-[#fffdfd] rounded-[24px] p-6 text-left space-y-4 shadow-sm relative overflow-hidden">
              <div className="absolute right-0 top-0 w-24 h-24 bg-pink-500/5 rounded-bl-[100px] pointer-events-none" />
              
              <h4 className="text-xs font-black uppercase tracking-wider text-[#ff4fa3] flex items-center gap-1.5 logo-font">
                <Sparkles className="h-4.5 w-4.5 text-[#ff4fa3] animate-pulse" /> Interac e-Transfer Instructions
              </h4>
              <p className="text-[11.5px] font-semibold text-slate-500 leading-relaxed">
                Please send your <strong>Interac e-Transfer</strong> payment from your bank's portal within 24 hours. Your order dispatch is held secure until transfer receipt is confirmed.
              </p>

              <div className="grid gap-4 sm:grid-cols-3 bg-white p-4 rounded-2xl border border-pink-50/50 shadow-sm text-xs font-semibold">
                
                {/* Recipient */}
                <div className="space-y-1 relative group">
                  <span className="block text-[8px] text-slate-400 uppercase tracking-widest leading-none">Recipient Email</span>
                  <strong className="block text-slate-700 text-sm font-bold font-poppins">pay@funguyz.ca</strong>
                  <button 
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText('pay@funguyz.ca');
                      alert('Recipient email pay@funguyz.ca copied to clipboard!');
                    }}
                    className="mt-1 text-[9px] font-black uppercase text-[#ff4fa3] hover:underline cursor-pointer tracking-wider"
                  >
                    Copy Email
                  </button>
                </div>

                {/* Password/Memo */}
                <div className="space-y-1 relative group">
                  <span className="block text-[8px] text-slate-400 uppercase tracking-widest leading-none">Question / Password</span>
                  <strong className="block text-slate-700 text-sm font-bold font-poppins">{completedOrder.orderId}</strong>
                  <button 
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(completedOrder.orderId);
                      alert(`E-transfer Password ${completedOrder.orderId} copied to clipboard!`);
                    }}
                    className="mt-1 text-[9px] font-black uppercase text-[#ff4fa3] hover:underline cursor-pointer tracking-wider"
                  >
                    Copy Password
                  </button>
                </div>

                {/* Amount */}
                <div className="space-y-1">
                  <span className="block text-[8px] text-slate-400 uppercase tracking-widest leading-none">Amount Due</span>
                  <strong className="block text-[#ff4fa3] text-sm font-black font-poppins">{completedOrder.grandTotal}</strong>
                  <div className="mt-1 text-[9px] text-slate-400 font-bold uppercase tracking-wider">CAD Dollars</div>
                </div>

              </div>

              <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                * Note: Please make sure to include your order ID <strong className="text-slate-700 font-bold">{completedOrder.orderId}</strong> in the memo field of your e-Transfer for instant automated matching.
              </p>
            </div>

            {/* Back Home Action */}
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-2xl bg-[#ff4fa3] text-white border border-[#ff4fa3] px-10 py-4 text-xs font-black uppercase tracking-wider shadow-md shadow-pink-100 transition-all duration-300 hover:bg-black hover:text-[#ff4fa3] hover:border-black hover:-translate-y-0.5 active:translate-y-0 cursor-pointer gap-2 logo-font w-full sm:w-auto mt-4"
            >
              Continue Shopping <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </a>

          </div>
        </section>
        
        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-[#fff8f3] text-[#1b1533] min-h-screen selection:bg-[#ff4fa3] selection:text-white antialiased">
      <Header />

      {/* WooCommerce Checkout Header Banner */}
      <section className="bg-gradient-to-tr from-[#fffdfb] via-[#fffbf9] to-[#fff5f0] border-b border-purple-100/50 py-16 px-4 md:px-8 text-center relative overflow-hidden">
        <div className="absolute left-[5%] top-[10%] w-[300px] h-[300px] rounded-full bg-[#ffe8db]/30 blur-[80px] pointer-events-none" />
        <div className="absolute right-[5%] bottom-[5%] w-[300px] h-[300px] rounded-full bg-[#e0f2fe]/40 blur-[80px] pointer-events-none" />
        
        <div className="mx-auto max-w-3xl relative z-10 flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#ff4fa3]/5 px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-widest text-[#ff4fa3]">
            <Lock className="h-3 w-3" /> SSL 256-bit Encrypted checkout
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#1b1533] uppercase logo-font">
            Secure Checkout
          </h1>
          <p className="text-xs md:text-sm font-semibold leading-relaxed text-slate-500 max-w-xl">
            Complete your order below. All packages are vacuum-sealed with absolute odor protection and shipped in unmarked cardboard envelopes.
          </p>
        </div>
      </section>

      {/* Checkout Forms Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        
        {errors.length > 0 && (
          <div className="mb-8 rounded-2xl bg-red-500/10 border border-red-500/20 p-5 space-y-1.5 text-red-700 text-xs font-bold uppercase tracking-wider logo-font">
            <span className="block text-sm font-black mb-1">Please fix the following validation errors:</span>
            {errors.map(err => (
              <span key={err} className="block">• {err}</span>
            ))}
          </div>
        )}

        <form onSubmit={handlePlaceOrder} className="grid gap-10 lg:grid-cols-[1.3fr_1fr] items-start">
          
          {/* Left Block: Intake Forms */}
          <div className="bg-white border border-slate-100 rounded-[32px] p-6 md:p-8 shadow-sm space-y-8">
            
            {/* Shipping methods (Moved to top before billing details) */}
            <div className="space-y-4">
              <h2 className="text-xl font-black text-[#1b1533] uppercase logo-font">Shipping Options</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {/* 1. Same Day Delivery */}
                <button
                  type="button"
                  onClick={() => setShippingMethod('sameday')}
                  className={`rounded-2xl border p-4 text-left cursor-pointer transition-all flex items-start gap-3 ${
                    shippingMethod === 'sameday'
                      ? 'border-[#ff4fa3] bg-pink-50/10 shadow-sm'
                      : 'border-slate-200 hover:border-pink-300'
                  }`}
                >
                  <MapPin className="h-5 w-5 text-[#ff4fa3] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-black uppercase text-[#1b1533] logo-font leading-tight">Same Day Delivery</span>
                    <span className="block text-[10px] text-slate-400 font-semibold mt-1">GTA & Ottawa Local Courier Delivery</span>
                    <strong className="block text-emerald-600 text-xs font-black logo-font mt-2">$20.00 Flat</strong>
                  </div>
                </button>

                {/* 2. Express Shipping */}
                <button
                  type="button"
                  onClick={() => setShippingMethod('express')}
                  className={`rounded-2xl border p-4 text-left cursor-pointer transition-all flex items-start gap-3 ${
                    shippingMethod === 'express'
                      ? 'border-[#ff4fa3] bg-pink-50/10 shadow-sm'
                      : 'border-slate-200 hover:border-pink-300'
                  }`}
                >
                  <Zap className="h-5 w-5 text-[#ff4fa3] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-black uppercase text-[#1b1533] logo-font leading-tight">Express Shipping</span>
                    <span className="block text-[10px] text-slate-400 font-semibold mt-1">Canada Post Express 1-2 Days</span>
                    <strong className="block text-emerald-600 text-xs font-black logo-font mt-2">
                      $20.00 Flat
                    </strong>
                  </div>
                </button>
              </div>
            </div>

            {/* Billing Address details */}
            <div className="space-y-4">
              <h2 className="text-xl font-black text-[#1b1533] uppercase logo-font">Billing Details</h2>
              <div className="grid gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                    First Name
                    <input 
                      type="text" 
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="e.g. Naveen"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-pink-50/50"
                    />
                  </label>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Last Name
                    <input 
                      type="text" 
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="e.g. Kumar"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-pink-50/50"
                    />
                  </label>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Email Address
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. hello@metaverse.ca"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-pink-50/50"
                    />
                  </label>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Phone Number
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +1 (416) 555-0199"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-pink-50/50"
                    />
                  </label>
                </div>

                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Street Address
                  <input 
                    type="text" 
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="House number and street name"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-pink-50/50"
                  />
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                    City
                    <input 
                      type="text" 
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Toronto"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-pink-50/50"
                    />
                  </label>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Province
                    <select
                      name="province"
                      value={formData.province}
                      onChange={handleInputChange}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-pink-50/50 bg-white"
                    >
                      <option value="ON">Ontario (ON)</option>
                      <option value="QC">Quebec (QC)</option>
                      <option value="BC">British Columbia (BC)</option>
                      <option value="AB">Alberta (AB)</option>
                      <option value="MB">Manitoba (MB)</option>
                    </select>
                  </label>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Postal Code
                    <input 
                      type="text" 
                      name="postcode"
                      required
                      value={formData.postcode}
                      onChange={handleInputChange}
                      placeholder="e.g. M5T 2G8"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-pink-50/50"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Payment options relocated to right column for a cleaner checkout layout */}

          </div>

          {/* Right Block: Order review and Place order button */}
          <div className="bg-white border border-slate-100 rounded-[32px] p-6 md:p-8 shadow-sm space-y-6">
            <h2 className="text-xl font-black text-[#1b1533] uppercase logo-font">Order Summary</h2>

            {cartItems.length > 0 ? (
              <div className="space-y-4 divide-y divide-slate-100">
                {cartItems.map((item) => (
                  <div key={item.title} className="flex gap-4 pt-4 first:pt-0">
                    <div className="h-14 w-14 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-center p-2 shrink-0">
                      <img src={item.imageSrc} className="max-h-full max-w-full object-contain" alt="Cart item" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <span className="block text-xs font-black text-[#1b1533] uppercase leading-tight line-clamp-1">{item.title}</span>
                        <span className="block text-[9px] text-slate-400 font-bold uppercase mt-0.5">{item.category}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-semibold mt-1">
                        <span className="text-slate-400">Qty: {item.quantity}</span>
                        <strong className="text-[#ff4fa3] font-black">{item.price}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs font-semibold text-slate-400 italic">No products in checkout cart.</p>
            )}

            {/* Payment Options (Interac e-Transfer Only) */}
            <div className="border-t border-slate-100 pt-6 space-y-4 select-none">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#1b1533] logo-font">Payment Method</h3>
              <div className="border border-pink-100/80 bg-[#fffdfd] rounded-2xl p-4.5 space-y-3 shadow-[0_4px_20px_rgba(255,79,163,0.02)]">
                {/* Interac Brand Banner */}
                <div className="flex items-center justify-between border-b border-pink-50 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#FFB800] text-black h-5.5 px-2 rounded-lg flex items-center justify-center font-black text-[9px] tracking-wider uppercase font-sans">
                      INTERAC
                    </div>
                    <span className="text-xs font-black uppercase text-[#1b1533] logo-font leading-none">e-Transfer</span>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider font-poppins">
                    Secured
                  </span>
                </div>
                
                {/* e-Transfer flow explanations */}
                <div className="space-y-2 text-[10.5px] font-semibold text-slate-500 leading-normal pl-0.5 font-poppins">
                  <p>
                    We process orders strictly via <strong>Interac e-Transfer</strong> for maximum Canadian privacy and discreet shopping logs.
                  </p>
                  <ol className="list-decimal pl-4.5 space-y-1.5 text-slate-400">
                    <li>Send payment to our recipient: <strong className="text-slate-700 font-bold">pay@funguyz.ca</strong></li>
                    <li>Use your unique <strong className="text-slate-700 font-bold">Order ID</strong> (shown upon placing order) as the transaction memo or question password.</li>
                    <li>Your order will instantly route to preparation once bank ledger sync is confirmed.</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Calculations summaries */}
            <div className="border-t border-slate-100 pt-6 space-y-3.5 text-xs font-bold text-slate-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <strong className="text-slate-800">${parsedSubtotal.toFixed(2)}</strong>
              </div>
              <div className="flex justify-between">
                <span>Discreet Shipping</span>
                <strong className="text-slate-800">${shippingCost.toFixed(2)}</strong>
              </div>
              <div className="flex justify-between">
                <span>Taxes (13% HST)</span>
                <strong className="text-slate-800">${taxes.toFixed(2)}</strong>
              </div>
              <div className="border-t border-slate-100 pt-4 flex justify-between text-sm">
                <span className="text-slate-800 uppercase logo-font">Total Amount</span>
                <strong className="text-[#ff4fa3] font-black logo-font text-base">${grandTotal.toFixed(2)}</strong>
              </div>
            </div>

            {/* Place order CTA */}
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center rounded-2xl bg-[#ff4fa3] text-white border border-[#ff4fa3] py-4 text-xs font-black uppercase tracking-wider shadow-md shadow-pink-100 transition-all duration-300 hover:bg-black hover:text-[#ff4fa3] hover:border-black hover:-translate-y-0.5 active:translate-y-0 cursor-pointer gap-2 logo-font mt-2"
            >
              <ShieldCheck className="h-4.5 w-4.5" /> Place Secure Order
            </button>

          </div>

        </form>
      </section>

      <Footer />
    </main>
  );
}
