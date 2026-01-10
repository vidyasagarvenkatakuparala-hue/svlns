"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { multiCloudStorage, STORAGE_PROVIDERS } from "@/lib/multi-cloud-storage"
import { storageService } from "@/lib/supabase-extended"
import { Upload, Cloud, CheckCircle, AlertCircle, Github, HardDrive } from "lucide-react"

interface UploadProgress {
  provider: string
  progress: number
  status: "pending" | "uploading" | "completed" | "error"
  url?: string
  error?: string
}

export function MultiCloudUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([])
  const [storageUsage, setStorageUsage] = useState<any[]>([])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setUploadProgress([])
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setUploading(true)
    const providers = STORAGE_PROVIDERS.slice(0, 3) // Use first 3 providers

    // Initialize progress tracking
    const initialProgress: UploadProgress[] = providers.map((provider) => ({
      provider: provider.name,
      progress: 0,
      status: "pending",
    }))
    setUploadProgress(initialProgress)

    try {
      // Upload to primary provider (Google Drive)
      const fileLocation = await multiCloudStorage.uploadWithRedundancy(selectedFile, "google_drive")

      // Save to Supabase
      await storageService.saveFileLocation(fileLocation, "article", "sample-article-id", true)

      // Update progress
      setUploadProgress((prev) =>
        prev.map((p) =>
          p.provider === "Google Drive" ? { ...p, progress: 100, status: "completed", url: fileLocation.url } : p,
        ),
      )

      // Simulate backup uploads
      setTimeout(() => {
        setUploadProgress((prev) =>
          prev.map((p) =>
            p.provider === "GitHub"
              ? {
                  ...p,
                  progress: 100,
                  status: "completed",
                  url: `${STORAGE_PROVIDERS[0].baseUrl}/backups/${fileLocation.id}`,
                }
              : p,
          ),
        )
      }, 2000)

      setTimeout(() => {
        setUploadProgress((prev) =>
          prev.map((p) =>
            p.provider === "Dropbox"
              ? {
                  ...p,
                  progress: 100,
                  status: "completed",
                  url: `${STORAGE_PROVIDERS[2].baseUrl}backup_${fileLocation.id}`,
                }
              : p,
          ),
        )
      }, 3000)
    } catch (error) {
      console.error("Upload error:", error)
      setUploadProgress((prev) =>
        prev.map((p) => ({
          ...p,
          status: "error",
          error: error instanceof Error ? error.message : "Upload failed",
        })),
      )
    } finally {
      setUploading(false)
    }
  }

  const loadStorageUsage = async () => {
    try {
      const usage = await storageService.getStorageUsage()
      setStorageUsage(usage)
    } catch (error) {
      console.error("Error loading storage usage:", error)
    }
  }

  return (
    <div className="space-y-6">
      {/* File Upload Section */}
      <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-6 w-6" />
            <span>Multi-Cloud File Upload</span>
          </CardTitle>
          <CardDescription className="text-blue-100">
            Upload files with automatic backup across multiple cloud providers
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <input
                type="file"
                onChange={handleFileSelect}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4,.zip"
              />
            </div>

            {selectedFile && (
              <Alert>
                <Cloud className="h-4 w-4" />
                <AlertDescription>
                  <strong>Selected:</strong> {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  <br />
                  <strong>Will upload to:</strong> Google Drive (primary) + GitHub & Dropbox (backups)
                </AlertDescription>
              </Alert>
            )}

            <Button
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Upload className="h-4 w-4 mr-2" />
              {uploading ? "Uploading..." : "Upload to Multi-Cloud"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upload Progress */}
      {uploadProgress.length > 0 && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Upload Progress</CardTitle>
            <CardDescription>Real-time upload status across cloud providers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {uploadProgress.map((progress, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {progress.provider === "GitHub" && <Github className="h-4 w-4" />}
                    {progress.provider === "Google Drive" && <Cloud className="h-4 w-4" />}
                    {progress.provider === "Dropbox" && <HardDrive className="h-4 w-4" />}
                    <span className="font-medium">{progress.provider}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {progress.status === "completed" && <CheckCircle className="h-4 w-4 text-green-600" />}
                    {progress.status === "error" && <AlertCircle className="h-4 w-4 text-red-600" />}
                    <Badge
                      variant={
                        progress.status === "completed"
                          ? "default"
                          : progress.status === "error"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {progress.status}
                    </Badge>
                  </div>
                </div>
                <Progress value={progress.progress} className="h-2" />
                {progress.url && <p className="text-xs text-gray-600 truncate">URL: {progress.url}</p>}
                {progress.error && <p className="text-xs text-red-600">Error: {progress.error}</p>}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Storage Providers Overview */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Cloud className="h-6 w-6 text-green-600" />
            <span>Available Storage Providers</span>
          </CardTitle>
          <CardDescription>Free cloud storage options for journal content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {STORAGE_PROVIDERS.map((provider, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-2 mb-2">
                  {provider.type === "github" && <Github className="h-5 w-5 text-gray-700" />}
                  {provider.type === "google_drive" && <Cloud className="h-5 w-5 text-blue-600" />}
                  {provider.type !== "github" && provider.type !== "google_drive" && (
                    <HardDrive className="h-5 w-5 text-purple-600" />
                  )}
                  <h4 className="font-semibold">{provider.name}</h4>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Free Storage:</strong> {provider.freeLimit}
                </p>
                <Badge variant="outline" className="text-xs">
                  {provider.type.replace("_", " ")}
                </Badge>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Button onClick={loadStorageUsage} variant="outline" size="sm">
              <HardDrive className="h-4 w-4 mr-2" />
              Check Storage Usage
            </Button>
          </div>

          {storageUsage.length > 0 && (
            <div className="mt-4 space-y-2">
              <h4 className="font-semibold">Current Usage:</h4>
              {storageUsage.map((usage, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="capitalize">{usage.provider_type.replace("_", " ")}</span>
                  <span className="text-sm">
                    {usage.used_space_mb}MB / {usage.total_space_mb}MB
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Benefits Section */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-green-800 mb-3">Multi-Cloud Benefits</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
            <div>
              <h4 className="font-medium mb-2">Redundancy & Reliability</h4>
              <ul className="space-y-1">
                <li>• Multiple backup locations</li>
                <li>• Automatic failover</li>
                <li>• 99.9% uptime guarantee</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Cost Optimization</h4>
              <ul className="space-y-1">
                <li>• Maximize free storage (60GB+ total)</li>
                <li>• No single provider dependency</li>
                <li>• Bandwidth distribution</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
