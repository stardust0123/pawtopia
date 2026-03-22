"use client";

import Link from "next/link";
import { MapPin, Phone, Clock, ChevronRight } from "lucide-react";

interface PharmacyCardProps {
  id: number;
  name: string;
  address: string;
  phone: string;
  hours: string;
  services: string[];
  imageUrl: string | null;
}

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

export default function PharmacyCard({
  id,
  name,
  address,
  phone,
  hours,
  services,
  imageUrl,
}: PharmacyCardProps) {
  return (
    <Link
      href={`/pharmacy/${id}`}
      className="group block bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100"
    >
      {/* Image / Gradient Header */}
      <div className="h-36 bg-gradient-to-br from-[var(--color-pharmacy)] to-[#7FB5C9] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30">
          💊
        </div>
        <div className="absolute bottom-3 left-4">
          <h3 className="text-xl font-bold text-white drop-shadow-md">
            {name}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Address */}
        <div className="flex items-start gap-2 text-gray-600 text-sm">
          <MapPin size={16} className="text-[var(--color-pharmacy)] mt-0.5 shrink-0" />
          <span className="line-clamp-2">{address}</span>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <Phone size={16} className="text-[var(--color-pharmacy)] shrink-0" />
          <span>{phone}</span>
        </div>

        {/* Hours */}
        <div className="flex items-start gap-2 text-gray-600 text-sm">
          <Clock size={16} className="text-[var(--color-pharmacy)] mt-0.5 shrink-0" />
          <span className="line-clamp-1">{hours}</span>
        </div>

        {/* Service Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {services.slice(0, 3).map((service) => (
            <span
              key={service}
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                serviceBadgeColors[service] || "bg-gray-100 text-gray-600"
              }`}
            >
              {service}
            </span>
          ))}
          {services.length > 3 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">
              +{services.length - 3} more
            </span>
          )}
        </div>

        {/* View Details CTA */}
        <div className="flex items-center justify-end text-sm font-medium text-[#5A9CB5] group-hover:text-[#3d7a94] transition-colors pt-1">
          View Details
          <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
