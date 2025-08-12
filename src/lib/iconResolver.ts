import { DocumentIcon } from '@/components/icons/DocumentIcon'
import { SquaresPlusIcon } from '@/components/icons/SquaresPlusIcon'
import { CogIcon } from '@/components/icons/CogIcon'
import { ChartBarIcon } from '@/components/icons/ChartBarIcon'
import { MagnifyingGlassIcon } from '@/components/icons/MagnifyingGlassIcon'
import { LinkIcon } from '@/components/icons/LinkIcon'
import { BoltIcon } from '@/components/icons/BoltIcon'
import { BookIcon } from '@/components/icons/BookIcon'
import { FlaskIcon } from '@/components/icons/FlaskIcon'
import { ChatBubbleIcon } from '@/components/icons/ChatBubbleIcon'
import { PackageIcon } from '@/components/icons/PackageIcon'
import { FolderIcon } from '@/components/icons/FolderIcon'

const iconMap = {
  'DocumentIcon': DocumentIcon,
  'SquaresPlusIcon': SquaresPlusIcon,
  'CogIcon': CogIcon,
  'ChartBarIcon': ChartBarIcon,
  'MagnifyingGlassIcon': MagnifyingGlassIcon,
  'LinkIcon': LinkIcon,
  'BoltIcon': BoltIcon,
  'BookIcon': BookIcon,
  'FlaskIcon': FlaskIcon,
  'ChatBubbleIcon': ChatBubbleIcon,
  'PackageIcon': PackageIcon,
  'FolderIcon': FolderIcon,
} as const

export function getIcon(iconName: string): React.ComponentType<{ className?: string }> {
  return iconMap[iconName as keyof typeof iconMap] || DocumentIcon // fallback
}