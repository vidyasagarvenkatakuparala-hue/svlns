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
          primary_author:authors(first_name,last_name)
        `,
        )
        .eq("status", "published")

      setArticles(articlesData ?? [])
    } finally {
      setLoading(false)
    }
  }

  const years = Array.from(new Set(issues.map((i) => i.year))).sort(
    (a, b) => b - a,
  )

  const subjects = Array.from(
    new Set(
      articles
        .map((a) => a.subject_area)
        .filter((s): s is string => Boolean(s)),
    ),
  )

  if (loading) {
    return <div className="p-20 text-center">Loading…</div>
  }

  if (error) {
    return <div className="p-20 text-center text-red-600">{error}</div>
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4">

        {/* Search */}
        <Card className="mb-8">
          <CardContent className="grid md:grid-cols-3 gap-4">
            <Input
              placeholder="Search issues…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {years.map((y) => (
                  <SelectItem key={y} value={y.toString()}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedSubject}
              onValueChange={setSelectedSubject}
            >
              <SelectTrigger>
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
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
                  Volume {issue.volume}, Issue {issue.issue_number}
                </CardTitle>
                <CardDescription>{issue.title}</CardDescription>
              </CardHeader>
              <CardContent>
                {issue.description && <p>{issue.description}</p>}

                <div className="mt-4 flex gap-2">
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

        {/* Articles */}
        <section className="mt-12 space-y-6">
          {articles.slice(0, 5).map((article) => (
            <Card key={article.id}>
              <CardHeader>
                <CardTitle>{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3">{article.abstract}</p>

                {Array.isArray(article.keywords) && (
                  <div className="flex flex-wrap gap-2">
                    {article.keywords.map((k) => (
                      <Badge key={k} variant="outline">
                        {k}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </section>

      </div>
    </div>
  )
}
