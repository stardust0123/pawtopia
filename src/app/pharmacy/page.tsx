'use client';

import { useState } from "react";
import dynamic from "next/dynamic";
import { pharmacies } from "@/data/pharmacies"; // Dữ liệu tọa độ của Hoang
import PharmacyCard from "@/components/PharmacyCard";
import PharmacySearch from "@/components/pharmacy/PharmacySearch";

// Dynamic import cực kỳ quan trọng để không lỗi 'window is not defined'
const PharmacyMap = dynamic(() => import("@/components/pharmacy/PharmacyMap"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-gray-200 animate-pulse flex items-center justify-center">Đang tải Map...</div>
});

export default function PharmacyPage() {
  const [query, setQuery] = useState("");

  const filtered = pharmacies.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.address.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] overflow-hidden bg-white">
      
      {/* BÊN TRÁI: DANH SÁCH (Scrollable) */}
      <div className="w-full lg:w-[450px] flex flex-col border-r border-gray-200">
        <div className="p-6 border-b border-gray-100 space-y-4">
          <h1 className="text-2xl font-bold text-orange-500">Cat Pharmacy 💊</h1>
          <PharmacySearch value={query} onChange={setQuery} />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {filtered.map(p => (
            <PharmacyCard key={p.id} pharmacy={p} />
          ))}
          {filtered.length === 0 && <p className="text-center text-gray-400 mt-10">Không tìm thấy kết quả</p>}
        </div>
      </div>

      {/* BÊN PHẢI: MAP (Sticky) */}
      <div className="flex-1 relative h-full min-h-[400px]">
        <PharmacyMap pharmacies={filtered} />
      </div>

    </div>
  );
}