"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/src/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Alert, AlertDescription } from "@/src/components/ui/alert"

import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Users,
  BookOpen,
  Zap,
  CheckCircle,
  Loader2,
} from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    subject: "",
    category: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError("Please fill in all required fields")
      setIsSubmitting(false)
      return
    }

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsSubmitted(true)
    } catch (err) {
      setError("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "support@floatchat.org",
      description: "Get in touch for general inquiries",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Monday to Friday, 9 AM - 5 PM EST",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "123 Ocean Research Drive, Marine City, MC 12345",
      description: "Our main research facility",
    },
    {
      icon: Clock,
      title: "Response Time",
      details: "24-48 hours",
      description: "Average response time for inquiries",
    },
  ]

  const contactCategories = [
    {
      id: "general",
      name: "General Inquiry",
      icon: MessageCircle,
      description: "Questions about FloatChat platform",
    },
    {
      id: "research",
      name: "Research Collaboration",
      icon: Users,
      description: "Partnership and collaboration opportunities",
    },
    {
      id: "technical",
      name: "Technical Support",
      icon: Zap,
      description: "Platform issues and technical questions",
    },
    {
      id: "education",
      name: "Educational Use",
      icon: BookOpen,
      description: "Using FloatChat in educational settings",
    },
  ]

  const faqs = [
    {
      question: "How can I access ARGO float data?",
      answer:
        "You can access ARGO data through our chat interface, globe visualization, or by uploading your own datasets for analysis.",
    },
    {
      question: "Is FloatChat free to use?",
      answer:
        "We offer free access with limited features. Premium subscriptions provide unlimited queries and advanced analytics.",
    },
    {
      question: "Can I use FloatChat for educational purposes?",
      answer: "We offer special educational licenses and resources for teachers and students.",
    },
    {
      question: "How often is the data updated?",
      answer: "ARGO float data is updated in near real-time as floats surface and transmit their measurements.",
    },
  ]

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center ">
          <div className="container max-w-2xl py-16">
            <Card className="text-center">
              <CardContent className="p-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold mb-4">Message Sent Successfully!</h1>
                <p className="text-muted-foreground mb-6">
                  Thank you for contacting us. We've received your message and will get back to you within 24-48 hours.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
                  <Button variant="outline" asChild>
                    <a href="/">Return to Home</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="flex items-center justify-center ">
        <div className="container max-w-7xl py-8">
          <div className="space-y-12">
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold">Get in Touch</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Have questions about FloatChat, need technical support, or interested in collaboration? We'd love to hear
                from you.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{info.title}</h3>
                    <p className="font-medium mb-1">{info.details}</p>
                    <p className="text-sm text-muted-foreground">{info.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Send us a Message
                  </CardTitle>
                  <CardDescription>Fill out the form below and we'll get back to you as soon as possible</CardDescription>
                </CardHeader>
                <CardContent>
                  {error && (
                    <Alert variant="destructive" className="mb-6">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="organization">Organization</Label>
                      <Input
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                        placeholder="University, Research Institute, Company, etc."
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value: string) => handleSelectChange("category", value)}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          {contactCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              <div className="flex items-center gap-2">
                                <category.icon className="w-4 h-4" />
                                {category.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Categories & FAQs */}
              <div className="space-y-8">
                {/* Contact Categories */}
                <Card>
                  <CardHeader>
                    <CardTitle>How Can We Help?</CardTitle>
                    <CardDescription>Choose the category that best describes your inquiry</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {contactCategories.map((category) => (
                      <div
                        key={category.id}
                        className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                      >
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <category.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{category.name}</h4>
                          <p className="text-sm text-muted-foreground">{category.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* FAQs */}
                <Card>
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                    <CardDescription>Quick answers to common questions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index} className="space-y-2">
                        <h4 className="font-medium">{faq.question}</h4>
                        <p className="text-sm text-muted-foreground">{faq.answer}</p>
                        {index < faqs.length - 1 && <hr className="my-4" />}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
