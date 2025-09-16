"use client"
import { useState, useEffect } from "react"
import { useAuth } from "@/src/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Navbar } from "@/src/components/navbar"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Label } from "@/src/components/ui/label"
import { Switch } from "@/src/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Alert, AlertDescription } from "@/src/components/ui/alert"
import { Separator } from "@/src/components/ui/separator"
import { SettingsIcon, Bell, Database, Trash2, AlertTriangle, Loader2 } from "lucide-react"

export default function SettingsPage() {
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: "en",
    dataRetention: "1year",
    autoSave: true,
    emailUpdates: true,
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    // Load settings from localStorage
    const savedSettings = localStorage.getItem("ocean-platform-settings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [isAuthenticated, router])

  const handleSettingChange = (key: string, value: boolean | string) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    localStorage.setItem("ocean-platform-settings", JSON.stringify(newSettings))
  }

  const handleSaveSettings = async () => {
    setIsLoading(true)
    setSuccess("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuccess("Settings saved successfully!")
    } catch (err) {
      console.error("Failed to save settings")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearChatHistory = async () => {
    if (confirm("Are you sure you want to clear all chat history? This action cannot be undone.")) {
      localStorage.removeItem("ocean-platform-chat-history")
      setSuccess("Chat history cleared successfully!")
    }
  }

  const handleDeleteAccount = async () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone and will permanently delete all your data.",
      )
    ) {
      if (confirm("This is your final warning. Are you absolutely sure you want to delete your account?")) {
        logout()
        router.push("/")
      }
    }
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="flex items-center justify-center ">
        <div className="container max-w-4xl py-8">
          <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center space-x-4">
              <SettingsIcon className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-muted-foreground">Manage your account preferences and data</p>
              </div>
            </div>

            {success && (
              <Alert>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <div className="grid gap-8">
              {/* General Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <SettingsIcon className="h-5 w-5" />
                    <span>General</span>
                  </CardTitle>
                  <CardDescription>Configure your general application preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                    </div>
                    <Switch
                      checked={settings.darkMode}
                      onCheckedChange={(checked) => handleSettingChange("darkMode", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select value={settings.language} onValueChange={(value) => handleSettingChange("language", value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="zh">Chinese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5" />
                    <span>Notifications</span>
                  </CardTitle>
                  <CardDescription>Control how you receive notifications and updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about new features and updates
                      </p>
                    </div>
                    <Switch
                      checked={settings.notifications}
                      onCheckedChange={(checked) => handleSettingChange("notifications", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Updates</Label>
                      <p className="text-sm text-muted-foreground">Receive email updates about ocean data and research</p>
                    </div>
                    <Switch
                      checked={settings.emailUpdates}
                      onCheckedChange={(checked) => handleSettingChange("emailUpdates", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Data & Privacy */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="h-5 w-5" />
                    <span>Data & Privacy</span>
                  </CardTitle>
                  <CardDescription>Manage your data retention and privacy settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-save Chat History</Label>
                      <p className="text-sm text-muted-foreground">Automatically save your chat conversations</p>
                    </div>
                    <Switch
                      checked={settings.autoSave}
                      onCheckedChange={(checked) => handleSettingChange("autoSave", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Data Retention Period</Label>
                    <Select
                      value={settings.dataRetention}
                      onValueChange={(value) => handleSettingChange("dataRetention", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1month">1 Month</SelectItem>
                        <SelectItem value="3months">3 Months</SelectItem>
                        <SelectItem value="6months">6 Months</SelectItem>
                        <SelectItem value="1year">1 Year</SelectItem>
                        <SelectItem value="forever">Forever</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">How long to keep your chat history and uploaded data</p>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Button
                      variant="outline"
                      onClick={handleClearChatHistory}
                      className="w-full justify-start bg-transparent"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Clear Chat History
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="border-destructive/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-destructive">
                    <AlertTriangle className="h-5 w-5" />
                    <span>Danger Zone</span>
                  </CardTitle>
                  <CardDescription>Irreversible and destructive actions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      These actions cannot be undone. Please be certain before proceeding.
                    </AlertDescription>
                  </Alert>

                  <Button variant="destructive" onClick={handleDeleteAccount} className="w-full justify-start">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </CardContent>
              </Card>

              {/* Save Button */}
              <div className="flex justify-end">
                <Button onClick={handleSaveSettings} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Settings"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
