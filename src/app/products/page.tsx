import { PrismaClient } from "@prisma/client";
// t
const prisma = new PrismaClient();

export default async function ProductsPage() {
  const products = await prisma.product.findMany();

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 text-center space-y-8">
      <h1 className="text-4xl font-bold text-theme">
        <span className="inline-flex items-center gap-2">
          Our Products
        </span>
      </h1>

      <p className="text-gray-700 max-w-2xl mx-auto">
        Browse high-quality products to keep your cat happy, healthy, and purring.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col text-left"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />

            <h2 className="text-lg font-semibold mb-1">{product.name}</h2>

            <p className="text-gray-600 mb-3">{product.description}</p>

            <div className="flex items-center justify-between mt-auto">
              <div className="space-y-1">
                <p className="font-bold flex items-center gap-1">
                  ${product.price.toFixed(2)}
                </p>

                <p className="text-sm text-gray-500 flex items-center gap-1">
    
                  {product.category}
                </p>
              </div>

              <button className="flex items-center gap-2 px-3 py-2 rounded-md border hover:bg-gray-100 transition">
      
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
