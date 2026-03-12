import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    const bookings = await prisma.booking.findMany({
        include: { hotel: { select: { name: true, location: true } } },
        orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(bookings);
}

export async function POST(request: Request) {
    const data = await request.json();
    const booking = await prisma.booking.create({
        data: {
            hotelId: data.hotelId,
            roomType: data.roomType,
            startDate: new Date(data.startDate),
            endDate: new Date(data.endDate),
            numCats: Number(data.numCats),
            totalPrice: Number(data.totalPrice),
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            specialRequests: data.specialRequests || null,
        },
        include: { hotel: true },
    });
    return NextResponse.json({ success: true, booking }, { status: 201 });
}