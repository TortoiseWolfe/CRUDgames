import emailjs from '@emailjs/browser';
import type { EmailData, EmailResponse, EmailService } from './types';

export class EmailJSService implements EmailService {
  private serviceId: string;
  private templateId: string;
  private publicKey: string;

  constructor() {
    this.serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
    this.templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
    this.publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

    if (this.isConfigured()) {
      emailjs.init(this.publicKey);
    }
  }

  isConfigured(): boolean {
    return !!(this.serviceId && this.templateId && this.publicKey);
  }

  async send(data: EmailData): Promise<EmailResponse> {
    if (!this.isConfigured()) {
      return {
        success: false,
        error: 'EmailJS is not properly configured. Check environment variables.',
      };
    }

    try {
      const templateParams = {
        to_email: data.to || process.env.NEXT_PUBLIC_CONTACT_EMAIL,
        from_name: data.name,
        from_email: data.email,
        phone: data.phone || 'Not provided',
        company: data.company || 'Not provided',
        project_type: data.projectType || 'Not specified',
        budget: data.budget || 'Not specified',
        timeline: data.timeline || 'Not specified',
        message: data.message || 'No message provided',
        subject: data.subject,
        timestamp: new Date().toLocaleString(),
      };

      const response = await emailjs.send(
        this.serviceId,
        this.templateId,
        templateParams
      );

      return {
        success: true,
        messageId: response.text,
      };
    } catch (error) {
      console.error('EmailJS error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send email',
      };
    }
  }
}