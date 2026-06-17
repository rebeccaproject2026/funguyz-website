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
  metadataBase: new URL('https://funguyz.ca'),
  title: 'FunGuyz | Magic Mushroom Delivery Canada & GTA',
  description: 'Shop premium magic mushrooms with fast delivery across Toronto, Mississauga, Brampton and the GTA. Canada-wide shipping and discreet packaging.',
  keywords: 'magic mushroom delivery Canada, mushroom delivery GTA, buy magic mushrooms online, FunGuyz, mushroom shipping Canada',
  icons: {
    icon: [
      { url: '/images/favicon.png' },
      new URL('/images/favicon.png', 'https://funguyz.ca'),
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
