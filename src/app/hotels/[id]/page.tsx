'use client';

import React, { use, useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic'; // Required for lazy-loading Leaflet
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    Music,
    Globe,
} from 'lucide-react';

// ────────────────────────────────────────────────
// Lazy-load Leaflet components (only on client side)
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

// Leaflet CSS – safe in client component
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icon paths (only in browser)
if (typeof window !== 'undefined') {
    const L = require('leaflet');
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
}

const renderStars = (rating: number) => (
    <div className="flex text-yellow-500">
        {[1, 2, 3, 4, 5].map((star) => (
            <span key={star}>{star <= rating ? '★' : '☆'}</span>
        ))}
    </div>
);

export default function HotelDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();

    // Unwrap params safely
    const resolvedParams = use(params);
    const hotelId = Number(resolvedParams.id);

    const [hotel, setHotel] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedDates, setSelectedDates] = useState({ start: '', end: '' });
    const [selectedRoom, setSelectedRoom] = useState<string>('');
    const [availabilityStatus, setAvailabilityStatus] = useState<string | null>(null);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [reviews, setReviews] = useState<any[]>([]);
    const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

    // Fetch hotel data
    useEffect(() => {
        if (isNaN(hotelId) || hotelId <= 0) {
            setError(`Invalid hotel ID: ${resolvedParams.id || 'missing'}`);
            setLoading(false);
            return;
        }

        async function fetchHotel() {
            try {
                setLoading(true);
                console.log(`Fetching hotel ID: ${hotelId}`);

                const res = await fetch(`/api/hotels/${hotelId}`);
                console.log('Response status:', res.status);

                if (!res.ok) {
                    const errorText = await res.text().catch(() => 'No response body');
                    console.error('API error response:', errorText);
                    throw new Error(`HTTP ${res.status} - ${errorText}`);
                }

                const data = await res.json();
                console.log('Fetched hotel data:', data);

                setHotel(data);
                setReviews([]); // Reviews still client-side/mock for now

                // Default to first room if available
                if (data.rooms?.length > 0) {
                    setSelectedRoom(data.rooms[0].type);
                }
            } catch (err: any) {
                console.error('Fetch failed:', err);
                setError(err.message || 'Failed to load hotel details');
            } finally {
                setLoading(false);
            }
        }

        fetchHotel();
    }, [hotelId]);

    // Calculate number of nights
    const calculateNights = (start: string, end: string): number => {
        if (!start || !end) return 0;
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffTime = endDate.getTime() - startDate.getTime();
        return Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 1);
    };

    // Check availability (client-side for now)
    const isPeriodAvailable = (roomType: string, start: string, end: string): boolean => {
        if (!start || !end || !hotel?.rooms) return false;
        const room = hotel.rooms.find((r: any) => r.type === roomType);
        if (!room) return false;

        const reqStart = new Date(start);
        const reqEnd = new Date(end);

        for (const booked of room.availability || []) {
            const bStart = new Date(booked.start);
            const bEnd = new Date(booked.end);
            if (reqStart < bEnd && reqEnd > bStart) return false;
        }
        return true;
    };

    // Update price & availability status
    useEffect(() => {
        if (!hotel || !selectedDates.start || !selectedDates.end) {
            setTotalPrice(0);
            setAvailabilityStatus(null);
            return;
        }

        const nights = calculateNights(selectedDates.start, selectedDates.end);
        const roomPrice = hotel.rooms?.find((r: any) => r.type === selectedRoom)?.price || 0;
        setTotalPrice(nights * roomPrice);

        const available = isPeriodAvailable(selectedRoom, selectedDates.start, selectedDates.end);
        setAvailabilityStatus(available ? 'Available' : 'Not Available');
    }, [selectedDates, selectedRoom, hotel]);

    const handleBook = () => {
        if (availabilityStatus !== 'Available') {
            alert('This period is not available. Please choose different dates.');
            return;
        }

        const query = new URLSearchParams({
            start: selectedDates.start,
            end: selectedDates.end,
            room: selectedRoom,
            nights: calculateNights(selectedDates.start, selectedDates.end).toString(),
            total: totalPrice.toString(),
        }).toString();

        router.push(`/hotels/${hotelId}/book?${query}`);
    };

    const handleAddReview = () => {
        setReviews([
            ...reviews,
            {
                user: 'You',
                rating: newReview.rating,
                comment: newReview.comment,
                date: new Date().toISOString().split('T')[0],
            },
        ]);
        setNewReview({ rating: 5, comment: '' });
    };

    // ────────────────────────────────────────────────
    // Render
    // ────────────────────────────────────────────────

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl font-medium">Loading hotel details...</p>
            </div>
        );
    }

    if (error || !hotel) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl text-red-600 font-medium">{error || 'Hotel not found'}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
                {/* Back to list */}
                <div className="mb-6">
                    <Link
                        href="/hotels"
                        className="inline-flex items-center text-lg font-medium text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        ← Back to all hotels
                    </Link>
                </div>

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">{hotel.name}</h1>
                    <p className="text-lg text-gray-600 mb-4">{hotel.location}</p>

                    <div className="flex flex-wrap justify-center gap-6">
                        <div className="bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-200">
                            <span className="font-medium">⭐ Google Rating:</span>{' '}
                            <span className="font-bold text-yellow-600">{hotel.googleRating} / 5</span>
                        </div>
                        <div className="bg-purple-50 px-5 py-2.5 rounded-full shadow-sm border border-purple-100">
                            <span className="font-medium">🐾 Pawtopia Rating:</span>{' '}
                            <span className="font-bold text-purple-700">{hotel.pawtopiaRating} / 5</span>
                        </div>
                    </div>
                </div>

                {/* Photo Gallery */}
                <div className="mb-12">
                    {hotel.photos?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                            {hotel.photos.map((photo: string, index: number) => (
                                <div
                                    key={index}
                                    className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                                >
                                    <Image
                                        src={photo}
                                        alt={`${hotel.name} - Photo ${index + 1}`}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        priority={index < 2}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-gray-100 rounded-xl">
                            <p className="text-xl text-gray-500">No photos available for this hotel</p>
                        </div>
                    )}
                </div>

                {/* Main content grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
                    {/* Left column */}
                    <div className="space-y-8">
                        {/* About */}
                        <section className="bg-white p-8 rounded-xl shadow-md">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">About {hotel.name}</h2>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                {hotel.description || 'No description available yet.'}
                            </p>
                        </section>

                        {/* Amenities (placeholder) */}
                        <section className="bg-white p-8 rounded-xl shadow-md">
                            <h2 className="text-2xl font-bold text-gray-900 mb-5">Amenities</h2>
                            <p className="text-gray-500 italic">Amenities list coming soon...</p>
                        </section>
                    </div>

                    {/* Right column */}
                    <div className="space-y-8">
                        {/* Map */}
                        <section className="bg-white p-8 rounded-xl shadow-md">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Location</h2>
                            <div className="h-[500px] rounded-lg overflow-hidden border border-gray-200 shadow-inner">
                                <MapContainer center={[10.7769, 106.7009]} zoom={15} className="h-full w-full">
                                    <TileLayer
                                        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={[10.7769, 106.7009]}>
                                        <Popup>
                                            <strong>{hotel.name}</strong><br />
                                            {hotel.location}
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                        </section>

                        {/* Contact */}
                        <section className="bg-white p-8 rounded-xl shadow-md">
                            <h2 className="text-2xl font-bold text-gray-900 mb-5">Contact Information</h2>
                            <p className="text-gray-500 italic">Contact details coming soon...</p>
                        </section>
                    </div>
                </div>

                {/* Booking Section */}
                <section className="bg-white p-8 rounded-xl shadow-md mt-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Book Your Stay</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Start Date</label>
                            <input
                                type="date"
                                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={selectedDates.start}
                                onChange={(e) => setSelectedDates({ ...selectedDates, start: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">End Date</label>
                            <input
                                type="date"
                                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={selectedDates.end}
                                onChange={(e) => setSelectedDates({ ...selectedDates, end: e.target.value })}
                                min={selectedDates.start}
                            />
                        </div>
                    </div>

                    <div className="mb-8">
                        <label className="block text-gray-700 font-semibold mb-2">Room Type</label>
                        <select
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={selectedRoom}
                            onChange={(e) => setSelectedRoom(e.target.value)}
                        >
                            <option value="">Select a room</option>
                            {/* Placeholder — update when rooms are in DB */}
                            <option value="Standard">Standard Room - 500,000 ₫ / night</option>
                            <option value="Luxury">Luxury Suite - 750,000 ₫ / night</option>
                        </select>
                    </div>

                    {availabilityStatus && (
                        <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-semibold text-lg">Availability:</span>
                                <span
                                    className={`text-lg font-bold ${availabilityStatus === 'Available' ? 'text-green-600' : 'text-red-600'
                                        }`}
                                >
                                    {availabilityStatus}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-lg">Total Price:</span>
                                <span className="text-2xl font-bold text-green-700">
                                    {totalPrice.toLocaleString('vi-VN')} ₫
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                                For {calculateNights(selectedDates.start, selectedDates.end)} night(s)
                            </p>
                        </div>
                    )}

                    <button
                        onClick={handleBook}
                        disabled={availabilityStatus !== 'Available'}
                        className={`w-full py-4 px-6 rounded-lg font-bold text-white text-lg transition-colors ${availabilityStatus === 'Available'
                                ? 'bg-purple-600 hover:bg-purple-700'
                                : 'bg-gray-400 cursor-not-allowed'
                            }`}
                    >
                        Book Now
                    </button>
                </section>

                {/* Reviews */}
                <section className="bg-white p-8 rounded-xl shadow-md mt-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">
                        Reviews ({reviews.length})
                    </h2>

                    {reviews.length > 0 ? (
                        <div className="space-y-6">
                            {reviews.map((review, index) => (
                                <div key={index} className="border-b pb-6 last:border-b-0">
                                    <div className="flex justify-between items-start mb-2">
                                        <strong className="text-lg text-gray-800">{review.user}</strong>
                                        <span className="text-sm text-gray-500">
                                            {new Date(review.date).toLocaleDateString('en-GB')}
                                        </span>
                                    </div>
                                    {renderStars(review.rating)}
                                    <p className="mt-3 text-gray-700">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to share your experience!</p>
                    )}

                    <div className="mt-10">
                        <h3 className="text-2xl font-semibold mb-4">Write a Review</h3>
                        <div className="space-y-4">
                            <select
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={newReview.rating}
                                onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                            >
                                {[5, 4, 3, 2, 1].map((r) => (
                                    <option key={r} value={r}>
                                        {r} Star{r > 1 ? 's' : ''}
                                    </option>
                                ))}
                            </select>

                            <textarea
                                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[120px]"
                                placeholder="Share your experience..."
                                value={newReview.comment}
                                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                            />

                            <button
                                onClick={handleAddReview}
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                            >
                                Submit Review
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}