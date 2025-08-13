'use client'

import { Button } from '@/components/Button'
import { Chip } from '@/components/ui/Chip'
import { AccordionPanel } from '@/components/AccordionPanel'
import { HeroPattern } from '@/components/HeroPattern'
import { useState, useEffect, useRef, useMemo } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  type MotionValue,
} from 'framer-motion'
import { submitContactForm, type FormData } from './actions'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { ExclamationCircleIcon } from '@heroicons/react/16/solid'
import { trackEvent, trackContactFormSubmission } from '@/components/GoogleAnalytics'

// Metadata will be handled by layout.tsx or moved to a separate file

const engagementModels = [
  {
    title: 'Short-term Consulting',
    subtitle: '2–12 weeks',
    description: 'Audits, strategy, experiments',
    icon: '🎯'
  },
  {
    title: 'Contract Projects',
    subtitle: '3–12 months', 
    description: 'From discovery to launch',
    icon: '🚀'
  },
  {
    title: 'Full-time Product Roles',
    subtitle: 'When you need an owner',
    description: 'Embedded team leadership',
    icon: '👥'
  },
  {
    title: 'Advisory',
    subtitle: 'Periodic guidance',
    description: 'Checkpoints and decision support',
    icon: '💡'
  }
]

const projectTypes = [
  'Product strategy & roadmap',
  'UX research & usability testing', 
  'IA, wireframes, and clickable prototypes',
  'Design systems & documentation',
  'Business analysis & process mapping'
]

const industries = [
  'E-commerce',
  'FinTech', 
  'Healthcare',
  'Enterprise SaaS',
  'EdTech'
]

const faqItems = [
  {
    title: 'Rates & Billing',
    content: 'Standard rate: CA$105/hr. Fixed-fee available for well-scoped deliverables. Invoicing: monthly, NET-15 from invoice date. Preferred payment: bank transfer/ACH; happy to use your vendor system.'
  },
  {
    title: 'Process',
    content: 'Measure → learn → improve. I work in one- to two-week sprints with weekly demos and fast feedback. Phases: Discovery & Strategy → Planning & Architecture → Design & Prototyping → Implementation Support → Launch & Optimisation. Want the deep dive? View my Process (opens in a new tab).'
  },
  {
    title: 'Tools',
    content: 'Figma, Miro, Jira/Asana, Notion/Confluence, Slack/Loom, Amplitude/GA4, Optimizely, Vercel, GitHub—happy to work in your stack. See the full list and how I use them: Explore Tools (opens in a new tab).'
  },
  {
    title: 'NDAs & Security',
    content: 'NDAs welcome. Client data is encrypted and compartmentalized; work happens in private repos/drives. Access is removed at wrap-up. I follow least-privilege access and keep credentials out of files.'
  },
  {
    title: 'Location & Hours',
    content: 'Vancouver, BC (Pacific Time). I overlap 9–5 PT and am flexible for critical meetings. Not interested in relocation; remote or occasional on-site is great.'
  },
  {
    title: 'Availability',
    content: 'Available immediately. Open to contract (part- or full-time), with the option to discuss full-time roles if it\'s the right fit.'
  }
]


const timelineOptions = [
  { id: 'asap', name: 'ASAP' },
  { id: '2-4weeks', name: '2–4 weeks' },
  { id: '1-3months', name: '1–3 months' },
  { id: '3months+', name: '3+ months' },
]

const budgetOptions = [
  { id: '5k-15k', name: '$5K-15K' },
  { id: '15k-50k', name: '$15K-50K' },
  { id: '50k-100k', name: '$50K-100K' },
  { id: '100k+', name: '$100K+' },
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
          className="-ml-px block w-full grow rounded-r-md bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
        />
      </div>
    </div>
  )
}

