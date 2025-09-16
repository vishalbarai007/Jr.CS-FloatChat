"use client"
import { Navbar } from "@/src/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"

import {
  Waves,
  Thermometer,
  Droplets,
  Activity,
  MapPin,
  Calendar,
  Gauge,
  Microscope,
  ArrowDown,
  Satellite,
  Globe,
} from "lucide-react"

export default function FloatTypesPage() {
  const floatTypes = [
    {
      id: "core",
      name: "Core Argo Floats",
      description: "Standard temperature and salinity profiling floats",
      icon: Thermometer,
      color: "bg-blue-500",
      depth: "2000m",
      cycle: "10 days",
      parameters: ["Temperature", "Salinity", "Pressure"],
      count: "3,800+",
      details: {
        overview:
          "Core Argo floats are the backbone of the global ocean observing system, providing essential temperature and salinity measurements throughout the water column.",
        specifications: {
          "Operating Depth": "0-2000 meters",
          "Cycle Duration": "10 days",
          "Profile Frequency": "Every 10 days",
          "Battery Life": "4-5 years",
          "Data Transmission": "Satellite (Iridium/Argos)",
          Positioning: "GPS when surfaced",
        },
        measurements: [
          {
            parameter: "Temperature",
            range: "-2°C to 40°C",
            accuracy: "±0.002°C",
            icon: Thermometer,
          },
          {
            parameter: "Salinity",
            range: "2 to 42 PSU",
            accuracy: "±0.003 PSU",
            icon: Droplets,
          },
          {
            parameter: "Pressure",
            range: "0 to 2000 dbar",
            accuracy: "±2.4 dbar",
            icon: Gauge,
          },
        ],
      },
    },
    {
      id: "bgc",
      name: "Biogeochemical Floats",
      description: "Advanced floats measuring ocean chemistry and biology",
      icon: Microscope,
      color: "bg-green-500",
      depth: "2000m",
      cycle: "5-10 days",
      parameters: ["Oxygen", "pH", "Nitrate", "Chlorophyll", "Backscatter"],
      count: "500+",
      details: {
        overview:
          "BGC-Argo floats extend the core measurements with biogeochemical sensors, providing crucial data for understanding ocean health, carbon cycling, and marine ecosystems.",
        specifications: {
          "Operating Depth": "0-2000 meters",
          "Cycle Duration": "5-10 days",
          "Profile Frequency": "Variable",
          "Battery Life": "3-4 years",
          "Data Transmission": "Satellite (Iridium)",
          "Additional Sensors": "6+ biogeochemical sensors",
        },
        measurements: [
          {
            parameter: "Dissolved Oxygen",
            range: "0-500 μmol/kg",
            accuracy: "±8 μmol/kg",
            icon: Activity,
          },
          {
            parameter: "pH",
            range: "7.0-8.5",
            accuracy: "±0.02",
            icon: Droplets,
          },
          {
            parameter: "Nitrate",
            range: "0-50 μmol/kg",
            accuracy: "±2 μmol/kg",
            icon: Microscope,
          },
        ],
      },
    },
    {
      id: "deep",
      name: "Deep Argo Floats",
      description: "Deep ocean profiling floats reaching abyssal depths",
      icon: ArrowDown,
      color: "bg-purple-500",
      depth: "6000m",
      cycle: "15 days",
      parameters: ["Temperature", "Salinity", "Pressure"],
      count: "150+",
      details: {
        overview:
          "Deep Argo floats extend observations to the full ocean depth, providing critical data for understanding deep ocean circulation, heat content, and climate change impacts.",
        specifications: {
          "Operating Depth": "0-6000 meters",
          "Cycle Duration": "15 days",
          "Profile Frequency": "Every 15 days",
          "Battery Life": "4-5 years",
          "Data Transmission": "Satellite (Iridium)",
          "Special Features": "Enhanced pressure sensors",
        },
        measurements: [
          {
            parameter: "Temperature",
            range: "-2°C to 40°C",
            accuracy: "±0.002°C",
            icon: Thermometer,
          },
          {
            parameter: "Salinity",
            range: "2 to 42 PSU",
            accuracy: "±0.003 PSU",
            icon: Droplets,
          },
          {
            parameter: "Pressure",
            range: "0 to 6000 dbar",
            accuracy: "±3 dbar",
            icon: Gauge,
          },
        ],
      },
    },
  ]

  const globalStats = [
    {
      label: "Total Active Floats",
      value: "4,000+",
      icon: Activity,
      color: "text-blue-600",
    },
    {
      label: "Ocean Coverage",
      value: "Global",
      icon: Globe,
      color: "text-green-600",
    },
    {
      label: "Data Profiles",
      value: "2.5M+",
      icon: Waves,
      color: "text-purple-600",
    },
    {
      label: "Countries Involved",
      value: "30+",
      icon: MapPin,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container max-w-7xl py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">ARGO Float Types</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the different types of autonomous oceanographic floats that make up the global Argo array, each
              designed for specific research purposes and ocean depths.
            </p>
          </div>

          {/* Global Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {globalStats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Float Types Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {floatTypes.map((floatType) => (
              <Card key={floatType.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${floatType.color} flex items-center justify-center mb-4`}>
                    <floatType.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>{floatType.name}</CardTitle>
                  <CardDescription>{floatType.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Max Depth</p>
                      <p className="font-semibold">{floatType.depth}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Cycle</p>
                      <p className="font-semibold">{floatType.cycle}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Parameters</p>
                    <div className="flex flex-wrap gap-1">
                      {floatType.parameters.map((param) => (
                        <Badge key={param} variant="secondary" className="text-xs">
                          {param}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Floats</p>
                      <p className="font-bold text-lg">{floatType.count}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Information */}
          <Tabs defaultValue="core" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="core">Core Argo</TabsTrigger>
              <TabsTrigger value="bgc">BGC Argo</TabsTrigger>
              <TabsTrigger value="deep">Deep Argo</TabsTrigger>
            </TabsList>

            {floatTypes.map((floatType) => (
              <TabsContent key={floatType.id} value={floatType.id} className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${floatType.color} flex items-center justify-center`}>
                        <floatType.icon className="w-5 h-5 text-white" />
                      </div>
                      {floatType.name}
                    </CardTitle>
                    <CardDescription className="text-base">{floatType.details.overview}</CardDescription>
                  </CardHeader>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Specifications */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Gauge className="w-5 h-5" />
                        Technical Specifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {Object.entries(floatType.details.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center py-2 border-b border-border/50">
                          <span className="text-sm font-medium text-muted-foreground">{key}</span>
                          <span className="text-sm font-semibold">{value}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Measurements */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="w-5 h-5" />
                        Measurement Capabilities
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {floatType.details.measurements.map((measurement, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-center gap-3 mb-2">
                            <measurement.icon className="w-5 h-5 text-primary" />
                            <h4 className="font-medium">{measurement.parameter}</h4>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Range</p>
                              <p className="font-medium">{measurement.range}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Accuracy</p>
                              <p className="font-medium">{measurement.accuracy}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Operation Cycle */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Operation Cycle
                    </CardTitle>
                    <CardDescription>How {floatType.name.toLowerCase()} operate in the ocean</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <ArrowDown className="w-8 h-8 text-blue-600" />
                        </div>
                        <h4 className="font-medium mb-2">Descent</h4>
                        <p className="text-sm text-muted-foreground">Float descends to parking depth (~1000m)</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Waves className="w-8 h-8 text-green-600" />
                        </div>
                        <h4 className="font-medium mb-2">Drift</h4>
                        <p className="text-sm text-muted-foreground">Drifts with ocean currents for 9-14 days</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Activity className="w-8 h-8 text-purple-600" />
                        </div>
                        <h4 className="font-medium mb-2">Profile</h4>
                        <p className="text-sm text-muted-foreground">Descends to max depth, then profiles upward</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Satellite className="w-8 h-8 text-orange-600" />
                        </div>
                        <h4 className="font-medium mb-2">Surface</h4>
                        <p className="text-sm text-muted-foreground">Surfaces to transmit data via satellite</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  )
}
