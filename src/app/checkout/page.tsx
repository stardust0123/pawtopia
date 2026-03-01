"use client"
import { useCart } from "@/context/CartContext"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const { cart } = useCart()
  const router = useRouter()

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const [form, setForm] = useState({
    fullName: "",
    address1: "",
    address2: "",
    city: "",
    province: "",
    email: "",
    phone: "",
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.fullName || !form.address1 || !form.province || !form.email || !form.phone) {
      alert("Please fill in all required fields.")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
      })

      const data = await res.json()

      if (data.url) {
        window.location.href = data.url // 🔥 redirect to Stripe
      }

    } catch (error) {
      alert("Stripe checkout failed.")
    }

    setLoading(false)
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto pt-28 text-center">
        <h1 className="text-2xl font-semibold">Your cart is empty.</h1>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 pt-28 pb-16">
      <h1 className="text-3xl font-bold mb-10">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT — SHIPPING FORM */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-8">

          <h2 className="text-xl font-semibold mb-6">
            Shipping Information
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block text-sm mb-2">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Address Line 1 *</label>
              <input
                type="text"
                name="address1"
                value={form.address1}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Address Line 2</label>
              <input
                type="text"
                name="address2"
                value={form.address2}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className="block text-sm mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Province *</label>
                <input
                  type="text"
                  name="province"
                  value={form.province}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Phone *</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--color-product)] text-black py-3 rounded-lg hover:opacity-90 transition"
            >
              {loading ? "Processing..." : "Pay with Visa"}
            </button>

          </form>
        </div>

        {/* RIGHT — ORDER SUMMARY */}
        <div className="bg-white rounded-xl shadow-md p-6 h-fit sticky top-32">

          <h2 className="text-xl font-semibold mb-6">
            Order Summary
          </h2>

          {cart.map((item) => (
            <div key={item.id} className="flex justify-between mb-4">
              <span>
                {item.name} x{item.quantity}
              </span>
              <span>
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}

          <div className="border-t pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

        </div>

      </div>
    </div>
  )
}