import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services - Kyle McGraw',
  description: 'Turn unclear requirements into a clear, testable plan. Product strategy, UX, and rapid prototyping for founders and heads of product.',
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

