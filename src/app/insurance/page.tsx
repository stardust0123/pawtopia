export default function InsurancePage() {
  return (
    <section className="space-y-6 text-center">
      <h1 className="text-4xl font-bold text-[var(--color-theme)]">Pet Insurance 🩺</h1>
      <p className="text-gray-700 max-w-2xl mx-auto">
        Protect your cat’s health with affordable, transparent insurance options designed for pet owners.
      </p>

      <div className="bg-[var(--color-insurance)] rounded-2xl p-8 shadow-md max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Coverage Plans Coming Soon</h2>
        <ul className="text-left text-gray-700 list-disc list-inside space-y-2">
          <li>Accident and emergency coverage</li>
          <li>Routine checkup and vaccination support</li>
          <li>Custom plans for multi-cat families</li>
        </ul>
      </div>
    </section>
  );
}
