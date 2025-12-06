'use client'

const servicesLabItems = [
  {
    id: 'raycast-extension',
    title: 'Raycast Extension',
    description: 'A powerful Raycast extension that enhances your workflow with custom commands and integrations.',
  },
  {
    id: 'api-service',
    title: 'API Service',
    description: 'A robust API service that provides seamless data access and integration capabilities.',
  },
  {
    id: 'utility-tool',
    title: 'Utility Tool',
    description: 'A versatile utility tool designed to simplify complex tasks and improve efficiency.',
  },
]

export function ServicesLab() {
  return (
    <section id="services-lab" className="not-prose py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Services Lab
          </h2>
          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-300">
            A collection of Raycast extensions and services I&apos;ve built to streamline workflows and boost productivity.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {servicesLabItems.map((item) => (
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



