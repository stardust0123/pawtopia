import { Pharmacy } from "@/data/pharmacies"

export default function PharmacyCard({ pharmacy }: { pharmacy: Pharmacy }) {
  return (
    <div className="border rounded-2xl p-5 shadow-sm bg-white">
      <h3 className="text-xl font-semibold">{pharmacy.name}</h3>
      <p className="text-sm text-gray-600">{pharmacy.address}</p>

      <div className="mt-2 text-sm">
        <p>📞 {pharmacy.phone}</p>
        <p>⏰ {pharmacy.hours}</p>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {pharmacy.services.map(s => (
          <span
            key={s}
            className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full"
          >
            {s}
          </span>
        ))}
      </div>

      <a
        href={`https://www.google.com/maps/dir/?api=1&destination=${pharmacy.lat},${pharmacy.lng}`}
        target="_blank"
        className="inline-block mt-4 text-sm text-blue-600 underline"
      >
        Get Directions
      </a>
    </div>
  )
}
