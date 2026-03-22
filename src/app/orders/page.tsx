"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

interface OrderProduct {
  id: number
  name: string
  imageUrl: string
}

interface OrderItem {
  id: number
  quantity: number
  price: number
  product: OrderProduct
}

interface Order {
  id: number
  total: number
  status: string
  createdAt: string
  items: OrderItem[]
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      window.location.href = "/signin"
      return
    }

    fetch("/api/orders", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setOrders(data)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="max-w-5xl mx-auto pt-28">Loading orders...</div>

  return (
    <div className="max-w-5xl mx-auto pt-28 px-4">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-5 rounded-xl shadow">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Order #{order.id}</h2>
                <span className="text-sm text-green-600">{order.status}</span>
              </div>
              <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
              <p className="mt-2 font-medium">Total: ${order.total.toFixed(2)}</p>
              <Link href={`/orders/${order.id}`} className="text-theme hover:underline">
                View order details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}