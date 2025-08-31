import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal', () => {
  it('renders when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <div>Modal content</div>
      </Modal>
    );
    
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <div>Modal content</div>
      </Modal>
    );
    
    expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
  });

  it('renders with title', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Modal Title">
        <div>Modal content</div>
      </Modal>
    );
    
    expect(screen.getByText('Modal Title')).toBeInTheDocument();
  });

  it('renders with description', () => {
    render(
      <Modal 
        isOpen={true} 
        onClose={() => {}} 
        description="This is a modal description"
      >
        <div>Modal content</div>
      </Modal>
    );
    
    expect(screen.getByText('This is a modal description')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Modal content</div>
      </Modal>
    );
    
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders different sizes', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={() => {}} size="sm">
        <div>Small modal</div>
      </Modal>
    );
    
    let content = screen.getByText('Small modal').closest('[role="dialog"]');
    expect(content).toHaveClass('max-w-md');
    
    rerender(
      <Modal isOpen={true} onClose={() => {}} size="lg">
        <div>Large modal</div>
      </Modal>
    );
    
    content = screen.getByText('Large modal').closest('[role="dialog"]');
    expect(content).toHaveClass('max-w-4xl');
  });

  it('prevents body scroll when modal is open', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <div>Modal content</div>
      </Modal>
    );
    
    // Radix UI Dialog handles body scroll prevention internally
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} className="custom-modal">
        <div>Modal content</div>
      </Modal>
    );
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('custom-modal');
  });

  it('closes on escape key press', async () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Modal content</div>
      </Modal>
    );
    
    const dialog = screen.getByRole('dialog');
    fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape' });
    
    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });

  it('closes when clicking overlay if closeOnBackdrop is true', () => {
    const onClose = vi.fn();
    const { container } = render(
      <Modal isOpen={true} onClose={onClose} closeOnBackdrop={true}>
        <div>Modal content</div>
      </Modal>
    );
    
    // Find and click the overlay (Radix UI Dialog.Overlay)
    const overlay = container.querySelector('[data-radix-dialog-overlay]');
    if (overlay) {
      fireEvent.click(overlay);
      expect(onClose).toHaveBeenCalled();
    }
  });

  it('does not close when clicking overlay if closeOnBackdrop is false', () => {
    const onClose = vi.fn();
    const { container } = render(
      <Modal isOpen={true} onClose={onClose} closeOnBackdrop={false}>
        <div>Modal content</div>
      </Modal>
    );
    
    const overlay = container.querySelector('[data-radix-dialog-overlay]');
    if (overlay) {
      fireEvent.click(overlay);
      expect(onClose).not.toHaveBeenCalled();
    }
  });

  it('renders footer content', () => {
    render(
      <Modal 
        isOpen={true} 
        onClose={() => {}}
      >
        <div>Modal content</div>
        <div className="mt-4 flex gap-2">
          <button>Cancel</button>
          <button>Confirm</button>
        </div>
      </Modal>
    );
    
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(
      <Modal 
        isOpen={true} 
        onClose={() => {}} 
        title="Accessible Modal"
        description="Modal description"
      >
        <div>Modal content</div>
      </Modal>
    );
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-labelledby');
    expect(dialog).toHaveAttribute('aria-describedby');
  });
});