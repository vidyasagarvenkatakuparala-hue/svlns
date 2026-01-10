import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, Globe, Mail } from "lucide-react"

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Information Gathering</h1>
          <p className="text-xl text-gray-600">
            How to provide specific college information for accurate journal website content
          </p>
        </div>

        <Alert className="mb-8">
          <Info className="h-4 w-4" />
          <AlertDescription>
            To create the most accurate journal website content, we need specific information from the official SVLNS
            GDC website.
          </AlertDescription>
        </Alert>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-6 w-6 text-blue-600" />
              <span>Information We Can Include</span>
            </CardTitle>
            <CardDescription>Please provide any of the following information from the college website</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">College Details</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Exact establishment year</li>
                  <li>• Complete address with pin code</li>
                  <li>• Official phone numbers</li>
                  <li>• Email addresses</li>
                  <li>• College motto or vision statement</li>
                  <li>• Accreditation details (NAAC, etc.)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Academic Information</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Complete list of departments</li>
                  <li>• Courses offered (UG/PG)</li>
                  <li>• Faculty names and qualifications</li>
                  <li>• Student strength</li>
                  <li>• Research centers or labs</li>
                  <li>• Library and infrastructure details</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Leadership</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Principal's name and profile</li>
                  <li>• Vice-Principal details</li>
                  <li>• Department heads</li>
                  <li>• Administrative staff</li>
                  <li>• Governing body members</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Achievements</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Awards and recognitions</li>
                  <li>• Notable alumni</li>
                  <li>• Research publications</li>
                  <li>• Community service initiatives</li>
                  <li>• Academic partnerships</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How to Provide Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>You can help us create accurate content by:</p>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Copy and paste relevant text from the college website</li>
                <li>Provide specific details about departments and faculty</li>
                <li>Share any official documents or brochures</li>
                <li>Include contact information and addresses</li>
                <li>Mention any special programs or initiatives</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Current Placeholder Information</CardTitle>
            <CardDescription>
              The journal website currently uses general information that should be updated
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert>
                <AlertDescription>
                  <strong>Note:</strong> All contact details, faculty names, and specific college information in the
                  current website are placeholders and should be replaced with actual information from the official
                  college website.
                </AlertDescription>
              </Alert>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Items to Update:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Phone numbers (currently +91-XXX-XXX-XXXX)</li>
                    <li>• Email addresses</li>
                    <li>• Faculty names and profiles</li>
                    <li>• Exact college address</li>
                    <li>• Department details</li>
                    <li>• Research information</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Ready to Customize:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Editorial board composition</li>
                    <li>• Journal scope and focus areas</li>
                    <li>• Submission guidelines</li>
                    <li>• Review policies</li>
                    <li>• Publication schedule</li>
                    <li>• Contact forms</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="h-6 w-6 text-green-600" />
              <span>Next Steps</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>To complete the journal website with accurate information:</p>
              <ol className="list-decimal list-inside space-y-3 text-sm">
                <li>
                  <strong>Gather College Information:</strong> Visit www.svlnsgdc.ac.in and collect specific details
                  about:
                  <ul className="ml-6 mt-2 space-y-1">
                    <li>- Official college name and address</li>
                    <li>- Contact information</li>
                    <li>- Faculty and staff details</li>
                    <li>- Academic programs</li>
                  </ul>
                </li>
                <li>
                  <strong>Provide the Information:</strong> Share the collected information so we can update the website
                </li>
                <li>
                  <strong>Review and Refine:</strong> We'll update the website and you can review for accuracy
                </li>
                <li>
                  <strong>Finalize Content:</strong> Make any final adjustments to ensure everything is correct
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
