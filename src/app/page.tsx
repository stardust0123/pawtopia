import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 py-16 w-full max-w-6xl px-6">
        <div className="flex-1 space-y-6 text-center md:text-left">
          {/* Hero Text */}
          <h1 className="text-5xl md:text-6xl font-bold text-theme leading-tight">
            Welcome to <span className="text-product">Pawtopia</span> 🐾
          </h1>

          <p className="text-gray-700 text-lg max-w-md mx-auto md:mx-0">
            Your integrated cat care platform — find quality{" "}
            <span className="text-product font-semibold">products</span>, book
            <span className="text-hotel font-semibold"> hotels</span>, and explore{" "}
            <span className="text-theme font-semibold">services</span> to keep your feline happy and healthy.
          </p>

          {/* CTA Buttons */}
          <div className="space-x-4">
            <Link
              href="/services"
              className="inline-block px-6 py-3 bg-theme text-gray-800 rounded-lg font-semibold shadow hover:brightness-110 transition"
            >
              Explore Services
            </Link>
            <Link
              href="/products"
              className="inline-block px-6 py-3 border-2 border-theme text-theme rounded-lg font-semibold hover:bg-theme hover:text-gray-800 transition"
            >
              View Products
            </Link>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden shadow-lg">
          <Image
            src="/images/hero-cat.png"
            alt="Happy cat"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
            priority
          />
        </div>
      </section>

      {/* Introduction + Services Preview Section */}
      <section className="w-full bg-background py-16 px-6">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          {/* Introduction */}
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-theme">Your Cat, We care </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              At Pawtopia, we believe every cat deserves love, comfort, and quality care.
              Our platform connects you to trusted products, services, and resources — 
              all in one cozy place designed for cat lovers like you.
            </p>
          </div>

          {/* Service Cards Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            <Link
              href="/products"
              className="bg-product rounded-2xl p-6 shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Products 🛍️</h3>
              <p className="text-gray-700">Shop food, toys, and essentials for your feline friend.</p>
            </Link>

            <Link
              href="/hotels"
              className="bg-hotel rounded-2xl p-6 shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Hotels 🏨</h3>
              <p className="text-gray-700">Book safe, comfortable cat hotels while you’re away.</p>
            </Link>

            <Link
              href="/sitters"
              className="bg-sitter rounded-2xl p-6 shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Sitters 🐾</h3>
              <p className="text-gray-700">Find loving and trusted cat sitters near you.</p>
            </Link>

            <Link
              href="/insurance"
              className="bg-insurance rounded-2xl p-6 shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Insurance 🩺</h3>
              <p className="text-gray-700">Protect your cat’s health with affordable coverage.</p>
            </Link>

            <Link
              href="/pharmacy"
              className="bg-pharmacy rounded-2xl p-6 shadow-md hover:shadow-lg transition transform hover:-translate-y-1 sm:col-span-2 lg:col-span-1"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Pharmacy 💊</h3>
              <p className="text-gray-700">Access trusted pharmacies for medicine and supplements.</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
