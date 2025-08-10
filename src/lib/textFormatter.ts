export function formatText(text: string): string {
  if (!text) return '';
  
  let formatted = text;
  
  // Handle code blocks first (before other formatting)
  formatted = formatted.replace(/```json\n([\s\S]*?)\n```/g, '<pre><code class="language-json">$1</code></pre>');
  formatted = formatted.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  
  // Handle headers
  formatted = formatted.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
  formatted = formatted.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  formatted = formatted.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  
  // Handle horizontal rules
  formatted = formatted.replace(/^---$/gm, '<hr />');
  
  // Handle inline code (after code blocks to avoid conflicts)
  formatted = formatted.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Handle bold and italic text
  formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  formatted = formatted.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  
  // Split by double newlines to create paragraphs
  const paragraphs = formatted.split('\n\n');
  
  const processedParagraphs = paragraphs.map(paragraph => {
    const trimmed = paragraph.trim();
    if (!trimmed) return '';
    
    // Skip if it's already a formatted element (header, hr, code block)
    if (trimmed.startsWith('<h') || trimmed.startsWith('<hr') || trimmed.startsWith('<pre>')) {
      return trimmed;
    }
    
    // Handle bullet points
    const lines = trimmed.split('\n');
    const bulletLines: string[] = [];
    const regularLines: string[] = [];
    
    let inBulletSection = false;
    
    for (const line of lines) {
      if (line.trim().startsWith('•')) {
        if (!inBulletSection) {
          inBulletSection = true;
          // Push any accumulated regular lines as a paragraph
          if (regularLines.length > 0) {
            bulletLines.push(`<p>${regularLines.join('<br />')}</p>`);
            regularLines.length = 0;
          }
          bulletLines.push('<ul>');
        }
        bulletLines.push(`<li>${line.trim().substring(1).trim()}</li>`);
      } else {
        if (inBulletSection) {
          bulletLines.push('</ul>');
          inBulletSection = false;
        }
        regularLines.push(line.trim());
      }
    }
    
    // Close any open bullet list
    if (inBulletSection) {
      bulletLines.push('</ul>');
    }
    
    // Add any remaining regular lines
    if (regularLines.length > 0) {
      bulletLines.push(`<p>${regularLines.join('<br />')}</p>`);
    }
    
    return bulletLines.length > 0 ? bulletLines.join('') : `<p>${trimmed.replace(/\n/g, '<br />')}</p>`;
  });
  
  return processedParagraphs.filter(p => p).join('');
}