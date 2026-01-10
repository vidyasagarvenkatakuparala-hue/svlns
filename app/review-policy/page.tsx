import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Users, Clock, CheckCircle, Eye, FileText } from "lucide-react"

export default function ReviewPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Review Policy</h1>
          <p className="text-xl text-gray-600">
            Transparent and rigorous peer review process ensuring academic excellence and integrity
          </p>
        </div>

        {/* Overview */}
        <Alert className="mb-8">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            <strong>Our Commitment:</strong> SVLNS GDC Multidisciplinary Journal maintains the highest standards of peer
            review through a transparent, fair, and rigorous double-blind review process conducted by international
            experts in relevant fields.
          </AlertDescription>
        </Alert>

        {/* Review Process Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="h-6 w-6 text-blue-600" />
              <span>Double-Blind Peer Review Process</span>
            </CardTitle>
            <CardDescription>
              Our comprehensive review process ensures quality, originality, and academic rigor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">What is Double-Blind Review?</h4>
                <p className="text-sm text-gray-600 mb-4">
                  In double-blind peer review, both the reviewer and author identities are concealed from each other
                  throughout the review process, ensuring unbiased evaluation based solely on the merit of the research.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Authors remain anonymous to reviewers</li>
                  <li>• Reviewers remain anonymous to authors</li>
                  <li>• Eliminates potential bias and conflicts</li>
                  <li>• Ensures objective evaluation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Review Criteria</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    • <strong>Originality:</strong> Novel contribution to knowledge
                  </li>
                  <li>
                    • <strong>Methodology:</strong> Sound research design and methods
                  </li>
                  <li>
                    • <strong>Significance:</strong> Importance and impact of findings
                  </li>
                  <li>
                    • <strong>Clarity:</strong> Clear presentation and writing quality
                  </li>
                  <li>
                    • <strong>Ethics:</strong> Adherence to research ethics
                  </li>
                  <li>
                    • <strong>Scope:</strong> Alignment with journal's aims
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Review Timeline */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-6 w-6 text-green-600" />
              <span>Review Timeline</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-full p-2 w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-semibold">Initial Editorial Screening (3-5 days)</h4>
                  <p className="text-sm text-gray-600">
                    Editor-in-Chief or Associate Editor reviews manuscript for scope, format, and basic requirements
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 rounded-full p-2 w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-semibold">Reviewer Assignment (2-3 days)</h4>
                  <p className="text-sm text-gray-600">
                    Minimum 2-3 expert reviewers are selected based on expertise and availability
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 rounded-full p-2 w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-semibold">Peer Review Period (21-28 days)</h4>
                  <p className="text-sm text-gray-600">
                    Reviewers conduct thorough evaluation and provide detailed feedback
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 rounded-full p-2 w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-600 font-bold text-sm">4</span>
                </div>
                <div>
                  <h4 className="font-semibold">Editorial Decision (3-5 days)</h4>
                  <p className="text-sm text-gray-600">Editor makes final decision based on reviewer recommendations</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Review Outcomes */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Possible Review Outcomes</CardTitle>
            <CardDescription>
              Understanding the different editorial decisions and next steps for authors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-700">Accept</h4>
                    <p className="text-sm text-gray-600">Manuscript accepted with minor or no revisions required</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="h-5 w-5 bg-blue-600 rounded-full mt-0.5"></div>
                  <div>
                    <h4 className="font-semibold text-blue-700">Minor Revisions</h4>
                    <p className="text-sm text-gray-600">Manuscript requires minor changes before acceptance</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="h-5 w-5 bg-orange-600 rounded-full mt-0.5"></div>
                  <div>
                    <h4 className="font-semibold text-orange-700">Major Revisions</h4>
                    <p className="text-sm text-gray-600">Significant revisions needed; re-review required</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="h-5 w-5 bg-red-600 rounded-full mt-0.5"></div>
                  <div>
                    <h4 className="font-semibold text-red-700">Reject</h4>
                    <p className="text-sm text-gray-600">Manuscript does not meet publication standards</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Decision Factors</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Quality and rigor of research methodology</li>
                  <li>• Originality and significance of contribution</li>
                  <li>• Clarity of presentation and writing</li>
                  <li>• Adherence to ethical standards</li>
                  <li>• Alignment with journal scope</li>
                  <li>• Statistical validity (where applicable)</li>
                  <li>• Literature review comprehensiveness</li>
                  <li>• Practical implications and impact</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reviewer Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-purple-600" />
              <span>Reviewer Selection Criteria</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Expertise Requirements</h4>
                <ul className="space-y-2 text-sm">
                  <li>• PhD in relevant field or equivalent expertise</li>
                  <li>• Active research record in the subject area</li>
                  <li>• Publication history in peer-reviewed journals</li>
                  <li>• International recognition in the field</li>
                  <li>• Previous peer review experience</li>
                  <li>• Current institutional affiliation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Selection Process</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Database of qualified reviewers maintained</li>
                  <li>• Automatic conflict of interest screening</li>
                  <li>• Geographic and institutional diversity ensured</li>
                  <li>• Workload balance considered</li>
                  <li>• Author suggestions may be considered</li>
                  <li>• Final selection by Associate Editor</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Review Guidelines */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-blue-600" />
              <span>Reviewer Guidelines</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Review Responsibilities</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-sm">
                    <li>• Provide objective, constructive feedback</li>
                    <li>• Evaluate manuscript within expertise area</li>
                    <li>• Maintain confidentiality throughout process</li>
                    <li>• Complete review within agreed timeframe</li>
                  </ul>
                  <ul className="space-y-2 text-sm">
                    <li>• Declare any conflicts of interest</li>
                    <li>• Provide detailed written comments</li>
                    <li>• Recommend appropriate editorial action</li>
                    <li>• Respect intellectual property rights</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Review Report Structure</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    • <strong>Summary:</strong> Brief overview of the manuscript
                  </li>
                  <li>
                    • <strong>Strengths:</strong> Positive aspects and contributions
                  </li>
                  <li>
                    • <strong>Weaknesses:</strong> Areas needing improvement
                  </li>
                  <li>
                    • <strong>Specific Comments:</strong> Detailed line-by-line feedback
                  </li>
                  <li>
                    • <strong>Recommendation:</strong> Clear editorial recommendation
                  </li>
                  <li>
                    • <strong>Confidential Comments:</strong> Additional notes for editor
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appeals Process */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Appeals and Complaints Process</CardTitle>
            <CardDescription>Fair and transparent process for addressing author concerns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Grounds for Appeal</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Procedural errors in review process</li>
                  <li>• Reviewer bias or misconduct</li>
                  <li>• Misunderstanding of manuscript content</li>
                  <li>• New evidence or significant corrections</li>
                  <li>• Conflict of interest not disclosed</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Appeal Process</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Submit formal appeal within 30 days</li>
                  <li>• Provide detailed justification</li>
                  <li>• Independent editorial review</li>
                  <li>• Additional expert opinion if needed</li>
                  <li>• Final decision within 21 days</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quality Assurance */}
        <Card>
          <CardHeader>
            <CardTitle>Quality Assurance Measures</CardTitle>
            <CardDescription>Continuous improvement and monitoring of review process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Process Monitoring</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Regular review timeline tracking</li>
                  <li>• Reviewer performance evaluation</li>
                  <li>• Author satisfaction surveys</li>
                  <li>• Editorial decision consistency</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Reviewer Training</h4>
                <ul className="space-y-2 text-sm">
                  <li>• New reviewer orientation</li>
                  <li>• Best practices guidelines</li>
                  <li>• Ethics training programs</li>
                  <li>• Feedback and improvement</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Continuous Improvement</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Annual policy review</li>
                  <li>• International best practices</li>
                  <li>• Technology integration</li>
                  <li>• Stakeholder feedback</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
