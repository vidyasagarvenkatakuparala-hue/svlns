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
import { Mail, Upload, FileText, CheckCircle, AlertCircle, Send } from "lucide-react"

interface SubmissionFormData {
  title: string
  abstract: string
  keywords: string
  articleType: string
  subjectArea: string
  authorName: string
  authorEmail: string
  authorAffiliation: string
  coAuthors: string
  coverLetter: string
  hasEthicsApproval: boolean
  conflictOfInterest: string
  suggestedReviewers: string
}

export function SubmissionForm() {
  const [formData, setFormData] = useState<SubmissionFormData>({
    title: "",
    abstract: "",
    keywords: "",
    articleType: "",
    subjectArea: "",
    authorName: "",
    authorEmail: "",
    authorAffiliation: "",
    coAuthors: "",
    coverLetter: "",
    hasEthicsApproval: false,
    conflictOfInterest: "",
    suggestedReviewers: "",
  })

  const [files, setFiles] = useState<{
    manuscript?: File
    supplementary?: File[]
  }>({})

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (field: keyof SubmissionFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (type: "manuscript" | "supplementary", file: File | File[]) => {
    if (type === "manuscript" && file instanceof File) {
      setFiles((prev) => ({ ...prev, manuscript: file }))
    } else if (type === "supplementary" && Array.isArray(file)) {
      setFiles((prev) => ({ ...prev, supplementary: file }))
    }
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
- Keywords: ${formData.keywords}

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

Please find the attached manuscript file and any supplementary materials.

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
    setIsSubmitting(true)

    try {
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
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-800 mb-4">Submission Prepared!</h2>
          <p className="text-gray-600 mb-6">
            Your email client should have opened with a pre-filled submission email. Please attach your manuscript file
            and send the email to complete your submission.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-blue-800">
              <strong>Email Address:</strong> svlns.gdc@gmail.com
              <br />
              <strong>Subject:</strong> Manuscript Submission - {formData.title}
            </p>
          </div>
          <Button
            onClick={() => {
              setSubmitted(false)
              setFormData({} as SubmissionFormData)
            }}
          >
            Submit Another Article
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-6 w-6" />
            <span>Submit Your Manuscript</span>
          </CardTitle>
          <CardDescription className="text-blue-100">
            Submit your research to SVLNS GDC Multidisciplinary Journal
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Alert>
            <Mail className="h-4 w-4" />
            <AlertDescription>
              <strong>Submission Email:</strong> svlns.gdc@gmail.com
              <br />
              This form will prepare your submission email with all required information.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Manuscript Information */}
        <Card>
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
                <Select value={formData.articleType} onValueChange={(value) => handleInputChange("articleType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select article type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="research">Research Article</SelectItem>
                    <SelectItem value="review">Review Article</SelectItem>
                    <SelectItem value="short_communication">Short Communication</SelectItem>
                    <SelectItem value="case_study">Case Study</SelectItem>
                    <SelectItem value="editorial">Editorial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="subjectArea">Subject Area *</Label>
                <Select value={formData.subjectArea} onValueChange={(value) => handleInputChange("subjectArea", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="computer_science">Computer Science</SelectItem>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                    <SelectItem value="economics">Economics</SelectItem>
                    <SelectItem value="management">Management</SelectItem>
                    <SelectItem value="literature">Literature</SelectItem>
                    <SelectItem value="social_sciences">Social Sciences</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
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

            <div>
              <Label htmlFor="keywords">Keywords *</Label>
              <Input
                id="keywords"
                value={formData.keywords}
                onChange={(e) => handleInputChange("keywords", e.target.value)}
                placeholder="Enter 4-8 keywords separated by commas"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Author Information */}
        <Card>
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
        <Card>
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

        {/* File Upload Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="h-5 w-5" />
              <span>File Attachment Instructions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Important:</strong> After clicking "Prepare Submission Email", your email client will open.
                Please attach the following files before sending:
              </AlertDescription>
            </Alert>

            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2">
                <Badge variant="outline">Required</Badge>
                <span className="text-sm">Complete manuscript file (.docx or .pdf)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">Optional</Badge>
                <span className="text-sm">Supplementary materials</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">Optional</Badge>
                <span className="text-sm">High-resolution figures</span>
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
              isSubmitting || !formData.title || !formData.abstract || !formData.authorName || !formData.authorEmail
            }
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            {isSubmitting ? (
              <>
                <Upload className="h-4 w-4 mr-2 animate-spin" />
                Preparing...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Prepare Submission Email
              </>
            )}
          </Button>

          <p className="text-sm text-gray-600 mt-4">
            This will open your email client with a pre-filled message to <strong>svlns.gdc@gmail.com</strong>
          </p>
        </div>
      </form>
    </div>
  )
}
