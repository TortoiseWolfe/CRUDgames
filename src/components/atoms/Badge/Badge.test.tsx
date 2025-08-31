import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders with default props', () => {
    render(<Badge>Default Badge</Badge>);
    expect(screen.getByText('Default Badge')).toBeInTheDocument();
  });

  it('renders different variants', () => {
    const { rerender } = render(<Badge variant="primary">Primary</Badge>);
    expect(screen.getByText('Primary')).toHaveClass('bg-blue-100', 'text-blue-800');

    rerender(<Badge variant="default">Default</Badge>);
    expect(screen.getByText('Default')).toHaveClass('bg-gray-100', 'text-gray-800');

    rerender(<Badge variant="success">Success</Badge>);
    expect(screen.getByText('Success')).toHaveClass('bg-green-100', 'text-green-800');

    rerender(<Badge variant="warning">Warning</Badge>);
    expect(screen.getByText('Warning')).toHaveClass('bg-yellow-100', 'text-yellow-800');

    rerender(<Badge variant="danger">Danger</Badge>);
    expect(screen.getByText('Danger')).toHaveClass('bg-red-100', 'text-red-800');

    rerender(<Badge variant="info">Info</Badge>);
    expect(screen.getByText('Info')).toHaveClass('bg-cyan-100', 'text-cyan-800');
  });

  it('renders different sizes', () => {
    const { rerender } = render(<Badge size="sm">Small</Badge>);
    expect(screen.getByText('Small')).toHaveClass('px-2', 'py-0.5', 'text-xs');

    rerender(<Badge size="md">Medium</Badge>);
    expect(screen.getByText('Medium')).toHaveClass('px-2.5', 'py-1', 'text-sm');

    rerender(<Badge size="lg">Large</Badge>);
    expect(screen.getByText('Large')).toHaveClass('px-3', 'py-1.5', 'text-base');
  });

  it('renders with default rounded style', () => {
    render(<Badge>Rounded Badge</Badge>);
    expect(screen.getByText('Rounded Badge')).toHaveClass('rounded-full');
  });

  it('renders with icon', () => {
    render(
      <Badge icon={<span data-testid="badge-icon">✓</span>}>
        Badge with Icon
      </Badge>
    );
    expect(screen.getByTestId('badge-icon')).toBeInTheDocument();
  });

  it('handles removable badges', () => {
    const onRemove = vi.fn();
    render(
      <Badge removable onRemove={onRemove}>
        Removable Badge
      </Badge>
    );

    const removeButton = screen.getByRole('button', { name: /remove/i });
    expect(removeButton).toBeInTheDocument();
    
    fireEvent.click(removeButton);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(<Badge className="custom-badge">Custom Badge</Badge>);
    expect(screen.getByText('Custom Badge')).toHaveClass('custom-badge');
  });

  it('renders as different HTML elements', () => {
    const { rerender, container } = render(<Badge as="div">Div Badge</Badge>);
    expect(container.querySelector('div')).toHaveTextContent('Div Badge');

    rerender(<Badge as="button">Button Badge</Badge>);
    expect(screen.getByRole('button')).toHaveTextContent('Button Badge');
  });

  it('handles onClick on badge span', () => {
    const onClick = vi.fn();
    render(
      <Badge onClick={onClick}>
        Clickable Badge
      </Badge>
    );

    fireEvent.click(screen.getByText('Clickable Badge'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders children content correctly', () => {
    render(
      <Badge>
        <span data-testid="child-1">Text</span>
        <span data-testid="child-2">Content</span>
      </Badge>
    );
    
    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
  });
});