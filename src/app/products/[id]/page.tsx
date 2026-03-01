import { prisma } from "@lib/prisma"
import Image from "next/image"
import { notFound } from "next/navigation"
import AddToCartButton from "@/components/AddToCartButton"

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params
  const id = Number(resolvedParams.id)

  if (!id || isNaN(id)) return notFound()

  const product = await prisma.product.findUnique({
    where: { id },
  })

  if (!product) return notFound()

  return (
    <div className="max-w-6xl mx-auto px-6 pt-16 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Image */}
        <div className="relative w-full h-[450px]">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover rounded-xl"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">

          <span className="inline-block bg-gray-100 text-sm px-3 py-1 rounded-full mb-4">
            {product.category}
          </span>

          <h1 className="text-3xl font-bold mb-4">
            {product.name}
          </h1>

          <p className="text-gray-600 mb-6">
            {product.description}
          </p>

          <p className="text-2xl font-semibold mb-4">
            ${product.price.toFixed(2)}
          </p>

          <p
            className={`mb-6 font-medium${
              product.stock > 0
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {product.stock > 0
              ? `In Stock (${product.stock})`
              : "Out of Stock"}
          </p>

          {product.stock > 0 ? (
            <AddToCartButton
              id={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
            />
          ) : (
            <button
              disabled
              className="px-6 py-3 rounded-lg text-white bg-gray-400 cursor-not-allowed"
            >
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </div>
  )
}