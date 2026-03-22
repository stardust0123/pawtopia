"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  ShoppingCart,
  Package,
  User,
  Heart,
  Hotel,
  Stethoscope,
  ShieldCheck,
} from "lucide-react"

interface UserType {
  id: number
  email: string
  name: string | null
  role: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserType | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      router.push("/signin")
      return
    }

    fetch("/api/user", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (!data || data.error) {
          router.push("/signin")
          return
        }

        if (data.role === "ADMIN") {
          router.push("/admin")
          return
        }

        setUser(data)
      })
      .catch(() => router.push("/signin"))
  }, [router])

  return (
    <div className="max-w-6xl mx-auto pt-32 pb-16 px-6 bg-background">
      {/* 👋 Welcome */}
      <h1 className="text-3xl font-bold mb-2">
        {user ? `Welcome back, ${user.name || user.email} 👋` : "Dashboard"}
      </h1>
      <p className="text-gray-500 mb-10">
        Manage your orders, bookings, and services in one place.
      </p>

      {/* 🧩 GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">

        {/* 👤 PROFILE */}
        <Link href="/profile" className="block">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition">
            <div className="flex items-center gap-3 mb-4">
              <User />
              <h2 className="text-lg font-semibold">My Profile</h2>
            </div>
            <p className="text-sm text-gray-700">
              Update your personal information.
            </p>
          </div>
        </Link>

        {/* ❤️ SAVED */}
        <Link href="/saved" className="block">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition">
            <div className="flex items-center gap-3 mb-4">
              <Heart />
              <h2 className="text-lg font-semibold">Saved Items</h2>
            </div>
            <p className="text-sm text-gray-700">
              View your saved products.
            </p>
          </div>
        </Link>

        {/* 🛒 CART */}
        <Link href="/cart" className="block">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition">
            <div className="flex items-center gap-3 mb-4">
              <ShoppingCart />
              <h2 className="text-lg font-semibold">My Cart</h2>
            </div>
            <p className="text-sm text-gray-700">
              View and manage your cart items.
            </p>
          </div>
        </Link>

        {/* 📦 ORDERS */}
        <Link href="/orders" className="block">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition">
            <div className="flex items-center gap-3 mb-4">
              <Package />
              <h2 className="text-lg font-semibold">My Orders</h2>
            </div>
            <p className="text-sm text-gray-700">
              Track your order history and status.
            </p>
          </div>
        </Link>

        {/* 🏨 BOOKINGS */}
        <Link href="/bookings" className="block">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition">
            <div className="flex items-center gap-3 mb-4">
              <Hotel />
              <h2 className="text-lg font-semibold">My Bookings</h2>
            </div>
            <p className="text-sm text-gray-700">
              Manage hotel & sitter bookings.
            </p>
          </div>
        </Link>

        {/* 🛡 INSURANCE */}
        <Link href="/insurance" className="block">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck />
              <h2 className="text-lg font-semibold">Insurance</h2>
            </div>
            <p className="text-sm text-gray-700">
              View and manage your policies.
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}