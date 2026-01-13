import glob from 'fast-glob'
import { type Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { Hotjar } from '@/components/Hotjar'
import { AdminProvider } from '@/contexts/AdminContext'
import { type Section } from '@/components/SectionProvider'

import '@/styles/tailwind.css'

export const viewport = {
  themeColor: 'white',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://kylemcgraw.io'),
  title: {
    template: '%s - Kyle McGraw',
    default: 'Kyle McGraw - Business Analyst & UX Designer',
  },
  description: 'Hybrid UX Designer and Business Analyst turning messy problem spaces into clear, testable ideas. Fewer handoffs, faster alignment, designs grounded in real requirements.',
  openGraph: {
    title: 'Kyle McGraw - Business Analyst & UX Designer',
    description: 'Hybrid UX Designer and Business Analyst turning messy problem spaces into clear, testable ideas. Fewer handoffs, faster alignment, designs grounded in real requirements.',
    url: 'https://kylemcgraw.io',
    siteName: 'Kyle McGraw',
    images: [
      {
        url: '/images/kyle-mcgraw.jpg',
        width: 1200,
        height: 630,
        alt: 'Kyle McGraw - Business Analyst & UX Designer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kyle McGraw - Business Analyst & UX Designer',
    description: 'Hybrid UX Designer and Business Analyst turning messy problem spaces into clear, testable ideas. Fewer handoffs, faster alignment, designs grounded in real requirements.',
    images: ['/images/kyle-mcgraw.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let pages = await glob('**/*.mdx', { cwd: 'src/app' })
  let allSectionsEntries = (await Promise.all(
    pages.map(async (filename) => {
      try {
        const pageModule = await import(`./${filename}`)
        return [
          '/' + filename.replace(/(^|\/)page\.mdx$/, ''),
          pageModule.sections || [],
        ]
      } catch (error) {
        console.warn(`Failed to import sections from ${filename}:`, error)
        return [
          '/' + filename.replace(/(^|\/)page\.mdx$/, ''),
          [],
        ]
      }
    }),
  )) as Array<[string, Array<Section>]>
  let allSections = Object.fromEntries(allSectionsEntries)

  return (
    <html lang="en" className="h-full overflow-x-hidden" suppressHydrationWarning>
      <body className="flex min-h-full bg-white antialiased dark:bg-zinc-900 overflow-x-hidden">
        <Providers>
          <AdminProvider>
            <div className="w-full">
              <Layout allSections={allSections}>{children}</Layout>
            </div>
          </AdminProvider>
        </Providers>
        <Analytics />
        <GoogleAnalytics />
        <Hotjar />
      </body>
    </html>
  )
}
