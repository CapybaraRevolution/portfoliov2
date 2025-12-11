'use server'

import { Resend } from 'resend'
import { escapeHtml, escapeHtmlWithBreaks } from '@/lib/utils'

export interface FormData {
  name: string
  email: string
  company: string
  website: string
  project: string
  success: string
  engagement: string
}

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

// Helper function to add timeout to promises
function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
    ),
  ])
}

// Validate and sanitize website URL
function sanitizeWebsite(website: string): string {
  if (!website) return ''
  // Remove any protocol if user included it
  const cleaned = website.replace(/^https?:\/\//, '').trim()
  // Basic validation - should not contain spaces or invalid URL chars
  if (!/^[a-zA-Z0-9][a-zA-Z0-9-_.]*\.[a-zA-Z]{2,}(\/.*)?$/.test(cleaned)) {
    return '' // Invalid format
  }
  return cleaned
}

export async function submitContactForm(formData: FormData) {
  try {
    // Basic validation
    if (!formData.name || !formData.email || !formData.project) {
      throw new Error('Missing required fields')
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      throw new Error('Invalid email address')
    }

    // Sanitize website
    const sanitizedWebsite = sanitizeWebsite(formData.website)

    // Check if Resend API key is configured
    if (!resend) {
      return { 
        success: true, 
        message: 'Thank you for your inquiry! I\'ll get back to you soon.' 
      }
    }

    // Prepare email content with escaped user input
    const emailSubject = `New Project Inquiry from ${escapeHtml(formData.name)}`
    const emailHtml = `
      <h2>New Project Inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(formData.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(formData.email)}</p>
      <p><strong>Company:</strong> ${formData.company ? escapeHtml(formData.company) : 'Not provided'}</p>
      <p><strong>Website:</strong> ${sanitizedWebsite ? `https://${escapeHtml(sanitizedWebsite)}` : 'Not provided'}</p>
      <p><strong>Engagement Type:</strong> ${escapeHtml(formData.engagement)}</p>
      
      <h3>Project Description:</h3>
      <p>${escapeHtmlWithBreaks(formData.project)}</p>
      
      <h3>Success Definition:</h3>
      <p>${formData.success ? escapeHtmlWithBreaks(formData.success) : 'Not provided'}</p>
      
      <hr>
      <p><small>Submitted via kylemcgraw.com contact form</small></p>
    `

    const emailText = `
New Project Inquiry

Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company || 'Not provided'}
Website: ${sanitizedWebsite ? `https://${sanitizedWebsite}` : 'Not provided'}
Engagement Type: ${formData.engagement}

Project Description:
${formData.project}

Success Definition:
${formData.success || 'Not provided'}

---
Submitted via kylemcgraw.com contact form
    `.trim()

    // Send email using Resend with timeout (30 seconds)
    const sendEmailPromise = resend.emails.send({
      from: 'Portfolio Contact Form <onboarding@resend.dev>',
      to: ['kylemcgraw1993@gmail.com'],
      replyTo: formData.email,
      subject: emailSubject,
      html: emailHtml,
      text: emailText,
    })

    const { error } = await withTimeout(sendEmailPromise, 30000)

    if (error) {
      throw new Error('Failed to send email')
    }
    
    return { 
      success: true, 
      message: 'Thank you for your inquiry! I\'ll get back to you within 1 business day.' 
    }
  } catch (error) {
    const errorMessage = error instanceof Error 
      ? error.message === 'Request timeout'
        ? 'The request took too long. Please try again.'
        : error.message
      : 'An error occurred while sending your message. Please try again.'
    
    return { 
      success: false, 
      message: errorMessage
    }
  }
}
