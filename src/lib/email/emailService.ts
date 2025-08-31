import emailjs from '@emailjs/browser';

export interface EmailConfig {
  provider: 'emailjs' | 'web3forms' | 'resend';
  serviceId?: string;
  templateId?: string;
  publicKey?: string;
  apiKey?: string;
}

export interface EmailData {
  to?: string;
  from?: string;
  subject?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  company?: string;
  projectType?: string;
  message?: string;
  [key: string]: string | undefined;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  error?: unknown;
}

class EmailService {
  private config: EmailConfig | null = null;

  initialize(config: EmailConfig) {
    this.config = config;

    if (config.provider === 'emailjs' && config.publicKey) {
      emailjs.init(config.publicKey);
    }
  }

  async send(data: EmailData): Promise<EmailResponse> {
    if (!this.config) {
      return {
        success: false,
        message: 'Email service not configured',
      };
    }

    try {
      switch (this.config.provider) {
        case 'emailjs':
          return await this.sendWithEmailJS(data);
        case 'web3forms':
          return await this.sendWithWeb3Forms(data);
        case 'resend':
          return await this.sendWithResend(data);
        default:
          return {
            success: false,
            message: 'Unknown email provider',
          };
      }
    } catch (error) {
      console.error('Email send error:', error);
      return {
        success: false,
        message: 'Failed to send email',
        error,
      };
    }
  }

  private async sendWithEmailJS(data: EmailData): Promise<EmailResponse> {
    if (!this.config?.serviceId || !this.config?.templateId) {
      return {
        success: false,
        message: 'EmailJS configuration incomplete',
      };
    }

    try {
      const templateParams = {
        to_email: data.to || process.env.NEXT_PUBLIC_CONTACT_EMAIL,
        from_name: `${data.firstName || ''} ${data.lastName || ''}`.trim(),
        from_email: data.email,
        phone: data.phone || 'Not provided',
        company: data.company || 'Not provided',
        project_type: data.projectType || 'Not specified',
        message: data.message || 'No message provided',
        ...data,
      };

      const response = await emailjs.send(
        this.config.serviceId,
        this.config.templateId,
        templateParams
      );

      if (response.status === 200) {
        return {
          success: true,
          message: 'Email sent successfully',
        };
      } else {
        return {
          success: false,
          message: 'Failed to send email',
          error: response,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'EmailJS error',
        error,
      };
    }
  }

  private async sendWithWeb3Forms(data: EmailData): Promise<EmailResponse> {
    if (!this.config?.apiKey) {
      return {
        success: false,
        message: 'Web3Forms API key not configured',
      };
    }

    try {
      const formData = {
        access_key: this.config.apiKey,
        subject: data.subject || 'New Form Submission',
        from_name: `${data.firstName || ''} ${data.lastName || ''}`.trim(),
        email: data.email,
        phone: data.phone,
        company: data.company,
        project_type: data.projectType,
        message: data.message || this.formatMessage(data),
      };

      const response = await fetch('https://api.web3forms.com/submit', {
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
          message: 'Email sent successfully',
        };
      } else {
        return {
          success: false,
          message: result.message || 'Failed to send email',
          error: result,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Web3Forms error',
        error,
      };
    }
  }

  private async sendWithResend(data: EmailData): Promise<EmailResponse> {
    if (!this.config?.apiKey) {
      return {
        success: false,
        message: 'Resend API key not configured',
      };
    }

    try {
      const emailContent = {
        from: data.from || 'noreply@crudgames.com',
        to: data.to || process.env.NEXT_PUBLIC_CONTACT_EMAIL || '',
        subject: data.subject || 'New Form Submission',
        html: this.formatHtmlEmail(data),
      };

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify(emailContent),
      });

      const result = await response.json();

      if (response.ok) {
        return {
          success: true,
          message: 'Email sent successfully',
        };
      } else {
        return {
          success: false,
          message: result.message || 'Failed to send email',
          error: result,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Resend error',
        error,
      };
    }
  }

  private formatMessage(data: EmailData): string {
    const lines = [
      `Name: ${data.firstName || ''} ${data.lastName || ''}`.trim(),
      `Email: ${data.email}`,
      data.phone && `Phone: ${data.phone}`,
      data.company && `Company: ${data.company}`,
      data.projectType && `Project Type: ${data.projectType}`,
      data.message && `\nMessage:\n${data.message}`,
    ].filter(Boolean);

    return lines.join('\n');
  }

  private formatHtmlEmail(data: EmailData): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #4F46E5; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .value { margin-top: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${data.firstName || ''} ${data.lastName || ''}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${data.email}</div>
              </div>
              ${data.phone ? `
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value">${data.phone}</div>
              </div>
              ` : ''}
              ${data.company ? `
              <div class="field">
                <div class="label">Company:</div>
                <div class="value">${data.company}</div>
              </div>
              ` : ''}
              ${data.projectType ? `
              <div class="field">
                <div class="label">Project Type:</div>
                <div class="value">${data.projectType}</div>
              </div>
              ` : ''}
              ${data.message ? `
              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${data.message}</div>
              </div>
              ` : ''}
            </div>
          </div>
        </body>
      </html>
    `;
  }
}

// Create singleton instance
const emailService = new EmailService();

// Initialize with environment variables if available
if (typeof window !== 'undefined') {
  const provider = process.env.NEXT_PUBLIC_EMAIL_PROVIDER as EmailConfig['provider'];
  
  if (provider === 'emailjs') {
    emailService.initialize({
      provider: 'emailjs',
      serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    });
  } else if (provider === 'web3forms') {
    emailService.initialize({
      provider: 'web3forms',
      apiKey: process.env.NEXT_PUBLIC_WEB3FORMS_API_KEY,
    });
  } else if (provider === 'resend') {
    emailService.initialize({
      provider: 'resend',
      apiKey: process.env.NEXT_PUBLIC_RESEND_API_KEY,
    });
  }
}

export default emailService;