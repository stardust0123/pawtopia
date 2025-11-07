import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      name: "Cat Products",
      description: "Find food, toys, grooming supplies, and more — everything your cat deserves.",
      href: "/products",
      emoji: "🛍️",
      color: "bg-[var(--color-product)]",
    },
    {
      name: "Cat Hotels",
      description: "Going on a trip? Discover cozy and safe hotels for your furry companion.",
      href: "/hotels",
      emoji: "🏨",
      color: "bg-[var(--color-hotel)]",
    },
    {
      name: "Cat Sitters",
      description: "Need a trustworthy sitter while you're away? Find local cat lovers here.",
      href: "/sitters",
      emoji: "🐾",
      color: "bg-[var(--color-sitter)]",
    },
    {
      name: "Pet Insurance",
      description: "Protect your cat’s health with affordable and reliable insurance options.",
      href: "/insurance",
      emoji: "🩺",
      color: "bg-[var(--color-insurance)]",
    },
    {
      name: "Pharmacy",
      description: "Find trusted pet pharmacies for prescriptions, supplements, and medical care.",
      href: "/pharmacy",
      emoji: "💊",
      color: "bg-[var(--color-pharmacy)]",
    },
  ];

  return (
    <section className="space-y-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-theme">Our Cat Services 🐱</h1>
        <p className="text-gray-700 mt-2 max-w-2xl mx-auto">
          Pawtopia helps you care for your feline friends — from quality products and comfy hotels
          to trusted sitters, insurance, and pharmacies.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.name}
            className={`${service.color} rounded-2xl p-6 shadow-md hover:shadow-lg transition transform hover:-translate-y-1`}
          >
            <div className="text-5xl mb-4 text-center">{service.emoji}</div>
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
              {service.name}
            </h2>
            <p className="text-gray-700 text-center mt-2">{service.description}</p>
            <div className="flex justify-center mt-4">
              <Link
                href={service.href}
                className="inline-block bg-white text-gray-800 font-medium px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition"
              >
                Learn More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
