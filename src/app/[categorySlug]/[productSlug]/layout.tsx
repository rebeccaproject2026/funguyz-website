import React from 'react';
import { products, getCategorySlug, getProductSlug } from '@/data/products';

export async function generateStaticParams() {
  return products.map((post) => ({
    categorySlug: getCategorySlug(post[1]),
    productSlug: getProductSlug(post[0]),
  }));
}

export default function CategoryProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
