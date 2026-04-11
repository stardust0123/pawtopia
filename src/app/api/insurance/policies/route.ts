import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const policies = await (prisma as any).policy.findMany({
            include: { plan: { include: { provider: true } }, user: true },
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(policies);
    } catch (error: any) {
        console.error('Get policies error:', error);
        if (error?.code === 'P2021' || (error?.meta && error.meta.code === 'P2021')) {
            return NextResponse.json([]);
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const {
            userId = 1,
            planId,
            catName,
            catBreed,
            catAge,
            medicalHistory,
            startDate,
            endDate,
            stripePaymentIntentId,
        } = data;

        const policy = await (prisma as any).policy.create({
            data: {
                userId: Number(userId),
                planId: Number(planId),
                catName,
                catBreed,
                catAge: Number(catAge),
                medicalHistory: medicalHistory || null,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                stripePaymentIntentId: stripePaymentIntentId || null,
                paid: !!stripePaymentIntentId,
            },
            include: { plan: { include: { provider: true } } },
        });

        return NextResponse.json({ policy }, { status: 201 });
    } catch (error: any) {
        console.error('Create policy error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}