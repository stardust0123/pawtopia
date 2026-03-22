import prisma from "@/lib/prisma";
import PharmacyListClient from "./PharmacyListClient";

export default async function PharmacyPage() {
  const pharmacies = await prisma.pharmacy.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="max-w-6xl mx-auto px-2 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-theme)]">
          Cat Pharmacies 💊
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Find trusted pet pharmacies for prescriptions, supplements, and
          medical care — all verified for your feline friend.
        </p>
        <div className="flex justify-center gap-4 text-sm text-gray-500 pt-1">
          <span className="bg-white px-3 py-1 rounded-full shadow-sm">
            🏥 {pharmacies.length} pharmacies available
          </span>
        </div>
      </div>

      {/* Client-side search + grid */}
      <PharmacyListClient pharmacies={pharmacies} />
    </section>
  );
}
