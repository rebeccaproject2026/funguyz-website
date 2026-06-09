import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Mushroom Research & Studies Canada | FunGuyz",
  description: "Explore mushroom research summaries, studies, educational resources and responsible-use topics from FunGuyz Canada.",
  keywords: "mushroom research, mushroom studies Canada, psilocybin education, responsible use"
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
