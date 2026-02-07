import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import ProductDetailsClient from "./product-details-client";

const prisma = new PrismaClient();

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: idString } = await params;
  const id = parseInt(idString, 10);
  if (Number.isNaN(id)) return notFound();

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return notFound();

  // Fetch related products (same category, excluding current product)
  const relatedProducts = await prisma.product.findMany({
    where: {
      category: product.category,
      id: { not: id },
    },
    take: 4,
  });

  return <ProductDetailsClient product={product} relatedProducts={relatedProducts} />;
}
