import { NextRequest, NextResponse } from "next/server"
import { getUserFromToken } from "@/lib/auth"
import { prisma } from "@lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "")
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const user = getUserFromToken(token)
  if (!user || typeof user === "string") {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }

  const orderId = parseInt(params.id, 10)
  if (Number.isNaN(orderId)) {
    return NextResponse.json({ error: "Invalid order id" }, { status: 400 })
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: { product: true }
      }
    }
  })

  if (!order || order.userId !== user.id) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 })
  }

  return NextResponse.json(order)
}
