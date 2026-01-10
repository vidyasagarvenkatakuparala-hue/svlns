import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Mail, CheckCircle, Clock, Users, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function SubmissionGuidelinesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Submission Guidelines</h1>
          <p className="text-xl text-gray-600">
            Guidelines for authors submitting manuscripts to SVLNS GDC Multidisciplinary Journal
          </p>
        </div>

        {/* Quick Submission */}
        <Card className="mb-8 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-800">
              <Mail className="h-6 w-6" />
              <span>Quick Submission</span>
            </CardTitle>
            <CardDescription className="text-blue-700">
              Ready to submit? Send your manuscript directly to our editorial team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex-1">
                <p className="text-sm text-blue-800 mb-2">
                  <strong>Submission Email:</strong> svlns.gdc@gmail.com
                </p>
                <p className="text-sm text-blue-700">
                  Include your complete manuscript, cover letter, and all required documents
                </p>
              </div>
              <div className="flex gap-2">
                <Button asChild>
                  <Link href="/submit">Use Submission Form</Link>
                </Button>
                <Button variant="outline" asChild>
                  <a href="mailto:svlns.gdc@gmail.com?subject=Manuscript Submission - [Your Title]">Email Directly</a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Manuscript Types */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-green-600" />
              <span>Manuscript Types</span>
            </CardTitle>
            <CardDescription>We accept various types of scholarly contributions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Research Articles</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Original research findings</li>
                  <li>• Word limit: 6000-8000 words</li>
                  <li>• Abstract: 250-300 words</li>
                  <li>• Keywords: 5-7 terms</li>
                  <li>• References: 30-50</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Review Articles</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Comprehensive literature reviews</li>
                  <li>• Word limit: 8000-10000 words</li>
                  <li>• Abstract: 300-350 words</li>
                  <li>• Keywords: 6-8 terms</li>
                  <li>• References: 50-100</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Short Communications</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Brief research reports</li>
                  <li>• Word limit: 2000-3000 words</li>
                  <li>• Abstract: 150-200 words</li>
                  <li>• Keywords: 4-6 terms</li>
                  <li>• References: 15-25</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Case Studies</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Detailed case analyses</li>
                  <li>• Word limit: 4000-5000 words</li>
                  <li>• Abstract: 200-250 words</li>
                  <li>• Keywords: 5-6 terms</li>
                  <li>• References: 20-35</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subject Areas */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Subject Areas</CardTitle>
            <CardDescription>We welcome submissions from diverse academic disciplines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Sciences</h4>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">
                    Physics
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Chemistry
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Biology
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Mathematics
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Computer Science
                  </Badge>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Social Sciences</h4>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">
                    Psychology
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Sociology
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Economics
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Political Science
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Anthropology
                  </Badge>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Humanities</h4>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">
                    Literature
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Philosophy
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    History
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Linguistics
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Arts
                  </Badge>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Interdisciplinary</h4>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">
                    Environmental Studies
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Public Health
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Education
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Social Development
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Formatting Guidelines */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Formatting Guidelines</CardTitle>
            <CardDescription>Please ensure your manuscript follows these formatting requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">General Format</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Font: Times New Roman, 12pt</li>
                  <li>• Line spacing: Double</li>
                  <li>• Margins: 1 inch on all sides</li>
                  <li>• Page numbers: Bottom center</li>
                  <li>• File format: MS Word (.docx) or PDF</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Structure</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Title page with author details</li>
                  <li>• Abstract and keywords</li>
                  <li>• Main text with clear headings</li>
                  <li>• References (APA style)</li>
                  <li>• Tables and figures (if applicable)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Citations</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Follow APA 7th edition style</li>
                  <li>• In-text citations: (Author, Year)</li>
                  <li>• Reference list: Alphabetical order</li>
                  <li>• DOI required for journal articles</li>
                  <li>• Verify all citations for accuracy</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Figures & Tables</h4>
                <ul className="space-y-2 text-sm">
                  <li>• High resolution (300 DPI minimum)</li>
                  <li>• Clear, readable labels</li>
                  <li>• Numbered consecutively</li>
                  <li>• Descriptive captions</li>
                  <li>• Separate files for images</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submission Process */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-6 w-6 text-blue-600" />
              <span>Submission Process</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-full p-2 mt-1">
                  <span className="text-blue-600 font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-semibold">Prepare Your Manuscript</h4>
                  <p className="text-sm text-gray-600">
                    Ensure your manuscript follows all formatting guidelines and includes all required sections.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-full p-2 mt-1">
                  <span className="text-blue-600 font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-semibold">Submit via Email</h4>
                  <p className="text-sm text-gray-600">
                    Send your complete submission to svlns.gdc@gmail.com with all required documents.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-full p-2 mt-1">
                  <span className="text-blue-600 font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-semibold">Initial Review</h4>
                  <p className="text-sm text-gray-600">Editorial team conducts initial screening within 7-10 days.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-full p-2 mt-1">
                  <span className="text-blue-600 font-bold text-sm">4</span>
                </div>
                <div>
                  <h4 className="font-semibold">Peer Review</h4>
                  <p className="text-sm text-gray-600">Double-blind peer review process takes 30-45 days.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-full p-2 mt-1">
                  <span className="text-blue-600 font-bold text-sm">5</span>
                </div>
                <div>
                  <h4 className="font-semibold">Decision & Publication</h4>
                  <p className="text-sm text-gray-600">
                    Final decision communicated, accepted articles published in next issue.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Required Documents */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <span>Required Documents</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Mandatory Documents</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Complete manuscript file</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Cover letter</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Author declaration form</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Copyright transfer agreement</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Conflict of interest statement</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Additional Requirements</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                    <span>Ethics approval (if applicable)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                    <span>Data availability statement</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                    <span>Funding information</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                    <span>Author contributions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                    <span>Supplementary materials (if any)</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Review Process */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-purple-600" />
              <span>Review Process</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Our journal follows a rigorous double-blind peer review process to ensure the highest quality of
                published research.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Editorial Screening</h4>
                  <p className="text-sm text-gray-600">Initial review for scope, quality, and formatting compliance</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Peer Review</h4>
                  <p className="text-sm text-gray-600">Double-blind review by subject matter experts</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="h-8 w-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Final Decision</h4>
                  <p className="text-sm text-gray-600">Editorial decision and author notification</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card className="mb-8 border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-orange-800">
              <AlertCircle className="h-6 w-6" />
              <span>Important Notes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-orange-800">
              <li>• All submissions must be original and not published elsewhere</li>
              <li>• Plagiarism will result in immediate rejection</li>
              <li>• Authors are responsible for obtaining necessary permissions</li>
              <li>• Manuscripts should contribute to social development and inclusive research</li>
              <li>• We encourage submissions that address challenges faced by socially disadvantaged communities</li>
              <li>• All correspondence will be conducted via email</li>
              <li>• Publication is free of charge for all authors</li>
            </ul>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>Contact our editorial team for assistance with your submission</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Editorial Office</h4>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Email:</strong> svlns.gdc@gmail.com
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Response Time:</strong> Within 24-48 hours
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Office Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM (IST)
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <Button asChild className="w-full">
                    <Link href="/submit">Use Submission Form</Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full bg-transparent">
                    <a href="mailto:svlns.gdc@gmail.com?subject=Submission Inquiry">Email Editorial Team</a>
                  </Button>
                  <Button variant="outline" asChild className="w-full bg-transparent">
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
