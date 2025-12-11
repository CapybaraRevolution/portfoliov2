import { NextRequest, NextResponse } from 'next/server'
import DOMPurify from 'isomorphic-dompurify'
import { sendCommentNotification } from '@/lib/email'

// Comment type definition
interface Comment {
  id: string
  item_id: string
  author: string
  content: string
  mood: string | null
  created_at: string
}

// In-memory storage for comments
let comments: { [key: string]: Comment[] } = {}

// Rate limiting storage
let rateLimitStore: { [key: string]: { count: number; resetTime: number } } = {}

// Security configuration
const SECURITY_CONFIG = {
  maxContentLength: 2000,
  maxAuthorLength: 50,
  rateLimit: {
    maxRequests: 10,
    windowMs: 5 * 60 * 1000, // 5 minutes
  }
}

// Profanity filter - bad words list
const PROFANITY_LIST = [
  'pussy', 'ass', 'fuck', 'fucking', 'fucked', 'fucker', 'shit', 'bitch', 
  'damn', 'hell', 'kill', 'murder', 'die', 'death', 'suicide', 'rape',
  'nazi', 'hitler', 'terrorist', 'bomb', 'explosion', 'attack', 'violence',
  // Common variations and leetspeak
  'f*ck', 'f**k', 'a$$', 'sh*t', 'b*tch', '4ss', 'fuk', 'fck', 'sht'
]

