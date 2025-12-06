'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Heading } from '@/components/Heading'
import { Marquee } from '@/components/ui/marquee'
import { ContactDrawer } from '@/components/ContactDrawer'
import { Button } from '@/components/Button'

// Import client logos
import jigsawLogo from '@/images/logos/Jixaw-Technologies_Logo.png'
import bccfLogo from '@/images/logos/BCCF_Logo_Colour.png'
import socialFundLogo from '@/images/logos/Social-Finance-Fund_logo.png'
import paramountLogo from '@/images/logos/Paramount_Global_Logo 1.png'
import britewebLogo from '@/images/logos/logo-dark-horizontal 1.png'
import cornellLogo from '@/images/logos/CornellUniversity.png'
import publicTheatreLogo from '@/images/logos/PublicTheatre.png'
import oldSkoolLogo from '@/images/logos/OldSkoolStudios.png'
import houstonBalletLogo from '@/images/logos/HoustonBallet.svg'

export function HorizontalLogoMarquee() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === 'dark'

  // Add your client logos here!
  // To add a new logo:
  // 1. Add the logo file to src/images/logos/
  // 2. Import it at the top: import newLogo from '@/images/logos/your-logo.png'
  // 3. Add it to the clients array below with: { name: 'Company Name', logo: newLogo }
  // Logos that should remain light on hover in dark mode
  const logosThatStayLight = ['Public Theatre', 'Old Skool Studios', 'Houston Ballet']

  const allClients = [
    { name: 'Jigsaw Technologies', logo: jigsawLogo },
    { name: 'BC Cancer Foundation', logo: bccfLogo },
    { name: 'Social Finance Fund', logo: socialFundLogo },
    { name: 'Paramount Global', logo: paramountLogo },
    { name: 'Briteweb', logo: britewebLogo },
    { name: 'Cornell University', logo: cornellLogo },
    { name: 'Public Theatre', logo: publicTheatreLogo },
    { name: 'Old Skool Studios', logo: oldSkoolLogo },
    { name: 'Houston Ballet', logo: houstonBalletLogo },
  ]

  // Split clients into two rows going opposite directions
  // With 9 unique logos, split them 5 and 4
  const row1Clients = allClients.slice(0, 5)
  const row2Clients = allClients.slice(5)

  return (
    <section className="mt-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <Heading id="my-clients">My Clients</Heading>
          <p className="lead mb-12">
            I&apos;ve had the privilege of working with innovative companies across industries, 
            from early-stage startups to established enterprises.
          </p>
          
          <div className="relative overflow-hidden rounded-2xl border border-zinc-200/50 bg-zinc-50/50 dark:border-zinc-800/50 dark:bg-zinc-900/50 py-8">
            {/* Gradient fade at left and right */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
            
            {/* First row - scrolling left to right */}
            <Marquee pauseOnHover className="[--duration:30s] mb-4">
              {row1Clients.map((client) => {
                const shouldStayLight = logosThatStayLight.includes(client.name)
                return (
                  <div
                    key={`row1-${client.name}`}
                    className="group flex h-20 w-40 shrink-0 items-center justify-center px-6"
                    title={client.name}
                  >
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={160}
                      height={64}
                      className={cn(
                        "max-h-16 w-full object-contain transition-all duration-300 group-hover:scale-105",
                        // In light mode: use brightness/contrast to make white logos visible
                        // Lower brightness darkens white logos, higher contrast makes them stand out
                        !isDark && "grayscale brightness-[0.3] contrast-150 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100 group-hover:drop-shadow-none",
                        // In dark mode: revert to original styling for most logos
                        // For logos that should stay light on hover, use invert approach
                        isDark && !shouldStayLight && "grayscale opacity-80 brightness-110 group-hover:grayscale-0 group-hover:opacity-100 group-hover:brightness-100",
                        isDark && shouldStayLight && "grayscale brightness-0 invert opacity-70 group-hover:grayscale-0"
                      )}
                    />
                  </div>
                )
              })}
            </Marquee>
            
            {/* Second row - scrolling right to left (reverse) */}
            <Marquee pauseOnHover reverse className="[--duration:35s]">
              {row2Clients.map((client) => {
                const shouldStayLight = logosThatStayLight.includes(client.name)
                return (
                  <div
                    key={`row2-${client.name}`}
                    className="group flex h-20 w-40 shrink-0 items-center justify-center px-6"
                    title={client.name}
                  >
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={160}
                      height={64}
                      className={cn(
                        "max-h-16 w-full object-contain transition-all duration-300 group-hover:scale-105",
                        // In light mode: use brightness/contrast to make white logos visible
                        // Lower brightness darkens white logos, higher contrast makes them stand out
                        !isDark && "grayscale brightness-[0.3] contrast-150 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100 group-hover:drop-shadow-none",
                        // In dark mode: revert to original styling for most logos
                        // For logos that should stay light on hover, use invert approach
                        isDark && !shouldStayLight && "grayscale opacity-80 brightness-110 group-hover:grayscale-0 group-hover:opacity-100 group-hover:brightness-100",
                        isDark && shouldStayLight && "grayscale brightness-0 invert opacity-70 group-hover:grayscale-0"
                      )}
                    />
                  </div>
                )
              })}
            </Marquee>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
              Ready to add your company to this list?
            </p>
            <ContactDrawer>
              <Button variant="text" arrow="right">
                Let&apos;s work together
              </Button>
            </ContactDrawer>
          </div>
        </div>
      </div>
    </section>
  )
}

