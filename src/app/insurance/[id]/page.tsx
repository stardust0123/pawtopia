'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function InsurancePurchasePage() {
    const params = useParams();
    const planId = Number(params.id);

    const [plan, setPlan] = useState<any>(null);
    const [formData, setFormData] = useState({
        catName: '',
        catBreed: '',
        catAge: '',
        medicalHistory: '',
    });
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [policyId, setPolicyId] = useState<number | null>(null);

    useEffect(() => {
        fetch(`/api/insurance/plans`)
            .then(res => res.json())
            .then(plans => {
                const found = plans.find((p: any) => p.id === planId);
                setPlan(found);
            });
    }, [planId]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch('/api/insurance/purchase', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                planId,
                catName: formData.catName,
                catBreed: formData.catBreed,
                catAge: Number(formData.catAge),
                medicalHistory: formData.medicalHistory,
                amount: plan.monthlyPremium * 12, // annual premium for simplicity
            }),
        });

        const { clientSecret: secret, paymentIntentId: pid } = await res.json();
        setClientSecret(secret);
        setPaymentIntentId(pid);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 pt-24">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-8">Purchase Insurance</h1>

                {!clientSecret ? (
                    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-10">
                        <h2 className="text-2xl font-semibold mb-6">{plan?.name} — {plan?.provider?.name}</h2>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Cat Name</label>
                                <input name="catName" value={formData.catName} onChange={handleChange} required className="w-full p-4 border rounded-2xl" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Breed</label>
                                <input name="catBreed" value={formData.catBreed} onChange={handleChange} required className="w-full p-4 border rounded-2xl" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Age (years)</label>
                                <input name="catAge" type="number" value={formData.catAge} onChange={handleChange} required className="w-full p-4 border rounded-2xl" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Medical History (optional)</label>
                                <textarea name="medicalHistory" value={formData.medicalHistory} onChange={handleChange} rows={3} className="w-full p-4 border rounded-2xl" />
                            </div>
                        </div>

                        <div className="mt-10 text-3xl font-bold text-green-700">
                            Annual Premium: {plan?.annualPremium?.toLocaleString('vi-VN')} ₫
                        </div>

                        <button type="submit" className="w-full mt-10 bg-purple-600 hover:bg-purple-700 text-white py-5 rounded-2xl text-xl font-bold">
                            Continue to Secure Payment
                        </button>
                    </form>
                ) : (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <CheckoutForm
                            clientSecret={clientSecret}
                            paymentIntentId={paymentIntentId!}
                            plan={plan}
                            formData={formData}
                            onSuccess={(id: number) => {
                                setPolicyId(id);
                                setSubmitted(true);
                            }}
                        />
                    </Elements>
                )}

                {submitted && (
                    <div className="text-center py-20">
                        <h1 className="text-4xl font-bold text-green-600">Policy Purchased Successfully!</h1>
                        <p className="text-2xl mt-6">Policy ID: #{policyId}</p>
                        <Link href="/insurance/policies" className="inline-block mt-10 bg-purple-600 text-white px-10 py-4 rounded-2xl text-lg font-bold">
                            View My Policies
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

// ── Stripe Checkout Component (reuse from hotel booking) ──
function CheckoutForm({ clientSecret, paymentIntentId, plan, formData, onSuccess }: any) {
    const stripe = useStripe();
    const elements = useElements();
    const [processing, setProcessing] = useState(false);

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setProcessing(true);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: { card: elements.getElement(CardElement)! },
        });

        if (error) {
            alert(error.message);
            setProcessing(false);
            return;
        }

        if (paymentIntent?.status === 'succeeded') {
            const res = await fetch('/api/insurance/policies', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    planId: plan.id,
                    catName: formData.catName,
                    catBreed: formData.catBreed,
                    catAge: formData.catAge,
                    medicalHistory: formData.medicalHistory,
                    startDate: new Date(),
                    endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                    stripePaymentIntentId: paymentIntentId,
                }),
            });

            const result = await res.json();
            onSuccess(result.policy.id);
        }
        setProcessing(false);
    };

    return (
        <form onSubmit={handlePayment} className="bg-white rounded-3xl shadow-xl p-10">
            <h3 className="text-2xl font-bold mb-6">Secure Payment</h3>
            <CardElement className="p-6 border-2 border-gray-300 rounded-2xl" />
            <button
                type="submit"
                disabled={processing || !stripe}
                className="w-full mt-10 py-5 bg-green-600 hover:bg-green-700 text-white text-xl font-bold rounded-2xl disabled:opacity-50"
            >
                {processing ? 'Processing...' : `Pay ${plan?.annualPremium?.toLocaleString('vi-VN')} ₫`}
            </button>
        </form>
    );
}