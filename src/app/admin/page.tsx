"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import jwt from "jsonwebtoken"

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      router.push("/signin")
      return
    }

    const decoded: any = jwt.decode(token)

    if (decoded.role !== "ADMIN") {
      router.push("/")
    }
  }, [])

  return (
    <div className="max-w-5xl mx-auto pt-28">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
    </div>
  )
}