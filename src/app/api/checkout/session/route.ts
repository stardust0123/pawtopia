import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-02-25.clover',
});

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { bookingId, totalPrice, hotelName } = data;

        const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'vnd',
                        product_data: {
                            name: `Booking #${bookingId} - ${hotelName || 'Hotel'}`,
                        },
                        unit_amount: Math.round(Number(totalPrice)),
                    },
                    quantity: 1,
                },
            ],
            metadata: { bookingId: String(bookingId) },
            success_url: `${origin}/bookings?session_id={CHECKOUT_SESSION_ID}&bookingId=${bookingId}`,
            cancel_url: `${origin}/hotels`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error('Stripe Checkout error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
