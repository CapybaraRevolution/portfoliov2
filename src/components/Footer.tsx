'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/Button'
import { navigation } from '@/components/Navigation'

function PageLink({
  label,
  page,
  previous = false,
}: {
  label: string
  page: { href: string; title: string }
  previous?: boolean
}) {
  return (
    <>
      <Button
        href={page.href}
        aria-label={`${label}: ${page.title}`}
        variant="secondary"
        arrow={previous ? 'left' : 'right'}
      >
        {label}
      </Button>
      <Link
        href={page.href}
        tabIndex={-1}
        aria-hidden="true"
        className="text-base font-semibold text-zinc-900 transition hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300"
      >
        {page.title}
      </Link>
    </>
  )
}

function PageNavigation({ fullWidth = false }: { fullWidth?: boolean }) {
  let pathname = usePathname()
  let allPages = navigation.flatMap((group) => group.links)
  let currentPageIndex = allPages.findIndex((page) => page.href === pathname)

  if (currentPageIndex === -1) {
    return null
  }

  let previousPage = allPages[currentPageIndex - 1]
  let nextPage = allPages[currentPageIndex + 1]

  if (!previousPage && !nextPage) {
    return null
  }

  return (
    <nav 
      aria-label="Pagination"
      className={fullWidth 
        ? "flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between" 
        : "flex"
      }
    >
      {/* Left column: Previous */}
      {!!previousPage && (
        <div className="flex flex-col items-start gap-3">
          <PageLink label="Previous" page={previousPage} previous />
        </div>
      )}
      
      {/* Right column: Next */}
      {!!nextPage && (
        <div className={fullWidth 
          ? "flex flex-col items-end gap-3" 
          : "ml-auto flex flex-col items-end gap-3"
        }>
          <PageLink label="Next" page={nextPage} />
        </div>
      )}
    </nav>
  )
}

function GitHubIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 1.667c-4.605 0-8.334 3.823-8.334 8.544 0 3.78 2.385 6.974 5.698 8.106.417.075.573-.182.573-.406 0-.203-.011-.875-.011-1.592-2.093.397-2.635-.522-2.802-1.002-.094-.246-.5-1.005-.854-1.207-.291-.16-.708-.556-.01-.567.656-.01 1.124.62 1.281.876.75 1.292 1.948.93 2.427.705.073-.555.291-.93.531-1.143-1.854-.213-3.791-.95-3.791-4.218 0-.929.322-1.698.854-2.296-.083-.214-.375-1.09.083-2.265 0 0 .698-.224 2.292.876a7.576 7.576 0 0 1 2.083-.288c.709 0 1.417.096 2.084.288 1.593-1.11 2.291-.875 2.291-.875.459 1.174.167 2.05.084 2.263.53.599.854 1.357.854 2.297 0 3.278-1.948 4.005-3.802 4.219.302.266.563.78.563 1.58 0 1.143-.011 2.061-.011 2.35 0 .224.156.491.573.405a8.365 8.365 0 0 0 4.11-3.116 8.707 8.707 0 0 0 1.567-4.99c0-4.721-3.73-8.545-8.334-8.545Z"
      />
    </svg>
  )
}

function LinkedInIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 01-1.548-1.549 1.548 1.548 0 111.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 0H.362C.162 0 0 .162 0 .361v19.278c0 .199.162.361.362.361h19.308c.2 0 .362-.162.362-.361V.361C20.032.162 19.87 0 19.67 0z"
      />
    </svg>
  )
}

function SocialLink({
  href,
  ariaLabel,
  icon: Icon,
}: {
  href: string
  ariaLabel: string
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Link href={href} className="group" aria-label={ariaLabel}>
      <span className="sr-only">{ariaLabel}</span>
      <Icon className="h-5 w-5 fill-zinc-700 transition group-hover:fill-zinc-900 dark:fill-zinc-400 dark:group-hover:fill-zinc-500" />
    </Link>
  )
}

export function Footer() {
  const pathname = (usePathname() || '').split('?')[0].replace(/\/$/, '')
  const isCaseStudy = pathname.includes('/case-studies/')
  
  const container = isCaseStudy
    ? 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'
    : 'mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-5xl lg:px-8'

  const year = new Date().getFullYear()

  return (
    <footer className="w-full bg-transparent">
      {/* Align to sidebar */}
      <div className="lg:ml-72 xl:ml-80">
        {/* Full-width divider spanning the sidebar-offset area */}
        <div className="border-t border-zinc-900/10 dark:border-white/10">
          <div className={container}>
            {/* Row 1: Pager */}
            <div className="py-6">
              <PageNavigation fullWidth />
            </div>

            {/* Row 2: Protocol-style small print */}
            <div className="pb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-sm text-zinc-500 dark:text-zinc-400">
              <p className="order-2 sm:order-1">
                © {year} Kyle McGraw. All rights reserved.
              </p>

              <div className="order-1 sm:order-2 flex items-center gap-x-4">
                <SocialLink 
                  href="https://github.com/CapybaraRevolution" 
                  ariaLabel="GitHub"
                  icon={GitHubIcon}
                />
                <SocialLink 
                  href="https://www.linkedin.com/in/kyleryanmcgraw/" 
                  ariaLabel="LinkedIn"
                  icon={LinkedInIcon}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}