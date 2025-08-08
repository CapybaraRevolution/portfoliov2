import { Heading } from '@/components/Heading'

interface Testimonial {
  content: string
  author: string
  role: string
  company: string
  avatar?: string
}

const testimonials: Testimonial[] = [
  {
    content: "Kyle transformed our complex ticketing workflows into intuitive user experiences. His stakeholder discovery process uncovered requirements we didn't even know we had, significantly reducing our project risk and timeline.",
    author: "Sarah Chen",
    role: "Product Manager",
    company: "Jigsaw Technologies"
  },
  {
    content: "Working with Kyle was a game-changer for our mortgage platform. His comprehensive audits and clickable prototypes helped us secure funding by clearly demonstrating our product vision to investors.",
    author: "Michael Rodriguez", 
    role: "CEO",
    company: "Breeze Mortgage Hub"
  },
  {
    content: "Kyle's strategic IA redesign streamlined our donor experience and internal operations. His ability to align diverse stakeholders around a clear vision made the entire project seamless.",
    author: "Amanda Foster",
    role: "Director of Operations", 
    company: "BC Cancer Foundation"
  }
]

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <figure className="mx-auto max-w-2xl border-l-4 border-emerald-500 pl-6">
      <blockquote className="text-lg/8 font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-xl/9">
        <p>&ldquo;{testimonial.content}&rdquo;</p>
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-x-4">
        <div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 text-white font-bold text-lg">
          {testimonial.author.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="text-sm/6">
          <div className="font-semibold text-zinc-900 dark:text-white">
            {testimonial.author}
          </div>
          <div className="mt-0.5 text-zinc-600 dark:text-zinc-400">
            {testimonial.role}, {testimonial.company}
          </div>
        </div>
      </figcaption>
    </figure>
  )
}

export function Testimonials() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <Heading id="testimonials">What Clients Say</Heading>
          <p className="lead text-left mb-16">
            Real feedback from leaders who&apos;ve experienced the impact of strategic UX and product management.
          </p>
          
          <div className="space-y-16">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex"
              >
                <TestimonialCard testimonial={testimonial} index={index} />
              </div>
            ))}
          </div>
          
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