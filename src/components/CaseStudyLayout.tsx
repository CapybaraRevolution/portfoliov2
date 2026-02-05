import Image from 'next/image'
import { Button } from '@/components/Button'
import { CategoryBadge, type CategoryType } from '@/components/ui/CategoryBadge'
import { ToolPill } from '@/components/ui/ToolPill'
import { AIBadge } from '@/components/ui/AIBadge'
import { Chip } from '@/components/ui/Chip'
import clsx from 'clsx'

export interface CaseStudyMetadata {
  title: string
  description: string
  client?: string
  category?: CategoryType
  status?: 'Ongoing' | 'Completed'
  timeline?: string
  tags?: string[]
  tools?: string[]
  cover?: string
  coverAlt?: string
  publishDate?: string
}

interface CaseStudyLayoutProps {
  metadata: CaseStudyMetadata
  children: React.ReactNode
}

export function CaseStudyLayout({ metadata, children }: CaseStudyLayoutProps) {
  const {
    title,
    description,
    client,
    category,
    status,
    timeline,
    tags = [],
    tools = [],
    cover,
    coverAlt
  } = metadata

  const isAIAccelerated = tags.includes('AI-Accelerated')

  return (
    <div className="relative max-w-4xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
            {title}
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl">
            {description}
          </p>
        </div>
        
        {cover && (
          <div className="mb-8">
            <Image
              src={cover}
              alt={coverAlt || title}
              width={800}
              height={400}
              className="w-full rounded-xl shadow-lg"
            />
          </div>
        )}
      </div>

      {/* Meta Row */}
      <div className="mb-12">
        <div className="bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm rounded-2xl border border-zinc-200/50 dark:border-zinc-700/50 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Client & Category */}
            <div>
              <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2">
                Client & Category
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                {client && (
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {client}
                  </span>
                )}
                {category && <CategoryBadge category={category} size="sm" />}
              </div>
            </div>

            {/* Timeline & Status */}
            <div>
              <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2">
                Timeline & Status
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                {timeline && (
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">
                    {timeline}
                  </span>
                )}
                {status && (
                  <span className={clsx(
                    'inline-flex items-center gap-x-1.5 px-2 py-1 rounded-md text-xs font-medium',
                    status === 'Completed' 
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                  )}>
                    {status === 'Completed' ? (
                      <svg viewBox="0 0 12 12" aria-hidden="true" className="size-3 fill-emerald-500">
                        <path d="M10.28 2.28a.75.75 0 0 0-1.06-1.06L4.5 5.94 2.78 4.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.06 0l5.25-5.25Z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 6 6" aria-hidden="true" className="size-1.5 animate-pulse fill-blue-500">
                        <circle r={3} cx={3} cy={3} />
                      </svg>
                    )}
                    {status === 'Completed' ? 'Complete' : status}
                  </span>
                )}
              </div>
            </div>

            {/* AI Badge */}
            <div>
              {isAIAccelerated && (
                <div>
                  <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2">
                    Approach
                  </h3>
                  <AIBadge size="sm" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Skills & Tools */}
      {(tags.length > 0 || tools.length > 0) && (
        <div className="mb-12 space-y-6">
          {/* Skills */}
          {tags.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                Skills & Approach
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Chip key={tag} variant="outline">
                    {tag}
                  </Chip>
                ))}
              </div>
            </div>
          )}

          {/* Tools */}
          {tools.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                Tools & Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <ToolPill 
                    key={tool} 
                    slug={tool.toLowerCase()} 
                    name={tool} 
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-zinc-200 dark:border-zinc-700 mb-12" />

      {/* MDX Content */}
      <div className="prose prose-zinc dark:prose-invert max-w-none">
        {children}
      </div>

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-700">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            href="/portfolio" 
            variant="outline"
            arrow="left"
          >
            Back to Portfolio
          </Button>
          <Button 
            href="/contact" 
            variant="filled"
            arrow="right"
          >
            Start a Project
          </Button>
          <Button 
            href="https://calendly.com/kylemcgraw" 
            variant="text"
          >
            Book intro call
          </Button>
        </div>
      </div>
    </div>
  )
}