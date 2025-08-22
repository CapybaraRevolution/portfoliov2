import { 
  ChartBarIcon, 
  MagnifyingGlassIcon, 
  PaintBrushIcon, 
  DocumentTextIcon 
} from '@heroicons/react/24/outline'
import { NavigationChip } from '@/components/NavigationChip'
import { generateProcessUrl } from '@/data/skillProcessMap'

const services = [
  {
    id: 'strategic-product-planning',
    name: 'Strategic Product Planning',
    description: 'Product roadmaps and stakeholder alignment that translate business goals into actionable development plans.',
    href: generateProcessUrl('feature-prioritization'),
    portfolioHref: '/work/overview?tag=product-planning',
    icon: ChartBarIcon,
    skills: ['Product Vision', 'Roadmap', 'Prioritization', 'OKRs']
  },
  {
    id: 'user-research-strategy',
    name: 'User Research & Strategy',
    description: 'User insights through interviews and behavioral analysis that inform strategic product decisions.',
    href: generateProcessUrl('user-research'),
    portfolioHref: '/work/overview?tag=user-research',
    icon: MagnifyingGlassIcon,
    skills: ['User Research', 'Usability Testing', 'Product Analytics', 'Experimentation']
  },
  {
    id: 'design-prototyping',
    name: 'Design & Prototyping',
    description: 'Intuitive interfaces from wireframes to design systems that balance user needs with business goals.',
    href: generateProcessUrl('wireframing'),
    portfolioHref: '/work/overview?tag=design',
    icon: PaintBrushIcon,
    skills: ['Wireframing', 'Prototyping', 'Information Architecture', 'Usability Testing']
  },
  {
    id: 'requirements-analysis',
    name: 'Requirements Analysis',
    description: 'Technical requirements gathering that bridges stakeholder needs with development feasibility.',
    href: generateProcessUrl('information-architecture'),
    portfolioHref: '/work/overview?tag=business-analysis',
    icon: DocumentTextIcon,
    skills: ['PRDs (Specs)', 'System Design', 'APIs & Integrations', 'Stakeholder Alignment']
  }
]

export function SimplifiedServicesGrid() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-zinc-900 dark:text-white sm:text-5xl">
            Services I Provide
          </h2>
          <p className="mt-6 text-lg/8 text-zinc-600 dark:text-zinc-300">
            Comprehensive product development services that help companies create exceptional digital experiences. From strategic planning to detailed implementation, each service leverages proven methodologies.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {services.map((service) => (
              <div key={service.id} className="flex flex-col">
                <dt className="text-base/7 font-semibold text-zinc-900 dark:text-white">
                  <div className="mb-6 flex size-10 items-center justify-center rounded-lg bg-emerald-500">
                    <service.icon aria-hidden="true" className="size-6 text-white" />
                  </div>
                  {service.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base/7 text-zinc-600 dark:text-zinc-400">
                  <p className="flex-auto">{service.description}</p>
                  
                  {/* Skills chips */}
                  <div className="mt-6">
                    <div className="flex flex-wrap gap-2">
                      {service.skills.map((skill) => (
                        <NavigationChip
                          key={skill}
                          skill={skill}
                          size="sm"
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <p>
                      <a href={service.href} className="text-sm/6 font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300">
                        How this fits into my process <span aria-hidden="true">→</span>
                      </a>
                    </p>
                    <p>
                      <a href={service.portfolioHref} className="text-sm/6 font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                        See projects with this service <span aria-hidden="true">→</span>
                      </a>
                    </p>
                  </div>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}