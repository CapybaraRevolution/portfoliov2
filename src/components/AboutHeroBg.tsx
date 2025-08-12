interface AboutHeroBgProps {
  children: React.ReactNode
}

export function AboutHeroBg({ children }: AboutHeroBgProps) {
  return (
    <div className="bg-gradient-to-br from-emerald-50/50 via-white to-blue-50/30 bg-no-repeat bg-cover min-h-screen dark:bg-gradient-to-br dark:from-emerald-900/10 dark:via-zinc-900 dark:to-blue-900/10 dark:bg-no-repeat dark:bg-cover">
      {children}
    </div>
  )
}