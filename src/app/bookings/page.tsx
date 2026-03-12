'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Users, DollarSign } from 'lucide-react';

export default function BookingsPage() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/bookings')
            .then(res => res.json())
            .then(data => {
                setBookings(data);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center text-xl">Loading your bookings...</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-4xl font-bold text-gray-900 mb-10">My Booking History</h1>

                {bookings.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl">You have no bookings yet.</div>
                ) : (
                    <div className="space-y-8">
                        {bookings.map(b => (
                            <div key={b.id} className="bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row gap-8">
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold">{b.hotel.name}</h2>
                                    <p className="flex items-center gap-2 text-gray-600"><MapPin size={18} /> {b.hotel.location}</p>

                                    <div className="mt-6 grid grid-cols-2 gap-6">
                                        <div>
                                            <p className="text-gray-500">Check-in</p>
                                            <p className="font-semibold">{new Date(b.startDate).toLocaleDateString('vi-VN')}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Check-out</p>
                                            <p className="font-semibold">{new Date(b.endDate).toLocaleDateString('vi-VN')}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Room</p>
                                            <p className="font-semibold">{b.roomType}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users size={20} /> <span>{b.numCats} cat{b.numCats > 1 ? 's' : ''}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="md:border-l pl-8 flex flex-col justify-between">
                                    <div>
                                        <p className="text-4xl font-bold text-green-700">{b.totalPrice.toLocaleString('vi-VN')} ₫</p>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Booked on {new Date(b.createdAt).toLocaleDateString('vi-VN')}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}