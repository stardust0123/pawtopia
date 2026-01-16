"use client"

import { useState } from "react"
import { pharmacies } from "@/data/pharmacies"
import PharmacyCard from "@/components/PharmacyCard"
import PharmacySearch from "@/components/pharmacy/PharmacySearch"

export default function PharmacyPage() {
  const [query, setQuery] = useState("")

  const filtered = pharmacies.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.address.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[var(--color-theme)]">
          Cat Pharmacy 💊
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto mt-2">
          Access trusted pharmacies that provide your cat’s medications,
          supplements, and wellness products.
        </p>
      </div>

      <PharmacySearch value={query} onChange={setQuery} />

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {filtered.map(p => (
          <PharmacyCard key={p.id} pharmacy={p} />
        ))}
      </div>
    </section>
  )
}
