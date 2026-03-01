import { prisma } from "@lib/prisma"
import Image from "next/image"
import Link from "next/link"

interface SearchParams {
  search?: string
  min?: string
  max?: string
  stock?: string
  category?: string
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const resolvedSearchParams = await searchParams

  const search = resolvedSearchParams.search || ""
  const min = resolvedSearchParams.min
    ? Number(resolvedSearchParams.min)
    : undefined
  const max = resolvedSearchParams.max
    ? Number(resolvedSearchParams.max)
    : undefined
  const stockOnly = resolvedSearchParams.stock === "true"
  const category = resolvedSearchParams.category || ""

  // get distinct categories for the filter dropdown
  const categories = await prisma.product.findMany({
    distinct: ["category"],
    select: { category: true },
  })

  const products = await prisma.product.findMany({
    where: {
      AND: [
        search
          ? {
              OR: [
                { name: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
              ],
            }
          : {},
        min ? { price: { gte: min } } : {},
        max ? { price: { lte: max } } : {},
        stockOnly ? { stock: { gt: 0 } } : {},
        category ? { category } : {},
      ],
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="max-w-7xl mx-auto px-6 pt-28 pb-10">
      {/* Search */}
      <form className="mb-8 flex gap-4">
        <input
          type="text"
          name="search"
          placeholder="Search products..."
          defaultValue={search}
          className="w-full border rounded-lg px-4 py-2"
        />
        {category && <input type="hidden" name="category" value={category} />}
        <button className="bg-[var(--color-product)] text-white px-6 rounded-lg">
          Search
        </button>
      </form>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-10">
        {/* Sidebar */}
        <div className="lg:col-span-1 border rounded-xl p-6 h-fit bg-white shadow-sm sticky top-28">
          <h2 className="font-semibold mb-4">Filters</h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm">Min Price</label>
              <input
                type="number"
                name="min"
                defaultValue={min}
                className="w-full border rounded px-2 py-1"
              />
            </div>

            <div>
              <label className="block text-sm">Max Price</label>
              <input
                type="number"
                name="max"
                defaultValue={max}
                className="w-full border rounded px-2 py-1"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="stock"
                value="true"
                defaultChecked={stockOnly}
              />
              <label>In Stock Only</label>
            </div>

            <div>
              <label className="block text-sm">Category</label>
              <select
                name="category"
                defaultValue={category}
                className="w-full border rounded px-2 py-1"
              >
                <option value="">All</option>
                {categories.map((c) => (
                  <option key={c.category} value={c.category}>
                    {c.category}
                  </option>
                ))}
              </select>
            </div>

            {search && (
              <input type="hidden" name="search" value={search} />
            )}

            <button className="w-full bg-[var(--color-product)] text-white py-2 rounded-lg">
              Apply Filters
            </button>
          </form>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="bg-white border rounded-xl p-4 hover:shadow-lg transition"
            >
              <div className="relative w-full h-56 mb-4">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>

              <h2 className="text-lg font-semibold">
                {product.name}
              </h2>

              <p className="text-gray-500 text-sm line-clamp-2">
                {product.description}
              </p>

              <p className="mt-2 font-bold text-lg">
                ${product.price.toFixed(2)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}