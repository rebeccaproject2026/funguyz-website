import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Track Mushroom Delivery Order | FunGuyz Canada',
  description: 'Track your FunGuyz order status, shipping progress and delivery updates quickly and securely across Canada.',
  keywords: 'track mushroom order, delivery tracking Canada, FunGuyz tracking, order status',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
