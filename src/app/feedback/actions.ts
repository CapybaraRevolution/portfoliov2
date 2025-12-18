'use server'

import { Resend } from 'resend'
import { escapeHtml, escapeHtmlWithBreaks } from '@/lib/utils'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export interface FeedbackData {
  response: 'yes' | 'no'
  pageUrl: string
  pageTitle?: string
  rating?: number
  comment?: string
}

// Helper function to add timeout to promises
function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
    ),
  ])
}

export async function submitFeedback(feedbackData: FeedbackData) {
  try {
    // Check if Resend API key is configured
    if (!resend) {
      return { 
        success: true, 
        message: 'Thank you for your feedback!' 
      }
    }

    // Escape user-provided content
    const safePageTitle = feedbackData.pageTitle ? escapeHtml(feedbackData.pageTitle) : 'Unknown Page'
    const safePageUrl = escapeHtml(feedbackData.pageUrl)
    const safeComment = feedbackData.comment ? escapeHtmlWithBreaks(feedbackData.comment) : ''

    // Prepare email content
    const emoji = feedbackData.response === 'yes' ? '👍' : '👎'
    const responseText = feedbackData.response === 'yes' ? 'Yes' : 'No'
    const isEasterEgg = feedbackData.pageTitle?.includes('Easter Egg')
    const emailSubject = isEasterEgg 
      ? `🎉 Easter Egg Feedback - ${feedbackData.rating ? `${feedbackData.rating}/5` : 'Site Feedback'}`
      : `Page Feedback: ${responseText} - ${safePageTitle}`
    
    const ratingEmoji = feedbackData.rating 
      ? (feedbackData.rating === 1 ? '😞' : feedbackData.rating === 2 ? '😐' : feedbackData.rating === 3 ? '🙂' : feedbackData.rating === 4 ? '😊' : '🤩')
      : ''
    
    const emailHtml = `
      <h2>${isEasterEgg ? '🎉 Easter Egg Feedback!' : 'New Page Feedback'}</h2>
      <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; margin: 16px 0;">
        ${isEasterEgg ? '' : `<p><strong>Response:</strong> ${emoji} ${responseText}</p>`}
        ${feedbackData.rating ? `<p><strong>Rating:</strong> ${ratingEmoji} ${feedbackData.rating}/5</p>` : ''}
        <p><strong>Page:</strong> ${safePageTitle}</p>
        <p><strong>URL:</strong> <a href="${safePageUrl}">${safePageUrl}</a></p>
        ${safeComment ? `<p><strong>Comment:</strong><br>${safeComment}</p>` : ''}
        <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short'
        })}</p>
      </div>
      
      <p><a href="${safePageUrl}" style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Page</a></p>
      
      <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;">
      <p style="color: #6b7280; font-size: 14px;">
        <em>This feedback was submitted automatically from your portfolio website.</em>
      </p>
    `

    const emailText = `
${isEasterEgg ? '🎉 Easter Egg Feedback!' : 'New Page Feedback'}

${isEasterEgg ? '' : `Response: ${emoji} ${responseText}`}
${feedbackData.rating ? `Rating: ${ratingEmoji} ${feedbackData.rating}/5` : ''}
Page: ${feedbackData.pageTitle || 'Unknown Page'}
URL: ${feedbackData.pageUrl}
${feedbackData.comment ? `Comment: ${feedbackData.comment}` : ''}
Submitted: ${new Date().toLocaleString('en-US', {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZoneName: 'short'
})}

View page: ${feedbackData.pageUrl}

---
This feedback was submitted automatically from your portfolio website.
    `.trim()

    // Send email using Resend with timeout (30 seconds)
    const sendEmailPromise = resend.emails.send({
      from: 'Portfolio Feedback <onboarding@resend.dev>',
      to: ['kylemcgraw1993@gmail.com'],
      subject: emailSubject,
      html: emailHtml,
      text: emailText,
    })

    const { error } = await withTimeout(sendEmailPromise, 30000)

    if (error) {
      throw new Error('Failed to send feedback')
    }
    
    return { 
      success: true, 
      message: 'Thank you for your feedback!' 
    }
  } catch (error) {
    const errorMessage = error instanceof Error 
      ? error.message === 'Request timeout'
        ? 'The request took too long. Please try again.'
        : error.message
      : 'An error occurred while submitting your feedback. Please try again.'
    
    return { 
      success: false, 
      message: errorMessage
    }
  }
}



