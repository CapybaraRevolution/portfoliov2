import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export interface CommentNotificationData {
  authorName: string
  content: string
  itemId: string
  pageTitle?: string
  mood?: string | null
  timestamp: string
}

/**
 * Send email notification when a new comment is posted
 */
export async function sendCommentNotification(data: CommentNotificationData): Promise<boolean> {
  try {
    // Check if Resend API key is configured
    if (!resend) {
      console.warn('RESEND_API_KEY not configured, comment notification not sent')
      return false
    }

    // Determine page context from itemId
    const pageContext = getPageContextFromItemId(data.itemId)
    const pageUrl = `https://kylemcgraw.com${pageContext.url}`
    
    // Prepare email content
    const subject = `New Comment on ${pageContext.title}`
    
    const emailHtml = `
      <h2>New Comment Posted</h2>
      <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; margin: 16px 0;">
        <p><strong>Page:</strong> ${pageContext.title}</p>
        <p><strong>Author:</strong> ${data.authorName}</p>
        <p><strong>Posted:</strong> ${formatTimestamp(data.timestamp)}</p>
        ${data.mood ? `<p><strong>Mood:</strong> ${formatMood(data.mood)}</p>` : ''}
      </div>
      
      <h3>Comment:</h3>
      <div style="background: #ffffff; border-left: 4px solid #10b981; padding: 16px; margin: 16px 0; border-radius: 4px;">
        <p style="margin: 0; line-height: 1.5;">${data.content.replace(/\n/g, '<br>')}</p>
      </div>
      
      <p><a href="${pageUrl}" style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Comment</a></p>
      
      <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;">
      <p style="color: #6b7280; font-size: 14px;">
        <em>This notification was sent automatically from your portfolio website.</em>
      </p>
    `

    const emailText = `
New Comment Posted

Page: ${pageContext.title}
Author: ${data.authorName}
Posted: ${formatTimestamp(data.timestamp)}
${data.mood ? `Mood: ${formatMood(data.mood)}` : ''}

Comment:
${data.content}

View comment: ${pageUrl}

---
This notification was sent automatically from your portfolio website.
    `.trim()

    // Send email using Resend
    const { data: emailData, error } = await resend.emails.send({
      from: 'Portfolio Comments <onboarding@resend.dev>',
      to: ['kylemcgraw1993@gmail.com'],
      subject: subject,
      html: emailHtml,
      text: emailText,
    })

    if (error) {
      console.error('Comment notification email error:', error)
      return false
    }

    console.log('Comment notification email sent successfully:', emailData)
    return true
    
  } catch (error) {
    console.error('Failed to send comment notification:', error)
    return false
  }
}

/**
 * Get page context information from itemId
 */
function getPageContextFromItemId(itemId: string): { title: string; url: string } {
  // Map itemIds to their corresponding pages
  const pageMap: Record<string, { title: string; url: string }> = {
    'homepage': { title: 'Homepage', url: '/' },
    'about': { title: 'About Page', url: '/about' },
    'work-overview': { title: 'Work Overview', url: '/work/overview' },
    'process': { title: 'Process Page', url: '/process' },
    'contact': { title: 'Contact Page', url: '/contact' },
    
    // Case study pages
    'case-study-healthcare': { title: 'Pharmaceutical Project Management Portal Case Study', url: '/case-studies/healthcare' },
    'case-study-boveda-tr1n1ty': { title: 'Boveda Tr1n1ty Case Study', url: '/case-studies/boveda-tr1n1ty' },
    'case-study-old-skool': { title: 'Old Skool Game Studios Case Study', url: '/case-studies/old-skool' },
    'case-study-avatar-generations': { title: 'Avatar: Generations Case Study', url: '/case-studies/avatar-generations' },
    'case-study-cornell-university': { title: 'Cornell University Case Study', url: '/case-studies/cornell-university' },
    'case-study-social-finance-fund': { title: 'Social Finance Fund Case Study', url: '/case-studies/social-finance-fund' },
    'case-study-breeze-mortgage-hub': { title: 'Breeze Mortgage Hub Case Study', url: '/case-studies/breeze-mortgage-hub' },
    'case-study-amfa-class-filter-redesign': { title: 'AMFA Class Filter Redesign Case Study', url: '/case-studies/amfa-class-filter-redesign' },
  }

  return pageMap[itemId] || { 
    title: `Page (${itemId})`, 
    url: '/' 
  }
}

/**
 * Format timestamp for display
 */
function formatTimestamp(timestamp: string): string {
  try {
    const date = new Date(timestamp)
    return date.toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    })
  } catch {
    return timestamp
  }
}

/**
 * Format mood for display
 */
function formatMood(mood: string): string {
  const moodMap: Record<string, string> = {
    'excited': '🔥 Excited',
    'loved': '❤️ Loved',
    'happy': '😊 Happy',
    'sad': '😢 Sad',
    'thumbsy': '👍 Thumbsy'
  }
  
  return moodMap[mood] || mood
}