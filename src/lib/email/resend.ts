import type { EmailData, EmailResponse, EmailService } from './types';

export class ResendService implements EmailService {
  private apiKey: string;
  private apiUrl = 'https://api.resend.com/emails';
  private fromEmail: string;

  constructor() {
    this.apiKey = process.env.RESEND_API_KEY || '';
    this.fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  }

  isConfigured(): boolean {
    return !!this.apiKey;
  }

  async send(data: EmailData): Promise<EmailResponse> {
    if (!this.isConfigured()) {
      return {
        success: false,
        error: 'Resend is not properly configured. Check environment variables.',
      };
    }

    try {
      // Format HTML email
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
            ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
            ${data.projectType ? `<p><strong>Project Type:</strong> ${data.projectType}</p>` : ''}
            ${data.budget ? `<p><strong>Budget:</strong> ${data.budget}</p>` : ''}
            ${data.timeline ? `<p><strong>Timeline:</strong> ${data.timeline}</p>` : ''}
          </div>
          ${data.message ? `
            <div style="background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
              <h3 style="color: #333;">Message:</h3>
              <p style="white-space: pre-wrap;">${data.message}</p>
            </div>
          ` : ''}
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>Submitted on: ${new Date().toLocaleString()}</p>
            ${data.source ? `<p>Source: ${data.source}</p>` : ''}
          </div>
        </div>
      `;

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          from: this.fromEmail,
          to: data.to || process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'team@example.com',
          subject: data.subject,
          reply_to: data.email,
          html: htmlContent,
          text: `New contact form submission from ${data.name} (${data.email})`,
        }),
      });

      const result = await response.json();

      if (response.ok && result.id) {
        return {
          success: true,
          messageId: result.id,
        };
      }

      return {
        success: false,
        error: result.message || 'Failed to send email',
      };
    } catch (error) {
      console.error('Resend error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send email',
      };
    }
  }
}