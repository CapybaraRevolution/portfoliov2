'use client'

import { Button } from '@/components/Button'
import { HeroPattern } from '@/components/HeroPattern'
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect'
import { RainbowButton } from '@/components/ui/rainbow-button'
import { ContactStepper } from '@/components/ContactStepper'
import { useState, useRef, useMemo, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitContactForm, type FormData } from './actions'
import { CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { ExclamationCircleIcon } from '@heroicons/react/16/solid'
import { trackEvent, trackContactFormSubmission } from '@/components/GoogleAnalytics'
import { Confetti, type ConfettiRef } from '@/components/ui/confetti'
import Link from 'next/link'

// Engagement models without emojis
const engagementModels = [
  {
    title: 'Short-term Consulting',
    subtitle: '2–12 weeks',
    description: 'Audits, strategy, experiments',
  },
  {
    title: 'Contract Projects',
    subtitle: '3–12 months', 
    description: 'From discovery to launch',
  },
  {
    title: 'Full-time Product Roles',
    subtitle: 'When you need an owner',
    description: 'Embedded team leadership',
  },
  {
    title: 'Advisory',
    subtitle: 'Periodic guidance',
    description: 'Checkpoints and decision support',
  }
]

// Step definitions
const STEPS = [
  { id: 1, name: 'Engagement' },
  { id: 2, name: 'Project' },
  { id: 3, name: 'Company' },
  { id: 4, name: 'About You' },
  { id: 5, name: 'Review' },
]

// Input component with validation
function InputField({ 
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
          className={`col-start-1 row-start-1 block w-full rounded-md px-3 py-2.5 text-zinc-900 dark:text-zinc-100 sm:text-sm transition-colors ${
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

// Website input with https:// prefix
function WebsiteField({ 
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
          className="-ml-px block w-full grow rounded-r-md bg-white dark:bg-zinc-800 px-3 py-2.5 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
        />
      </div>
    </div>
  )
}

// Step 1: Engagement Type
function EngagementStep({ 
  value, 
  onChange 
}: { 
  value: string
  onChange: (value: string) => void 
}) {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
          How would you like to work together?
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Select the engagement model that best fits your needs
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {engagementModels.map((model) => (
          <label
            key={model.title}
            aria-label={model.title}
            aria-description={`${model.subtitle} - ${model.description}`}
            className={`group relative flex rounded-xl border p-4 transition-all duration-200 cursor-pointer ${
              value === model.title
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 ring-1 ring-emerald-500'
                : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 hover:border-emerald-300 dark:hover:border-emerald-700'
            }`}
          >
            <input
              type="radio"
              name="engagement"
              value={model.title}
              checked={value === model.title}
              onChange={(e) => onChange(e.target.value)}
              className="sr-only"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  {model.title}
                </span>
                {value === model.title && (
                  <CheckCircleIcon className="size-5 text-emerald-500 flex-shrink-0" />
                )}
              </div>
              <span className="block text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-1">
                {model.subtitle}
              </span>
              <span className="block text-sm text-zinc-600 dark:text-zinc-400">
                {model.description}
              </span>
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}

// Step 2: Project Details
function ProjectStep({ 
  project,
  success,
  onProjectChange,
  onSuccessChange,
  errors
}: { 
  project: string
  success: string
  onProjectChange: (value: string) => void
  onSuccessChange: (value: string) => void
  errors: { project?: string }
}) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
          What are we working on?
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Tell me about your project and goals
        </p>
      </div>

      <div>
        <label htmlFor="project" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Project description
        </label>
        <textarea
          id="project"
          rows={4}
          placeholder="Tell me about your project, goals, and what you're hoping to achieve..."
          value={project}
          onChange={(e) => onProjectChange(e.target.value)}
          className={`w-full px-3 py-2.5 rounded-md text-zinc-900 dark:text-zinc-100 sm:text-sm transition-colors resize-none ${
            errors.project
              ? 'bg-red-50 dark:bg-red-900/20 border border-red-500/50 focus:ring-red-400/20'
              : 'bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
          }`}
        />
        {errors.project && (
          <p className="mt-2 text-sm text-red-400">{errors.project}</p>
        )}
      </div>

      <div>
        <label htmlFor="success" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Success looks like... <span className="text-zinc-400 dark:text-zinc-500">(optional)</span>
        </label>
        <textarea
          id="success"
          rows={2}
          placeholder="What would success look like for this project?"
          value={success}
          onChange={(e) => onSuccessChange(e.target.value)}
          className="w-full px-3 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm resize-none"
        />
      </div>
    </div>
  )
}

// Step 3: Company Details
function CompanyStep({ 
  company,
  website,
  onCompanyChange,
  onWebsiteChange
}: { 
  company: string
  website: string
  onCompanyChange: (value: string) => void
  onWebsiteChange: (value: string) => void
}) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
          Tell me about your company
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Both fields are optional — skip if you prefer
        </p>
      </div>

      <InputField
        id="company"
        label="Company name"
        placeholder="Your company name"
        value={company}
        onChange={(e) => onCompanyChange(e.target.value)}
        onBlur={() => {}}
      />
      
      <WebsiteField
        id="website"
        label="Website"
        value={website}
        onChange={(e) => onWebsiteChange(e.target.value)}
        onBlur={() => {}}
      />
    </div>
  )
}

// Step 4: Personal Details
function PersonalStep({ 
  name,
  email,
  onNameChange,
  onEmailChange,
  errors,
  touched,
  onBlur
}: { 
  name: string
  email: string
  onNameChange: (value: string) => void
  onEmailChange: (value: string) => void
  errors: { name?: string; email?: string }
  touched: { name?: boolean; email?: boolean }
  onBlur: (field: 'name' | 'email') => void
}) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
          Lastly, some information about you
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          So I know who to reply to
        </p>
      </div>

      <InputField
        id="name"
        label="Your name"
        required
        placeholder="Your full name"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        onBlur={() => onBlur('name')}
        error={touched.name ? errors.name : undefined}
      />
      
      <InputField
        id="email"
        label="Email address"
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        onBlur={() => onBlur('email')}
        error={touched.email ? errors.email : undefined}
      />
    </div>
  )
}

// Step 5: Review
function ReviewStep({ 
  formData,
  isSubmitting,
  onSubmit
}: { 
  formData: FormData
  isSubmitting: boolean
  onSubmit: () => void
}) {
  const items = [
    { label: 'Engagement type', value: formData.engagement },
    { label: 'Project', value: formData.project },
    { label: 'Success looks like', value: formData.success || 'Not provided' },
    { label: 'Company', value: formData.company || 'Not provided' },
    { label: 'Website', value: formData.website ? `https://${formData.website}` : 'Not provided' },
    { label: 'Name', value: formData.name },
    { label: 'Email', value: formData.email },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
          Review your inquiry
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Make sure everything looks good before sending
        </p>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-4 space-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col sm:flex-row sm:justify-between gap-1 py-2 border-b border-zinc-200 dark:border-zinc-700 last:border-0">
            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              {item.label}
            </span>
            <span className="text-sm text-zinc-900 dark:text-zinc-100 sm:text-right max-w-[280px] break-words">
              {item.value.length > 100 ? `${item.value.slice(0, 100)}...` : item.value}
            </span>
          </div>
        ))}
      </div>

      <motion.div 
        className="flex justify-center pt-4"
        animate={{
          scale: [1, 1.01, 1],
          y: [0, -1, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="relative group">
          <motion.div 
            className="absolute -inset-3 rounded-lg bg-emerald-500/20 dark:bg-emerald-400/20 blur-xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <Button 
            type="button"
            onClick={onSubmit}
            variant="secondary"
            className="relative px-8 py-3 bg-emerald-50/80 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/50 hover:bg-emerald-100/80 dark:hover:bg-emerald-900/30 hover:border-emerald-400 dark:hover:border-emerald-400/70 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20 dark:hover:shadow-emerald-400/20 transition-all duration-500 transform"
            disabled={isSubmitting}
          >
            <span className="relative z-10 font-medium">
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-emerald-400/30 border-t-emerald-600 dark:border-emerald-400/30 dark:border-t-emerald-400 rounded-full"
                  />
                  Sending...
                </span>
              ) : (
                'Send Inquiry'
              )}
            </span>
          </Button>
        </div>
      </motion.div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
        I review every inquiry and aim to reply within 1 business day. Your details stay private and are never shared.
      </p>
    </div>
  )
}

