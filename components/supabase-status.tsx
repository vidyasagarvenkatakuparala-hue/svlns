"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

export function SupabaseStatus() {
  const [status, setStatus] = useState<"checking" | "connected" | "error">("checking")
  const [tables, setTables] = useState<string[]>([])

  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    try {
      const supabase = createClient()

      // Try to fetch from journal_settings to verify connection
      const { data, error } = await supabase.from("journal_settings").select("setting_key").limit(1)

      if (error) {
        console.error("Supabase connection error:", error)
        setStatus("error")
        return
      }

      setStatus("connected")

      // Get list of accessible tables
      const tableNames = [
        "journal_settings",
        "authors",
        "articles",
        "issues",
        "submissions",
        "editorial_board",
        "faculty",
        "reviewers",
        "reviews",
      ]

      const accessibleTables: string[] = []
      for (const table of tableNames) {
        const { error: tableError } = await supabase.from(table).select("*").limit(1)
        if (!tableError) {
          accessibleTables.push(table)
        }
      }
      setTables(accessibleTables)
    } catch (error) {
      console.error("Connection check failed:", error)
      setStatus("error")
    }
  }

  if (status === "checking") {
    return (
      <Badge variant="secondary" className="flex items-center gap-2">
        <Loader2 className="h-3 w-3 animate-spin" />
        Checking Supabase...
      </Badge>
    )
  }

  if (status === "error") {
    return (
      <Badge variant="destructive" className="flex items-center gap-2">
        <XCircle className="h-3 w-3" />
        Supabase Disconnected
      </Badge>
    )
  }

  return (
    <Badge variant="default" className="flex items-center gap-2 bg-green-600">
      <CheckCircle className="h-3 w-3" />
      Supabase Connected ({tables.length} tables)
    </Badge>
  )
}
