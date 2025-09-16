"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { useAuth } from "@/src/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Navbar } from "@/src/components/navbar"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"
import { Alert, AlertDescription } from "@/src/components/ui/alert"
import { Badge } from "@/src/components/ui/badge"
import { Progress } from "@/src/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"

import {
  Upload,
  FileText,
  Database,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Loader2,
  Download,
  Eye,
  Trash2,
  Calendar,
  MapPin,
  Thermometer,
  Droplets,
  Activity,
} from "lucide-react"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  uploadDate: string
  status: "processing" | "completed" | "error"
  dataType: "temperature" | "salinity" | "bgc" | "mixed"
  insights?: {
    recordCount: number
    dateRange: string
    location: string
    parameters: string[]
  }
}

export default function UploadPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [dragActive, setDragActive] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [dataType, setDataType] = useState<string>("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    // Load uploaded files from localStorage
    const savedFiles = localStorage.getItem("ocean-platform-uploads")
    if (savedFiles) {
      setUploadedFiles(JSON.parse(savedFiles))
    }
  }, [isAuthenticated, router])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const validateFile = (file: File): string | null => {
    const maxSize = user?.type === "premium" ? 100 * 1024 * 1024 : 10 * 1024 * 1024 // 100MB for premium, 10MB for others
    const allowedTypes = [".csv", ".nc", ".netcdf", ".txt"]

    if (file.size > maxSize) {
      return `File size exceeds ${user?.type === "premium" ? "100MB" : "10MB"} limit`
    }

    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase()
    if (!allowedTypes.includes(fileExtension)) {
      return "Only CSV, NetCDF, and TXT files are supported"
    }

    return null
  }

  const simulateProcessing = async (fileId: string) => {
    // Simulate processing steps
    const steps = [
      "Validating file format...",
      "Parsing data structure...",
      "Extracting parameters...",
      "Analyzing data quality...",
      "Generating insights...",
      "Processing complete!",
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setUploadProgress(((i + 1) / steps.length) * 100)
    }

    // Update file status to completed with mock insights
    setUploadedFiles((prev) =>
      prev.map((file) =>
        file.id === fileId
          ? {
            ...file,
            status: "completed" as const,
            insights: {
              recordCount: Math.floor(Math.random() * 10000) + 1000,
              dateRange: "2023-01-01 to 2023-12-31",
              location: "North Atlantic Ocean",
              parameters: ["Temperature", "Salinity", "Pressure", "Oxygen"],
            },
          }
          : file,
      ),
    )

    // Save to localStorage
    const updatedFiles = uploadedFiles.map((file) =>
      file.id === fileId
        ? {
          ...file,
          status: "completed" as const,
          insights: {
            recordCount: Math.floor(Math.random() * 10000) + 1000,
            dateRange: "2023-01-01 to 2023-12-31",
            location: "North Atlantic Ocean",
            parameters: ["Temperature", "Salinity", "Pressure", "Oxygen"],
          },
        }
        : file,
    )
    localStorage.setItem("ocean-platform-uploads", JSON.stringify(updatedFiles))
  }

  const handleUpload = async () => {
    if (!selectedFile || !dataType) {
      setError("Please select a file and data type")
      return
    }

    const validationError = validateFile(selectedFile)
    if (validationError) {
      setError(validationError)
      return
    }

    setIsUploading(true)
    setError("")
    setSuccess("")
    setUploadProgress(0)

    try {
      const newFile: UploadedFile = {
        id: Date.now().toString(),
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type,
        uploadDate: new Date().toISOString(),
        status: "processing",
        dataType: dataType as any,
      }

      const updatedFiles = [...uploadedFiles, newFile]
      setUploadedFiles(updatedFiles)
      localStorage.setItem("ocean-platform-uploads", JSON.stringify(updatedFiles))

      // Simulate file processing
      await simulateProcessing(newFile.id)

      setSuccess("File uploaded and processed successfully!")
      setSelectedFile(null)
      setDataType("")
      setDescription("")
    } catch (err) {
      setError("Upload failed. Please try again.")
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const handleDeleteFile = (fileId: string) => {
    const updatedFiles = uploadedFiles.filter((file) => file.id !== fileId)
    setUploadedFiles(updatedFiles)
    localStorage.setItem("ocean-platform-uploads", JSON.stringify(updatedFiles))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getDataTypeIcon = (type: string) => {
    switch (type) {
      case "temperature":
        return <Thermometer className="w-4 h-4" />
      case "salinity":
        return <Droplets className="w-4 h-4" />
      case "bgc":
        return <Activity className="w-4 h-4" />
      default:
        return <Database className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "error":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="flex items-center justify-center ">
        <div className="container max-w-6xl py-8">
          <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div>
                <h1 className="text-3xl font-bold">Data Upload & Analysis</h1>
                <p className="text-muted-foreground">Upload your ocean datasets for AI-powered analysis and insights</p>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="outline">{user.type === "premium" ? "100MB" : "10MB"} limit</Badge>
                <Badge variant="outline">
                  {user.type === "guest" ? "1 file" : user.type === "premium" ? "Unlimited" : "10 files"}
                </Badge>
              </div>
            </div>

            <Tabs defaultValue="upload" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="upload">Upload Data</TabsTrigger>
                <TabsTrigger value="files">My Files ({uploadedFiles.length})</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Upload Area */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Upload className="w-5 h-5" />
                        Upload Ocean Data
                      </CardTitle>
                      <CardDescription>
                        Drag and drop your files or click to browse. Supports CSV, NetCDF, and TXT formats.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* File Drop Zone */}
                      <div
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive
                            ? "border-primary bg-primary/5"
                            : "border-muted-foreground/25 hover:border-primary/50"
                          }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                      >
                        <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                        <div className="space-y-2">
                          <p className="text-lg font-medium">
                            {selectedFile ? selectedFile.name : "Drop your files here"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {selectedFile
                              ? `${formatFileSize(selectedFile.size)} • ${selectedFile.type || "Unknown type"}`
                              : "or click to browse"}
                          </p>
                        </div>
                        <Input
                          type="file"
                          className="hidden"
                          id="file-upload"
                          accept=".csv,.nc,.netcdf,.txt"
                          onChange={handleFileSelect}
                        />
                        <Label htmlFor="file-upload" className="cursor-pointer">
                          <Button variant="outline" className="mt-4 bg-transparent" asChild>
                            <span>Browse Files</span>
                          </Button>
                        </Label>
                      </div>

                      {/* File Details Form */}
                      {selectedFile && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="data-type">Data Type</Label>
                            <Select value={dataType} onValueChange={setDataType}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select data type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="temperature">Temperature Profiles</SelectItem>
                                <SelectItem value="salinity">Salinity Data</SelectItem>
                                <SelectItem value="bgc">Biogeochemical (BGC)</SelectItem>
                                <SelectItem value="mixed">Mixed Parameters</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="description">Description (Optional)</Label>
                            <Textarea
                              id="description"
                              placeholder="Describe your dataset, collection method, or research purpose..."
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              rows={3}
                            />
                          </div>

                          {isUploading && (
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Processing...</span>
                                <span>{Math.round(uploadProgress)}%</span>
                              </div>
                              <Progress value={uploadProgress} className="h-2" />
                            </div>
                          )}

                          <Button onClick={handleUpload} disabled={isUploading || !dataType} className="w-full">
                            {isUploading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              <>
                                <Upload className="mr-2 h-4 w-4" />
                                Upload & Analyze
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Upload Guidelines */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Upload Guidelines
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Supported Formats</h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">CSV</Badge>
                              <span className="text-sm text-muted-foreground">Comma-separated values</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">NetCDF</Badge>
                              <span className="text-sm text-muted-foreground">Network Common Data Form</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">TXT</Badge>
                              <span className="text-sm text-muted-foreground">Tab-delimited text</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">File Size Limits</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Guest Users</span>
                              <Badge variant="secondary">5MB</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Standard Users</span>
                              <Badge variant="secondary">10MB</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Premium Users</span>
                              <Badge variant="secondary">100MB</Badge>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Expected Columns</h4>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>• Latitude, Longitude (coordinates)</p>
                            <p>• Date/Time (ISO format preferred)</p>
                            <p>• Depth/Pressure (meters/dbar)</p>
                            <p>• Temperature (°C)</p>
                            <p>• Salinity (PSU)</p>
                            <p>• Additional parameters as needed</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Processing Features</h4>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>• Automatic data validation</p>
                            <p>• Quality control checks</p>
                            <p>• Statistical analysis</p>
                            <p>• Visualization generation</p>
                            <p>• Trend identification</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="files" className="space-y-6">
                {uploadedFiles.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Database className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-medium mb-2">No files uploaded yet</h3>
                      <p className="text-muted-foreground mb-4">Upload your first ocean dataset to get started</p>
                      <Button asChild>
                        <a href="#upload">Upload Data</a>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4">
                    {uploadedFiles.map((file) => (
                      <Card key={file.id}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="p-2 bg-muted rounded-lg">{getDataTypeIcon(file.dataType)}</div>
                              <div>
                                <h4 className="font-medium">{file.name}</h4>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <span>{formatFileSize(file.size)}</span>
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(file.uploadDate).toLocaleDateString()}
                                  </span>
                                  <Badge className={getStatusColor(file.status)}>{file.status}</Badge>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              {file.status === "completed" && (
                                <>
                                  <Button variant="outline" size="sm">
                                    <Eye className="w-4 h-4 mr-2" />
                                    View
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <Download className="w-4 h-4 mr-2" />
                                    Export
                                  </Button>
                                </>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteFile(file.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          {file.insights && (
                            <div className="mt-4 pt-4 border-t">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                  <p className="text-sm font-medium">Records</p>
                                  <p className="text-sm text-muted-foreground">
                                    {file.insights.recordCount.toLocaleString()}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Date Range</p>
                                  <p className="text-sm text-muted-foreground">{file.insights.dateRange}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Location</p>
                                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {file.insights.location}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Parameters</p>
                                  <p className="text-sm text-muted-foreground">
                                    {file.insights.parameters.length} variables
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="insights" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        Data Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Total Files</span>
                          <span className="font-medium">{uploadedFiles.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Completed</span>
                          <span className="font-medium">
                            {uploadedFiles.filter((f) => f.status === "completed").length}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Processing</span>
                          <span className="font-medium">
                            {uploadedFiles.filter((f) => f.status === "processing").length}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Total Records</span>
                          <span className="font-medium">
                            {uploadedFiles
                              .filter((f) => f.insights)
                              .reduce((sum, f) => sum + (f.insights?.recordCount || 0), 0)
                              .toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="w-5 h-5" />
                        Data Types
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {["temperature", "salinity", "bgc", "mixed"].map((type) => {
                          const count = uploadedFiles.filter((f) => f.dataType === type).length
                          return (
                            <div key={type} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {getDataTypeIcon(type)}
                                <span className="text-sm capitalize">{type}</span>
                              </div>
                              <Badge variant="secondary">{count}</Badge>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Coverage Areas
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-sm font-medium text-blue-800">North Atlantic</p>
                          <p className="text-xs text-blue-600">Primary coverage area</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                          <p className="text-sm font-medium text-green-800">Pacific Basin</p>
                          <p className="text-xs text-green-600">Secondary coverage</p>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                          <p className="text-sm font-medium text-purple-800">Southern Ocean</p>
                          <p className="text-xs text-purple-600">Limited coverage</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
