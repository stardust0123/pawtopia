"use client"

import { CartProvider } from "@/context/CartContext"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CartProvider>
      <Elements stripe={stripePromise}>
        {children}
      </Elements>
    </CartProvider>
  )
}