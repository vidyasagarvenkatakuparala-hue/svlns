"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { supabase, type Article } from "@/lib/supabase"
import { githubManager } from "@/lib/github-integration"
import { Download, Eye, ExternalLink, Github } from "lucide-react"
import ReactMarkdown from "react-markdown"

interface ArticleViewerProps {
  articleId: string
}

export function ArticleViewer({ articleId }: ArticleViewerProps) {
  const [article, setArticle] = useState<Article | null>(null)
  const [content, setContent] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // Get article metadata from Supabase
        const { data: articleData, error: articleError } = await supabase
          .from("articles")
          .select("*")
          .eq("id", articleId)
          .single()

        if (articleError) throw articleError

        setArticle(articleData)

        // Get full content from GitHub
        const articleContent = await githubManager.getArticleContent(articleData.github_content_url)
        setContent(articleContent)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [articleId])

  const handleDownloadPDF = async () => {
    if (!article) return

    try {
      const pdfBlob = await githubManager.getArticlePDF(article.github_pdf_url)
      const url = URL.createObjectURL(pdfBlob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${article.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error downloading PDF:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article from GitHub...</p>
        </div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6">
          <p className="text-red-600">Error loading article: {error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Article Header */}
      <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl">{article.title}</CardTitle>
          <CardDescription className="text-blue-100">
            Volume {article.volume}, Issue {article.issue} • Pages {article.pages}
            {article.doi && ` • DOI: ${article.doi}`}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className="bg-blue-100 text-blue-800">{article.article_type.replace("_", " ")}</Badge>
            <Badge className="bg-green-100 text-green-800">{article.subject_area}</Badge>
            <Badge className="bg-purple-100 text-purple-800">{article.status}</Badge>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {article.keywords.map((keyword, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {keyword}
              </Badge>
            ))}
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleDownloadPDF}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open(article.github_content_url, "_blank")}
              className="border-purple-500 text-purple-600 hover:bg-purple-50"
            >
              <Github className="h-4 w-4 mr-2" />
              View on GitHub
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open(article.github_pdf_url, "_blank")}
              className="border-green-500 text-green-600 hover:bg-green-50"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Article Content */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="h-5 w-5 text-blue-600" />
            <span>Article Content</span>
          </CardTitle>
          <CardDescription>Content loaded from GitHub repository</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none p-6">
          <ReactMarkdown>{content}</ReactMarkdown>
        </CardContent>
      </Card>

      {/* GitHub Integration Info */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2 text-green-700">
            <Github className="h-4 w-4" />
            <span className="text-sm font-medium">
              This article is stored in GitHub and linked through Supabase for optimal performance and version control.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
