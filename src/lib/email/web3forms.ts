import type { EmailData, EmailResponse, EmailService } from './types';

export class Web3FormsService implements EmailService {
  private apiKey: string;
  private apiUrl = 'https://api.web3forms.com/submit';

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '';
  }

  isConfigured(): boolean {
    return !!this.apiKey;
  }

  async send(data: EmailData): Promise<EmailResponse> {
    if (!this.isConfigured()) {
      return {
        success: false,
        error: 'Web3Forms is not properly configured. Check environment variables.',
      };
    }

    try {
      const formData = {
        access_key: this.apiKey,
        subject: data.subject,
        from_name: data.name,
        email: data.email,
        phone: data.phone || '',
        company: data.company || '',
        project_type: data.projectType || '',
        budget: data.budget || '',
        timeline: data.timeline || '',
        message: data.message || '',
        to_email: data.to || process.env.NEXT_PUBLIC_CONTACT_EMAIL,
        // Web3Forms specific fields
        botcheck: false,
        redirect: false,
      };

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        return {
          success: true,
          messageId: result.message,
        };
      }

      return {
        success: false,
        error: result.message || 'Failed to send email',
      };
    } catch (error) {
      console.error('Web3Forms error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send email',
      };
    }
  }
}