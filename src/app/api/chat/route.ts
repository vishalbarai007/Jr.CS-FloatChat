import { GoogleGenerativeAI } from "@google/generative-ai"
import { type NextRequest, NextResponse } from "next/server"

const genAI = new GoogleGenerativeAI("AIzaSyAHtoZ8f1U-tx-IOLC_x8bNEJEFvFg9kvA")

export async function POST(request: NextRequest) {
  try {
    const { message, userType } = await request.json()

    // Check rate limits based on user type
    if (userType === "guest") {
      // In a real app, you'd implement proper rate limiting here
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const systemPrompt = `You are an AI assistant specialized in ARGO ocean data analysis. You help users explore oceanographic data from autonomous ARGO floats that measure temperature, salinity, and biogeochemical parameters in the world's oceans.

Key information about ARGO floats:
- Over 4,000 active floats globally
- Measure temperature and salinity from surface to 2000m depth
- BGC floats also measure oxygen, chlorophyll, pH, and nutrients
- Data collected every 10 days
- Critical for climate research and ocean monitoring

Provide helpful, accurate responses about ocean data, ARGO float operations, and oceanographic research. Keep responses informative but accessible. When discussing specific data, mention that this is a demo platform and real data integration would require database queries.`

    const fullPrompt = `${systemPrompt}\n\nUser question: ${message}`

    const result = await model.generateContent(fullPrompt)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({
      message: text,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Gemini API error:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
