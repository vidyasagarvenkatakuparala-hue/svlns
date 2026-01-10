"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Eye, Calendar, BookOpen, Sparkles } from "lucide-react"
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
    let filtered = issues

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (issue) =>
          issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (issue.description && issue.description.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Filter by year
    if (selectedYear !== "all") {
      filtered = filtered.filter((issue) => issue.year.toString() === selectedYear)
    }

    setFilteredIssues(filtered)
  }, [searchTerm, selectedYear, issues])

  const fetchArchiveData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch all published issues
      const { data: issuesData, error: issuesError } = await supabase
        .from("issues")
        .select("*")
        .eq("status", "published")
        .order("year", { ascending: false })
        .order("volume", { ascending: false })
        .order("issue_number", { ascending: false })

      if (issuesError) {
        console.error("Issues error:", issuesError)
        setError("Failed to load issues from database.")
        return
      }

      setIssues(issuesData || [])
      setFilteredIssues(issuesData || [])

      // Fetch all published articles
      const { data: articlesData, error: articlesError } = await supabase
        .from("articles")
        .select(`
          *,
          primary_author:authors(first_name,last_name,affiliation)
        `)
        .eq("status", "published")
        .order("publication_date", { ascending: false })

      if (articlesError) {
        console.error("Articles error:", articlesError)
        // Don't set error here, just log it
      } else {
        setArticles(articlesData || [])
      }
    } catch (error) {
      console.error("Error fetching archive data:", error)
      setError("An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  const years = Array.from(new Set(issues.map((issue) => issue.year))).sort((a, b) => b - a)
  const subjects = Array.from(new Set(articles.map((article) => article.subject_area))).sort()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading archives...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchArchiveData}>Try Again</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
            Journal Archives
          </h1>
          <p className="text-xl text-gray-700">
            Complete collection of published issues and articles with full-text access
          </p>
        </div>

        {/* Search and Filter Section */}
        <Card className="mb-8 border-0 shadow-xl bg-white/90 backdrop-blur">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-6 w-6" />
              <span>Search Archives</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Input
                  placeholder="Search issues, articles, authors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border-purple-200 focus:border-purple-500"
                />
              </div>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="border-purple-200 focus:border-purple-500">
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
                <SelectTrigger className="border-purple-200 focus:border-purple-500">
                  <SelectValue placeholder="Subject Area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Published Issues */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
            Published Issues
          </h2>
          {filteredIssues.length === 0 ? (
            <Card className="text-center p-8">
              <p className="text-gray-600">No issues found matching your criteria.</p>
            </Card>
          ) : (
            <div className="grid md:grid-cols-1 gap-6">
              {filteredIssues.map((issue, index) => (
                <Card
                  key={issue.id}
                  className="hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-r from-orange-50 to-pink-50"
                >
                  <CardHeader className="bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-t-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-white">
                          Volume {issue.volume}, Issue {issue.issue_number} ({issue.year})
                        </CardTitle>
                        <CardDescription className="text-orange-100 text-base font-medium mt-1">
                          {issue.title}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        {issue.is_special_issue && (
                          <Badge className="bg-yellow-400 text-yellow-900 border-0">Special Issue</Badge>
                        )}
                        <Badge className="bg-green-400 text-green-900 border-0">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Published
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        {issue.description && <p className="text-gray-700 mb-4">{issue.description}</p>}
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-orange-500" />
                            <span>Published: {new Date(issue.publication_date).toLocaleDateString()}</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <BookOpen className="h-4 w-4 text-pink-500" />
                            <span>{issue.article_count} Articles</span>
                          </li>
                          {issue.total_pages && (
                            <li className="flex items-center space-x-2">
                              <span className="text-gray-600">Pages: {issue.total_pages}</span>
                            </li>
                          )}
                        </ul>
                        <div className="mt-4 flex space-x-2">
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Issue
                          </Button>
                        {issue.pdf_url && (
  <a
    href={issue.pdf_url}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center px-3 py-2 border border-orange-500 text-orange-600 rounded-md hover:bg-orange-50"
  >
    <Download className="h-4 w-4 mr-2" />
    Download PDF
  </a>
)}

                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Featured Articles */}
        {articles.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Featured Articles
            </h2>
            <div className="space-y-6">
              {articles.slice(0, 5).map((article, index) => (
                <Card
                  key={article.id}
                  className="hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur"
                >
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
                    <CardTitle className="text-lg leading-tight text-white">{article.title}</CardTitle>
                    <CardDescription className="text-blue-100">
                      <span className="font-medium">
                        {article.primary_author
                          ? `${article.primary_author.first_name} ${article.primary_author.last_name}`
                          : "Unknown Author"}
                      </span>
                      {article.co_authors && article.co_authors.length > 0 && (
                        <span>, {article.co_authors.map((author: any) => author.name).join(", ")}</span>
                      )}
                      <br />
                      <span className="text-sm">
                        Vol. {article.volume}, Issue {article.issue}
                        {article.pages && `, pp. ${article.pages}`}
                        {article.doi && ` | DOI: ${article.doi}`}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-sm text-gray-700 mb-4 line-clamp-3">{article.abstract}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.keywords.map((keyword, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs border-purple-300 text-purple-700">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Read Full Text
                      </Button>
                     {article.github_url && (
  <a
    href={article.github_url}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-md"
  >
    <Eye className="h-4 w-4 mr-2" />
    Read Full Text
  </a>
)}
{article.manuscript_file_url && (
  <a
    href={article.manuscript_file_url}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center px-3 py-2 border border-purple-500 text-purple-600 rounded-md hover:bg-purple-50"
  >
    <Download className="h-4 w-4 mr-2" />
    Download PDF
  </a>
)}

                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Archive Statistics */}
        <Card className="mb-8 border-0 shadow-xl bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-t-lg">
            <CardTitle>Archive Statistics</CardTitle>
            <CardDescription className="text-green-100">
              Overview of published content and journal metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{issues.length}</div>
                <div className="text-sm text-gray-600">Issues Published</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{articles.length}</div>
                <div className="text-sm text-gray-600">Total Articles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {issues.reduce((sum, issue) => sum + issue.article_count, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Pages</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">{subjects.length}</div>
                <div className="text-sm text-gray-600">Subject Areas</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
