"use client"

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto pt-28">
      <h1 className="text-3xl font-bold mb-6">
        User Dashboard
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">
        <p>Welcome! You can:</p>

        <ul className="list-disc ml-6 mt-4 space-y-2">
          <li>View your orders</li>
          <li>Track purchases</li>
          <li>Manage bookings</li>
        </ul>
      </div>
    </div>
  )
}