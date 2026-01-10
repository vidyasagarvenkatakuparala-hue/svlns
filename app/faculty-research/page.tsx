"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, User, Building2, BookOpen, Search, GraduationCap, Award } from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { Faculty } from "@/lib/supabase"

export default function FacultyResearchPage() {
  const [faculty, setFaculty] = useState<Faculty[]>([])
  const [filteredFaculty, setFilteredFaculty] = useState<Faculty[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  useEffect(() => {
    fetchFaculty()
  }, [])

  useEffect(() => {
    let filtered = faculty

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (member) =>
          member.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.expertise_areas.some((area) => area.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (member.research_interests && member.research_interests.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Filter by department
    if (selectedDepartment !== "all") {
      filtered = filtered.filter((member) => member.department === selectedDepartment)
    }

    setFilteredFaculty(filtered)
  }, [searchTerm, selectedDepartment, faculty])

  const fetchFaculty = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase.from("faculty").select("*").eq("is_active", true).order("department")

      if (error) {
        console.error("Supabase error:", error)
        setError("Failed to load faculty data from database.")
        return
      }

      setFaculty(data || [])
      setFilteredFaculty(data || [])
    } catch (error) {
      console.error("Error fetching faculty:", error)
      setError("An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  const departments = Array.from(new Set(faculty.map((member) => member.department)))
  const totalPublications = faculty.reduce((sum, member) => sum + member.publications_count, 0)
  const averageExperience = faculty.length
    ? Math.round(faculty.reduce((sum, member) => sum + member.experience_years, 0) / faculty.length)
    : 0

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading faculty research profiles...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button onClick={fetchFaculty} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Faculty Research Profiles</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the diverse research expertise and scholarly contributions of our distinguished faculty members at
            Sri Varaha Lakshmi Narsimha Swami Government Degree College.
          </p>
        </div>

        {/* Research Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <GraduationCap className="w-8 h-8 mx-auto mb-2" />
              <p className="text-3xl font-bold">{faculty.length}</p>
              <p className="text-blue-100">Faculty Members</p>
            </CardContent>
          </Card>
          <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <BookOpen className="w-8 h-8 mx-auto mb-2" />
              <p className="text-3xl font-bold">{totalPublications}</p>
              <p className="text-green-100">Total Publications</p>
            </CardContent>
          </Card>
          <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <Building2 className="w-8 h-8 mx-auto mb-2" />
              <p className="text-3xl font-bold">{departments.length}</p>
              <p className="text-purple-100">Departments</p>
            </CardContent>
          </Card>
          <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <Award className="w-8 h-8 mx-auto mb-2" />
              <p className="text-3xl font-bold">{averageExperience}</p>
              <p className="text-orange-100">Avg. Experience (Years)</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by name, expertise, or research interests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-full md:w-64">
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Faculty Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredFaculty.map((member) => (
            <Card key={member.id} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {member.first_name} {member.last_name}
                    </CardTitle>
                    <p className="text-sm font-medium text-blue-600">{member.position}</p>
                    <p className="text-sm text-gray-600">{member.department}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Experience and Publications */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-2 bg-blue-50 rounded-lg">
                    <p className="text-lg font-bold text-blue-600">{member.experience_years}</p>
                    <p className="text-xs text-gray-600">Years Exp.</p>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded-lg">
                    <p className="text-lg font-bold text-green-600">{member.publications_count}</p>
                    <p className="text-xs text-gray-600">Publications</p>
                  </div>
                </div>

                {/* Expertise Areas */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Expertise</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {member.expertise_areas.map((area, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs bg-blue-100 text-blue-800 hover:bg-blue-200"
                      >
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Research Interests */}
                {member.research_interests && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">Research Interests</h4>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">{member.research_interests}</p>
                  </div>
                )}

                {/* Contact */}
                <div className="pt-2 border-t border-gray-100 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <a
                      href={`mailto:${member.email}`}
                      className="text-sm text-blue-600 hover:text-blue-800 transition-colors truncate"
                    >
                      {member.email}
                    </a>
                  </div>
                  {member.office_location && (
                    <div className="flex items-center space-x-2">
                      <Building2 className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{member.office_location}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredFaculty.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No faculty members found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
          </div>
        )}

        {/* Research Collaboration */}
        <div className="mt-16">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Research Collaboration</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Interested in collaborating with our faculty members? Our researchers are actively engaged in
                interdisciplinary projects and welcome collaboration opportunities with academic institutions, research
                organizations, and industry partners.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:svlns.gdc@gmail.com"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Contact for Collaboration
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Building2 className="w-4 h-4" />
                  Visit Contact Page
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
