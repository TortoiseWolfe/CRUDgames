# Email Providers PRP

## System Overview

### Purpose
Comprehensive email service integration options for form submissions, providing flexibility to choose between multiple providers based on privacy requirements, pricing, features, and ease of setup.

### Business Value
- **Problem it solves**: Email delivery for contact forms with provider flexibility
- **Target users**: Developers needing email integration
- **Success metrics**: Delivery rate > 95%, setup time < 30 minutes, cost optimization

## Provider Comparison

### Quick Comparison Table

| Provider | Type | Free Tier | Setup Time | Privacy | Best For |
|----------|------|-----------|------------|---------|----------|
| **Web3Forms** | API | 250/month | 5 min | Excellent | Quick setup, privacy-focused |
| **EmailJS** | Client-side | 200/month | 15 min | Good | Templates, no backend |
| **Resend** | API | 100/day | 10 min | Good | React emails, DX |
| **SendGrid** | API | 100/day | 20 min | Standard | High volume |
| **Mailgun** | API | 1000/month | 15 min | Standard | Transactional |
| **Postmark** | API | 100/month | 15 min | Good | Transactional |

## Provider Specifications

### Web3Forms (Recommended for Privacy)

#### Overview
- **Type**: Serverless API
- **Setup**: Just an access key, no account required
- **Privacy**: No data storage, GDPR compliant by design
- **Pricing**: Free up to 250 submissions/month

#### Implementation
```typescript
interface Web3FormsConfig {
  accessKey: string;
  endpoint?: string; // Default: https://api.web3forms.com/submit
}

const sendWithWeb3Forms = async (data: FormData): Promise<void> => {
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
      subject: `New Contact from ${data.name}`,
      from_name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      message: data.message,
      // Optional features
      redirect: 'https://web3forms.com/success',
      botcheck: true, // Spam protection
      replyto: data.email
    })
  });

  if (!response.ok) {
    throw new Error('Failed to send email');
  }
};
```

#### Environment Variables
```env
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

#### Pros & Cons
✅ **Pros:**
- No account required
- Excellent privacy (no data storage)
- Simple API
- Built-in spam protection
- Webhooks support
- Custom SMTP option

❌ **Cons:**
- Limited free tier (250/month)
- No email templates
- No analytics dashboard
- Less features than alternatives

### EmailJS (Best for Client-Side)

#### Overview
- **Type**: Client-side service
- **Setup**: Account + email service + template
- **Privacy**: Data passes through EmailJS servers
- **Pricing**: Free up to 200 emails/month

#### Implementation
```typescript
import emailjs from '@emailjs/browser';

interface EmailJSConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

const sendWithEmailJS = async (data: FormData): Promise<void> => {
  emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
  
  const templateParams = {
    to_email: 'admin@company.com',
    from_name: data.name,
    from_email: data.email,
    phone: data.phone,
    company: data.company || 'Not provided',
    message: data.message,
    submitted_at: new Date().toISOString()
  };

  const response = await emailjs.send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
    templateParams
  );

  if (response.status !== 200) {
    throw new Error('Failed to send email');
  }
};
```

#### Environment Variables
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxx
```

#### Pros & Cons
✅ **Pros:**
- No backend required
- Email templates
- Multiple email services
- Analytics dashboard
- Auto-responses
- File attachments

❌ **Cons:**
- Requires account setup
- Public key exposed
- Limited free tier
- Template management overhead

### Resend (Best Developer Experience)

#### Overview
- **Type**: API-based service
- **Setup**: API key + domain verification
- **Privacy**: Standard data processing
- **Pricing**: Free up to 100 emails/day

#### Implementation
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendWithResend = async (data: FormData): Promise<void> => {
  const { error } = await resend.emails.send({
    from: 'Contact Form <noreply@yourdomain.com>',
    to: ['admin@company.com'],
    subject: `New Contact from ${data.name}`,
    react: EmailTemplate({ ...data }), // React component
    text: `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`
  });

  if (error) {
    throw new Error(error.message);
  }
};

// React Email Template
import { Html, Text, Hr } from '@react-email/components';

export const EmailTemplate = ({ name, email, message }) => (
  <Html>
    <Text>New contact form submission</Text>
    <Hr />
    <Text>Name: {name}</Text>
    <Text>Email: {email}</Text>
    <Text>Message: {message}</Text>
  </Html>
);
```

#### Environment Variables
```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### Pros & Cons
✅ **Pros:**
- React email components
- Excellent DX
- Good documentation
- Webhooks
- Email validation
- Domain management

❌ **Cons:**
- Requires server/API route
- Domain verification needed
- Limited free tier

### SendGrid (Enterprise Scale)

#### Overview
- **Type**: API-based service
- **Setup**: Account + API key + sender verification
- **Privacy**: Standard enterprise policies
- **Pricing**: Free up to 100 emails/day

#### Implementation
```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const sendWithSendGrid = async (data: FormData): Promise<void> => {
  const msg = {
    to: 'admin@company.com',
    from: 'noreply@yourdomain.com',
    subject: `New Contact from ${data.name}`,
    text: `Contact form submission...`,
    html: `<strong>Name:</strong> ${data.name}<br>...`,
  };

  await sgMail.send(msg);
};
```

