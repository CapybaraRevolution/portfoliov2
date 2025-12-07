'use client'

import { useState, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { submitContactForm, type FormData } from '@/app/contact/actions'
import { trackContactFormSubmission } from '@/components/GoogleAnalytics'
import { Confetti, type ConfettiRef } from '@/components/ui/confetti'
import { ContactStepper } from '@/components/ContactStepper'
import { Button } from '@/components/Button'
import { InputField, WebsiteField } from './ContactFormFields'

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

const TOTAL_STEPS = 5

const STEPS = [
  { id: 1, name: 'Engagement' },
  { id: 2, name: 'Project' },
  { id: 3, name: 'Company' },
  { id: 4, name: 'Personal' },
  { id: 5, name: 'Review' },
]

export function MultiStepContactForm() {
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
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({})
  const confettiRef = useRef<ConfettiRef>(null)

  const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, [])

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleBlur = (fieldName: keyof FormData) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }))
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!formData.engagement
      case 2:
        return !!formData.project
      case 3:
        return true // Both optional
      case 4:
        return !!formData.name && !!formData.email && emailRegex.test(formData.email)
      default:
        return true
    }
  }

  const canProceed = validateStep(currentStep)
  const canGoBack = currentStep > 1

  // Check if form is valid for the final step (all required fields filled)
  const isFormValid = formData.name.trim() !== '' && 
                     formData.email.trim() !== '' && 
                     emailRegex.test(formData.email) &&
                     formData.project.trim() !== '' &&
                     formData.engagement !== ''

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitResult(null)

    try {
      const timeoutPromise = new Promise<{ success: boolean; message: string }>((_, reject) => {
        setTimeout(() => {
          reject(new Error('Request took too long. Please check your connection and try again.'))
        }, 35000)
      })

      const result = await Promise.race([
        submitContactForm(formData),
        timeoutPromise
      ])
      
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
        message: error instanceof Error 
          ? error.message 
          : 'An error occurred while submitting the form. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
              How would you like to work together?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {engagementModels.map((model) => (
                <label
                  key={model.title}
                  className={`group relative flex rounded-2xl border p-4 cursor-pointer transition-all duration-200 ${
                    formData.engagement === model.title
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                      : 'border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 hover:border-emerald-300 dark:hover:border-emerald-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="engagement"
                    value={model.title}
                    checked={formData.engagement === model.title}
                    onChange={(e) => setFormData({...formData, engagement: e.target.value})}
                    className="absolute inset-0 appearance-none focus:outline-none"
                  />
                  <div className="flex-1">
                    <div className="mb-2">
                      <span className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                        {model.title}
                      </span>
                    </div>
                    <span className="block text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-1">
                      {model.subtitle}
                    </span>
                    <span className="block text-sm text-zinc-600 dark:text-zinc-400">
                      {model.description}
                    </span>
                  </div>
                  <CheckCircleIcon
                    className={`size-5 text-emerald-500 flex-shrink-0 transition-opacity ${
                      formData.engagement === model.title ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </label>
              ))}
            </div>
            {errors.engagement && (
              <p className="text-sm text-red-400">{errors.engagement}</p>
            )}
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="project" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                What are we working on?
              </label>
              <textarea
                id="project"
                required
                rows={4}
                placeholder="Tell me about your project, goals, and what you're hoping to achieve..."
                value={formData.project}
                onChange={(e) => setFormData({...formData, project: e.target.value})}
                onBlur={() => handleBlur('project')}
                className={`w-full px-3 py-2 rounded-md text-zinc-900 dark:text-zinc-100 sm:text-sm transition-colors resize-none ${
                  errors.project
                    ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-500/50'
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
                rows={3}
                placeholder="How will you measure success?"
                value={formData.success}
                onChange={(e) => setFormData({...formData, success: e.target.value})}
                className="w-full px-3 py-2 rounded-md bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm resize-none"
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              Tell us about your company (optional)
            </p>
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
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              Lastly, some information about you
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                id="name"
                label="Name"
                required
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                onBlur={() => handleBlur('name')}
                error={touched.name && !formData.name.trim() ? 'Name is required' : errors.name}
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
                error={
                  touched.email && formData.email.trim() && !emailRegex.test(formData.email)
                    ? 'Please enter a valid email address'
                    : touched.email && !formData.email.trim()
                    ? 'Email is required'
                    : errors.email
                }
              />
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              Review your information
            </h3>
            <div className="space-y-4 text-sm">
              <div>
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Engagement:</span>
                <span className="ml-2 text-zinc-900 dark:text-white">{formData.engagement}</span>
              </div>
              <div>
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Project:</span>
                <p className="mt-1 text-zinc-900 dark:text-white whitespace-pre-wrap">{formData.project}</p>
              </div>
              {formData.success && (
                <div>
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">Success looks like:</span>
                  <p className="mt-1 text-zinc-900 dark:text-white whitespace-pre-wrap">{formData.success}</p>
                </div>
              )}
              {formData.company && (
                <div>
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">Company:</span>
                  <span className="ml-2 text-zinc-900 dark:text-white">{formData.company}</span>
                </div>
              )}
              {formData.website && (
                <div>
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">Website:</span>
                  <span className="ml-2 text-zinc-900 dark:text-white">https://{formData.website}</span>
                </div>
              )}
              <div>
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Name:</span>
                <span className="ml-2 text-zinc-900 dark:text-white">{formData.name}</span>
              </div>
              <div>
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Email:</span>
                <span className="ml-2 text-zinc-900 dark:text-white">{formData.email}</span>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <>
      <Confetti ref={confettiRef} manualstart className="fixed inset-0 pointer-events-none z-50" />
      <div className="space-y-8">
        <ContactStepper steps={STEPS} currentStep={currentStep} />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[300px]"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {submitResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-md ${
              submitResult.success 
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800' 
                : 'bg-red-50 text-red-800 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
            }`}
            aria-live="polite"
          >
            {submitResult.message}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`pt-4 border-t border-zinc-200 dark:border-zinc-800 relative ${
            currentStep === TOTAL_STEPS 
              ? 'flex justify-center' 
              : 'flex items-center justify-between gap-4'
          }`}
        >
          {currentStep < TOTAL_STEPS ? (
            <>
              <button
                onClick={handleBack}
                disabled={!canGoBack}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  canGoBack
                    ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                    : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-600 cursor-not-allowed'
                }`}
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!canProceed}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  canProceed
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed'
                }`}
              >
                Continue
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleBack}
                disabled={!canGoBack}
                className={`absolute left-0 px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  canGoBack
                    ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                    : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-600 cursor-not-allowed'
                }`}
              >
                Back
              </button>
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
                    onClick={handleSubmit}
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
            </>
          )}
        </motion.div>

        {currentStep === TOTAL_STEPS && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
            I review every inquiry and aim to reply within 1 business day. Your details stay private and are never shared.
          </p>
        )}
      </div>
    </>
  )
}
