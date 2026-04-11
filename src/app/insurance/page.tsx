'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function InsurancePage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/insurance/plans')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPlans(data);
        } else {
          console.error('Unexpected plans response', data);
          setPlans([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load plans', err);
        setPlans([]);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-12 text-center">Loading insurance plans...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4">Cat Insurance</h1>
        <p className="text-center text-gray-600 mb-12">Protect your cat with the best insurance plans in Vietnam</p>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan: any) => (
            <div key={plan?.id} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
              <h2 className="text-2xl font-bold">{plan?.name}</h2>
              <p className="text-purple-600 text-sm">{plan?.provider?.name}</p>
              <p className="text-4xl font-bold mt-6">{plan?.monthlyPremium ? plan.monthlyPremium.toLocaleString('vi-VN') : 0} ₫<span className="text-sm font-normal">/month</span></p>
              <ul className="mt-8 space-y-3">
                {plan?.keyFeatures?.map((f: any, i: number) => (
                  <li key={i} className="flex items-center gap-2">✔ {f}</li>
                ))}
              </ul>
              <Link href={`/insurance/${plan?.id}`} className="block mt-10 text-center bg-purple-600 text-white py-4 rounded-xl font-bold hover:bg-purple-700">
                Get This Plan
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}