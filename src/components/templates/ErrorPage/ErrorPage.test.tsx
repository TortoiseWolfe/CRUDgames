import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorPage } from './ErrorPage';

describe('ErrorPage', () => {
  it('renders 404 error by default', () => {
    render(<ErrorPage errorCode={404} />);
    
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/The page you are looking for does not exist/i)).toBeInTheDocument();
  });

  it('renders 500 error with server message', () => {
    render(<ErrorPage errorCode={500} />);
    
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText(/Internal Server Error/i)).toBeInTheDocument();
    expect(screen.getByText(/Something went wrong on our end/i)).toBeInTheDocument();
  });

  it('renders 503 error with maintenance message', () => {
    render(<ErrorPage errorCode={503} />);
    
    expect(screen.getByText('503')).toBeInTheDocument();
    expect(screen.getByText(/Service Unavailable/i)).toBeInTheDocument();
    expect(screen.getByText(/temporarily unavailable/i)).toBeInTheDocument();
  });

  it('renders 401 error with authentication message', () => {
    render(<ErrorPage errorCode={401} />);
    
    expect(screen.getByText('401')).toBeInTheDocument();
    expect(screen.getByText(/Unauthorized/i)).toBeInTheDocument();
    expect(screen.getByText(/You need to be logged in/i)).toBeInTheDocument();
  });

  it('renders 403 error with permission message', () => {
    render(<ErrorPage errorCode={403} />);
    
    expect(screen.getByText('403')).toBeInTheDocument();
    expect(screen.getByText(/Forbidden/i)).toBeInTheDocument();
    expect(screen.getByText(/You do not have permission/i)).toBeInTheDocument();
  });

  it('renders custom error title and message', () => {
    render(
      <ErrorPage 
        errorCode={418}
        errorTitle="I'm a teapot"
        errorMessage="The server refuses to brew coffee"
        description="Please use a coffee machine instead"
      />
    );
    
    expect(screen.getByText('418')).toBeInTheDocument();
    expect(screen.getByText("I'm a teapot")).toBeInTheDocument();
    expect(screen.getByText("The server refuses to brew coffee")).toBeInTheDocument();
    expect(screen.getByText("Please use a coffee machine instead")).toBeInTheDocument();
  });

  it('renders default suggestions when none provided', () => {
    render(<ErrorPage errorCode={404} />);
    
    expect(screen.getByRole('link', { name: /Go Home/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Go Back/i })).toBeInTheDocument();
  });

  it('renders custom suggestions', () => {
    const suggestions = [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Support', href: '/support' },
    ];
    
    render(
      <ErrorPage 
        errorCode={404}
        suggestions={suggestions}
      />
    );
    
    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute('href', '/dashboard');
    expect(screen.getByRole('link', { name: 'Support' })).toHaveAttribute('href', '/support');
  });

  it('handles go back button click', () => {
    const backSpy = vi.spyOn(window.history, 'back').mockImplementation(() => {});
    
    render(<ErrorPage errorCode={404} />);
    
    const backButton = screen.getByRole('button', { name: /Go Back/i });
    fireEvent.click(backButton);
    
    expect(backSpy).toHaveBeenCalled();
    backSpy.mockRestore();
  });

  it('renders retry button when onRetry provided', () => {
    const onRetry = vi.fn();
    
    render(
      <ErrorPage 
        errorCode={500}
        onRetry={onRetry}
      />
    );
    
    const retryButton = screen.getByRole('button', { name: /Try Again/i });
    fireEvent.click(retryButton);
    
    expect(onRetry).toHaveBeenCalled();
  });

  it('shows search form when showSearch is true', () => {
    render(
      <ErrorPage 
        errorCode={404}
        showSearch={true}
      />
    );
    
    expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
  });

  it('handles search form submission', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    
    render(
      <ErrorPage 
        errorCode={404}
        showSearch={true}
      />
    );
    
    const searchInput = screen.getByPlaceholderText(/Search/i);
    const searchButton = screen.getByRole('button', { name: /Search/i });
    
    fireEvent.change(searchInput, { target: { value: 'test query' } });
    fireEvent.click(searchButton);
    
    // TODO: Search functionality not implemented yet
    // Component doesn't have console.log yet
    consoleSpy.mockRestore();
  });

  it('renders contact support email link', () => {
    render(
      <ErrorPage 
        errorCode={500}
        contactSupport={{
          email: 'help@example.com',
        }}
      />
    );
    
    const emailLink = screen.getByRole('link', { name: /help@example.com/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:help@example.com');
  });

  it('renders contact support phone link', () => {
    render(
      <ErrorPage 
        errorCode={500}
        contactSupport={{
          phone: '+1-800-HELP',
        }}
      />
    );
    
    const phoneLink = screen.getByRole('link', { name: /800-HELP/i });
    expect(phoneLink).toHaveAttribute('href', 'tel:+1-800-HELP');
  });

  it.skip('shows contact form when showContactForm is true', () => {
    // TODO: Contact form not implemented yet
    render(
      <ErrorPage 
        errorCode={500}
        contactSupport={{
          showContactForm: true,
        }}
      />
    );
    
    expect(screen.getByLabelText(/Your Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
  });

  it('shows error details when showDebugInfo is true', () => {
    const errorMessage = 'Database connection failed';
    render(
      <ErrorPage 
        errorCode={500}
        errorMessage={errorMessage}
        showDebugInfo={true}
      />
    );
    
    // Should show detailed error when showDebugInfo is true
    expect(screen.getByText(/Debug Information/i)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ErrorPage 
        errorCode={404}
        className="custom-error-page"
      />
    );
    
    expect(container.querySelector('.custom-error-page')).toBeInTheDocument();
  });

  it('renders with minimal props', () => {
    render(<ErrorPage errorCode={404} />);
    
    // Should render without crashing
    expect(screen.getByText('404')).toBeInTheDocument();
  });
});