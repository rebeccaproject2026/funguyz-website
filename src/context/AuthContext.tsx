'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface OrderRecord {
  orderId: string;
  date: string;
  grandTotal: string;
  items: { title: string; category: string; price: string; quantity: number; imageSrc: string }[];
  deliveryDetails?: { date: string; timeSlot: string };
  trackingCode?: string;
  status: 'processing' | 'completed' | 'cancelled';
}

export interface FunguyzUser {
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  password: string;
  isDummyPassword: boolean;
  registeredAt: string;
  orders: OrderRecord[];
}

interface AuthContextType {
  currentUser: FunguyzUser | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
  updatePassword: (newPassword: string, confirmPassword: string) => { success: boolean; message: string };
  resetPassword: (email: string) => { success: boolean; message: string; newPassword?: string };
  createUserFromOrder: (
    userData: { email: string; firstName: string; lastName: string },
    order: OrderRecord
  ) => { password: string; isNewUser: boolean };
}

// ─── Storage Helpers ──────────────────────────────────────────────────────────

const USERS_KEY = 'funguyz_users';
const SESSION_KEY = 'funguyz_current_user';

function generateDummyPassword(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let pass = 'FG-';
  for (let i = 0; i < 6; i++) pass += chars[Math.floor(Math.random() * chars.length)];
  return pass;
}

function loadUsers(): FunguyzUser[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); } catch { return []; }
}

function saveUsers(users: FunguyzUser[]) {
  if (typeof window !== 'undefined')
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<FunguyzUser | null>(null);

  // Rehydrate from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(SESSION_KEY);
    if (!stored) return;
    try {
      const { email } = JSON.parse(stored);
      const users = loadUsers();
      const fresh = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      setCurrentUser(fresh || null);
      if (!fresh) localStorage.removeItem(SESSION_KEY);
    } catch {
      localStorage.removeItem(SESSION_KEY);
    }
  }, []);

  // ── Login ──────────────────────────────────────────────────────────────────
  const login = (email: string, password: string): { success: boolean; message: string } => {
    const users = loadUsers();
    const user = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!user) return { success: false, message: 'No account found with this email address.' };
    if (user.password !== password.trim())
      return { success: false, message: 'Incorrect password. Please try again.' };
    setCurrentUser(user);
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email: user.email }));
    return { success: true, message: 'Welcome back!' };
  };

  // ── Logout ─────────────────────────────────────────────────────────────────
  const logout = () => {
    setCurrentUser(null);
    if (typeof window !== 'undefined') localStorage.removeItem(SESSION_KEY);
  };

  // ── Update Password (logged-in user) ───────────────────────────────────────
  const updatePassword = (newPassword: string, confirmPassword: string): { success: boolean; message: string } => {
    if (!currentUser) return { success: false, message: 'Not logged in.' };
    if (newPassword.trim().length < 6) return { success: false, message: 'Password must be at least 6 characters.' };
    if (newPassword !== confirmPassword) return { success: false, message: 'Passwords do not match.' };
    const users = loadUsers();
    const idx = users.findIndex(u => u.email.toLowerCase() === currentUser.email.toLowerCase());
    if (idx === -1) return { success: false, message: 'User not found.' };
    users[idx].password = newPassword.trim();
    users[idx].isDummyPassword = false;
    saveUsers(users);
    const updated = { ...users[idx] };
    setCurrentUser(updated);
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email: updated.email }));
    return { success: true, message: 'Password changed successfully!' };
  };

  // ── Reset Password (logged-out, "forgot password") ─────────────────────────
  const resetPassword = (email: string): { success: boolean; message: string; newPassword?: string } => {
    const users = loadUsers();
    const idx = users.findIndex(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (idx === -1) return { success: false, message: 'No account found with this email address.' };
    const newPass = generateDummyPassword();
    users[idx].password = newPass;
    users[idx].isDummyPassword = true;
    saveUsers(users);
    return { success: true, message: 'Password reset successfully.', newPassword: newPass };
  };

  // ── Auto-create account from order ────────────────────────────────────────
  const createUserFromOrder = (
    userData: { email: string; firstName: string; lastName: string },
    order: OrderRecord
  ): { password: string; isNewUser: boolean } => {
    const users = loadUsers();
    const existingIdx = users.findIndex(u => u.email.toLowerCase() === userData.email.toLowerCase());

    if (existingIdx !== -1) {
      // Returning customer — append order only, don't change password
      users[existingIdx].orders = [order, ...users[existingIdx].orders];
      saveUsers(users);
      return { password: users[existingIdx].password, isNewUser: false };
    } else {
      // New customer — create account with dummy password
      const dummyPassword = generateDummyPassword();
      const newUser: FunguyzUser = {
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        displayName: `${userData.firstName} ${userData.lastName}`,
        password: dummyPassword,
        isDummyPassword: true,
        registeredAt: new Date().toISOString(),
        orders: [order],
      };
      users.push(newUser);
      saveUsers(users);
      return { password: dummyPassword, isNewUser: true };
    }
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isLoggedIn: !!currentUser,
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
