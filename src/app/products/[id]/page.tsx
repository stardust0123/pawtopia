import Image from "next/image";
import { MinusButton, AddButton } from "@/ui/icons";

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-6">

        {/* Card */}
        <div className="bg-white rounded-xl shadow p-10 pb-24">

          {/* FLEX CONTAINER */}
          <div className="flex flex-col md:flex-row gap-20">

            {/* LEFT: IMAGE */}
            <div className="flex justify-center md:justify-start flex-shrink-0">
              <div className="w-[360px] h-[360px] flex items-center justify-center overflow-hidden bg-gray-50 rounded-lg p-6">
                <Image
                  src="/images/cat-house.jpg"
                  alt="Cat house"
                  width={360}
                  height={360}
                  className="object-contain"
                />
              </div>
            </div>

            {/* RIGHT: INFO */}
            <div className="flex flex-col flex-1 space-y-6">

              {/* TITLE */}
              <h1 className="text-2xl font-semibold">
                Cozy Woven Cat House
              </h1>

              {/* RATING */}
              <div className="flex items-center text-sm text-gray-500 gap-2">
                <span className="text-orange-500">★★★★★</span>
                <span>(23 reviews)</span>
              </div>

              {/* PRICE */}
              <div className="bg-orange-50 px-6 py-4 rounded-lg w-fit">
                <span className="text-3xl font-bold text-orange-600">
                  $19.99
                </span>
              </div>

              {/* DESCRIPTION */}
              <p className="text-gray-700 leading-relaxed max-w-xl">
                Natural woven cat bed with soft cushion. Breathable, cozy,
                and stylish enough that your cat will still choose the shipping box.
              </p>

              {/* SIZE OPTIONS */}
              <div className="flex gap-6">
                  <button className="px-6 py-2 border rounded-full hover:border-orange-500 hover:text-orange-500 transition">
                    Small
                  </button>
                  <button className="px-6 py-2 border rounded-full hover:border-orange-500 hover:text-orange-500 transition">
                    Medium
                  </button>
                  <button className="px-6 py-2 border rounded-full hover:border-orange-500 hover:text-orange-500 transition">
                    Large
                  </button>
                </div>
              {/* QUANTITY */}
              <div className="space-y-2">
                <p>Quantity</p>
                <div className="flex items-center gap-4">

                  <div>
                    <MinusButton />
                    <span className="px-6">1</span>
                    <AddButton />
                  </div>

                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-6 pt-4 max-w-md">
                <button className="flex-1 py-3 border border-orange-500 text-orange-500 rounded-full hover:bg-orange-50 transition font-medium">
                  Add to Cart
                </button>
                <button className="flex-1 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition font-medium">
                  Buy Now
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}