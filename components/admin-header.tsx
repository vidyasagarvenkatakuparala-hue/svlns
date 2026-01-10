"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import type { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FileText, Upload, Database, LogOut, UserIcon, Home, Settings } from "lucide-react"

interface AdminHeaderProps {
  user: User
  adminUser: {
    email: string
    role: string
    first_name?: string
    last_name?: string
  }
}

export function AdminHeader({ user, adminUser }: AdminHeaderProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
  }

  const navItems = [
    { href: "/admin/submissions", label: "Submissions", icon: FileText },
    { href: "/admin/publish", label: "Publish", icon: Upload },
    { href: "/admin/storage", label: "Storage", icon: Database },
  ]

  return (
    <div className="border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
              <p className="text-sm text-gray-600">SVLNS GDC Multidisciplinary Journal Management</p>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="sm" className="hidden sm:flex bg-transparent">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                View Site
              </Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
                    {adminUser.first_name?.[0] || adminUser.email[0].toUpperCase()}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {adminUser.first_name && adminUser.last_name
                        ? `${adminUser.first_name} ${adminUser.last_name}`
                        : adminUser.email}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">{adminUser.role}</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-gray-600">
                  <UserIcon className="mr-2 h-4 w-4" />
                  {user.email}
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-600">
                  <Settings className="mr-2 h-4 w-4" />
                  Role: {adminUser.role}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  )
}
