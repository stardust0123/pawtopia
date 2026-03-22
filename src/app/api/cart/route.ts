import { NextRequest, NextResponse } from "next/server"
import { getUserFromToken } from "@/lib/auth"
import { prisma } from "@lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = getUserFromToken(token)
    if (!user || typeof user === "string") {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const cart = await prisma.cart.findUnique({
      where: { userId: user.id },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })

    if (!cart) {
      return NextResponse.json([])
    }

    const items = cart.items.map(item => ({
      id: item.product.id,
      name: item.product.name,
      price: item.product.price,
      imageUrl: item.product.imageUrl,
      quantity: item.quantity
    }))

    return NextResponse.json(items)
  } catch (error) {
    console.error("Error fetching cart:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = getUserFromToken(token)
    if (!user || typeof user === "string") {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { productId, quantity }: { productId: number; quantity: number } = await request.json()

    if (quantity <= 0) {
      // Remove item
      await prisma.cartItem.deleteMany({
        where: {
          cart: { userId: user.id },
          productId
        }
      })
    } else {
      // Ensure cart exists in a safe way
      let cart = await prisma.cart.findUnique({ where: { userId: user.id } })

      if (!cart) {
        cart = await prisma.cart.create({ data: { userId: user.id } })
      }

      // Upsert cart item by compound key
      await prisma.cartItem.upsert({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId
          }
        },
        update: { quantity },
        create: {
          cartId: cart.id,
          productId,
          quantity
        }
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating cart:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = getUserFromToken(token)
    if (!user || typeof user === "string") {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const productId = parseInt(searchParams.get("productId") || "0")

    await prisma.cartItem.deleteMany({
      where: {
        cart: { userId: user.id },
        productId
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting cart item:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}