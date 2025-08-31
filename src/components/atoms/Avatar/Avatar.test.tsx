import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders with image when src provided', () => {
    const { container } = render(
      <Avatar
        src="/test-image.jpg"
        alt="Test User"
        name="Test User"
      />
    );
    
    const avatar = container.querySelector('[role="img"]');
    expect(avatar).toHaveAttribute('aria-label', 'Test User');
    expect(container.querySelector('img')).toBeInTheDocument();
  });

  it('renders initials when no image provided', () => {
    render(
      <Avatar name="John Doe" />
    );
    
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('generates correct initials from various name formats', () => {
    const { rerender } = render(<Avatar name="John Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
    
    rerender(<Avatar name="Jane" />);
    expect(screen.getByText('JA')).toBeInTheDocument();
    
    rerender(<Avatar name="Mary Jane Smith" />);
    expect(screen.getByText('MS')).toBeInTheDocument();
  });

  it('uses provided initials over generated ones', () => {
    render(
      <Avatar name="John Doe" initials="XY" />
    );
    
    expect(screen.getByText('XY')).toBeInTheDocument();
    expect(screen.queryByText('JD')).not.toBeInTheDocument();
  });

  it('renders fallback icon when no image or initials', () => {
    const { container } = render(<Avatar />);
    
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders custom fallback icon', () => {
    render(
      <Avatar fallbackIcon={<span data-testid="custom-icon">👤</span>} />
    );
    
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    const { container, rerender } = render(<Avatar size="xs" />);
    expect(container.firstChild).toHaveClass('h-6', 'w-6');
    
    rerender(<Avatar size="2xl" />);
    expect(container.firstChild).toHaveClass('h-24', 'w-24');
  });

  it('applies shape classes correctly', () => {
    const { container, rerender } = render(<Avatar shape="circle" />);
    expect(container.firstChild).toHaveClass('rounded-full');
    
    rerender(<Avatar shape="square" />);
    expect(container.firstChild).toHaveClass('rounded-none');
    
    rerender(<Avatar shape="rounded" />);
    expect(container.firstChild).toHaveClass('rounded-lg');
  });

  it('displays status indicator', () => {
    render(
      <Avatar name="John Doe" status="online" />
    );
    
    const statusDot = screen.getByLabelText('Status: online');
    expect(statusDot).toHaveClass('bg-green-500');
  });

  it('positions status indicator correctly', () => {
    const { rerender } = render(
      <Avatar status="online" statusPosition="top-right" />
    );
    
    let statusDot = screen.getByLabelText('Status: online');
    expect(statusDot).toHaveClass('top-0', 'right-0');
    
    rerender(<Avatar status="away" statusPosition="bottom-left" />);
    statusDot = screen.getByLabelText('Status: away');
    expect(statusDot).toHaveClass('bottom-0', 'left-0');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(
      <Avatar name="John Doe" onClick={handleClick} />
    );
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('handles keyboard events when clickable', () => {
    const handleClick = vi.fn();
    render(
      <Avatar name="John Doe" onClick={handleClick} />
    );
    
    const avatar = screen.getByRole('button');
    
    fireEvent.keyDown(avatar, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(1);
    
    fireEvent.keyDown(avatar, { key: ' ' });
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it('applies custom className', () => {
    const { container } = render(
      <Avatar className="custom-avatar" />
    );
    
    expect(container.firstChild).toHaveClass('custom-avatar');
  });

  it('has correct accessibility attributes', () => {
    const { rerender } = render(
      <Avatar name="John Doe" status="online" />
    );
    
    let avatar = screen.getByRole('img');
    expect(avatar).toHaveAttribute('aria-label', 'John Doe, online');
    
    rerender(
      <Avatar name="Jane Smith" onClick={() => {}} />
    );
    
    avatar = screen.getByRole('button');
    expect(avatar).toHaveAttribute('tabIndex', '0');
  });

  it('applies all status colors correctly', () => {
    const { rerender } = render(<Avatar status="online" />);
    expect(screen.getByLabelText(/Status:/)).toHaveClass('bg-green-500');
    
    rerender(<Avatar status="offline" />);
    expect(screen.getByLabelText(/Status:/)).toHaveClass('bg-gray-400');
    
    rerender(<Avatar status="away" />);
    expect(screen.getByLabelText(/Status:/)).toHaveClass('bg-yellow-500');
    
    rerender(<Avatar status="busy" />);
    expect(screen.getByLabelText(/Status:/)).toHaveClass('bg-red-500');
  });
});