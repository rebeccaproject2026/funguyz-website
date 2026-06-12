import Link from 'next/link';
export function Logo() {
  return (
    <Link href="/" className="block">
      <img
        src="/images/logo.webp"
        alt="FunGuyz Logo"
        className="h-14 w-auto object-contain select-none pointer-events-none"
      />
    </Link>
  );
}
