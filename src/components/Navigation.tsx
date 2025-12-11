'use client'

import clsx from 'clsx'
import { AnimatePresence, motion, useIsPresent } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef, useEffect, useState } from 'react'

import { ContactDrawer } from '@/components/ContactDrawer'
import { Button } from '@/components/Button'
import { useIsInsideMobileNavigation, useMobileNavigationStore } from '@/components/MobileNavigation'
import { useSectionStore } from '@/components/SectionProvider'
import { Tag } from '@/components/Tag'
import { remToPx } from '@/lib/remToPx'
import { getCaseStudiesForNavigation } from '@/lib/caseStudies'
import { CloseButton } from '@headlessui/react'
import { LinkRippleButton } from '@/components/ui/ripple-button'

interface NavLink {
  title: string
  href: string
  badge?: 'coming-soon' | 'under-construction'
  disabled?: boolean
}

interface NavGroup {
  title: string
  hideChildren?: boolean
  links: NavLink[]
}

function useInitialValue<T>(value: T, condition = true) {
  let initialValue = useRef(value).current
  return condition ? initialValue : value
}

function TopLevelNavItem({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <li className="md:hidden">
      <CloseButton
        as={Link}
        href={href}
        className="block py-2.5 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
      >
        {children}
      </CloseButton>
    </li>
  )
}