function ObfuscatedEmail() {
  const [revealed, setRevealed] = useState(false)
  
  const handleClick = () => {
    if (!revealed) {
      setRevealed(true)
      trackEvent('contact_email_revealed')
    }
    trackEvent('contact_email_clicked')
    window.location.href = 'mailto:kylemcgraw1993@gmail.com?subject=Project%20inquiry'
  }

  return (
    <button
      onClick={handleClick}
      className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium transition-colors"
    >
      {revealed ? 'kylemcgraw1993@gmail.com' : 'Email me'}
    </button>
  )
}

export function ContactContent() {
  const [hasStarted, setHasStarted] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    website: '',
    project: '',
    success: '',
    engagement: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null)
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean }>({})
  const confettiRef = useRef<ConfettiRef>(null)
  const rippleRef = useRef<{ triggerRipple: () => void } | null>(null)

  // Email validation
  const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, [])

  // Compute errors
  const errors = useMemo(() => {
    const errs: { name?: string; email?: string; project?: string } = {}
    if (!formData.name.trim()) errs.name = 'Name is required'
    if (!formData.email.trim()) errs.email = 'Email is required'
    else if (!emailRegex.test(formData.email)) errs.email = 'Please enter a valid email'
    if (currentStep === 2 && !formData.project.trim()) errs.project = 'Please describe your project'
    return errs
  }, [formData, emailRegex, currentStep])

  // Can proceed to next step?
  const canProceed = useCallback(() => {
    switch (currentStep) {
      case 1:
        return formData.engagement !== ''
      case 2:
        return formData.project.trim() !== ''
      case 3:
        return true // Both fields optional
      case 4:
        return formData.name.trim() !== '' && formData.email.trim() !== '' && emailRegex.test(formData.email)
      case 5:
        return true
      default:
        return false
    }
  }, [currentStep, formData, emailRegex])

  const handleBegin = useCallback(() => {
    setHasStarted(true)
    trackEvent('contact_form_started')
    // Trigger ripple on the background grid (we'll emit a custom event)
    window.dispatchEvent(new CustomEvent('trigger-contact-ripple'))
  }, [])

  const handleNext = useCallback(() => {
    if (currentStep < 5 && canProceed()) {
      setCurrentStep(currentStep + 1)
      trackEvent('contact_step_completed', { step: currentStep })
    }
  }, [currentStep, canProceed])

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }, [currentStep])

  const handleStepClick = useCallback((stepId: number) => {
    if (stepId < currentStep) {
      setCurrentStep(stepId)
    }
  }, [currentStep])

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitResult(null)

    try {
      const result = await submitContactForm(formData)
      setSubmitResult(result)
      
      if (result.success) {
        confettiRef.current?.fire({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'],
        })
        trackContactFormSubmission(formData)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitResult({
        success: false,
        message: error instanceof Error ? error.message : 'An error occurred. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBlur = (field: 'name' | 'email') => {
    setTouched(prev => ({ ...prev, [field]: true }))
  }

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <EngagementStep
            value={formData.engagement}
            onChange={(value) => setFormData({ ...formData, engagement: value })}
          />
        )
      case 2:
        return (
          <ProjectStep
            project={formData.project}
            success={formData.success}
            onProjectChange={(value) => setFormData({ ...formData, project: value })}
            onSuccessChange={(value) => setFormData({ ...formData, success: value })}
            errors={errors}
          />
        )
      case 3:
        return (
          <CompanyStep
            company={formData.company}
            website={formData.website}
            onCompanyChange={(value) => setFormData({ ...formData, company: value })}
            onWebsiteChange={(value) => setFormData({ ...formData, website: value })}
          />
        )
      case 4:
        return (
          <PersonalStep
            name={formData.name}
            email={formData.email}
            onNameChange={(value) => setFormData({ ...formData, name: value })}
            onEmailChange={(value) => setFormData({ ...formData, email: value })}
            errors={errors}
            touched={touched}
            onBlur={handleBlur}
          />
        )
      case 5:
        return (
          <ReviewStep
            formData={formData}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="relative min-h-screen">
      <HeroPattern />
      <BackgroundRippleEffect />
      <Confetti ref={confettiRef} manualstart className="fixed inset-0 pointer-events-none z-50" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-12 md:pt-8 pb-32">
        {/* Hero Section - Always visible */}
        <div className="text-center mb-12 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4 pointer-events-none">
            Work With Me
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto pointer-events-none">
            I help teams ship user-centered products and measurable outcomes. If you&apos;ve got a problem worth solving, let&apos;s talk.
          </p>
          
          {/* Buttons - Fade out when started */}
          <AnimatePresence>
            {!hasStarted && (
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center items-center pointer-events-auto"
                initial={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Button 
                  href="https://calendly.com/kylemcgraw" 
                  variant="filled" 
                  arrow="right"
                  onClick={() => trackEvent('contact_calendar_clicked')}
                >
                  Book a 30-min intro
                </Button>
                <ObfuscatedEmail />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Availability Pill - Animates position */}
          <motion.div 
            className="pointer-events-none"
            layout
            animate={{
              marginTop: hasStarted ? '0rem' : '1.5rem'
            }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400">
              Available immediately · Remote or hybrid
            </span>
          </motion.div>
        </div>

        {/* Begin Button - Large and enticing */}
        <AnimatePresence>
          {!hasStarted && !submitResult && (
            <motion.div 
              className="flex justify-center mt-16 mb-8"
              initial={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                {/* Subtle ambient glow */}
                <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-rose-500/10 via-violet-500/10 to-blue-500/10 blur-2xl animate-pulse" />
                
                <RainbowButton
                  size="lg"
                  onClick={handleBegin}
                  className="relative text-white dark:text-zinc-900 px-12 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-shadow"
                >
                  Begin
                </RainbowButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Wizard */}
        <AnimatePresence mode="wait">
          {hasStarted && !submitResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="space-y-8"
            >
              {/* Progress Stepper */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <ContactStepper
                  steps={STEPS}
                  currentStep={currentStep}
                  onStepClick={handleStepClick}
                />
              </motion.div>

              {/* Step Content */}
              <motion.div 
                className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 md:p-8 shadow-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderStepContent()}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Message */}
        <AnimatePresence>
          {submitResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="mt-8"
            >
              <div 
                className={`p-6 rounded-xl text-center ${
                  submitResult.success 
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800' 
                    : 'bg-red-50 text-red-800 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
                }`}
              >
                <p className="text-lg font-medium mb-4">{submitResult.message}</p>
                {submitResult.success && (
                  <div className="space-y-3">
                    <Button href="https://calendly.com/kylemcgraw" variant="filled" arrow="right">
                      Book an intro call
                    </Button>
                  </div>
                )}
                {!submitResult.success && (
                  <Button 
                    variant="secondary"
                    onClick={() => {
                      setSubmitResult(null)
                      setCurrentStep(5)
                    }}
                  >
                    Try again
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAQs Link */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <Link 
            href="/contact/faq" 
            className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
          >
            Have questions? Check out the FAQs →
          </Link>
        </motion.div>
      </div>

      {/* Fixed Bottom Navigation */}
      <AnimatePresence>
        {hasStarted && !submitResult && currentStep < 5 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800"
          >
            <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  currentStep === 1
                    ? 'text-zinc-300 dark:text-zinc-600 cursor-not-allowed'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                <ChevronLeftIcon className="size-5" />
                Back
              </button>
              
              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all ${
                  canProceed()
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-md hover:shadow-lg'
                    : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-400 dark:text-zinc-500 cursor-not-allowed'
                }`}
              >
                Continue
                <ChevronRightIcon className="size-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ContactPage() {
  return <ContactContent />
}
