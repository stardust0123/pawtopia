import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-02-25.clover',   // ← THIS IS THE FIX
});

export async function POST(request: Request) {
    try {
        const { amount, hotelId, roomType, startDate, endDate, numCats } = await request.json();

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount),
            currency: 'vnd',
            metadata: {
                hotelId: String(hotelId),
                roomType,
                startDate,
                endDate,
                numCats: String(numCats),
            },
            automatic_payment_methods: { enabled: true },
        });

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
        });
    } catch (error: any) {
        console.error('Stripe error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}