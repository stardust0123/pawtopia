"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: number
  email: string
  name: string | null
  role: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/signin")
      return
    }

    fetch("/api/user", {
      headers: { Authorization: `Bearer ${token}` }
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
      .catch(err => {
        console.error("Error fetching user:", err)
        router.push("/signin")
      })
  }, [router])

  return (
    <div className="max-w-5xl mx-auto pt-28 px-4">
      <h1 className="text-3xl font-bold mb-6">
        {user ? `Hello, ${user.name || user.email}` : "User Dashboard"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* My Cart */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-4">My Cart</h2>
          <p className="text-gray-600 mb-4">View and manage your cart items.</p>
          <a href="/cart" className="text-theme hover:underline">Go to Cart</a>
        </div>

        {/* My Orders */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-4">My Orders</h2>
          <p className="text-gray-600 mb-4">Track your order history.</p>
          <a href="/orders" className="text-theme hover:underline">View Orders</a>
        </div>

        {/* My Information */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-4">My Information</h2>
          <p className="text-gray-600 mb-4">Update your personal details.</p>
          <a href="/profile" className="text-theme hover:underline">Edit Profile</a>
        </div>

        {/* My Saved Products */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-4">My Saved Products</h2>
          <p className="text-gray-600 mb-4">View your saved items.</p>
          <a href="/saved" className="text-theme hover:underline">View Saved</a>
        </div>
      </div>
    </div>
  )
}