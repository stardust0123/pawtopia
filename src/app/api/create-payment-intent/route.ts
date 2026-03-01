import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
})

export async function POST(req: Request) {
  try {
    const { cart } = await req.json()

    // Recalculate total server-side (IMPORTANT)
    const total = cart.reduce(
      (sum: number, item: any) =>
        sum + item.price * item.quantity,
      0
    )

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // Stripe uses cents
      currency: "usd",
      payment_method_types: ["card"], // Visa only via card
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    return NextResponse.json(
      { error: "PaymentIntent creation failed" },
      { status: 500 }
    )
  }
}