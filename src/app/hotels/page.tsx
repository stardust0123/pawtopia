// pawtopia\src\app\hotels\page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HotelsPage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
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

  // Fetch hotels from API route (or directly from server component in future)
  useEffect(() => {
    async function fetchHotels() {
      try {
        const res = await fetch('/api/hotels');
        const data = await res.json();
        setHotels(data);
      } catch (err) {
        console.error('Failed to fetch hotels:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchHotels();
  }, []);

  // Simple client-side filter (you can move to server later)
  const filteredHotels = hotels.filter((h) => {
    const matchesSearch =
      !filters.search.trim() ||
      h.name.toLowerCase().includes(filters.search.toLowerCase().trim()) ||
      h.location.toLowerCase().includes(filters.search.toLowerCase().trim()) ||
      h.description.toLowerCase().includes(filters.search.toLowerCase().trim());

    const matchesCity = !filters.city || h.location.includes(filters.city);

    const matchesRating = filters.minRating === 0 || h.pawtopiaRating >= filters.minRating;

    const matchesPrice =
      (!filters.minPrice || h.price >= Number(filters.minPrice)) &&
      (!filters.maxPrice || h.price <= Number(filters.maxPrice));

    const matchesAvailability = !filters.available || h.availability;

    return matchesSearch && matchesCity && matchesRating && matchesPrice && matchesAvailability;
  });

  const applyFilters = () => {
    // Just re-render — filters already applied via state
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading hotels...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 pt-20 flex flex-col lg:flex-row gap-8">
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
                className="block group no-underline"
              >
                <div className="flex flex-col md:flex-row bg-blue-100 rounded-xl overflow-hidden shadow-md">
                  {/* Photo */}
                  <div className="md:w-1/3 bg-yellow-100 relative min-h-[260px] md:min-h-full">
                    <Image
                      src={hotel.photos?.[0] || '/placeholder-hotel.jpg'}  // use first photo from array
                      alt={hotel.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-blue-900 mb-2 group-hover:underline decoration-2 underline-offset-2">
                        {hotel.name}
                      </h2>
                      <p className="text-gray-700 mb-4">{hotel.location}</p>
                      <div className="bg-gray-100 p-4 rounded-lg mb-5">
                        <p className="text-gray-700 line-clamp-4">{hotel.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-end justify-between gap-4">
                      <div className="flex flex-wrap gap-3 items-center">
                        <div className="bg-white px-3 py-1 rounded-full shadow text-sm">
                          ⭐ Google
                          <span className="font-semibold ml-1">{hotel.googleRating} / 5</span>
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