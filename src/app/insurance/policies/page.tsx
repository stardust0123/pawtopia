'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

type Policy = any;

export default function PoliciesPage() {
    const [policies, setPolicies] = useState<Policy[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [openClaimFor, setOpenClaimFor] = useState<number | null>(null);
    const [claimDesc, setClaimDesc] = useState('');
    const [claimAmount, setClaimAmount] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    const load = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/insurance/policies');
            const data = await res.json();
            setPolicies(data);
        } catch (err: any) {
            setError(err.message || 'Failed to load policies');
        }
        setLoading(false);
    };

    useEffect(() => { load(); }, []);

    const submitClaim = async (policyId: number) => {
        setSubmitting(true);
        setSuccessMsg(null);
        try {
            const res = await fetch('/api/insurance/claims', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ policyId, description: claimDesc, amount: claimAmount || undefined }),
            });
            if (!res.ok) throw new Error('Claim submission failed');
            const { claim } = await res.json();
            setSuccessMsg(`Claim submitted (#${claim.id}).`);
            setClaimDesc('');
            setClaimAmount('');
            setOpenClaimFor(null);
        } catch (err: any) {
            setError(err.message || 'Failed to submit claim');
        }
        setSubmitting(false);
    };

    if (loading) return <div className="p-12 text-center">Loading policies...</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-5xl mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">My Insurance Policies</h1>
                    <Link href="/insurance" className="text-purple-600 hover:underline">Browse Plans</Link>
                </div>

                {error && <div className="mb-4 text-red-600">{error}</div>}
                {successMsg && <div className="mb-4 text-green-700">{successMsg}</div>}

                <div className="space-y-6">
                    {policies.length === 0 && <div>No policies found.</div>}
                    {policies.map((p: Policy) => (
                        <div key={p.id} className="bg-white rounded-2xl shadow p-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="text-lg font-semibold">{p.plan.name} — <span className="text-sm text-gray-500">{p.plan.provider?.name}</span></div>
                                    <div className="text-sm text-gray-600">Cat: {p.catName} • Age: {p.catAge}</div>
                                    <div className="text-sm text-gray-600">Period: {new Date(p.startDate).toLocaleDateString()} → {new Date(p.endDate).toLocaleDateString()}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm">Status</div>
                                    <div className="font-bold">{p.status}</div>
                                </div>
                            </div>

                            <div className="mt-4 flex gap-3">
                                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg" onClick={() => setOpenClaimFor(openClaimFor === p.id ? null : p.id)}>
                                    {openClaimFor === p.id ? 'Cancel Claim' : 'Submit Claim'}
                                </button>
                                <Link href={`/insurance/${p.planId}`} className="px-4 py-2 rounded-lg border">View Plan</Link>
                            </div>

                            {openClaimFor === p.id && (
                                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                                    <label className="block text-sm font-medium">Claim Description</label>
                                    <textarea value={claimDesc} onChange={e => setClaimDesc(e.target.value)} rows={4} className="w-full p-3 mt-2 rounded-md border" />

                                    <label className="block text-sm font-medium mt-3">Amount (optional)</label>
                                    <input value={claimAmount} onChange={e => setClaimAmount(e.target.value)} className="w-1/3 p-3 mt-2 rounded-md border" />

                                    <div className="mt-4">
                                        <button disabled={submitting} onClick={() => submitClaim(p.id)} className="bg-green-600 text-white px-4 py-2 rounded-lg">
                                            {submitting ? 'Submitting...' : 'Submit Claim'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
