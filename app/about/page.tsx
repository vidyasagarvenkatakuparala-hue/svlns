import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Eye, BookOpen, Globe, Users, Award } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/college-logo.png"
              alt="Sri Varaha Lakshmi Narsimha Swami Government Degree College Logo"
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About SVLNS GDC Multidisciplinary Journal</h1>
          <p className="text-xl text-gray-600">
            Fostering excellence in multidisciplinary research and academic publishing
          </p>
        </div>


        {/* Journal Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-blue-600" />
              <span>Journal Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <section className="mt-6">
  <h2 className="text-xl font-bold">Journal Details</h2>
  <p><strong>Starting Year:</strong> 2025</p>
  <p><strong>Format:</strong> Online</p>
 <p><strong>Scope:</strong> International</p>
</section>
            <p>
              The SVLNS GDC Multidisciplinary Journal is an international, peer-reviewed, open-access academic publication dedicated to
              advancing knowledge across diverse fields of study. Established with the vision of promoting
              interdisciplinary research, our journal serves as a platform for scholars, researchers, and academicians
              to share their innovative findings and contribute to the global body of knowledge.
            </p>
            <p>
              Our journal adheres to the highest standards of academic integrity and follows the University Grants
              Commission (UGC) guidelines for peer-reviewed journals, ensuring quality, transparency, and ethical
              publishing practices.
            </p>
            <p>
              Published by SVLNS GDC Multidisciplinary Journal, this journal
              represents the Sri Varaha Lakshmi Narsimha Swami Government Degree College, Bheemunipatnam institution's commitment to research excellence and academic innovation. The college,
              established in 1984 and accredited by NAAC Bengalore, has been serving the educational needs of students
              from socially challenged sections of society for over 30 years, providing the strong academic foundation
              for this multidisciplinary publication.
            </p>
          </CardContent>
        </Card>

        {/* Aims and Objectives */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-6 w-6 text-green-600" />
              <span>Aims and Objectives</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Primary Aims</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Promote multidisciplinary research and collaboration</li>
                  <li>• Provide a platform for innovative academic discourse</li>
                  <li>• Foster knowledge exchange across diverse fields</li>
                  <li>• Support emerging researchers and scholars</li>
                  <li>• Maintain highest standards of academic integrity</li>
                  <li>• Serve socially challenged sections through quality research</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Key Objectives</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Publish high-quality, peer-reviewed research</li>
                  <li>• Ensure open access to scholarly content</li>
                  <li>• Promote ethical research practices</li>
                  <li>• Facilitate global academic collaboration</li>
                  <li>• Contribute to policy-making and societal development</li>
                  <li>• Bridge academic research with social needs</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scope and Subject Areas */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-6 w-6 text-purple-600" />
              <span>Scope and Subject Areas</span>
            </CardTitle>
            <CardDescription>Our journal welcomes submissions from a wide range of disciplines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Sciences</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Physics</Badge>
                  <Badge variant="secondary">Chemistry</Badge>
                  <Badge variant="secondary">Biology</Badge>
                  <Badge variant="secondary">Mathematics</Badge>
                  <Badge variant="secondary">Computer Science</Badge>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Social Sciences</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Psychology</Badge>
                  <Badge variant="secondary">Sociology</Badge>
                  <Badge variant="secondary">Economics</Badge>
                  <Badge variant="secondary">Political Science</Badge>
                  <Badge variant="secondary">Anthropology</Badge>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Humanities</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Literature</Badge>
                  <Badge variant="secondary">Philosophy</Badge>
                  <Badge variant="secondary">History</Badge>
                  <Badge variant="secondary">Linguistics</Badge>
                  <Badge variant="secondary">Arts</Badge>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Interdisciplinary Areas</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Environmental Studies</Badge>
                <Badge variant="outline">Public Health</Badge>
                <Badge variant="outline">Education</Badge>
                <Badge variant="outline">Management</Badge>
                <Badge variant="outline">Technology Studies</Badge>
                <Badge variant="outline">Cultural Studies</Badge>
                <Badge variant="outline">Development Studies</Badge>
                <Badge variant="outline">Social Development</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vision and Mission */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-6 w-6 text-blue-600" />
                <span>Vision</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                To become a leading global platform for multidisciplinary research that bridges academic boundaries,
                fosters innovation, and contributes meaningfully to societal development, especially serving the
                educational and research needs of socially challenged communities.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-6 w-6 text-green-600" />
                <span>Mission</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                To provide a rigorous, transparent, and accessible platform for publishing high-quality research that
                advances knowledge, promotes ethical scholarship, facilitates meaningful dialogue across disciplines,
                and serves the broader community with special focus on social development.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Journal Statistics */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-6 w-6 text-orange-600" />
              <span>Journal Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Publication Details</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <strong>ISSN:</strong> Applied (In Process)
                  </li>
                  <li>
                    <strong>Frequency:</strong> Quarterly
                  </li>
                  <li>
                    <strong>Language:</strong> English.
                  </li>
                  <li>
                    <strong>Publisher:</strong> Sri Varaha Lakshmi Narsimha Swami Government Degree College
                  </li>
                  <li>
                    <strong>Accreditation:</strong> NAAC Accredited Institution
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Access & Policies</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <strong>Access Model:</strong> Open Access
                  </li>
                  <li>
                    <strong>Article Processing Charges:</strong> Free for authors
                  </li>
                  <li>
                    <strong>Peer Review:</strong> Double-blind
                  </li>
                  <li>
                    <strong>Average Review Time:</strong> 30-45 days
                  </li>
                  <li>
                    <strong>Archival Policy:</strong> Permanent digital preservation
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-purple-600" />
              <span>Editorial Office</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Contact Details</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <strong>Editor-in-Chief:</strong> Dr. P.Surekha, Principal
                  </li>
                  <li>
                    <strong>Email:</strong> svlns.gdc@gmail.com
                  </li>
                  <li>
                    <strong>Phone:</strong> +91-8247685902
                  </li>
                  <li>
                    <strong>Website:</strong> Under Development
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Postal Address</h4>
                <address className="text-sm not-italic">
                  Editorial Office
                  <br />
                  SVLNS GDC Multidisciplinary Journal
                  <br />
                  Sri Varaha Lakshmi Narsimha Swami
                  <br />
                  Government Degree College
                  <br />
                  Visakhapatnam-Bheemunipatnam Road
                  <br />
                  4.5 KM from Bheemunipatnam
                  <br />
                  Visakhapatnam District, Andhra Pradesh
                  <br />
                  India
                </address>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
