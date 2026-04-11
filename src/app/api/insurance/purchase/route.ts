import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-02-25.clover' });

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { planId, catName, catBreed, catAge, medicalHistory, amount } = data;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(Number(amount)),
            currency: 'vnd',
            metadata: {
                planId: String(planId),
                catName: catName || '',
                catBreed: catBreed || '',
            },
            automatic_payment_methods: { enabled: true },
        });

        return NextResponse.json({ clientSecret: paymentIntent.client_secret, paymentIntentId: paymentIntent.id });
    } catch (error: any) {
        console.error('Insurance purchase error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}