// Profanity detection function
function containsProfanity(text: string): boolean {
  const cleanText = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ')
  const words = cleanText.split(/\s+/)
  
  return PROFANITY_LIST.some(badWord => {
    // Check for exact word matches with word boundaries
    const regex = new RegExp(`\\b${badWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i')
    return regex.test(cleanText) || words.some(word => word.includes(badWord))
  })
}

// Turnstile verification function
async function verifyTurnstile(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY
  if (!secretKey) {
    // If no secret key configured, skip verification in development
    return process.env.NODE_ENV === 'development'
  }
  
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    })
    
    const data = await response.json()
    return data.success === true
  } catch {
    return false
  }
}

// Cleanup expired rate limit entries to prevent memory growth
function cleanupExpiredRateLimits(): void {
  const now = Date.now()
  for (const clientId of Object.keys(rateLimitStore)) {
    if (rateLimitStore[clientId].resetTime < now) {
      delete rateLimitStore[clientId]
    }
  }
}

// Rate limiting middleware
function checkRateLimit(clientId: string): boolean {
  const now = Date.now()
  
  // Cleanup expired entries periodically (every 100 checks)
  if (Math.random() < 0.01) {
    cleanupExpiredRateLimits()
  }
  
  const clientData = rateLimitStore[clientId]
  
  if (!clientData || now > clientData.resetTime) {
    rateLimitStore[clientId] = {
      count: 1,
      resetTime: now + SECURITY_CONFIG.rateLimit.windowMs
    }
    return true
  }
  
  if (clientData.count >= SECURITY_CONFIG.rateLimit.maxRequests) {
    return false
  }
  
  clientData.count++
  return true
}

// Input validation and sanitization
function validateAndSanitizeInput(author: string, content: string) {
  // Trim and basic validation
  const trimmedAuthor = author?.trim() || ''
  const trimmedContent = content?.trim() || ''
  
  // Length validation
  if (trimmedAuthor.length === 0 || trimmedAuthor.length > SECURITY_CONFIG.maxAuthorLength) {
    throw new Error(`Author name must be 1-${SECURITY_CONFIG.maxAuthorLength} characters`)
  }
  
  if (trimmedContent.length === 0 || trimmedContent.length > SECURITY_CONFIG.maxContentLength) {
    throw new Error(`Comment must be 1-${SECURITY_CONFIG.maxContentLength} characters`)
  }

  // Profanity check
  if (containsProfanity(trimmedAuthor)) {
    throw new Error('Inappropriate content detected in name. Please use a different name.')
  }
  
  if (containsProfanity(trimmedContent)) {
    throw new Error('Inappropriate content detected in comment. Please revise your message.')
  }
  
  // Sanitize HTML content
  const sanitizedAuthor = DOMPurify.sanitize(trimmedAuthor, { 
    ALLOWED_TAGS: []
  })
  const sanitizedContent = DOMPurify.sanitize(trimmedContent, { 
    ALLOWED_TAGS: [],
    FORBID_ATTR: ['style', 'onclick', 'onload', 'onerror']
  })
  
  return { author: sanitizedAuthor, content: sanitizedContent }
}

// Get client identifier for rate limiting
function getClientId(request: NextRequest): string {
  // Use IP address and User-Agent for basic fingerprinting
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'
  const userAgent = request.headers.get('user-agent') || 'unknown'
  return `${ip}-${userAgent.slice(0, 50)}` // Limit user agent length
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ itemId: string }> }
) {
  try {
    const { itemId } = await params
    
    const itemComments = comments[itemId] || []
    const response = NextResponse.json({
      success: true,
      comments: itemComments.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    })
    
    // Add cache headers for better performance
    response.headers.set('Cache-Control', 's-maxage=10, stale-while-revalidate=30')
    
    return response
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch comments' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ itemId: string }> }
) {
  try {
    const { itemId } = await params
    
    // Rate limiting check
    const clientId = getClientId(request)
    if (!checkRateLimit(clientId)) {
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      )
    }
    
    const body = await request.json()
    const { author, content, mood, turnstileToken } = body

    // Verify Turnstile token first
    if (!turnstileToken) {
      return NextResponse.json(
        { success: false, error: 'Security verification required' },
        { status: 400 }
      )
    }

    const isTurnstileValid = await verifyTurnstile(turnstileToken)
    if (!isTurnstileValid) {
      return NextResponse.json(
        { success: false, error: 'Security verification failed. Please try again.' },
        { status: 400 }
      )
    }

    // Validate and sanitize input
    let sanitizedAuthor: string, sanitizedContent: string
    try {
      const sanitized = validateAndSanitizeInput(author, content)
      sanitizedAuthor = sanitized.author
      sanitizedContent = sanitized.content
    } catch (validationError) {
      return NextResponse.json(
        { success: false, error: (validationError as Error).message },
        { status: 400 }
      )
    }

    // Validate mood if provided
    const allowedMoods = ['excited', 'loved', 'happy', 'sad', 'thumbsy', null]
    if (mood !== undefined && !allowedMoods.includes(mood)) {
      return NextResponse.json(
        { success: false, error: 'Invalid mood value' },
        { status: 400 }
      )
    }

    // Create new comment in memory
    const newComment: Comment = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      item_id: itemId,
      author: sanitizedAuthor,
      content: sanitizedContent,
      mood: mood || null,
      created_at: new Date().toISOString(),
    }

    // Initialize comments array for this item if it doesn't exist
    if (!comments[itemId]) {
      comments[itemId] = []
    }

    // Prevent memory exhaustion - limit comments per item
    if (comments[itemId].length >= 1000) {
      comments[itemId] = comments[itemId].slice(0, 999)
    }

    // Add comment to the beginning of the array
    comments[itemId].unshift(newComment)

    // Send email notification (don't block response if email fails)
    sendCommentNotification({
      authorName: sanitizedAuthor,
      content: sanitizedContent,
      itemId: itemId,
      mood: mood || null,
      timestamp: newComment.created_at
    }).catch(() => {
      // Continue execution - email failure shouldn't affect comment creation
    })

    // Return comment without internal fields
    const responseComment = {
      id: newComment.id,
      author: newComment.author,
      content: newComment.content,
      mood: newComment.mood,
      created_at: newComment.created_at
    }
    
    return NextResponse.json({
      success: true,
      comment: responseComment,
    })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to create comment' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ itemId: string }> }
) {
  try {
    const { itemId } = await params
    const { searchParams } = new URL(request.url)
    const commentId = searchParams.get('commentId')

    if (!commentId) {
      return NextResponse.json(
        { success: false, error: 'Comment ID is required' },
        { status: 400 }
      )
    }

    // Delete from in-memory storage
    if (comments[itemId]) {
      comments[itemId] = comments[itemId].filter(comment => comment.id !== commentId)
    }

    return NextResponse.json({
      success: true,
      message: 'Comment deleted successfully',
    })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to delete comment' },
      { status: 500 }
    )
  }
}
