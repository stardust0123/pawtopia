"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      pathname === path
        ? "bg-theme text-white" // active link
        : "text-orange-400 hover:text-orange-500" // inactive link
    }`;

  return (
    <header className="bg-background">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo + Text */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/logo.jpg"
            alt="Pawtopia Logo"
            width={60}
            height={60}
            className="object-contain"
          />
          <span className="text-xl font-bold text-theme">Pawtopia</span>
        </Link>

        {/* Navigation Links */}
        <nav className="space-x-2">
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>
          <Link href="/services" className={linkClass("/services")}>
            Services
          </Link>
          <Link href="/about" className={linkClass("/about")}>
            About Us
          </Link>
          <Link href="/signin" className={linkClass("/signin")}>
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
}

