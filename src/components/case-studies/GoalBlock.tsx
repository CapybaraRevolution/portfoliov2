interface GoalBlockProps {
  goal: string
  goalDetail?: string
  className?: string
}

export function GoalBlock({ goal, goalDetail, className = '' }: GoalBlockProps) {
  return (
    <section className={`mb-12 ${className}`}>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-zinc-900 dark:text-zinc-100">
        {goal}
      </h2>
      {goalDetail && (
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl italic">
          {goalDetail}
        </p>
      )}
    </section>
  )
}
