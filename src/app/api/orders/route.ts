import { NextRequest, NextResponse } from "next/server"
import { getUserFromToken } from "@/lib/auth"
import { prisma } from "@lib/prisma"

export async function GET(request: NextRequest) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "")
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const user = getUserFromToken(token)
  if (!user || typeof user === "string") {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: { product: true }
      }
    }
  })

  return NextResponse.json(orders)
}

export async function POST(request: NextRequest) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "")
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const user = getUserFromToken(token)
  if (!user || typeof user === "string") {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }

  const { cart, shipping } = await request.json()
  if (!Array.isArray(cart) || cart.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 })
  }

  const total = cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      total: total,
      status: "paid",
      items: {
        create: cart.map((item: any) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      }
    },
    include: {
      items: {
        include: { product: true }
      }
    }
  })

  // Optionally clear cart here if you want to lock it
  await prisma.cartItem.deleteMany({ where: { cart: { userId: user.id } } })

  return NextResponse.json(order)
}
