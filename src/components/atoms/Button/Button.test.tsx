import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './Button.stories';
import { Button } from './Button';

// Compose all stories for testing
const { Primary, Secondary, Danger, Small, Medium, Large, Loading, Disabled, WithLeftIcon, WithRightIcon, FullWidth } = composeStories(stories);

describe('Button Component', () => {
  describe('Rendering', () => {
    it('renders with children text', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button')).toHaveTextContent('Click me');
    });

    it('renders Primary story correctly', () => {
      render(<Primary />);
      expect(screen.getByRole('button')).toHaveTextContent('Primary Button');
      expect(screen.getByRole('button')).toHaveClass('bg-blue-600');
    });

    it('renders Secondary story correctly', () => {
      render(<Secondary />);
      expect(screen.getByRole('button')).toHaveTextContent('Secondary Button');
      expect(screen.getByRole('button')).toHaveClass('bg-gray-200');
    });

    it('renders Danger story correctly', () => {
      render(<Danger />);
      expect(screen.getByRole('button')).toHaveTextContent('Delete Item');
      expect(screen.getByRole('button')).toHaveClass('bg-red-600');
    });

    it('renders size variants from stories', () => {
      const { rerender } = render(<Small />);
      expect(screen.getByRole('button')).toHaveClass('h-8');
      
      rerender(<Medium />);
      expect(screen.getByRole('button')).toHaveClass('h-10');
      
      rerender(<Large />);
      expect(screen.getByRole('button')).toHaveClass('h-12');
    });

    it('renders FullWidth story correctly', () => {
      render(<FullWidth />);
      expect(screen.getByRole('button')).toHaveClass('w-full');
      expect(screen.getByRole('button')).toHaveTextContent('Full Width Button');
    });

    it('renders WithLeftIcon story correctly', () => {
      render(<WithLeftIcon />);
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Download');
      // Check for SVG icon presence
      const svg = button.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('renders WithRightIcon story correctly', () => {
      render(<WithRightIcon />);
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Continue');
      // Check for SVG icon presence
      const svg = button.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('Interaction', () => {
    it('calls onClick handler when clicked', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick}>Click me</Button>);
      await user.click(screen.getByRole('button'));
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('Disabled story prevents interaction', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(<Disabled onClick={handleClick} />);
      await user.click(screen.getByRole('button'));
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('shows loading state from Loading story', () => {
      render(<Loading />);
      const button = screen.getByRole('button');
      
      expect(button).toBeDisabled();
      // Check for the spinner icon
      const spinner = button.querySelector('svg.animate-spin');
      expect(spinner).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      render(
        <Button aria-label="Custom label" aria-pressed="true">
          Accessible
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Custom label');
      expect(button).toHaveAttribute('aria-pressed', 'true');
    });

    it('is keyboard accessible', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick}>Keyboard</Button>);
      const button = screen.getByRole('button');
      
      // Tab to button
      await user.tab();
      expect(button).toHaveFocus();
      
      // Enter triggers click
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalled();
    });
  });
});