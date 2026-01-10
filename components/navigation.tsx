"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Submit", href: "/submit" },
  { name: "Current Issue", href: "/current-issue" },
  { name: "Archives", href: "/archives" },
  { name: "Editorial Board", href: "/editorial-board" },
  { name: "Guidelines", href: "/submission-guidelines" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3 py-2">
            <Image
              src="/images/college-logo.png"
              alt="SVLNS GDC Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <span className="font-bold text-lg text-gray-800 leading-tight">SVLNS GDC</span>
              <span className="text-xs text-purple-600 leading-tight">Multidisciplinary Journal</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-purple-600 transition-colors text-sm font-medium hover:scale-105 transform duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-purple-600">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-gradient-to-b from-blue-50 to-purple-50">
              <div className="flex flex-col space-y-4 mt-8">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-purple-600 transition-colors font-medium p-2 rounded-lg hover:bg-white/50"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
