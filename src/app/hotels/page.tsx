// pawtopia\src\app\hotels\page.tsx

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const mockHotels = [
  {
    id: 1,
    name: 'Cozy Cat Inn',
    location: '270 Le Thanh Ton, Ben Thanh Ward, District 1, Ho Chi Minh City',
    description: 'This luxurious cat hotel offers spacious, climate-controlled rooms with premium scratching posts, cozy beds, and daily playtime sessions. Located in the heart of District 1, it provides 24/7 CCTV monitoring and attentive staff to ensure your feline companion feels completely at home during your absence.',
    googleRating: 4.5,
    pawtopiaRating: 4.8,
    availability: true,
    price: 500000,
    photo: 'https://static.wixstatic.com/media/790b5b_4e5608faa85c4e908ab71bde5536457d~mv2.jpg/v1/crop/x_0,y_344,w_1533,h_1192/fill/w_320,h_237,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/385525616_1309024529739282_6749097801703949542_n.jpg',
  },
  {
    id: 2,
    name: 'Purrfect Stay Hotel',
    location: '85 Nguyen Thi Thap, Tan Hung Ward, District 7, Ho Chi Minh City',
    description: 'An affordable yet comfortable boarding option perfect for budget-conscious cat owners, featuring clean enclosures and fresh meals twice daily. The hotel is conveniently located near Phu My Hung with easy access to public transport, making drop-off and pick-up hassle-free.',
    googleRating: 4.2,
    pawtopiaRating: 4.5,
    availability: false,
    price: 350000,
    photo: 'https://images.squarespace-cdn.com/content/v1/651b1ae5fa3ff4418caec5aa/1696277311141-C53PARPITRK7QK7PE5FL/Cat+Boarding',
  },
  {
    id: 3,
    name: 'Whiskers Resort',
    location: '83 Truong Dinh, Ward 6, District 3, Ho Chi Minh City',
    description: 'Designed especially for active and playful cats, this resort includes large play areas with tunnels, climbing trees, and interactive toys to keep your pet entertained all day. Guests enjoy personalized attention from experienced handlers and a peaceful environment away from busy streets.',
    googleRating: 4.7,
    pawtopiaRating: 4.9,
    availability: true,
    price: 600000,
    photo: 'https://alcalacountrypetresort.com/wp-content/uploads/2022/07/Cat-Boarding-Gallery-2-1.jpg',
  },
  {
    id: 4,
    name: 'Feline Paradise',
    location: '174 Kim Ma Street, Ba Dinh District, Hanoi',
    description: 'A premium cat boarding facility in central Hanoi offering private suites with windows for natural light and soft bedding for ultimate relaxation. The staff provides daily grooming, medication administration if needed, and regular updates with photos so you never miss a moment of your cat’s stay.',
    googleRating: 4.6,
    pawtopiaRating: 4.7,
    availability: true,
    price: 450000,
    photo: 'https://d36ib8eituxnj4.cloudfront.net/cottage-1.jpg',
  },
  {
    id: 5,
    name: 'Cat Haven Hanoi',
    location: '32 Ly Thai To Street, Ly Thai To Ward, Hoan Kiem District, Hanoi',
    description: 'This cozy and secure cat hotel is ideal for shy or senior cats, featuring quiet rooms and gentle handling by trained caregivers. Situated near Hoan Kiem Lake, it offers a calm atmosphere and optional add-ons like brushing sessions or special dietary meals.',
    googleRating: 4.1,
    pawtopiaRating: 4.3,
    availability: false,
    price: 300000,
    photo: 'https://i0.wp.com/www.petboardinganddaycare.com/wp-content/uploads/2022/05/pg29.jpg?ssl=1',
  },
  {
    id: 6,
    name: 'Paw Palace',
    location: '78 To Ngoc Van, Tay Ho Ward, Tay Ho District, Hanoi',
    description: 'Enjoy luxury cat accommodations with scenic West Lake views, spacious suites, and premium amenities including elevated perches and enrichment toys. The palace-style hotel provides concierge-level service with daily fresh food, playtime, and personalized care reports sent directly to your phone.',
    googleRating: 4.8,
    pawtopiaRating: 4.9,
    availability: true,
    price: 700000,
    photo: 'https://i0.wp.com/www.petboardinganddaycare.com/wp-content/uploads/2022/05/pg28-2.jpg?ssl=1',
  },
  {
    id: 7,
    name: 'Beachside Cat Retreat',
    location: '200 To Hien Thanh Street, Phuoc My Ward, Son Tra District, Da Nang',
    description: 'A relaxing beachside cat boarding experience just minutes from My Khe Beach, offering fresh sea air and bright, airy rooms. Cats can enjoy supervised outdoor time in a secure garden area while owners receive daily photo updates and peace of mind from professional staff.',
    googleRating: 4.4,
    pawtopiaRating: 4.6,
    availability: true,
    price: 400000,
    photo: 'https://nekoya.co/wp-content/uploads/2025/10/MM-1024x666.png',
  },
  {
    id: 8,
    name: 'Da Nang Kitty Lodge',
    location: '174 Bach Dang Street, Hai Chau District, Da Nang',
    description: 'Modern and well-equipped cat hotel located along the Han River with easy access to the city center and major attractions. The lodge features clean, ventilated rooms, automatic feeders, and attentive staff who provide daily cleaning and interaction to keep your cat happy and healthy.',
    googleRating: 4.3,
    pawtopiaRating: 4.4,
    availability: false,
    price: 320000,
    photo: 'https://pix10.agoda.net/hotelImages/412145/-1/80ceda91103de739085700f76efc85b3.jpg?ce=0&s=414x232',
  },
  {
    id: 9,
    name: 'Mountain View Cat Hotel',
    location: '278 Le Dai Hanh Street, Hoa Phat Ward, Cam Le District, Da Nang',
    description: 'This peaceful retreat offers stunning mountain views and a quiet environment perfect for cats who prefer calm surroundings. Spacious enclosures with natural light, soft music, and daily enrichment activities help reduce stress during longer stays.',
    googleRating: 4.9,
    pawtopiaRating: 5.0,
    availability: true,
    price: 550000,
    photo: 'https://i0.wp.com/www.petboardinganddaycare.com/wp-content/uploads/2022/05/pg30.jpg?ssl=1',
  },
  {
    id: 10,
    name: 'Urban Cat Oasis',
    location: '10 Tran Nao Street, Binh An Ward, District 2, Ho Chi Minh City',
    description: 'A stylish urban cat hotel in the trendy Thao Dien area, offering modern design, comfortable lounging spaces, and interactive play zones. Ideal for city cats, it provides a safe and fun environment with easy access from central District 1 and nearby expat communities.',
    googleRating: 4.0,
    pawtopiaRating: 4.2,
    availability: true,
    price: 380000,
    photo: 'https://thesmartlocal.com/wp-content/uploads/2023/04/cat-hotels-singapore-nekoya-rooms.png',
  },
];

