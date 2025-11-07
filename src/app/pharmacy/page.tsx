export default function PharmacyPage() {
  return (
    <section className="space-y-6 text-center">
      <h1 className="text-4xl font-bold text-[var(--color-theme)]">Cat Pharmacy 💊</h1>
      <p className="text-gray-700 max-w-2xl mx-auto">
        Access trusted pharmacies that provide your cat’s medications, supplements, and wellness products.
      </p>

      <div className="bg-[var(--color-pharmacy)] rounded-2xl p-8 shadow-md max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Available Soon</h2>
        <p className="text-gray-700">
          Pawtopia will soon offer verified pharmacy partners to help you order medications
          directly from licensed providers. Stay tuned for updates.
        </p>
      </div>
    </section>
  );
}
