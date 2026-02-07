// src/app/hotels/test-db/page.tsx
export default function TestDbPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation bar - pink/purple theme */}
            <nav className="bg-purple-300 p-4 text-center shadow-md">
                <span className="text-2xl font-bold text-purple-900">Pawtopia</span>
            </nav>

            <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
                {/* Left: Filters sidebar (pink/purple tones) */}
                <aside className="lg:w-96 bg-white rounded-xl shadow-lg p-6 space-y-6">
                    <h2 className="text-xl font-bold text-purple-800">Filters</h2>

                    {/* Search bar */}
                    <input
                        type="text"
                        placeholder="Search hotels..."
                        className="w-full p-3 border border-gray-300 rounded-lg bg-white"
                    />

                    {/* City dropdown */}
                    <select className="w-full p-3 border border-gray-300 rounded-lg bg-green-50">
                        <option>All cities</option>
                        <option>Ho Chi Minh City</option>
                        <option>Hanoi</option>
                        <option>Da Nang</option>
                    </select>

                    {/* Rating dropdown */}
                    <select className="w-full p-3 border border-gray-300 rounded-lg bg-green-50">
                        <option>All ratings</option>
                        <option>4.5+</option>
                        <option>4+</option>
                        <option>3.5+</option>
                    </select>

                    {/* Min / Max price */}
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="number"
                            placeholder="Min price (VND)"
                            className="w-full p-3 border border-gray-300 rounded-lg bg-blue-50"
                        />
                        <input
                            type="number"
                            placeholder="Max price (VND)"
                            className="w-full p-3 border border-gray-300 rounded-lg bg-blue-50"
                        />
                    </div>

                    {/* Start / End date */}
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="date"
                            className="w-full p-3 border border-gray-300 rounded-lg bg-red-50"
                        />
                        <input
                            type="date"
                            className="w-full p-3 border border-gray-300 rounded-lg bg-red-50"
                        />
                    </div>

                    {/* Availability toggle */}
                    <div className="flex items-center gap-3 bg-pink-50 p-3 rounded-lg">
                        <input
                            type="checkbox"
                            id="available"
                            className="h-5 w-5 text-purple-600 rounded"
                        />
                        <label htmlFor="available" className="text-gray-700 font-medium">
                            Available only
                        </label>
                    </div>

                    {/* Apply button */}
                    <button className="w-full bg-purple-500 text-white py-3 rounded-lg font-semibold hover:bg-purple-600">
                        Apply filter
                    </button>
                </aside>

                {/* Right: Hotel list */}
                <main className="flex-1 space-y-8">
                    {/* Hello text as requested */}
                    <div className="text-center py-12">
                        <h1 className="text-5xl font-bold text-purple-800">Hello</h1>
                        <p className="mt-4 text-xl text-gray-600">
                            This is a basic test layout for the hotel list page structure.
                        </p>
                    </div>

                    {/* Sample hotel card (repeated 3 times for demo) */}
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div
                            key={i}
                            className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden"
                        >
                            {/* Yellow: Photo area */}
                            <div className="md:w-1/3 relative h-64 md:h-auto bg-yellow-100">
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                    [Photo of hotel]
                                </div>
                            </div>

                            {/* Blue: Content area */}
                            <div className="flex-1 p-6 flex flex-col justify-between bg-blue-50">
                                <div>
                                    <h2 className="text-2xl font-bold text-blue-900 mb-2">
                                        Name of the hotel {i + 1}
                                    </h2>
                                    <p className="text-gray-600 mb-3">Location of the hotel</p>
                                    <p className="text-gray-700 mb-4">
                                        Short description of the hotel still available or not
                                    </p>
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    {/* Ratings badges */}
                                    <div className="flex flex-wrap gap-3">
                                        <span className="bg-orange-100 px-3 py-1 rounded-full text-sm">
                                            Google Rating
                                        </span>
                                        <span className="bg-purple-100 px-3 py-1 rounded-full text-sm">
                                            Pawtopia Rating
                                        </span>
                                        <span className="bg-green-200 px-3 py-1 rounded-full text-sm font-medium">
                                            Available
                                        </span>
                                    </div>

                                    {/* Price */}
                                    <div className="text-right">
                                        <div className="text-3xl font-bold text-green-700">
                                            500,000 ₫
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </main>
            </div>
        </div>
    );
}