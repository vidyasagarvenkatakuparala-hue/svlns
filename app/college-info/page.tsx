import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, Users, BookOpen, Award, MapPin, Calendar, Shield } from "lucide-react"
import Image from "next/image"

export default function CollegeInfoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/college-logo.png"
              alt="Sri Varaha Lakshmi Narsimha Swami Government Degree College Logo"
              width={120}
              height={120}
              className="rounded-full"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Sri Varaha Lakshmi Narsimha Swami Government Degree College
          </h1>
          <p className="text-xl text-gray-600">The Academic Foundation Behind Our Multidisciplinary Journal</p>
        </div>

        {/* College Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="h-6 w-6 text-blue-600" />
              <span>College Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Sri Varaha Lakshmi Narsimha Swami Government Degree College, Bheemunipatnam was established in 1984. The
              college is situated on a hillock on Visakhapatnam-Bheemunipatnam road, 4.5 KM away from Bheemunipatnam
              town. The college has completed over 30 years of its fruitful existence and continues to serve the
              educational community with dedication.
            </p>
            <p>
              The institution has been serving the educational needs of student community who come from socially
              challenged sections of the society. This commitment to inclusive education and social development forms
              the cornerstone of the college's mission and values.
            </p>
            <p>
              The college has been accredited by National Assessment and Accreditation Council (NAAC), Bengalore, which
              recognizes its commitment to quality education and institutional excellence. The establishment of the
              SVLNS GDC Multidisciplinary Journal represents the college's continued commitment to advancing research
              and scholarly publication.
            </p>
          </CardContent>
        </Card>

        {/* NAAC Accreditation */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-green-600" />
              <span>NAAC Accreditation</span>
            </CardTitle>
            <CardDescription>Quality assurance and institutional excellence</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The college has been accredited by the National Assessment and Accreditation Council (NAAC), Bengalore,
              which is a testament to its commitment to quality education and institutional excellence.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">NAAC Benefits</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Quality assurance in education</li>
                  <li>• Institutional credibility and recognition</li>
                  <li>• Continuous improvement processes</li>
                  <li>• Enhanced academic standards</li>
                  <li>• Better funding opportunities</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Quality Parameters</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Teaching-learning processes</li>
                  <li>• Research and innovation</li>
                  <li>• Infrastructure and facilities</li>
                  <li>• Student support services</li>
                  <li>• Governance and leadership</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location & Infrastructure */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-6 w-6 text-purple-600" />
              <span>Location & Infrastructure</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Strategic Location</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Situated on a hillock on Visakhapatnam-Bheemunipatnam road</li>
                  <li>• 4.5 KM away from Bheemunipatnam town</li>
                  <li>• Scenic and conducive environment for learning</li>
                  <li>• Well-connected to Visakhapatnam city</li>
                  <li>• Serves the coastal Andhra Pradesh region</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Academic Infrastructure</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Modern classrooms and laboratories</li>
                  <li>• Well-equipped library facilities</li>
                  <li>• Computer and internet facilities</li>
                  <li>• Research and seminar halls</li>
                  <li>• Sports and recreational facilities</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Historical Significance */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-indigo-600" />
              <span>Historical Journey</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                Established in 1984, Sri Varaha Lakshmi Narsimha Swami Government Degree College has completed over 30
                years of fruitful existence. The college has been a beacon of hope for students from socially challenged
                sections of society, providing them with quality higher education opportunities.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Key Milestones</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• 1984: College establishment</li>
                    <li>• 30+ years of educational service</li>
                    <li>• NAAC accreditation achieved</li>
                    <li>• Thousands of graduates produced</li>
                    <li>• 2024: Multidisciplinary Journal launch</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Social Impact</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Serving socially challenged sections</li>
                    <li>• Promoting inclusive education</li>
                    <li>• Community development focus</li>
                    <li>• Regional educational hub</li>
                    <li>• Social transformation through education</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic Programs */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-green-600" />
              <span>Academic Programs & Departments</span>
            </CardTitle>
            <CardDescription>Diverse academic offerings supporting multidisciplinary research</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Science Departments</h4>
                <div className="space-y-2">
                  <Badge variant="secondary">Physics</Badge>
                  <Badge variant="secondary">Chemistry</Badge>
                  <Badge variant="secondary">Mathematics</Badge>
                  <Badge variant="secondary">Computer Science</Badge>
                  <Badge variant="secondary">Biology</Badge>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Arts & Humanities</h4>
                <div className="space-y-2">
                  <Badge variant="secondary">English Literature</Badge>
                  <Badge variant="secondary">Telugu Literature</Badge>
                  <Badge variant="secondary">History</Badge>
                  <Badge variant="secondary">Philosophy</Badge>
                  <Badge variant="secondary">Sanskrit</Badge>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Social Sciences</h4>
                <div className="space-y-2">
                  <Badge variant="secondary">Economics</Badge>
                  <Badge variant="secondary">Political Science</Badge>
                  <Badge variant="secondary">Sociology</Badge>
                  <Badge variant="secondary">Psychology</Badge>
                  <Badge variant="secondary">Public Administration</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Research Excellence */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-6 w-6 text-orange-600" />
              <span>Research Excellence & Social Commitment</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                The college has been fostering a culture of research and innovation while maintaining its commitment to
                serving socially challenged sections of society. This unique combination of academic excellence and
                social responsibility forms the foundation for our multidisciplinary journal.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Research Initiatives</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Faculty research projects</li>
                    <li>• Student research programs</li>
                    <li>• Interdisciplinary collaborations</li>
                    <li>• Social development research</li>
                    <li>• Community-based studies</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Social Commitment</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Serving socially challenged students</li>
                    <li>• Inclusive education practices</li>
                    <li>• Community outreach programs</li>
                    <li>• Social awareness initiatives</li>
                    <li>• Regional development focus</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Student Community */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-teal-600" />
              <span>Student Community & Impact</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Student Demographics</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Students from socially challenged sections</li>
                  <li>• Diverse regional representation</li>
                  <li>• First-generation college students</li>
                  <li>• Rural and semi-urban backgrounds</li>
                  <li>• Economically disadvantaged communities</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Alumni Impact</h4>
                <ul className="space-y-2 text-sm">
                  <li>• 30+ years of graduates</li>
                  <li>• Social transformation leaders</li>
                  <li>• Government service professionals</li>
                  <li>• Community development workers</li>
                  <li>• Educational sector contributors</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Journal Connection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-indigo-600" />
              <span>Journal Initiative</span>
            </CardTitle>
            <CardDescription>How 30+ years of social commitment led to the journal's establishment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                The SVLNS GDC Multidisciplinary Journal was established in 2024 as a natural extension of the college's
                30+ year commitment to education and social development. The journal represents:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Institutional Foundation</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• 30+ years of educational excellence</li>
                    <li>• NAAC accredited quality standards</li>
                    <li>• Faculty expertise across disciplines</li>
                    <li>• Research infrastructure support</li>
                    <li>• Commitment to social development</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Journal Vision</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Promoting inclusive research</li>
                    <li>• Supporting scholarly publication</li>
                    <li>• Bridging academia and society</li>
                    <li>• Encouraging interdisciplinary studies</li>
                    <li>• Contributing to social transformation</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
