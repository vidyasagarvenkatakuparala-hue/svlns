"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
  FileText,
  Upload,
  CheckCircle,
  Clock,
  Users,
  BarChart3,
  Plus,
  Eye,
  Edit,
  Download,
  Save,
  X,
} from "lucide-react"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

interface Author {
  id: string
  first_name: string
  last_name: string
  email: string
  affiliation: string
  department?: string
  position?: string
  orcid_id?: string
}

interface Article {
  id: string
  title: string
  abstract: string
  keywords: string[]
  article_type: string
  subject_area: string
  intended_audience?: string
  special_issue?: string
  status: string
  volume?: number
  issue?: number
  pages?: string
  doi?: string
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
  word_count?: number
  page_count?: number
  primary_author?: Author
}

interface ArticleFormData {
  title: string
  abstract: string
  keywords: string[]
  article_type: string
  subject_area: string
  intended_audience: string
  special_issue: string
  corresponding_author_email: string
  co_authors: Array<{
    name: string
    email: string
    affiliation: string
    orcid_id?: string
  }>
  manuscript_file_url: string
  supplementary_files: Array<{
    name: string
    url: string
    description: string
  }>
  figures_tables: Array<{
    name: string
    url: string
    caption: string
  }>
  cover_letter: string
  ethics_declaration: string
  permissions_note: string
  funding_information: string
  conflict_of_interest: string
  word_count: number
  page_count: number
}

interface PublishFormData {
  articleId: string
  volume: number
  issue: number
  pages: string
  doi: string
}

