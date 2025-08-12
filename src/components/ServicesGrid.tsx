import { RefactoredServiceCard as ServiceCard } from './RefactoredServiceCard'
import { services } from '@/data/services'

interface NavigationChipProps {
  label: string
  href: string
}

function NavigationChip({ label, href }: NavigationChipProps) {
  return (
    <a
      href={href}
      className="inline-flex items-center bg-zinc-800/50 text-white/80 rounded-full px-4 py-2 text-sm font-medium hover:bg-zinc-700/50 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
    >
      {label}
    </a>
  )
}

export function ServicesGrid() {
  const navigationChips = [
    { label: 'Product Owner', href: '#strategic-product-planning' },
    { label: 'UX Design', href: '#design-prototyping' },
    { label: 'Business Analysis', href: '#requirements-analysis' }
  ]

  return (
    <div className="space-y-8">
      {/* Navigation chips row */}
      <div className="flex flex-wrap gap-3 justify-center">
        {navigationChips.map((chip) => (
          <NavigationChip key={chip.label} label={chip.label} href={chip.href} />
        ))}
      </div>

      {/* Services grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {services.map((service) => (
          <div key={service.id} id={service.id}>
            <ServiceCard service={service} />
          </div>
        ))}
      </div>
    </div>
  )
}