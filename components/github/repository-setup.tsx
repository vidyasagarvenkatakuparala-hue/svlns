"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Github, Folder, FileText, Download } from "lucide-react"

export function RepositorySetup() {
  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-xl bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center space-x-2">
            <Github className="h-6 w-6" />
            <span>GitHub Repository Structure</span>
          </CardTitle>
          <CardDescription className="text-green-100">
            Recommended folder structure for storing journal content in GitHub
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Alert>
              <Github className="h-4 w-4" />
              <AlertDescription>
                <strong>Repository Name:</strong> svlns-journal-content
                <br />
                <strong>Visibility:</strong> Public (for open access) or Private (with proper access controls)
              </AlertDescription>
            </Alert>

            <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Folder className="h-4 w-4 text-blue-600" />
                  <span className="font-semibold">svlns-journal-content/</span>
                </div>
                <div className="ml-6 space-y-1">
                  <div className="flex items-center space-x-2">
                    <Folder className="h-4 w-4 text-blue-600" />
                    <span>volumes/</span>
                  </div>
                  <div className="ml-6 space-y-1">
                    <div className="flex items-center space-x-2">
                      <Folder className="h-4 w-4 text-blue-600" />
                      <span>vol-1/</span>
                    </div>
                    <div className="ml-6 space-y-1">
                      <div className="flex items-center space-x-2">
                        <Folder className="h-4 w-4 text-blue-600" />
                        <span>issue-1/</span>
                      </div>
                      <div className="ml-6 space-y-1">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-green-600" />
                          <span>issue-metadata.json</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Folder className="h-4 w-4 text-blue-600" />
                          <span>articles/</span>
                        </div>
                        <div className="ml-6 space-y-1">
                          <div className="flex items-center space-x-2">
                            <Folder className="h-4 w-4 text-blue-600" />
                            <span>001/</span>
                          </div>
                          <div className="ml-6 space-y-1">
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4 text-green-600" />
                              <span>content.md</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Download className="h-4 w-4 text-red-600" />
                              <span>article.pdf</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4 text-yellow-600" />
                              <span>metadata.json</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ml-6 space-y-1">
                  <div className="flex items-center space-x-2">
                    <Folder className="h-4 w-4 text-blue-600" />
                    <span>reviews/</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Folder className="h-4 w-4 text-blue-600" />
                    <span>assets/</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-green-600" />
                    <span>README.md</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2 text-green-700">File Types</h4>
                <div className="space-y-2">
                  <Badge className="bg-green-100 text-green-800">content.md - Article content</Badge>
                  <Badge className="bg-red-100 text-red-800">article.pdf - PDF version</Badge>
                  <Badge className="bg-yellow-100 text-yellow-800">metadata.json - Article metadata</Badge>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-blue-700">Benefits</h4>
                <ul className="text-sm space-y-1">
                  <li>• Version control for all content</li>
                  <li>• Free hosting and bandwidth</li>
                  <li>• Collaborative editing</li>
                  <li>• Backup and redundancy</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
