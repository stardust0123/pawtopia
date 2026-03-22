"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useCart } from "@/context/CartContext"

interface OrderResponse {
  id: number
}

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { clearCart } = useCart()

  const [step, setStep] = useState<"loading" | "done" | "error">("loading")
  const [orderId, setOrderId] = useState<number | null>(null)
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    if (processing) return

    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/signin")
      return
    }

    const sessionId = searchParams.get("session_id")
    if (!sessionId) {
      setStep("error")
      return
    }

    const alreadyCreated = localStorage.getItem(`orderCreated_${sessionId}`)
    if (alreadyCreated) {
      setStep("done")
      setOrderId(Number(alreadyCreated))
      return
    }

    setProcessing(true)

    fetch("/api/cart", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((cartItems) => {
        if (!Array.isArray(cartItems) || cartItems.length === 0) {
          throw new Error("Empty cart")
        }

        return fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ cart: cartItems })
        })
      })
      .then((res) => res.json())
      .then((order: OrderResponse & { error?: string }) => {
        if (order.error) throw new Error(order.error)
        setOrderId(order.id)
        localStorage.setItem(`orderCreated_${sessionId}`, String(order.id))
        clearCart()
        setStep("done")
        setProcessing(false)
      })
      .catch((err) => {
        console.error("Order creation failed", err)
        setStep("error")
        setProcessing(false)
      })
  }, [searchParams, router])

  if (step === "loading") {
    return <div className="max-w-5xl mx-auto pt-28">Processing your order...</div>
  }

  if (step === "error") {
    return (
      <div className="max-w-5xl mx-auto pt-28 px-4">
        <h1 className="text-3xl font-bold mb-4">Order processing failed</h1>
        <p>Please contact support or try again.</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto pt-28 px-4">
      <h1 className="text-3xl font-bold mb-4">Order Success!</h1>
      <p className="text-lg mb-4">Your payment was successful.</p>
      {orderId && (
        <p className="mb-6">Order number: <strong>{orderId}</strong></p>
      )}
      <div className="flex gap-3">
        <button onClick={() => router.push("/orders")} className="bg-theme text-white px-4 py-2 rounded-lg">
          View All Orders
        </button>
        {orderId && (
          <button onClick={() => router.push(`/orders/${orderId}`)} className="border border-theme text-theme px-4 py-2 rounded-lg">
            Order Details
          </button>
        )}
      </div>
    </div>
  )
}
