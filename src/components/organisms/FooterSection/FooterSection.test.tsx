import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FooterSection } from './FooterSection';

describe('FooterSection', () => {
  const mockNewsletterSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders company name', () => {
    render(<FooterSection companyName="CRUDgames" />);
    
    expect(screen.getByText('CRUDgames')).toBeInTheDocument();
  });

  it('renders company description when provided', () => {
    render(
      <FooterSection 
        companyName="CRUDgames"
        companyDescription="Building amazing games"
      />
    );
    
    expect(screen.getByText('Building amazing games')).toBeInTheDocument();
  });

  it('renders current year in copyright', () => {
    render(<FooterSection companyName="CRUDgames" />);
    
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
  });

  it('renders footer columns when provided', () => {
    const columns = [
      {
        title: 'Company',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Team', href: '/team' }
        ]
      },
      {
        title: 'Support',
        links: [
          { label: 'Help', href: '/help' },
          { label: 'Contact', href: '/contact' }
        ]
      }
    ];
    
    render(
      <FooterSection 
        companyName="CRUDgames"
        columns={columns}
      />
    );
    
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Team')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
    expect(screen.getByText('Help')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders social links when provided', () => {
    const socialLinks = [
      { platform: 'twitter' as const, url: 'https://twitter.com' },
      { platform: 'github' as const, url: 'https://github.com' }
    ];
    
    render(
      <FooterSection 
        companyName="CRUDgames"
        socialLinks={socialLinks}
      />
    );
    
    const twitterLink = screen.getByRole('link', { name: /twitter/i });
    const githubLink = screen.getByRole('link', { name: /github/i });
    
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com');
    expect(githubLink).toHaveAttribute('href', 'https://github.com');
  });

  it('renders contact information when provided', () => {
    render(
      <FooterSection 
        companyName="CRUDgames"
        contactInfo={{
          email: 'info@crudgames.com',
          phone: '+1 234 567 8900',
          address: '123 Game Street'
        }}
      />
    );
    
    expect(screen.getByText('info@crudgames.com')).toBeInTheDocument();
    expect(screen.getByText('+1 234 567 8900')).toBeInTheDocument();
    expect(screen.getByText('123 Game Street')).toBeInTheDocument();
  });

  it('renders newsletter section when callback provided', () => {
    render(
      <FooterSection 
        companyName="CRUDgames"
        onNewsletterSubmit={mockNewsletterSubmit}
      />
    );
    
    expect(screen.getByText(/newsletter/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
  });

  it('handles newsletter submission', () => {
    render(
      <FooterSection 
        companyName="CRUDgames"
        onNewsletterSubmit={mockNewsletterSubmit}
      />
    );
    
    const emailInput = screen.getByPlaceholderText(/email/i);
    const submitButton = screen.getByRole('button', { name: /subscribe/i });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);
    
    expect(mockNewsletterSubmit).toHaveBeenCalledWith('test@example.com');
  });

  it('shows back to top button when enabled', () => {
    render(
      <FooterSection 
        companyName="CRUDgames"
        showBackToTop={true}
      />
    );
    
    const backToTopButton = screen.getByRole('button', { name: /back to top/i });
    expect(backToTopButton).toBeInTheDocument();
  });

  it('scrolls to top when back to top button is clicked', () => {
    const scrollToSpy = vi.fn();
    window.scrollTo = scrollToSpy;
    
    render(
      <FooterSection 
        companyName="CRUDgames"
        showBackToTop={true}
      />
    );
    
    const backToTopButton = screen.getByRole('button', { name: /back to top/i });
    fireEvent.click(backToTopButton);
    
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('applies variant classes', () => {
    const { container } = render(
      <FooterSection 
        companyName="CRUDgames"
        variant="modern"
      />
    );
    
    const footer = container.querySelector('footer');
    expect(footer).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <FooterSection 
        companyName="CRUDgames"
        className="custom-footer"
      />
    );
    
    const footer = container.querySelector('footer');
    expect(footer).toHaveClass('custom-footer');
  });

  it('renders default legal links', () => {
    render(
      <FooterSection 
        companyName="CRUDgames"
      />
    );
    
    // Default links should be present
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
  });
});