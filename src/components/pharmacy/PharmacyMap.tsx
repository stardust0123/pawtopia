'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // BẮT BUỘC PHẢI CÓ DÒNG NÀY

// Fix lỗi Marker Icon bị tàng hình trong Next.js
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function PharmacyMap({ pharmacies }: { pharmacies: any[] }) {
  const center: [number, number] = [10.7769, 106.6675]; // Tọa độ HCM

  return (
    <div className="h-full w-full relative" style={{ minHeight: '100%' }}>
      <MapContainer 
        center={center} 
        zoom={13} 
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%', minHeight: '500px' }} // Ép chiều cao ở đây
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pharmacies.map((p) => (
          <Marker key={p.id} position={[p.latitude, p.longitude]}>
            <Popup>
              <div className="p-1">
                <strong className="text-orange-600 block">{p.name}</strong>
                <span className="text-xs text-gray-500">{p.address}</span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}