#### Pros & Cons
✅ **Pros:**
- Enterprise features
- High deliverability
- Advanced analytics
- Marketing tools
- Scalable

❌ **Cons:**
- Complex setup
- Expensive at scale
- Overkill for simple forms

## Provider Selection Guide

### Choose Web3Forms if:
- Privacy is paramount
- You want quick setup (< 5 minutes)
- You don't need email templates
- Volume is < 250 emails/month
- You prefer serverless architecture

### Choose EmailJS if:
- You need client-side only solution
- You want email templates
- You need analytics dashboard
- You're building a static site
- Volume is < 200 emails/month

### Choose Resend if:
- You want the best developer experience
- You need React email components
- You have server/API routes
- You like modern tooling
- Volume is < 3,000 emails/month

### Choose SendGrid if:
- You need enterprise features
- High volume (> 10,000/month)
- Marketing automation required
- Advanced analytics needed
- Budget available

## Implementation Strategy

### Abstraction Layer
```typescript
// lib/email/provider.ts
export interface EmailProvider {
  send(data: FormData): Promise<void>;
}

export class EmailService {
  private provider: EmailProvider;

  constructor(providerType: 'web3forms' | 'emailjs' | 'resend') {
    switch (providerType) {
      case 'web3forms':
        this.provider = new Web3FormsProvider();
        break;
      case 'emailjs':
        this.provider = new EmailJSProvider();
        break;
      case 'resend':
        this.provider = new ResendProvider();
        break;
    }
  }

  async send(data: FormData): Promise<void> {
    return this.provider.send(data);
  }
}

// Usage
const emailService = new EmailService(
  process.env.NEXT_PUBLIC_EMAIL_PROVIDER as any
);
await emailService.send(formData);
```

### Environment Configuration
```env
# Choose one provider
NEXT_PUBLIC_EMAIL_PROVIDER=web3forms

# Web3Forms
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=xxxxxxxx

# OR EmailJS
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxx

# OR Resend (server-side)
RESEND_API_KEY=re_xxx
```

## Security Considerations

### Client-Side Services (Web3Forms, EmailJS)
- ⚠️ Access keys visible in browser
- ✅ Use rate limiting
- ✅ Implement honeypot fields
- ✅ Add CAPTCHA for additional protection
- ✅ Validate on form level

### Server-Side Services (Resend, SendGrid)
- ✅ API keys hidden from client
- ✅ Better rate limiting control
- ✅ Server-side validation
- ✅ More secure overall
- ⚠️ Requires API route/backend

## Testing Strategy

### Local Development
```typescript
// Mock email service for development
class MockEmailProvider implements EmailProvider {
  async send(data: FormData): Promise<void> {
    console.log('📧 Email would be sent:', data);
    return Promise.resolve();
  }
}
```

### Integration Testing
```typescript
describe('Email Providers', () => {
  it('sends via Web3Forms', async () => {
    const provider = new Web3FormsProvider();
    await expect(provider.send(mockData)).resolves.not.toThrow();
  });

  it('handles provider errors gracefully', async () => {
    const provider = new EmailJSProvider();
    await expect(provider.send(invalidData)).rejects.toThrow();
  });
});
```

## Migration Guide

### From EmailJS to Web3Forms
```typescript
// Before (EmailJS)
await emailjs.send(serviceId, templateId, params, publicKey);

// After (Web3Forms)
await fetch('https://api.web3forms.com/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    access_key: key,
    ...params
  })
});
```

### From Web3Forms to Resend
```typescript
// Before (Web3Forms - client-side)
await fetch('https://api.web3forms.com/submit', {...});

// After (Resend - API route)
// app/api/contact/route.ts
await resend.emails.send({...});
```

## Cost Analysis

### Monthly Cost Comparison (1,000 emails)
- **Web3Forms**: $8 (1,000 email plan)
- **EmailJS**: $9 (1,200 email plan)
- **Resend**: $0 (within free tier)
- **SendGrid**: $0 (within free tier)
- **Mailgun**: $0 (within free tier)

### Annual Cost (10,000 emails/month)
- **Web3Forms**: $192/year
- **EmailJS**: $108/year
- **Resend**: $240/year
- **SendGrid**: $180/year

## Acceptance Criteria

### Provider Implementation
- [ ] At least 2 providers implemented
- [ ] Abstraction layer created
- [ ] Environment variables documented
- [ ] Error handling implemented
- [ ] Rate limiting configured
- [ ] Testing coverage > 80%

### Documentation
- [ ] Setup guide for each provider
- [ ] Migration guide between providers
- [ ] Security best practices
- [ ] Cost comparison updated
- [ ] Example implementations

### Quality Gates
- [ ] Delivery rate > 95%
- [ ] Setup time < 30 minutes
- [ ] No exposed secrets
- [ ] Graceful error handling
- [ ] Provider switching < 1 hour

## Related PRPs
- `IntakeForm.prp.md` - Form implementation
- `SecurityRequirements.prp.md` - Security standards
- `DockerEnvironment.prp.md` - Development setup

---
**Last Updated**: 2025-08-30
**Version**: 1.0.0
**Recommendation**: Web3Forms for privacy, EmailJS for features, Resend for DX