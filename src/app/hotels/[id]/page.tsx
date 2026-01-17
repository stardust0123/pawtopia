// pawtopia/src/app/hotels/[id]/page.tsx
'use client';

import React, { use, useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import Link from 'next/link';
import {
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    Music,
    Globe,
} from 'lucide-react';

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

/* =========================
   Mock Hotel Data
========================= */
const mockHotels = [
    {
        id: 1,
        name: 'Cozy Cat Inn',
        location: '270 Le Thanh Ton, Ben Thanh Ward, District 1, Ho Chi Minh City',
        coordinates: { lat: 10.7723, lng: 106.6980 },
        description:
            'Cozy Cat Inn is a premium cat hotel located right in the bustling heart of District 1, offering a perfect blend of luxury and comfort for your feline companions. The rooms are spacious, fully climate-controlled, and equipped with premium scratching posts, soft cozy beds, and interactive toys to keep cats entertained throughout their stay. Daily playtime sessions are supervised by trained staff who prioritize each cat’s individual personality and energy level. The hotel features 24/7 CCTV monitoring so owners can check in remotely via a secure app at any time. Additional services include personalized meal plans tailored to dietary needs, gentle grooming sessions, and regular health checks to ensure every guest leaves happy and healthy.',
        googleRating: 4.5,
        pawtopiaRating: 4.8,
        availability: true,
        price: 500000,
        photos: [
            'https://static.wixstatic.com/media/790b5b_4e5608faa85c4e908ab71bde5536457d~mv2.jpg/v1/crop/x_0,y_344,w_1533,h_1192/fill/w_320,h_237,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/385525616_1309024529739282_6749097801703949542_n.jpg',
            'https://media.istockphoto.com/id/2200233164/photo/sphynx-and-european-shorthair-cats-gaze-through-glass-doors-in-pet-hotel-observing-other.jpg?s=612x612&w=0&k=20&c=XWsRQLeYHx9cZ-Vp6hU6oPu6a2qdmJCXnvDqUE7QhHk=',
            'https://cdn.sortiraparis.com/images/80/96038/696814-le-moustache-pension-un-hotel-pour-chats-douillet-qui-accueille-vos-compagnons-a-paris.jpg',
            'https://static.vecteezy.com/system/resources/thumbnails/073/286/463/small/modern-cat-room-interior-with-pet-furniture-and-scratching-post-photo.jpg',
        ],
        amenities: [
            '24/7 CCTV Monitoring',
            'Daily Playtime Sessions',
            'Climate-Controlled Rooms',
            'Personalized Grooming',
            'Custom Meal Plans',
        ],
        contact: {
            phone: '+84 28 3822 1234',
            email: 'info@cozycatinn.com',
        },
        rooms: [
            {
                type: 'Standard Room',
                price: 500000,
                description: 'Cozy room with basic amenities for one cat.',
                availability: [
                    { start: '2026-01-20', end: '2026-01-22' },
                    { start: '2026-02-05', end: '2026-02-10' },
                    { start: '2026-02-15', end: '2026-02-18' },
                ],
            },
            {
                type: 'Luxury Suite',
                price: 750000,
                description: 'Spacious suite with extra play area and window view.',
                availability: [
                    { start: '2026-01-10', end: '2026-01-15' },
                    { start: '2026-03-01', end: '2026-03-05' },
                ],
            },
        ],
        reviews: [
            { user: 'Jane T.', rating: 5, comment: 'Absolutely amazing service. My cat came back calm and happy.', date: '2024-11-12' },
            { user: 'Minh Nguyen', rating: 4, comment: 'Clean rooms and friendly staff. Slightly expensive.', date: '2024-10-28' },
            { user: 'Sarah L.', rating: 5, comment: 'Loved the daily photo updates. Highly recommended.', date: '2024-10-05' },
            { user: 'Hoang Tran', rating: 4, comment: 'Good location and professional care.', date: '2024-09-18' },
            { user: 'Alex P.', rating: 5, comment: 'Best cat hotel I have used so far.', date: '2024-08-30' },
            { user: 'Linh Pham', rating: 4, comment: 'My cat adapted very quickly. Will book again.', date: '2024-08-12' },
        ],
    },
    {
        id: 2,
        name: 'Purrfect Stay Hotel',
        location: '85 Nguyen Thi Thap, Tan Hung Ward, District 7, Ho Chi Minh City',
        coordinates: { lat: 10.7376, lng: 106.7219 },
        description:
            'Purrfect Stay Hotel provides a warm and budget-friendly home-away-from-home for cats in the modern District 7 area. The accommodations feature clean, well-ventilated enclosures with comfortable bedding and fresh water always available. Meals are served twice daily using high-quality cat food, with special dietary options available upon request. The hotel’s convenient location near Phu My Hung makes it easy for owners to drop off and pick up their pets using public transport or car. Friendly and experienced staff offer gentle care and daily interaction to help reduce separation anxiety, making sure every cat feels safe and loved during their stay.',
        googleRating: 4.2,
        pawtopiaRating: 4.5,
        availability: false,
        price: 350000,
        photos: [
            'https://images.squarespace-cdn.com/content/v1/651b1ae5fa3ff4418caec5aa/1696277311141-C53PARPITRK7QK7PE5FL/Cat+Boarding',
            'https://c8.alamy.com/comp/2PJ8R19/cats-room-interior-in-blue-wall-with-cat-house-and-cat-condo-room-designed-for-cat-3d-rendering-2PJ8R19.jpg',
            'https://images.unsplash.com/photo-1621976360623-0042236b4a5e?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1601758177266-bc599de87707?auto=format&fit=crop&q=80',
        ],
        amenities: [
            'Clean & Ventilated Rooms',
            'Fresh Meals Twice Daily',
            'Easy Access Location',
            'Budget-Friendly Pricing',
            'Gentle Staff Interaction',
        ],
        contact: {
            phone: '+84 28 5412 3456',
            email: 'book@purrfectstay.com',
        },
        rooms: [
            {
                type: 'Economy Room',
                price: 350000,
                description: 'Affordable room with essential care.',
                availability: [
                    { start: '2026-01-01', end: '2026-01-03' },
                    { start: '2026-02-10', end: '2026-02-15' },
                ],
            },
            {
                type: 'Deluxe Room',
                price: 500000,
                description: 'Upgraded with more space and toys.',
                availability: [], // fully available for testing
            },
        ],
        reviews: [
            { user: 'Budget Cat Owner', rating: 4, comment: 'Great value for money.' },
        ],
    },
    {
        id: 3,
        name: 'Whiskers Resort',
        location: '83 Truong Dinh, Ward 6, District 3, Ho Chi Minh City',
        coordinates: { lat: 10.7840, lng: 106.6833 },
        description:
            'Whiskers Resort is specially designed for energetic and playful cats who love to explore and climb. The resort features large open play areas complete with tunnels, multi-level climbing trees, interactive toys, and safe jumping platforms. Experienced handlers provide personalized attention and structured play sessions multiple times a day to keep cats physically and mentally stimulated. The peaceful location away from main roads ensures a calm environment when cats need rest. Owners receive daily photo and video updates, along with detailed reports on their cat’s activities, appetite, and behavior throughout the stay.',
        googleRating: 4.7,
        pawtopiaRating: 4.9,
        availability: true,
        price: 600000,
        photos: [
            'https://alcalacountrypetresort.com/wp-content/uploads/2022/07/Cat-Boarding-Gallery-2-1.jpg',
            'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&q=80',
        ],
        amenities: [
            'Large Play Zones',
            'Multi-Level Climbing Trees',
            'Interactive Toys',
            'Daily Supervised Play',
            'Photo/Video Updates',
        ],
        contact: {
            phone: '+84 28 3930 5678',
            email: 'play@whiskersresort.vn',
        },
        rooms: [
            {
                type: 'Playful Suite',
                price: 600000,
                description: 'Extra large play zone with tunnels and trees.',
                availability: [
                    { start: '2026-02-01', end: '2026-02-05' },
                    { start: '2026-03-10', end: '2026-03-15' },
                ],
            },
            {
                type: 'Standard Play Room',
                price: 480000,
                description: 'Cozy room with basic climbing equipment.',
                availability: [
                    { start: '2026-01-25', end: '2026-01-28' },
                ],
            },
        ],
        reviews: [
            { user: 'Active Cat Parent', rating: 5, comment: 'My cat had the best time ever!' },
            { user: 'Minh', rating: 4.5, comment: 'Very clean and fun environment.' },
        ],
    },
    {
        id: 4,
        name: 'Feline Paradise',
        location: '174 Kim Ma Street, Ba Dinh District, Hanoi',
        coordinates: { lat: 21.0336, lng: 105.8145 },
        description:
            'Feline Paradise is a high-end cat boarding facility situated in central Hanoi, ideal for owners seeking premium care in a tranquil setting. Each private suite comes with large windows for natural daylight, soft orthopedic bedding, and personal perches for lounging. The experienced team provides daily grooming, nail trimming, and brushing to keep cats looking and feeling their best. Medication can be administered precisely according to veterinary instructions if needed. Owners receive regular photo and short video updates, giving peace of mind while they are away.',
        googleRating: 4.6,
        pawtopiaRating: 4.7,
        availability: true,
        price: 450000,
        photos: [
            'https://d36ib8eituxnj4.cloudfront.net/cottage-1.jpg',
            'https://images.unsplash.com/photo-1606213479814-4e3d8c1c6c8d?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1592194996308-7b43878e19c9?auto=format&fit=crop&q=80',
        ],
        amenities: [
            'Private Suites',
            'Natural Daylight',
            'Daily Grooming',
            'Medication Administration',
            'Regular Photo Updates',
        ],
        contact: {
            phone: '+84 24 3724 5678',
            email: 'stay@felineparadise.vn',
        },
        rooms: [
            {
                type: 'Deluxe Suite',
                price: 450000,
                description: 'Premium suite with window view and soft bedding.',
            },
            {
                type: 'Premium Suite',
                price: 650000,
                description: 'Larger space with extra grooming area.',
            },
        ],
        reviews: [
            {
                user: 'Hanoi Cat Mom',
                rating: 5,
                comment: 'My cat felt so relaxed here!',
            },
            {
                user: 'Lan',
                rating: 4.8,
                comment: 'Professional and caring staff.',
            },
        ],
    },
    {
        id: 5,
        name: 'Cat Haven Hanoi',
        location: '32 Ly Thai To Street, Ly Thai To Ward, Hoan Kiem District, Hanoi',
        coordinates: { lat: 21.0286, lng: 105.8533 },
        description:
            'Cat Haven Hanoi is a peaceful and secure retreat specially tailored for shy, senior, or easily stressed cats. The rooms are designed to be quiet with soft lighting, soundproofing, and plenty of hiding spots for comfort. Staff are trained in gentle handling techniques and provide calm, low-pressure interaction throughout the day. The location near scenic Hoan Kiem Lake offers a serene atmosphere away from traffic noise. Optional add-on services include therapeutic brushing, calming pheromone diffusers, and customized slow-feed meals to support digestive health.',
        googleRating: 4.1,
        pawtopiaRating: 4.3,
        availability: false,
        price: 300000,
        photos: [
            'https://i0.wp.com/www.petboardinganddaycare.com/wp-content/uploads/2022/05/pg29.jpg?ssl=1',
            'https://images.unsplash.com/photo-1592194996308-7b43878e19c9?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1606213479814-4e3d8c1c6c8d?auto=format&fit=crop&q=80',
        ],
        amenities: [
            'Quiet & Soundproof Rooms',
            'Gentle Handling',
            'Hiding Spots',
            'Calming Environment',
            'Senior Cat Care',
        ],
        contact: {
            phone: '+84 24 3825 4321',
            email: 'hello@cathavenhanoi.com',
        },
        rooms: [
            {
                type: 'Quiet Retreat Room',
                price: 300000,
                description: 'Peaceful space for calm or senior cats.',
            },
        ],
        reviews: [
            {
                user: 'Senior Cat Owner',
                rating: 4,
                comment: 'Perfect for my older cat.',
            },
            {
                user: 'Trang',
                rating: 4.2,
                comment: 'Very attentive and gentle staff.',
            },
        ],
    },
    {
        id: 6,
        name: 'Paw Palace',
        location: '78 To Ngoc Van, Tay Ho Ward, Tay Ho District, Hanoi',
        coordinates: { lat: 21.0707, lng: 105.8259 },
        description:
            'Paw Palace offers an upscale cat boarding experience with breathtaking views of West Lake, perfect for cats who enjoy scenic surroundings. Spacious suites feature elevated perches, luxurious bedding, and plenty of enrichment toys to stimulate natural curiosity. Concierge-level service includes daily fresh meals prepared to order, interactive play sessions, and grooming on request. Owners receive personalized daily reports with photos and videos sent directly to their phone. The palace-style design and attentive staff create a truly regal stay for every feline guest.',
        googleRating: 4.8,
        pawtopiaRating: 4.9,
        availability: true,
        price: 700000,
        photos: [
            'https://i0.wp.com/www.petboardinganddaycare.com/wp-content/uploads/2022/05/pg28-2.jpg?ssl=1',
            'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1592194996308-7b43878e19c9?auto=format&fit=crop&q=80',
        ],
        amenities: [
            'West Lake Views',
            'Luxury Suites',
            'Elevated Perches',
            'Concierge Service',
            'Daily Photo Reports',
        ],
        contact: {
            phone: '+84 24 3718 9999',
            email: 'royal@pawpalace.vn',
        },
        rooms: [
            {
                type: 'Royal Suite',
                price: 700000,
                description: 'Premium suite with lake view and luxury amenities.',
            },
            {
                type: 'Elite Suite',
                price: 900000,
                description: 'Largest space with private balcony area.',
            },
        ],
        reviews: [
            {
                user: 'Lake View Cat Lover',
                rating: 5,
                comment: 'My cat enjoyed the view so much!',
            },
            {
                user: 'Hoang',
                rating: 4.9,
                comment: 'Feels like a five-star hotel for cats.',
            },
        ],
    },
    {
        id: 7,
        name: 'Beachside Cat Retreat',
        location: '200 To Hien Thanh Street, Phuoc My Ward, Son Tra District, Da Nang',
        coordinates: { lat: 16.0614, lng: 108.2413 },
        description:
            'Beachside Cat Retreat offers a refreshing seaside escape for cats just minutes from the famous My Khe Beach. Bright, airy rooms feature natural sea breezes, large windows, and comfortable lounging areas for ultimate relaxation. Cats can enjoy supervised outdoor time in a secure, shaded garden where they can watch birds and feel the ocean air. Professional staff provide daily photo updates, gentle play, and fresh meals to keep every guest happy and healthy. This tranquil retreat is ideal for cats who love nature and a calm coastal atmosphere.',
        googleRating: 4.4,
        pawtopiaRating: 4.6,
        availability: true,
        price: 400000,
        photos: [
            'https://nekoya.co/wp-content/uploads/2025/10/MM-1024x666.png',
            'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1606213479814-4e3d8c1c6c8d?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1592194996308-7b43878e19c9?auto=format&fit=crop&q=80',
        ],
        amenities: [
            'Sea Breeze Rooms',
            'Secure Garden Access',
            'Bright & Airy Design',
            'Supervised Outdoor Time',
            'Daily Photo Updates',
        ],
        contact: {
            phone: '+84 236 395 6789',
            email: 'beach@catretreatdanang.vn',
        },
        rooms: [
            {
                type: 'Ocean View Room',
                price: 400000,
                description: 'Bright room with sea breeze and garden access.',
            },
            {
                type: 'Beach Suite',
                price: 580000,
                description: 'Spacious suite with extra lounging space.',
            },
        ],
        reviews: [
            {
                user: 'Coastal Cat Parent',
                rating: 4.8,
                comment: 'The sea air was perfect for my cat!',
            },
            {
                user: 'Ngoc',
                rating: 4.5,
                comment: 'Very relaxing place near the beach.',
            },
        ],
    },
    {
        id: 8,
        name: 'Da Nang Kitty Lodge',
        location: '174 Bach Dang Street, Hai Chau District, Da Nang',
        coordinates: { lat: 16.0739, lng: 108.2230 },
        description:
            'Da Nang Kitty Lodge is a modern, well-equipped cat hotel situated along the scenic Han River, offering easy access to the city center and major attractions. Rooms are clean, well-ventilated, and fitted with automatic feeders, comfortable beds, and plenty of vertical space for climbing. Attentive staff provide daily cleaning, interactive play, and fresh water refills to keep cats happy and healthy. The lodge is perfect for cats who enjoy watching river views from their windows. Owners appreciate the convenient location and regular updates during their cat’s stay.',
        googleRating: 4.3,
        pawtopiaRating: 4.4,
        availability: false,
        price: 320000,
        photos: [
            'https://pix10.agoda.net/hotelImages/412145/-1/80ceda91103de739085700f76efc85b3.jpg?ce=0&s=414x232',
            'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1592194996308-7b43878e19c9?auto=format&fit=crop&q=80',
        ],
        amenities: [
            'River View Rooms',
            'Automatic Feeders',
            'Daily Cleaning',
            'Interactive Play',
            'Central Location',
        ],
        contact: {
            phone: '+84 236 389 1234',
            email: 'stay@kittylodgedn.vn',
        },
        rooms: [
            {
                type: 'Modern Room',
                price: 320000,
                description: 'Clean and ventilated room with river view.',
            },
            {
                type: 'Premium Room',
                price: 450000,
                description: 'Upgraded space with extra climbing features.',
            },
        ],
        reviews: [
            {
                user: 'River Cat Owner',
                rating: 4.2,
                comment: 'Great location and clean rooms.',
            },
            {
                user: 'Duy',
                rating: 4.0,
                comment: 'Staff were friendly and attentive.',
            },
        ],
    },
    {
        id: 9,
        name: 'Mountain View Cat Hotel',
        location: '278 Le Dai Hanh Street, Hoa Phat Ward, Cam Le District, Da Nang',
        coordinates: { lat: 16.0318, lng: 108.1752 },
        description:
            'Mountain View Cat Hotel provides a serene and peaceful escape with stunning mountain vistas, ideal for cats who prefer a calm and quiet environment. Spacious enclosures are filled with natural light, soft background music, and cozy resting spots to help reduce stress. Daily enrichment activities include gentle puzzle feeders, window perches for bird-watching, and quiet interaction with staff. The tranquil setting away from city noise makes it perfect for longer stays or cats recovering from vet visits. Owners receive daily updates with photos and notes on their cat’s mood and appetite.',
        googleRating: 4.9,
        pawtopiaRating: 5.0,
        availability: true,
        price: 550000,
        photos: [
            'https://i0.wp.com/www.petboardinganddaycare.com/wp-content/uploads/2022/05/pg30.jpg?ssl=1',
            'https://images.unsplash.com/photo-1606213479814-4e3d8c1c6c8d?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1592194996308-7b43878e19c9?auto=format&fit=crop&q=80',
        ],
        amenities: [
            'Mountain Views',
            'Natural Light Rooms',
            'Soft Music',
            'Stress-Reduction Activities',
            'Daily Updates',
        ],
        contact: {
            phone: '+84 236 371 9876',
            email: 'peace@mountainviewcat.vn',
        },
        rooms: [
            {
                type: 'Tranquil Suite',
                price: 550000,
                description: 'Spacious room with mountain view and calming features.',
            },
            {
                type: 'Zen Room',
                price: 700000,
                description: 'Extra quiet space with enhanced enrichment.',
            },
        ],
        reviews: [
            {
                user: 'Calm Cat Lover',
                rating: 5,
                comment: 'The quietest and most peaceful stay ever.',
            },
            {
                user: 'Hien',
                rating: 4.9,
                comment: 'Perfect for my anxious cat.',
            },
        ],
    },
    {
        id: 10,
        name: 'Urban Cat Oasis',
        location: '10 Tran Nao Street, Binh An Ward, District 2, Ho Chi Minh City',
        coordinates: { lat: 10.7991, lng: 106.7396 },
        description:
            'Urban Cat Oasis is a stylish and contemporary cat hotel located in the trendy Thao Dien area of District 2. The modern design features comfortable lounging spaces, interactive play zones, and plenty of vertical elements for climbing and exploring. This urban retreat offers a safe and fun environment for city cats who thrive on stimulation and social interaction. The convenient location provides easy access from central District 1 and nearby expat communities. Daily updates, fresh meals, and attentive care ensure every cat enjoys a luxurious and happy stay away from home.',
        googleRating: 4.0,
        pawtopiaRating: 4.2,
        availability: true,
        price: 380000,
        photos: [
            'https://thesmartlocal.com/wp-content/uploads/2023/04/cat-hotels-singapore-nekoya-rooms.png',
            'https://images.unsplash.com/photo-1587300003388-5928af8c0b1c?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1606213479814-4e3d8c1c6c8d?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?auto=format&fit=crop&q=80',
        ],
        amenities: [
            'Modern Design',
            'Interactive Play Zones',
            'Vertical Climbing Space',
            'Urban Convenience',
            'Daily Fresh Meals',
        ],
        contact: {
            phone: '+84 28 3740 5678',
            email: 'urban@cat-oasis.vn',
        },
        rooms: [
            {
                type: 'City Lounge Room',
                price: 380000,
                description: 'Stylish room with modern lounging and play features.',
            },
            {
                type: 'Trendy Suite',
                price: 520000,
                description: 'Premium space in Thao Dien style.',
            },
        ],
        reviews: [
            {
                user: 'Thao Dien Cat Parent',
                rating: 4.3,
                comment: 'Very stylish and fun for my cat!',
            },
            {
                user: 'Alex',
                rating: 4.1,
                comment: 'Convenient location and modern setup.',
            },
        ],
    },

];

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
            {/* Navigation */}
            <nav className="bg-purple-300 p-4 text-center shadow">
                <span className="text-xl font-semibold text-purple-900">
                    Pawtopia
                </span>
            </nav>
            <div className="max-w-7xl mx-auto px-4 py-8">
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
                        onClick={handleBook}
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
