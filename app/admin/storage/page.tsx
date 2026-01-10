import { StorageDashboard } from "@/components/storage/storage-dashboard"
import { MultiCloudUploader } from "@/components/storage/multi-cloud-uploader"

export default function StorageManagementPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
            Multi-Cloud Storage Management
          </h1>
          <p className="text-xl text-gray-600">Manage journal content across GitHub, Google Drive, Dropbox, and more</p>
        </div>

        <div className="space-y-8">
          <StorageDashboard />
          <MultiCloudUploader />
        </div>
      </div>
    </div>
  )
}
