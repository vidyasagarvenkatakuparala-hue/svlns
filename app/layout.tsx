import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SVLNS GDC Multidisciplinary Journal",
  description:
    "A peer-reviewed, open-access journal dedicated to advancing multidisciplinary research and fostering academic excellence across diverse fields of study.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navigation />
          <main>{children}</main>
          <Footer />
          <Toaster position="top-right" richColors />
        </AuthProvider>
      </body>
    </html>
  )
}
