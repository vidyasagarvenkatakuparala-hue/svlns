import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldX, Home, LogIn } from "lucide-react"

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-red-100 rounded-full">
              <ShieldX className="h-12 w-12 text-red-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-red-600">Access Denied</CardTitle>
          <CardDescription className="text-gray-600">
            You do not have permission to access this page. Please contact the administrator if you believe this is an
            error.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3">
            <Button asChild className="w-full">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go to Home
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In with Different Account
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
