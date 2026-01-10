"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Eye, Calendar, BookOpen, Sparkles, FileText } from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { Issue, Article } from "@/lib/supabase"

export default function ArchivesPage() {
  const router = useRouter()
  const [issues, setIssues] = useState<Issue[]>([])
  const [articles, setArticles] = useState<Article[]>([])
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedYear, setSelectedYear] = useState("all")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [downloading, setDownloading] = useState<string | null>(null)

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

      // Fetch all published issues and those with NULL status
      const { data: issuesData, error: issuesError } = await supabase
        .from("issues")
        .select("*")
        .or("status.eq.published,status.is.null")
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

      // Fetch all published articles and those with NULL status
      const { data: articlesData, error: articlesError } = await supabase
        .from("articles")
        .select(`
          *,
          primary_author:authors(first_name,last_name,affiliation)
        `)
        .or("status.eq.published,status.is.null")
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

  const handleDownloadIssue = async (issueId: string, title: string) => {
    try {
      setDownloading(`issue-${issueId}`)
      console.log("[v0] handleDownloadIssue start:", { issueId, title })

      const { data: issueData, error: issueError } = await supabase
        .from("issues")
        .select("cover_image_url, volume, issue_number")
        .eq("id", issueId)
        .single()

      console.log("[v0] handleDownloadIssue issueData:", issueData, "issueError:", issueError)

      if (issueError) {
        console.error("Error fetching issue:", issueError)
        alert("Failed to retrieve the issue. Please try again later.")
        return
      }

      const { data: issuePdfLinks, error: linksError } = await supabase
        .from("github_links")
        .select("github_url, is_primary, file_type")
        .eq("entity_type", "issue")
        .eq("entity_id", issueId)
        .eq("file_type", "pdf")
        .order("is_primary", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(1)

      console.log("[v0] handleDownloadIssue links:", issuePdfLinks, "linksError:", linksError)

      if (!linksError && issuePdfLinks && issuePdfLinks.length > 0) {
        const pdfUrl = issuePdfLinks[0].github_url
        if (pdfUrl) {
          const link = document.createElement("a")
          link.href = pdfUrl
          link.setAttribute("download", `${title.replace(/\s+/g, "_")}.pdf`)
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          return
        }
      }

      console.log("[v0] handleDownloadIssue cover_image_url:", issueData?.cover_image_url)

      // Fallback to cover image if it's actually a PDF
      if (issueData?.cover_image_url && issueData.cover_image_url.endsWith(".pdf")) {
        const link = document.createElement("a")
        link.href = issueData.cover_image_url
        link.setAttribute("download", `${title.replace(/\s+/g, "_")}.pdf`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        return
      }

      // Final fallback: first article in this issue with a PDF
      const { data: articlesData, error: articlesError } = await supabase
        .from("articles")
        .select("github_pdf_url, manuscript_file_url")
        .eq("volume", issueData.volume)
        .eq("issue", issueData.issue_number)
        .or("status.eq.published,status.is.null")
        .limit(1)

      console.log("[v0] handleDownloadIssue article fallback:", articlesData, "articlesError:", articlesError)

      if (articlesError) {
        console.error("Error fetching articles:", articlesError)
        alert("No PDF available for this issue.")
        return
      }

      if (articlesData && articlesData.length > 0) {
        const pdfUrl = articlesData[0].github_pdf_url || articlesData[0].manuscript_file_url
        if (pdfUrl) {
          const link = document.createElement("a")
          link.href = pdfUrl
          link.setAttribute("download", `${title.replace(/\s+/g, "_")}_sample_article.pdf`)
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          return
        }
      }

      alert("No PDF available for this issue.")
    } catch (error) {
      console.error("Error downloading issue:", error)
      alert("Failed to download the issue. Please try again later.")
    } finally {
      setDownloading(null)
    }
  }

  const handleReadArticle = (articleId: string) => {
    // For now, let's open the PDF in a new tab since we don't have article pages
    const article = articles.find((a) => a.id === articleId)
    if (article) {
      const pdfUrl = article.github_pdf_url || article.manuscript_file_url

      if (pdfUrl) {
        window.open(pdfUrl, "_blank")
      } else {
        alert("Full text is not available for this article.")
      }
    }
  }

  const handleViewIssue = (issueId: string) => {
    // For now, let's show a modal with issue details since we don't have issue pages
    const issue = issues.find((i) => i.id === issueId)
    if (issue) {
      alert(
        `Issue: Volume ${issue.volume}, Issue ${issue.issue_number} (${issue.year})\n\n${issue.description || "No description available."}`,
      )
    }
  }

  const years = Array.from(
    new Set(issues.map((issue) => issue.year).filter((y): y is number => typeof y === "number" && !Number.isNaN(y))),
  ).sort((a, b) => b - a)

  const subjects = Array.from(
    new Set(
      articles
        .map((article) => article.subject_area)
        .filter((s): s is string => typeof s === "string" && s.trim().length > 0),
    ),
  ).sort()

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
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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
                        {issue.status === "published" ? (
                          <Badge className="bg-green-400 text-green-900 border-0">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Published
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-300 text-gray-800 border-0">Legacy</Badge>
                        )}
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
                            <span>
                              {issue.publication_date
                                ? `Published: ${new Date(issue.publication_date).toLocaleDateString()}`
                                : "Publication date unavailable"}
                            </span>
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
                            onClick={() => handleViewIssue(issue.id)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Issue
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-orange-500 text-orange-600 hover:bg-orange-50 bg-transparent"
                            onClick={() => handleDownloadIssue(issue.id, issue.title)}
                            disabled={downloading === `issue-${issue.id}`}
                          >
                            {downloading === `issue-${issue.id}` ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500 mr-2"></div>
                                Downloading...
                              </>
                            ) : (
                              <>
                                <Download className="h-4 w-4 mr-2" />
                                Download PDF
                              </>
                            )}
                          </Button>
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
                      {article.keywords &&
                        article.keywords.map((keyword, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs border-purple-300 text-purple-700">
                            {keyword}
                          </Badge>
                        ))}
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                        onClick={() => handleReadArticle(article.id)}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Read Full Text
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-purple-500 text-purple-600 hover:bg-purple-50 bg-transparent"
                        onClick={() => {
                          const pdfUrl = article.github_pdf_url || article.manuscript_file_url
                          if (pdfUrl) {
                            const link = document.createElement("a")
                            link.href = pdfUrl
                            link.setAttribute("download", `${article.title.replace(/\s+/g, "_")}.pdf`)
                            document.body.appendChild(link)
                            link.click()
                            document.body.removeChild(link)
                          } else {
                            alert("PDF not available for this article.")
                          }
                        }}
                        disabled={downloading === article.id}
                      >
                        {downloading === article.id ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500 mr-2"></div>
                            Downloading...
                          </>
                        ) : (
                          <>
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                          </>
                        )}
                      </Button>
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
                  {issues.reduce((sum, issue) => sum + (issue.article_count || 0), 0)}
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
