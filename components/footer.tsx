import Link from "next/link"
import { BookOpen, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-full p-2">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-lg">SVLNS GDC Multidisciplinary Journal </span>
            </div>
            <p className="text-gray-300 text-sm">
              Advancing multidisciplinary research through rigorous peer review and open access publishing.
            </p>
            <p className="text-gray-400 text-xs mt-2">Established 1984 • NAAC Accredited • Journal Launch 2025</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-blue-300">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-blue-300 transition-colors">
                  About Journal
                </Link>
              </li>
              <li>
                <Link href="/college-info" className="text-gray-300 hover:text-blue-300 transition-colors">
                  College Info
                </Link>
              </li>
              <li>
                <Link href="/faculty-research" className="text-gray-300 hover:text-blue-300 transition-colors">
                  Faculty Research
                </Link>
              </li>
              <li>
                <Link href="/submission-guidelines" className="text-gray-300 hover:text-blue-300 transition-colors">
                  Submit Article
                </Link>
              </li>
              <li>
                <Link href="/review-policy" className="text-gray-300 hover:text-blue-300 transition-colors">
                  Review Process
                </Link>
              </li>
              <li>
                <Link href="/archives" className="text-gray-300 hover:text-blue-300 transition-colors">
                  Archives
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-purple-300">Policies</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/ethics" className="text-gray-300 hover:text-purple-300 transition-colors">
                  Ethics Guidelines
                </Link>
              </li>
              <li>
                <Link href="/ethics#plagiarism" className="text-gray-300 hover:text-purple-300 transition-colors">
                  Plagiarism Policy
                </Link>
              </li>
              <li>
                <Link href="/ethics#ai-policy" className="text-gray-300 hover:text-purple-300 transition-colors">
                  AI Content Policy
                </Link>
              </li>
              <li>
                <Link href="/ethics#open-access" className="text-gray-300 hover:text-purple-300 transition-colors">
                  Open Access Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-green-300">Contact Info</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-green-400" />
                <span>svlns.gdc@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-400" />
                <span>+91-8247685902</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-green-400" />
                <span>SVLNS GDC, Bheemunipatnam, Visakhapatnam, AP</span>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30">
              <p className="text-xs text-yellow-300">
                <strong>ISSN Status:</strong> Application Submitted
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>
              &copy; 2025 SVLNS GDC Multidisciplinary Journal . All rights
              reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-medium">
                NAAC Accredited • ISSN: Application in Process
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
