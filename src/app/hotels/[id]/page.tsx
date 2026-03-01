'use client';

import React, { use, useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    Music,
    Globe,
    Phone,
    Mail,
} from 'lucide-react';

// Lazy-load Leaflet (client-only)
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

// Leaflet CSS
import 'leaflet/dist/leaflet.css';

// Fix Leaflet icons (client-only)
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

    useEffect(() => {
        if (isNaN(hotelId) || hotelId <= 0) {
            setError(`Invalid hotel ID: ${resolvedParams.id || 'missing'}`);
            setLoading(false);
            return;
        }

        async function fetchHotel() {
            try {
                setLoading(true);
                const res = await fetch(`/api/hotels/${hotelId}`);
                if (!res.ok) {
                    const errorText = await res.text().catch(() => 'No response body');
                    throw new Error(`HTTP ${res.status} - ${errorText}`);
                }
                const data = await res.json();
                console.log('Fetched hotel data:', data);

                setHotel(data);
                setReviews(data.reviews || []);

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

    const calculateNights = (start: string, end: string): number => {
        if (!start || !end) return 0;
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffTime = endDate.getTime() - startDate.getTime();
        return Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 1);
    };

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
                {/* Back link */}
                <div className="mb-8">
                    <Link
                        href="/hotels"
                        className="inline-flex items-center text-lg font-medium text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        ← Back to all hotels
                    </Link>
                </div>

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">{hotel.name}</h1>
                    <p className="text-xl text-gray-600 mb-6">{hotel.location}</p>

                    <div className="flex flex-wrap justify-center gap-6">
                        <div className="bg-white px-6 py-3 rounded-full shadow-sm border border-gray-200">
                            <span className="font-medium">⭐ Google:</span>{' '}
                            <span className="font-bold text-yellow-600">{hotel.googleRating} / 5</span>
                        </div>
                        <div className="bg-purple-50 px-6 py-3 rounded-full shadow-sm border border-purple-100">
                            <span className="font-medium">🐾 Pawtopia:</span>{' '}
                            <span className="font-bold text-purple-700">{hotel.pawtopiaRating} / 5</span>
                        </div>
                    </div>
                </div>

                {/* Photo Gallery */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Hotel Gallery</h2>
                    {hotel.photos?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {hotel.photos.map((photoUrl: string, index: number) => (
                                photoUrl && typeof photoUrl === 'string' && photoUrl.trim() !== '' ? (
                                    <div
                                        key={index}
                                        className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                                    >
                                        <Image
                                            src={photoUrl}
                                            alt={`${hotel.name} - Image ${index + 1}`}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            priority={index < 2}
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = '/placeholder-hotel.jpg';
                                            }}
                                        />
                                    </div>
                                ) : null
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-200">
                            <p className="text-xl text-gray-600">No photos available for this hotel yet.</p>
                        </div>
                    )}
                </section>

                {/* Main content – equal height columns */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-12">
                    {/* Left column */}
                    <div className="flex flex-col h-full space-y-10">
                        <section className="bg-white p-8 rounded-2xl shadow-md flex-1">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">About {hotel.name}</h2>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                {hotel.description || 'No detailed description available at the moment.'}
                            </p>
                        </section>

                        <section className="bg-white p-8 rounded-2xl shadow-md flex-1">
                            <h2 className="text-2xl font-bold text-gray-900 mb-5">Amenities</h2>
                            {hotel.amenities?.length > 0 ? (
                                <ul className="grid grid-cols-2 gap-3 text-gray-700">
                                    {hotel.amenities.map((amenity: string, i: number) => (
                                        <li
                                            key={i}
                                            className="flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors"
                                        >
                                            <span className="text-purple-600 text-lg">✔</span>
                                            <span className="text-sm font-medium">{amenity}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500 italic">No amenities listed for this hotel yet.</p>
                            )}
                        </section>
                    </div>

                    {/* Right column */}
                    <div className="flex flex-col h-full space-y-10">
                        <section className="bg-white p-8 rounded-2xl shadow-md flex-1">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Location</h2>
                            <div className="h-[500px] rounded-2xl overflow-hidden border border-gray-200 shadow-inner">
                                <MapContainer center={[10.7769, 106.7009]} zoom={15} className="h-full w-full z-0">
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

                        <section className="bg-white p-8 rounded-2xl shadow-md flex-1">
                            <h2 className="text-2xl font-bold text-gray-900 mb-5">Contact Information</h2>
                            {hotel.contact ? (
                                <div className="space-y-4 text-gray-700">
                                    <p className="flex items-center gap-3">
                                        <Phone size={20} className="text-purple-600" />
                                        <span><strong>Phone:</strong> {hotel.contact.phone}</span>
                                    </p>
                                    <p className="flex items-center gap-3">
                                        <Mail size={20} className="text-purple-600" />
                                        <span><strong>Email:</strong> {hotel.contact.email}</span>
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4 text-gray-500">
                                    <p className="flex items-center gap-3">
                                        <Phone size={20} />
                                        <span><strong>Phone:</strong> +84 28 3822 1234</span>
                                    </p>
                                    <p className="flex items-center gap-3">
                                        <Mail size={20} />
                                        <span><strong>Email:</strong> info@cozycatinn.com</span>
                                    </p>
                                </div>
                            )}

                            {/* Social Media Links */}
                            <div className="mt-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow us on social media</h3>
                                <div className="flex flex-wrap gap-6">
                                    <a
                                        href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 transition-colors"
                                        aria-label="Facebook"
                                    >
                                        <Facebook size={28} />
                                    </a>
                                    <a
                                        href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sky-500 hover:text-sky-700 transition-colors"
                                        aria-label="Twitter/X"
                                    >
                                        <Twitter size={28} />
                                    </a>
                                    <a
                                        href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-pink-600 hover:text-pink-800 transition-colors"
                                        aria-label="Instagram"
                                    >
                                        <Instagram size={28} />
                                    </a>
                                    <a
                                        href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-red-600 hover:text-red-800 transition-colors"
                                        aria-label="YouTube"
                                    >
                                        <Youtube size={28} />
                                    </a>
                                    <a
                                        href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-black hover:text-gray-800 transition-colors"
                                        aria-label="TikTok"
                                    >
                                        <Music size={28} />
                                    </a>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Booking Section */}
                <section className="bg-white p-8 rounded-2xl shadow-md mt-12">
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
                            {hotel.rooms?.map((room: any) => (
                                <option key={room.id} value={room.type}>
                                    {room.type} - {room.price.toLocaleString('vi-VN')} ₫ / night
                                </option>
                            ))}
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
                        className={`w-full py-4 px-6 rounded-xl font-bold text-white text-lg transition-colors ${availabilityStatus === 'Available'
                            ? 'bg-purple-600 hover:bg-purple-700'
                            : 'bg-gray-400 cursor-not-allowed'
                            }`}
                    >
                        Book Now
                    </button>
                </section>

                {/* Reviews */}
                <section className="bg-white p-8 rounded-2xl shadow-md mt-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">
                        Reviews ({reviews.length})
                    </h2>

                    {reviews.length > 0 ? (
                        <div className="space-y-8">
                            {reviews.map((review, index) => (
                                <div key={index} className="border-b pb-6 last:border-b-0">
                                    <div className="flex justify-between items-start mb-3">
                                        <strong className="text-xl text-gray-800">{review.user}</strong>
                                        <span className="text-sm text-gray-500">
                                            {new Date(review.date).toLocaleDateString('en-GB')}
                                        </span>
                                    </div>
                                    {renderStars(review.rating)}
                                    <p className="mt-4 text-gray-700 leading-relaxed">
                                        {review.comment || 'No comment provided.'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-xl">
                            <p className="text-xl text-gray-600">No reviews yet. Be the first to share your experience!</p>
                        </div>
                    )}

                    {/* Add Review Form */}
                    <div className="mt-12">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Write a Review</h3>
                        <div className="space-y-6">
                            <select
                                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[140px]"
                                placeholder="Share your experience with other cat owners..."
                                value={newReview.comment}
                                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                            />

                            <button
                                onClick={handleAddReview}
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-bold text-lg transition-colors"
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