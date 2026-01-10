import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Updated database types - consistent with database schema
export interface Author {
  id: string
  first_name: string
  last_name: string
  email: string
  affiliation: string
  department?: string
  position?: string
  orcid_id?: string
  bio?: string
  profile_image_url?: string
  phone?: string
  office_location?: string
  created_at: string
  updated_at: string
}

export interface Article {
  id: string
  title: string
  abstract: string
  keywords: string[]
  article_type:
    | "research_article"
    | "review_article"
    | "short_communication"
    | "case_study"
    | "editorial"
    | "letter_to_editor"
  subject_area: string
  intended_audience?: string
  primary_author_id: string
  corresponding_author_email: string
  co_authors?: any[]
  manuscript_file_url?: string
  supplementary_files?: any[]
  cover_letter?: string
  ethics_declaration?: string
  permissions_note?: string
  funding_information?: string
  conflict_of_interest?: string
  submission_date: string
  publication_date?: string
  status: "submitted" | "under_review" | "revision_required" | "accepted" | "published" | "rejected"
  volume?: number
  issue?: number
  pages?: string
  doi?: string
  github_content_url?: string
  github_pdf_url?: string
  github_metadata_url?: string
  word_count?: number
  page_count?: number
  download_count: number
  citation_count: number
  created_at: string
  updated_at: string
  primary_author?: Author
}

export interface Issue {
  id: string
  volume: number
  issue_number: number
  year: number
  title: string
  description?: string
  publication_date: string
  is_special_issue: boolean
  special_issue_theme?: string
  cover_image_url?: string
  issue.pdf_url?: string
  pdf_url?: string
  cover_image_url?: string 
  status: "draft" | "published" | "archived"
  article_count: number
  total_pages?: string
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  article_id: string
  reviewer_id: string
  status: "pending" | "accepted" | "declined" | "completed"
  recommendation?: "accept" | "minor_revision" | "major_revision" | "reject"
  comments?: string
  confidential_comments?: string
  review_file_url?: string
  submitted_at?: string
  created_at: string
  updated_at: string
}

export interface EditorialBoardMember {
  id: string
  first_name: string
  last_name: string
  position: string
  affiliation?: string
  email?: string
  bio?: string
  expertise_areas?: string[]
  profile_url?: string   // ✅ New field for profile link
  is_active?: boolean
  order_position?: number
  created_at: string
  updated_at: string
}

export interface Faculty {
  id: string
  first_name: string
  last_name: string
  email: string
  department: string
  position: string
  expertise_areas: string[]
  research_interests?: string
  publications_count: number
  experience_years: number
  phone?: string
  office_location?: string
  bio?: string
  profile_image_url?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Reviewer {
  id: string
  first_name: string
  last_name: string
  email: string
  affiliation: string
  expertise_areas: string[]
  bio?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface JournalSettings {
  id: string
  setting_key: string
  setting_value: string
  description?: string
  created_at: string
  updated_at: string
}

export interface Submission {
  id: string
  title: string
  authors: string
  email: string
  institution: string
  abstract: string
  keywords: string
  pdf_url?: string
  year: number
  status: "submitted" | "under_review" | "accepted" | "rejected"
  created_at: string
  updated_at: string
}
