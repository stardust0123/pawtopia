import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import Providers from "@/components/Providers"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pawtopia",
  description: "Integrated Cat Care Platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>

        <Providers>
          <Nav />

          <div className="pt-24">
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </div>

          <Footer />
        </Providers>

      </body>
    </html>
  )
}