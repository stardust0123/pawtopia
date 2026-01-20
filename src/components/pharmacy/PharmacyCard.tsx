import React from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';

export default function PharmacyCard({ pharmacy }: { pharmacy: any }) {
  // Tạo link Google Maps dựa trên tọa độ thực tế của từng nhà thuốc
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${pharmacy.latitude},${pharmacy.longitude}`;

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all mb-4 group">
      <div className="space-y-3">
        <h3 className="font-bold text-lg text-slate-800 group-hover:text-orange-500 transition-colors">
          {pharmacy.name}
        </h3>
        
        {/* Địa chỉ */}
        <div className="flex items-start text-gray-500 text-sm">
          <MapPin size={16} className="mr-2 mt-0.5 text-orange-400 shrink-0" />
          <span>{pharmacy.address}</span>
        </div>

        {/* Số điện thoại */}
        <div className="flex items-center text-gray-500 text-sm">
          <Phone size={16} className="mr-2 text-orange-400 shrink-0" />
          <span>{pharmacy.phone}</span>
        </div>
        
        {/* GIỜ LÀM VIỆC - Dùng openTime từ data */}
        <div className="flex items-center text-orange-600 font-semibold text-sm bg-orange-50 w-fit px-3 py-1.5 rounded-lg border border-orange-100">
          <Clock size={16} className="mr-2 shrink-0" />
          <span>{pharmacy.openTime || "Contact for hours"}</span>
        </div>

        {/* Tags Dịch vụ */}
        <div className="flex flex-wrap gap-2 pt-1">
          {pharmacy.services?.map((service: string) => (
            <span key={service} className="text-[10px] font-bold uppercase bg-slate-100 text-slate-600 px-2 py-1 rounded">
              {service}
            </span>
          ))}
        </div>

        {/* HÀNH ĐỘNG: GET DIRECTIONS */}
        <div className="pt-3 border-t border-gray-50 mt-2 flex justify-between items-center">
          <a 
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
          >
            <Navigation size={14} />
            Get Directions
          </a>
          
          <button className="text-xs font-bold text-gray-400 hover:text-orange-500">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}