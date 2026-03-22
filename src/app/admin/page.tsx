"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import jwt from "jsonwebtoken"
import {
  Home,
  ShoppingBag,
  Users,
  ClipboardList,
  PieChart,
  Bell,
  Settings,
} from "lucide-react"

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      router.push("/signin")
      return
    }

    const decoded: any = jwt.decode(token)

    if (decoded?.role !== "ADMIN") {
      router.push("/")
    }
  }, [router])

  const [summary, setSummary] = useState<{ totalOrders: number; totalRevenue: number; activeUsers: number } | null>(null)
  const [loadingSummary, setLoadingSummary] = useState(true)
  const [summaryError, setSummaryError] = useState<string | null>(null)

  const metrics = useMemo(() => {
    if (!summary) {
      return [
        { label: "Total Orders", value: "—", icon: ShoppingBag, color: "bg-product" },
        { label: "Revenue", value: "—", icon: PieChart, color: "bg-theme" },
        { label: "Active Customers", value: "—", icon: Users, color: "bg-hotel" },
        { label: "Pending Tickets", value: "14", icon: ClipboardList, color: "bg-insurance" },
      ]
    }

    return [
      { label: "Total Orders", value: summary.totalOrders.toLocaleString(), icon: ShoppingBag, color: "bg-product" },
      { label: "Revenue", value: `$${summary.totalRevenue.toFixed(2)}`, icon: PieChart, color: "bg-theme" },
      { label: "Active Customers", value: summary.activeUsers.toLocaleString(), icon: Users, color: "bg-hotel" },
      { label: "Pending Tickets", value: "14", icon: ClipboardList, color: "bg-insurance" },
    ]
  }, [summary])

  const [orders, setOrders] = useState<Array<{ id: number; user: { name: string | null; email: string }; status: string; total: number; createdAt: string }>>([])
  const [loadingOrders, setLoadingOrders] = useState(true)
  const [ordersError, setOrdersError] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      setSummaryError("Unauthorized: token required")
      setLoadingSummary(false)
      return
    }

    const fetchSummary = async () => {
      try {
        const res = await fetch("/api/admin/summary", {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) {
          const errorData = await res.json()
          setSummaryError(errorData.error || "Failed to load summary")
          setLoadingSummary(false)
          return
        }

        const data = await res.json()
        setSummary(data)
      } catch (error) {
        setSummaryError("Failed to load summary")
      } finally {
        setLoadingSummary(false)
      }
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/admin/orders", {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) {
          const errorData = await res.json()
          setOrdersError(errorData.error || "Failed to load orders")
          setLoadingOrders(false)
          return
        }

        const data = await res.json()
        setOrders(data)
      } catch (error) {
        setOrdersError("Failed to load orders")
      } finally {
        setLoadingOrders(false)
      }
    }

    fetchSummary()
    fetchOrders()
  }, [])

  return (
    <div className="min-h-screen bg-background text-slate-800">
      <div className="flex h-full">
        <aside className="w-72 border-r border-gray-200 bg-white shadow-sm p-6 hidden lg:block">
          <div className="mb-8">
            <h2 className="text-xl font-bold">Pawtopia</h2>
            <p className="text-sm text-gray-500">Admin panel</p>
          </div>

          <nav className="space-y-2">
            {[
              { label: "Dashboard", href: "/admin", icon: Home },
              { label: "Orders", href: "/orders", icon: ClipboardList },
              { label: "Customers", href: "/", icon: Users },
              { label: "Reports", href: "/", icon: PieChart },
              { label: "Notifications", href: "/", icon: Bell },
              { label: "Settings", href: "/profile", icon: Settings },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-gray-100 transition"
              >
                <item.icon size={16} />
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-6 lg:p-10">
          <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Orders</h1>
              <p className="text-gray-600">Overview of current performance and trending data</p>
            </div>
          </header>

          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {metrics.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="p-4 rounded-xl bg-white shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                    <span className={`inline-flex items-center justify-center h-8 w-8 rounded-md text-white ${stat.color}`}>
                      <Icon size={16} />
                    </span>
                  </div>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                </div>
              )
            })}
          </section>

          <section className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="border-b px-6 py-4">
              <h2 className="text-lg font-semibold">Recent Orders</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {loadingOrders ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                        Loading orders...
                      </td>
                    </tr>
                  ) : ordersError ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-red-500">
                        {ordersError}
                      </td>
                    </tr>
                  ) : orders.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                        No orders found.
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-700">#{order.id}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{order.user.name || order.user.email}</td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              order.status.toLowerCase() === "paid"
                                ? "bg-[var(--color-product)]/20 text-[var(--color-product)]"
                                : order.status.toLowerCase() === "delivered"
                                ? "bg-[var(--color-theme)]/20 text-[var(--color-theme)]"
                                : order.status.toLowerCase() === "pending"
                                ? "bg-[var(--color-hotel)]/20 text-[var(--color-hotel)]"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">${order.total.toFixed(2)}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{new Date(order.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}