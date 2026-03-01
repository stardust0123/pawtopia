// src/app/api/hotels/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    // Await the params Promise (required in Next.js App Router server routes)
    const params = await context.params;
    const idStr = params.id;

    console.log(`[API /hotels/${idStr}] Requested hotel details`);

    const hotelId = Number(idStr);

    // Validate ID early
    if (isNaN(hotelId) || hotelId <= 0) {
        console.warn(`[API /hotels/${idStr}] Invalid ID format`);
        return NextResponse.json(
            { error: `Invalid hotel ID: "${idStr || 'missing'}" (must be positive integer)` },
            { status: 400 }
        );
    }

    try {
        const hotel = await prisma.hotel.findUnique({
            where: { id: hotelId },
            select: {
                id: true,
                name: true,
                location: true,
                description: true,
                googleRating: true,
                pawtopiaRating: true,
                availability: true,
                basePrice: true,
                createdAt: true,
                updatedAt: true,

                // Photos (scalar array → string[])
                photos: true,

                // Amenities (many-to-many relation)
                amenities: {
                    select: {
                        amenity: {
                            select: { name: true },
                        },
                    },
                },

                // Contact (one-to-one)
                contact: {
                    select: {
                        phone: true,
                        email: true,
                    },
                },

                // Rooms + their availability periods
                rooms: {
                    select: {
                        id: true,
                        type: true,
                        price: true,
                        description: true,
                        availability: {
                            select: {
                                startDate: true,
                                endDate: true,
                            },
                            orderBy: { startDate: 'asc' },
                        },
                    },
                },

                // Reviews
                reviews: {
                    select: {
                        user: true,
                        rating: true,
                        comment: true,
                        date: true,
                    },
                    orderBy: { date: 'desc' },
                },
            },
        });

        if (!hotel) {
            console.warn(`[API /hotels/${hotelId}] Hotel not found`);
            return NextResponse.json({ error: `Hotel with ID ${hotelId} not found` }, { status: 404 });
        }

        // Format response for easier frontend consumption
        const formatted = {
            ...hotel,
            photos: hotel.photos.map((p: any) => p.url).filter(Boolean) || [], // flat strings
            amenities: hotel.amenities.map((a: any) => a.amenity.name),
            contact: hotel.contact || null,
            rooms: hotel.rooms.map((room: any) => ({
                ...room,
                availability: room.availability.map((period: any) => ({
                    start: period.startDate.toISOString().split('T')[0],
                    end: period.endDate.toISOString().split('T')[0],
                })),
            })),
            reviews: hotel.reviews.map((r: any) => ({
                ...r,
                date: r.date.toISOString().split('T')[0],
            })),
        };

        console.log(`[API /hotels/${hotelId}] Success - returned hotel "${hotel.name}"`);

        return NextResponse.json(formatted);
    } catch (error) {
        console.error(`[API /hotels/${hotelId}] Error:`, error);
        return NextResponse.json(
            { error: 'Failed to fetch hotel details - database error' },
            { status: 500 }
        );
    }
}