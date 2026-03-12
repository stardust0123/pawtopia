'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function BookHotelPage() {
    const params = useParams();
    const searchParams = useSearchParams();

    const hotelId = Number(params.id);
    const hotelName = searchParams.get('hotelName') || 'Cat Hotel';
    const startDate = searchParams.get('start') || '';
    const endDate = searchParams.get('end') || '';
    const roomType = searchParams.get('room') || '';
    const nights = searchParams.get('nights') ? Number(searchParams.get('nights')) : 0;
    const baseTotalPrice = searchParams.get('total') ? Number(searchParams.get('total')) : 0;

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        numCats: '1',
        specialRequests: '',
        agreeToTerms: false,
    });

    const [toast, setToast] = useState<string | null>(null);   // ← NEW: Toast state
    const [submitted, setSubmitted] = useState(false);
    const [bookingId, setBookingId] = useState<number | null>(null);

    const finalTotalPrice = baseTotalPrice * Number(formData.numCats);

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    // Auto-hide toast after 4 seconds
    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 4000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const showToast = (message: string) => {
        setToast(message);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const name = formData.fullName.trim();
        const email = formData.email.trim();
        const phone = formData.phone.trim();

        // 1. Full Name validation
        if (name.length < 3) {
            showToast('Full name must be at least 3 characters long.');
            return;
        }

        // 2. Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast('Please enter a valid email address.');
            return;
        }

        // 3. Phone validation
        const phoneRegex = /^(\+84|0)[0-9]{9,10}$/;
        if (!phoneRegex.test(phone)) {
            showToast('Phone number must start with +84 or 0 and contain 9-10 digits.');
            return;
        }

        // 4. Terms & Conditions
        if (!formData.agreeToTerms) {
            showToast('You must agree to the booking terms and cancellation policy.');
            return;
        }

        // All good → submit
        const res = await fetch('/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                hotelId,
                roomType,
                startDate,
                endDate,
                numCats: formData.numCats,
                totalPrice: finalTotalPrice,
                fullName: name,
                email,
                phone,
                specialRequests: formData.specialRequests,
            }),
        });

        if (res.ok) {
            const result = await res.json();
            setBookingId(result.booking.id);
            setSubmitted(true);
        } else {
            showToast('Booking failed. Please try again later.');
        }
    };

    // Success screen
    if (submitted) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
                <div className="max-w-2xl bg-white rounded-2xl shadow-xl p-10 text-center">
                    <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">✓</div>
                    <h1 className="text-3xl font-bold text-green-700 mb-4">Booking Confirmed!</h1>
                    <p>Booking ID: <strong>#{bookingId}</strong><br />Thank you for booking at <strong>{hotelName}</strong></p>
                    <div className="mt-8 space-y-4">
                        <Link href="/bookings" className="block w-full bg-purple-600 text-white py-4 rounded-xl font-bold">View All My Bookings</Link>
                        <Link href="/hotels" className="text-purple-600 hover:underline">Browse More Hotels</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 pt-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-blue-950 mb-3">Confirm Your Booking</h1>
                    <p className="text-xl text-gray-600">
                        {hotelName} • {roomType} • {formData.numCats} cat{Number(formData.numCats) > 1 ? 's' : ''}
                    </p>
                </div>

                {/* Booking Summary Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-10">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Booking Summary</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <p className="text-gray-600 mb-1">Check-in → Check-out</p>
                            <p className="text-xl font-semibold">{startDate} → {endDate}</p>
                            <p className="text-gray-500 mt-1">
                                {nights} night{nights !== 1 ? 's' : ''} • {formData.numCats} cat{Number(formData.numCats) > 1 ? 's' : ''}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-gray-600 mb-1">Total Price</p>
                            <p className="text-3xl font-bold text-green-700">
                                {finalTotalPrice.toLocaleString('vi-VN')} ₫
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                (Base: {baseTotalPrice.toLocaleString('vi-VN')} ₫ × {formData.numCats} cats)
                            </p>
                        </div>
                    </div>
                </div>

                {/* Guest Information Form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Guest Information</h2>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Full Name <span className="text-red-500">*</span></label>
                            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required
                                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Enter your full name" />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Email Address <span className="text-red-500">*</span></label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required
                                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="your.email@example.com" />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Phone Number <span className="text-red-500">*</span></label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="+84 123 456 789" />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Number of Cats <span className="text-red-500">*</span></label>
                            <select name="numCats" value={formData.numCats} onChange={handleChange} required
                                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white">
                                <option value="1">1 cat</option>
                                <option value="2">2 cats</option>
                                <option value="3">3 cats</option>
                                <option value="4">4 cats</option>
                                <option value="5">5 cats</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-8">
                        <label className="block text-gray-700 font-medium mb-2">Special Requests (optional)</label>
                        <textarea name="specialRequests" value={formData.specialRequests} onChange={handleChange} rows={4}
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="e.g. late check-in, dietary needs..." />
                    </div>

                    <div className="mb-8 flex items-start gap-3">
                        <input type="checkbox" name="agreeToTerms" id="agreeToTerms" checked={formData.agreeToTerms}
                            onChange={handleChange} className="mt-1 h-5 w-5 text-purple-600 rounded border-gray-300" required />
                        <label htmlFor="agreeToTerms" className="text-gray-600">
                            I agree to the{' '}
                            <Link href="#" className="text-purple-600 hover:underline">booking terms & cancellation policy</Link>.
                        </label>
                    </div>

                    <button type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-bold text-lg transition-colors">
                        Confirm Booking
                    </button>
                </form>

                <div className="mt-8 text-center text-gray-500">
                    <Link href={`/hotels/${hotelId}`} className="text-purple-600 hover:underline">← Back to Hotel Details</Link>
                </div>
            </div>

            {/* FLOATING TOAST - appears at bottom of screen */}
            {toast && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-red-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-[9999] animate-fade-in">
                    <span className="text-xl">⚠️</span>
                    <span className="font-medium">{toast}</span>
                </div>
            )}
        </div>
    );
}