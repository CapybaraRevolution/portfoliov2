import clsx from 'clsx'

export function Prose<T extends React.ElementType = 'div'>({
  as,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'className'> & {
  as?: T
  className?: string
}) {
  let Component = as ?? 'div'

  return (
    <Component
      className={clsx(
        className,
        'prose dark:prose-invert',
        // Wider content area to match case study layouts
        // max-w-3xl on mobile, max-w-4xl on large screens
        '[html_:where(&>*)]:mx-auto [html_:where(&>*)]:max-w-3xl lg:[html_:where(&>*)]:max-w-4xl',
      )}
      {...props}
    />
  )
}
