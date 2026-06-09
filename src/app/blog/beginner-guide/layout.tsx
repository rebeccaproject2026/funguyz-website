import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Beginner Guide to Mushrooms Canada | FunGuyz",
  description: "Read the FunGuyz beginner guide for mushroom basics, strain education, product types, delivery options and responsible use.",
  keywords: "beginner mushroom guide, mushroom education Canada, mushroom strains, responsible use"
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
