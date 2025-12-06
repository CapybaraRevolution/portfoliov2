'use client'

import { ExclamationCircleIcon } from '@heroicons/react/16/solid'

export function InputField({ 
  id, 
  label, 
  type = 'text', 
  required = false, 
  placeholder, 
  value, 
  onChange, 
  onBlur, 
  error,
  warning 
}: {
  id: string
  label: string
  type?: string
  required?: boolean
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: () => void
  error?: string
  warning?: string
}) {
  const hasError = !!error
  const hasWarning = !!warning && !hasError
  const hasValidation = hasError || hasWarning

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
        {label} {!required && <span className="text-zinc-400 dark:text-zinc-500">(optional)</span>}
      </label>
      <div className="mt-2 grid grid-cols-1">
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={hasError}
          aria-describedby={hasValidation ? `${id}-message` : undefined}
          className={`col-start-1 row-start-1 block w-full rounded-md px-3 py-2 text-zinc-900 dark:text-zinc-100 sm:text-sm transition-colors ${
            hasError
              ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-500/50 placeholder:text-red-400/70 focus:border-red-400 focus:ring-2 focus:ring-red-400/20 pr-10'
              : hasWarning
              ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-500/50 placeholder:text-amber-500/70 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 pr-10'
              : 'bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
          }`}
        />
        {hasError && (
          <ExclamationCircleIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-red-400"
          />
        )}
        {hasWarning && !hasError && (
          <ExclamationCircleIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-amber-500"
          />
        )}
      </div>
      {hasValidation && (
        <p id={`${id}-message`} className={`mt-2 text-sm ${hasError ? 'text-red-400' : 'text-amber-600 dark:text-amber-500'}`}>
          {error || warning}
        </p>
      )}
    </div>
  )
}

export function WebsiteField({ 
  id, 
  label, 
  value, 
  onChange, 
  onBlur 
}: {
  id: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: () => void
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
        {label} <span className="text-zinc-400 dark:text-zinc-500">(optional)</span>
      </label>
      <div className="mt-2 flex">
        <div className="flex shrink-0 items-center rounded-l-md bg-zinc-100 dark:bg-zinc-700 px-3 text-sm text-zinc-500 dark:text-zinc-400 border border-r-0 border-zinc-300 dark:border-zinc-600">
          https://
        </div>
        <input
          id={id}
          name={id}
          type="text"
          placeholder="www.example.com"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="-ml-px block w-full grow rounded-r-md bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
        />
      </div>
    </div>
  )
}
