import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { contact_id, conversation_history, last_message, context } = await request.json()

    if (!conversation_history || !last_message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create AI prompt for response suggestions
    const systemPrompt = `You are an AI assistant for a real estate agent. Your goal is to help craft professional, engaging, and effective responses to leads.

Context:
- Contact Type: ${context?.contact_type || 'unknown'}
- Lead Score: ${context?.lead_score || 'unknown'}/100
- Preferred Locations: ${context?.preferred_locations?.join(', ') || 'not specified'}

Recent conversation:
${conversation_history.slice(-3).map((msg: any) => 
  `${msg.role === 'contact' ? 'Client' : 'Agent'}: ${msg.message}`
).join('\n')}

Last message from client: "${last_message}"

Provide 2-3 response suggestions that are:
1. Professional and friendly
2. Address their specific question or concern
3. Move the conversation forward
4. Include a clear call-to-action

Also provide 1-2 insights about what this lead might be looking for based on their behavior.`

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: last_message }
      ],
      temperature: 0.7,
      max_tokens: 500,
    })

    const aiResponse = completion.choices[0]?.message?.content

    if (!aiResponse) {
      throw new Error('No response from AI')
    }

    // Parse AI response to extract suggestions and insights
    const suggestions = aiResponse.split('\n').filter((line: string) => 
      line.match(/^\d+\./) || line.match(/^Response \d+:/i)
    ).map((suggestion: string, index: number) => ({
      text: suggestion.replace(/^\d+\.\s*|Response \d+:\s*/i, '').trim(),
      tone: index === 0 ? 'professional' : 'casual',
      confidence: 0.85 - (index * 0.1)
    }))

    const insights = aiResponse.split('\n').filter((line: string) => 
      line.includes('insight') || line.includes('looking for') || line.includes('interest')
    ).map((insight: string) => insight.trim())

    const response = {
      suggested_responses: suggestions.length > 0 ? suggestions : [{
        text: aiResponse.trim(),
        tone: 'professional',
        confidence: 0.8
      }],
      context_insights: insights,
      lead_score_adjustment: Math.random() > 0.5 ? 2 : -1,
      recommended_actions: [
        'Follow up within 24 hours',
        'Send property recommendations',
        'Schedule a call'
      ]
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('AI response error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to generate AI response',
        suggested_responses: [{
          text: 'I apologize, but I\'m having trouble generating a response right now. Could you please try again or contact me directly?',
          tone: 'professional',
          confidence: 0.5
        }],
        context_insights: [],
        recommended_actions: []
      },
      { status: 500 }
    )
  }
}