import React from 'react';
import type { Metadata } from 'next';
import { products, getProductSlug, getProductSeoMetadata } from '@/data/products';

export async function generateMetadata({ params }: { params: Promise<{ categorySlug: string; productSlug: string }> }): Promise<Metadata> {
  const { productSlug } = await params;
  
  let matched = products.find(p => getProductSlug(p[0]) === productSlug);
  if (!matched) {
    matched = products[0]; // Fallback
  }

  const seoData = getProductSeoMetadata(matched[0], matched[1]);

  return {
    title: seoData.titleTag,
    description: seoData.metaDescription,
    keywords: seoData.keywords,
  };
}

export default function CategoryProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
