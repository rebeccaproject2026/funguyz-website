'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
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
}

interface AuthContextType {
  currentUser: FunguyzUser | null;
  isLoggedIn: boolean;
  status: "loading" | "authenticated" | "unauthenticated";
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updatePassword: (newPassword: string, confirmPassword: string) => Promise<{ success: boolean; message: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  createUserFromOrder: (
    userData: { email: string; firstName: string; lastName: string },
    order: OrderRecord
  ) => Promise<{ password?: string; isNewUser: boolean; success: boolean }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [currentUser, setCurrentUser] = useState<FunguyzUser | null>(null);

  // Sync session with context state
  useEffect(() => {
    if (session?.user) {
      // In a full implementation, you might fetch full user details including orders from an API here
      setCurrentUser({
        id: session.user.id,
        email: session.user.email as string, // keep email cast if NextAuth marks it optional
        firstName: session.user.name?.split(' ')[0] || '',
        lastName: session.user.name?.split(' ')[1] || '',
        displayName: session.user.name || '',
        role: session.user.role || 'CUSTOMER',
        orders: [], // You would fetch orders from /api/user/orders
      });
    } else {
      setCurrentUser(null);
    }
  }, [session]);

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
      return { success: data.success, message: data.message };
    } catch (err) {
      return { success: false, message: 'Failed to update password.' };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      return { success: data.success, message: data.message };
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
