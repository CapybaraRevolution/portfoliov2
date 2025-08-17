import { NextRequest, NextResponse } from 'next/server'
import DOMPurify from 'isomorphic-dompurify'
import { supabase, type Comment, type CommentInsert } from '@/lib/supabase'

// Fallback in-memory storage if Supabase is not configured
let comments: { [key: string]: any[] } = {}

// Check if Supabase is properly configured
const isSupabaseConfigured = (): boolean => {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && 
           process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
           process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_url_here' &&
           process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'your_supabase_anon_key_here')
}

// Rate limiting storage (in production, use Redis or database)
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
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY!,
        response: token,
      }),
    })
    
    const data = await response.json()
    return data.success === true
  } catch (error) {
    console.error('Turnstile verification failed:', error)
    return false
  }
}

// Rate limiting middleware
function checkRateLimit(clientId: string): boolean {
  const now = Date.now()
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
    
    if (isSupabaseConfigured()) {
      // Use Supabase
      const { data, error } = await supabase
        .from('comments')
        .select('id, item_id, author, content, mood, created_at')
        .eq('item_id', itemId)
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Supabase error fetching comments:', error)
        throw error
      }
      
      const response = NextResponse.json({
        success: true,
        comments: data || []
      })
      
      // Add cache headers for better performance
      response.headers.set('Cache-Control', 's-maxage=10, stale-while-revalidate=30')
      
      return response
    } else {
      // Fallback to in-memory storage
      const itemComments = comments[itemId] || []
      const response = NextResponse.json({
        success: true,
        comments: itemComments.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      })
      
      // Add cache headers for better performance
      response.headers.set('Cache-Control', 's-maxage=10, stale-while-revalidate=30')
      
      return response
    }
  } catch (error) {
    console.error('Error fetching comments:', error)
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

    if (isSupabaseConfigured()) {
      // Use Supabase
      const commentData: CommentInsert = {
        item_id: itemId,
        author: sanitizedAuthor,
        content: sanitizedContent,
        mood: mood || null,
        client_id: clientId.slice(0, 20)
      }

      const { data, error } = await supabase
        .from('comments')
        .insert(commentData)
        .select('id, item_id, author, content, mood, created_at')
        .single()

      if (error) {
        console.error('Supabase error creating comment:', error)
        throw new Error('Failed to save comment to database')
      }

      return NextResponse.json({
        success: true,
        comment: data,
      })
    } else {
      // Fallback to in-memory storage
      const newComment = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        author: sanitizedAuthor,
        content: sanitizedContent,
        mood: mood || null,
        created_at: new Date().toISOString(),
        clientId: clientId.slice(0, 20),
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

      // Remove clientId from response for privacy
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
    }
  } catch (error) {
    console.error('Error creating comment:', error)
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

    if (isSupabaseConfigured()) {
      // Use Supabase
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId)
        .eq('item_id', itemId) // Additional security check
      
      if (error) {
        console.error('Supabase error deleting comment:', error)
        throw error
      }
    } else {
      // Fallback to in-memory storage
      if (comments[itemId]) {
        comments[itemId] = comments[itemId].filter(comment => comment.id !== commentId)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Comment deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting comment:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete comment' },
      { status: 500 }
    )
  }
}