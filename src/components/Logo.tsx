import Link from 'next/link';
import Image from 'next/image';
export function Logo() {
  return (
    <Link href="/" className="block">
      <Image
        src="/images/logo.webp"
        alt="FunGuyz Logo"
        width={200}
        height={56}
        className="h-14 w-auto object-contain select-none pointer-events-none"
        // style={{ width: 'auto' }}
        priority
      />
    </Link>
  );
}
