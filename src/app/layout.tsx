import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pawtopia",
  description: "Integrated Cat Care Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>

        {/* FIXED HEADER */}
        <Nav />

        {/* THIS DIV PUSHES ALL CONTENT BELOW THE HEADER */}
        <div className="pt-24">
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </div>

        <Footer />

      </body>
    </html>
  );
}
