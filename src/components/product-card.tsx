"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AddButton,
  MinusButton,
  StarButton,
  CartButton,
} from "@/ui/icons";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const router = useRouter();

  return (
    <div className="border rounded-lg bg-white hover:shadow-md transition flex flex-col overflow-hidden mb-4">
      {/* Image - Square with fixed aspect ratio */}
      <div 
        className="w-full aspect-square bg-gray-100 overflow-hidden cursor-pointer"
        onClick={() => router.push(`/products/${product.id}`)}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover hover:opacity-80 transition"
        />
      </div>

      {/* Content */}
      <div className="p-4 pb-5 flex flex-col gap-3">
        {/* Product Info */}
        <div className="text-center">
          <h3 className="text-sm font-medium line-clamp-2 mb-1">
            {product.name}
          </h3>
          <p className="text-base font-bold text-orange-500">
            ${product.price.toFixed(2)}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          {/* Quantity controls */}
          <div className="flex items-center">
            <button 
              onClick={() => setQty((qty) => Math.max(1, qty - 1))}
              className="p-1.5 hover:bg-gray-100"
            >
              <MinusButton />
            </button>
            <span className="px-3 text-sm border-x min-w-10 text-center">{qty}</span>
            <button 
              onClick={() => setQty((qty) => qty + 1)}
              className="p-1.5 hover:bg-gray-100"
            >
              <AddButton />
            </button>
          </div>
          
          {/* Action buttons */}  
          <div className="flex gap-2">
            <CartButton />
            <StarButton />
          </div>
        </div>
      </div>
    </div>
  );
}