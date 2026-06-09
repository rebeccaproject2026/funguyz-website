import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Mushroom Strains Guide Canada | FunGuyz",
  description: "Compare mushroom strains, potency levels, product formats and delivery options with the FunGuyz strain guide for Canada.",
  keywords: "mushroom strains Canada, strain guide, Golden Teacher, Penis Envy, mushroom delivery"
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
