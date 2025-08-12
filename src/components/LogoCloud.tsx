import Image from 'next/image'
import { Heading } from '@/components/Heading'

// Import client logos
import jigsawLogo from '@/images/logos/Jixaw-Technologies_Logo.png'
import breezeLogo from '@/images/logos/Breeze-logo.png'
import bccfLogo from '@/images/logos/BCCF_Logo_Colour.png'
import socialFundLogo from '@/images/logos/Social-Finance-Fund_logo.png'
import paramountLogo from '@/images/logos/Paramount_Global_Logo 1.png'
import britewebLogo from '@/images/logos/logo-dark-horizontal 1.png'

export function LogoCloud() {
  const clients = [
    { name: 'Jigsaw Technologies', logo: jigsawLogo },
    { name: 'Breeze Mortgage Hub', logo: breezeLogo },
    { name: 'BC Cancer Foundation', logo: bccfLogo },
    { name: 'Social Finance Fund', logo: socialFundLogo },
    { name: 'Paramount Global', logo: paramountLogo },
    { name: 'Briteweb', logo: britewebLogo },
  ]

  return (
    <section className="mt-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <Heading id="my-clients">My Clients</Heading>
          <p className="lead mb-12">
            I&apos;ve had the privilege of working with innovative companies across industries, 
            from early-stage startups to established enterprises.
          </p>
          
          <div className="-mx-6 grid grid-cols-2 gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl md:grid-cols-3">
            {clients.map((client) => (
              <div
                key={client.name}
                className="group bg-white/5 p-8 sm:p-10 dark:bg-white/10 transition-all duration-300 hover:bg-white/10 dark:hover:bg-white/15"
                title={client.name}
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={158}
                  height={64}
                  className="max-h-16 w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
                />
              </div>
            ))}
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
