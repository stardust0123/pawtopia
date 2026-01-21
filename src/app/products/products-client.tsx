"use client";

import { useState } from "react";
import ProductCard from "@/components/product-card";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
};

export default function ProductsClient({
  products,
}: {
  products: Product[];
}) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  return (
    <div className="flex gap-8 px-6 py-8 h-screen">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 overflow-y-auto">
        <div className="border rounded-lg p-4 bg-white text-sm space-y-6 sticky top-8">
          <div>
            <h4 className="font-semibold mb-3">Category</h4>
            <ul className="space-y-2 flex flex-col gap-2">
              <li className="px-3 py-2 rounded-full cursor-pointer hover:opacity-80 transition text-center font-medium" style={{ backgroundColor: "#FFB9B9", color: "#FF5E5E" }}>Food</li>
              <li className="px-3 py-2 rounded-full cursor-pointer hover:opacity-80 transition text-center font-medium" style={{ backgroundColor: "#FFCCE1", color: "#FF5E5E" }}>Toys</li>
              <li className="px-3 py-2 rounded-full cursor-pointer hover:opacity-80 transition text-center font-medium" style={{ backgroundColor: "#F8F7BA", color: "#C9C77E" }}>Accessories</li>
              <li className="px-3 py-2 rounded-full cursor-pointer hover:opacity-80 transition text-center font-medium" style={{ backgroundColor: "#BDE3C3", color: "#7B9980" }}>Health</li>
              <li className="px-3 py-2 rounded-full cursor-pointer hover:opacity-80 transition text-center font-medium" style={{ backgroundColor: "#A3CCDA", color: "#285362" }}>Other</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Price Range</h4>
            <div className="space-y-4">
              {/* Range slider visualization */}
              <div className="relative pt-8 pb-4">
                <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  value={minPrice} 
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="absolute w-full h-2 bg-gray-200 rounded appearance-none cursor-pointer accent-blue-500"
                  style={{ zIndex: minPrice > 500 ? 5 : 3 }}
                />
                <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  value={maxPrice} 
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="absolute w-full h-2 bg-gray-200 rounded appearance-none cursor-pointer accent-blue-500"
                  style={{ zIndex: maxPrice < 500 ? 5 : 4 }}
                />
                
                {/* Price labels above slider */}
                <div className="flex justify-between mb-6 text-xs font-semibold">
                  <span className="bg-gray-200 px-2 py-1 rounded">$0</span>
                  <span className="bg-blue-500 text-white px-3 py-1 rounded">${minPrice}</span>
                  <span className="bg-blue-500 text-white px-3 py-1 rounded">${maxPrice}</span>
                  <span className="bg-gray-200 px-2 py-1 rounded">$1000</span>
                </div>
              </div>

              {/* Manual input fields */}
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-xs text-gray-600 block mb-2">From ($)</label>
                  <input 
                    type="number" 
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded bg-gray-100 text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-600 block mb-2">To ($)</label>
                  <input 
                    type="number" 
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded bg-gray-100 text-sm"
                  />
                </div>
              </div>
              
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition">Search</button>
            </div>
          </div>
        </div>
      </aside>

      {/* Product grid */}
          <section className="flex-1 overflow-y-auto">
            <div className="grid gap-6 p-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))" }}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
    </div>
  );
}