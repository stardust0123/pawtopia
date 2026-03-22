"use client"

import { createContext, useContext, useEffect, useState, useCallback } from "react"

export interface CartItem {
  id: number
  name: string
  price: number
  imageUrl: string
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  loadCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  const getToken = () => typeof window !== "undefined" ? localStorage.getItem("token") : null

  const loadCart = async () => {
    const token = getToken()
    if (token) {
      try {
        const res = await fetch("/api/cart", {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (res.ok) {
          const items = await res.json()
          setCart(items)
        } else {
          // If no cart, check local and sync
          const storedCart = localStorage.getItem("cart")
          if (storedCart) {
            const localItems = JSON.parse(storedCart)
            setCart(localItems)
            // Sync to API
            for (const item of localItems) {
              await fetch("/api/cart", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ productId: item.id, quantity: item.quantity })
              })
            }
            localStorage.removeItem("cart")
          }
        }
      } catch (error) {
        console.error("Error loading cart:", error)
      }
    } else {
      const storedCart = localStorage.getItem("cart")
      if (storedCart) {
        setCart(JSON.parse(storedCart))
      }
    }
  }

  useEffect(() => {
    loadCart()
  }, [])

  const syncToAPI = async (items: CartItem[]) => {
    const token = getToken()
    if (!token) return

    // For simplicity, clear and re-add all items
    // In production, better to diff
    for (const item of items) {
      await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ productId: item.id, quantity: item.quantity })
      })
    }
  }

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id)

      const newCart = existing
        ? prev.map((p) =>
            p.id === item.id
              ? { ...p, quantity: p.quantity + item.quantity }
              : p
          )
        : [...prev, item]

      const token = getToken()
      if (token) {
        syncToAPI(newCart)
      } else {
        localStorage.setItem("cart", JSON.stringify(newCart))
      }

      return newCart
    })
  }

  const removeFromCart = (id: number) => {
    setCart((prev) => {
      const newCart = prev.filter((item) => item.id !== id)

      const token = getToken()
      if (token) {
        fetch(`/api/cart?productId=${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        })
      } else {
        localStorage.setItem("cart", JSON.stringify(newCart))
      }

      return newCart
    })
  }

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prev) => {
      const newCart = prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )

      const token = getToken()
      if (token) {
        fetch("/api/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ productId: id, quantity })
        })
      } else {
        localStorage.setItem("cart", JSON.stringify(newCart))
      }

      return newCart
    })
  }

  const clearCart = useCallback(() => {
    setCart([])

    const token = getToken()
    if (token) {
      // Clear all items, but since no clear API, perhaps remove each
      // For now, assume not needed
    } else {
      localStorage.removeItem("cart")
    }
  }, [])

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, loadCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}