function NavLink({
  href,
  children,
  tag,
  active = false,
  isAnchorLink = false,
  shouldPulse = false,
  badge,
  disabled = false,
}: {
  href: string
  children: React.ReactNode
  tag?: string
  active?: boolean
  isAnchorLink?: boolean
  shouldPulse?: boolean
  badge?: 'coming-soon' | 'under-construction'
  disabled?: boolean
}) {
  const isOverview = children === 'Overview' && href.includes('/work/overview') && !isAnchorLink
  
  // Badge content removed - we now use a header instead
  
  // Render Overview as a MagicUI ghosted ripple button
  if (isOverview) {
    return (
      <LinkRippleButton
        href={href}
        aria-current={active ? 'page' : undefined}
        rippleColor={active ? "rgba(16, 185, 129, 0.2)" : "rgba(0, 0, 0, 0.1)"}
        duration="500ms"
        className={clsx(
          'inline-flex items-center justify-center rounded-md text-xs font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-emerald-500/50',
          'disabled:pointer-events-none disabled:opacity-50',
          'border border-zinc-900/10 dark:border-white/10',
          active
            ? 'bg-emerald-50/50 text-emerald-700 hover:bg-emerald-100/50 dark:bg-emerald-400/10 dark:text-emerald-400 dark:border-emerald-400/20 dark:hover:bg-emerald-400/15'
            : 'bg-transparent text-zinc-700 hover:bg-zinc-100/50 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white',
          'h-7 px-3 py-1',
          'mx-2 my-1',
        )}
      >
        <span className="truncate">{children}</span>
        {tag && (
          <Tag variant="small" color="zinc">
            {tag}
          </Tag>
        )}
      </LinkRippleButton>
    )
  }
  
  // Disabled state (coming soon or under construction)
  if (disabled) {
    return (
      <span
        className={clsx(
          'flex justify-between gap-2 py-2.5 lg:py-1 pr-3 text-sm cursor-not-allowed',
          isAnchorLink ? 'pl-7' : 'pl-4 font-semibold',
          'text-zinc-400 dark:text-zinc-500',
        )}
        aria-disabled="true"
      >
        <span className="truncate flex items-center">
          {children}
        </span>
      </span>
    )
  }
  
  return (
    <CloseButton
      as={Link}
      href={href}
      aria-current={active ? 'page' : undefined}
      className={clsx(
        'flex justify-between gap-2 py-2.5 lg:py-1 pr-3 text-sm transition-all duration-500',
        isAnchorLink ? 'pl-7' : 'pl-4 font-semibold',
        active
          ? 'text-zinc-900 dark:text-white'
          : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white',
        shouldPulse && 'text-emerald-600 dark:text-emerald-400',
      )}
    >
      <span className="truncate flex items-center gap-1.5">
        {children}
        {shouldPulse && (
          <motion.span
            initial={{ opacity: 0, x: 4 }}
            animate={{ opacity: [0, 1, 0], x: [4, 0, 4] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="text-emerald-500"
          >
            ←
          </motion.span>
        )}
      </span>
      {tag && (
        <Tag variant="small" color="zinc">
          {tag}
        </Tag>
      )}
    </CloseButton>
  )
}

function VisibleSectionHighlight({
  group,
  pathname,
}: {
  group: NavGroup
  pathname: string
}) {
  let [sections, visibleSections] = useInitialValue(
    [
      useSectionStore((s) => s.sections),
      useSectionStore((s) => s.visibleSections),
    ],
    useIsInsideMobileNavigation(),
  )

  let isPresent = useIsPresent()
  let itemHeight = remToPx(2)
  
  // Filter links the same way they're filtered in render
  let filteredLinks = group.links.filter(
    (link) => !(link.title === 'Overview' && link.href.includes('/work/overview'))
  )
  
  // Find current page index in the FILTERED list (matching what's actually rendered)
  let currentPageIndex = filteredLinks.findIndex((link) => link.href === pathname)
  if (currentPageIndex === -1) return null
  
  // If hideChildren is true, only highlight the parent page link
  if (group.hideChildren) {
    let top = currentPageIndex * itemHeight
    return (
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.2 } }}
        exit={{ opacity: 0 }}
        className="absolute inset-x-0 top-0 bg-zinc-800/2.5 will-change-transform dark:bg-white/2.5"
        style={{ borderRadius: 8, height: itemHeight, top }}
      />
    )
  }
  
  // Only count visible sections that actually exist in the current page's sections
  // This prevents the highlight from extending beyond the current page
  let visibleSectionsInCurrentPage = visibleSections.filter(id => 
    id === '_top' || sections.some(section => section.id === id)
  )
  
  // If no sections are visible, show highlight on the page link itself
  if (visibleSectionsInCurrentPage.length === 0) {
    let top = currentPageIndex * itemHeight
    return (
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.2 } }}
        exit={{ opacity: 0 }}
        className="absolute inset-x-0 top-0 bg-zinc-800/2.5 will-change-transform dark:bg-white/2.5"
        style={{ borderRadius: 8, height: itemHeight, top }}
      />
    )
  }
  
  let allSections = [{ id: '_top' }, ...sections]
  let firstVisibleSectionIndex = allSections.findIndex(
    (section) => section.id === visibleSectionsInCurrentPage[0]
  )
  let lastVisibleSectionIndex = allSections.findIndex(
    (section) => section.id === visibleSectionsInCurrentPage[visibleSectionsInCurrentPage.length - 1]
  )
  
  // If we can't find the sections, default to first section
  if (firstVisibleSectionIndex === -1) firstVisibleSectionIndex = 0
  if (lastVisibleSectionIndex === -1) lastVisibleSectionIndex = firstVisibleSectionIndex
  
  // Calculate height based on the range of visible sections
  let numberOfSectionsToHighlight = lastVisibleSectionIndex - firstVisibleSectionIndex + 1
  
  // Constrain to the total sections available on this page
  let maxPossibleSections = allSections.length - firstVisibleSectionIndex
  numberOfSectionsToHighlight = Math.min(numberOfSectionsToHighlight, maxPossibleSections)
  numberOfSectionsToHighlight = Math.max(1, numberOfSectionsToHighlight)
  
  // Calculate top position: page link position + section offset within that page's section list
  let top = currentPageIndex * itemHeight + firstVisibleSectionIndex * itemHeight
  let height = isPresent ? numberOfSectionsToHighlight * itemHeight : itemHeight

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      className="absolute inset-x-0 top-0 bg-zinc-800/2.5 will-change-transform dark:bg-white/2.5"
      style={{ borderRadius: 8, height, top }}
    />
  )
}

function ActivePageMarker({
  group,
  pathname,
}: {
  group: NavGroup
  pathname: string
}) {
  let [sections, visibleSections] = useInitialValue(
    [
      useSectionStore((s) => s.sections),
      useSectionStore((s) => s.visibleSections),
    ],
    useIsInsideMobileNavigation(),
  )

  let itemHeight = remToPx(2)
  let offset = remToPx(0.25)
  
  // Filter links the same way they're filtered in render
  let filteredLinks = group.links.filter(
    (link) => !(link.title === 'Overview' && link.href.includes('/work/overview'))
  )
  
  let activePageIndex = filteredLinks.findIndex((link) => link.href === pathname)
  
  if (activePageIndex === -1) return null
  
  let height = remToPx(1.5) // Fixed height for the green bar - it's a pinpoint indicator
  
  // If hideChildren is true, only show green bar at the page link itself
  if (group.hideChildren) {
    let top = offset + activePageIndex * itemHeight
    return (
      <motion.div
        layout
        className="absolute left-2 w-px bg-emerald-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.2 } }}
        exit={{ opacity: 0 }}
        style={{ top, height }}
      />
    )
  }
  
  // The green bar shows the PRIMARY section (closest to center-bottom of viewport)
  // This is the first visible section in the array (prioritized by the SectionProvider)
  let primarySectionId = visibleSections.find(id => 
    id === '_top' || sections.some(section => section.id === id)
  )
  
  // If no sections from the current page are visible, show green bar at the page link itself
  if (!primarySectionId) {
    let top = offset + activePageIndex * itemHeight
    return (
      <motion.div
        layout
        className="absolute left-2 w-px bg-emerald-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.2 } }}
        exit={{ opacity: 0 }}
        style={{ top, height }}
      />
    )
  }
  
  let allSections = [{ id: '_top' }, ...sections]
  let primarySectionIndex = allSections.findIndex(
    (section) => section.id === primarySectionId
  )
  
  if (primarySectionIndex === -1) primarySectionIndex = 0
  
  // Position the green bar at the primary section
  let sectionOffset = primarySectionIndex * itemHeight
  let top = offset + activePageIndex * itemHeight + sectionOffset

  return (
    <motion.div
      layout
      className="absolute left-2 w-px bg-emerald-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      style={{ top, height }}
    />
  )
}

