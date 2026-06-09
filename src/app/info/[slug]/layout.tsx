import React from 'react';
import type { Metadata } from 'next';

const seoMap: Record<string, { title: string; description: string; keywords: string }> = {
  "shipping-policy": {
    "title": "Shipping Policy Canada | Mushroom Delivery | FunGuyz",
    "description": "Review FunGuyz shipping policy for delivery areas, Canada-wide shipping, timelines, discreet packaging and order updates.",
    "keywords": "FunGuyz shipping policy, mushroom delivery Canada, discreet shipping, delivery policy"
  },
  "payment-methods": {
    "title": "Payment Methods | Secure Mushroom Orders | FunGuyz",
    "description": "Review FunGuyz payment methods for secure mushroom orders, delivery purchases and Canada-wide shipping checkout.",
    "keywords": "FunGuyz payment methods, secure checkout, mushroom order payment, delivery payment"
  },
  "returns-and-refunds": {
    "title": "Returns & Refunds Policy | FunGuyz Canada",
    "description": "Read the FunGuyz returns and refunds policy for product orders, delivery issues, shipping concerns and customer support.",
    "keywords": "FunGuyz returns, refund policy Canada, delivery issue support, order refund"
  },
  "cookie-policy": {
    "title": "Cookie Policy | FunGuyz Canada",
    "description": "Read the FunGuyz cookie policy to understand how website cookies support browsing, checkout, analytics and user experience.",
    "keywords": "FunGuyz cookie policy, website cookies, privacy policy, user data"
  },
  "privacy-policy": {
    "title": "Privacy Policy | FunGuyz Canada",
    "description": "Review the FunGuyz privacy policy covering customer information, order data, checkout security and website use.",
    "keywords": "FunGuyz privacy policy, customer privacy, order data, secure checkout"
  },
  "responsible-use": {
    "title": "Responsible Use Guide | FunGuyz Canada",
    "description": "Read FunGuyz responsible-use guidance for product awareness, safe ordering, age rules, storage and customer education.",
    "keywords": "responsible use, mushroom education, safe ordering, age rules, FunGuyz"
  },
  "legal-disclaimer": {
    "title": "Legal Disclaimer | FunGuyz Canada",
    "description": "Review the FunGuyz legal disclaimer for website use, product information, customer responsibility and regional rules.",
    "keywords": "FunGuyz legal disclaimer, product disclaimer, website terms, customer responsibility"
  },
  "age-verification": {
    "title": "Age Verification Policy | FunGuyz Canada",
    "description": "Read the FunGuyz age verification policy for account access, product browsing, responsible ordering and customer safety.",
    "keywords": "age verification, FunGuyz age policy, responsible ordering, customer safety"
  },
  "terms-and-conditions": {
    "title": "Terms & Conditions | FunGuyz Canada",
    "description": "Review FunGuyz terms and conditions for website use, orders, payments, delivery, shipping, refunds and customer responsibilities.",
    "keywords": "FunGuyz terms, terms and conditions, delivery terms, order policy, payment terms"
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const seo = seoMap[slug] || { title: 'FunGuyz', description: '', keywords: '' };
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
  };
}

export default function InfoSlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
