'use client'

interface CardItem {
  id: string
  title: string
  description: string
}

interface CardGridProps {
  title: string
  description?: string
  items: CardItem[]
  id?: string
  className?: string
}

export function CardGrid({ title, description, items, id, className }: CardGridProps) {
  return (
    <section id={id} className={`not-prose py-16 sm:py-20 ${className || ''}`}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-base text-zinc-600 dark:text-zinc-300">
              {description}
            </p>
          )}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col rounded-2xl border border-zinc-900/5 bg-white/70 p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg dark:border-white/10 dark:bg-zinc-900/60 dark:hover:border-emerald-500/40"
            >
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

















