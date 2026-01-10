import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, AlertTriangle, Users, Bot, Globe, FileText } from "lucide-react"

export default function EthicsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Ethics & Policies</h1>
          <p className="text-xl text-gray-600">
            Comprehensive ethical guidelines and policies ensuring research integrity and publication excellence
          </p>
        </div>

        {/* Research Ethics Overview */}
        <Alert className="mb-8">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            <strong>Our Commitment:</strong> SVLNS GDC Multidisciplinary Journal is committed to maintaining the highest
            standards of research ethics, publication integrity, and academic honesty in accordance with international
            best practices and UGC guidelines.
          </AlertDescription>
        </Alert>

        {/* Ethical Guidelines for Authors */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-blue-600" />
              <span>Ethical Guidelines for Authors</span>
            </CardTitle>
            <CardDescription>Fundamental principles that all authors must adhere to</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Research Integrity</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Ensure originality and authenticity of research</li>
                  <li>• Report findings honestly and accurately</li>
                  <li>• Avoid fabrication, falsification, or manipulation of data</li>
                  <li>• Maintain proper documentation and records</li>
                  <li>• Follow established research methodologies</li>
                  <li>• Respect participant rights and welfare</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Publication Ethics</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Submit only original, unpublished work</li>
                  <li>• Avoid simultaneous submission to multiple journals</li>
                  <li>• Provide accurate author contributions</li>
                  <li>• Acknowledge all sources and collaborators</li>
                  <li>• Disclose funding sources and support</li>
                  <li>• Correct errors promptly when identified</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plagiarism Prevention */}
        <Card className="mb-8" id="plagiarism">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <span>Plagiarism Prevention Policy</span>
            </CardTitle>
            <CardDescription>Strict measures to ensure originality and prevent academic misconduct</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Definition of Plagiarism</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Plagiarism is the practice of taking someone else's work or ideas and passing them off as one's own
                  without proper attribution. This includes text, ideas, images, data, and other intellectual property.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium mb-2">Types of Plagiarism</h5>
                    <ul className="space-y-1 text-sm">
                      <li>• Direct copying without citation</li>
                      <li>• Paraphrasing without attribution</li>
                      <li>• Self-plagiarism (duplicate publication)</li>
                      <li>• Mosaic plagiarism (patchwork copying)</li>
                      <li>• Idea plagiarism</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Detection Methods</h5>
                    <ul className="space-y-1 text-sm">
                      <li>• Advanced plagiarism detection software</li>
                      <li>• Manual editorial review</li>
                      <li>• Cross-reference checking</li>
                      <li>• Peer reviewer scrutiny</li>
                      <li>• Database comparison</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-red-800">Similarity Thresholds</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <Badge variant="destructive" className="mb-2">
                      {"< 15%"}
                    </Badge>
                    <p>Acceptable similarity level</p>
                  </div>
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      15-25%
                    </Badge>
                    <p>Requires editorial review</p>
                  </div>
                  <div>
                    <Badge variant="destructive" className="mb-2">
                      {">25%"}
                    </Badge>
                    <p>Automatic rejection</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Content Policy */}
        <Card className="mb-8" id="ai-policy">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bot className="h-6 w-6 text-purple-600" />
              <span>AI Generated Content Policy</span>
            </CardTitle>
            <CardDescription>Guidelines for the use of artificial intelligence in research and writing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">AI Usage Guidelines</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium mb-2 text-green-700">Acceptable Uses</h5>
                    <ul className="space-y-2 text-sm">
                      <li>• Grammar and language improvement tools</li>
                      <li>• Data analysis and visualization assistance</li>
                      <li>• Literature search and organization</li>
                      <li>• Translation assistance</li>
                      <li>• Formatting and reference management</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2 text-red-700">Prohibited Uses</h5>
                    <ul className="space-y-2 text-sm">
                      <li>• AI-generated research content without disclosure</li>
                      <li>• Fabricated data or results</li>
                      <li>• AI-written manuscripts without human oversight</li>
                      <li>• Undisclosed AI assistance in analysis</li>
                      <li>• AI-generated images or figures without attribution</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Disclosure Requirements</h4>
                <ul className="space-y-2 text-sm">
                  <li>• All AI tool usage must be explicitly disclosed</li>
                  <li>• Specify the AI tool name and version used</li>
                  <li>• Describe the specific purpose and extent of AI assistance</li>
                  <li>• Include AI disclosure in the methodology section</li>
                  <li>• Authors remain fully responsible for content accuracy</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conflict of Interest */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-orange-600" />
              <span>Conflict of Interest Policy</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Types of Conflicts</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    • <strong>Financial:</strong> Funding, employment, consultancy
                  </li>
                  <li>
                    • <strong>Personal:</strong> Family, friendship, rivalry
                  </li>
                  <li>
                    • <strong>Professional:</strong> Institutional affiliations
                  </li>
                  <li>
                    • <strong>Academic:</strong> Competing research interests
                  </li>
                  <li>
                    • <strong>Intellectual:</strong> Strong beliefs or positions
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Disclosure Requirements</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Complete conflict of interest form</li>
                  <li>• Disclose all potential conflicts</li>
                  <li>• Update disclosures if circumstances change</li>
                  <li>• Include funding acknowledgments</li>
                  <li>• Transparent reporting in publications</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Open Access Policy */}
        <Card className="mb-8" id="open-access">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-6 w-6 text-green-600" />
              <span>Open Access Policy</span>
            </CardTitle>
            <CardDescription>Commitment to free and unrestricted access to scholarly research</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Open Access Commitment</h4>
                <p className="text-sm text-gray-600 mb-4">
                  SVLNS GDC Multidisciplinary Journal is committed to the principle of open access, providing immediate,
                  worldwide, barrier-free access to the full text of all articles.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium mb-2">Benefits of Open Access</h5>
                    <ul className="space-y-1 text-sm">
                      <li>• Increased visibility and citations</li>
                      <li>• Global accessibility</li>
                      <li>• Faster knowledge dissemination</li>
                      <li>• Support for developing countries</li>
                      <li>• Enhanced research impact</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Author Rights</h5>
                    <ul className="space-y-1 text-sm">
                      <li>• Retain copyright ownership</li>
                      <li>• Creative Commons licensing</li>
                      <li>• Self-archiving permissions</li>
                      <li>• Institutional repository deposit</li>
                      <li>• Commercial use restrictions</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-green-800">No Article Processing Charges (APC)</h4>
                <p className="text-sm">
                  Our journal operates on a no-fee model. Authors are not required to pay any article processing
                  charges, submission fees, or publication fees. This ensures that financial constraints do not prevent
                  quality research from being published.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data and Materials Policy */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Data and Materials Availability</CardTitle>
            <CardDescription>Guidelines for sharing research data and materials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Data Sharing Requirements</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Provide data availability statement</li>
                  <li>• Share data supporting conclusions</li>
                  <li>• Use appropriate data repositories</li>
                  <li>• Ensure data privacy and ethics compliance</li>
                  <li>• Include data access instructions</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Acceptable Restrictions</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Privacy and confidentiality concerns</li>
                  <li>• Proprietary or commercial restrictions</li>
                  <li>• Legal or ethical limitations</li>
                  <li>• Third-party data agreements</li>
                  <li>• National security considerations</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Misconduct Reporting */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <span>Research Misconduct Reporting</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Reporting Procedures</h4>
                <p className="text-sm text-gray-600 mb-4">
                  If you suspect research misconduct, plagiarism, or ethical violations, please report your concerns to
                  the editorial office. All reports will be handled confidentially and investigated thoroughly.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium mb-2">Contact Information</h5>
                    <ul className="space-y-1 text-sm">
                      <li>• Email: ethics@svlnsgdc.edu.in</li>
                      <li>• Editor-in-Chief: editor@svlnsgdc.edu.in</li>
                      <li>• Anonymous reporting available</li>
                      <li>• Confidential investigation process</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Investigation Process</h5>
                    <ul className="space-y-1 text-sm">
                      <li>• Initial assessment within 7 days</li>
                      <li>• Formal investigation if warranted</li>
                      <li>• Independent expert panel review</li>
                      <li>• Appropriate sanctions if confirmed</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-red-800">Consequences of Misconduct</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Immediate manuscript rejection</li>
                  <li>• Retraction of published articles</li>
                  <li>• Author submission ban (temporary or permanent)</li>
                  <li>• Notification to author's institution</li>
                  <li>• Reporting to relevant professional bodies</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
