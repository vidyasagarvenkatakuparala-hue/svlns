"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { storageService } from "@/lib/supabase-extended"
import { multiCloudStorage } from "@/lib/multi-cloud-storage"
import { Cloud, HardDrive, Github, RefreshCw, AlertTriangle, CheckCircle } from "lucide-react"

interface StorageHealth {
  provider: string
  status: boolean
  lastChecked: string
}

export function StorageDashboard() {
  const [storageUsage, setStorageUsage] = useState<any[]>([])
  const [storageHealth, setStorageHealth] = useState<StorageHealth[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    setLoading(true)
    try {
      // Load storage usage
      const usage = await storageService.getStorageUsage()
      setStorageUsage(usage)

      // Check storage health
      const health = await multiCloudStorage.checkStorageHealth()
      const healthData = Object.entries(health).map(([provider, status]) => ({
        provider,
        status,
        lastChecked: new Date().toISOString(),
      }))
      setStorageHealth(healthData)
    } catch (error) {
      console.error("Error loading dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case "github":
        return <Github className="h-5 w-5" />
      case "google_drive":
        return <Cloud className="h-5 w-5 text-blue-600" />
      default:
        return <HardDrive className="h-5 w-5 text-purple-600" />
    }
  }

  const calculateUsagePercentage = (used: number, total: number) => {
    return Math.round((used / total) * 100)
  }

  const getUsageColor = (percentage: number) => {
    if (percentage < 50) return "text-green-600"
    if (percentage < 80) return "text-yellow-600"
    return "text-red-600"
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading storage dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Storage Usage Overview */}
      <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-50 to-green-50">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center space-x-2">
            <Cloud className="h-6 w-6" />
            <span>Multi-Cloud Storage Dashboard</span>
          </CardTitle>
          <CardDescription className="text-blue-100">
            Monitor usage and health across all storage providers
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {storageUsage.map((usage, index) => {
              const percentage = calculateUsagePercentage(usage.used_space_mb, usage.total_space_mb)
              return (
                <div key={index} className="p-4 bg-white rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getProviderIcon(usage.provider_type)}
                      <h4 className="font-semibold capitalize">{usage.provider_type.replace("_", " ")}</h4>
                    </div>
                    <Badge variant={usage.health_status === "healthy" ? "default" : "destructive"} className="text-xs">
                      {usage.health_status}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Used</span>
                      <span className={getUsageColor(percentage)}>
                        {usage.used_space_mb}MB / {usage.total_space_mb}MB
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{percentage}% used</span>
                      <span>{usage.total_space_mb - usage.used_space_mb}MB free</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-600">Last updated: {new Date().toLocaleString()}</div>
            <Button onClick={loadDashboardData} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Storage Health Status */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <span>Provider Health Status</span>
          </CardTitle>
          <CardDescription>Real-time connectivity status for all storage providers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {storageHealth.map((health, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {getProviderIcon(health.provider)}
                  <div>
                    <h4 className="font-medium capitalize">{health.provider.replace("_", " ")}</h4>
                    <p className="text-xs text-gray-500">
                      Checked: {new Date(health.lastChecked).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {health.status ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  )}
                  <Badge variant={health.status ? "default" : "destructive"}>
                    {health.status ? "Online" : "Offline"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Storage Statistics */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-6 text-center">
            <Cloud className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700">
              {storageUsage.reduce((total, usage) => total + usage.total_space_mb, 0) / 1024}GB
            </div>
            <div className="text-sm text-green-600">Total Free Storage</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6 text-center">
            <HardDrive className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">
              {storageUsage.reduce((total, usage) => total + usage.used_space_mb, 0) / 1024}GB
            </div>
            <div className="text-sm text-blue-600">Currently Used</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-700">
              {storageHealth.filter((h) => h.status).length}/{storageHealth.length}
            </div>
            <div className="text-sm text-purple-600">Providers Online</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