export default function AdminPublishPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [authors, setAuthors] = useState<Author[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("submissions")

  // Form states
  const [articleForm, setArticleForm] = useState<ArticleFormData>({
    title: "",
    abstract: "",
    keywords: [],
    article_type: "research_article",
    subject_area: "",
    intended_audience: "",
    special_issue: "",
    corresponding_author_email: "",
    co_authors: [],
    manuscript_file_url: "",
    supplementary_files: [],
    figures_tables: [],
    cover_letter: "",
    ethics_declaration: "",
    permissions_note: "",
    funding_information: "",
    conflict_of_interest: "",
    word_count: 0,
    page_count: 0,
  })

  const [publishForm, setPublishForm] = useState<PublishFormData>({
    articleId: "",
    volume: 1,
    issue: 1,
    pages: "",
    doi: "",
  })

  const [stats, setStats] = useState({
    total_submissions: 0,
    published: 0,
    under_review: 0,
    pending: 0,
    this_month: 0,
  })

  const [keywordInput, setKeywordInput] = useState("")
  const [selectedAuthorId, setSelectedAuthorId] = useState("")

  useEffect(() => {
    fetchArticles()
    fetchAuthors()
    fetchStats()
  }, [])

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select(`
          *,
          primary_author:primary_author_id (
            id,
            first_name,
            last_name,
            email,
            affiliation,
            department,
            position,
            orcid_id
          )
        `)
        .order("submission_date", { ascending: false })

      if (error) throw error
      setArticles(data || [])
    } catch (error) {
      console.error("Error fetching articles:", error)
      toast.error("Failed to fetch articles")
    } finally {
      setLoading(false)
    }
  }

  const fetchAuthors = async () => {
    try {
      const { data, error } = await supabase.from("authors").select("*").order("last_name", { ascending: true })

      if (error) throw error
      setAuthors(data || [])
    } catch (error) {
      console.error("Error fetching authors:", error)
    }
  }

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase.rpc("get_submission_stats")
      if (error) throw error
      setStats(data || {})
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  const handleSubmitArticle = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedAuthorId) {
      toast.error("Please select a primary author")
      return
    }

    try {
      const { error } = await supabase.from("articles").insert({
        title: articleForm.title,
        abstract: articleForm.abstract,
        keywords: articleForm.keywords,
        article_type: articleForm.article_type,
        subject_area: articleForm.subject_area,
        intended_audience: articleForm.intended_audience || null,
        special_issue: articleForm.special_issue || null,
        primary_author_id: selectedAuthorId,
        corresponding_author_email: articleForm.corresponding_author_email,
        co_authors: articleForm.co_authors,
        manuscript_file_url: articleForm.manuscript_file_url || null,
        supplementary_files: articleForm.supplementary_files,
        figures_tables: articleForm.figures_tables,
        cover_letter: articleForm.cover_letter || null,
        ethics_declaration: articleForm.ethics_declaration || null,
        permissions_note: articleForm.permissions_note || null,
        funding_information: articleForm.funding_information || null,
        conflict_of_interest: articleForm.conflict_of_interest || null,
        word_count: articleForm.word_count || null,
        page_count: articleForm.page_count || null,
        status: "submitted",
      })

      if (error) throw error

      toast.success("Article submitted successfully!")
      fetchArticles()
      fetchStats()

      // Reset form
      setArticleForm({
        title: "",
        abstract: "",
        keywords: [],
        article_type: "research_article",
        subject_area: "",
        intended_audience: "",
        special_issue: "",
        corresponding_author_email: "",
        co_authors: [],
        manuscript_file_url: "",
        supplementary_files: [],
        figures_tables: [],
        cover_letter: "",
        ethics_declaration: "",
        permissions_note: "",
        funding_information: "",
        conflict_of_interest: "",
        word_count: 0,
        page_count: 0,
      })
      setSelectedAuthorId("")
    } catch (error) {
      console.error("Error submitting article:", error)
      toast.error("Failed to submit article")
    }
  }

  const handlePublishArticle = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const { error } = await supabase.rpc("publish_article", {
        article_id: publishForm.articleId,
        volume_num: publishForm.volume,
        issue_num: publishForm.issue,
        page_range: publishForm.pages,
        doi_string: publishForm.doi || null,
      })

      if (error) throw error

      toast.success("Article published successfully!")
      fetchArticles()
      fetchStats()

      // Reset form
      setPublishForm({
        articleId: "",
        volume: 1,
        issue: 1,
        pages: "",
        doi: "",
      })
    } catch (error) {
      console.error("Error publishing article:", error)
      toast.error("Failed to publish article")
    }
  }

  const updateArticleStatus = async (articleId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("articles")
        .update({
          status: newStatus,
          updated_at: new Date().toISOString(),
        })
        .eq("id", articleId)

      if (error) throw error

      toast.success(`Article status updated to ${newStatus}`)
      fetchArticles()
      fetchStats()
    } catch (error) {
      console.error("Error updating article status:", error)
      toast.error("Failed to update article status")
    }
  }

  const addKeyword = () => {
    if (keywordInput.trim() && !articleForm.keywords.includes(keywordInput.trim())) {
      setArticleForm((prev) => ({
        ...prev,
        keywords: [...prev.keywords, keywordInput.trim()],
      }))
      setKeywordInput("")
    }
  }

  const removeKeyword = (keyword: string) => {
    setArticleForm((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((k) => k !== keyword),
    }))
  }

  const addCoAuthor = () => {
    setArticleForm((prev) => ({
      ...prev,
      co_authors: [...prev.co_authors, { name: "", email: "", affiliation: "", orcid_id: "" }],
    }))
  }

  const removeCoAuthor = (index: number) => {
    setArticleForm((prev) => ({
      ...prev,
      co_authors: prev.co_authors.filter((_, i) => i !== index),
    }))
  }

  const updateCoAuthor = (index: number, field: string, value: string) => {
    setArticleForm((prev) => ({
      ...prev,
      co_authors: prev.co_authors.map((author, i) => (i === index ? { ...author, [field]: value } : author)),
    }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "accepted":
        return "bg-blue-100 text-blue-800"
      case "under_review":
        return "bg-yellow-100 text-yellow-800"
      case "revision_required":
        return "bg-orange-100 text-orange-800"
      case "submitted":
        return "bg-gray-100 text-gray-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Journal Administration Portal</h1>
          <p className="text-gray-600">SVLNS GDC Multidisciplinary Journal - Manage submissions and publications</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total_submissions}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Published</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.published}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Under Review</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.under_review}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-indigo-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.this_month}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="submissions">Manage Submissions</TabsTrigger>
            <TabsTrigger value="add-article">Add New Article</TabsTrigger>
            <TabsTrigger value="publish">Publish Articles</TabsTrigger>
            <TabsTrigger value="issues">Manage Issues</TabsTrigger>
          </TabsList>

          {/* Submissions Management */}
          <TabsContent value="submissions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Article Submissions</CardTitle>
                <CardDescription>Review and manage submitted articles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {articles.map((article) => (
                    <Card key={article.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {article.primary_author?.first_name} {article.primary_author?.last_name} -{" "}
                              {article.primary_author?.affiliation}
                            </p>
                            <p className="text-sm text-gray-500 mb-3 line-clamp-2">{article.abstract}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {article.keywords.map((keyword, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>Type: {article.article_type.replace("_", " ")}</span>
                              <span>Subject: {article.subject_area}</span>
                              <span>Submitted: {new Date(article.submission_date).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge className={getStatusColor(article.status)}>{article.status.replace("_", " ")}</Badge>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Select
                                value={article.status}
                                onValueChange={(value) => updateArticleStatus(article.id, value)}
                              >
                                <SelectTrigger className="w-40">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="submitted">Submitted</SelectItem>
                                  <SelectItem value="under_review">Under Review</SelectItem>
                                  <SelectItem value="revision_required">Revision Required</SelectItem>
                                  <SelectItem value="accepted">Accepted</SelectItem>
                                  <SelectItem value="published">Published</SelectItem>
                                  <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Add New Article */}
          <TabsContent value="add-article" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Article</CardTitle>
                <CardDescription>Submit a new article with comprehensive details</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitArticle} className="space-y-8">
                  {/* Article Details Section */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Article Details</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          value={articleForm.title}
                          onChange={(e) => setArticleForm((prev) => ({ ...prev, title: e.target.value }))}
                          placeholder="Enter the article title"
                          required
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="abstract">Abstract *</Label>
                        <Textarea
                          id="abstract"
                          value={articleForm.abstract}
                          onChange={(e) => setArticleForm((prev) => ({ ...prev, abstract: e.target.value }))}
                          placeholder="Brief summary of the article's content"
                          rows={6}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="article_type">Article Type *</Label>
                        <Select
                          value={articleForm.article_type}
                          onValueChange={(value) => setArticleForm((prev) => ({ ...prev, article_type: value }))}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="research_article">Research Article</SelectItem>
                            <SelectItem value="review_article">Review Article</SelectItem>
                            <SelectItem value="case_study">Case Study</SelectItem>
                            <SelectItem value="short_communication">Short Communication</SelectItem>
                            <SelectItem value="editorial">Editorial</SelectItem>
                            <SelectItem value="letter_to_editor">Letter to Editor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject_area">Subject Area *</Label>
                        <Input
                          id="subject_area"
                          value={articleForm.subject_area}
                          onChange={(e) => setArticleForm((prev) => ({ ...prev, subject_area: e.target.value }))}
                          placeholder="e.g., Environmental Science, History"
                          required
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="intended_audience">Intended Audience</Label>
                        <Textarea
                          id="intended_audience"
                          value={articleForm.intended_audience}
                          onChange={(e) => setArticleForm((prev) => ({ ...prev, intended_audience: e.target.value }))}
                          placeholder="Who is the article intended to reach?"
                          rows={2}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="special_issue">Special Issue (if applicable)</Label>
                        <Input
                          id="special_issue"
                          value={articleForm.special_issue}
                          onChange={(e) => setArticleForm((prev) => ({ ...prev, special_issue: e.target.value }))}
                          placeholder="Indicate if for a special issue"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="submission_date">Submission Date</Label>
                        <Input
                          id="submission_date"
                          type="date"
                          defaultValue={new Date().toISOString().split("T")[0]}
                          disabled
                        />
                      </div>
                    </div>

                    {/* Keywords Section */}
                    <div className="space-y-2">
                      <Label>Keywords *</Label>
                      <div className="flex gap-2 mb-2">
                        <Input
                          value={keywordInput}
                          onChange={(e) => setKeywordInput(e.target.value)}
                          placeholder="Enter a keyword"
                          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addKeyword())}
                        />
                        <Button type="button" onClick={addKeyword} size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {articleForm.keywords.map((keyword, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            {keyword}
                            <X className="h-3 w-3 cursor-pointer" onClick={() => removeKeyword(keyword)} />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Author Information Section */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Author Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="primary_author">Primary Author *</Label>
                        <Select value={selectedAuthorId} onValueChange={setSelectedAuthorId} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select primary author" />
                          </SelectTrigger>
                          <SelectContent>
                            {authors.map((author) => (
                              <SelectItem key={author.id} value={author.id}>
                                {author.first_name} {author.last_name} - {author.affiliation}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="corresponding_email">Corresponding Author Email *</Label>
                        <Input
                          id="corresponding_email"
                          type="email"
                          value={articleForm.corresponding_author_email}
                          onChange={(e) =>
                            setArticleForm((prev) => ({ ...prev, corresponding_author_email: e.target.value }))
                          }
                          placeholder="Email address for correspondence"
                          required
                        />
                      </div>
                    </div>

                    {/* Co-Authors Section */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Co-Authors</Label>
                        <Button type="button" onClick={addCoAuthor} size="sm" variant="outline">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Co-Author
                        </Button>
                      </div>

                      {articleForm.co_authors.map((coAuthor, index) => (
                        <Card key={index} className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="space-y-2">
                              <Label>Name</Label>
                              <Input
                                value={coAuthor.name}
                                onChange={(e) => updateCoAuthor(index, "name", e.target.value)}
                                placeholder="Full name"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Email</Label>
                              <Input
                                type="email"
                                value={coAuthor.email}
                                onChange={(e) => updateCoAuthor(index, "email", e.target.value)}
                                placeholder="Email address"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Affiliation</Label>
                              <Input
                                value={coAuthor.affiliation}
                                onChange={(e) => updateCoAuthor(index, "affiliation", e.target.value)}
                                placeholder="Institution/Organization"
                              />
                            </div>
                            <div className="space-y-2 flex items-end">
                              <Button
                                type="button"
                                onClick={() => removeCoAuthor(index)}
                                size="sm"
                                variant="destructive"
                                className="w-full"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="mt-4 space-y-2">
                            <Label>ORCID ID (Optional)</Label>
                            <Input
                              value={coAuthor.orcid_id || ""}
                              onChange={(e) => updateCoAuthor(index, "orcid_id", e.target.value)}
                              placeholder="0000-0000-0000-0000"
                            />
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* File Uploads Section */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">File Uploads</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="manuscript_file">Manuscript File URL</Label>
                        <Input
                          id="manuscript_file"
                          value={articleForm.manuscript_file_url}
                          onChange={(e) => setArticleForm((prev) => ({ ...prev, manuscript_file_url: e.target.value }))}
                          placeholder="URL to the manuscript file"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="word_count">Word Count</Label>
                          <Input
                            id="word_count"
                            type="number"
                            value={articleForm.word_count}
                            onChange={(e) =>
                              setArticleForm((prev) => ({ ...prev, word_count: Number.parseInt(e.target.value) || 0 }))
                            }
                            placeholder="0"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="page_count">Page Count</Label>
                          <Input
                            id="page_count"
                            type="number"
                            value={articleForm.page_count}
                            onChange={(e) =>
                              setArticleForm((prev) => ({ ...prev, page_count: Number.parseInt(e.target.value) || 0 }))
                            }
                            placeholder="0"
                          />
                        </div>
                      </div>
                    </div>

                    <Alert>
                      <Upload className="h-4 w-4" />
                      <AlertDescription>
                        File upload functionality will be implemented with cloud storage integration. For now, please
                        provide direct URLs to the files.
                      </AlertDescription>
                    </Alert>
                  </div>

                  <Separator />

                  {/* Additional Information Section */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Additional Information</h3>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="cover_letter">Cover Letter</Label>
                        <Textarea
                          id="cover_letter"
                          value={articleForm.cover_letter}
                          onChange={(e) => setArticleForm((prev) => ({ ...prev, cover_letter: e.target.value }))}
                          placeholder="Brief letter introducing the article and author"
                          rows={4}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="ethics_declaration">Ethics Declaration</Label>
                        <Textarea
                          id="ethics_declaration"
                          value={articleForm.ethics_declaration}
                          onChange={(e) => setArticleForm((prev) => ({ ...prev, ethics_declaration: e.target.value }))}
                          placeholder="Statement about ethical considerations, plagiarism, data reuse, etc."
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="permissions_note">Permissions</Label>
                        <Textarea
                          id="permissions_note"
                          value={articleForm.permissions_note}
                          onChange={(e) => setArticleForm((prev) => ({ ...prev, permissions_note: e.target.value }))}
                          placeholder="If any copyrighted material is included, note permissions here"
                          rows={2}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="funding_information">Funding Information</Label>
                        <Textarea
                          id="funding_information"
                          value={articleForm.funding_information}
                          onChange={(e) => setArticleForm((prev) => ({ ...prev, funding_information: e.target.value }))}
                          placeholder="Details about funding sources for the research"
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="conflict_of_interest">Conflict of Interest</Label>
                        <Textarea
                          id="conflict_of_interest"
                          value={articleForm.conflict_of_interest}
                          onChange={(e) =>
                            setArticleForm((prev) => ({ ...prev, conflict_of_interest: e.target.value }))
                          }
                          placeholder="Declare any conflicts of interest"
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-end gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setArticleForm({
                          title: "",
                          abstract: "",
                          keywords: [],
                          article_type: "research_article",
                          subject_area: "",
                          intended_audience: "",
                          special_issue: "",
                          corresponding_author_email: "",
                          co_authors: [],
                          manuscript_file_url: "",
                          supplementary_files: [],
                          figures_tables: [],
                          cover_letter: "",
                          ethics_declaration: "",
                          permissions_note: "",
                          funding_information: "",
                          conflict_of_interest: "",
                          word_count: 0,
                          page_count: 0,
                        })
                        setSelectedAuthorId("")
                      }}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Clear Form
                    </Button>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      <Save className="h-4 w-4 mr-2" />
                      Submit Article
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Publish Articles */}
          <TabsContent value="publish" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Publish Accepted Articles</CardTitle>
                <CardDescription>Assign volume, issue, and page numbers to accepted articles</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePublishArticle} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="article">Select Article</Label>
                      <Select
                        value={publishForm.articleId}
                        onValueChange={(value) => setPublishForm((prev) => ({ ...prev, articleId: value }))}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose an accepted article" />
                        </SelectTrigger>
                        <SelectContent>
                          {articles
                            .filter((article) => article.status === "accepted")
                            .map((article) => (
                              <SelectItem key={article.id} value={article.id}>
                                {article.title.substring(0, 50)}...
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="volume">Volume</Label>
                      <Input
                        id="volume"
                        type="number"
                        min="1"
                        value={publishForm.volume}
                        onChange={(e) =>
                          setPublishForm((prev) => ({ ...prev, volume: Number.parseInt(e.target.value) }))
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="issue">Issue</Label>
                      <Input
                        id="issue"
                        type="number"
                        min="1"
                        value={publishForm.issue}
                        onChange={(e) =>
                          setPublishForm((prev) => ({ ...prev, issue: Number.parseInt(e.target.value) }))
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pages">Page Range</Label>
                      <Input
                        id="pages"
                        placeholder="e.g., 1-15"
                        value={publishForm.pages}
                        onChange={(e) => setPublishForm((prev) => ({ ...prev, pages: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="doi">DOI (Optional)</Label>
                      <Input
                        id="doi"
                        placeholder="e.g., 10.1234/svlns.2024.1.1.001"
                        value={publishForm.doi}
                        onChange={(e) => setPublishForm((prev) => ({ ...prev, doi: e.target.value }))}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-end">
                    <Button type="submit" className="bg-green-600 hover:bg-green-700">
                      <Upload className="h-4 w-4 mr-2" />
                      Publish Article
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Recently Published */}
            <Card>
              <CardHeader>
                <CardTitle>Recently Published Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {articles
                    .filter((article) => article.status === "published")
                    .slice(0, 5)
                    .map((article) => (
                      <div key={article.id} className="flex justify-between items-center p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{article.title}</h4>
                          <p className="text-sm text-gray-600">
                            Vol {article.volume}, Issue {article.issue}, Pages {article.pages}
                          </p>
                          {article.doi && <p className="text-sm text-blue-600">DOI: {article.doi}</p>}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manage Issues */}
          <TabsContent value="issues" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Journal Issues</CardTitle>
                <CardDescription>Create and manage journal issues</CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="mb-6">
                  <Plus className="h-4 w-4" />
                  <AlertDescription>
                    Create new issues to organize published articles by volume and issue number.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <Card className="border-l-4 border-l-green-500">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Volume 1, Issue 1 (2024)</h3>
                          <p className="text-sm text-gray-600 mb-2">
                            Inaugural Issue: Foundations of Multidisciplinary Research
                          </p>
                          <p className="text-sm text-gray-500 mb-3">
                            Celebrating 40 Years of Educational Excellence & Social Transformation
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Published: March 2024</span>
                            <span>Articles: 4</span>
                            <Badge className="bg-green-100 text-green-800">Published</Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-dashed border-2 border-gray-300">
                    <CardContent className="p-6 text-center">
                      <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Create New Issue</h3>
                      <p className="text-gray-600 mb-4">Start planning the next issue of the journal</p>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Issue
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
