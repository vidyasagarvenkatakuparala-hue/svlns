"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Mail, Link, FileText, CheckCircle, AlertCircle, Send, X, Plus } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

interface SubmissionFormData {
  title: string
  abstract: string
  keywords: string[]
  articleType: string
  subjectArea: string
  authorName: string
  authorEmail: string
  authorAffiliation: string
  coAuthors: string
  coverLetter: string
  manuscriptUrl: string
  hasEthicsApproval: boolean
  conflictOfInterest: string
  suggestedReviewers: string
  year: number
}

export default function SubmitPage() {
  const [formData, setFormData] = useState<SubmissionFormData>({
    title: "",
    abstract: "",
    keywords: [],
    articleType: "",
    subjectArea: "",
    authorName: "",
    authorEmail: "",
    authorAffiliation: "",
    coAuthors: "",
    coverLetter: "",
    manuscriptUrl: "",
    hasEthicsApproval: false,
    conflictOfInterest: "",
    suggestedReviewers: "",
    year: new Date().getFullYear(),
  })

  const [keywordInput, setKeywordInput] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [urlError, setUrlError] = useState("")

  const handleInputChange = (field: keyof SubmissionFormData, value: string | boolean | number | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear URL error when user starts typing
    if (field === "manuscriptUrl") {
      setUrlError("")
    }
  }

  const validateUrl = (url: string): boolean => {
    if (!url.trim()) return false

    try {
      const urlObj = new URL(url)
      return urlObj.protocol === "http:" || urlObj.protocol === "https:"
    } catch {
      return false
    }
  }

  const handleUrlBlur = () => {
    if (formData.manuscriptUrl && !validateUrl(formData.manuscriptUrl)) {
      setUrlError("Please enter a valid URL (e.g., https://example.com/manuscript.pdf)")
    }
  }

  const addKeyword = () => {
    if (keywordInput.trim() && !formData.keywords.includes(keywordInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        keywords: [...prev.keywords, keywordInput.trim()],
      }))
      setKeywordInput("")
    }
  }

  const removeKeyword = (keyword: string) => {
    setFormData((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((k) => k !== keyword),
    }))
  }

  const generateEmailContent = () => {
    const emailBody = `
Subject: Manuscript Submission - ${formData.title}

Dear Editorial Team,

I am submitting my manuscript titled "${formData.title}" for consideration for publication in SVLNS GDC Multidisciplinary Journal.

MANUSCRIPT DETAILS:
- Title: ${formData.title}
- Article Type: ${formData.articleType}
- Subject Area: ${formData.subjectArea}
- Keywords: ${formData.keywords.join(", ")}
- Manuscript URL: ${formData.manuscriptUrl}

AUTHOR INFORMATION:
- Corresponding Author: ${formData.authorName}
- Email: ${formData.authorEmail}
- Affiliation: ${formData.authorAffiliation}
${formData.coAuthors ? `- Co-authors: ${formData.coAuthors}` : ""}

ABSTRACT:
${formData.abstract}

COVER LETTER:
${formData.coverLetter}

DECLARATIONS:
- Ethics Approval: ${formData.hasEthicsApproval ? "Yes" : "No"}
- Conflict of Interest: ${formData.conflictOfInterest || "None declared"}
${formData.suggestedReviewers ? `- Suggested Reviewers: ${formData.suggestedReviewers}` : ""}

The manuscript can be accessed at: ${formData.manuscriptUrl}

I confirm that this manuscript has not been published elsewhere and is not under consideration by any other journal.

Thank you for your consideration.

Best regards,
${formData.authorName}
${formData.authorEmail}
${formData.authorAffiliation}
    `.trim()

    return emailBody
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate URL before submission
    if (!validateUrl(formData.manuscriptUrl)) {
      setUrlError("Please enter a valid manuscript URL")
      toast.error("Please provide a valid manuscript URL")
      return
    }

    setIsSubmitting(true)

    try {
      // Save to Supabase submissions table
      const { data, error } = await supabase.from("submissions").insert({
        title: formData.title,
        authors: `${formData.authorName}${formData.coAuthors ? `, ${formData.coAuthors}` : ""}`,
        email: formData.authorEmail,
        institution: formData.authorAffiliation,
        abstract: formData.abstract,
        keywords: formData.keywords.join(", "),
        pdf_url: formData.manuscriptUrl,
        year: formData.year,
        status: "submitted",
      })

      if (error) {
        console.error("Supabase error:", error)
        toast.error("Failed to save submission to database")
        return
      }

      toast.success("Submission saved successfully!")

      // Generate email content
      const emailContent = generateEmailContent()

      // Create mailto link
      const subject = encodeURIComponent(`Manuscript Submission - ${formData.title}`)
      const body = encodeURIComponent(emailContent)
      const mailtoLink = `mailto:svlns.gdc@gmail.com?subject=${subject}&body=${body}`

      // Open email client
      window.open(mailtoLink, "_blank")

      // Mark as submitted
      setSubmitted(true)
    } catch (error) {
      console.error("Submission error:", error)
      toast.error("An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-800 mb-4">Submission Successful!</h2>
              <p className="text-gray-600 mb-6">
                Your manuscript has been saved to our database and your email client should have opened with a
                pre-filled submission email. The manuscript URL has been included in the email for the editorial team to
                access your work.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Email Address:</strong> svlns.gdc@gmail.com
                  <br />
                  <strong>Subject:</strong> Manuscript Submission - {formData.title}
                  <br />
                  <strong>Manuscript URL:</strong> {formData.manuscriptUrl}
                </p>
              </div>
              <Button
                onClick={() => {
                  setSubmitted(false)
                  setFormData({
                    title: "",
                    abstract: "",
                    keywords: [],
                    articleType: "",
                    subjectArea: "",
                    authorName: "",
                    authorEmail: "",
                    authorAffiliation: "",
                    coAuthors: "",
                    coverLetter: "",
                    manuscriptUrl: "",
                    hasEthicsApproval: false,
                    conflictOfInterest: "",
                    suggestedReviewers: "",
                    year: new Date().getFullYear(),
                  })
                }}
              >
                Submit Another Article
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
            Submit Your Manuscript
          </h1>
          <p className="text-xl text-gray-700">SVLNS GDC Multidisciplinary Journal</p>
        </div>

        {/* Submission Guidelines Alert */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-50 to-purple-50 mb-8">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-6 w-6" />
              <span>Submission Information</span>
            </CardTitle>
            <CardDescription className="text-blue-100">
              Please read our submission guidelines before proceeding
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Alert>
              <Mail className="h-4 w-4" />
              <AlertDescription>
                <strong>Submission Email:</strong> svlns.gdc@gmail.com
                <br />
                This form will save your submission to our database and prepare your submission email with all required
                information including your manuscript URL.
                <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
  <h3>Format Templates</h3>
  <p>Download the required templates for submission:</p>
  <ul style={{ listStyleType: 'none', padding: 0 }}>
    <li style={{ marginBottom: '8px' }}>
      <a 
        href="https://docs.google.com/document/d/1G7v02E1dOVs9KNyRPccWVLhBGbxTOxCz/edit?usp=drive_link&ouid=101168667610217696089&rtpof=true&sd=true" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ color: '#1976d2', textDecoration: 'none' }}
      >
        📝 LaTeX Template Document
      </a>
    </li>
    <li>
      <a 
        href="https://drive.google.com/file/d/1sbLKcdJbK5-bt0m57GXyk0WWgc3pRYov/view?usp=drive_link" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ color: '#1976d2', textDecoration: 'none' }}
      >
        📄 Word Template Document
      </a>
    </li>
  </ul>
