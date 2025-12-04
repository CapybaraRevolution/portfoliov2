'use client'

import Image from 'next/image'
import { Marquee } from '@/components/ui/marquee'

// Import client logos
import jigsawLogo from '@/images/logos/Jixaw-Technologies_Logo.png'
import breezeLogo from '@/images/logos/Breeze-logo.png'
import bccfLogo from '@/images/logos/BCCF_Logo_Colour.png'
import socialFundLogo from '@/images/logos/Social-Finance-Fund_logo.png'
import paramountLogo from '@/images/logos/Paramount_Global_Logo 1.png'
import britewebLogo from '@/images/logos/logo-dark-horizontal 1.png'

export function VerticalLogoMarquee() {
  const clients = [
    { name: 'Jigsaw Technologies', logo: jigsawLogo },
    { name: 'Breeze Mortgage Hub', logo: breezeLogo },
    { name: 'BC Cancer Foundation', logo: bccfLogo },
    { name: 'Social Finance Fund', logo: socialFundLogo },
    { name: 'Paramount Global', logo: paramountLogo },
    { name: 'Briteweb', logo: britewebLogo },
  ]

  return (
    <div className="relative h-[400px] w-32 overflow-hidden rounded-lg border border-zinc-200/50 bg-zinc-50/50 dark:border-zinc-800/50 dark:bg-zinc-900/50">
      {/* Gradient fade at top and bottom */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-background to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-background to-transparent" />
      
      <Marquee vertical pauseOnHover className="h-full [--duration:25s]">
        {clients.map((client) => (
          <div
            key={client.name}
            className="flex h-32 w-28 shrink-0 items-center justify-center p-4"
            title={client.name}
          >
            <Image
              src={client.logo}
              alt={client.name}
              width={112}
              height={64}
              className="max-h-16 w-full object-contain grayscale transition-all duration-300 hover:grayscale-0"
            />
          </div>
        ))}
      </Marquee>
    </div>
  )
}

