import { Chip } from '@/components/ui/Chip'
import SafeToolIcon from '@/components/SafeToolIcon'
import { type ToolConfig } from '@/lib/toolsConfig'

interface ToolChipProps {
  tool: ToolConfig
  onClick?: () => void
}

export function ToolChip({ tool, onClick }: ToolChipProps) {
  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      console.log(`Navigate to content for ${tool.label}`)
    }
  }

  const icon = (
    <div className="w-4 h-4 relative flex items-center justify-center">
      <SafeToolIcon 
        slug={tool.slug}
        size={16}
        alt={tool.a11yAlt}
      />
    </div>
  )

  return (
    <Chip
      variant="outline"
      size="sm"
      as="button"
      onClick={handleClick}
      icon={icon}
    >
      {tool.label}
    </Chip>
  )
}