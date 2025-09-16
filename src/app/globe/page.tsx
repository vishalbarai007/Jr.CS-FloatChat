"use client"

import { useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars, Environment } from "@react-three/drei"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardTitle } from "@/src/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
import { Input } from "@/src/components/ui/input"
import { ScrollArea } from "@/src/components/ui/scroll-area"
import { Send, Globe, Activity, Thermometer, Waves, MapPin, Satellite } from "lucide-react"
import { EnhancedEarthGlobe } from "@/src/components/enhanced-earth-globe"
import { EnhancedFloatMarker } from "@/src/components/enhanced-float-marker"

interface FloatData {
  Latitude: string
  Longitude: string
  Location: string
}

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

function latLonToVector3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)

  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const y = radius * Math.cos(phi)
  const z = radius * Math.sin(phi) * Math.sin(theta)

  return [x, y, z] as [number, number, number]
}

function EarthWithFloats({
  floats,
  onSelect,
  isHovered,
  setHovered,
}: {
  floats: FloatData[]
  onSelect: (f: FloatData) => void
  isHovered: boolean
  setHovered: (h: boolean) => void
}) {
  return (
    <group>
      <EnhancedEarthGlobe isHovered={isHovered} setHovered={setHovered} />

      {floats.map((float, i) => {
        const lat = Number(float.Latitude)
        const lon = Number(float.Longitude)
        if (isNaN(lat) || isNaN(lon)) return null
        const pos = latLonToVector3(lat, lon, 2.15)
        return <EnhancedFloatMarker key={i} float={float} position={pos} onClick={() => onSelect(float)} />
      })}
    </group>
  )
}

