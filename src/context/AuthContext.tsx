'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface OrderRecord {
  orderId: string;
  date: string;
  grandTotal: string;
  items: { title: string; category: string; price: string; quantity: number; imageSrc: string }[];
  deliveryDetails?: { date: string; timeSlot: string };
  trackingCode?: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

export interface FunguyzUser {
  isDummyPassword?: boolean;
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  role: string;
  orders: OrderRecord[];
  addresses?: any[];
  phone?: string;
}

interface AuthContextType {
  currentUser: FunguyzUser | null;
  isLoggedIn: boolean;
  status: "loading" | "authenticated" | "unauthenticated";
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updatePassword: (newPassword: string, confirmPassword: string) => Promise<{ success: boolean; message: string }>;
  resetPassword: (email: string, turnstileToken: string) => Promise<{ success: boolean; message: string; newPassword?: string }>;
  createUserFromOrder: (
    userData: { email: string; firstName: string; lastName: string },
    order: OrderRecord
  ) => Promise<{ password?: string; isNewUser: boolean; success: boolean }>;
  loadProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status, update } = useSession();
  const [currentUser, setCurrentUser] = useState<FunguyzUser | null>(null);

  const profileFetchedForRef = useRef<string | null>(null);

  // Sync session with context state
  useEffect(() => {
    let isMounted = true;
    if (session?.user) {
      const userId = session.user.id;

      // Set initial state from session while fetching full details
      setCurrentUser(prev => {
        if (prev?.id === userId) return prev; // Prevent wiping out state if we already have it
        return {
          id: userId,
          email: session.user.email as string, 
          firstName: session.user.name?.split(' ')[0] || '',
          lastName: session.user.name?.split(' ')[1] || '',
          displayName: session.user.name || '',
          role: session.user.role || 'CUSTOMER',
          isDummyPassword: (session.user as any).isDummyPassword || false,
          orders: [],
        };
      });
    } else {
      setCurrentUser(null);
      profileFetchedForRef.current = null; // Reset on logout
    }
    return () => { isMounted = false; };
  }, [session]);

  const loadProfile = async () => {
    if (session?.user?.id) {
      const userId = session.user.id;
      if (profileFetchedForRef.current !== userId) {
        profileFetchedForRef.current = userId;
        try {
          const res = await fetch('/api/user/profile');
          const data = await res.json();
          if (data.success) {
            setCurrentUser(prev => prev ? {
              ...prev,
              firstName: data.profile.firstName,
              lastName: data.profile.lastName,
              displayName: `${data.profile.firstName} ${data.profile.lastName}`.trim(),
              email: data.profile.email,
              phone: data.profile.phone,
              addresses: data.profile.addresses,
              orders: data.orders,
            } : null);
          }
        } catch (e) { console.error(e); }
      }
    }
  };

  const login = async (email: string, password: string) => {
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      return { success: false, message: res.error };
    }
    
    return { success: true, message: 'Welcome back!' };
  };

  const logout = async () => {
    await signOut({ redirect: false });
  };

  const updatePassword = async (newPassword: string, confirmPassword: string) => {
    if (newPassword !== confirmPassword) return { success: false, message: 'Passwords do not match.' };
    
    try {
      const res = await fetch('/api/auth/update-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });
      const data = await res.json();
      if (data.success) {
        await update({ isDummyPassword: false });
        setCurrentUser(prev => prev ? { ...prev, isDummyPassword: false } : null);
      }
      return { success: data.success, message: data.message };
    } catch (err) {
      return { success: false, message: 'Failed to update password.' };
    }
  };

  const resetPassword = async (email: string, turnstileToken: string) => {
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, turnstileToken }),
      });
      const data = await res.json();
      return { success: data.success, message: data.message, newPassword: data.newPassword };
    } catch (err) {
      return { success: false, message: 'Failed to request password reset.' };
    }
  };

  const createUserFromOrder = async (
    userData: { email: string; firstName: string; lastName: string },
    order: OrderRecord
  ) => {
    // This is now handled entirely by the checkout API.
    // The frontend just needs to call the checkout API, and it will handle registration.
    return { isNewUser: true, success: true };
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isLoggedIn: !!currentUser,
      status,
      login,
      logout,
      updatePassword,
      resetPassword,
      createUserFromOrder,
      loadProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
