import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function TestDbPage() {
    const hotels = await prisma.hotel.findMany({
        orderBy: { id: "asc" },
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-purple-300 p-4 text-center shadow-md">
                <span className="text-2xl font-bold text-purple-900">Pawtopia</span>
            </nav>

            <div className="max-w-6xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold text-purple-900 mb-6">
                    Hotel Database Test
                </h1>

                {hotels.length === 0 && (
                    <p className="text-gray-500">No hotels found in database.</p>
                )}

                <div className="space-y-6">
                    {hotels.map((hotel) => (
                        <div
                            key={hotel.id}
                            className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden"
                        >
                            {/* Image */}
                            <div className="md:w-1/3 h-64 bg-gray-100">
                                {hotel.imageUrl && (
                                    <img
                                        src={hotel.imageUrl}
                                        alt={hotel.name}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-6 flex flex-col justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-purple-900">
                                        {hotel.name}
                                    </h2>

                                    <p className="text-gray-600 mt-1">{hotel.location}</p>

                                    <p className="text-gray-700 mt-3">
                                        {hotel.description}
                                    </p>

                                    <p className="text-sm text-gray-500 mt-2">
                                        Contact: {hotel.contact}
                                    </p>
                                </div>

                                <div className="flex justify-between items-center mt-6">
                                    <div className="text-sm text-gray-400">
                                        Created:{" "}
                                        {new Date(hotel.createdAt).toLocaleDateString()}
                                    </div>

                                    <div className="text-2xl font-bold text-green-700">
                                        {hotel.pricePerNight.toLocaleString()} ₫ / night
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