function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    website: '',
    project: '',
    timeline: '',
    budget: '',
    success: '',
    engagement: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [warnings, setWarnings] = useState<Partial<FormData>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({})
  const [showSubmitErrors, setShowSubmitErrors] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  // Email validation regex
  const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, [])

  // Check if required field is empty (for warnings on blur)
  const isRequiredFieldEmpty = (name: keyof FormData, value: string) => {
    const requiredFields = ['name', 'email', 'project', 'timeline', 'budget', 'engagement']
    return requiredFields.includes(name) && value.trim() === ''
  }

  // Update warnings and errors when form data changes
  useEffect(() => {
    const newWarnings: Partial<FormData> = {}
    const newErrors: Partial<FormData> = {}
    
    Object.keys(formData).forEach((key) => {
      const fieldName = key as keyof FormData
      const value = formData[fieldName]
      
      if (touched[fieldName]) {
        // Only show email validation error on blur/change
        if (fieldName === 'email') {
          if (value.trim() !== '' && !emailRegex.test(value)) {
            newErrors[fieldName] = 'Please enter a valid email address'
          }
        }
        
        // Show warnings for empty required fields (but not errors until submit)
        if (!showSubmitErrors && isRequiredFieldEmpty(fieldName, value)) {
          newWarnings[fieldName] = 'This field is required'
        }
      }
    })
    
    setWarnings(newWarnings)
    setErrors(newErrors)
  }, [formData, touched, showSubmitErrors, emailRegex])

  // Form validation - check if all required fields are filled and email is valid
  const isFormValid = formData.name.trim() !== '' && 
                     formData.email.trim() !== '' && 
                     emailRegex.test(formData.email) &&
                     formData.project.trim() !== '' &&
                     formData.timeline !== '' &&
                     formData.budget !== '' &&
                     formData.engagement !== ''

  // Handle field blur (mark as touched)
  const handleBlur = (fieldName: keyof FormData) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Show submit errors if form is invalid
    if (!isFormValid) {
      setShowSubmitErrors(true)
      // Mark all required fields as touched to show validation
      setTouched({
        name: true,
        email: true,
        project: true,
        timeline: true,
        budget: true,
        engagement: true,
        company: touched.company || false,
        website: touched.website || false,
        success: touched.success || false,
      })
      return
    }

    setIsSubmitting(true)
    setSubmitResult(null)

    try {
      const result = await submitContactForm(formData)
      setSubmitResult(result)
      
      if (result.success) {
        // Reset form on success
        setFormData({
          name: '',
          email: '',
          company: '',
          website: '',
          project: '',
          timeline: '',
          budget: '',
          success: '',
          engagement: ''
        })
        
        // Reset validation states
        setTouched({})
        setErrors({})
        setWarnings({})
        setShowSubmitErrors(false)
        
        // Track form submission with detailed analytics
        trackContactFormSubmission(formData)
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: 'An error occurred while submitting the form'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          id="name"
          label="Name"
          required
          placeholder="Your full name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          onBlur={() => handleBlur('name')}
          error={showSubmitErrors && !formData.name.trim() ? 'Name is required' : undefined}
          warning={warnings.name}
        />
        <InputField
          id="email"
          label="Email"
          type="email"
          required
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          onBlur={() => handleBlur('email')}
          error={errors.email || (showSubmitErrors && !formData.email.trim() ? 'Email is required' : undefined)}
          warning={!errors.email ? warnings.email : undefined}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          id="company"
          label="Company"
          placeholder="Your company name"
          value={formData.company}
          onChange={(e) => setFormData({...formData, company: e.target.value})}
          onBlur={() => handleBlur('company')}
        />
        <WebsiteField
          id="website"
          label="Website"
          value={formData.website}
          onChange={(e) => setFormData({...formData, website: e.target.value})}
          onBlur={() => handleBlur('website')}
        />
      </div>

      {/* Project Description */}
      <div>
        <label htmlFor="project" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          What are we working on?
        </label>
        <div className="grid grid-cols-1">
          <textarea
            id="project"
            required
            rows={3}
            placeholder="Tell me about your project, goals, and what you're hoping to achieve..."
            value={formData.project}
            onChange={(e) => setFormData({...formData, project: e.target.value})}
            onBlur={() => handleBlur('project')}
            aria-invalid={!!errors.project}
            aria-describedby={errors.project ? 'project-error' : undefined}
            className={`col-start-1 row-start-1 w-full px-3 py-2 rounded-md text-zinc-900 dark:text-zinc-100 sm:text-sm transition-colors resize-none ${
              (showSubmitErrors && !formData.project.trim()) || errors.project
                ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-500/50 placeholder:text-red-400/70 focus:border-red-400 focus:ring-2 focus:ring-red-400/20 pr-10'
                : warnings.project
                ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-500/50 placeholder:text-amber-500/70 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 pr-10'
                : 'bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
            }`}
          />
          {((showSubmitErrors && !formData.project.trim()) || errors.project) && (
            <ExclamationCircleIcon
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 mr-3 mt-3 size-5 self-start justify-self-end text-red-400"
            />
          )}
          {warnings.project && !((showSubmitErrors && !formData.project.trim()) || errors.project) && (
            <ExclamationCircleIcon
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 mr-3 mt-3 size-5 self-start justify-self-end text-amber-500"
            />
          )}
        </div>
        {(showSubmitErrors && !formData.project.trim()) && (
          <p id="project-error" className="mt-2 text-sm text-red-400">
            Project description is required
          </p>
        )}
        {warnings.project && !(showSubmitErrors && !formData.project.trim()) && (
          <p id="project-error" className="mt-2 text-sm text-amber-600 dark:text-amber-500">
            {warnings.project}
          </p>
        )}
      </div>

      {/* Timeline Radio Group */}
      <fieldset aria-label="Choose timeline">
        <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">Timeline</div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {timelineOptions.map((option) => (
            <label
              key={option.id}
              aria-label={option.name}
              className="group relative flex items-center justify-center rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 p-3 has-checked:border-emerald-500 has-checked:bg-emerald-50 dark:has-checked:bg-emerald-900/20 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-emerald-500 transition-all duration-200 cursor-pointer hover:border-emerald-300 dark:hover:border-emerald-700"
            >
              <input
                value={option.name}
                checked={formData.timeline === option.name}
                onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                name="timeline"
                type="radio"
                className="absolute inset-0 appearance-none focus:outline-none"
              />
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{option.name}</span>
            </label>
          ))}
        </div>
        {showSubmitErrors && !formData.timeline && (
          <p className="mt-2 text-sm text-red-400">Please select a timeline</p>
        )}
      </fieldset>

      {/* Budget Radio Group */}
      <fieldset aria-label="Choose budget range">
        <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">Budget range</div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {budgetOptions.map((option) => (
            <label
              key={option.id}
              aria-label={option.name}
              className="group relative flex items-center justify-center rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 p-3 has-checked:border-emerald-500 has-checked:bg-emerald-50 dark:has-checked:bg-emerald-900/20 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-emerald-500 transition-all duration-200 cursor-pointer hover:border-emerald-300 dark:hover:border-emerald-700"
            >
              <input
                value={option.name}
                checked={formData.budget === option.name}
                onChange={(e) => setFormData({...formData, budget: e.target.value})}
                name="budget"
                type="radio"
                className="absolute inset-0 appearance-none focus:outline-none"
              />
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{option.name}</span>
            </label>
          ))}
        </div>
        {showSubmitErrors && !formData.budget && (
          <p className="mt-2 text-sm text-red-400">Please select a budget range</p>
        )}
      </fieldset>

      {/* Engagement Type Radio Group */}
      <fieldset aria-label="Choose engagement type">
        <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">How would you like to work together?</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {engagementModels.map((model) => (
            <label
              key={model.title}
              aria-label={model.title}
              aria-description={`${model.subtitle} - ${model.description}`}
              className="group relative flex rounded-2xl border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 p-4 has-checked:border-emerald-500 has-checked:bg-emerald-50 dark:has-checked:bg-emerald-900/20 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-emerald-500 transition-all duration-200 cursor-pointer hover:border-emerald-300 dark:hover:border-emerald-700"
            >
              <input
                value={model.title}
                checked={formData.engagement === model.title}
                onChange={(e) => setFormData({...formData, engagement: e.target.value})}
                name="engagement"
                type="radio"
                className="absolute inset-0 appearance-none focus:outline-none"
              />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-lg">{model.icon}</span>
                  <span className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{model.title}</span>
                </div>
                <span className="block text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-1">{model.subtitle}</span>
                <span className="block text-sm text-zinc-600 dark:text-zinc-400">{model.description}</span>
              </div>
              <CheckCircleIcon
                aria-hidden="true"
                className="invisible size-5 text-emerald-500 flex-shrink-0 group-has-checked:visible"
              />
            </label>
          ))}
        </div>
        {showSubmitErrors && !formData.engagement && (
          <p className="mt-2 text-sm text-red-400">Please select how you&apos;d like to work together</p>
        )}
      </fieldset>

      {/* Success Definition */}
      <div>
        <label htmlFor="success" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Success looks like... <span className="text-zinc-400 dark:text-zinc-500">(optional)</span>
        </label>
        <textarea
          id="success"
          rows={2}
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          value={formData.success}
          onChange={(e) => setFormData({...formData, success: e.target.value})}
        />
      </div>

      <motion.div 
        className="flex justify-center"
        animate={isFormValid ? {
          scale: [1, 1.01, 1],
          y: [0, -1, 0]
        } : {}}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="relative group">
          {/* Ambient glow effect when form is valid */}
          {isFormValid && !isSubmitting && (
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
          )}
          
          <Button 
            type="submit" 
            variant="secondary"
            className={`relative px-8 py-3 transition-all duration-500 transform ${
              !isFormValid 
                ? 'bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-600' 
                : 'bg-emerald-50/80 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/50 hover:bg-emerald-100/80 dark:hover:bg-emerald-900/30 hover:border-emerald-400 dark:hover:border-emerald-400/70 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20 dark:hover:shadow-emerald-400/20'
            }`}
            disabled={isSubmitting}
          >
            <span className={`relative z-10 transition-all duration-300 font-medium ${isFormValid ? 'text-emerald-700 dark:text-emerald-300' : ''}`}>
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
      
      {/* Success/Error Message */}
      {submitResult && (
        <div 
          className={`p-4 rounded-md ${
            submitResult.success 
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800' 
              : 'bg-red-50 text-red-800 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
          }`}
          aria-live="polite"
        >
          {submitResult.message}
          {submitResult.success && (
            <div className="mt-2">
              <Button href="https://calendly.com/kylemcgraw" variant="text">
                Book intro call
              </Button>
            </div>
          )}
        </div>
      )}
      
      <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
        I review every inquiry and aim to reply within 1 business day. Your details stay private and are never shared.
      </p>
    </form>
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
    
    // Compose email
    window.location.href = 'mailto:kylemcgraw1993@gmail.com?subject=Project%20inquiry'
  }

  return (
    <button
      onClick={handleClick}
      className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium"
    >
      {revealed ? 'kylemcgraw1993@gmail.com' : 'Email me'}
    </button>
  )
}

export default function ContactPage() {
  return (
    <>
      <HeroPattern />
      <div className="relative max-w-4xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
          Work With Me
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto">
          I help teams ship user-centered products and measurable outcomes. If you&apos;ve got a problem worth solving, let&apos;s talk.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            href="https://calendly.com/kylemcgraw" 
            variant="filled" 
            arrow="right"
            onClick={() => trackEvent('contact_calendar_clicked')}
          >
            Book a 30-min intro
          </Button>
          <ObfuscatedEmail />
        </div>
        
        <div className="mt-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400">
            Available immediately • Remote or hybrid
          </span>
        </div>
      </div>

      {/* Contact Form */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Let&apos;s start a project
        </h2>
        <ContactForm />
      </section>

      {/* FAQ */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Frequently asked questions
        </h2>
        <AccordionPanel items={faqItems} />
      </section>

      </div>
    </>
  )
}