import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="relative w-15 h-16  flex items-center">
      <Image
        src="/images/logo.png"
        alt="Logo name"
        fill
        style={{ objectFit: "contain" }}
        loading="eager"
        sizes="(max-width: 768px) 50vw, 70px"
      />
    </Link>
  );
}
