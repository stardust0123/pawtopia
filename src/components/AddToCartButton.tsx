"use client"

import { useCart } from "@/context/CartContext"
import { useRouter } from "next/navigation"

interface Props {
  id: number
  name: string
  price: number
  imageUrl: string
}

export default function AddToCartButton({
  id,
  name,
  price,
  imageUrl,
}: Props) {
  const { addToCart } = useCart()
  const router = useRouter()

  const handleAdd = () => {
    addToCart({ id, name, price, imageUrl, quantity: 1 })
  }

  const handleBuyNow = () => {
    addToCart({ id, name, price, imageUrl, quantity: 1 })
    router.push("/cart")
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleAdd}
        className="px-6 py-3 rounded-lg text-black bg-white border border-gray-300 hover:bg-gray-100"
      >
        Add to Cart
      </button>
      <button
        onClick={handleBuyNow}
        className="px-6 py-3 rounded-lg text-white bg-[var(--color-product)] hover:bg-black]"
      >
        Buy Now
      </button>
    </div>
  )
}