"use client"
import { useState } from "react"
import { useAuth } from "@/src/contexts/auth-context"
import { useRouter } from "next/navigation"
import SplashScreen from "@/src/components/splash-screen"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { Navbar } from "@/src/components/navbar"
import Link from "next/link"
import {
  MessageCircle,
  BarChart3,
  GlobeIcon,
  Waves,
  Database,
  Brain,
  Play,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
  TrendingUp,
  Users,
  Award,
  CheckCircle,
} from "lucide-react"
import NewNavbar from "../components/NewNavbar"

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true)
  const { isAuthenticated, continueAsGuest } = useAuth()
  const router = useRouter()

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  const handleContinueAsGuest = () => {
    continueAsGuest()
    router.push("/chat")
  }

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />
  }


  // Define navigation array
  const navigation = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Chat", href: "/chat" },
    { label: "Globe", href: "/globe" },
    { label: "Upload Data", href: "/upload" },
    { label: "Float Types", href: "/float-types" },
    { label: "Videos", href: "/videos" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Navbar />

      {/* <NewNavbar /> */}


      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="container py-12 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium dark:bg-blue-900/40 dark:text-blue-200">
                  <Waves className="h-4 w-4 mr-2" />
                  Advanced Ocean Analytics Platform
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight dark:text-white">
                  AI-Powered Ocean Data
                  <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Exploration
                  </span>
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed max-w-[600px] dark:text-slate-300">
                  Transform oceanographic research with our intelligent platform. Explore ARGO float data through
                  natural language conversations and discover insights from global ocean monitoring networks.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <>
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg" asChild>
                      <Link href="/chat" className="flex items-center space-x-2">
                        <MessageCircle className="h-5 w-5" />
                        <span>Start Chat</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-blue-200 text-slate-800 hover:bg-blue-50 dark:border-blue-800 dark:text-white dark:hover:bg-blue-900/30"
                      asChild
                    >
                      <Link href="/dashboard" className="flex items-center space-x-2">
                        <BarChart3 className="h-5 w-5" />
                        <span>View Dashboard</span>
                      </Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg" asChild>
                      <Link href="/login" className="flex items-center space-x-2">
                        <MessageCircle className="h-5 w-5" />
                        <span>Sign In</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-white dark:hover:bg-blue-900/30"
                      onClick={handleContinueAsGuest}
                    >
                      Continue as Guest
                    </Button>
                  </>
                )}
              </div>

              {/* Trust indicators */}
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium">4,000+ Active Floats</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium">Real-time Data</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                  <Award className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium">Research Grade</span>
                </div>
              </div>
            </div>

            {/* Image card */}
            <div className="order-first lg:order-last">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-3xl blur-3xl opacity-20 transform -rotate-6"></div>
                <div className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-blue-100 dark:border-slate-700 p-8">
                  <img
                    src="/AGRO1.png"
                    alt="Ocean Research"
                    className="w-full h-96 object-cover rounded-2xl"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      {/* <span className="text-sm font-medium text-slate-700">Live Data</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-slate-900">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
          style={{
            backgroundImage: `url('/beautiful-turquoise-ocean-water-with-research-vess.jpg')`,
          }}
        />
        {/* Dark Overlay for better contrast */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content Overlay */}
        <div className="relative z-10 container text-center text-white space-y-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold text-balance leading-tight text-white drop-shadow-lg">
              Where Science Meets
              <span className="block">Endless Discovery.</span>
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto text-pretty drop-shadow-md">
              Dive deep into the world's oceans with cutting-edge AI technology. Explore real-time data from thousands
              of ARGO floats across the globe, uncovering the mysteries of our planet's waters.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="px-8 py-4 text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white"
              asChild
            >
              <Link href="/about">Discover More</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="flex items-center space-x-3 px-6 py-3 border-2 border-white/30 text-white hover:bg-white/10 bg-transparent"
              asChild
            >
              <Link href="/videos" className="flex items-center space-x-3">
                <div className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center bg-white/10">
                  <Play className="h-1 w-1 ml-1 text-white" />
                </div>
                <span className="font-medium">Watch Demo</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <div className="bg-[#c5f7ba] flex justify-center align-middle">
        <section className="py-20">
          <div className="container">
            <div className="text-center space-y-4 mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Powerful Capabilities
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
                Explore Ocean Data Like Never Before
              </h2>
              <p className="text-xl text-slate-600 max-w-[800px] mx-auto leading-relaxed">
                Our platform combines advanced AI with comprehensive oceanographic data visualization,
                making marine science accessible and actionable for researchers worldwide.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-blue-100 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-blue-50">
                <CardContent className="p-8 space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Natural Language Queries</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Ask complex questions in plain English about ocean conditions, float trajectories,
                      and environmental trends. Our AI understands context and provides precise answers.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-100 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-cyan-50">
                <CardContent className="p-8 space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg">
                    <GlobeIcon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Interactive 3D Visualization</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Explore ARGO float positions on our interactive 3D Earth globe. Visualize real-time
                      data with advanced filtering and temporal analysis capabilities.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-100 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-blue-50">
                <CardContent className="p-8 space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                    <Database className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Comprehensive Data Access</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Access temperature, salinity, and biogeochemical profiles from thousands of ARGO floats.
                      Download research-quality datasets with full metadata and quality flags.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>

      {/* Research Excellence Section */}
      <div className="flex justify-center align-middle bg-gradient-to-br from-blue-50 to-cyan-50">
        <section className="py-20 ">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    Research Excellence
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                    Advancing Ocean Science Through
                    <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      Innovation
                    </span>
                  </h2>
                  <p className="text-xl text-slate-600 leading-relaxed">
                    Our platform transforms complex oceanographic data into actionable insights,
                    empowering researchers to understand climate patterns and marine ecosystems
                    with unprecedented precision.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border border-blue-100">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Real-time Data Processing</h4>
                      <p className="text-slate-600 text-sm">Continuous updates from global float network</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border border-blue-100">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Global Coverage Network</h4>
                      <p className="text-slate-600 text-sm">Comprehensive monitoring across all ocean basins</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border border-blue-100">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Advanced AI Analytics</h4>
                      <p className="text-slate-600 text-sm">Machine learning powered insights and predictions</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border border-blue-100">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Research Collaboration</h4>
                      <p className="text-slate-600 text-sm">Connect with scientists worldwide</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <Card className="bg-white shadow-lg border-blue-100">
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">4,000+</div>
                        <div className="text-slate-600 text-sm">Active ARGO Floats</div>
                      </CardContent>
                    </Card>
                    <div className="relative">
                      <img
                        src="/oceanographic-research-vessel-top-view-with-scient.jpg"
                        alt="Research Vessel"
                        className="w-full h-48 object-cover rounded-xl shadow-lg"
                      />
                      <div className="absolute inset-0 bg-blue-600/20 rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-6 mt-8">
                    <div className="relative">
                      <img
                        src="/ocean-research-laboratory-with-scientists-analyzin.jpg"
                        alt="Research Lab"
                        className="w-full h-48 object-cover rounded-xl shadow-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent rounded-xl flex items-center justify-center">
                        <Button className="bg-white/90 text-blue-600 hover:bg-white shadow-lg">
                          <Play className="h-4 w-4 mr-2" />
                          Watch Demo
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="bg-white shadow-lg border-blue-100">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-cyan-600 mb-1">180</div>
                          <div className="text-slate-600 text-xs">Ocean Regions</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-white shadow-lg border-blue-100">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-blue-600 mb-1">2M+</div>
                          <div className="text-slate-600 text-xs">Data Profiles</div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Why Choose Us Section */}
      <div className="relative flex p-10 rounded-2xl justify-center align-middle">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
          style={{
            backgroundImage: `url('/beautiful-turquoise-ocean-water-with-research-vess.jpg')`,
          }}
        />

        {/* Content */}
        <div className="relative bg-white/20 rounded-2xl p-10 backdrop-blur-sm">
          <section className="py-20">
            <div className="container">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-3xl blur-3xl opacity-50 transform rotate-6"></div>
                  <img
                    src="/underwater-ocean-research-with-marine-life-and-sci.jpg"
                    alt="Ocean Research"
                    className="relative w-full h-[500px] object-cover rounded-3xl shadow-2xl border border-blue-100"
                  />
                  <div className="absolute bottom-6 left-6">
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl px-6 py-4 shadow-xl border border-blue-100">
                      <div className="text-2xl font-bold text-blue-600">15,000+</div>
                      <div className="text-sm text-slate-600">Research Expeditions</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-6">
                    <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      Why Choose FloatChat
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                      Experience Ocean Research
                      <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        Excellence
                      </span>
                    </h2>
                    <p className="text-xl text-slate-600 leading-relaxed">
                      Join leading researchers worldwide who trust our platform for cutting-edge
                      ocean data analysis and collaborative marine science research.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-4 p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100">
                      <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                        <Database className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Unmatched Data Quality</h3>
                        <p className="text-slate-600 leading-relaxed">
                          Access research-grade oceanographic data with comprehensive quality control,
                          real-time validation, and full traceability for scientific rigor.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-6 rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 border border-blue-100">
                      <div className="w-12 h-12 rounded-xl bg-cyan-600 flex items-center justify-center flex-shrink-0">
                        <Brain className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Advanced AI Analytics</h3>
                        <p className="text-slate-600 leading-relaxed">
                          Leverage machine learning algorithms to identify complex patterns in ocean data,
                          accelerating discovery and enabling predictive oceanographic modeling.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100">
                      <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                        <GlobeIcon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Global Research Network</h3>
                        <p className="text-slate-600 leading-relaxed">
                          Connect with an international community of marine scientists, share findings,
                          and collaborate on groundbreaking ocean research initiatives.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>


      {/* CTA Section */}
      <div className="flex justify-center align-middle bg-gradient-to-br from-blue-600 to-cyan-600">
        <section className="py-20 bg-gradient-to-br from-blue-600 to-cyan-600">
          <div className="container text-center text-white">
            <div className="max-w-4xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Ready to Transform Your Ocean Research?
              </h2>
              <p className="text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
                Join thousands of researchers who are already using FloatChat to unlock
                new insights from global ocean data. Start your journey today.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg px-8 py-4 text-lg font-semibold"
                  asChild
                >
                  <Link href={isAuthenticated ? "/chat" : "/login"}>
                    Get Started Free
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/30 text-white hover:bg-white/10 bg-transparent px-8 py-4"
                  asChild
                >
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="flex justify-center items-center bg-black">
        <footer className="text-white p-10 w-full">
          <div className="container text-center">
            <div className="grid md:grid-cols-4 gap-8 text-left">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Waves className="h-6 w-6 text-blue-400" />
                  <span className="text-xl font-bold">FloatChat</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Advanced AI-powered platform for oceanographic data exploration and marine research collaboration.
                </p>
                <div className="flex space-x-4 justify-center md:justify-start">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:bg-slate-700 transition-colors cursor-pointer">
                    <Facebook className="h-4 w-4" />
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:bg-slate-700 transition-colors cursor-pointer">
                    <Twitter className="h-4 w-4" />
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:bg-slate-700 transition-colors cursor-pointer">
                    <Linkedin className="h-4 w-4" />
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:bg-slate-700 transition-colors cursor-pointer">
                    <Instagram className="h-4 w-4" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Platform</h3>
                <div className="space-y-2">
                  <Link href="/features" className="block text-slate-300 hover:text-white transition-colors">Features</Link>
                  <Link href="/pricing" className="block text-slate-300 hover:text-white transition-colors">Pricing</Link>
                  <Link href="/api" className="block text-slate-300 hover:text-white transition-colors">API</Link>
                  <Link href="/integrations" className="block text-slate-300 hover:text-white transition-colors">Integrations</Link>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Resources</h3>
                <div className="space-y-2">
                  <Link href="/documentation" className="block text-slate-300 hover:text-white transition-colors">Documentation</Link>
                  <Link href="/research" className="block text-slate-300 hover:text-white transition-colors">Research Papers</Link>
                  <Link href="/tutorials" className="block text-slate-300 hover:text-white transition-colors">Tutorials</Link>
                  <Link href="/support" className="block text-slate-300 hover:text-white transition-colors">Support</Link>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Company</h3>
                <div className="space-y-2">
                  <Link href="/about" className="block text-slate-300 hover:text-white transition-colors">About Us</Link>
                  <Link href="/careers" className="block text-slate-300 hover:text-white transition-colors">Careers</Link>
                  <Link href="/contact" className="block text-slate-300 hover:text-white transition-colors">Contact</Link>
                  <Link href="/privacy" className="block text-slate-300 hover:text-white transition-colors">Privacy Policy</Link>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800 mt-12 pt-8">
              <p className="text-slate-400">
                © 2024 FloatChat. Powered by ARGO oceanographic data and advanced AI technology.
              </p>
            </div>
          </div>
        </footer>
      </div>


    </div>
  )
}