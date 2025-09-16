"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/src/contexts/auth-context"
import { useRouter } from "next/navigation"
import { ChatMessage } from "@/src/components/chat-message"
import { ChatInput } from "@/src/components/chat-input"
import { ChatHistorySidebar } from "@/src/components/chat-history-sidebar"
import { QuickExamplesSidebar } from "@/src/components/quick-examples-sidebar"
import { Card, CardContent } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { ScrollArea } from "@/src/components/ui/scroll-area"
import { Badge } from "@/src/components/ui/badge"
import { Menu, Lightbulb, Sparkles, TrendingUp, BarChart3 } from "lucide-react"
import { Navbar } from "@/src/components/navbar"

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: string
}

interface ChatHistoryItem {
  id: string
  title: string
  date: string
  messages: Message[]
}

export default function ChatPage() {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        'Hello! I\'m your AI assistant for exploring ARGO ocean data. You can ask me questions like:\n\n• "Show me temperature profiles in the North Atlantic"\n• "What are the salinity levels near the equator?"\n• "Find BGC data from the last 6 months"\n\nHow can I help you today?',
      isUser: false,
      timestamp: new Date().toLocaleTimeString(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [showChatHistory, setShowChatHistory] = useState(false)
  const [showQuickExamples, setShowQuickExamples] = useState(false)
  const [activeChat, setActiveChat] = useState<string>("1")
  const [queryCount, setQueryCount] = useState(0)
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    // Load chat history for authenticated users
    if (isAuthenticated && user && user.type !== "guest") {
      const savedHistory = localStorage.getItem("ocean-platform-chat-history")
      if (savedHistory) {
        const history = JSON.parse(savedHistory)
        if (history.messages) {
          setMessages(history.messages)
        }
        if (history.queryCount) {
          setQueryCount(history.queryCount)
        }
      }

      const savedChats = localStorage.getItem("ocean-platform-chat-list")
      if (savedChats) {
        setChatHistory(JSON.parse(savedChats))
      }
    }
  }, [isAuthenticated, user])

  const saveToHistory = (newMessages: Message[], newQueryCount: number) => {
    if (user && user.type !== "guest") {
      localStorage.setItem(
        "ocean-platform-chat-history",
        JSON.stringify({
          messages: newMessages,
          queryCount: newQueryCount,
        }),
      )
    }
  }

  const saveChatList = (chats: ChatHistoryItem[]) => {
    localStorage.setItem("ocean-platform-chat-list", JSON.stringify(chats))
    setChatHistory(chats)
  }

  if (!isAuthenticated) {
    return null
  }

  const handleSendMessage = async (content: string) => {
    // Check query limits for guest users
    if (user?.type === "guest" && queryCount >= 5) {
      const limitMessage: Message = {
        id: Date.now().toString(),
        content:
          "You've reached the query limit for guest users. Please sign up for a free account to continue chatting with unlimited queries!",
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
      }
      setMessages((prev) => [...prev, limitMessage])
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date().toLocaleTimeString(),
    }

    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setIsLoading(true)

    const newQueryCount = queryCount + 1
    setQueryCount(newQueryCount)

    // --- Save chat in sidebar list ---
    const newChat: ChatHistoryItem = {
      id: Date.now().toString(),
      title: content.length > 40 ? content.slice(0, 40) + "..." : content,
      date: "Just now",
      messages: newMessages,
    }
    saveChatList([...chatHistory, newChat])

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: content,
          userType: user?.type || "guest",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get AI response")
      }

      const data = await response.json()

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
      }

      const finalMessages = [...newMessages, aiMessage]
      setMessages(finalMessages)
      setIsLoading(false)

      // Save to history
      saveToHistory(finalMessages, newQueryCount)
    } catch (error) {
      console.error("Chat error:", error)

      // Fallback error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I apologize, but I'm having trouble connecting to the AI service right now. Please try again in a moment.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
      }

      const finalMessages = [...newMessages, errorMessage]
      setMessages(finalMessages)
      setIsLoading(false)
      saveToHistory(finalMessages, newQueryCount)
    }
  }

  const handleNewChat = () => {
    const welcomeMessage: Message = {
      id: "new-1",
      content:
        'Hello! I\'m your AI assistant for exploring ARGO ocean data. You can ask me questions like:\n\n• "Show me temperature profiles in the North Atlantic"\n• "What are the salinity levels near the equator?"\n• "Find BGC data from the last 6 months"\n\nHow can I help you today?',
      isUser: false,
      timestamp: new Date().toLocaleTimeString(),
    }

    setMessages([welcomeMessage])
    setActiveChat("new")
    setShowChatHistory(false)

    // Save new chat
    saveToHistory([welcomeMessage], queryCount)
  }

  const handleSelectChat = (chatId: string) => {
    setActiveChat(chatId)
    const selected = chatHistory.find((chat) => chat.id === chatId)
    if (selected) {
      setMessages(selected.messages)
    }
    setShowChatHistory(false)
  }

  const handleSelectExample = (example: string) => {
    handleSendMessage(example)
    setShowQuickExamples(false)
  }

  const getQueryLimitInfo = () => {
    if (!user) return null

    switch (user.type) {
      case "guest":
        return {
          current: queryCount,
          limit: 5,
          color: queryCount >= 4 ? "destructive" : "secondary",
        }
      case "normal":
        return {
          current: queryCount,
          limit: 100,
          color: queryCount >= 90 ? "destructive" : "default",
        }
      case "premium":
        return null // Unlimited
      default:
        return null
    }
  }

  const queryLimitInfo = getQueryLimitInfo()

  return (
    <div className="h-[100vh] bg-background">
      <Navbar />

      <div className="relative flex justify-center items-center p-10">
        {/* Chat History Sidebar */}
        <ChatHistorySidebar
          isOpen={showChatHistory}
          onClose={() => setShowChatHistory(false)}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
          activeChat={activeChat}
          chatHistory={chatHistory}
        />

        {/* Quick Examples Sidebar */}
        <QuickExamplesSidebar
          isOpen={showQuickExamples}
          onClose={() => setShowQuickExamples(false)}
          onSelectExample={handleSelectExample}
        />

        {/* Main Chat Area */}
        <div className="container max-w-6xl py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowChatHistory(true)}
                className="flex items-center gap-2"
              >
                <Menu className="w-4 h-4" />
                Chat History
              </Button>

              {/* User type and query limit badge */}
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="capitalize">
                  <Sparkles className="w-3 h-3 mr-1" />
                  {user?.type} User
                </Badge>

                {queryLimitInfo && (
                  <Badge variant={queryLimitInfo.color as any}>
                    {queryLimitInfo.current}/{queryLimitInfo.limit} queries
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowQuickExamples(true)}
                className="flex items-center gap-2"
              >
                <Lightbulb className="w-4 h-4" />
                Quick Examples
              </Button>
            </div>
          </div>

          <div className="flex flex-col h-[calc(100vh-12rem)]">
            <Card className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4 max-w-4xl mx-auto">
                  {messages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      message={message.content}
                      isUser={message.isUser}
                      timestamp={message.timestamp}
                    >
                      {/* Sample data visualization placeholder */}
                      {!message.isUser && message.content.includes("visualizations") && (
                        <Card className="bg-muted/50 mt-4">
                          <CardContent className="p-4">
                            <div className="h-32 bg-gradient-to-r from-chart-1 to-chart-2 rounded flex items-center justify-center text-white font-medium mb-3">
                              Sample Ocean Data Visualization
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-xs">
                              <div className="flex items-center gap-1">
                                <TrendingUp className="w-3 h-3 text-chart-1" />
                                <span>Temperature Trend</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <BarChart3 className="w-3 h-3 text-chart-2" />
                                <span>Depth Profile</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Sparkles className="w-3 h-3 text-chart-3" />
                                <span>Data Quality</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </ChatMessage>
                  ))}

                  {isLoading && (
                    <ChatMessage message="Analyzing your query and fetching ocean data..." isUser={false} />
                  )}
                </div>
              </ScrollArea>

              <div className="max-w-4xl mx-auto w-full">
                <ChatInput
                  onSendMessage={handleSendMessage}
                  disabled={isLoading || (user?.type === "guest" && queryCount >= 5)}
                  placeholder={
                    user?.type === "guest" && queryCount >= 5
                      ? "Query limit reached. Please sign up to continue..."
                      : "Ask about ARGO floats and ocean data..."
                  }
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
