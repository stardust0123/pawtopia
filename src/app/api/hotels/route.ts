// src/app/api/hotels/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const hotels = await prisma.hotel.findMany({
            select: {
                id: true,
                name: true,
                location: true,
                description: true,
                googleRating: true,
                pawtopiaRating: true,
                availability: true,
                basePrice: true,              // ← renamed from price
                // Include first photo only (for listing card)
                photos: {
                    select: { url: true },
                    take: 1,                    // only first photo
                    orderBy: { id: 'asc' },
                },
            },
            orderBy: { id: 'asc' },
        });

        // Flatten photos for easier frontend use
        const formattedHotels = hotels.map(hotel => ({
            ...hotel,
            photos: hotel.photos.map(p => p.url),
            photo: hotel.photos[0]?.url || null, // for backward compatibility
        }));

        return NextResponse.json(formattedHotels);
    } catch (error) {
        console.error('Error fetching hotels:', error);
        return NextResponse.json(
            { error: 'Failed to fetch hotels' },
            { status: 500 }
        );
    }
}