export default function GlobePage() {
  const [floats, setFloats] = useState<FloatData[]>([])
  const [selectedFloat, setSelectedFloat] = useState<FloatData | null>(null)
  const [hovered, setHovered] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/argo_float_coords-MlUgVSwHeL5pwHTOOjZcUmVXrcSj0E.csv",
        )
        const csvText = await response.text()
        const lines = csvText.trim().split("\n")
        const data = lines.slice(1).map((line) => {
          const [Latitude, Longitude, Location] = line.split(",").map((s) => s.trim())
          return { Latitude, Longitude, Location }
        })
        setFloats(data)
      } catch (error) {
        console.error("Failed to fetch float data:", error)
        setFloats([
          { Latitude: "40.7128", Longitude: "-74.0060", Location: "North Atlantic" },
          { Latitude: "34.0522", Longitude: "-118.2437", Location: "Pacific Ocean" },
          { Latitude: "51.5074", Longitude: "-0.1278", Location: "North Sea" },
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (chatOpen && selectedFloat && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: `Hello! I'm your ARGO Float Assistant. I can help you learn about the float at ${selectedFloat.Location}. What would you like to know?`,
        },
      ])
    }
  }, [chatOpen, selectedFloat])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: ChatMessage = { role: "user", content: inputValue }
    setMessages((prev) => [...prev, userMessage])

    setTimeout(() => {
      let response = "I'd be happy to help you with that question about this ARGO float!"

      if (inputValue.toLowerCase().includes("depth")) {
        response =
          "This ARGO float can dive to depths of up to 2000 meters, collecting temperature and salinity data throughout the water column."
      } else if (inputValue.toLowerCase().includes("temperature")) {
        response =
          "The float measures ocean temperature at various depths, typically recording temperatures between 2-25°C depending on depth and location."
      } else if (inputValue.toLowerCase().includes("location") || inputValue.toLowerCase().includes("where")) {
        response = `This float is located at ${selectedFloat?.Latitude}°N, ${selectedFloat?.Longitude}°E in the ${selectedFloat?.Location}.`
      } else if (inputValue.toLowerCase().includes("data")) {
        response =
          "This float collects temperature, salinity, and pressure data every 10 days, transmitting the information via satellite when it surfaces."
      }

      const assistantMessage: ChatMessage = { role: "assistant", content: response }
      setMessages((prev) => [...prev, assistantMessage])
    }, 1000)

    setInputValue("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">ARGO Float Explorer</h1>
              <p className="text-sm text-white/60">Interactive Ocean Data Visualization</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Satellite className="w-4 h-4" />
            <span>{floats.length} Active Floats</span>
          </div>
        </div>
      </header>

      <div className="flex w-full h-[calc(100vh-5rem)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:100px_100px] animate-pulse"></div>
        </div>

        {/* Left Info Panel */}
        <div className="w-1/2 h-full flex items-center justify-center p-6 relative z-10">
          <Card className="w-full max-w-lg bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
            <CardContent className="p-8">
              {loading ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-600/20 flex items-center justify-center animate-spin">
                    <Globe className="w-8 h-8 text-cyan-400" />
                  </div>
                  <p className="text-white/70 text-lg">Loading ARGO Float data...</p>
                </div>
              ) : selectedFloat ? (
                <div className="space-y-6">
                  <div>
                    <CardTitle className="text-2xl font-bold text-white mb-4 text-balance flex items-center gap-2">
                      <MapPin className="w-6 h-6 text-cyan-300" />
                      {selectedFloat.Location}
                    </CardTitle>
                    <div className="space-y-3 text-white/90">
                      <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                        <span className="font-medium text-cyan-300">Latitude:</span>
                        <span className="font-mono text-lg">{selectedFloat.Latitude}°</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                        <span className="font-medium text-cyan-300">Longitude:</span>
                        <span className="font-mono text-lg">{selectedFloat.Longitude}°</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-4 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-lg border border-red-400/20 text-center">
                      <Thermometer className="w-6 h-6 text-red-400 mx-auto mb-2" />
                      <div className="text-xs text-white/60 mb-1">Temperature</div>
                      <div className="text-sm font-mono text-white font-bold">2-25°C</div>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg border border-blue-400/20 text-center">
                      <Waves className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                      <div className="text-xs text-white/60 mb-1">Salinity</div>
                      <div className="text-sm font-mono text-white font-bold">34-37 PSU</div>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg border border-green-400/20 text-center">
                      <Activity className="w-6 h-6 text-green-400 mx-auto mb-2" />
                      <div className="text-xs text-white/60 mb-1">Status</div>
                      <div className="text-sm font-mono text-green-400 font-bold">Active</div>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-white/80 text-sm leading-relaxed">
                      This ARGO float autonomously collects oceanographic data, diving to depths of 2000m every 10 days
                      to measure temperature, salinity, and pressure profiles.
                    </p>
                  </div>

                  <Button
                    onClick={() => setChatOpen(true)}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Start Chat with AI Assistant
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-600/20 flex items-center justify-center">
                    <Globe className="w-10 h-10 text-cyan-400 animate-pulse" />
                  </div>
                  <h3 className="text-white text-xl font-semibold mb-2">Explore ARGO Floats</h3>
                  <p className="text-white/70 text-base leading-relaxed mb-4">
                    Click on any orange marker on the globe to see detailed information about that ARGO float.
                  </p>
                  <div className="text-white/50 text-sm space-y-1">
                    <p>🖱️ Drag to rotate the globe</p>
                    <p>🔍 Scroll to zoom in/out</p>
                    <p>🎯 Hover markers for location names</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Globe */}
        <div className="w-1/2 h-full relative">
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 10]} intensity={0.8} />
            <pointLight position={[-10, -10, -10]} intensity={0.3} />
            <Environment preset="night" />
            <Stars radius={100} depth={50} count={5000} factor={4} fade />
            <OrbitControls
              enableZoom
              enablePan={false}
              enableRotate
              minDistance={3}
              maxDistance={10}
              autoRotate
              autoRotateSpeed={0.5}
            />
            <EarthWithFloats floats={floats} onSelect={setSelectedFloat} isHovered={hovered} setHovered={setHovered} />
          </Canvas>
        </div>

        {/* Chat Modal */}
        <Dialog open={chatOpen} onOpenChange={setChatOpen}>
          <DialogContent className="max-w-lg bg-white/95 backdrop-blur-xl border-white/20">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                ARGO Float AI Assistant
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <ScrollArea className="h-80 w-full rounded-lg border border-gray-200 p-4 bg-gray-50/50">
                <div className="space-y-3">
                  {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed ${
                          message.role === "user"
                            ? "bg-blue-600 text-white rounded-br-sm"
                            : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about this ARGO float..."
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
