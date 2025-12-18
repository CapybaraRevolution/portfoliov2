'use client'

import dynamic from 'next/dynamic'

// Dynamically import the prototype to avoid SSR issues with react-qr-code
const PhoneMock = dynamic(
  () => import('./PhoneMock'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-[844px]">
        <div className="text-zinc-500 dark:text-zinc-400">Loading prototype...</div>
      </div>
    )
  }
)

interface PrototypeEmbedProps {
  className?: string
}

export default function PrototypeEmbed({ className = '' }: PrototypeEmbedProps) {
  return (
    <div className={`flex justify-center ${className}`}>
      <PhoneMock className="p-4" />
    </div>
  )
}









