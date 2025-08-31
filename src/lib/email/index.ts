import { EmailJSService } from './emailjs';
import { Web3FormsService } from './web3forms';
import { ResendService } from './resend';
import type { EmailData, EmailResponse, EmailService } from './types';

export * from './types';

class UnifiedEmailService implements EmailService {
  private services: EmailService[];
  private primaryService: EmailService | null = null;

  constructor() {
    // Initialize all services
    const emailjs = new EmailJSService();
    const web3forms = new Web3FormsService();
    const resend = new ResendService();

    // Add configured services to the list
    this.services = [];
    
    // Check which services are configured and set priority
    const preferredProvider = process.env.NEXT_PUBLIC_EMAIL_PROVIDER;
    
    switch (preferredProvider) {
      case 'emailjs':
        if (emailjs.isConfigured()) this.primaryService = emailjs;
        break;
      case 'web3forms':
        if (web3forms.isConfigured()) this.primaryService = web3forms;
        break;
      case 'resend':
        if (resend.isConfigured()) this.primaryService = resend;
        break;
    }

    // If no preferred provider or it's not configured, use first available
    if (!this.primaryService) {
      if (emailjs.isConfigured()) {
        this.services.push(emailjs);
      }
      if (web3forms.isConfigured()) {
        this.services.push(web3forms);
      }
      if (resend.isConfigured()) {
        this.services.push(resend);
      }
      
      this.primaryService = this.services[0] || null;
    }
  }

  isConfigured(): boolean {
    return this.primaryService !== null;
  }

  async send(data: EmailData): Promise<EmailResponse> {
    if (!this.isConfigured()) {
      console.error('No email service is configured');
      return {
        success: false,
        error: 'No email service is configured. Please check your environment variables.',
      };
    }

    // Try primary service first
    if (this.primaryService) {
      const result = await this.primaryService.send(data);
      if (result.success) {
        return result;
      }
      
      console.warn('Primary email service failed, trying fallback services...');
    }

    // Try fallback services
    for (const service of this.services) {
      if (service !== this.primaryService) {
        const result = await service.send(data);
        if (result.success) {
          return result;
        }
      }
    }

    return {
      success: false,
      error: 'All email services failed. Please try again later.',
    };
  }
}

// Export singleton instance
let emailService: UnifiedEmailService;

export function getEmailService(): EmailService {
  if (!emailService) {
    emailService = new UnifiedEmailService();
  }
  return emailService;
}

// Convenience function for sending emails
export async function sendEmail(data: EmailData): Promise<EmailResponse> {
  const service = getEmailService();
  return service.send(data);
}