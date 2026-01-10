import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()

    // Check database connection
    const { data, error } = await supabase.from("journal_settings").select("setting_key").limit(1)

    if (error) {
      return NextResponse.json(
        {
          status: "error",
          message: "Database connection failed",
          error: error.message,
        },
        { status: 500 },
      )
    }

    // Get table counts
    const tables = ["articles", "issues", "submissions", "authors", "editorial_board", "faculty"]
    const counts: Record<string, number> = {}

    for (const table of tables) {
      const { count } = await supabase.from(table).select("*", { count: "exact", head: true })
      counts[table] = count || 0
    }

    return NextResponse.json({
      status: "healthy",
      database: "connected",
      tables: counts,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Health check failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
