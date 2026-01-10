import { createClient } from "@supabase/supabase-js"
import type { FileLocation } from "./multi-cloud-storage"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Extended database types for multi-cloud storage
export interface Article {
  id: string
  title: string
  abstract: string
  keywords: string[]
  article_type: "research" | "review" | "short_communication" | "case_study" | "editorial"
  subject_area: string
  status: "published" | "in_review" | "draft"
  volume: number
  issue: number
  pages: string
  doi?: string

  // Multi-cloud storage references
  github_content_url: string // GitHub markdown content
  github_metadata_url: string // GitHub metadata JSON
  primary_pdf_location: FileLocation // Primary PDF storage
  backup_pdf_locations: FileLocation[] // Backup PDF locations
  supplementary_files: FileLocation[] // Additional files

  author_id: string
  co_authors?: string[]
  publication_date: string
  submission_date: string
  created_at: string
}

export interface CloudFile {
  id: string
  entity_type: "article" | "issue" | "review" | "author_profile" | "supplementary"
  entity_id: string
  file_location: FileLocation
  is_primary: boolean
  created_at: string
  updated_at: string
}

export interface StorageUsage {
  id: string
  provider_type: string
  used_space_mb: number
  total_space_mb: number
  last_updated: string
  health_status: "healthy" | "warning" | "error"
}

// Multi-cloud storage service
export class SupabaseStorageService {
  async saveFileLocation(
    fileLocation: FileLocation,
    entityType: string,
    entityId: string,
    isPrimary = false,
  ): Promise<void> {
    const { error } = await supabase.from("cloud_files").insert({
      entity_type: entityType,
      entity_id: entityId,
      file_location: fileLocation,
      is_primary: isPrimary,
    })

    if (error) throw error
  }

  async getFileLocations(entityType: string, entityId: string): Promise<CloudFile[]> {
    const { data, error } = await supabase
      .from("cloud_files")
      .select("*")
      .eq("entity_type", entityType)
      .eq("entity_id", entityId)

    if (error) throw error
    return data || []
  }

  async updateStorageUsage(providerType: string, usedSpaceMb: number, totalSpaceMb: number): Promise<void> {
    const { error } = await supabase.from("storage_usage").upsert({
      provider_type: providerType,
      used_space_mb: usedSpaceMb,
      total_space_mb: totalSpaceMb,
      last_updated: new Date().toISOString(),
      health_status: "healthy",
    })

    if (error) throw error
  }

  async getStorageUsage(): Promise<StorageUsage[]> {
    const { data, error } = await supabase.from("storage_usage").select("*").order("provider_type")

    if (error) throw error
    return data || []
  }
}

export const storageService = new SupabaseStorageService()
