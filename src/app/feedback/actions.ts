'use server'

import { Resend } from 'resend'

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
      console.warn('RESEND_API_KEY not configured, feedback logged but email not sent')
      console.log('Feedback submission:', feedbackData)
      return { 
        success: true, 
        message: 'Thank you for your feedback!' 
      }
    }

    // Prepare email content
    const emoji = feedbackData.response === 'yes' ? '👍' : '👎'
    const responseText = feedbackData.response === 'yes' ? 'Yes' : 'No'
    const isEasterEgg = feedbackData.pageTitle?.includes('Easter Egg')
    const emailSubject = isEasterEgg 
      ? `🎉 Easter Egg Feedback - ${feedbackData.rating ? `${feedbackData.rating}/5` : 'Site Feedback'}`
      : `Page Feedback: ${responseText} - ${feedbackData.pageTitle || 'Unknown Page'}`
    
    const ratingEmoji = feedbackData.rating 
      ? (feedbackData.rating === 1 ? '😞' : feedbackData.rating === 2 ? '😐' : feedbackData.rating === 3 ? '🙂' : feedbackData.rating === 4 ? '😊' : '🤩')
      : ''
    
    const emailHtml = `
      <h2>${isEasterEgg ? '🎉 Easter Egg Feedback!' : 'New Page Feedback'}</h2>
      <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; margin: 16px 0;">
        ${isEasterEgg ? '' : `<p><strong>Response:</strong> ${emoji} ${responseText}</p>`}
        ${feedbackData.rating ? `<p><strong>Rating:</strong> ${ratingEmoji} ${feedbackData.rating}/5</p>` : ''}
        <p><strong>Page:</strong> ${feedbackData.pageTitle || 'Unknown Page'}</p>
        <p><strong>URL:</strong> <a href="${feedbackData.pageUrl}">${feedbackData.pageUrl}</a></p>
        ${feedbackData.comment ? `<p><strong>Comment:</strong><br>${feedbackData.comment.replace(/\n/g, '<br>')}</p>` : ''}
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
      
      <p><a href="${feedbackData.pageUrl}" style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Page</a></p>
      
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

    const { data, error } = await withTimeout(sendEmailPromise, 30000)

    if (error) {
      console.error('Email sending error:', error)
      throw new Error('Failed to send feedback')
    }

    console.log('Feedback email sent successfully:', data)
    
    return { 
      success: true, 
      message: 'Thank you for your feedback!' 
    }
  } catch (error) {
    console.error('Feedback submission error:', error)
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








