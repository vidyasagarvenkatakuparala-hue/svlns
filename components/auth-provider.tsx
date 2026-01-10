"use client"

import type React from "react"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Simplified auth provider - just renders children
  // Full auth state management can be added when Supabase is connected
  return <>{children}</>
}
