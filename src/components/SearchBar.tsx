"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

const ALL_SERVICES = [
  "prescriptions",
  "supplements",
  "vaccines",
  "flea treatment",
  "grooming care",
  "dental care",
  "emergency meds",
  "compounding",
  "wound care",
];

interface SearchBarProps {
  onSearchChange: (query: string) => void;
  onServiceFilter: (service: string | null) => void;
  activeService: string | null;
}

export default function SearchBar({
  onSearchChange,
  onServiceFilter,
  activeService,
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearchChange(value);
  };

  const clearSearch = () => {
    setQuery("");
    onSearchChange("");
  };

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative max-w-xl mx-auto">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search pharmacies by name..."
          value={query}
          onChange={handleSearchChange}
          className="w-full pl-12 pr-10 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-pharmacy)] focus:border-transparent text-gray-700 placeholder-gray-400 transition"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Service Filter Pills */}
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => onServiceFilter(null)}
          className={`text-sm px-4 py-1.5 rounded-full font-medium transition-all ${
            activeService === null
              ? "bg-[var(--color-pharmacy)] text-white shadow-sm"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          All
        </button>
        {ALL_SERVICES.map((service) => (
          <button
            key={service}
            onClick={() =>
              onServiceFilter(activeService === service ? null : service)
            }
            className={`text-sm px-4 py-1.5 rounded-full font-medium transition-all capitalize ${
              activeService === service
                ? "bg-[var(--color-pharmacy)] text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {service}
          </button>
        ))}
      </div>
    </div>
  );
}
