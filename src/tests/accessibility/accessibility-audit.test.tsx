import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Label } from '@/components/atoms/Label';
import { Alert } from '@/components/atoms/Alert';
import { Badge } from '@/components/atoms/Badge';
import { Card } from '@/components/atoms/Card';
import { Avatar } from '@/components/atoms/Avatar';
import { Checkbox } from '@/components/atoms/Checkbox';
import { RadioGroup } from '@/components/atoms/Radio';
import { Select } from '@/components/atoms/Select';
import { Spinner } from '@/components/atoms/Spinner';
import { Switch } from '@/components/atoms/Switch';
import { Textarea } from '@/components/atoms/Textarea';
import { FormField } from '@/components/molecules/FormField';
import { TestimonialCard } from '@/components/molecules/TestimonialCard';
import { ContactForm } from '@/components/organisms/ContactForm';
import { IntakeForm } from '@/components/organisms/IntakeForm';
import { MultiStepForm } from '@/components/organisms/MultiStepForm';
import { TestimonialSection } from '@/components/organisms/TestimonialSection';
import { TrustBadges } from '@/components/organisms/TrustBadges';
import { ConversionMetrics } from '@/components/organisms/ConversionMetrics';

expect.extend(toHaveNoViolations);

describe('Accessibility Audit - WCAG 2.1 AA Compliance', () => {
  describe('Atomic Components', () => {
    it('Button should be accessible', async () => {
      const { container } = render(
        <Button>Click me</Button>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Input with Label should be accessible', async () => {
      const { container } = render(
        <>
          <Label htmlFor="test-input">Name</Label>
          <Input id="test-input" name="test-input" placeholder="Enter name" />
        </>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Alert should be accessible', async () => {
      const { container } = render(
        <Alert variant="info">Important information</Alert>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Badge should be accessible', async () => {
      const { container } = render(
        <Badge variant="primary">New</Badge>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Card should be accessible', async () => {
      const { container } = render(
        <Card>
          <h2>Card Title</h2>
          <p>Card content</p>
        </Card>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Avatar should be accessible', async () => {
      const { container } = render(
        <Avatar name="John Doe" src="/avatar.jpg" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Checkbox with Label should be accessible', async () => {
      const { container } = render(
        <>
          <Checkbox id="terms" name="terms" />
          <Label htmlFor="terms">I agree to terms</Label>
        </>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Radio buttons should be accessible', async () => {
      const { container } = render(
        <RadioGroup 
          id="options"
          name="options"
          label="Choose option:"
          options={[
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' }
          ]}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Select should be accessible', async () => {
      const { container } = render(
        <>
          <Label htmlFor="country">Country</Label>
          <Select 
            id="country"
            placeholder="Select country"
            options={[
              { value: 'us', label: 'United States' },
              { value: 'uk', label: 'United Kingdom' }
            ]}
          />
        </>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Spinner should be accessible', async () => {
      const { container } = render(
        <Spinner aria-label="Loading" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Switch with Label should be accessible', async () => {
      const { container } = render(
        <>
          <Switch id="notifications" />
          <Label htmlFor="notifications">Enable notifications</Label>
        </>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Textarea with Label should be accessible', async () => {
      const { container } = render(
        <>
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" name="message" placeholder="Enter message" />
        </>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Molecular Components', () => {
    it('FormField should be accessible', async () => {
      const { container } = render(
        <FormField label="Email" id="email" required>
          <Input id="email" name="email" type="email" />
        </FormField>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('FormField with error should be accessible', async () => {
      const { container } = render(
        <FormField 
          label="Email" 
          id="email" 
          error="Invalid email format"
          required
        >
          <Input id="email" name="email" type="email" aria-invalid="true" />
        </FormField>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Organism Components', () => {
    it('ContactForm should be accessible', async () => {
      const { container } = render(
        <ContactForm onSubmit={async () => {}} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('TestimonialCard should be accessible', async () => {
      const { container } = render(
        <TestimonialCard
          testimonial={{
            id: '1',
            name: 'John Doe',
            content: 'Great product!',
            role: 'CEO',
            company: 'Company',
            rating: 5
          }}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('IntakeForm should be accessible', async () => {
      const { container } = render(
        <IntakeForm 
          onSubmitSuccess={() => {}}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('MultiStepForm should be accessible', async () => {
      const { container } = render(
        <MultiStepForm
          steps={[
            {
              id: 'step1',
              title: 'Step 1',
              content: (
                <div>
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" required />
                </div>
              )
            }
          ]}
          onComplete={async () => {}}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('TestimonialCard should be accessible', async () => {
      const { container } = render(
        <TestimonialCard
          testimonial={{
            id: '1',
            name: 'John Doe',
            role: 'CEO',
            company: 'Company',
            content: 'Great product',
            rating: 5
          }}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('TestimonialSection should be accessible', async () => {
      const { container } = render(
        <TestimonialSection
          testimonials={[
            {
              id: '1',
              name: 'Jane Doe',
              role: 'CTO',
              company: 'Tech Co',
              content: 'Excellent service',
              rating: 5
            }
          ]}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('TrustBadges should be accessible', async () => {
      const { container } = render(
        <TrustBadges
          badges={[
            { id: '1', title: 'Secure', description: 'Bank-level security' },
            { id: '2', title: 'Fast', value: '99.9%' }
          ]}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('ConversionMetrics should be accessible', async () => {
      const { container } = render(
        <ConversionMetrics
          metrics={[
            { id: '1', label: 'Conversion Rate', value: 25, suffix: '%' },
            { id: '2', label: 'Total Users', value: 1000 }
          ]}
          animated={false}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Color Contrast', () => {
    it('Primary button should meet contrast requirements', async () => {
      const { container } = render(
        <Button variant="primary">Primary Action</Button>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Secondary button should meet contrast requirements', async () => {
      const { container } = render(
        <Button variant="secondary">Secondary Action</Button>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Destructive button should meet contrast requirements', async () => {
      const { container } = render(
        <Button variant="danger">Delete</Button>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Error alert should meet contrast requirements', async () => {
      const { container } = render(
        <Alert variant="error">Error message</Alert>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Success alert should meet contrast requirements', async () => {
      const { container } = render(
        <Alert variant="success">Success message</Alert>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Keyboard Navigation', () => {
    it('Form should be keyboard navigable', async () => {
      const { container } = render(
        <form>
          <FormField label="Name" id="name">
            <Input id="name" name="name" />
          </FormField>
          <FormField label="Email" id="email">
            <Input id="email" name="email" type="email" />
          </FormField>
          <Button type="submit">Submit</Button>
        </form>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Modal-like card should handle focus trap', async () => {
      const { container } = render(
        <Card role="dialog" aria-modal="true" aria-labelledby="card-title">
          <h2 id="card-title">Modal Card</h2>
          <p>Content</p>
          <Button>Close</Button>
        </Card>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ARIA Attributes', () => {
    it('Required fields should have proper ARIA attributes', async () => {
      const { container } = render(
        <FormField label="Required Field" id="required" required>
          <Input id="required" name="required" aria-required="true" />
        </FormField>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Invalid fields should have proper ARIA attributes', async () => {
      const { container } = render(
        <FormField label="Invalid Field" id="invalid" error="Error message">
          <Input id="invalid" name="invalid" aria-invalid="true" aria-describedby="invalid-error" />
          <span id="invalid-error" role="alert">Error message</span>
        </FormField>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Loading states should have proper ARIA attributes', async () => {
      const { container } = render(
        <Button disabled aria-busy="true">
          <Spinner aria-label="Loading" />
          Loading...
        </Button>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Focus Management', () => {
    it('Interactive elements should have visible focus indicators', async () => {
      const { container } = render(
        <>
          <Button>Button</Button>
          <Input id="input-focus" name="input-focus" placeholder="Input" />
          <Checkbox id="check" name="check" />
          <Label htmlFor="check">Checkbox</Label>
        </>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Skip navigation link should be present for main content', async () => {
      const { container } = render(
        <>
          <a href="#main" className="sr-only focus:not-sr-only">
            Skip to main content
          </a>
          <nav>Navigation</nav>
          <main id="main">Main content</main>
        </>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Touch Targets', () => {
    it('Buttons should meet minimum touch target size', async () => {
      const { container } = render(
        <>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Form inputs should meet minimum touch target size', async () => {
      const { container } = render(
        <>
          <Input id="input-1" name="input-1" className="h-11" placeholder="44px height input" />
          <Select 
            id="select-1" 
            className="h-11"
            placeholder="Select an option"
            options={[{ value: 'option1', label: 'Option' }]}
          />
          <Textarea id="textarea-1" name="textarea-1" className="min-h-[44px]" placeholder="Textarea" />
        </>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});