'use client'

import { Heading } from '@/components/Heading'
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials'

// Generate avatar URLs using UI Avatars service
const getAvatarUrl = (name: string, company: string) => {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
  // Using UI Avatars API with emerald color scheme
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=10b981&color=fff&size=500&bold=true`
}

const testimonials = [
  {
    quote: "Kyle transformed our complex ticketing workflows into intuitive user experiences. His stakeholder discovery process uncovered requirements we didn't even know we had, significantly reducing our project risk and timeline.",
    name: "Susan Hayes",
    designation: "Product Manager, Jixaw Technologies",
    src: getAvatarUrl("Susan Hayes", "Jixaw Technologies"),
  },
  {
    quote: "Working with Kyle was a game-changer for our mortgage platform. His strategic thinking and clickable prototypes helped us align on features early; clearly demonstrating our product vision to investors.",
    name: "Cody Graham",
    designation: "CEO, Breeze Mortgage Hub",
    src: getAvatarUrl("Cody Graham", "Breeze Mortgage Hub"),
  },
  {
    quote: "Kyle's workshops helped us align on our product vision and roadmap. His ability to distill complex ideas into simple concepts helped us make decisions faster.",
    name: "Sagar Jani",
    designation: "Director of Digital, BC Cancer Foundation",
    src: getAvatarUrl("Sagar Jani", "BC Cancer Foundation"),
  },
]

export function AnimatedTestimonialsWrapper() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <Heading id="testimonials">What Clients Say</Heading>
          <p className="lead text-left mb-16">
            Real feedback from leaders who&apos;ve experienced the impact of strategic UX and product management.
          </p>
          
          <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
          
          <div className="text-center mt-16">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
              Ready to create your success story?
            </p>
            <a 
              href="/contact" 
              className="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition text-emerald-500 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-500"
            >
              Start your project →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

