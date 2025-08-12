import { ReactNode } from 'react'

interface CardWithHeaderAndFooterProps {
  header: ReactNode
  children: ReactNode
  footer?: ReactNode
}

export function CardWithHeaderAndFooter({ header, children, footer }: CardWithHeaderAndFooterProps) {
  return (
    <div className="divide-y divide-white/10 overflow-hidden rounded-lg bg-gray-800/50 outline -outline-offset-1 outline-white/10">
      <div className="px-4 py-5 sm:px-6">
        {header}
        {/* We use less vertical padding on card headers on desktop than on body sections */}
      </div>
      <div className="px-4 py-5 sm:p-6">
        {children}
      </div>
      {footer && (
        <div className="px-4 py-4 sm:px-6">
          {footer}
          {/* We use less vertical padding on card footers at all sizes than on headers or body sections */}
        </div>
      )}
    </div>
  )
}