import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
})

export async function POST(req: Request) {
  try {
    const { cart } = await req.json()

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // Visa only via card

      line_items: cart.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),

      mode: "payment",

      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
    })

    return NextResponse.json({ url: session.url })

  } catch (error) {
    return NextResponse.json(
      { error: "Stripe session creation failed" },
      { status: 500 }
    )
  }
}