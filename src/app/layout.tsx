import glob from 'fast-glob'
import { type Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { AdminProvider } from '@/contexts/AdminContext'
import { type Section } from '@/components/SectionProvider'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://kylemcgraw.io'),
  title: {
    template: '%s - Kyle McGraw',
    default: 'Kyle McGraw - Product Manager & UX Designer',
  },
  description: 'Proven methodology, flexible to your goals. Five phases that turn insight into measurable outcomes.',
  openGraph: {
    title: 'Kyle McGraw - Product Manager & UX Designer',
    description: 'Proven methodology, flexible to your goals. Five phases that turn insight into measurable outcomes.',
    url: 'https://kylemcgraw.io',
    siteName: 'Kyle McGraw',
    images: [
      {
        url: '/images/kyle-mcgraw.jpg',
        width: 1200,
        height: 630,
        alt: 'Kyle McGraw - Product Manager & UX Designer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kyle McGraw - Product Manager & UX Designer',
    description: 'Proven methodology, flexible to your goals. Five phases that turn insight into measurable outcomes.',
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
        const module = await import(`./${filename}`)
        return [
          '/' + filename.replace(/(^|\/)page\.mdx$/, ''),
          module.sections || [],
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
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="flex min-h-full bg-white antialiased dark:bg-zinc-900">
        <Providers>
          <AdminProvider>
            <div className="w-full">
              <Layout allSections={allSections}>{children}</Layout>
            </div>
          </AdminProvider>
        </Providers>
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
