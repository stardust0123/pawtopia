"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ProductCard from "@/components/product-card";

type Product = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  category?: string | null;
  images?: string[] | null;
};

export default function ProductDetailsClient({ product, relatedProducts = [] }: { product: Product; relatedProducts?: Product[] }) {
  const images =
    product.images && product.images.length > 0
      ? product.images
      : product.imageUrl
      ? [product.imageUrl]
      : [];

  const [selected, setSelected] = useState(0);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setSelected(0);
  }, [images.length]);

  function addToCart() {
    alert(`${product.name} (x${qty}) added to cart`);
  }

  function buyNow() {
    alert(`Buy now: ${product.name} (x${qty})`);
  }

return (
  <main className="flex flex-col items-center justify-center">
    <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 py-16 w-full max-w-6xl px-6">

      {/* LEFT — PRODUCT INFO */}
      <div className="flex-1 space-y-6 text-center md:text-left">

        <span className="text-sm font-semibold text-product uppercase tracking-wide">
          {product.category ?? "Product"}
        </span>

        <h1 className="text-5xl md:text-6xl font-bold text-theme leading-tight">
          {product.name}
        </h1>

        <p className="text-gray-700 text-lg max-w-md mx-auto md:mx-0">
          {product.description ?? "No description available."}
        </p>

        <div className="text-4xl font-bold text-product">
          ${product.price.toFixed(2)}
        </div>

        {/* Quantity */}
        <div className="flex items-center justify-start gap-6">
          <button
            className="px-4 py-2 rounded-lg border hover:bg-gray-100"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
          >
            −
          </button>

          <span className="text-lg font-semibold w-12 text-center">
            {qty}
          </span>

          <button
            className="px-4 py-2 rounded-lg border hover:bg-gray-100"
            onClick={() => setQty((q) => q + 1)}
          >
            +
          </button>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-3 sm:space-y-0 pt-2">
          <button
            onClick={buyNow}
            className="px-6 py-3 bg-product text-white rounded-lg hover:opacity-90 transition w-full sm:w-auto"
          >
            Buy Now
          </button>

          <button
            onClick={addToCart}
            className="px-6 py-3 border text-product rounded-lg hover:bg-orange-50 transition w-full sm:w-auto"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* RIGHT — ROUNDED IMAGE */}
      <div>
        <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-lg overflow-hidden shadow-lg">

          <Image
            src={
              images.length > 0
                ? images[selected]
                : "https://source.unsplash.com/800x800/?cat"
            }
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
            priority
          />

        </div>

        {/* Thumbnails */}
        <div className="mt-4 flex items-center justify-center md:justify-start gap-2">
          {images.length > 0 &&
            images.slice(0, 5).map((src, idx) => (
              <button
                key={idx}
                onClick={() => setSelected(idx)}
                className={`relative w-12 h-12 md:w-20 md:h-20 overflow-hidden rounded-md transition-shadow focus:outline-none ${
                  selected === idx ? "ring-2 ring-product" : "border"
                }`}
                aria-label={`View image ${idx + 1}`}
              >
                <Image
                  src={src}
                  alt={`${product.name} ${idx + 1}`}
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </button>
            ))}
        </div>
      </div>
    </section>

    {/* MORE LIKE THIS SECTION */}
    {relatedProducts && relatedProducts.length > 0 && (
      <section className="w-full max-w-6xl px-6 py-16 border-t">
        <h2 className="text-3xl font-bold text-theme mb-8">More Like This</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </section>
    )}
  </main>
);
}