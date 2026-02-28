// pawtopia/src/app/hotels/[id]/book/page.tsx
'use client';

import React, { useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { mockHotels } from '@/data/mockHotels';

export default function BookHotelPage() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();

    const hotelId = Number(params.id);
    const hotel = mockHotels.find((h) => h.id === hotelId);

    if (!hotel) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-600">
                Hotel not found
            </div>
        );
    }

    // Pre-filled data from URL (passed from detail page)
    const startDate = searchParams.get('start') || '';
    const endDate = searchParams.get('end') || '';
    const roomType = searchParams.get('room') || hotel.rooms[0]?.type || '';
    const nights = searchParams.get('nights') ? Number(searchParams.get('nights')) : 0;
    const baseTotalPrice = searchParams.get('total') ? Number(searchParams.get('total')) : 0;

    const selectedRoom = hotel.rooms.find((r) => r.type === roomType) || hotel.rooms[0];

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        numCats: '1', // new field - default to 1 cat
        specialRequests: '',
        agreeToTerms: false,
    });

    const [submitted, setSubmitted] = useState(false);

    // Calculate final total based on number of cats
    const finalTotalPrice = baseTotalPrice * Number(formData.numCats);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type, checked } = e.target as any;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (
            !formData.fullName ||
            !formData.email ||
            !formData.phone ||
            !formData.numCats ||
            !formData.agreeToTerms
        ) {
            alert('Please fill in all required fields and agree to the terms.');
            return;
        }

        // Simulate booking success
        alert(
            `Booking confirmed!\n\n` +
            `Hotel: ${hotel.name}\n` +
            `Room: ${roomType}\n` +
            `Number of cats: ${formData.numCats}\n` +
            `Dates: ${startDate} → ${endDate} (${nights} night${nights !== 1 ? 's' : ''})\n` +
            `Total: ${finalTotalPrice.toLocaleString('vi-VN')} ₫\n` +
            `Guest: ${formData.fullName} (${formData.email}, ${formData.phone})\n\n` +
            `We will send a confirmation to your email shortly. Thank you!`
        );

        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
                <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-10 text-center">
                    <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                        <span className="text-5xl">✓</span>
                    </div>
                    <h1 className="text-3xl font-bold text-green-700 mb-4">Booking Confirmed!</h1>
                    <p className="text-gray-600 mb-8">
                        Thank you, {formData.fullName}! Your booking request for {formData.numCats} cat
                        {Number(formData.numCats) > 1 ? 's' : ''} has been received.
                        <br />
                        We will contact you shortly to confirm.
                    </p>
                    <div className="space-y-4">
                        <Link
                            href="/hotels"
                            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium"
                        >
                            Back to Hotels
                        </Link>
                        <Link
                            href={`/hotels/${hotel.id}`}
                            className="inline-block text-purple-600 hover:underline"
                        >
                            View Hotel Details Again
                        </Link>
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
                        {hotel.name} • {roomType} • {formData.numCats} cat{Number(formData.numCats) > 1 ? 's' : ''}
                    </p>
                </div>

                {/* Booking Summary Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-10">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Booking Summary</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <p className="text-gray-600 mb-1">Check-in → Check-out</p>
                            <p className="text-xl font-semibold">
                                {startDate} → {endDate}
                            </p>
                            <p className="text-gray-500 mt-1">
                                {nights} night{nights !== 1 ? 's' : ''} • {formData.numCats} cat
                                {Number(formData.numCats) > 1 ? 's' : ''}
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
                            <label className="block text-gray-700 font-medium mb-2">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="your.email@example.com"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="+84 123 456 789"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Number of Cats <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="numCats"
                                value={formData.numCats}
                                onChange={handleChange}
                                required
                                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                            >
                                <option value="1">1 cat</option>
                                <option value="2">2 cats</option>
                                <option value="3">3 cats</option>
                                <option value="4">4 cats</option>
                                <option value="5">5 cats</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-8">
                        <label className="block text-gray-700 font-medium mb-2">
                            Special Requests (optional)
                        </label>
                        <textarea
                            name="specialRequests"
                            value={formData.specialRequests}
                            onChange={handleChange}
                            rows={4}
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="e.g. late check-in, dietary needs, allergies, separate rooms for cats, etc."
                        />
                    </div>

                    <div className="mb-8 flex items-start gap-3">
                        <input
                            type="checkbox"
                            name="agreeToTerms"
                            id="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onChange={handleChange}
                            className="mt-1 h-5 w-5 text-purple-600 rounded border-gray-300"
                            required
                        />
                        <label htmlFor="agreeToTerms" className="text-gray-600">
                            I agree to the{' '}
                            <Link href="#" className="text-purple-600 hover:underline">
                                booking terms & cancellation policy
                            </Link>
                            .
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-bold text-lg transition-colors"
                    >
                        Confirm Booking
                    </button>
                </form>

                <div className="mt-8 text-center text-gray-500">
                    <Link href={`/hotels/${hotel.id}`} className="text-purple-600 hover:underline">
                        ← Back to Hotel Details
                    </Link>
                </div>
            </div>
        </div>
    );
}