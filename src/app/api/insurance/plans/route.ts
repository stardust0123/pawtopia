import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const plans = await (prisma as any).insurancePlan.findMany({
            include: { provider: { select: { name: true, logoUrl: true, description: true } } },
        });
        return NextResponse.json(plans);
    } catch (error: any) {
        console.error('Get plans error:', error);
        // If the InsurancePlan table doesn't exist yet, return an empty array so frontend won't break
        if (error?.code === 'P2021' || (error?.meta && error.meta.code === 'P2021')) {
            return NextResponse.json([]);
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const plan = await (prisma as any).insurancePlan.create({ data });
        return NextResponse.json(plan, { status: 201 });
    } catch (error: any) {
        console.error('Create plan error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}