import Image from 'next/image'

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
    <section className="py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h2 className="scroll-mt-24 mb-4" id="my-clients">My Clients</h2>
          <p className="lead mb-12">
            I've had the privilege of working with innovative companies across industries, 
            from early-stage startups to established enterprises.
          </p>
          
          <div className="mx-auto grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-3 sm:gap-x-10 lg:mx-0 lg:grid-cols-6">
            {clients.map((client) => (
              <div
                key={client.name}
                className="group col-span-1 flex items-center justify-center"
                title={client.name}
              >
                <div className="relative">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={120}
                    height={60}
                    className="max-h-12 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
                  />
                </div>
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
              Let's work together →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
