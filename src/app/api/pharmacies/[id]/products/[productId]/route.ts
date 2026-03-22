import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// PUT /api/pharmacies/[id]/products/[productId] — Update price/stock
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; productId: string }> }
) {
  try {
    const { id, productId } = await params;
    const pharmacyId = parseInt(id, 10);
    const prodId = parseInt(productId, 10);

    if (isNaN(pharmacyId) || isNaN(prodId)) {
      return NextResponse.json({ error: "Invalid IDs" }, { status: 400 });
    }

    const body = await request.json();
    const { price, inStock } = body;

    const pharmacyProduct = await prisma.pharmacyProduct.update({
      where: {
        pharmacyId_productId: { pharmacyId, productId: prodId },
      },
      data: {
        ...(price != null && { price: parseFloat(price) }),
        ...(inStock !== undefined && { inStock }),
      },
      include: { product: true },
    });

    return NextResponse.json(pharmacyProduct);
  } catch (error: unknown) {
    if (error && typeof error === "object" && "code" in error && (error as { code: string }).code === "P2025") {
      return NextResponse.json(
        { error: "Product listing not found at this pharmacy" },
        { status: 404 }
      );
    }
    console.error("PUT /api/pharmacies/[id]/products/[productId] error:", error);
    return NextResponse.json(
      { error: "Failed to update product listing" },
      { status: 500 }
    );
  }
}

// DELETE /api/pharmacies/[id]/products/[productId] — Remove product from pharmacy
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; productId: string }> }
) {
  try {
    const { id, productId } = await params;
    const pharmacyId = parseInt(id, 10);
    const prodId = parseInt(productId, 10);

    if (isNaN(pharmacyId) || isNaN(prodId)) {
      return NextResponse.json({ error: "Invalid IDs" }, { status: 400 });
    }

    await prisma.pharmacyProduct.delete({
      where: {
        pharmacyId_productId: { pharmacyId, productId: prodId },
      },
    });

    return NextResponse.json({ message: "Product removed from pharmacy" });
  } catch (error: unknown) {
    if (error && typeof error === "object" && "code" in error && (error as { code: string }).code === "P2025") {
      return NextResponse.json(
        { error: "Product listing not found at this pharmacy" },
        { status: 404 }
      );
    }
    console.error("DELETE /api/pharmacies/[id]/products/[productId] error:", error);
    return NextResponse.json(
      { error: "Failed to remove product from pharmacy" },
      { status: 500 }
    );
  }
}
