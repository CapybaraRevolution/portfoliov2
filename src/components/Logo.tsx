export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg 
      {...props}
      viewBox="0 0 240 60" 
      xmlns="http://www.w3.org/2000/svg"
      className={props.className || ''}
      aria-label="Kyle McGraw - Product Management & Strategy"
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#10b981' }} />
          <stop offset="100%" style={{ stopColor: '#3b82f6' }} />
        </linearGradient>
      </defs>
      
      {/* Kyle McGraw text */}
      <text 
        x="20" 
        y="25" 
        fontFamily="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif" 
        fontSize="20" 
        fontWeight="700" 
        fill="currentColor"
      >
        Kyle McGraw
      </text>
      
      {/* Subtitle/tagline */}
      <text 
        x="20" 
        y="42" 
        fontFamily="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif" 
        fontSize="12" 
        fontWeight="400" 
        fill="currentColor" 
        opacity="0.7"
      >
        Product Management & Strategy
      </text>
      
      {/* Decorative element */}
      <circle cx="200" cy="20" r="8" fill="url(#logo-gradient)" opacity="0.8" />
      <circle cx="215" cy="25" r="6" fill="url(#logo-gradient)" opacity="0.6" />
      <circle cx="225" cy="35" r="4" fill="url(#logo-gradient)" opacity="0.4" />
    </svg>
  )
}
