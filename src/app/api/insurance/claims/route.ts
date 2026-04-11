import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const policyId = url.searchParams.get('policyId');

        const where = policyId ? { policyId: Number(policyId) } : {};

        const claims = await (prisma as any).claim.findMany({
            where,
            include: { policy: { include: { plan: { include: { provider: true } } } } },
            orderBy: { submittedAt: 'desc' },
        });

        return NextResponse.json(claims);
    } catch (error: any) {
        console.error('Get claims error:', error);
        if (error?.code === 'P2021' || (error?.meta && error.meta.code === 'P2021')) {
            return NextResponse.json([]);
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { policyId, description, amount } = data;

        if (!policyId || !description) {
            return NextResponse.json({ error: 'policyId and description are required' }, { status: 400 });
        }

        const claim = await (prisma as any).claim.create({
            data: {
                policyId: Number(policyId),
                description,
                amount: amount ? Number(amount) : null,
            },
        });

        return NextResponse.json({ claim }, { status: 201 });
    } catch (error: any) {
        console.error('Create claim error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