</div>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Manuscript Information */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Manuscript Information</CardTitle>
              <CardDescription>Basic details about your research article</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Article Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter the full title of your manuscript"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="articleType">Article Type *</Label>
                  <Select
                    value={formData.articleType}
                    onValueChange={(value) => handleInputChange("articleType", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select article type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="research_article">Research Article</SelectItem>
                      <SelectItem value="review_article">Review Article</SelectItem>
                      <SelectItem value="short_communication">Short Communication</SelectItem>
                      <SelectItem value="case_study">Case Study</SelectItem>
                      <SelectItem value="editorial">Editorial</SelectItem>
                      <SelectItem value="letter_to_editor">Letter to Editor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subjectArea">Subject Area *</Label>
                  <Select
                    value={formData.subjectArea}
                    onValueChange={(value) => handleInputChange("subjectArea", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                      <SelectItem value="Biology">Biology</SelectItem>
                      <SelectItem value="Botany">Botany</SelectItem>
                      <SelectItem value="Zoology">Zoology</SelectItem>
                      <SelectItem value="Economics">Economics</SelectItem>
                      <SelectItem value="Commerce">Commerce</SelectItem>
                      <SelectItem value="English Literature">English Literature</SelectItem>
                      <SelectItem value="Telugu Literature">Telugu Literature</SelectItem>
                      <SelectItem value="History">History</SelectItem>
                      <SelectItem value="Political Science">Political Science</SelectItem>
                      <SelectItem value="Social Sciences">Social Sciences</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="abstract">Abstract *</Label>
                <Textarea
                  id="abstract"
                  value={formData.abstract}
                  onChange={(e) => handleInputChange("abstract", e.target.value)}
                  placeholder="Enter your abstract (250-400 words)"
                  rows={6}
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.abstract.split(" ").filter((word) => word.length > 0).length} words
                </p>
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
                  {formData.keywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {keyword}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeKeyword(keyword)} />
                    </Badge>
                  ))}
                </div>
                {formData.keywords.length === 0 && (
                  <p className="text-sm text-red-500">Please add at least one keyword</p>
                )}
              </div>

              <div>
                <Label htmlFor="year">Publication Year</Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year}
                  onChange={(e) =>
                    handleInputChange("year", Number.parseInt(e.target.value) || new Date().getFullYear())
                  }
                  min="2024"
                  max="2030"
                />
              </div>
            </CardContent>
          </Card>

          {/* Manuscript URL Section */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Link className="h-5 w-5" />
                <span>Manuscript Access</span>
              </CardTitle>
              <CardDescription>Provide a URL where the editorial team can access your manuscript</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="manuscriptUrl">Manuscript URL *</Label>
                <Input
                  id="manuscriptUrl"
                  type="url"
                  value={formData.manuscriptUrl}
                  onChange={(e) => handleInputChange("manuscriptUrl", e.target.value)}
                  onBlur={handleUrlBlur}
                  placeholder="https://example.com/your-manuscript.pdf"
                  required
                  className={urlError ? "border-red-500" : ""}
                />
                {urlError && <p className="text-sm text-red-500 mt-1">{urlError}</p>}
                <p className="text-sm text-gray-500 mt-1">
                  Please provide a direct link to your manuscript file (PDF, DOC, or DOCX). You can use cloud storage
                  services like Google Drive, Dropbox, OneDrive, or your institutional repository.
                </p>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Supported URL examples:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Google Drive: Make sure the file is set to "Anyone with the link can view"</li>
                    <li>Dropbox: Use the direct download link</li>
                    <li>OneDrive: Share with "Anyone with the link can view"</li>
                    <li>Institutional repository or personal website</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Author Information */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Author Information</CardTitle>
              <CardDescription>Details about the corresponding author and co-authors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="authorName">Corresponding Author Name *</Label>
                  <Input
                    id="authorName"
                    value={formData.authorName}
                    onChange={(e) => handleInputChange("authorName", e.target.value)}
                    placeholder="Full name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="authorEmail">Email Address *</Label>
                  <Input
                    id="authorEmail"
                    type="email"
                    value={formData.authorEmail}
                    onChange={(e) => handleInputChange("authorEmail", e.target.value)}
                    placeholder="your.email@institution.edu"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="authorAffiliation">Affiliation *</Label>
                <Input
                  id="authorAffiliation"
                  value={formData.authorAffiliation}
                  onChange={(e) => handleInputChange("authorAffiliation", e.target.value)}
                  placeholder="Institution, Department, City, Country"
                  required
                />
              </div>

              <div>
                <Label htmlFor="coAuthors">Co-authors (if any)</Label>
                <Textarea
                  id="coAuthors"
                  value={formData.coAuthors}
                  onChange={(e) => handleInputChange("coAuthors", e.target.value)}
                  placeholder="List co-authors with their affiliations"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>Cover letter and declarations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="coverLetter">Cover Letter *</Label>
                <Textarea
                  id="coverLetter"
                  value={formData.coverLetter}
                  onChange={(e) => handleInputChange("coverLetter", e.target.value)}
                  placeholder="Brief description of your research, its significance, and why it's suitable for this journal"
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="ethicsApproval"
                    checked={formData.hasEthicsApproval}
                    onCheckedChange={(checked) => handleInputChange("hasEthicsApproval", checked as boolean)}
                  />
                  <Label htmlFor="ethicsApproval">This research has ethics approval (if applicable)</Label>
                </div>

                <div>
                  <Label htmlFor="conflictOfInterest">Conflict of Interest Statement</Label>
                  <Textarea
                    id="conflictOfInterest"
                    value={formData.conflictOfInterest}
                    onChange={(e) => handleInputChange("conflictOfInterest", e.target.value)}
                    placeholder="Declare any conflicts of interest or state 'None'"
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="suggestedReviewers">Suggested Reviewers (Optional)</Label>
                  <Textarea
                    id="suggestedReviewers"
                    value={formData.suggestedReviewers}
                    onChange={(e) => handleInputChange("suggestedReviewers", e.target.value)}
                    placeholder="Suggest 2-3 potential reviewers with their email addresses"
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="text-center">
            <Button
              type="submit"
              size="lg"
              disabled={
                isSubmitting ||
                !formData.title ||
                !formData.abstract ||
                !formData.authorName ||
                !formData.authorEmail ||
                !formData.articleType ||
                !formData.subjectArea ||
                !formData.coverLetter ||
                !formData.manuscriptUrl ||
                formData.keywords.length === 0 ||
                !!urlError
              }
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              {isSubmitting ? (
                <>
                  <Link className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Your Manuscript
                </>
              )}
            </Button>

            <p className="text-sm text-gray-600 mt-4">
              This will save your submission to our database and open your email client with a pre-filled message to{" "}
              <strong>svlns.gdc@gmail.com</strong>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
