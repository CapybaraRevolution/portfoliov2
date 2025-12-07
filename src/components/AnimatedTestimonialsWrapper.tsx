'use client'

import { Heading } from '@/components/Heading'
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials'
import { ContactDrawer } from '@/components/ContactDrawer'
import { Button } from '@/components/Button'
import { testimonials } from '@/data/testimonials'

export function AnimatedTestimonialsWrapper() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <Heading id="testimonials" label="Testimonials">What Clients Say</Heading>
          <p className="lead text-left mb-16">
            Real feedback from leaders who&apos;ve experienced the impact of strategic UX and product management.
          </p>
          
          <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
          
          <div className="text-center mt-16">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
              Ready to create your success story?
            </p>
            <ContactDrawer>
              <Button variant="text" arrow="right">
                Start your project
              </Button>
            </ContactDrawer>
          </div>
        </div>
      </div>
    </section>
  )
}

