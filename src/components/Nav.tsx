"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, User, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { cart, loadCart } = useCart();
  const totalItems = cart.reduce(
  (sum, item) => sum + item.quantity,
  0
)

  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    setToken(savedToken);

    if (savedToken) {
      loadCart();
      fetch("/api/user", {
        headers: { Authorization: `Bearer ${savedToken}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.role) setRole(data.role);
        })
        .catch((err) => {
          console.error("Error fetching user role:", err);
          setRole(null);
        });
    } else {
      setRole(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/"
  }

  const linkClass = (path: string) =>
    `block px-3 py-2 rounded-md text-sm font-medium ${
      pathname === path
        ? "bg-orange-500 text-white"
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

          {role === "ADMIN" && (
            <Link href="/admin" className={linkClass("/admin")}>
              Admin
            </Link>
          )}

          <div className="relative ml-4">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center text-orange-400 hover:text-orange-500"
            >
              <User size={20} />
              <ChevronDown size={16} className="ml-1" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                <div className="py-1">
                  {token ? (
                    <>
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/cart"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        My Cart
                      </Link>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Settings
                      </Link>
                      <Link
                        href="/help"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Help & Support
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout()
                          setDropdownOpen(false)
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Log Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/signin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Log In/Sign Up
                      </Link>
                      <Link
                        href="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Settings
                      </Link>
                      <Link
                        href="/help"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Help & Support
                      </Link>
                    </>
                  )}
                </div>
              </div>
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
            href="#"
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-orange-400 hover:text-orange-500"
            onClick={(e) => {
              e.preventDefault()
              setDropdownOpen(!dropdownOpen)
            }}
          >
            <User size={20} className="mr-2" />
            Profile
            <ChevronDown size={16} className="ml-1" />
          </Link>

          {dropdownOpen && (
            <div className="ml-4 space-y-1">
              {token ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 text-sm text-orange-400 hover:text-orange-500"
                    onClick={() => {
                      setMenuOpen(false)
                      setDropdownOpen(false)
                    }}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/cart"
                    className="block px-3 py-2 text-sm text-orange-400 hover:text-orange-500"
                    onClick={() => {
                      setMenuOpen(false)
                      setDropdownOpen(false)
                    }}
                  >
                    My Cart
                  </Link>
                  <Link
                    href="/profile"
                    className="block px-3 py-2 text-sm text-orange-400 hover:text-orange-500"
                    onClick={() => {
                      setMenuOpen(false)
                      setDropdownOpen(false)
                    }}
                  >
                    Settings
                  </Link>
                  <Link
                    href="/help"
                    className="block px-3 py-2 text-sm text-orange-400 hover:text-orange-500"
                    onClick={() => {
                      setMenuOpen(false)
                      setDropdownOpen(false)
                    }}
                  >
                    Help & Support
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setMenuOpen(false)
                      setDropdownOpen(false)
                    }}
                    className="block w-full text-left px-3 py-2 text-sm text-orange-400 hover:text-orange-500"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/signin"
                    className="block px-3 py-2 text-sm text-orange-400 hover:text-orange-500"
                    onClick={() => {
                      setMenuOpen(false)
                      setDropdownOpen(false)
                    }}
                  >
                    Log In/Sign Up
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-3 py-2 text-sm text-orange-400 hover:text-orange-500"
                    onClick={() => {
                      setMenuOpen(false)
                      setDropdownOpen(false)
                    }}
                  >
                    Settings
                  </Link>
                  <Link
                    href="/help"
                    className="block px-3 py-2 text-sm text-orange-400 hover:text-orange-500"
                    onClick={() => {
                      setMenuOpen(false)
                      setDropdownOpen(false)
                    }}
                  >
                    Help & Support
                  </Link>
                </>
              )}
            </div>
          )}

        </div>
      )}
    </header>
  );
}