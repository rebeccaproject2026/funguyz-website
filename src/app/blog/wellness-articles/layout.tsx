import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Mushroom Wellness Articles Canada | FunGuyz",
  description: "Explore mushroom wellness articles covering functional mushrooms, product education, routines and delivery options in Canada.",
  keywords: "mushroom wellness articles, functional mushrooms Canada, mushroom education, delivery Canada"
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
