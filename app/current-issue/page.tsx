"use client"

import { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Search,
  Download,
  Eye,
  Calendar,
  BookOpen,
  Sparkles,
} from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { Issue, Article } from "@/lib/supabase"

export default function ArchivesPage() {
  const [issues, setIssues] = useState<Issue[]>([])
  const [articles, setArticles] = useState<Article[]>([])
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedYear, setSelectedYear] = useState("all")
  const [selectedSubject, setSelectedSubject] = useState("all")

  useEffect(() => {
    fetchArchiveData()
  }, [])

  useEffect(() => {
    let filtered = [...issues]

    if (searchTerm) {
      filtered = filtered.filter(
        (issue) =>
          issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          issue.description?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedYear !== "all") {
      filtered = filtered.filter(
        (issue) => issue.year.toString() === selectedYear,
      )
    }

    setFilteredIssues(filtered)
  }, [searchTerm, selectedYear, issues])

  const fetchArchiveData = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data: issuesData, error: issuesError } = await supabase
        .from("issues")
        .select("*")
        .eq("status", "published")
        .order("year", { ascending: false })
        .order("volume", { ascending: false })
        .order("issue_number", { ascending: false })

      if (issuesError) {
        setError("Failed to load issues.")
        return
      }

      setIssues(issuesData ?? [])
      setFilteredIssues(issuesData ?? [])

      const { data: articlesData } = await supabase
        .from("articles")
        .select(
          `
          *,
          primary_author:authors(first_name,last_name,affiliation)
        `,
        )
        .eq("status", "published")
        .order("publication_date", { ascending: false })

      setArticles(articlesData ?? [])
    } catch (err) {
      setError("Unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  const years = Array.from(new Set(issues.map((i) => i.year))).sort(
    (a, b) => b - a,
  )

  const subjects = Array.from(
    new Set(articles.map((a) => a.subject_area).filter(Boolean)),
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={fetchArchiveData}>Retry</Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      <div className="max-w-6xl mx-auto px-4">

        {/* Search */}
        <Card className="mb-10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" /> Search Archives
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4">
            <Input
              placeholder="Search issues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Subject Area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Issues */}
        <section className="space-y-6">
          {filteredIssues.map((issue) => (
            <Card key={issue.id}>
              <CardHeader>
                <CardTitle>
                  Volume {issue.volume}, Issue {issue.issue_number} ({issue.year})
                </CardTitle>
                <CardDescription>{issue.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-3">{issue.description}</p>
                <div className="flex gap-2">
                  <Button size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View Issue
                  </Button>

                  {issue.pdf_url && (
                    <a
                      href={issue.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 border rounded-md"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      PDF
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Statistics */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Archive Statistics</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold">{issues.length}</div>
              <p>Issues</p>
            </div>
            <div>
              <div className="text-2xl font-bold">{articles.length}</div>
              <p>Articles</p>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {issues.reduce((sum, i) => sum + (i.total_pages ?? 0), 0)}
              </div>
              <p>Total Pages</p>
            </div>
            <div>
              <div className="text-2xl font-bold">{subjects.length}</div>
              <p>Subjects</p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
