import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    const params = await context.params; // ← await here!
    const idStr = params.id;

    console.log('API called with id:', idStr);

    const id = Number(idStr);

    if (isNaN(id) || id <= 0) {
        return NextResponse.json(
            { error: `Invalid hotel ID: "${idStr || 'missing'}" (must be positive integer)` },
            { status: 400 }
        );
    }

    try {
        const hotel = await prisma.hotel.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                location: true,
                description: true,
                googleRating: true,
                pawtopiaRating: true,
                availability: true,
                price: true,
                photos: true,
            },
        });

        if (!hotel) {
            return NextResponse.json({ error: `Hotel with ID ${id} not found` }, { status: 404 });
        }

        return NextResponse.json(hotel);
    } catch (error) {
        console.error('Prisma error:', error);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}