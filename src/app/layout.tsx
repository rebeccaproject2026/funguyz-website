import type { Metadata } from 'next';
import { Fredoka, Outfit, Poppins } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { LaunchPopup } from '@/components/LaunchPopup';

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-fredoka',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['500', '700', '900'],
  variable: '--font-outfit',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.funguyz.ca'),
  title: 'FunGuyz | Mushroom Delivery Toronto & Canada',
  description: 'Fast mushroom delivery in Toronto, Mississauga, Brampton, Oakville, Barrie & the GTA. Canada-wide shipping, discreet packaging and premium products.',
  keywords: 'mushroom delivery toronto, mushroom delivery gta, mushroom delivery mississauga, mushroom delivery brampton, mushroom delivery oakville, mushroom delivery barrie, mushroom shipping canada, canada wide mushroom shipping, fast mushroom delivery, same day mushroom delivery, mushroom delivery near me, premium mushroom products, discreet mushroom shipping, online mushroom store canada, mushroom shop toronto, mushroom products canada, funguyz, funguyz delivery, funguyz canada',
  icons: {
    icon: [
      { url: '/images/favicon.png' },
      new URL('/images/favicon.png', 'https://www.funguyz.ca'),
    ],
    shortcut: '/images/favicon.png',
    apple: '/images/favicon.png',
  },
};

import NextAuthProvider from '@/context/NextAuthProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${fredoka.variable} ${outfit.variable} ${poppins.variable}`}>
      <body className="antialiased font-sans">
        <NextAuthProvider>
          <AuthProvider>
            <CartProvider>
              {children}
              <LaunchPopup />
            </CartProvider>
          </AuthProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
