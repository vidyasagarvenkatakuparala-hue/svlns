import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, FileText, Upload, Database } from "lucide-react"

export const metadata: Metadata = {
  title: "Admin Portal - SVLNS GDC Journal",
  description: "Administrative interface for managing the SVLNS GDC Multidisciplinary Journal",
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
                <p className="text-sm text-gray-600">SVLNS GDC Multidisciplinary Journal Management</p>
              </div>

              <nav className="hidden md:flex items-center gap-1">
                <Link
                  href="/admin/submissions"
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  <FileText className="h-4 w-4" />
                  Submissions
                </Link>
                <Link
                  href="/admin/publish"
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  <Upload className="h-4 w-4" />
                  Publish
                </Link>
                <Link
                  href="/admin/storage"
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  <Database className="h-4 w-4" />
                  Storage
                </Link>
              </nav>
            </div>

            <Button asChild variant="outline" size="sm" className="bg-transparent">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                View Site
              </Link>
            </Button>
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}
