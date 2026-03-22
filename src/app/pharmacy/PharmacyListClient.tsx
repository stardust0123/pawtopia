"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import PharmacyCard from "@/components/PharmacyCard";
import { Frown } from "lucide-react";

interface Pharmacy {
  id: number;
  name: string;
  address: string;
  phone: string;
  hours: string;
  services: string[];
  imageUrl: string | null;
}

interface PharmacyListClientProps {
  pharmacies: Pharmacy[];
}

export default function PharmacyListClient({ pharmacies }: PharmacyListClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeService, setActiveService] = useState<string | null>(null);

  const filtered = pharmacies.filter((pharmacy) => {
    const matchesSearch = pharmacy.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesService =
      activeService === null || pharmacy.services.includes(activeService);
    return matchesSearch && matchesService;
  });

  return (
    <>
      <SearchBar
        onSearchChange={setSearchQuery}
        onServiceFilter={setActiveService}
        activeService={activeService}
      />

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filtered.map((pharmacy) => (
            <PharmacyCard
              key={pharmacy.id}
              id={pharmacy.id}
              name={pharmacy.name}
              address={pharmacy.address}
              phone={pharmacy.phone}
              hours={pharmacy.hours}
              services={pharmacy.services}
              imageUrl={pharmacy.imageUrl}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <Frown size={48} className="mb-4" />
          <p className="text-lg font-medium">No pharmacies found</p>
          <p className="text-sm mt-1">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </>
  );
}
