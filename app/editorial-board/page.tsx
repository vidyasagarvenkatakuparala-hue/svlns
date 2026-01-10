"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, User, Phone, ExternalLink } from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { EditorialBoardMember } from "@/lib/supabase"
import Image from "next/image"

export default function EditorialBoardPage() {
  const [boardMembers, setBoardMembers] = useState<EditorialBoardMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBoardMembers()
  }, [])

  const fetchBoardMembers = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from("editorial_board")
        .select("*")
        .or("is_active.eq.true,is_active.is.null")
        .order("order_position")

      if (error) {
        console.error("Supabase error:", error)
        setError("Failed to load editorial board from database.")
        return
      }

      setBoardMembers(data || [])
    } catch (error) {
      console.error("Error fetching editorial board:", error)
      setError("An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading editorial board...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button onClick={fetchBoardMembers} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (boardMembers.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Editorial Board</h1>
            <p className="text-gray-700">No editorial board records were found.</p>
          </div>
        </div>
      </div>
    )
  }

  const editorInChief = boardMembers.find((member) => (member.position || "").includes("Editor-in-Chief"))
  const associateEditors = boardMembers.filter((member) => (member.position || "").includes("Associate Editor"))
  const managingEditor = boardMembers.find((member) => (member.position || "").includes("Managing Editor"))

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Editorial Board</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Distinguished faculty members from Sri Varaha Lakshmi Narsimha Swami Government Degree College,
            Bheemunipatnam, leading our multidisciplinary journal with expertise across various academic fields.
          </p>
        </div>

        {/* Editor-in-Chief */}
        {editorInChief && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8 text-blue-800">Editor-in-Chief</h2>
            <div className="max-w-4xl mx-auto">
              <Card className="border-2 border-blue-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="w-16 h-16 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {editorInChief.first_name} {editorInChief.last_name}
                      </h3>
                      <p className="text-lg text-blue-600 font-semibold mb-2">{editorInChief.position}</p>
                      <p className="text-gray-600 mb-4">{editorInChief.affiliation}</p>
                      {editorInChief.bio && <p className="text-gray-700 mb-4">{editorInChief.bio}</p>}

                      <div className="flex items-center gap-4 text-sm text-gray-600 justify-center md:justify-start">
                        <span className="inline-flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {editorInChief.email ? (
                            <a href={`mailto:${editorInChief.email}`} className="hover:text-blue-600">
                              {editorInChief.email}
                            </a>
                          ) : (
                            <span className="text-gray-500">Email unavailable</span>
                          )}
                        </span>

                        {/* ✅ Profile Link */}
                        {editorInChief.profile_url && (
                          <>
                            <span className="text-gray-300" aria-hidden="true">
                              •
                            </span>
                            <a
                              href={editorInChief.profile_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 hover:text-blue-600"
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span>Profile</span>
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Associate Editors */}
        {associateEditors.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8 text-green-800">Associate Editors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {associateEditors.map((member) => (
                <Card key={member.id} className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-lg font-bold text-gray-900">
                      {member.first_name} {member.last_name}
                    </CardTitle>
                    <p className="text-green-600 font-semibold">{member.position}</p>
                    <p className="text-sm text-gray-600">{member.affiliation}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {member.bio && <p className="text-sm text-gray-700 mb-4 line-clamp-3">{member.bio}</p>}

                    <div className="flex items-center gap-3 text-xs text-gray-600 justify-center">
                      <span className="inline-flex items-center gap-2">
                        <Mail className="h-3 w-3" />
                        {member.email ? (
                          <a href={`mailto:${member.email}`} className="hover:text-green-600 truncate">
                            {member.email}
                          </a>
                        ) : (
                          <span className="text-gray-500">Email unavailable</span>
                        )}
                      </span>

                      {/* ✅ Profile Link */}
                      {member.profile_url && (
                        <>
                          <span className="text-gray-300" aria-hidden="true">
                            •
                          </span>
                          <a
                            href={member.profile_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 hover:text-green-700"
                          >
                            <ExternalLink className="h-3 w-3" />
                            <span>Profile</span>
                          </a>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Managing Editor */}
        {managingEditor && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8 text-purple-800">Managing Editor</h2>
            <div className="max-w-2xl mx-auto">
              <Card className="border-2 border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {managingEditor.first_name} {managingEditor.last_name}
                      </h3>
                      <p className="text-lg text-purple-600 font-semibold mb-2">{managingEditor.position}</p>
                      <p className="text-gray-600 mb-3">{managingEditor.affiliation}</p>

                      <div className="flex items-center gap-3 text-sm text-gray-600 justify-center md:justify-start">
                        <span className="inline-flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {managingEditor.email ? (
                            <a href={`mailto:${managingEditor.email}`} className="hover:text-purple-600">
                              {managingEditor.email}
                            </a>
                          ) : (
                            <span className="text-gray-500">Email unavailable</span>
                          )}
                        </span>

                        {/* ✅ Profile Link */}
                        {managingEditor.profile_url && (
                          <>
                            <span className="text-gray-300" aria-hidden="true">
                              •
                            </span>
                            <a
                              href={managingEditor.profile_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 hover:text-purple-600"
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span>Profile</span>
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Contact Info */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg p-8 text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">Contact Editorial Office</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              <span>svlns.gdc@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              <span>8247685902</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
