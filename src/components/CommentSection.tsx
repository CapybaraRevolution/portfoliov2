'use client'

import { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/20/solid'

interface Comment {
  id: string
  author: string
  content: string
  created_at: string
}

interface CommentSectionProps {
  itemId: string
}

// Generate initials from name
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Generate a consistent color based on name
function getInitialsColor(name: string): string {
  const colors = [
    'bg-emerald-500',
    'bg-blue-500', 
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-orange-500',
    'bg-cyan-500'
  ]
  
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  return colors[Math.abs(hash) % colors.length]
}

export function CommentSection({ itemId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [author, setAuthor] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load comments when component mounts
  useEffect(() => {
    loadComments()
  }, [itemId])

  const loadComments = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/comments/${itemId}`)
      if (response.ok) {
        const data = await response.json()
        setComments(data.comments || [])
      }
    } catch (error) {
      console.error('Failed to load comments:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !author.trim()) return

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/comments/${itemId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          author: author.trim(),
          content: newComment.trim(),
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setComments(prev => [data.comment, ...prev])
        setNewComment('')
        // Keep author name for convenience
      } else {
        throw new Error('Failed to submit comment')
      }
    } catch (error) {
      console.error('Failed to submit comment:', error)
      alert('Failed to submit comment. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Add Comment Form */}
      <div>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Add a Comment
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="author" 
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
            >
              Your Name
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm placeholder-zinc-400 dark:placeholder-zinc-500 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label 
              htmlFor="comment" 
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
            >
              Comment
            </label>
            <textarea
              id="comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts, feedback, or questions..."
              rows={4}
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm placeholder-zinc-400 dark:placeholder-zinc-500 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-vertical"
              required
            />
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || !newComment.trim() || !author.trim()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </form>
      </div>

      {/* Comments Feed */}
      <div>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-6">
          Comments ({comments.length})
        </h3>
        
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-pulse">
              <div className="h-4 bg-zinc-300 dark:bg-zinc-600 rounded w-1/4 mx-auto mb-2"></div>
              <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-zinc-500 dark:text-zinc-400">
              <ChatBubbleLeftEllipsisIcon className="mx-auto h-12 w-12 text-zinc-300 dark:text-zinc-600 mb-4" />
              <p className="text-sm">No comments yet.</p>
              <p className="text-xs mt-1">Be the first to share your thoughts!</p>
            </div>
          </div>
        ) : (
          <div className="flow-root">
            <ul role="list" className="-mb-8">
              {comments.map((comment, commentIdx) => (
                <li key={comment.id}>
                  <div className="relative pb-8">
                    {commentIdx !== comments.length - 1 ? (
                      <span 
                        aria-hidden="true" 
                        className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-zinc-200 dark:bg-zinc-700" 
                      />
                    ) : null}
                    <div className="relative flex items-start space-x-3">
                      <div className="relative">
                        <div className={`flex size-10 items-center justify-center rounded-full text-white text-sm font-medium ring-4 ring-white dark:ring-zinc-900 ${getInitialsColor(comment.author)}`}>
                          {getInitials(comment.author)}
                        </div>
                        <span className="absolute -right-1 -bottom-0.5 rounded-tl bg-white dark:bg-zinc-900 px-0.5 py-px">
                          <ChatBubbleLeftEllipsisIcon aria-hidden="true" className="size-4 text-zinc-400 dark:text-zinc-500" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm">
                            <span className="font-medium text-zinc-900 dark:text-white">
                              {comment.author}
                            </span>
                          </div>
                          <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                            Commented {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                          </p>
                        </div>
                        <div className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                          <p className="whitespace-pre-wrap">{comment.content}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}