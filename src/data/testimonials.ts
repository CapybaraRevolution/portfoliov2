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

export type Testimonial = {
  quote: string
  name: string
  designation: string
  src: string
}

export const testimonials: Testimonial[] = [
  {
    quote: "Kyle transformed our complex ticketing workflows into intuitive user experiences. His stakeholder discovery process uncovered requirements we didn't even know we had, significantly reducing our project risk and timeline.",
    name: "Susan Hayes",
    designation: "Director of Professional Services, Jixaw Technologies",
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






