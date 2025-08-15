import { RefactoredServiceCard as ServiceCard } from './RefactoredServiceCard'
import { NavigationChip } from '@/components/NavigationChip'
import { services } from '@/data/services'

export function ServicesGrid() {
  const navigationChips = [
    'Product Manager',
    'UX Design', 
    'Business Analysis'
  ]

  return (
    <div className="space-y-8">
      {/* Navigation chips row */}
      <div className="flex flex-wrap gap-3 justify-center">
        {navigationChips.map((skill) => (
          <NavigationChip key={skill} skill={skill} size="sm" />
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