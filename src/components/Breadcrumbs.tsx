import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={clsx('flex', className)}>
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          
          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRightIcon 
                  className="h-4 w-4 text-zinc-400 dark:text-zinc-500 mr-2" 
                  aria-hidden="true" 
                />
              )}
              
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={clsx(
                    'text-sm font-medium',
                    isLast 
                      ? 'text-zinc-900 dark:text-zinc-100' 
                      : 'text-zinc-600 dark:text-zinc-400'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}