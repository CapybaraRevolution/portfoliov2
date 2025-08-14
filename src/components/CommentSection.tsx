'use client'

import { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { 
  ChatBubbleLeftEllipsisIcon,
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CaptchaModal } from './CaptchaModal'

interface Comment {
  id: string
  author: string
  content: string
  created_at: string
  mood?: string
}

interface CommentSectionProps {
  itemId: string
  onCaptchaRequired?: () => Promise<boolean>
}

const moods = [
  { name: 'Excited', value: 'excited', icon: FireIcon, iconColor: 'text-white', bgColor: 'bg-red-500' },
  { name: 'Loved', value: 'loved', icon: HeartIcon, iconColor: 'text-white', bgColor: 'bg-pink-400' },
  { name: 'Happy', value: 'happy', icon: FaceSmileIcon, iconColor: 'text-white', bgColor: 'bg-green-400' },
  { name: 'Sad', value: 'sad', icon: FaceFrownIcon, iconColor: 'text-white', bgColor: 'bg-yellow-400' },
  { name: 'Thumbsy', value: 'thumbsy', icon: HandThumbUpIcon, iconColor: 'text-white', bgColor: 'bg-blue-500' },
  { name: 'I feel nothing', value: null, icon: XMarkIcon, iconColor: 'text-zinc-500 dark:text-zinc-400', bgColor: 'bg-transparent' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
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

export function CommentSection({ itemId, onCaptchaRequired }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [selectedMood, setSelectedMood] = useState(moods[5]) // Default to "I feel nothing"
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showCaptcha, setShowCaptcha] = useState(false)

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
    if (!newComment.trim()) return

    // Show captcha modal for all comments
    setShowCaptcha(true)
  }

  const handleCaptchaVerified = async (authorName: string, turnstileToken: string) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch(`/api/comments/${itemId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          author: authorName,
          content: newComment.trim(),
          mood: selectedMood.value,
          turnstileToken: turnstileToken,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setComments(prev => [data.comment, ...prev])
        setNewComment('')
        setShowCaptcha(false)
        // Reset mood to default
        setSelectedMood(moods[5])
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit comment')
      }
    } catch (error) {
      // Re-throw error to be handled by CaptchaModal
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Comments Feed - Moved to top */}
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
                            {comment.mood && (
                              <span className="ml-2">
                                {(() => {
                                  const mood = moods.find(m => m.value === comment.mood)
                                  if (!mood || mood.value === null) return null
                                  return (
                                    <span className={classNames(mood.bgColor, 'inline-flex size-4 items-center justify-center rounded-full')}>
                                      <mood.icon aria-hidden="true" className="size-3 text-white" />
                                    </span>
                                  )
                                })()}
                              </span>
                            )}
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

      {/* Modern Comment Composer - Moved to bottom */}
      <div>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Add a Comment
        </h3>
        

        {/* Comment Composer */}
        <div className="flex items-start space-x-4">
          <div className="shrink-0">
            <div className="flex size-10 rounded-full bg-emerald-500 text-white items-center justify-center">
              <ChatBubbleLeftEllipsisIcon className="size-5" />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <form onSubmit={handleSubmit} className="relative">
              <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent">
                <label htmlFor="comment" className="sr-only">
                  Add your comment
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add your comment..."
                  className="block w-full resize-none bg-transparent px-3 py-1.5 text-base text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:outline-none sm:text-sm/6"
                  maxLength={2000}
                  required
                />

                {/* Spacer element to match the height of the toolbar */}
                <div aria-hidden="true" className="py-2">
                  <div className="py-px">
                    <div className="h-9" />
                  </div>
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pr-2 pl-3">
                <div className="flex items-center space-x-5">
                  <div className="flex items-center">
                    <Listbox value={selectedMood} onChange={setSelectedMood}>
                      <Label className="sr-only">Your mood</Label>
                      <div className="relative">
                        <ListboxButton className="relative -m-2.5 flex size-10 items-center justify-center rounded-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">
                          <span className="flex items-center justify-center">
                            {selectedMood.value === null ? (
                              <span>
                                <FaceSmileIcon aria-hidden="true" className="size-5 shrink-0" />
                                <span className="sr-only">Add your mood</span>
                              </span>
                            ) : (
                              <span>
                                <span
                                  className={classNames(
                                    selectedMood.bgColor,
                                    'flex size-8 items-center justify-center rounded-full',
                                  )}
                                >
                                  <selectedMood.icon aria-hidden="true" className="size-5 shrink-0 text-white" />
                                </span>
                                <span className="sr-only">{selectedMood.name}</span>
                              </span>
                            )}
                          </span>
                        </ListboxButton>

                        <ListboxOptions
                          transition
                          className="absolute z-10 mt-1 -ml-6 w-60 rounded-lg bg-white dark:bg-zinc-800 py-3 text-base shadow-lg ring-1 ring-zinc-200 dark:ring-zinc-700 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:ml-auto sm:w-64 sm:text-sm"
                        >
                          {moods.map((mood) => (
                            <ListboxOption
                              key={mood.value || 'none'}
                              value={mood}
                              className="relative cursor-default bg-transparent px-3 py-2 text-zinc-900 dark:text-white select-none data-focus:bg-zinc-100 dark:data-focus:bg-zinc-700"
                            >
                              <div className="flex items-center">
                                <div
                                  className={classNames(
                                    mood.bgColor,
                                    'flex size-8 items-center justify-center rounded-full',
                                  )}
                                >
                                  <mood.icon aria-hidden="true" className={classNames(mood.iconColor, 'size-5 shrink-0')} />
                                </div>
                                <span className="ml-3 block truncate font-medium">{mood.name}</span>
                              </div>
                            </ListboxOption>
                          ))}
                        </ListboxOptions>
                      </div>
                    </Listbox>
                  </div>
                </div>
                <div className="shrink-0">
                  <button
                    type="submit"
                    disabled={isSubmitting || !newComment.trim()}
                    className="inline-flex items-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Captcha Modal */}
      <CaptchaModal
        open={showCaptcha}
        onClose={() => setShowCaptcha(false)}
        onVerified={handleCaptchaVerified}
        commentContent={newComment}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}