'use server'

import { Resend } from 'resend'

export interface FormData {
  name: string
  email: string
  company: string
  website: string
  project: string
  timeline: string
  budget: string
  success: string
  engagement: string
}

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

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

    // Check if Resend API key is configured
    if (!resend) {
      console.warn('RESEND_API_KEY not configured, form submission logged but email not sent')
      console.log('Contact form submission:', formData)
      return { 
        success: true, 
        message: 'Thank you for your inquiry! I\'ll get back to you soon.' 
      }
    }

    // Prepare email content
    const emailSubject = `New Project Inquiry from ${formData.name}`
    const emailHtml = `
      <h2>New Project Inquiry</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Company:</strong> ${formData.company || 'Not provided'}</p>
      <p><strong>Website:</strong> ${formData.website ? `https://${formData.website}` : 'Not provided'}</p>
      <p><strong>Timeline:</strong> ${formData.timeline}</p>
      <p><strong>Budget:</strong> ${formData.budget}</p>
      <p><strong>Engagement Type:</strong> ${formData.engagement}</p>
      
      <h3>Project Description:</h3>
      <p>${formData.project.replace(/\n/g, '<br>')}</p>
      
      <h3>Success Definition:</h3>
      <p>${formData.success ? formData.success.replace(/\n/g, '<br>') : 'Not provided'}</p>
      
      <hr>
      <p><small>Submitted via kylemcgraw.com contact form</small></p>
    `

    const emailText = `
New Project Inquiry

Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company || 'Not provided'}
Website: ${formData.website ? `https://${formData.website}` : 'Not provided'}
Timeline: ${formData.timeline}
Budget: ${formData.budget}
Engagement Type: ${formData.engagement}

Project Description:
${formData.project}

Success Definition:
${formData.success || 'Not provided'}

---
Submitted via kylemcgraw.com contact form
    `.trim()

    // Send email using Resend
    const { data, error } = await resend!.emails.send({
      from: 'Portfolio Contact Form <noreply@kylemcgraw.com>',
      to: ['kylemcgraw1993@gmail.com'],
      replyTo: formData.email,
      subject: emailSubject,
      html: emailHtml,
      text: emailText,
    })

    if (error) {
      console.error('Email sending error:', error)
      throw new Error('Failed to send email')
    }

    console.log('Email sent successfully:', data)
    
    return { 
      success: true, 
      message: 'Thank you for your inquiry! I\'ll get back to you within 1 business day.' 
    }
  } catch (error) {
    console.error('Form submission error:', error)
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'An error occurred while sending your message. Please try again.' 
    }
  }
}