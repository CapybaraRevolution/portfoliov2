'use client'

import Image from 'next/image'
import { Heading } from '@/components/Heading'
import { Marquee } from '@/components/ui/marquee'

// Import client logos
import jigsawLogo from '@/images/logos/Jixaw-Technologies_Logo.png'
import breezeLogo from '@/images/logos/Breeze-logo.png'
import bccfLogo from '@/images/logos/BCCF_Logo_Colour.png'
import socialFundLogo from '@/images/logos/Social-Finance-Fund_logo.png'
import paramountLogo from '@/images/logos/Paramount_Global_Logo 1.png'
import britewebLogo from '@/images/logos/logo-dark-horizontal 1.png'
import cornellLogo from '@/images/logos/CornellUniversity.png'
import publicTheatreLogo from '@/images/logos/PublicTheatre.png'
import oldSkoolLogo from '@/images/logos/OldSkoolStudios.png'
import houstonBalletLogo from '@/images/logos/HoustonBallet.svg'

export function HorizontalLogoMarquee() {
  // Add your client logos here!
  // To add a new logo:
  // 1. Add the logo file to src/images/logos/
  // 2. Import it at the top: import newLogo from '@/images/logos/your-logo.png'
  // 3. Add it to the clients array below with: { name: 'Company Name', logo: newLogo }
  const allClients = [
    { name: 'Jigsaw Technologies', logo: jigsawLogo },
    { name: 'Breeze Mortgage Hub', logo: breezeLogo },
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
  // With 10 unique logos, we can split them evenly
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
          
          <div className="relative overflow-hidden rounded-2xl border border-zinc-200/50 bg-gradient-to-br from-zinc-100 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 py-8 backdrop-blur-sm">
            {/* Gradient fade at left and right */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
            
            {/* First row - scrolling left to right */}
            <Marquee pauseOnHover className="[--duration:30s] mb-4">
              {row1Clients.map((client) => (
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
                    className="max-h-16 w-full object-contain transition-all duration-300 group-hover:scale-105 dark:brightness-0 dark:invert group-hover:brightness-100 group-hover:invert-0"
                  />
                </div>
              ))}
            </Marquee>
            
            {/* Second row - scrolling right to left (reverse) */}
            <Marquee pauseOnHover reverse className="[--duration:35s]">
              {row2Clients.map((client) => (
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
                    className="max-h-16 w-full object-contain transition-all duration-300 group-hover:scale-105 dark:brightness-0 dark:invert group-hover:brightness-100 group-hover:invert-0"
                  />
                </div>
              ))}
            </Marquee>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
              Ready to add your company to this list?
            </p>
            <a 
              href="/contact" 
              className="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition text-emerald-500 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-500"
            >
              Let&apos;s work together →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

