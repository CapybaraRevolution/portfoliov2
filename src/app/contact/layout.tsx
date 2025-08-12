import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work With Me - Kyle McGraw',
  description: 'Available immediately for product strategy, UX design, and business analysis projects. Let\'s discuss your next challenge.',
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}