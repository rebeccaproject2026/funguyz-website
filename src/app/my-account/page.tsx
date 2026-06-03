'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { 
  User, 
  ShoppingBag, 
  Download, 
  MapPin, 
  Key, 
  LogOut, 
  CheckCircle2, 
  Sparkles,
  FileText,
  Lock,
  ArrowRight
} from 'lucide-react';

export default function MyAccountPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'downloads' | 'addresses' | 'details'>('dashboard');
  const [message, setMessage] = useState<string | null>(null);

  // Address edit state
  const [billingAddress, setBillingAddress] = useState({
    firstName: 'Naveen',
    lastName: 'Kumar',
    company: 'Metaverse Dev',
    country: 'Canada',
    address1: '456 Spadina Ave',
    address2: 'Suite 200',
    city: 'Toronto',
    province: 'ON',
    postcode: 'M5T 2G8',
    phone: '+1 (416) 555-0199',
    email: 'naveen@metaverse.ca'
  });

  const [shippingAddress, setShippingAddress] = useState({
    firstName: 'Naveen',
    lastName: 'Kumar',
    company: 'Metaverse Dev',
    country: 'Canada',
    address1: '456 Spadina Ave',
    address2: 'Suite 200',
    city: 'Toronto',
    province: 'ON',
    postcode: 'M5T 2G8'
  });

  const handleSaveAddresses = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Addresses updated successfully!');
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSaveDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Account details saved successfully!');
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <main className="bg-[#fff8f3] text-[#1b1533] min-h-screen selection:bg-[#ff4fa3] selection:text-white antialiased">
      <Header />

      {/* Premium WooCommerce Header Banner */}
      <section className="bg-gradient-to-tr from-[#fffdfb] via-[#fffbf9] to-[#fff5f0] border-b border-purple-100/50 py-16 px-4 md:px-8 text-center relative overflow-hidden">
        <div className="absolute left-[5%] top-[10%] w-[300px] h-[300px] rounded-full bg-[#ffe8db]/30 blur-[80px] pointer-events-none" />
        <div className="absolute right-[5%] bottom-[5%] w-[300px] h-[300px] rounded-full bg-[#e0f2fe]/40 blur-[80px] pointer-events-none" />
        
        <div className="mx-auto max-w-3xl relative z-10 flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#ff4fa3]/5 px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-widest text-[#ff4fa3]">
            <Sparkles className="h-3 w-3" /> Secure Client Dashboard
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#1b1533] uppercase logo-font">
            My Account
          </h1>
          <p className="text-xs md:text-sm font-semibold leading-relaxed text-slate-500 max-w-xl">
            Welcome back, Naveen! Manage your orders, downloads, secure shipping addresses, and personal credentials.
          </p>
        </div>
      </section>

      {/* Main Account Area */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        {message && (
          <div className="mb-8 flex items-center gap-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-4 text-emerald-700 text-xs font-bold uppercase tracking-wider logo-font">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-[250px_1fr] items-start">
          
          {/* WooCommerce Sidebar Navigation */}
          <aside className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: User },
              { id: 'orders', label: 'Orders', icon: ShoppingBag },
              { id: 'downloads', label: 'Downloads', icon: Download },
              { id: 'addresses', label: 'Addresses', icon: MapPin },
              { id: 'details', label: 'Account Details', icon: Key },
            ].map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-black uppercase tracking-wider rounded-2xl transition-all duration-200 cursor-pointer text-left logo-font ${
                    activeTab === tab.id
                      ? 'bg-[#ff4fa3] text-white shadow-md shadow-pink-100'
                      : 'text-slate-500 hover:bg-pink-50/50 hover:text-[#ff4fa3]'
                  }`}
                >
                  <TabIcon className="h-4.5 w-4.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}

            <button
              onClick={() => {
                setMessage('Successfully logged out (Simulated).');
                setTimeout(() => window.location.href = '/', 1500);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-xs font-black uppercase tracking-wider rounded-2xl text-red-500 hover:bg-red-50/50 transition-all duration-200 cursor-pointer text-left logo-font"
            >
              <LogOut className="h-4.5 w-4.5" />
              <span>Logout</span>
            </button>
          </aside>

          {/* WooCommerce Tab Contents */}
          <div className="bg-white border border-slate-100 rounded-[32px] p-6 md:p-8 shadow-sm min-h-[400px]">
            
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-black text-[#1b1533] uppercase logo-font">Client Hub</h2>
                  <p className="text-[11px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">Overview & Quick Actions</p>
                </div>
                
                <p className="text-sm font-semibold text-slate-600 leading-8">
                  Hello <strong className="text-[#1b1533]">Naveen Kumar</strong> (not <strong className="text-[#1b1533]">Naveen Kumar</strong>?{' '}
                  <button 
                    onClick={() => window.location.reload()}
                    className="text-[#ff4fa3] hover:underline font-bold"
                  >
                    Log out
                  </button>
                  ). From your account dashboard you can easily view your{' '}
                  <button onClick={() => setActiveTab('orders')} className="text-[#ff4fa3] hover:underline font-bold">recent orders</button>,
                  manage your{' '}
                  <button onClick={() => setActiveTab('addresses')} className="text-[#ff4fa3] hover:underline font-bold">shipping and billing addresses</button>,
                  and edit your{' '}
                  <button onClick={() => setActiveTab('details')} className="text-[#ff4fa3] hover:underline font-bold">password and account details</button>.
                </p>

                {/* Quick Summary Cards */}
                <div className="grid gap-6 sm:grid-cols-3 mt-6">
                  <div className="border border-slate-100 bg-[#fffdfd] p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff4fa3]">Total Orders</span>
                    <b className="block text-2xl font-black text-[#1b1533] mt-2 logo-font">2 Active</b>
                    <button 
                      onClick={() => setActiveTab('orders')} 
                      className="mt-3 text-[10px] font-bold uppercase tracking-wider text-[#7b5cff] hover:text-[#ff4fa3] flex items-center gap-1"
                    >
                      View Orders <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="border border-slate-100 bg-[#fffdfd] p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff4fa3]">Resource Files</span>
                    <b className="block text-2xl font-black text-[#1b1533] mt-2 logo-font">3 Available</b>
                    <button 
                      onClick={() => setActiveTab('downloads')} 
                      className="mt-3 text-[10px] font-bold uppercase tracking-wider text-[#7b5cff] hover:text-[#ff4fa3] flex items-center gap-1"
                    >
                      Access Downloads <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="border border-slate-100 bg-[#fffdfd] p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff4fa3]">Shipping Tier</span>
                    <b className="block text-2xl font-black text-emerald-600 mt-2 logo-font">Express Delivery</b>
                    <span className="block text-[9px] text-slate-400 mt-3 font-semibold uppercase">Canada Post Tracked</span>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-black text-[#1b1533] uppercase logo-font">Order History</h2>
                  <p className="text-[11px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">Your WooCommerce Transactions</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-widest font-bold">
                        <th className="py-3 px-4">Order</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Total</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="font-semibold text-slate-600">
                      <tr className="border-b border-slate-100/70 hover:bg-slate-50/30 transition-colors">
                        <td className="py-4.5 px-4 font-black text-[#ff4fa3]">#4981</td>
                        <td className="py-4.5 px-4">May 28, 2026</td>
                        <td className="py-4.5 px-4">
                          <span className="inline-block rounded-full bg-amber-500/10 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-amber-600">
                            Processing
                          </span>
                        </td>
                        <td className="py-4.5 px-4 text-[#1b1533] font-black">$129.98 for 2 items</td>
                        <td className="py-4.5 px-4 text-right">
                          <button 
                            onClick={() => alert('Simulated Invoice download initiated!')}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-600 hover:border-[#ff4fa3] hover:text-[#ff4fa3] cursor-pointer shadow-sm"
                          >
                            <FileText className="h-3 w-3" /> Invoice
                          </button>
                        </td>
                      </tr>
                      <tr className="border-b border-slate-100/70 hover:bg-slate-50/30 transition-colors">
                        <td className="py-4.5 px-4 font-black text-[#ff4fa3]">#4812</td>
                        <td className="py-4.5 px-4">May 15, 2026</td>
                        <td className="py-4.5 px-4">
                          <span className="inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-emerald-600">
                            Completed
                          </span>
                        </td>
                        <td className="py-4.5 px-4 text-[#1b1533] font-black">$59.99 for 1 item</td>
                        <td className="py-4.5 px-4 text-right">
                          <button 
                            onClick={() => alert('Simulated Invoice download initiated!')}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-600 hover:border-[#ff4fa3] hover:text-[#ff4fa3] cursor-pointer shadow-sm"
                          >
                            <FileText className="h-3 w-3" /> Invoice
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Downloads Tab */}
            {activeTab === 'downloads' && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-black text-[#1b1533] uppercase logo-font">Product Downloads</h2>
                  <p className="text-[11px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">Premium Guides & Resources</p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {[
                    ['Mushroom Dosage Guide.pdf', 'Complete psilocybin dosage schedule and safe guidelines.', 'May 30, 2027'],
                    ['Microdose Protocol Schedule.xlsx', 'Fadiman & Stamets microdosing trackers and metrics.', 'Never Expired'],
                    ['Discreet Storage Recommendations.txt', 'Best temperature, container, and moisture settings.', 'Never Expired'],
                  ].map(([file, desc, expires]) => (
                    <div key={file} className="border border-slate-100 rounded-2xl p-5 bg-[#fffdfd] flex flex-col justify-between gap-4">
                      <div>
                        <b className="block text-sm font-black text-[#1b1533] uppercase logo-font">{file}</b>
                        <p className="text-xs font-semibold text-slate-400 mt-1 leading-relaxed">{desc}</p>
                      </div>
                      <div className="border-t border-slate-50 pt-4 flex items-center justify-between">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Expires: {expires}</span>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            alert(`Simulated download of ${file} completed!`);
                          }}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-[#ff4fa3] text-white px-4 py-2 text-[10px] font-black uppercase tracking-wider hover:bg-black transition-all cursor-pointer shadow-sm shadow-pink-100"
                        >
                          <Download className="h-3 w-3" /> Download File
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <form onSubmit={handleSaveAddresses} className="space-y-6">
                <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black text-[#1b1533] uppercase logo-font">My Addresses</h2>
                    <p className="text-[11px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">WooCommerce Billing & Shipping</p>
                  </div>
                  <button
                    type="submit"
                    className="rounded-2xl bg-[#ff4fa3] text-white border border-[#ff4fa3] px-6 py-2.5 text-[10px] font-black uppercase tracking-widest shadow-md shadow-pink-100 transition-all duration-300 hover:bg-black hover:text-[#ff4fa3] hover:border-black hover:-translate-y-0.5 active:translate-y-0 cursor-pointer logo-font"
                  >
                    Save Changes
                  </button>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  
                  {/* Billing Address Card */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-wider text-[#ff4fa3] border-b border-slate-100 pb-2">Billing Address</h3>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                          First Name
                          <input 
                            type="text" 
                            value={billingAddress.firstName} 
                            onChange={(e) => setBillingAddress({ ...billingAddress, firstName: e.target.value })}
                            className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-pink-50/50"
                          />
                        </label>
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Last Name
                          <input 
                            type="text" 
                            value={billingAddress.lastName} 
                            onChange={(e) => setBillingAddress({ ...billingAddress, lastName: e.target.value })}
                            className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-pink-50/50"
                          />
                        </label>
                      </div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Street Address
                        <input 
                          type="text" 
                          value={billingAddress.address1} 
                          onChange={(e) => setBillingAddress({ ...billingAddress, address1: e.target.value })}
                          className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-pink-50/50"
                        />
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                          City
                          <input 
                            type="text" 
                            value={billingAddress.city} 
                            onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
                            className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-pink-50/50"
                          />
                        </label>
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Province
                          <input 
                            type="text" 
                            value={billingAddress.province} 
                            onChange={(e) => setBillingAddress({ ...billingAddress, province: e.target.value })}
                            className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-pink-50/50"
                          />
                        </label>
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Postal Code
                          <input 
                            type="text" 
                            value={billingAddress.postcode} 
                            onChange={(e) => setBillingAddress({ ...billingAddress, postcode: e.target.value })}
                            className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-pink-50/50"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address Card */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-wider text-[#ff4fa3] border-b border-slate-100 pb-2">Shipping Address</h3>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                          First Name
                          <input 
                            type="text" 
                            value={shippingAddress.firstName} 
                            onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
                            className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-pink-50/50"
                          />
                        </label>
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Last Name
                          <input 
                            type="text" 
                            value={shippingAddress.lastName} 
                            onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
                            className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-pink-50/50"
                          />
                        </label>
                      </div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Street Address
                        <input 
                          type="text" 
                          value={shippingAddress.address1} 
                          onChange={(e) => setShippingAddress({ ...shippingAddress, address1: e.target.value })}
                          className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-pink-50/50"
                        />
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                          City
                          <input 
                            type="text" 
                            value={shippingAddress.city} 
                            onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                            className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-pink-50/50"
                          />
                        </label>
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Province
                          <input 
                            type="text" 
                            value={shippingAddress.province} 
                            onChange={(e) => setShippingAddress({ ...shippingAddress, province: e.target.value })}
                            className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-pink-50/50"
                          />
                        </label>
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Postal Code
                          <input 
                            type="text" 
                            value={shippingAddress.postcode} 
                            onChange={(e) => setShippingAddress({ ...shippingAddress, postcode: e.target.value })}
                            className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-pink-50/50"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                </div>
              </form>
            )}

            {/* Account Details Tab */}
            {activeTab === 'details' && (
              <form onSubmit={handleSaveDetails} className="space-y-6">
                <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black text-[#1b1533] uppercase logo-font">Account Details</h2>
                    <p className="text-[11px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">Personal Profile & Credentials</p>
                  </div>
                  <button
                    type="submit"
                    className="rounded-2xl bg-[#ff4fa3] text-white border border-[#ff4fa3] px-6 py-2.5 text-[10px] font-black uppercase tracking-widest shadow-md shadow-pink-100 transition-all duration-300 hover:bg-black hover:text-[#ff4fa3] hover:border-black hover:-translate-y-0.5 active:translate-y-0 cursor-pointer logo-font"
                  >
                    Save Changes
                  </button>
                </div>

                <div className="grid gap-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Display Name
                      <input 
                        type="text" 
                        defaultValue="Naveen Kumar" 
                        required
                        className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-pink-50/50"
                      />
                    </label>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Email Address
                      <input 
                        type="email" 
                        defaultValue="naveen@metaverse.ca" 
                        required
                        className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-pink-50/50"
                      />
                    </label>
                  </div>

                  {/* Password Change Fieldset */}
                  <div className="border-t border-slate-100 pt-6 space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-wider text-[#ff4fa3] flex items-center gap-1.5 logo-font">
                      <Lock className="h-4 w-4" /> Password Change
                    </h3>
                    <div className="grid gap-6 sm:grid-cols-3">
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Current Password (leave blank to leave unchanged)
                        <input 
                          type="password" 
                          placeholder="••••••••"
                          className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-pink-50/50"
                        />
                      </label>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                        New Password (leave blank to leave unchanged)
                        <input 
                          type="password" 
                          placeholder="••••••••"
                          className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-pink-50/50"
                        />
                      </label>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Confirm New Password
                        <input 
                          type="password" 
                          placeholder="••••••••"
                          className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-pink-50/50"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            )}

          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
