import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/pharmacies — List all pharmacies
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const service = searchParams.get("service");

    const pharmacies = await prisma.pharmacy.findMany({
      where: {
        ...(search && {
          name: { contains: search, mode: "insensitive" as const },
        }),
        ...(service && {
          services: { has: service },
        }),
      },
      include: {
        products: {
          include: { product: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(pharmacies);
  } catch (error) {
    console.error("GET /api/pharmacies error:", error);
    return NextResponse.json(
      { error: "Failed to fetch pharmacies" },
      { status: 500 }
    );
  }
}

// POST /api/pharmacies — Create a new pharmacy
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, address, latitude, longitude, phone, hours, services, imageUrl } = body;

    if (!name || !address || latitude == null || longitude == null || !phone || !hours) {
      return NextResponse.json(
        { error: "Missing required fields: name, address, latitude, longitude, phone, hours" },
        { status: 400 }
      );
    }

    const pharmacy = await prisma.pharmacy.create({
      data: {
        name,
        address,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        phone,
        hours,
        services: services || [],
        imageUrl: imageUrl || null,
      },
    });

    return NextResponse.json(pharmacy, { status: 201 });
  } catch (error) {
    console.error("POST /api/pharmacies error:", error);
    return NextResponse.json(
      { error: "Failed to create pharmacy" },
      { status: 500 }
    );
  }
}
