import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Clock, Building2, User } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with the SVLNS GDC Multidisciplinary Journal editorial team. We're here to assist authors,
            reviewers, and readers with all journal-related inquiries.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Editorial Office Contact */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl flex items-center gap-3">
                <Building2 className="h-6 w-6" />
                Editorial Office
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Editor-in-Chief */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">Dr. P. Surekha</h3>
                    <p className="text-blue-600 font-medium">Editor-in-Chief & Principal</p>
                  </div>
                </div>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-blue-500" />
                    <a href="mailto:principal@svlnsgdc.ac.in" className="hover:text-blue-600">
                      principal@svlnsgdc.ac.in
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-blue-500" />
                    <a href="tel:8247685902" className="hover:text-blue-600">
                      8247685902
                    </a>
                  </div>
                </div>
              </div>

              {/* General Contact */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">General Inquiries</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">Journal Email</p>
                      <a href="mailto:svlns.gdc@gmail.com" className="text-green-600 hover:text-green-700">
                        svlns.gdc@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">Office Phone</p>
                      <a href="tel:8247685902" className="text-green-600 hover:text-green-700">
                        8247685902
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-gray-600" />
                  <h4 className="font-semibold text-gray-900">Office Hours</h4>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                  <p>Saturday: 9:00 AM - 1:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* College Information */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl flex items-center gap-3">
                <MapPin className="h-6 w-6" />
                College Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* College Logo and Name */}
              <div className="text-center border-b border-gray-200 pb-4">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-900">
                  Sri Varaha Lakshmi Narsimha Swami Government Degree College
                </h3>
                <p className="text-gray-600">Established 1984</p>
              </div>

              {/* Address */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Address
                </h4>
                <div className="text-gray-600 leading-relaxed">
                  <p>Bheemunipatnam</p>
                  <p>Visakhapatnam District</p>
                  <p>Andhra Pradesh - 531163</p>
                  <p>India</p>
                </div>
              </div>

              {/* Affiliation */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Affiliation</h4>
                <p className="text-gray-700">Andhra University, Visakhapatnam</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">40+</p>
                  <p className="text-sm text-gray-600">Years of Excellence</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">12+</p>
                  <p className="text-sm text-gray-600">Departments</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submission Guidelines Quick Links */}
        <div className="mt-12">
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl text-center">Quick Links for Authors</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Submit Manuscript</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Submit your research articles through our online submission system.
                  </p>
                  <a
                    href="/submit"
                    className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Submit Now
                  </a>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Submission Guidelines</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Review our comprehensive guidelines for manuscript preparation.
                  </p>
                  <a
                    href="/submission-guidelines"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Guidelines
                  </a>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Editorial Board</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Meet our distinguished editorial board members and their expertise.
                  </p>
                  <a
                    href="/editorial-board"
                    className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    View Board
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Response Time Information */}
        <div className="mt-8 text-center">
          <Card className="max-w-2xl mx-auto shadow-lg border-0">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Response Times</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">General Inquiries:</span>
                  <Badge variant="secondary">24-48 hours</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Submission Acknowledgment:</span>
                  <Badge variant="secondary">1-2 business days</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Review Process:</span>
                  <Badge variant="secondary">4-6 weeks</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Publication Decision:</span>
                  <Badge variant="secondary">6-8 weeks</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
