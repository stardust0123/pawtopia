// pawtopia/src/app/hotels/[id]/page.tsx
'use client';

import React, { use, useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import Link from 'next/link';
import { useRouter } from 'next/navigation';  // ← add this line
import {
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    Music,
    Globe,
} from 'lucide-react';
import { mockHotels } from '@/data/mockHotels';  // @ = src/

/* =========================
   Fix Leaflet marker icons
========================= */
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl:
        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl:
        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const renderStars = (rating: number) => {
    return (
        <div className="flex text-yellow-500">
            {[1, 2, 3, 4, 5].map((star) => (
                <span key={star}>
                    {star <= rating ? '★' : '☆'}
                </span>
            ))}
        </div>
    );
};

/* =========================
   Page Component
========================= */
export default function HotelDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const resolvedParams = use(params);
    const hotelId = Number(resolvedParams.id);
    const hotel = mockHotels.find((h) => h.id === hotelId);
    const router = useRouter();  // ← add this line
    if (!hotel) {
        notFound();
    }
    const [selectedDates, setSelectedDates] = useState({
        start: '',
        end: '',
    });
    const [selectedRoom, setSelectedRoom] = useState(hotel.rooms[0].type);
    const [availabilityStatus, setAvailabilityStatus] = useState<string | null>(null);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [reviews, setReviews] = useState(hotel.reviews);
    const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

    // New function to calculate number of nights
    const calculateNights = (start: string, end: string): number => {
        if (!start || !end) return 0;
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffTime = endDate.getTime() - startDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return Math.max(diffDays, 1);  // At least 1 day even if same date
    };

    // New function to check if period is available (no overlap with booked periods)
    const isPeriodAvailable = (roomType: string, start: string, end: string): boolean => {
        if (!start || !end) return false;
        const selectedRoomData = hotel.rooms.find(r => r.type === roomType);
        if (!selectedRoomData) return false;

        const requestedStart = new Date(start);
        const requestedEnd = new Date(end);

        for (const booked of selectedRoomData.availability) {
            const bookedStart = new Date(booked.start);
            const bookedEnd = new Date(booked.end);

            // Check for overlap
            if (requestedStart < bookedEnd && requestedEnd > bookedStart) {
                return false;
            }
        }
        return true;
    };

    // Update availability and price when dates or room change
    React.useEffect(() => {
        if (selectedDates.start && selectedDates.end) {
            const nights = calculateNights(selectedDates.start, selectedDates.end);
            const roomPrice = hotel.rooms.find(r => r.type === selectedRoom)?.price || 0;
            setTotalPrice(nights * roomPrice);

            const available = isPeriodAvailable(selectedRoom, selectedDates.start, selectedDates.end);
            setAvailabilityStatus(available ? 'Available' : 'Not Available');
        } else {
            setAvailabilityStatus(null);
            setTotalPrice(0);
        }
    }, [selectedDates, selectedRoom]);

    const handleBook = () => {
        if (availabilityStatus === 'Available') {
            alert(
                `Booked ${selectedRoom} from ${selectedDates.start} to ${selectedDates.end} for ${totalPrice.toLocaleString()} ₫`
            );
        } else {
            alert('This period is not available. Please choose different dates.');
        }
    };

    const handleAddReview = () => {
        setReviews([
            ...reviews,
            { user: 'You', rating: newReview.rating, comment: newReview.comment },
        ]);
        setNewReview({ rating: 5, comment: '' });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 pt-20">
                {/* Back to hotels */}
                <div className="mb-6">
                    <Link
                        href="/hotels"
                        className="inline-flex items-center text-base font-medium text-blue-400 hover:text-blue-500"
                    >
                        <span className="mr-2 text-lg">←</span>
                        See all hotels
                    </Link>
                </div>
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold mb-2">
                        {hotel.name}
                    </h1>
                    <p className="text-lg italic mb-3">
                        {hotel.location}
                    </p>
                    {/* Ratings */}
                    <div className="flex justify-center gap-6 text-sm md:text-base">
                        <div className="bg-white px-4 py-2 rounded-full shadow">
                            ⭐ Google Rating:{' '}
                            <span className="font-semibold">
                                {hotel.googleRating} / 5
                            </span>
                        </div>
                        <div className="bg-purple-100 px-4 py-2 rounded-full shadow">
                            🐾 Pawtopia Rating:{' '}
                            <span className="font-semibold text-purple-800">
                                {hotel.pawtopiaRating} / 5
                            </span>
                        </div>
                    </div>
                </div>
                {/* Photos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {hotel.photos.map((photo, index) => (
                        <div key={index} className="relative h-64">
                            <Image
                                src={photo}
                                alt={`${hotel.name} photo ${index + 1}`}
                                fill
                                className="object-cover rounded-lg"
                            />
                        </div>
                    ))}
                </div>
                {/* About + Amenities (left column) | Location + Contact (right column) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Left column: About + Amenities stacked vertically */}
                    <div className="flex flex-col gap-8 min-h-[680px]">
                        {/* About section */}
                        <div className="bg-white p-8 rounded-xl shadow-md flex-grow">
                            <h2 className="text-3xl font-extrabold text-blue-950 mb-6">
                                About {hotel.name}
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                {hotel.description}
                            </p>
                        </div>
                        {/* Amenities section */}
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h2 className="text-2xl font-bold mb-4">Amenities</h2>
                            <ul className="space-y-2 text-gray-700 text-base">
                                {hotel.amenities.map((amenity, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="text-purple-600 text-2xl leading-none">•</span>
                                        <span>{amenity}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {/* Right column: Location (map) + Contact stacked vertically */}
                    <div className="flex flex-col gap-8 min-h-[680px]">
                        {/* Location / Map */}
                        <div className="bg-white p-8 rounded-xl shadow-md flex-grow">
                            <h2 className="text-3xl font-extrabold text-blue-950 mb-6">Location</h2>
                            <div className="h-[500px] rounded-lg overflow-hidden border border-gray-200 shadow-inner relative z-0">
                                <MapContainer
                                    center={[hotel.coordinates.lat, hotel.coordinates.lng]}
                                    zoom={15}
                                    scrollWheelZoom={false}
                                    className="h-full w-full"
                                >
                                    <TileLayer
                                        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={[hotel.coordinates.lat, hotel.coordinates.lng]}>
                                        <Popup>
                                            <strong>{hotel.name}</strong><br />
                                            {hotel.location}
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                        </div>
                        {/* Contact section – added below map, same column */}
                        {/* Contact section – added below map, same column */}
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                            <div className="space-y-3 text-base text-gray-700">
                                <div className="flex items-center gap-3">
                                    <span className="text-purple-600">
                                        <Globe size={20} />
                                    </span>
                                    <span>{hotel.location}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-purple-600">
                                        📞
                                    </span>
                                    <span>{hotel.contact.phone}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-purple-600">
                                        ✉️
                                    </span>
                                    <span>{hotel.contact.email}</span>
                                </div>
                                {/* Hotel website */}
                                <div className="flex items-center gap-3">
                                    <span className="text-purple-600">
                                        <Globe size={20} />
                                    </span>
                                    <a
                                        href="https://www.example-hotel-website.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        www.example-hotel-website.com
                                    </a>
                                </div>
                                {/* Social media links */}
                                <div className="pt-6 border-t border-gray-200">
                                    <h3 className="text-lg font-semibold mb-4">Follow us</h3>
                                    <div className="flex gap-6 items-center">
                                        <a
                                            href="https://www.facebook.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800"
                                            aria-label="Facebook"
                                        >
                                            <Facebook size={28} />
                                        </a>
                                        <a
                                            href="https://www.x.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sky-500 hover:text-sky-700"
                                            aria-label="Twitter / X"
                                        >
                                            <Twitter size={28} />
                                        </a>
                                        <a
                                            href="https://www.instagram.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-pink-600 hover:text-pink-800"
                                            aria-label="Instagram"
                                        >
                                            <Instagram size={28} />
                                        </a>
                                        <a
                                            href="https://www.tiktok.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-800 hover:text-black"
                                            aria-label="TikTok"
                                        >
                                            <Music size={28} />
                                        </a>
                                        <a
                                            href="https://www.youtube.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-red-600 hover:text-red-800"
                                            aria-label="YouTube"
                                        >
                                            <Youtube size={28} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Booking */}
                <div className="bg-white p-8 rounded-xl shadow-md mb-12">
                    <h2 className="text-3xl font-extrabold text-blue-950 mb-8 text-center">
                        Book Your Stay
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* Start Date */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Start Date</label>
                            <input
                                type="date"
                                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={selectedDates.start}
                                onChange={(e) =>
                                    setSelectedDates({
                                        ...selectedDates,
                                        start: e.target.value,
                                    })
                                }
                            />
                        </div>
                        {/* End Date */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">End Date</label>
                            <input
                                type="date"
                                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={selectedDates.end}
                                onChange={(e) =>
                                    setSelectedDates({
                                        ...selectedDates,
                                        end: e.target.value,
                                    })
                                }
                                min={selectedDates.start}  // Prevent end < start
                            />
                        </div>
                    </div>
                    {/* Room Type */}
                    <div className="mb-8">
                        <label className="block text-gray-700 font-semibold mb-2">Room Type</label>
                        <select
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={selectedRoom}
                            onChange={(e) => setSelectedRoom(e.target.value)}
                        >
                            {hotel.rooms.map((room) => (
                                <option key={room.type} value={room.type}>
                                    {room.type} — {room.price.toLocaleString()} ₫ / night
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Availability Status + Total Price */}
                    {availabilityStatus && (
                        <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold text-lg">Availability:</span>
                                <span className={`font-bold text-lg ${availabilityStatus === 'Available' ? 'text-green-600' : 'text-red-600'}`}>
                                    {availabilityStatus}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-lg">Total Price:</span>
                                <span className="font-bold text-xl text-green-700">
                                    {totalPrice.toLocaleString()} ₫
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                                For {calculateNights(selectedDates.start, selectedDates.end)} night(s)
                            </p>
                        </div>
                    )}
                    {/* Book Button */}
                    <button
                        onClick={() => {
                            if (availabilityStatus !== 'Available') {
                                alert('This period is not available. Please choose different dates.');
                                return;
                            }

                            // Build URL with query params
                            const query = new URLSearchParams({
                                start: selectedDates.start,
                                end: selectedDates.end,
                                room: selectedRoom,
                                nights: calculateNights(selectedDates.start, selectedDates.end).toString(),
                                total: totalPrice.toString(),
                            }).toString();

                            router.push(`/hotels/${hotel.id}/book?${query}`);
                        }}
                        disabled={availabilityStatus !== 'Available'}
                        className={`w-full py-4 rounded-lg font-semibold text-white transition-colors ${availabilityStatus === 'Available'
                            ? 'bg-purple-500 hover:bg-purple-600'
                            : 'bg-gray-400 cursor-not-allowed'
                            }`}
                    >
                        Book Now
                    </button>
                </div>
                {/* Reviews */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-2xl font-bold mb-6">
                        Reviews ({reviews.length})
                    </h2>
                    <div className="space-y-6">
                        {reviews.map((review, index) => (
                            <div key={index} className="border-b pb-4">
                                <div className="flex justify-between items-center mb-1">
                                    <strong className="text-gray-800">
                                        {review.user}
                                    </strong>
                                    <span className="text-sm text-gray-500">
                                        {new Date(review.date).toLocaleDateString('en-GB')}
                                    </span>
                                </div>
                                {renderStars(review.rating)}
                                <p className="mt-2 text-gray-700">
                                    {review.comment}
                                </p>
                            </div>
                        ))}
                    </div>
                    {/* Add Review */}
                    <div className="mt-8">
                        <h3 className="font-semibold mb-2">Write a review</h3>
                        <select
                            className="border p-2 w-full mb-3"
                            value={newReview.rating}
                            onChange={(e) =>
                                setNewReview({
                                    ...newReview,
                                    rating: Number(e.target.value),
                                })
                            }
                        >
                            {[5, 4, 3, 2, 1].map((r) => (
                                <option key={r} value={r}>
                                    {r} Star{r > 1 ? 's' : ''}
                                </option>
                            ))}
                        </select>
                        <textarea
                            className="border p-2 w-full mb-3"
                            placeholder="Share your experience..."
                            value={newReview.comment}
                            onChange={(e) =>
                                setNewReview({
                                    ...newReview,
                                    comment: e.target.value,
                                })
                            }
                        />
                        <button
                            onClick={() => {
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
                            }}
                            className="bg-purple-500 text-white w-full py-3 rounded"
                        >
                            Submit Review
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
