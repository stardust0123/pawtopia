import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, MapPin, Phone, Clock, Pill, ShoppingBag, Check, X } from "lucide-react";
import { notFound } from "next/navigation";

const serviceBadgeColors: Record<string, string> = {
  prescriptions: "bg-blue-100 text-blue-700",
  supplements: "bg-green-100 text-green-700",
  vaccines: "bg-purple-100 text-purple-700",
  "flea treatment": "bg-orange-100 text-orange-700",
  "grooming care": "bg-pink-100 text-pink-700",
  "dental care": "bg-teal-100 text-teal-700",
  "emergency meds": "bg-red-100 text-red-700",
  compounding: "bg-amber-100 text-amber-700",
  "wound care": "bg-rose-100 text-rose-700",
};

export default async function PharmacyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pharmacyId = parseInt(id, 10);

  if (isNaN(pharmacyId)) {
    return notFound();
  }

  const pharmacy = await prisma.pharmacy.findUnique({
    where: { id: pharmacyId },
    include: {
      products: {
        include: { product: true },
      },
    },
  });

  if (!pharmacy) {
    return notFound();
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      {/* Back Button */}
      <Link
        href="/pharmacy"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors group"
      >
        <ArrowLeft
          size={18}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span className="text-sm font-medium">Back to Pharmacies</span>
      </Link>

      {/* Hero Banner */}
      <div className="rounded-2xl overflow-hidden shadow-lg">
        <div className="h-48 md:h-56 bg-gradient-to-br from-[var(--color-pharmacy)] to-[#7FB5C9] relative">
          <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-20">
            💊
          </div>
          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
              {pharmacy.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Address Card */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-2">
          <div className="flex items-center gap-2 text-[#5A9CB5] font-semibold">
            <MapPin size={20} />
            <span>Address</span>
          </div>
          <p className="text-gray-700 pl-7">{pharmacy.address}</p>
        </div>

        {/* Phone Card */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-2">
          <div className="flex items-center gap-2 text-[#5A9CB5] font-semibold">
            <Phone size={20} />
            <span>Phone</span>
          </div>
          <p className="text-gray-700 pl-7">{pharmacy.phone}</p>
        </div>

        {/* Hours Card */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-2 md:col-span-2">
          <div className="flex items-center gap-2 text-[#5A9CB5] font-semibold">
            <Clock size={20} />
            <span>Operating Hours</span>
          </div>
          <p className="text-gray-700 pl-7">{pharmacy.hours}</p>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
        <div className="flex items-center gap-2 text-[#5A9CB5] font-semibold text-lg">
          <Pill size={22} />
          <span>Services Offered</span>
        </div>
        <div className="flex flex-wrap gap-2 pl-1">
          {pharmacy.services.map((service) => (
            <span
              key={service}
              className={`text-sm px-4 py-1.5 rounded-full font-medium capitalize ${
                serviceBadgeColors[service] || "bg-gray-100 text-gray-600"
              }`}
            >
              {service}
            </span>
          ))}
        </div>
      </div>

      {/* Products Available Section */}
      {pharmacy.products.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center gap-2 text-[#5A9CB5] font-semibold text-lg">
            <ShoppingBag size={22} />
            <span>Products Available</span>
            <span className="text-sm font-normal text-gray-400 ml-1">
              ({pharmacy.products.length})
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {pharmacy.products.map((pp) => (
              <div
                key={pp.id}
                className={`flex items-center gap-4 p-4 rounded-lg border transition ${
                  pp.inStock
                    ? "border-gray-100 bg-gray-50 hover:bg-gray-100"
                    : "border-red-100 bg-red-50/50 opacity-75"
                }`}
              >
                {/* Product Image */}
                <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-gradient-to-br from-[var(--color-product)] to-[#E89B9B] flex items-center justify-center">
                  <img
                    src={pp.product.imageUrl}
                    alt={pp.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-800 text-sm truncate">
                    {pp.product.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {pp.product.category}
                  </p>
                  <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
                    {pp.product.description}
                  </p>
                </div>

                {/* Price + Stock */}
                <div className="text-right shrink-0">
                  <p className="font-bold text-gray-800">
                    ${pp.price.toFixed(2)}
                  </p>
                  <div
                    className={`flex items-center gap-1 text-xs font-medium ${
                      pp.inStock ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {pp.inStock ? (
                      <>
                        <Check size={12} />
                        In Stock
                      </>
                    ) : (
                      <>
                        <X size={12} />
                        Out of Stock
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Map Placeholder */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-3">
        <h2 className="text-lg font-semibold text-gray-700">📍 Location</h2>
        <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <p className="text-sm">Interactive map coming soon</p>
            <p className="text-xs mt-1 text-gray-300">
              Coordinates: {pharmacy.latitude.toFixed(4)},{" "}
              {pharmacy.longitude.toFixed(4)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
