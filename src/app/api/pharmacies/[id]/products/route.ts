import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/pharmacies/[id]/products — List products at a pharmacy
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

    const pharmacyProducts = await prisma.pharmacyProduct.findMany({
      where: { pharmacyId },
      include: { product: true },
    });

    return NextResponse.json(pharmacyProducts);
  } catch (error) {
    console.error("GET /api/pharmacies/[id]/products error:", error);
    return NextResponse.json(
      { error: "Failed to fetch pharmacy products" },
      { status: 500 }
    );
  }
}

// POST /api/pharmacies/[id]/products — Add a product to a pharmacy
export async function POST(
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
    const { productId, price, inStock } = body;

    if (!productId || price == null) {
      return NextResponse.json(
        { error: "Missing required fields: productId, price" },
        { status: 400 }
      );
    }

    // Check pharmacy and product exist
    const [pharmacy, product] = await Promise.all([
      prisma.pharmacy.findUnique({ where: { id: pharmacyId } }),
      prisma.product.findUnique({ where: { id: parseInt(productId, 10) } }),
    ]);

    if (!pharmacy) {
      return NextResponse.json({ error: "Pharmacy not found" }, { status: 404 });
    }
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const pharmacyProduct = await prisma.pharmacyProduct.create({
      data: {
        pharmacyId,
        productId: parseInt(productId, 10),
        price: parseFloat(price),
        inStock: inStock !== undefined ? inStock : true,
      },
      include: { product: true },
    });

    return NextResponse.json(pharmacyProduct, { status: 201 });
  } catch (error: unknown) {
    // Handle unique constraint violation 
    if (error && typeof error === "object" && "code" in error && (error as { code: string }).code === "P2002") {
      return NextResponse.json(
        { error: "This product is already listed at this pharmacy" },
        { status: 409 }
      );
    }
    console.error("POST /api/pharmacies/[id]/products error:", error);
    return NextResponse.json(
      { error: "Failed to add product to pharmacy" },
      { status: 500 }
    );
  }
}
