'use client';
import Link from 'next/link';

import React, { useState, useEffect } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MushroomLoader } from '@/components/MushroomLoader';
import { useAuth } from '@/context/AuthContext';
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
  ArrowRight,
  Eye,
  EyeOff,
  Mail,
  AlertCircle,
  KeyRound,
  ShieldCheck,
  RefreshCcw,
  Package,
  Truck,
} from 'lucide-react';

// ─── Shared field style ──────────────────────────────────────────────────────
const fieldCls = 'mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-pink-50/50 transition-all';
const labelCls = 'block text-[12px] font-black uppercase tracking-wider text-slate-400';

// ─── Password Input with show/hide ──────────────────────────────────────────
function PasswordInput({ value, onChange, placeholder = '••••••••', id }: {
  value: string; onChange: (v: string) => void; placeholder?: string; id?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        id={id}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={fieldCls + ' pr-10'}
      />
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setShow(s => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#ff4fa3] transition-colors cursor-pointer"
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}

// ─── Views ───────────────────────────────────────────────────────────────────
type View = 'loading' | 'login' | 'reset' | 'change-password' | 'dashboard';

export default function MyAccountPage() {
  const { currentUser, isLoggedIn, status, login, logout, updatePassword, resetPassword } = useAuth();

  const [view, setView] = useState<View>('loading');
  const [flash, setFlash] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Reset form
  const [resetEmail, setResetEmail] = useState('');
  const [resetResult, setResetResult] = useState<string | null>(null);
  const [resetTurnstileToken, setResetTurnstileToken] = useState('');

  // Change password form
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  // Loading states for API calls
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isChangingPass, setIsChangingPass] = useState(false);

  // Dashboard tab
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'downloads' | 'addresses' | 'details'>('dashboard');

  // Profile Forms State
  const [profileFirstName, setProfileFirstName] = useState('');
  const [profileLastName, setProfileLastName] = useState('');
  const [profileEmail, setProfileEmail] = useState('');

  // Addresses Forms State
  const [billingAddress, setBillingAddress] = useState({ firstName: '', lastName: '', street: '', city: '', province: '', postalCode: '' });
  const [shippingAddress, setShippingAddress] = useState({ firstName: '', lastName: '', street: '', city: '', province: '', postalCode: '' });

  // Loading states
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingAddresses, setIsSavingAddresses] = useState(false);

  // Sync state when currentUser loads
  useEffect(() => {
    if (currentUser) {
      setProfileFirstName(currentUser.firstName || '');
      setProfileLastName(currentUser.lastName || '');
      setProfileEmail(currentUser.email || '');

      if (currentUser.addresses && currentUser.addresses.length > 0) {
        const addr = currentUser.addresses[0];
        setBillingAddress({ firstName: addr.firstName || currentUser.firstName, lastName: addr.lastName || currentUser.lastName, street: addr.street || '', city: addr.city || '', province: addr.province || '', postalCode: addr.postalCode || '' });

        const shipAddr = currentUser.addresses.length > 1 ? currentUser.addresses[1] : addr;
        setShippingAddress({ firstName: shipAddr.firstName || currentUser.firstName, lastName: shipAddr.lastName || currentUser.lastName, street: shipAddr.street || '', city: shipAddr.city || '', province: shipAddr.province || '', postalCode: shipAddr.postalCode || '' });
      }
    }
  }, [currentUser]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: profileFirstName, lastName: profileLastName, email: profileEmail })
      });
      const data = await res.json();
      if (data.success) {
        showFlash('success', 'Account details saved!');
      } else {
        showFlash('error', data.error || 'Failed to save');
      }
    } catch (e) {
      showFlash('error', 'Network error');
    }
    setIsSavingProfile(false);
  };

  const handleSaveAddresses = async () => {
    setIsSavingAddresses(true);
    try {
      const payload = [
        { isDefault: true, firstName: billingAddress.firstName, lastName: billingAddress.lastName, street: billingAddress.street, city: billingAddress.city, province: billingAddress.province, postalCode: billingAddress.postalCode },
        { isDefault: false, firstName: shippingAddress.firstName, lastName: shippingAddress.lastName, street: shippingAddress.street, city: shippingAddress.city, province: shippingAddress.province, postalCode: shippingAddress.postalCode }
      ];
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ addresses: payload })
      });
      const data = await res.json();
      if (data.success) {
        showFlash('success', 'Addresses updated successfully!');
      } else {
        showFlash('error', data.error || 'Failed to update addresses');
      }
    } catch (e) {
      showFlash('error', 'Network error');
    }
    setIsSavingAddresses(false);
  };

  // Determine initial view on mount
  useEffect(() => {
    if (status === 'loading') {
      setView('loading');
      return;
    }
    if (isLoggedIn && currentUser) {
      setView((currentUser as any)?.isDummyPassword ? 'change-password' : 'dashboard');
    } else {
      setView('login');
    }
  }, [isLoggedIn, currentUser, status]);

  const showFlash = (type: 'success' | 'error', msg: string) => {
    setFlash({ type, msg });
    setTimeout(() => setFlash(null), 4000);
  };

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    const result = await login(loginEmail, loginPassword);
    setIsLoggingIn(false);
    if (result.success) {
      showFlash('success', result.message);
    } else {
      showFlash('error', result.message);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsResetting(true);
    const result = await resetPassword(resetEmail, resetTurnstileToken) as any;
    setIsResetting(false);
    if (result.success && result.newPassword) {
      setResetResult(result.newPassword);
    } else {
      showFlash('error', result.message || 'Something went wrong');
    }
  };
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsChangingPass(true);
    const result = await updatePassword(newPass, confirmPass);
    setIsChangingPass(false);
    if (result.success) {
      showFlash('success', result.message);
      setNewPass('');
      setConfirmPass('');
      setView('dashboard');
    } else {
      showFlash('error', result.message);
    }
  };

  const handleLogout = () => {
    logout();
    setView('login');
    setLoginEmail('');
    setLoginPassword('');
    showFlash('success', 'You have been logged out.');
  };

  // ── Page header banner ───────────────────────────────────────────────────────
  const PageBanner = ({ subtitle }: { subtitle: string }) => (
    <section className="bg-gradient-to-tr from-[#fffdfb] via-[#fffbf9] to-[#fff5f0] border-b border-purple-100/50 py-16 px-4 md:px-8 text-center relative overflow-hidden">
      <div className="absolute left-[5%] top-[10%] w-[300px] h-[300px] rounded-full bg-[#ffe8db]/30 blur-[80px] pointer-events-none" />
      <div className="absolute right-[5%] bottom-[5%] w-[300px] h-[300px] rounded-full bg-[#e0f2fe]/40 blur-[80px] pointer-events-none" />
      <div className="mx-auto max-w-3xl relative z-10 flex flex-col items-center gap-3">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#ff4fa3]/5 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#ff4fa3]">
          <Sparkles className="h-3 w-3" /> Secure Client Area
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#1b1533] uppercase logo-font">My Account</h1>
        <p className="text-xs md:text-sm font-semibold leading-relaxed text-slate-500 max-w-xl">{subtitle}</p>
      </div>
    </section>
  );

  // ── Flash banner ─────────────────────────────────────────────────────────────
  const FlashBanner = () => !flash ? null : (
    <div className={`mb-6 flex items-center gap-3 rounded-2xl border p-4 text-xs font-bold uppercase tracking-wider logo-font ${flash.type === 'success'
      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700'
      : 'bg-red-500/10 border-red-500/20 text-red-700'
      }`}>
      {flash.type === 'success'
        ? <CheckCircle2 className="h-5 w-5 shrink-0" />
        : <AlertCircle className="h-5 w-5 shrink-0" />}
      <span>{flash.msg}</span>
    </div>
  );

  // ════════════════════════════════════════════════════════════════════════════
  // VIEW: LOADING
  // ════════════════════════════════════════════════════════════════════════════
  if (view === 'loading') {
    return (
      <main className="bg-[#fff8f3] text-[#1b1533] min-h-screen selection:bg-[#ff4fa3] selection:text-white antialiased flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center py-20">
          <MushroomLoader />
        </div>
        <Footer />
      </main>
    );
  }

  // ════════════════════════════════════════════════════════════════════════════
  // VIEW: LOGIN
  // ════════════════════════════════════════════════════════════════════════════
  if (view === 'login') {
    return (
      <main className="bg-[#fff8f3] text-[#1b1533] min-h-screen selection:bg-[#ff4fa3] selection:text-white antialiased">
        <Header />
        <PageBanner subtitle="Sign in to view your orders, track deliveries, and manage your account details." />

        <section className="mx-auto max-w-xl px-4 py-12 md:px-8">
          <FlashBanner />

          <div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm space-y-6">
            {/* Header */}
            <div className="text-center space-y-1">
              <div className="mx-auto h-14 w-14 rounded-2xl bg-pink-50 flex items-center justify-center text-[#ff4fa3] mb-4">
                <Lock className="h-7 w-7" />
              </div>
              <h2 className="text-xl font-black text-[#1b1533] uppercase logo-font">Sign In</h2>
              <p className="text-xs font-semibold text-slate-400">Use the credentials from your order confirmation email</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <label className={labelCls}>
                Email Address
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  placeholder="e.g. john@gmail.com"
                  className={fieldCls}
                />
              </label>

              <label className={labelCls}>
                Password
                <PasswordInput value={loginPassword} onChange={setLoginPassword} id="login-password" />
              </label>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-[12px] font-semibold text-slate-500 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  Remember me
                </label>
                <button
                  type="button"
                  onClick={() => { setView('reset'); setFlash(null); setResetResult(null); }}
                  className="text-[12px] font-bold text-[#ff4fa3] hover:underline cursor-pointer"
                >
                  Lost your password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full inline-flex items-center justify-center rounded-2xl bg-[#ff4fa3] text-white border border-[#ff4fa3] py-4 text-xs font-black uppercase tracking-wider shadow-md shadow-pink-100 transition-all duration-300 hover:bg-black hover:text-[#ff4fa3] hover:border-black hover:-translate-y-0.5 active:translate-y-0 cursor-pointer gap-2 logo-font disabled:opacity-70 disabled:pointer-events-none"
              >
                {isLoggingIn ? (
                  <>
                    <svg className="animate-spin h-4.5 w-4.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Signing In...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-4.5 w-4.5" /> Sign In to My Account
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-[12px] font-semibold text-slate-400 pt-2 border-t border-slate-100">
              Don&apos;t have an account?{' '}
              <Link href="/checkout" className="text-[#ff4fa3] font-bold hover:underline">
                Place an order
              </Link>{' '}
              and one will be created for you automatically.
            </p>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  // ════════════════════════════════════════════════════════════════════════════
  // VIEW: RESET PASSWORD
  // ════════════════════════════════════════════════════════════════════════════
  if (view === 'reset') {
    return (
      <main className="bg-[#fff8f3] text-[#1b1533] min-h-screen selection:bg-[#ff4fa3] selection:text-white antialiased">
        <Header />
        <PageBanner subtitle="Enter your email address and we will send you a new temporary password." />

        <section className="mx-auto max-w-xl px-4 py-12 md:px-8">
          <FlashBanner />

          <div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm space-y-6">
            <div className="text-center space-y-1">
              <div className="mx-auto h-14 w-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 mb-4">
                <KeyRound className="h-7 w-7" />
              </div>
              <h2 className="text-xl font-black text-[#1b1533] uppercase logo-font">Reset Password</h2>
              <p className="text-xs font-semibold text-slate-400">Enter the email address linked to your order</p>
            </div>

            {!resetResult ? (
              <form onSubmit={handleReset} className="space-y-4">
                <label className={labelCls}>
                  Email Address
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={e => setResetEmail(e.target.value)}
                    placeholder="e.g. john@gmail.com"
                    className={fieldCls}
                  />
                </label>
                <div className="flex justify-center my-1">
                  <Turnstile siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''} onSuccess={(token) => setResetTurnstileToken(token)} />
                </div>
                <button
                  type="submit"
                  disabled={isResetting}
                  className="w-full inline-flex items-center justify-center rounded-2xl bg-[#1b1533] text-white py-4 text-xs font-black uppercase tracking-wider hover:bg-[#ff4fa3] transition-all duration-300 cursor-pointer gap-2 logo-font disabled:opacity-70 disabled:pointer-events-none"
                >
                  {isResetting ? (
                    <>
                      <svg className="animate-spin h-4.5 w-4.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                      Resetting Password...
                    </>
                  ) : (
                    <>
                      <RefreshCcw className="h-4 w-4" /> Reset My Password
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 space-y-3">
                  <p className="text-xs font-black uppercase tracking-wider text-emerald-700 logo-font flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" /> Password Reset Successfully
                  </p>
                  <p className="text-[12px] font-semibold text-slate-600">
                    A new temporary password has been generated. In a real integration this would be emailed to <strong>{resetEmail}</strong>. For now, please save it below:
                  </p>
                  <div className="bg-white rounded-xl border border-emerald-100 p-4 flex items-center justify-between">
                    <div>
                      <span className="block text-[11px] text-slate-400 uppercase tracking-widest">New Temp Password</span>
                      <strong className="block text-slate-800 font-mono text-lg mt-0.5">{resetResult}</strong>
                    </div>
                    <button
                      type="button"
                      onClick={() => { navigator.clipboard.writeText(resetResult); alert('Password copied!'); }}
                      className="text-[11px] font-black uppercase text-emerald-600 hover:underline cursor-pointer tracking-wider"
                    >
                      Copy
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400">You will be prompted to change this password after logging in.</p>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => { setView('login'); setFlash(null); setResetResult(null); }}
              className="w-full text-center text-[12px] font-bold text-slate-400 hover:text-[#ff4fa3] transition-colors cursor-pointer"
            >
              ← Back to Login
            </button>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  // ════════════════════════════════════════════════════════════════════════════
  // VIEW: CHANGE PASSWORD (forced on first login with dummy password)
  // ════════════════════════════════════════════════════════════════════════════
  if (view === 'change-password') {
    return (
      <main className="bg-[#fff8f3] text-[#1b1533] min-h-screen selection:bg-[#ff4fa3] selection:text-white antialiased">
        <Header />
        <PageBanner subtitle={`Welcome, ${currentUser?.firstName}! Please set a new password to secure your account.`} />

        <section className="mx-auto max-w-xl px-4 py-12 md:px-8">
          <FlashBanner />

          {/* Amber notice */}
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs font-semibold text-amber-800 leading-relaxed">
              You are signed in with a <strong>temporary password</strong>. Please create a new secure password to continue. You cannot access your dashboard until this step is complete.
            </p>
          </div>

          <div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm space-y-6">
            <div className="text-center space-y-1">
              <div className="mx-auto h-14 w-14 rounded-2xl bg-violet-50 flex items-center justify-center text-violet-600 mb-4">
                <Key className="h-7 w-7" />
              </div>
              <h2 className="text-xl font-black text-[#1b1533] uppercase logo-font">Set New Password</h2>
              <p className="text-xs font-semibold text-slate-400">Signed in as <strong className="text-slate-600">{currentUser?.email}</strong></p>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <label className={labelCls}>
                New Password
                <PasswordInput value={newPass} onChange={setNewPass} placeholder="Minimum 6 characters" />
              </label>
              <label className={labelCls}>
                Confirm New Password
                <PasswordInput value={confirmPass} onChange={setConfirmPass} />
              </label>

              <button
                type="submit"
                disabled={isChangingPass}
                className="w-full inline-flex items-center justify-center rounded-2xl bg-[#ff4fa3] text-white border border-[#ff4fa3] py-4 text-xs font-black uppercase tracking-wider shadow-md shadow-pink-100 transition-all duration-300 hover:bg-black hover:text-[#ff4fa3] hover:border-black hover:-translate-y-0.5 active:translate-y-0 cursor-pointer gap-2 logo-font disabled:opacity-70 disabled:pointer-events-none"
              >
                {isChangingPass ? (
                  <>
                    <svg className="animate-spin h-4.5 w-4.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Saving Password...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-4.5 w-4.5" /> Save New Password & Continue
                  </>
                )}
              </button>
            </form>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full text-center text-[12px] font-bold text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
            >
              Sign out instead
            </button>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  // ════════════════════════════════════════════════════════════════════════════
  // VIEW: DASHBOARD (logged in, password changed)
  // ════════════════════════════════════════════════════════════════════════════
  return (
    <main className="bg-[#fff8f3] text-[#1b1533] min-h-screen selection:bg-[#ff4fa3] selection:text-white antialiased">
      <Header />

      <section className="bg-gradient-to-tr from-[#fffdfb] via-[#fffbf9] to-[#fff5f0] border-b border-purple-100/50 py-16 px-4 md:px-8 text-center relative overflow-hidden">
        <div className="absolute left-[5%] top-[10%] w-[300px] h-[300px] rounded-full bg-[#ffe8db]/30 blur-[80px] pointer-events-none" />
        <div className="absolute right-[5%] bottom-[5%] w-[300px] h-[300px] rounded-full bg-[#e0f2fe]/40 blur-[80px] pointer-events-none" />
        <div className="mx-auto max-w-3xl relative z-10 flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#ff4fa3]/5 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#ff4fa3]">
            <Sparkles className="h-3 w-3" /> Secure Client Dashboard
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#1b1533] uppercase logo-font">My Account</h1>
          <p className="text-xs md:text-sm font-semibold leading-relaxed text-slate-500 max-w-xl">
            Welcome back, <strong className="text-[#1b1533]">{currentUser?.displayName}</strong>! Manage your orders, addresses, and account settings.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <FlashBanner />

        <div className="grid gap-10 lg:grid-cols-[250px_1fr] items-start">

          {/* ── Sidebar ─────────────────────────────────────────────────────── */}
          <aside className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-1">
            {([
              { id: 'dashboard', label: 'Dashboard', icon: User },
              { id: 'orders', label: 'Orders', icon: ShoppingBag },
              { id: 'downloads', label: 'Downloads', icon: Download },
              { id: 'addresses', label: 'Addresses', icon: MapPin },
              { id: 'details', label: 'Account Details', icon: Key },
            ] as { id: typeof activeTab; label: string; icon: React.ElementType }[]).map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-black uppercase tracking-wider rounded-2xl transition-all duration-200 cursor-pointer text-left logo-font ${activeTab === tab.id
                  ? 'bg-[#ff4fa3] text-white shadow-md shadow-pink-100'
                  : 'text-slate-500 hover:bg-pink-50/50 hover:text-[#ff4fa3]'
                  }`}
              >
                <tab.icon className="h-4.5 w-4.5" />
                <span>{tab.label}</span>
              </button>
            ))}

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-xs font-black uppercase tracking-wider rounded-2xl text-red-500 hover:bg-red-50/50 transition-all duration-200 cursor-pointer text-left logo-font"
            >
              <LogOut className="h-4.5 w-4.5" />
              <span>Logout</span>
            </button>
          </aside>

          {/* ── Tab Content ─────────────────────────────────────────────────── */}
          <div className="bg-white border border-slate-100 rounded-[32px] p-6 md:p-8 shadow-sm min-h-[400px] overflow-x-hidden">

            {/* DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-black text-[#1b1533] uppercase logo-font">Client Hub</h2>
                  <p className="text-[12px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">Overview & Quick Actions</p>
                </div>
                <p className="text-sm font-semibold text-slate-600 leading-8">
                  Hello <strong className="text-[#1b1533]">{currentUser?.displayName}</strong> (not {currentUser?.displayName}?{' '}
                  <button onClick={handleLogout} className="text-[#ff4fa3] hover:underline font-bold">Log out</button>).
                  From your account dashboard you can view your{' '}
                  <button onClick={() => setActiveTab('orders')} className="text-[#ff4fa3] hover:underline font-bold">recent orders</button>,
                  manage your{' '}
                  <button onClick={() => setActiveTab('addresses')} className="text-[#ff4fa3] hover:underline font-bold">addresses</button>,
                  and edit your{' '}
                  <button onClick={() => setActiveTab('details')} className="text-[#ff4fa3] hover:underline font-bold">password and account details</button>.
                </p>
                <div className="grid gap-6 sm:grid-cols-3 mt-6">
                  <div className="border border-slate-100 bg-[#fffdfd] p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-[12px] font-bold uppercase tracking-widest text-[#ff4fa3]">Total Orders</span>
                    <b className="block text-2xl font-black text-[#1b1533] mt-2 logo-font">{currentUser?.orders?.length ?? 0} Order{(currentUser?.orders?.length ?? 0) !== 1 ? 's' : ''}</b>
                    <button onClick={() => setActiveTab('orders')} className="mt-3 text-[12px] font-bold uppercase tracking-wider text-[#7b5cff] hover:text-[#ff4fa3] flex items-center gap-1">
                      View Orders <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="border border-slate-100 bg-[#fffdfd] p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-[12px] font-bold uppercase tracking-widest text-[#ff4fa3]">Resource Files</span>
                    <b className="block text-2xl font-black text-[#1b1533] mt-2 logo-font">3 Available</b>
                    <button onClick={() => setActiveTab('downloads')} className="mt-3 text-[12px] font-bold uppercase tracking-wider text-[#7b5cff] hover:text-[#ff4fa3] flex items-center gap-1">
                      Access Downloads <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="border border-slate-100 bg-[#fffdfd] p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-[12px] font-bold uppercase tracking-widest text-[#ff4fa3]">Shipping Tier</span>
                    <b className="block text-2xl font-black text-emerald-600 mt-2 logo-font">Express Delivery</b>
                    <span className="block text-[12px] text-slate-400 mt-3 font-semibold uppercase">Canada Post Tracked</span>
                  </div>
                </div>
              </div>
            )}

            {/* ORDERS */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-black text-[#1b1533] uppercase logo-font">Order History</h2>
                  <p className="text-[12px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">Your Recent Transactions</p>
                </div>

                {currentUser?.orders && currentUser.orders.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs ">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-widest font-bold">
                          <th className="py-3 px-4">Order</th>
                          <th className="py-3 px-4">Date</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4">Total</th>
                          <th className="py-3 px-4 text-right">Tracking</th>
                        </tr>
                      </thead>
                      <tbody className="font-semibold text-slate-600">
                        {currentUser.orders.map(order => (
                          <tr key={order.orderId} className="border-b border-slate-100/70 hover:bg-slate-50/30 transition-colors">
                            <td className="py-4 px-4 font-black text-[#ff4fa3]">{order.orderId}</td>
                            <td className="py-4 px-4">{order.date}</td>
                            <td className="py-4 px-4">
                              <span className={`inline-block rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${order.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-600' :
                                order.status === 'cancelled' ? 'bg-red-500/10 text-red-600' :
                                  'bg-amber-500/10 text-amber-600'
                                }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-[#1b1533] font-black">{order.grandTotal} for {order.items?.length ?? 0} item{(order.items?.length ?? 0) !== 1 ? 's' : ''}</td>
                            <td className="py-4 px-4 text-right">
                              {order.trackingCode ? (
                                <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600 shadow-sm">
                                  <Truck className="h-3 w-3" /> {order.trackingCode}
                                </span>
                              ) : (
                                <span className="text-slate-300 text-[10px]">—</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="py-12 flex flex-col items-center gap-4 text-center">
                    <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center text-2xl">📦</div>
                    <div>
                      <p className="font-black text-slate-800 logo-font">No orders yet</p>
                      <p className="text-xs text-slate-400 mt-1">Your orders will appear here after checkout</p>
                    </div>
                    <Link href="/shop" className="mt-2 rounded-2xl bg-[#ff4fa3] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-pink-100 hover:bg-black transition-all duration-300 cursor-pointer logo-font">Browse Shop</Link>
                  </div>
                )}
              </div>
            )}

            {/* DOWNLOADS */}
            {activeTab === 'downloads' && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-black text-[#1b1533] uppercase logo-font">Product Downloads</h2>
                  <p className="text-[12px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">Premium Guides & Resources</p>
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
                        <span className="text-[12px] font-bold uppercase tracking-wider text-slate-400">Expires: {expires}</span>
                        <Link href="#" onClick={e => { e.preventDefault(); alert(`Simulated download of ${file}`); }}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-[#ff4fa3] text-white px-4 py-2 text-[12px] font-black uppercase tracking-wider hover:bg-black transition-all cursor-pointer shadow-sm shadow-pink-100">
                          <Download className="h-3 w-3" /> Download
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-black text-[#1b1533] uppercase logo-font">My Addresses</h2>
                  <p className="text-[12px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">Billing & Shipping</p>
                </div>
                <p className="text-sm font-semibold text-slate-500">Your addresses are pre-filled from your last order. Edit below and save.</p>
                <div className="grid gap-8 md:grid-cols-2">
                  {/* Billing Address */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-black uppercase tracking-wider text-[#ff4fa3] border-b border-slate-100 pb-2">Billing Address</h3>
                    {[
                      { key: 'firstName', label: 'First Name' },
                      { key: 'lastName', label: 'Last Name' },
                      { key: 'street', label: 'Street Address' },
                      { key: 'city', label: 'City' },
                      { key: 'province', label: 'Province' },
                      { key: 'postalCode', label: 'Postal Code' },
                    ].map(field => (
                      <label key={field.key} className={labelCls}>
                        {field.label}
                        <input
                          type="text"
                          placeholder={`Enter ${field.label}`}
                          className={fieldCls}
                          value={(billingAddress as any)[field.key]}
                          onChange={e => setBillingAddress(prev => ({ ...prev, [field.key]: e.target.value }))}
                        />
                      </label>
                    ))}
                  </div>

                  {/* Shipping Address */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-black uppercase tracking-wider text-[#ff4fa3] border-b border-slate-100 pb-2">Shipping Address</h3>
                    {[
                      { key: 'firstName', label: 'First Name' },
                      { key: 'lastName', label: 'Last Name' },
                      { key: 'street', label: 'Street Address' },
                      { key: 'city', label: 'City' },
                      { key: 'province', label: 'Province' },
                      { key: 'postalCode', label: 'Postal Code' },
                    ].map(field => (
                      <label key={field.key} className={labelCls}>
                        {field.label}
                        <input
                          type="text"
                          placeholder={`Enter ${field.label}`}
                          className={fieldCls}
                          value={(shippingAddress as any)[field.key]}
                          onChange={e => setShippingAddress(prev => ({ ...prev, [field.key]: e.target.value }))}
                        />
                      </label>
                    ))}
                  </div>
                </div>
                <button
                  onClick={handleSaveAddresses}
                  disabled={isSavingAddresses}
                  className="rounded-2xl bg-[#ff4fa3] text-white px-8 py-3 text-xs font-black uppercase tracking-wider hover:bg-black transition-all cursor-pointer logo-font disabled:opacity-50">
                  {isSavingAddresses ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}

            {/* ACCOUNT DETAILS */}
            {activeTab === 'details' && (
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black text-[#1b1533] uppercase logo-font">Account Details</h2>
                    <p className="text-[12px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">Personal Profile & Credentials</p>
                  </div>
                  <button type="submit" disabled={isSavingProfile} className="rounded-2xl bg-[#ff4fa3] text-white px-6 py-2.5 text-[12px] font-black uppercase tracking-widest hover:bg-black transition-all cursor-pointer logo-font disabled:opacity-50">
                    {isSavingProfile ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <label className={labelCls}>
                    First Name
                    <input type="text" value={profileFirstName} onChange={e => setProfileFirstName(e.target.value)} className={fieldCls} />
                  </label>
                  <label className={labelCls}>
                    Last Name
                    <input type="text" value={profileLastName} onChange={e => setProfileLastName(e.target.value)} className={fieldCls} />
                  </label>
                  <label className={`${labelCls} sm:col-span-2`}>
                    Email Address
                    <input type="email" value={profileEmail} onChange={e => setProfileEmail(e.target.value)} className={fieldCls} />
                  </label>
                </div>

                <div className="border-t border-slate-100 pt-6 space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-wider text-[#ff4fa3] flex items-center gap-1.5 logo-font">
                    <Lock className="h-4 w-4" /> Change Password
                  </h3>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <label className={labelCls}>
                      New Password
                      <PasswordInput value={newPass} onChange={setNewPass} />
                    </label>
                    <label className={labelCls}>
                      Confirm New Password
                      <PasswordInput value={confirmPass} onChange={setConfirmPass} />
                    </label>
                  </div>
                  {(newPass || confirmPass) && (
                    <button
                      type="button"
                      disabled={isChangingPass}
                      onClick={handleChangePassword}
                      className="inline-flex justify-center items-center gap-2 rounded-xl bg-violet-600 text-white px-6 py-2.5 text-[12px] font-black uppercase tracking-wider hover:bg-violet-800 transition-all cursor-pointer logo-font disabled:opacity-70 disabled:pointer-events-none"
                    >
                      {isChangingPass ? (
                        <>
                          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                          </svg>
                          Updating...
                        </>
                      ) : (
                        'Update Password'
                      )}
                    </button>
                  )}
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
