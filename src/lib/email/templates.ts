/**
 * Email Templates for Veritas Hearing
 * 
 * These templates follow the Veritas Hearing design system:
 * - Primary: Forest Green (#183D2D)
 * - Secondary: Gold (#C6A667)
 * - Background: Cream (#F7F5EF)
 */

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string | null;
  service?: string | null;
  message: string;
}

/**
 * Generates the HTML email for contact form submissions
 */
export function generateContactEmailHtml(data: ContactFormData, baseUrl: string): string {
  const { name, email, phone, service, message } = data;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission - Veritas Hearing</title>
      <style>
        /* Reset styles */
        body, html { margin: 0; padding: 0; width: 100% !important; }
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background-color: #F7F5EF;
        }
        img { border: 0; display: block; }
        
        /* Container */
        .email-wrapper { 
          background-color: #F7F5EF; 
          padding: 40px 20px; 
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          background-color: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        /* Header - Forest Green */
        .header { 
          background-color: #183D2D; 
          padding: 32px 40px; 
          text-align: center;
        }
        .header-title {
          color: #ffffff;
          font-size: 22px;
          font-weight: 600;
          margin: 0;
          letter-spacing: -0.02em;
        }
        
        /* Content */
        .content { 
          padding: 40px; 
        }
        .intro-text {
          color: #1f2937;
          font-size: 16px;
          line-height: 1.6;
          margin: 0 0 32px 0;
        }
        
        /* Field styling */
        .field { 
          margin-bottom: 24px;
          padding-bottom: 24px;
          border-bottom: 1px solid #e5e7eb;
        }
        .field:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }
        .label { 
          color: #183D2D;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 8px;
        }
        .value { 
          color: #1f2937;
          font-size: 16px;
          line-height: 1.5;
        }
        .value a {
          color: #183D2D;
          text-decoration: underline;
        }
        
        /* Message box - Gold accent */
        .message-box { 
          background-color: #F7F5EF; 
          padding: 20px; 
          border-radius: 8px;
          border-left: 4px solid #C6A667;
          color: #1f2937;
          font-size: 16px;
          line-height: 1.6;
        }
        
        /* Footer */
        .footer {
          background-color: #F7F5EF;
          padding: 24px 40px;
          text-align: center;
          border-top: 1px solid #e5e7eb;
        }
        .footer-text {
          color: #6b7280;
          font-size: 14px;
          margin: 0 0 8px 0;
        }
        .footer-link {
          color: #183D2D;
          text-decoration: none;
          font-weight: 500;
        }
        .footer-brand {
          color: #C6A667;
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <div class="email-wrapper">
        <div class="container">
          <!-- Header -->
          <div class="header">
            <h1 style="color: #C6A667; font-size: 28px; font-weight: 700; margin: 0 0 16px 0;">Veritas Hearing</h1>
            <h1 class="header-title">New Contact Form Submission</h1>
          </div>
          
          <!-- Content -->
          <div class="content">
            <p class="intro-text">You have received a new enquiry from the Veritas Hearing website. The details are below:</p>
            
            <div class="field">
              <div class="label">Name</div>
              <div class="value">${name}</div>
            </div>
            
            <div class="field">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${email}">${email}</a></div>
            </div>
            
            ${phone ? `
            <div class="field">
              <div class="label">Phone</div>
              <div class="value">${phone}</div>
            </div>
            ` : ''}
            
            ${service ? `
            <div class="field">
              <div class="label">Service of Interest</div>
              <div class="value">${service}</div>
            </div>
            ` : ''}
            
            <div class="field">
              <div class="label">Message</div>
              <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          
          <!-- Footer -->
          <div class="footer">
            <p class="footer-text">This enquiry was submitted via <a href="${baseUrl}" class="footer-link">veritashearing.co.nz</a></p>
            <p class="footer-text"><span class="footer-brand">Veritas Hearing</span> — Independent hearing care, delivered with integrity.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Generates plain text email for contact form submissions
 */
export function generateContactEmailText(data: ContactFormData): string {
  const { name, email, phone, service, message } = data;

  return `
═══════════════════════════════════════════════════════════
VERITAS HEARING — New Contact Form Submission
═══════════════════════════════════════════════════════════

You have received a new enquiry from the Veritas Hearing website.

NAME
${name}

EMAIL
${email}
${phone ? `
PHONE
${phone}
` : ''}${service ? `
SERVICE OF INTEREST
${service}
` : ''}
MESSAGE
${message}

───────────────────────────────────────────────────────────
Veritas Hearing — Independent hearing care, delivered with integrity.
https://veritashearing.co.nz
  `;
}
