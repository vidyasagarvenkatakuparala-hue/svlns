"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  FileText,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  Mail,
  Calendar,
  User,
  Building,
} from "lucide-react"
import { supabase, type Submission } from "@/lib/supabase"
import { toast } from "sonner"

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    fetchSubmissions()
  }, [])

  useEffect(() => {
    filterSubmissions()
  }, [submissions, searchTerm, statusFilter])

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase.from("submissions").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching submissions:", error)
        toast.error("Failed to fetch submissions")
        return
      }

      setSubmissions(data || [])
    } catch (error) {
      console.error("Error:", error)
      toast.error("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const filterSubmissions = () => {
    let filtered = submissions

    if (searchTerm) {
      filtered = filtered.filter(
        (submission) =>
          submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          submission.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
          submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          submission.institution.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((submission) => submission.status === statusFilter)
    }

    setFilteredSubmissions(filtered)
  }

  const updateSubmissionStatus = async (id: string, newStatus: Submission["status"]) => {
    setIsUpdating(true)
    try {
      const { error } = await supabase
        .from("submissions")
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq("id", id)

      if (error) {
        console.error("Error updating submission:", error)
        toast.error("Failed to update submission status")
        return
      }

      toast.success("Submission status updated successfully")
      fetchSubmissions()
      setSelectedSubmission(null)
    } catch (error) {
      console.error("Error:", error)
      toast.error("An unexpected error occurred")
    } finally {
      setIsUpdating(false)
    }
  }

  const getStatusBadge = (status: Submission["status"]) => {
    const statusConfig = {
      submitted: { color: "bg-blue-100 text-blue-800", icon: Clock },
      under_review: { color: "bg-yellow-100 text-yellow-800", icon: Eye },
      accepted: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      rejected: { color: "bg-red-100 text-red-800", icon: XCircle },
    }

    const config = statusConfig[status]
    const Icon = config.icon

    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {status.replace("_", " ").toUpperCase()}
      </Badge>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading submissions...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manuscript Submissions</h1>
          <p className="text-gray-600">Manage and review submitted manuscripts</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                  <p className="text-2xl font-bold text-gray-900">{submissions.length}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Under Review</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {submissions.filter((s) => s.status === "under_review").length}
                  </p>
                </div>
                <Eye className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Accepted</p>
                  <p className="text-2xl font-bold text-green-600">
                    {submissions.filter((s) => s.status === "accepted").length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {submissions.filter((s) => s.status === "submitted").length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by title, author, email, or institution..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="md:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submissions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Submissions ({filteredSubmissions.length})</CardTitle>
            <CardDescription>Click on any submission to view details and manage status</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredSubmissions.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No submissions found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Author(s)</TableHead>
                      <TableHead>Institution</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions.map((submission) => (
                      <TableRow key={submission.id} className="cursor-pointer hover:bg-gray-50">
                        <TableCell className="font-medium">
                          <div className="max-w-xs truncate" title={submission.title}>
                            {submission.title}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs truncate" title={submission.authors}>
                            {submission.authors}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs truncate" title={submission.institution}>
                            {submission.institution}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(submission.status)}</TableCell>
                        <TableCell>{formatDate(submission.created_at)}</TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedSubmission(submission)}>
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="text-xl">Submission Details</DialogTitle>
                                <DialogDescription>Review and manage this manuscript submission</DialogDescription>
                              </DialogHeader>

                              {selectedSubmission && (
                                <div className="space-y-6">
                                  {/* Basic Information */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-sm font-medium text-gray-700">Title</Label>
                                      <p className="mt-1 text-sm text-gray-900">{selectedSubmission.title}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-gray-700">Status</Label>
                                      <div className="mt-1">{getStatusBadge(selectedSubmission.status)}</div>
                                    </div>
                                  </div>

                                  {/* Author Information */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                        <User className="h-4 w-4" />
                                        Author(s)
                                      </Label>
                                      <p className="mt-1 text-sm text-gray-900">{selectedSubmission.authors}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                        <Mail className="h-4 w-4" />
                                        Email
                                      </Label>
                                      <p className="mt-1 text-sm text-gray-900">{selectedSubmission.email}</p>
                                    </div>
                                  </div>

                                  <div>
                                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                      <Building className="h-4 w-4" />
                                      Institution
                                    </Label>
                                    <p className="mt-1 text-sm text-gray-900">{selectedSubmission.institution}</p>
                                  </div>

                                  {/* Manuscript URL */}
                                  {selectedSubmission?.pdf_url && (
                                    <div>
                                      <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                        <ExternalLink className="h-4 w-4" />
                                        Manuscript URL
                                      </Label>
                                      <div className="mt-1">
                                        <a
                                          href={selectedSubmission.pdf_url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-blue-600 hover:text-blue-800 underline text-sm break-all"
                                        >
                                          {selectedSubmission.pdf_url}
                                        </a>
                                      </div>
                                    </div>
                                  )}

                                  {/* Abstract */}
                                  <div>
                                    <Label className="text-sm font-medium text-gray-700">Abstract</Label>
                                    <div className="mt-1 p-3 bg-gray-50 rounded-md">
                                      <p className="text-sm text-gray-900 whitespace-pre-wrap">
                                        {selectedSubmission.abstract}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Keywords */}
                                  <div>
                                    <Label className="text-sm font-medium text-gray-700">Keywords</Label>
                                    <p className="mt-1 text-sm text-gray-900">{selectedSubmission.keywords}</p>
                                  </div>

                                  {/* Dates */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        Submitted
                                      </Label>
                                      <p className="mt-1 text-sm text-gray-900">
                                        {formatDate(selectedSubmission.created_at)}
                                      </p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-gray-700">Year</Label>
                                      <p className="mt-1 text-sm text-gray-900">{selectedSubmission.year}</p>
                                    </div>
                                  </div>

                                  {/* Status Update */}
                                  <div className="border-t pt-6">
                                    <Label className="text-sm font-medium text-gray-700 mb-3 block">
                                      Update Status
                                    </Label>
                                    <div className="flex flex-wrap gap-2">
                                      <Button
                                        variant={selectedSubmission.status === "submitted" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => updateSubmissionStatus(selectedSubmission.id, "submitted")}
                                        disabled={isUpdating}
                                      >
                                        <Clock className="h-4 w-4 mr-1" />
                                        Submitted
                                      </Button>
                                      <Button
                                        variant={selectedSubmission.status === "under_review" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => updateSubmissionStatus(selectedSubmission.id, "under_review")}
                                        disabled={isUpdating}
                                      >
                                        <Eye className="h-4 w-4 mr-1" />
                                        Under Review
                                      </Button>
                                      <Button
                                        variant={selectedSubmission.status === "accepted" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => updateSubmissionStatus(selectedSubmission.id, "accepted")}
                                        disabled={isUpdating}
                                      >
                                        <CheckCircle className="h-4 w-4 mr-1" />
                                        Accepted
                                      </Button>
                                      <Button
                                        variant={selectedSubmission.status === "rejected" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => updateSubmissionStatus(selectedSubmission.id, "rejected")}
                                        disabled={isUpdating}
                                      >
                                        <XCircle className="h-4 w-4 mr-1" />
                                        Rejected
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
