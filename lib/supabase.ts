import { createClient } from "@supabase/supabase-js"

/**
 * Supabase configuration
 * NOTE: Publishable (anon) key is safe for client-side usage
 */
const supabaseUrl = "https://ruqwyuloesxuxyexhqvp.supabase.co"
const supabaseAnonKey =
  "sb_publishable_vJEPBQ1SHvIu6l1HDaK4Sg_SzL6w0tQ"

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
)

/* =========================
   Type Definitions
========================= */

export type Issue = {
  id: string
  title: string
  description?: string | null
  year: number
  volume: number
  issue_number: number
  publication_date: string
  article_count: number
  total_pages?: number | null
  pdf_url?: string | null
  is_special_issue: boolean
  status: "draft" | "published"
}

export type Article = {
  id: string
  title: string
  abstract?: string | null
  keywords: string[]
  subject_area?: string | null
  volume: number
  issue: number
  pages?: string | null
  doi?: string | null
  publication_date: string
  status: "draft" | "published"
  manuscript_file_url?: string | null
  github_url?: string | null

  primary_author?: {
    first_name: string
    last_name: string
    affiliation?: string | null
  } | null

  co_authors?: {
    name: string
  }[]
}
