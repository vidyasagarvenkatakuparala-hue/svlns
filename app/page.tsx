import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  BookOpen,
  Users,
  Award,
  Calendar,
  MapPin,
  Mail,
  Phone,
  ExternalLink,
  Download,
  Eye,
  Search,
} from "lucide-react"
import { createClient } from "@/lib/supabase/server"

export default async function HomePage() {
  const supabase = await createClient()
  let journalName = "SVLNS GDC Multidisciplinary Journal"
  let journalTagline = ""
  let journalEmail = "svlns.gdc@gmail.com"

  try {
    const { data: settings } = await supabase.from("journal_settings").select("*")
    const getVal = (k: string): unknown => {
      if (!settings || settings.length === 0) return undefined
      const first = settings[0] as any
      if (typeof first === "object" && first && "key" in first && "value" in first) {
        const match = (settings as any[]).find((r) => r?.key === k)
        return match?.value
      }
      return (first as any)?.[k]
    }

    const nameCandidate =
      (getVal("journal_name") as string) || (getVal("name") as string) || (getVal("title") as string)

    const taglineCandidate =
      (getVal("tagline") as string) || (getVal("subtitle") as string) || (getVal("description") as string)

    const emailCandidate =
      (getVal("journal_email") as string) || (getVal("email") as string) || (getVal("contact_email") as string)

    if (nameCandidate && typeof nameCandidate === "string") journalName = nameCandidate
    if (taglineCandidate && typeof taglineCandidate === "string") journalTagline = taglineCandidate
    if (emailCandidate && typeof emailCandidate === "string") journalEmail = emailCandidate
  } catch (_e) {}

  let currentIssue: any = null
  let currentArticlesCount = 0
  let currentTotalPages: number | string = "TBD"
  let currentPubDateLabel = ""

  try {
    // Re-read settings to allow explicit overrides for current issue selection
    const { data: settings2 } = await supabase.from("journal_settings").select("*")
    const getVal2 = (k: string): any => {
      if (!settings2 || settings2.length === 0) return undefined
      const first = settings2[0] as any
      if (first && (("setting_key" in first && "setting_value" in first) || ("key" in first && "value" in first))) {
        const keyField = "setting_key" in first ? "setting_key" : "key" in first ? "key" : "setting_key"
        const valField = "setting_value" in first ? "setting_value" : "value" in first ? "value" : "setting_value"
        const row = (settings2 as any[]).find((r) => String(r?.[keyField] ?? "").toLowerCase() === k)
        return row?.[valField]
      }
      return (first as any)?.[k]
    }

    const volStr = getVal2("current_volume") || getVal2("currentvolume")
    const issStr = getVal2("current_issue_number") || getVal2("current_issue") || getVal2("currentissue")
    const overrideVolume =
      typeof volStr === "string" && !isNaN(Number.parseInt(volStr)) ? Number.parseInt(volStr) : undefined
    const overrideIssue =
      typeof issStr === "string" && !isNaN(Number.parseInt(issStr)) ? Number.parseInt(issStr) : undefined

    const statusFilter = "status.is.null,status.eq.published,status.eq.Published"

    async function getIssueByOverride(vol: number, iss: number) {
      // Try matching issues.volume first
      const res = await supabase
        .from("issues")
        .select("*")
        .eq("volume", vol)
        .eq("issue_number", iss)
        .limit(1)
        .maybeSingle()

      // If column mismatch or not found, try issues.volume_number
      if ((res.error && /column .*volume/i.test(res.error.message)) || !res.data) {
        const res2 = await supabase
          .from("issues")
          .select("*")
          .eq("volume_number", vol)
          .eq("issue_number", iss)
          .limit(1)
          .maybeSingle()
        return res2
      }
      return res
    }

    async function getLatestIssue() {
      // Avoid referencing 'volume'/'volume_number' to prevent column-not-found errors
      return await supabase
        .from("issues")
        .select("*")
        .or(statusFilter)
        .order("publication_date", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false, nullsFirst: false })
        .limit(1)
        .maybeSingle()
    }

    let issueData: any = null
    let issueErr: any = null

    if (overrideVolume !== undefined && overrideIssue !== undefined) {
      const r = await getIssueByOverride(overrideVolume, overrideIssue)
      issueData = r.data
      issueErr = r.error
      if (!issueData) {
        console.log("[v0] Override issue not found by volume; trying volume_number fallback:", {
          overrideVolume,
          overrideIssue,
          error: r.error?.message,
        })
      }
    } else {
      const r = await getLatestIssue()
      issueData = r.data
      issueErr = r.error
    }

    if (!issueErr && issueData) {
      currentIssue = issueData
      const safeVolume = (currentIssue?.volume ?? currentIssue?.volume_number) as number | undefined

      currentPubDateLabel = currentIssue.publication_date
        ? new Date(currentIssue.publication_date).toLocaleDateString()
        : "TBD"

      // Fetch articles and compute totals. Articles table uses 'volume' and 'issue'.
      const { data: arts, error: artsErr } = await supabase
        .from("articles")
        .select("id,page_count")
        .or(statusFilter)
        .eq("volume", safeVolume ?? -1)
        .eq("issue", currentIssue.issue_number)

      if (!artsErr && arts) {
        currentArticlesCount = arts.length
        const sum = arts.reduce((acc, a: any) => acc + (a?.page_count || 0), 0)
        currentTotalPages = currentIssue.total_pages || (sum > 0 ? sum : "TBD")
      }

      console.log("[v0] Home current issue summary:", {
        vol: safeVolume,
        issue: currentIssue?.issue_number,
        year: currentIssue?.year,
        total_pages: currentTotalPages,
        articles: currentArticlesCount,
        overrideVolume,
        overrideIssue,
      })
    } else {
      console.log("[v0] Home current issue not resolved:", {
        error: issueErr?.message,
        overrideVolume,
        overrideIssue,
      })
    }
  } catch (e) {
    console.log("[v0] Home current issue fetch error:", (e as any)?.message || e)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Image
                src="/images/college-logo.png"
                alt="SVLNS GDC Logo"
                width={120}
                height={120}
                className="rounded-full border-4 border-white shadow-2xl bg-white p-2"
              />
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                Est. 1984
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {journalName}
            {journalTagline && (
              <span className="block text-3xl md:text-5xl mt-2 text-yellow-200">{journalTagline}</span>
            )}
          </h1>

          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
            Sri Varaha Lakshmi Narsimha Swami Government Degree College
            <span className="block mt-2 text-lg opacity-90">
              Celebrating 40+ Years of Educational Excellence & Social Transformation
            </span>
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-sm">
              <Award className="h-4 w-4 mr-2" />
              NAAC Accredited
            </Badge>
            <Badge className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-sm">
              <Calendar className="h-4 w-4 mr-2" />
              Established 1984
            </Badge>
            <Badge className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 text-sm">
              <BookOpen className="h-4 w-4 mr-2" />
              ISSN: Applied
            </Badge>
            <Badge className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 text-sm">
              <Users className="h-4 w-4 mr-2" />
              Social Impact Focus
            </Badge>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg">
              <Link href="/submit">
                <BookOpen className="h-5 w-5 mr-2" />
                Submit Article
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <Link href="/archives">
                <Eye className="h-5 w-5 mr-2" />
                Browse Issues
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <Link href="/submission-guidelines">
                <Download className="h-5 w-5 mr-2" />
                Guidelines
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* College Heritage Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Heritage & Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Four decades of transforming lives through education and serving socially challenged communities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <MapPin className="h-8 w-8 text-blue-600" />
                  <div>
                    <CardTitle className="text-lg">Strategic Location</CardTitle>
                    <CardDescription>Hillock Campus</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Situated on a scenic hillock on Visakhapatnam-Bheemunipatnam road, 4.5 KM from Bheemunipatnam town,
                  providing an ideal environment for learning and research.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Award className="h-8 w-8 text-green-600" />
                  <div>
                    <CardTitle className="text-lg">NAAC Accredited</CardTitle>
                    <CardDescription>Quality Assured</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Accredited by the National Assessment and Accreditation Council (NAAC), Bengalore, ensuring high
                  standards of education and institutional excellence.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-purple-600" />
                  <div>
                    <CardTitle className="text-lg">Social Mission</CardTitle>
                    <CardDescription>Community Focus</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Dedicated to serving the educational needs of students from socially challenged sections of society,
                  promoting inclusive education and social transformation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Current Issue Highlight */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Current Issue</h2>
            <p className="text-lg text-gray-600">
              {currentIssue
                ? `Volume ${(currentIssue?.volume ?? currentIssue?.volume_number) as number}, Issue ${
                    currentIssue.issue_number
                  } (${currentIssue.year ?? ""})`
                : "Volume 1, Issue 1 - Inaugural Edition"}
            </p>
          </div>

          <Card className="max-w-4xl mx-auto border-2 border-blue-200 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <div className="text-center">
                <CardTitle className="text-2xl mb-2">
                  {currentIssue?.title || "Foundations of Multidisciplinary Research"}
                </CardTitle>
                <CardDescription className="text-blue-100 text-lg">
                  Celebrating 40 Years of Educational Excellence & Social Transformation
                </CardDescription>
                <div className="flex justify-center gap-4 mt-4">
                  <Badge className="bg-white text-blue-600">{`Volume ${
                    currentIssue?.volume ?? currentIssue?.volume_number ?? 1
                  }`}</Badge>
                  <Badge className="bg-white text-blue-600">{`Issue ${currentIssue?.issue_number ?? 1}`}</Badge>
                  <Badge className="bg-white text-blue-600">{currentPubDateLabel || "January 2025"}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Featured Articles</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-l-green-500 pl-4">
                      <h4 className="font-medium text-gray-900">Biodiversity Conservation in Coastal Andhra Pradesh</h4>
                      <p className="text-sm text-gray-600">Community-based conservation initiatives</p>
                    </div>
                    <div className="border-l-4 border-l-blue-500 pl-4">
                      <h4 className="font-medium text-gray-900">Historical Significance of Bheemunipatnam</h4>
                      <p className="text-sm text-gray-600">Archaeological evidence of maritime trade</p>
                    </div>
                    <div className="border-l-4 border-l-purple-500 pl-4">
                      <h4 className="font-medium text-gray-900">Traditional Medicinal Plants Analysis</h4>
                      <p className="text-sm text-gray-600">Chemical analysis of coastal community remedies</p>
                    </div>
                    <div className="border-l-4 border-l-orange-500 pl-4">
                      <h4 className="font-medium text-gray-900">Socio-Economic Impact of Higher Education</h4>
                      <p className="text-sm text-gray-600">40-year transformation study of SVLNS GDC</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="text-center mb-6">
                    <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-8 rounded-lg mb-4">
                      <BookOpen className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                      <p className="text-2xl font-bold text-gray-900">
                        {currentArticlesCount} {currentArticlesCount === 1 ? "Article" : "Articles"}
                      </p>
                      <p className="text-gray-600">
                        {typeof currentTotalPages === "number" ? `${currentTotalPages} Pages` : currentTotalPages}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button asChild className="bg-blue-600 hover:bg-blue-700">
                      <Link href="/archives">
                        <Eye className="h-4 w-4 mr-2" />
                        View Full Issue
                      </Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/archives">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">For Authors & Researchers</h2>
            <p className="text-lg text-gray-600">
              Join our community of scholars contributing to multidisciplinary research
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-blue-300">
              <CardContent className="p-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Submit Article</h3>
                <p className="text-gray-600 mb-4 text-sm">Share your research with our academic community</p>
                <Button asChild size="sm" className="w-full">
                  <Link href="/submit">Submit Now</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-green-300">
              <CardContent className="p-6">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Guidelines</h3>
                <p className="text-gray-600 mb-4 text-sm">Review submission and formatting requirements</p>
                <Button asChild size="sm" variant="outline" className="w-full bg-transparent">
                  <Link href="/submission-guidelines">View Guidelines</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-purple-300">
              <CardContent className="p-6">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Editorial Board</h3>
                <p className="text-gray-600 mb-4 text-sm">Meet our distinguished editorial team</p>
                <Button asChild size="sm" variant="outline" className="w-full bg-transparent">
                  <Link href="/editorial-board">Meet Editors</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-orange-300">
              <CardContent className="p-6">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Browse Archives</h3>
                <p className="text-gray-600 mb-4 text-sm">Explore published research articles</p>
                <Button asChild size="sm" variant="outline" className="w-full bg-transparent">
                  <Link href="/archives">Browse Now</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Connect With Us</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="flex flex-col items-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-blue-100">{journalEmail}</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Phone className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-blue-100">+91-8247-685902</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <p className="text-blue-100 text-sm">
                Bheemunipatnam, Visakhapatnam District
                <br />
                Andhra Pradesh - 531163
              </p>
            </div>
          </div>

          <Separator className="bg-white/20 mb-8" />

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <Link href="/about">
                <ExternalLink className="h-4 w-4 mr-2" />
                About Journal
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <Link href="/college-info">
                <ExternalLink className="h-4 w-4 mr-2" />
                College Information
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <Link href="/contact">
                <ExternalLink className="h-4 w-4 mr-2" />
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
