export interface EmailData {
  to?: string;
  from?: string;
  subject: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  source?: string;
  timestamp?: string;
}

export interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface EmailService {
  send(data: EmailData): Promise<EmailResponse>;
  isConfigured(): boolean;
}

export interface EmailConfig {
  provider: 'emailjs' | 'web3forms' | 'resend';
  apiKey?: string;
  serviceId?: string;
  templateId?: string;
  publicKey?: string;
  fromEmail?: string;
  fromName?: string;
}