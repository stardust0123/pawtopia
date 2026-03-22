import { NextRequest, NextResponse } from "next/server"
import { getUserFromToken } from "@/lib/auth"
import { prisma } from "@lib/prisma"

export async function GET(request: NextRequest) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "")
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = getUserFromToken(token)
  if (!user || typeof user === "string") {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }

  if (user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const totalOrders = await prisma.order.count()

  const revenueResult = await prisma.order.aggregate({
    _sum: { total: true },
  })

  const totalRevenue = revenueResult._sum.total || 0

  const activeUsers = await prisma.user.count({
    where: { role: { not: "ADMIN" } },
  })

  return NextResponse.json({
    totalOrders,
    totalRevenue,
    activeUsers,
  })
}
