"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Download, ArrowLeft } from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { Article } from "@/lib/supabase"

export default function ArticlePage() {
  const params = useParams()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchArticle()
  }, [params.id])

  const fetchArticle = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("articles")
        .select(`
          *,
          primary_author:authors(first_name,last_name,affiliation)
        `)
        .eq("id", params.id)
        .single()

      if (error) {
        setError("Article not found")
        return
      }

      setArticle(data)
    } catch (error) {
      console.error("Error fetching article:", error)
      setError("Failed to load article")
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadPDF = async () => {
    if (!article) return
    
    try {
      // Get the PDF URL from the database
      const { data, error } = await supabase
        .from("articles")
        .select("github_pdf_url, manuscript_file_url")
        .eq("id", article.id)
        .single()

      if (error) {
        console.error("Error fetching PDF URL:", error)
        alert("Failed to retrieve the PDF. Please try again later.")
        return
      }

      // Use the PDF URL (prioritize github_pdf_url, fallback to manuscript_file_url)
      const pdfUrl = data.github_pdf_url || data.manuscript_file_url
      
      if (!pdfUrl) {
        alert("PDF is not available for this article.")
        return
      }

      // Open the PDF in a new tab
      window.open(pdfUrl, "_blank")
    } catch (error) {
      console.error("Error downloading PDF:", error)
      alert("Failed to download the PDF. Please try again later.")
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (error || !article) {
    return <div className="min-h-screen flex items-center justify-center">{error || "Article not found"}</div>
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Button variant="outline" onClick={() => window.history.back()} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Archives
        </Button>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {article.keywords.map((keyword, idx) => (
              <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {keyword}
              </span>
            ))}
          </div>

          <div className="prose max-w-none mb-8">
            <p className="text-gray-700">{article.abstract}</p>
          </div>

          <Button onClick={handleDownloadPDF}>
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  )
}
