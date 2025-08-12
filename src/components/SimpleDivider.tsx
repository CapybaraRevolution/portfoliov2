interface SimpleDividerProps {
  items: Array<{ id: string | number; content: React.ReactNode }>
}

export function SimpleDivider({ items }: SimpleDividerProps) {
  return (
    <ul role="list" className="divide-y divide-white/10">
      {items.map((item) => (
        <li key={item.id} className="py-4">
          {item.content}
        </li>
      ))}
    </ul>
  )
}