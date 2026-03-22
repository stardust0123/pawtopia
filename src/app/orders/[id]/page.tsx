"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

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

export default function OrderDetailPage() {
  const params = useParams()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      window.location.href = "/signin"
      return
    }

    const orderId = params?.id
    if (!orderId) return

    fetch(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setOrder(data)
      })
      .finally(() => setLoading(false))
  }, [params])

  if (loading) return <div className="max-w-5xl mx-auto pt-28">Loading order...</div>

  if (!order) {
    return <div className="max-w-5xl mx-auto pt-28">Order not found.</div>
  }

  return (
    <div className="max-w-5xl mx-auto pt-28 px-4">
      <h1 className="text-3xl font-bold mb-4">Order Detail #{order.id}</h1>
      <p className="text-sm text-gray-500 mb-2">{new Date(order.createdAt).toLocaleString()}</p>
      <p className="text-sm text-gray-500 mb-6">Status: {order.status}</p>

      <div className="bg-white p-5 rounded-xl shadow mb-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between items-center border-b last:border-none py-3">
            <div>
              <p className="font-medium">{item.product.name}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      <p className="text-xl font-semibold">Total: ${order.total.toFixed(2)}</p>
    </div>
  )
}
