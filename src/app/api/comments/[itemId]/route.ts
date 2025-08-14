import { NextRequest, NextResponse } from 'next/server'

// Temporary in-memory storage (replace with database later)
let comments: { [key: string]: any[] } = {}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ itemId: string }> }
) {
  try {
    const { itemId } = await params
    const itemComments = comments[itemId] || []
    
    return NextResponse.json({
      success: true,
      comments: itemComments.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    })
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
    const body = await request.json()
    const { author, content, mood } = body

    // Basic validation
    if (!author?.trim() || !content?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Author and content are required' },
        { status: 400 }
      )
    }

    // Create new comment
    const newComment = {
      id: Date.now().toString(),
      author: author.trim(),
      content: content.trim(),
      mood: mood || null,
      created_at: new Date().toISOString(),
    }

    // Initialize comments array for this item if it doesn't exist
    if (!comments[itemId]) {
      comments[itemId] = []
    }

    // Add comment to the beginning of the array
    comments[itemId].unshift(newComment)

    return NextResponse.json({
      success: true,
      comment: newComment,
    })
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

    // Remove comment from the array
    if (comments[itemId]) {
      comments[itemId] = comments[itemId].filter(comment => comment.id !== commentId)
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