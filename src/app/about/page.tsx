"use client"

import { Navbar } from "@/src/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import {
  Waves,
  Globe,
  Users,
  Award,
  Calendar,
  MapPin,
  Target,
  Heart,
  Lightbulb,
  Zap,
  Mail,
  Linkedin,
  Twitter,
} from "lucide-react"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Lead Oceanographer",
      bio: "20+ years in marine science, specializing in ocean circulation and climate change impacts.",
      image: "/professional-oceanographer-scientist-portrait.jpg",
      social: {
        email: "sarah.johnson@floatchat.org",
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "Dr. Michael Chen",
      role: "Data Science Director",
      bio: "Expert in AI/ML applications for oceanographic data analysis and predictive modeling.",
      image: "/data-scientist-professional-portrait.jpg",
      social: {
        email: "michael.chen@floatchat.org",
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "Dr. Elena Rodriguez",
      role: "Biogeochemistry Specialist",
      bio: "Leading researcher in ocean chemistry and BGC-Argo float technology development.",
      image: "/marine-biologist-scientist-portrait.jpg",
      social: {
        email: "elena.rodriguez@floatchat.org",
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "Dr. James Wilson",
      role: "Technology Lead",
      bio: "Software architect focused on building scalable platforms for ocean data accessibility.",
      image: "/technology-lead-engineer-portrait.jpg",
      social: {
        email: "james.wilson@floatchat.org",
        linkedin: "#",
        twitter: "#",
      },
    },
  ]

  const milestones = [
    {
      year: "2019",
      title: "Project Inception",
      description: "FloatChat project launched with initial funding from marine research consortium",
    },
    {
      year: "2020",
      title: "AI Development",
      description: "First AI models developed for natural language processing of ocean data queries",
    },
    {
      year: "2021",
      title: "Beta Platform",
      description: "Beta version released to select research institutions for testing and feedback",
    },
    {
      year: "2022",
      title: "Global Partnership",
      description: "Partnerships established with 15 international oceanographic institutions",
    },
    {
      year: "2023",
      title: "Public Launch",
      description: "Platform opened to global research community and educational institutions",
    },
    {
      year: "2024",
      title: "Advanced Features",
      description: "3D visualization and advanced analytics features launched",
    },
  ]

  const values = [
    {
      icon: Target,
      title: "Scientific Excellence",
      description: "Committed to maintaining the highest standards of scientific accuracy and data quality",
    },
    {
      icon: Globe,
      title: "Global Collaboration",
      description: "Fostering international cooperation in ocean research and data sharing",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Pioneering new technologies to make ocean data more accessible and understandable",
    },
    {
      icon: Heart,
      title: "Ocean Conservation",
      description: "Supporting marine conservation efforts through better understanding of ocean systems",
    },
  ]

  const stats = [
    {
      label: "Research Partners",
      value: "95+",
      icon: Users,
    },
    {
      label: "Countries Involved",
      value: "30+",
      icon: MapPin,
    },
    {
      label: "Data Points Processed",
      value: "2.5M+",
      icon: Zap,
    },
    {
      label: "Years of Experience",
      value: "50+",
      icon: Award,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container max-w-7xl py-8">
        <div className="space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Waves className="w-4 h-4" />
              About FloatChat
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-balance">
              Democratizing Ocean Data
              <span className="text-primary block">Through AI Innovation</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              FloatChat is revolutionizing how researchers, educators, and ocean enthusiasts interact with oceanographic
              data from the global ARGO float network through intelligent, conversational AI.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-6 h-6 text-primary" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  To make ocean data accessible to everyone by bridging the gap between complex oceanographic datasets
                  and human understanding through artificial intelligence and intuitive interfaces.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We believe that democratizing access to ocean data will accelerate scientific discovery, improve
                  climate understanding, and support marine conservation efforts worldwide.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-primary" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  A world where ocean data is as accessible as weather information, enabling informed decision-making
                  for climate action, marine conservation, and sustainable ocean use.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We envision a future where students, researchers, policymakers, and citizens can easily explore and
                  understand our oceans through conversational AI and immersive visualizations.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Values */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide our work and shape our commitment to ocean science
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Key milestones in the development of FloatChat and our impact on ocean science
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:transform md:-translate-x-0.5"></div>

              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`relative flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                      <Card className="ml-12 md:ml-0">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                              {milestone.year}
                            </Badge>
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <h3 className="font-semibold mb-2">{milestone.title}</h3>
                          <p className="text-sm text-muted-foreground">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full md:transform md:-translate-x-1.5 border-2 border-background"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Passionate scientists and technologists working to advance ocean science through innovation
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="font-semibold mb-1">{member.name}</h3>
                    <p className="text-sm text-primary mb-3">{member.role}</p>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{member.bio}</p>

                    <div className="flex justify-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={`mailto:${member.social.email}`}>
                          <Mail className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={member.social.linkedin}>
                          <Linkedin className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={member.social.twitter}>
                          <Twitter className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Join Our Mission</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Whether you're a researcher, educator, student, or ocean enthusiast, we invite you to explore the depths
                of ocean data with FloatChat and contribute to our understanding of the world's oceans.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="/register">Get Started Today</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/contact">Contact Our Team</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
