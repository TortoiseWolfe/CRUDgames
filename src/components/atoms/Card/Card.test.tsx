import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders children correctly', () => {
    render(
      <Card>
        <p>Card content</p>
      </Card>
    );
    
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { container, rerender } = render(<Card variant="flat">Content</Card>);
    expect(container.firstChild).toHaveClass('bg-transparent');
    
    rerender(<Card variant="elevated">Content</Card>);
    expect(container.firstChild).toHaveClass('bg-white', 'shadow-md');
    
    rerender(<Card variant="outlined">Content</Card>);
    expect(container.firstChild).toHaveClass('bg-transparent', 'border', 'border-gray-200');
    
    rerender(<Card variant="filled">Content</Card>);
    expect(container.firstChild).toHaveClass('bg-gray-50');
  });

  it('applies padding classes correctly', () => {
    const { container, rerender } = render(<Card padding="none">Content</Card>);
    expect(container.firstChild).not.toHaveClass('p-2', 'p-4', 'p-6', 'p-8');
    
    rerender(<Card padding="sm">Content</Card>);
    expect(container.firstChild).toHaveClass('p-2');
    
    rerender(<Card padding="lg">Content</Card>);
    expect(container.firstChild).toHaveClass('p-6');
  });

  it('applies shadow classes correctly', () => {
    const { container } = render(<Card shadow="xl">Content</Card>);
    expect(container.firstChild).toHaveClass('shadow-xl');
  });

  it('applies rounded classes correctly', () => {
    const { container, rerender } = render(<Card rounded="none">Content</Card>);
    expect(container.firstChild).toHaveClass('rounded-none');
    
    rerender(<Card rounded="full">Content</Card>);
    expect(container.firstChild).toHaveClass('rounded-full');
  });

  it('handles click events when clickable', () => {
    const handleClick = vi.fn();
    render(
      <Card clickable onClick={handleClick}>
        Click me
      </Card>
    );
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('handles keyboard events when clickable', () => {
    const handleClick = vi.fn();
    render(
      <Card clickable onClick={handleClick}>
        Press me
      </Card>
    );
    
    const card = screen.getByText('Press me').parentElement;
    
    fireEvent.keyDown(card!, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(1);
    
    fireEvent.keyDown(card!, { key: ' ' });
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it('applies hoverable styles', () => {
    const { container } = render(<Card hoverable>Hover me</Card>);
    expect(container.firstChild).toHaveClass('hover:shadow-lg');
  });

  it('renders with custom component type', () => {
    const { container } = render(
      <Card as="article">
        Article content
      </Card>
    );
    
    expect(container.querySelector('article')).toBeInTheDocument();
  });

  it('renders header and footer', () => {
    render(
      <Card
        header={<h2>Card Header</h2>}
        footer={<button>Card Footer</button>}
      >
        Main content
      </Card>
    );
    
    expect(screen.getByText('Card Header')).toBeInTheDocument();
    expect(screen.getByText('Main content')).toBeInTheDocument();
    expect(screen.getByText('Card Footer')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Card className="custom-class">
        Content
      </Card>
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('applies ARIA attributes correctly', () => {
    const { container } = render(
      <Card
        role="article"
        ariaLabel="Test card"
        ariaLabelledBy="card-title"
        ariaDescribedBy="card-desc"
      >
        Content
      </Card>
    );
    
    const card = container.firstChild;
    expect(card).toHaveAttribute('role', 'article');
    expect(card).toHaveAttribute('aria-label', 'Test card');
    expect(card).toHaveAttribute('aria-labelledby', 'card-title');
    expect(card).toHaveAttribute('aria-describedby', 'card-desc');
  });

  it('sets correct role for interactive cards', () => {
    const { container } = render(
      <Card clickable onClick={() => {}}>
        Interactive
      </Card>
    );
    
    expect(container.firstChild).toHaveAttribute('role', 'button');
    expect(container.firstChild).toHaveAttribute('tabIndex', '0');
  });

  it('does not trigger click when disabled', () => {
    const handleClick = vi.fn();
    render(
      <Card clickable onClick={handleClick} disabled>
        Disabled card
      </Card>
    );
    
    fireEvent.click(screen.getByText('Disabled card'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('combines multiple props correctly', () => {
    const { container } = render(
      <Card
        variant="elevated"
        padding="lg"
        rounded="xl"
        hoverable
        clickable
        className="test-card"
      >
        Complex card
      </Card>
    );
    
    const card = container.firstChild;
    expect(card).toHaveClass('bg-white', 'shadow-md', 'p-6', 'rounded-xl', 'test-card');
    expect(card).toHaveClass('hover:shadow-lg');
    expect(card).toHaveAttribute('tabIndex', '0');
  });
});