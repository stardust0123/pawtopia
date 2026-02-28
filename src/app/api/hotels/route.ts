// src/app/api/hotels/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'

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
                price: true,
                photo: true,
            },
            orderBy: { id: 'asc' },
        });

        return NextResponse.json(hotels);
    } catch (error) {
        console.error('Error fetching hotels:', error);
        return NextResponse.json(
            { error: 'Failed to fetch hotels' },
            { status: 500 }
        );
    }
}