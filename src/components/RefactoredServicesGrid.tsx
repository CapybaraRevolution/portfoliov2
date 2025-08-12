import { RefactoredServiceCard } from './RefactoredServiceCard'
import { services } from '@/data/services'

export function RefactoredServicesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
      {services.map((service) => (
        <div key={service.id} id={service.id}>
          <RefactoredServiceCard service={service} />
        </div>
      ))}
    </div>
  )
}