"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CartButton, ProfileButton } from "@/ui/icons";

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const { cart } = useCart();

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const linkClass = (path: string) =>
    `block px-3 py-2 rounded-md text-sm font-medium ${
      pathname === path
        ? "bg-theme text-white"
        : "text-orange-400 hover:text-orange-500"
    }`;

  return (
    <header className="bg-background shadow-md fixed w-full top-0 left-0 z-50 h-20">
      <div className="container mx-auto px-4 h-full flex justify-between items-center">

        {/* Logo */}
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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">

          <Link href="/" className={linkClass("/")}>
            Home
          </Link>

          <Link href="/services" className={linkClass("/services")}>
            Services
          </Link>

          <Link href="/about" className={linkClass("/about")}>
            About Us
          </Link>

          <Link href="/signin" className="ml-4">
            <User size={20} className="text-orange-400 hover:text-orange-500" />
          </Link>

          {/* 🛒 Cart Icon */}
          <div className="relative ml-4">
            <Link href="/cart">
              <CartButton />
            </Link>

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {totalItems}
              </span>
            )}
          </div>

        </nav>

        {/* Hamburger (mobile) */}
        <button
          className="md:hidden text-orange-500 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-background border-t border-gray-200 shadow-lg px-4 py-4 space-y-2">

          <Link
            href="/"
            className={linkClass("/")}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            href="/services"
            className={linkClass("/services")}
            onClick={() => setMenuOpen(false)}
          >
            Services
          </Link>

          <Link
            href="/about"
            className={linkClass("/about")}
            onClick={() => setMenuOpen(false)}
          >
            About Us
          </Link>

          <Link
            href="/signin"
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-orange-400 hover:text-orange-500"
            onClick={() => setMenuOpen(false)}
          >
            <User size={20} className="mr-2" />
            Sign In
          </Link>

          {/* Mobile Cart */}
          <Link
            href="/cart"
            className="flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium text-orange-400"
            onClick={() => setMenuOpen(false)}
          >
            Cart
            {totalItems > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      )}
    </header>
  );
}