import { PrismaClient } from "@prisma/client";
import ProductsClient from "@/app/products/products-client";

const prisma = new PrismaClient();

export default async function ProductsPage() {
  const products = await prisma.product.findMany();

  return (
    <section className="w-full py-8">
      <ProductsClient products={products} />
    </section>
  );
}