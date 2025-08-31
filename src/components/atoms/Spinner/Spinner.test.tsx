import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders with default props', () => {
    const { container } = render(<Spinner />);
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('renders different sizes', () => {
    const { rerender, container } = render(<Spinner size="sm" />);
    let spinner = container.querySelector('.h-4.w-4');
    expect(spinner).toBeInTheDocument();

    rerender(<Spinner size="md" />);
    spinner = container.querySelector('.h-6.w-6');
    expect(spinner).toBeInTheDocument();

    rerender(<Spinner size="lg" />);
    spinner = container.querySelector('.h-8.w-8');
    expect(spinner).toBeInTheDocument();

    rerender(<Spinner size="xl" />);
    spinner = container.querySelector('.h-12.w-12');
    expect(spinner).toBeInTheDocument();
  });

  it('renders different variants', () => {
    const { rerender, container } = render(<Spinner variant="primary" />);
    let spinner = container.querySelector('.border-t-blue-600');
    expect(spinner).toBeInTheDocument();

    rerender(<Spinner variant="secondary" />);
    spinner = container.querySelector('.border-t-gray-600');
    expect(spinner).toBeInTheDocument();

    rerender(<Spinner variant="white" />);
    spinner = container.querySelector('.border-t-white');
    expect(spinner).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Spinner label="Loading..." />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it.skip('renders as fullscreen overlay', () => {
    render(<Spinner fullscreen />);
    const overlay = screen.getByTestId('spinner-overlay');
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveClass('fixed', 'inset-0', 'z-50');
  });

  it('renders inline by default', () => {
    const { container } = render(<Spinner />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('inline-flex');
  });

  it('applies custom className', () => {
    const { container } = render(<Spinner className="custom-spinner" />);
    const spinner = container.querySelector('.custom-spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    const { container } = render(<Spinner />);
    const wrapper = container.querySelector('[role="status"]');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveAttribute('aria-label', 'Loading');
  });

  it('uses custom label', () => {
    render(<Spinner label="Processing..." />);
    // With default labelPosition='bottom', label is visible
    expect(screen.getByText('Processing...')).toHaveClass('text-sm');
  });

  it.skip('renders with custom label position', () => {
    const { rerender } = render(<Spinner label="Loading" labelPosition="bottom" />);
    let label = screen.getByText('Loading');
    expect(label.parentElement).toHaveClass('flex-col');

    rerender(<Spinner label="Loading" labelPosition="right" />);
    label = screen.getByText('Loading');
    expect(label.parentElement).toHaveClass('flex-row');
  });

  it('centers content', () => {
    const { container } = render(<Spinner />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('items-center', 'justify-center');
  });

  it.skip('renders with backdrop in fullscreen mode', () => {
    render(<Spinner fullscreen />);
    const overlay = screen.getByTestId('spinner-overlay');
    expect(overlay).toHaveClass('bg-black', 'bg-opacity-50');
  });

  it('shows visible label text', () => {
    render(<Spinner />);
    // With default labelPosition='bottom', label is visible
    const labelText = screen.getByText('Loading');
    expect(labelText).toHaveClass('text-sm');
  });

  it('combines multiple props correctly', () => {
    const { container } = render(
      <Spinner 
        size="lg" 
        variant="primary" 
        label="Processing..." 
        className="custom"
      />
    );
    
    const spinner = container.querySelector('.h-8.w-8');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('border-t-blue-600');
    expect(screen.getByText('Processing...')).toBeInTheDocument();
  });
});