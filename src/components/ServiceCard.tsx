import { CardWithHeaderAndFooter } from './CardWithHeaderAndFooter'
import { SimpleDivider } from './SimpleDivider'
import { type Service } from '@/data/services'

interface ServiceCardProps {
  service: Service
}

interface ToolChipProps {
  name: string
  logo: string
}

function ToolChip({ name, logo }: ToolChipProps) {
  return (
    <div className="inline-flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5 text-sm text-white/90">
      {/* Logo placeholder - Kyle will provide actual logos */}
      <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center text-xs">
        {name.charAt(0)}
      </div>
      {name}
    </div>
  )
}

interface SkillChipProps {
  label: string
  href: string
}

function SkillChip({ label, href }: SkillChipProps) {
  return (
    <a 
      href={href}
      className="inline-flex items-center bg-emerald-400/10 text-emerald-400 rounded-full px-3 py-1.5 text-sm font-medium hover:bg-emerald-400/20 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
    >
      {label}
    </a>
  )
}

export function ServiceCard({ service }: ServiceCardProps) {
  const header = (
    <h3 className="text-lg font-semibold text-white">
      {service.title}
    </h3>
  )

  const bodyItems = [
    {
      id: 'description',
      content: (
        <div>
          <h4 className="text-sm font-medium text-white/90 mb-2">What it is</h4>
          <p className="text-sm text-white/70 leading-relaxed">
            {service.blurb}
          </p>
        </div>
      )
    },
    {
      id: 'tools',
      content: (
        <div>
          <h4 className="text-sm font-medium text-white/90 mb-3">Tools I use</h4>
          <div className="flex flex-wrap gap-2">
            {service.toolSlugs.map((toolSlug) => (
              <ToolChip key={toolSlug} name={toolSlug} logo={toolSlug} />
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'skills',
      content: (
        <div>
          <h4 className="text-sm font-medium text-white/90 mb-3">Related skills</h4>
          <div className="flex flex-wrap gap-2">
            {service.relatedSkills.map((skill) => (
              <SkillChip key={skill.label} label={skill.label} href={skill.href} />
            ))}
          </div>
        </div>
      )
    }
  ]

  const footer = (
    <div className="flex flex-col sm:flex-row gap-3">
      <a
        href={service.processLink}
        className="inline-flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
      >
        How this fits into my process →
      </a>
      <a
        href={service.portfolioLink}
        className="inline-flex items-center text-sm font-medium text-white/70 hover:text-white transition-colors"
      >
        See projects with this service →
      </a>
    </div>
  )

  return (
    <CardWithHeaderAndFooter 
      header={header} 
      footer={footer}
    >
      <SimpleDivider items={bodyItems} />
    </CardWithHeaderAndFooter>
  )
}