function NavigationGroup({
  group,
  className,
}: {
  group: NavGroup
  className?: string
}) {
  // If this is the mobile navigation then we always render the initial
  // state, so that the state does not change during the close animation.
  // The state will still update when we re-open (re-render) the navigation.
  let isInsideMobileNavigation = useIsInsideMobileNavigation()
  let [pathname, sections] = useInitialValue(
    [usePathname(), useSectionStore((s) => s.sections)],
    isInsideMobileNavigation,
  )
  
  // State for showing arrow on first case study when Timeline is visible (home page only)
  let [shouldShowFirstCaseStudyArrow, setShouldShowFirstCaseStudyArrow] = useState(false)

  let isActiveGroup =
    group.links.findIndex((link) => link.href === pathname) !== -1
  
  // Check if we're on the home page and the Work group
  const isHomePage = pathname === '/'
  const isWorkGroup = group.title === 'Work'
  
  // Detect when Timeline section is visible on home page, with delay before showing arrow
  useEffect(() => {
    if (!isHomePage || !isWorkGroup) {
      setShouldShowFirstCaseStudyArrow(false)
      return
    }
    
    let arrowDelayTimeout: NodeJS.Timeout | null = null
    let isTimelineVisible = false
    
    // Small delay to ensure DOM is ready after hydration
    const initTimeout = setTimeout(() => {
      // Find the Timeline section by data attribute (more reliable than heading ID)
      const timelineSection = document.querySelector('[data-timeline-section]')
      if (!timelineSection) {
        return
      }
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isTimelineVisible = entry.isIntersecting
            
            if (entry.isIntersecting) {
              // Wait 12 seconds before showing the arrow
              if (!arrowDelayTimeout) {
                arrowDelayTimeout = setTimeout(() => {
                  if (isTimelineVisible) {
                    setShouldShowFirstCaseStudyArrow(true)
                  }
                }, 12000)
              }
            } else {
              // Clear the timeout and hide arrow when scrolling away
              if (arrowDelayTimeout) {
                clearTimeout(arrowDelayTimeout)
                arrowDelayTimeout = null
              }
              setShouldShowFirstCaseStudyArrow(false)
            }
          })
        },
        {
          rootMargin: '0px 0px -20% 0px',
          threshold: 0.1,
        }
      )
      
      observer.observe(timelineSection)
      
      // Store observer for cleanup
      ;(window as unknown as { __timelineObserver?: IntersectionObserver }).__timelineObserver = observer
    }, 200)
    
    return () => {
      clearTimeout(initTimeout)
      if (arrowDelayTimeout) {
        clearTimeout(arrowDelayTimeout)
      }
      const observer = (window as unknown as { __timelineObserver?: IntersectionObserver }).__timelineObserver
      if (observer) {
        observer.disconnect()
      }
    }
  }, [isHomePage, isWorkGroup])

  return (
    <li className={clsx('relative mt-6', className)}>
      <motion.h2
        layout="position"
        className="text-xs font-semibold text-zinc-900 dark:text-white"
      >
        {group.title}
      </motion.h2>
      {/* Render Overview button separately outside the list container */}
      {group.links
        .filter((link) => link.title === 'Overview' && link.href.includes('/work/overview'))
        .map((link) => (
          <div key={link.href} className="mt-3 mb-2">
            <NavLink href={link.href} active={link.href === pathname}>
              {link.title}
            </NavLink>
          </div>
        ))}
      <div className="relative mt-3 pl-2">
        <AnimatePresence initial={!isInsideMobileNavigation}>
          {isActiveGroup && (
            <VisibleSectionHighlight group={group} pathname={pathname} />
          )}
        </AnimatePresence>
        <motion.div
          layout
          className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"
        />
        <AnimatePresence initial={false}>
          {isActiveGroup && (
            <ActivePageMarker group={group} pathname={pathname} />
          )}
        </AnimatePresence>
        {(() => {
          const filteredLinks = group.links.filter(
            (link) => !(link.title === 'Overview' && link.href.includes('/work/overview'))
          )
          const activeLinks = filteredLinks.filter((link) => !link.disabled)
          const comingSoonLinks = filteredLinks.filter((link) => link.disabled)
          
          return (
            <>
              <ul role="list" className="border-l border-transparent">
                {activeLinks.map((link, linkIndex) => {
                  // Check if this is the first case study (Mortgage Platform / Breeze)
                  // and we should show the arrow because Timeline is visible on home page
                  let isFirstCaseStudy = linkIndex === 0 && link.href.includes('/case-studies/')
                  let showArrowForFirstCaseStudy = isFirstCaseStudy && shouldShowFirstCaseStudyArrow && !link.disabled
                  
                  return (
                    <motion.li key={link.href} layout="position" className="relative">
                      <NavLink 
                        href={link.href} 
                        active={link.href === pathname}
                        shouldPulse={showArrowForFirstCaseStudy}
                        badge={link.badge}
                        disabled={link.disabled}
                      >
                        {link.title}
                      </NavLink>
                    {!group.hideChildren && (
                    <AnimatePresence mode="popLayout" initial={false}>
                      {link.href === pathname && sections.length > 0 && (
                        <motion.ul
                          role="list"
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: 1,
                            transition: { delay: 0.1 },
                          }}
                          exit={{
                            opacity: 0,
                            transition: { duration: 0.15 },
                          }}
                        >
                          {sections.map((section) => (
                            <li key={section.id}>
                              <NavLink
                                href={`${link.href}#${section.id}`}
                                tag={section.tag}
                                isAnchorLink
                              >
                                {section.title}
                              </NavLink>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                    )}
                    </motion.li>
                  )
                })}
              </ul>
              {comingSoonLinks.length > 0 && (
                <>
                  <h3 className="mt-4 mb-2 pl-4 text-[10px] font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
                    Coming soon
                  </h3>
                  <ul role="list" className="border-l border-transparent">
                    {comingSoonLinks.map((link) => (
                      <motion.li key={link.href} layout="position" className="relative">
                        <NavLink 
                          href={link.href} 
                          active={false}
                          disabled={link.disabled}
                        >
                          {link.title}
                        </NavLink>
                      </motion.li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )
        })()}
      </div>
    </li>
  )
}

export const navigation: Array<NavGroup> = [
  {
    title: 'About Kyle McGraw',
    hideChildren: true,
    links: [
      { title: 'About', href: '/' },
      { title: 'Services', href: '/services' },
      { title: 'Process', href: '/process' },
    ],
  },
  {
    title: 'Work',
    links: [
      { title: 'Overview', href: '/work/overview' },
      ...getCaseStudiesForNavigation().map(study => ({
        title: study.descriptiveTitle,
        href: `/case-studies/${study.slug}`,
        badge: study.comingSoon ? 'coming-soon' as const : study.underConstruction ? 'under-construction' as const : undefined,
        disabled: study.comingSoon || study.underConstruction
      }))
    ],
  },
]

export function Navigation(props: React.ComponentPropsWithoutRef<'nav'>) {
  const { close } = useMobileNavigationStore()
  
  return (
    <nav {...props}>
      <ul role="list">
        <li className="md:hidden">
          <a
            href="https://www.linkedin.com/in/kyleryanmcgraw/"
            target="_blank"
            rel="noopener noreferrer"
            className="block py-1 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            aria-label="View Kyle McGraw's LinkedIn profile"
          >
            LinkedIn
          </a>
        </li>
        <li className="md:hidden">
          <a
            href="/Kyle_McGraw_Resume_UX_BA_WEBSAFE.docx"
            download
            className="block py-1 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            aria-label="Download Kyle McGraw's Resume"
          >
            Download CV
          </a>
        </li>
        {navigation.map((group, groupIndex) => (
          <NavigationGroup
            key={group.title}
            group={group}
            className={groupIndex === 0 ? 'md:mt-0' : ''}
          />
        ))}
        <li className="mt-6 md:hidden">
          <ContactDrawer>
            <Button
              className="w-full"
              onClick={close}
            >
              Contact
            </Button>
          </ContactDrawer>
        </li>
      </ul>
    </nav>
  )
}
