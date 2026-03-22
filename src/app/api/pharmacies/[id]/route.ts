import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/pharmacies/[id] — Get a single pharmacy with its products
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const pharmacyId = parseInt(id, 10);

    if (isNaN(pharmacyId)) {
      return NextResponse.json({ error: "Invalid pharmacy ID" }, { status: 400 });
    }

    const pharmacy = await prisma.pharmacy.findUnique({
      where: { id: pharmacyId },
      include: {
        products: {
          include: { product: true },
        },
      },
    });

    if (!pharmacy) {
      return NextResponse.json({ error: "Pharmacy not found" }, { status: 404 });
    }

    return NextResponse.json(pharmacy);
  } catch (error) {
    console.error("GET /api/pharmacies/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch pharmacy" },
      { status: 500 }
    );
  }
}

// PUT /api/pharmacies/[id] — Update a pharmacy
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const pharmacyId = parseInt(id, 10);

    if (isNaN(pharmacyId)) {
      return NextResponse.json({ error: "Invalid pharmacy ID" }, { status: 400 });
    }

    const body = await request.json();
    const { name, address, latitude, longitude, phone, hours, services, imageUrl } = body;

    const pharmacy = await prisma.pharmacy.update({
      where: { id: pharmacyId },
      data: {
        ...(name && { name }),
        ...(address && { address }),
        ...(latitude != null && { latitude: parseFloat(latitude) }),
        ...(longitude != null && { longitude: parseFloat(longitude) }),
        ...(phone && { phone }),
        ...(hours && { hours }),
        ...(services && { services }),
        ...(imageUrl !== undefined && { imageUrl }),
      },
    });

    return NextResponse.json(pharmacy);
  } catch (error) {
    console.error("PUT /api/pharmacies/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update pharmacy" },
      { status: 500 }
    );
  }
}

// DELETE /api/pharmacies/[id] — Delete a pharmacy
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const pharmacyId = parseInt(id, 10);

    if (isNaN(pharmacyId)) {
      return NextResponse.json({ error: "Invalid pharmacy ID" }, { status: 400 });
    }

    await prisma.pharmacy.delete({
      where: { id: pharmacyId },
    });

    return NextResponse.json({ message: "Pharmacy deleted" });
  } catch (error) {
    console.error("DELETE /api/pharmacies/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete pharmacy" },
      { status: 500 }
    );
  }
}
