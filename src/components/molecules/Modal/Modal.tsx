'use client';

import { forwardRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';
import { Button } from '@/components/atoms/Button';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string | React.ReactNode;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  className?: string;
  overlayClassName?: string;
  variant?: 'default' | 'holographic' | 'cyberpunk';
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
  xl: 'max-w-6xl',
  full: 'max-w-[95vw]',
};

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      description,
      children,
      size = 'lg',
      closeOnBackdrop = true,
      closeOnEscape = true,
      showCloseButton = true,
      className,
      overlayClassName,
      variant = 'default',
    },
    ref
  ) => {
    return (
      <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <Dialog.Portal>
          <Dialog.Overlay
            className={cn(
              'fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm',
              'data-[state=open]:animate-in data-[state=closed]:animate-out',
              'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
              overlayClassName
            )}
            onClick={closeOnBackdrop ? onClose : undefined}
          />
          <Dialog.Content
            ref={ref}
            className={cn(
              'fixed left-[50%] top-[50%] z-[101] translate-x-[-50%] translate-y-[-50%]',
              'bg-card rounded-xl shadow-2xl w-[95vw]',
              'max-h-[90vh] overflow-hidden flex flex-col',
              'data-[state=open]:animate-in data-[state=closed]:animate-out',
              'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
              'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
              'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
              'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
              'duration-200',
              sizeClasses[size],
              variant === 'holographic' && 'texture-holographic',
              variant === 'cyberpunk' && 'texture-cyberpunk-panel',
              className
            )}
            onEscapeKeyDown={closeOnEscape ? undefined : (e) => e.preventDefault()}
            onPointerDownOutside={closeOnBackdrop ? undefined : (e) => e.preventDefault()}
            onInteractOutside={closeOnBackdrop ? undefined : (e) => e.preventDefault()}
          >
            {/* Header */}
            {(title || showCloseButton) ? (
              <div className="flex items-start justify-between p-6 border-b border-border">
                <div>
                  {title ? (
                    <Dialog.Title className="text-2xl font-bold text-foreground">
                      {title}
                    </Dialog.Title>
                  ) : (
                    <Dialog.Title className="sr-only">
                      Modal Dialog
                    </Dialog.Title>
                  )}
                  {description && (
                    <Dialog.Description className="mt-2 text-sm text-muted-foreground" asChild>
                      <div>{description}</div>
                    </Dialog.Description>
                  )}
                </div>
                {showCloseButton && (
                  <Dialog.Close asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-4 -mr-2 -mt-2"
                      aria-label="Close modal"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </Dialog.Close>
                )}
              </div>
            ) : (
              <>
                <Dialog.Title className="sr-only">
                  Modal Dialog
                </Dialog.Title>
                {description && (
                  <Dialog.Description className="sr-only" asChild>
                    <div>{description}</div>
                  </Dialog.Description>
                )}
              </>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {children}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }
);

Modal.displayName = 'Modal';