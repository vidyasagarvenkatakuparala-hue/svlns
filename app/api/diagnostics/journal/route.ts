import type { NextRequest } from "next/server"
// Using the server-side Supabase helper that already exists in your project
import { createClient } from "../../../../lib/supabase/server"

export async function GET(_req: NextRequest) {
  try {
    const supabase = await createClient()

    // 1) Fetch settings (key-value) and also keep a single row for "presence" indication
    const { data: settingsAll, error: settingsAllError } = await supabase.from("journal_settings").select("*")
    const settingsRow = Array.isArray(settingsAll) && settingsAll.length > 0 ? settingsAll[0] : null

    // Helper to read settings from key/value tables (and tolerate alternate shapes)
    const getSetting = (...keys: string[]): string | null => {
      if (!Array.isArray(settingsAll) || settingsAll.length === 0) return null
      const lowered = keys.map((k) => k.toLowerCase())
      for (const row of settingsAll as any[]) {
        // Standard shape: setting_key, setting_value
        if (row && typeof row === "object" && "setting_key" in row && "setting_value" in row) {
          const k = String(row.setting_key ?? "").toLowerCase()
          if (lowered.includes(k)) return row.setting_value ?? null
        }
        // Alternate shape: key, value
        if (row && typeof row === "object" && "key" in row && "value" in row) {
          const k = String(row.key ?? "").toLowerCase()
          if (lowered.includes(k)) return row.value ?? null
        }
      }
      return null
    }

    // 2) Determine what the app would consider the "current" issue by date/status
    const statusOr = "status.is.null,status.eq.published,status.eq.Published,status.eq.PUBLISHED"

    const { data: latestIssueByDate, error: latestIssueError } = await supabase
      .from("issues")
      .select("*")
      .or(statusOr)
      .order("publication_date", { ascending: false, nullsFirst: false })
      .order("issue_number", { ascending: false })
      .limit(1)
      .maybeSingle()

    // 3) If settings define a current issue override, fetch it for comparison
    let overrideIssue: any = null
    const overrideIssueStr = getSetting("current_issue_number", "current_issue", "currentissue")
    const overrideVolumeStr = getSetting("current_volume", "currentvolume")
    const overrideIssueNum =
      overrideIssueStr && !Number.isNaN(Number.parseInt(overrideIssueStr)) ? Number.parseInt(overrideIssueStr) : null
    const overrideVolumeNum =
      overrideVolumeStr && !Number.isNaN(Number.parseInt(overrideVolumeStr)) ? Number.parseInt(overrideVolumeStr) : null

    if (overrideIssueNum != null) {
      let q = supabase.from("issues").select("*").eq("issue_number", overrideIssueNum).or(statusOr).limit(1)
      if (overrideVolumeNum != null) {
        q = q.eq("volume", overrideVolumeNum)
      }
      const { data: override, error: overrideErr } = await q.maybeSingle()
      if (!overrideErr) {
        overrideIssue = override
      }
      console.log(
        "[v0] override query:",
        JSON.stringify({
          issue_number: overrideIssueNum,
          volume_value: overrideVolumeNum,
          error: overrideErr?.message || null,
        }),
      )
    }

    // 4) Fetch a small sample of issues to display and compare
    const { data: issuesSample, error: sampleError } = await supabase
      .from("issues")
      .select("id, volume, issue_number, status, publication_date")
      .order("volume", { ascending: false })
      .order("issue_number", { ascending: false })
      .limit(10)

    // 5) Build warnings if there is a mismatch
    const warnings: string[] = []
    if (overrideIssueNum != null) {
      const latestIssueNum = Number(latestIssueByDate?.issue_number ?? Number.NaN)
      if (!Number.isNaN(latestIssueNum) && overrideIssueNum !== latestIssueNum) {
        warnings.push(
          `journal_settings current_issue_number=${overrideIssueNum} does not match the latest issue by date=${latestIssueNum}.`,
        )
      }
      if (overrideIssue && overrideIssue.issue_number !== overrideIssueNum) {
        warnings.push(`Override fetch did not return the expected issue_number=${overrideIssueNum}.`)
      }
    }

    console.log("[v0] diagnostics summary:", {
      settingsPresent: Boolean(settingsRow),
      latestIssueByDate: latestIssueByDate
        ? {
            volume: latestIssueByDate.volume,
            issue_number: latestIssueByDate.issue_number,
            status: latestIssueByDate.status,
            publication_date: latestIssueByDate.publication_date,
          }
        : null,
      overrideIssue: overrideIssue
        ? {
            volume: overrideIssue.volume,
            issue_number: overrideIssue.issue_number,
            status: overrideIssue.status,
            publication_date: overrideIssue.publication_date,
          }
        : null,
      issuesSampleCount: issuesSample?.length ?? 0,
      warnings,
      settingsError: settingsAllError?.message ?? null,
      latestIssueError: latestIssueError?.message ?? null,
      sampleError: sampleError?.message ?? null,
    })

    return Response.json(
      {
        ok: true,
        settingsRow,
        latestIssueByDate,
        overrideIssue,
        issuesSample,
        warnings,
        errors: {
          settingsError: settingsAllError?.message ?? null,
          latestIssueError: latestIssueError?.message ?? null,
          sampleError: sampleError?.message ?? null,
        },
      },
      { status: 200 },
    )
  } catch (err: any) {
    console.log("[v0] diagnostics fatal error:", err?.message || err)
    return Response.json({ ok: false, error: err?.message || "Unknown error" }, { status: 500 })
  }
}