export default function HotelsPage() {
  const [filters, setFilters] = useState({
    search: '',
    city: '',
    minRating: 0,
    minPrice: '',
    maxPrice: '',
    startDate: '',
    endDate: '',
    available: false,
  });

  const [filteredHotels, setFilteredHotels] = useState(mockHotels);

  const applyFilters = () => {
    let filtered = mockHotels;

    if (filters.search.trim()) {
      const searchLower = filters.search.toLowerCase().trim();
      filtered = filtered.filter(
        (h) =>
          h.name.toLowerCase().includes(searchLower) ||
          h.location.toLowerCase().includes(searchLower) ||
          h.description.toLowerCase().includes(searchLower)
      );
    }

    if (filters.city) {
      filtered = filtered.filter((h) => h.location.includes(filters.city));
    }

    if (filters.minRating > 0) {
      filtered = filtered.filter((h) => h.googleRating >= filters.minRating);
    }

    if (filters.minPrice !== '') {
      const minP = Number(filters.minPrice);
      if (!isNaN(minP)) {
        filtered = filtered.filter((h) => h.price >= minP);
      }
    }

    if (filters.maxPrice !== '') {
      const maxP = Number(filters.maxPrice);
      if (!isNaN(maxP)) {
        filtered = filtered.filter((h) => h.price <= maxP);
      }
    }

    if (filters.available || (filters.startDate && filters.endDate)) {
      filtered = filtered.filter((h) => h.availability === true);
    }

    setFilteredHotels(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col lg:flex-row gap-8">
        {/* Left Filters Panel */}
        <aside className="lg:w-96 xl:w-[400px] bg-white rounded-xl shadow-lg p-6 space-y-6">
          <input
            type="text"
            placeholder="Search hotels..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />

          <select
            className="w-full p-3 border border-gray-300 rounded-lg bg-green-50"
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          >
            <option value="">All cities</option>
            <option value="Ho Chi Minh City">Ho Chi Minh City</option>
            <option value="Hanoi">Hanoi</option>
            <option value="Da Nang">Da Nang</option>
          </select>

          <select
            className="w-full p-3 border border-gray-300 rounded-lg bg-green-50"
            value={filters.minRating}
            onChange={(e) => setFilters({ ...filters, minRating: Number(e.target.value) || 0 })}
          >
            <option value={0}>All ratings</option>
            <option value={4.5}>4.5+</option>
            <option value={4}>4+</option>
            <option value={3.5}>3.5+</option>
            <option value={3}>3+</option>
          </select>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Minimum price"
              className="w-full p-3 border border-gray-300 rounded-lg bg-blue-50"
              value={filters.minPrice}
              onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            />
            <input
              type="number"
              placeholder="Maximum price"
              className="w-full p-3 border border-gray-300 rounded-lg bg-blue-50"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              className="w-full p-3 border border-gray-300 rounded-lg bg-red-50"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
            />
            <input
              type="date"
              className="w-full p-3 border border-gray-300 rounded-lg bg-red-50"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-3 bg-pink-50 p-3 rounded-lg">
            <input
              type="checkbox"
              id="availability"
              className="h-5 w-5 text-purple-600 rounded"
              checked={filters.available}
              onChange={(e) => setFilters({ ...filters, available: e.target.checked })}
            />
            <label htmlFor="availability" className="text-gray-700 font-medium">
              Availability
            </label>
          </div>

          <button
            onClick={applyFilters}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg font-semibold transition"
          >
            Apply filter
          </button>
        </aside>

        {/* Hotel List */}
        <main className="flex-1 space-y-8">
          {filteredHotels.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No hotels match your filters. Try adjusting your search.
            </div>
          ) : (
            filteredHotels.map((hotel) => (
              <Link
                key={hotel.id}
                href={`/hotels/${hotel.id}`}
                className="block group no-underline"  // ← added no-underline to remove default link underline
              >
                <div className="flex flex-col md:flex-row bg-blue-100 rounded-xl overflow-hidden shadow-md">
                  {/* Photo */}
                  <div className="md:w-1/3 bg-yellow-100 relative min-h-[260px] md:min-h-full">
                    <Image
                      src={hotel.photo}
                      alt={hotel.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      {/* Only this text gets underlined on hover */}
                      <h2 className="text-2xl font-bold text-blue-900 mb-2 group-hover:underline decoration-2 underline-offset-2">
                        {hotel.name}
                      </h2>
                      <p className="text-gray-700 mb-4">{hotel.location}</p>

                      <div className="bg-gray-100 p-4 rounded-lg mb-5">
                        <p className="text-gray-700">{hotel.description}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-end justify-between gap-4">
                      <div className="flex flex-wrap gap-3 items-center">
                        <div className="bg-white px-3 py-1 rounded-full shadow text-sm">
                          ⭐ Google
                          <span className="font-semibold ml-1">
                            {hotel.googleRating} / 5
                          </span>
                        </div>

                        <div className="bg-purple-100 px-3 py-1 rounded-full shadow text-sm">
                          🐾 Pawtopia
                          <span className="font-semibold text-purple-800 ml-1">
                            {hotel.pawtopiaRating} / 5
                          </span>
                        </div>

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium shadow ${hotel.availability ? 'bg-green-200 text-green-900' : 'bg-red-200 text-red-900'
                            }`}
                        >
                          {hotel.availability ? 'Available' : 'Not Available'}
                        </span>
                      </div>


                      {/* Price */}
                      <div className="text-right">
                        <div className="text-3xl md:text-4xl font-bold text-green-700">
                          {hotel.price.toLocaleString('vi-VN')} ₫
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </main>
      </div>
    </div>
  );
}