import { NextResponse } from "next/server"
import { prisma } from "@lib/prisma"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    )

    return NextResponse.json({
      token,
      role: user.role
    })

  } catch (error) {
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    )
  }
}