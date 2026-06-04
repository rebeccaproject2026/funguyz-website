import React from 'react';
import { products } from '@/data/products';

export function generateStaticParams() {
  return products.map((post) => ({
    slug: post[0].toLowerCase().replace(/\s+/g, '-'),
  }));
}

export default function ProductSlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
