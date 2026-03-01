"use client"

import { useCart } from "@/context/CartContext"
import Image from "next/image"
import Link from "next/link"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart()

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div className="max-w-6xl mx-auto px-6 pt-28 pb-16">
      <h1 className="text-3xl font-bold mb-10">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-10 text-center">
          <p className="text-gray-600 text-lg mb-6">
            Your cart is empty.
          </p>
          <Link
            href="/products"
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT SIDE — CART ITEMS */}
          <div className="lg:col-span-2 space-y-6">

            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm p-6 flex flex-col md:flex-row gap-6"
              >
                {/* Product Image */}
                <div className="relative w-full md:w-32 h-32 flex-shrink-0">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-between">

                  <div>
                    <h2 className="font-semibold text-lg">
                      {item.name}
                    </h2>
                    <p className="text-gray-500">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mt-4">

                    {/* Quantity */}
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-500">
                        Qty:
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, Number(e.target.value))
                        }
                        className="w-20 border rounded-lg px-3 py-2"
                      />
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-600 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Item Subtotal */}
                <div className="font-semibold text-lg">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <Link
              href="/products"
              className="inline-block mt-6 text-orange-500 hover:text-orange-600"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* RIGHT SIDE — SUMMARY */}
          <div className="lg:col-span-1">

            <div className="bg-white rounded-xl shadow-md p-6 sticky top-32">

              <h2 className="text-xl font-semibold mb-6">
                Order Summary
              </h2>

              <div className="flex justify-between mb-4">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="flex justify-between mb-4">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>

              <div className="border-t pt-4 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <Link
                href="/checkout"
                className="mt-6 block w-full text-center bg-[var(--color-product)] text-white py-3 rounded-lg hover:bg-black transition"
              >
                Proceed to Checkout
              </Link>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}