'use client';

import { forwardRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';
import { Button } from '@/components/atoms/Button';
import { ThemeToggle } from '@/components/atoms/ThemeToggle/ThemeToggle';
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
              'fixed inset-0 z-[100] bg-black/50 dark:bg-black/80 backdrop-blur-md',
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
              'bg-white dark:bg-background/95 backdrop-blur-md rounded-xl shadow-2xl w-[95vw]',
              'border-2 border-gray-300 dark:border-primary/30 shadow-lg dark:shadow-[0_0_30px_rgba(0,255,255,0.3)]',
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
              <div className="flex items-start justify-between p-5 border-b-2 border-gray-200 dark:border-cyan-400/30">
                <div>
                  {title ? (
                    <Dialog.Title className="text-xl font-mono font-bold text-gray-900 dark:text-cyan-300 uppercase tracking-widest">
                      {'> '}{title}
                    </Dialog.Title>
                  ) : (
                    <Dialog.Title className="sr-only">
                      Modal Dialog
                    </Dialog.Title>
                  )}
                  {description && (
                    <Dialog.Description className="mt-1 text-xs font-mono text-gray-600 dark:text-cyan-600 uppercase tracking-wider" asChild>
                      <div>{description}</div>
                    </Dialog.Description>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <ThemeToggle size="sm" />
                  {showCloseButton && (
                    <Dialog.Close asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="!bg-transparent !border-gray-300 dark:!border-cyan-500/30 hover:!border-gray-400 dark:hover:!border-cyan-400 hover:!bg-gray-100 dark:hover:!bg-cyan-900/20"
                        aria-label="Close modal"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </Dialog.Close>
                  )}
                </div>
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
            <div className="flex-1 overflow-y-auto p-6 lg:p-8 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-black/50 [&::-webkit-scrollbar-thumb]:bg-cyan-500/50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-cyan-400/70">
              {children}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }
);

Modal.displayName = 'Modal';