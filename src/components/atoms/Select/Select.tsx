'use client';

import { forwardRef } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { cn } from '@/lib/utils';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface SelectProps {
  id: string;
  value?: string | string[];
  defaultValue?: string | string[];
  options: SelectOption[];
  
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled';
  placeholder?: string;
  
  disabled?: boolean;
  error?: boolean | string;
  loading?: boolean;
  required?: boolean;
  success?: boolean;
  
  label?: string;
  helperText?: string;
  noOptionsMessage?: string;
  
  onChange?: (value: string | string[]) => void;
  onSearch?: (query: string) => void;
  
  ariaLabel?: string;
  className?: string;
}

const sizeClasses = {
  sm: 'h-10 px-3 text-base',
  md: 'h-12 px-4 text-lg',
  lg: 'h-14 px-4 text-lg',
};

const variantClasses = {
  default: 'bg-white dark:bg-black/40 backdrop-blur-sm border-2 border-gray-300 dark:border-cyan-500/50',
  filled: 'bg-gray-50 dark:bg-black/60 backdrop-blur-md border-2 border-gray-400 dark:border-cyan-500/60',
};

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  ({
    id,
    value,
    defaultValue,
    options,
    multiple = false,
    size = 'md',
    variant = 'default',
    placeholder = 'Select an option',
    disabled = false,
    error = false,
    required = false,
    success = false,
    label,
    helperText,
    noOptionsMessage = 'No options available',
    onChange,
    ariaLabel,
    className,
  }, ref) => {
    const hasError = !!error;
    const errorMessage = typeof error === 'string' ? error : '';
    
    // Group options by their group property
    const groupedOptions = (options || []).reduce((acc, option) => {
      const group = option.group || 'default';
      if (!acc[group]) acc[group] = [];
      acc[group].push(option);
      return acc;
    }, {} as Record<string, SelectOption[]>);

    const triggerClasses = cn(
      'inline-flex items-center justify-between rounded-sm font-mono transition-all duration-300',
      'text-gray-900 dark:text-cyan-100',
      'focus:outline-none focus:shadow-[0_0_15px_rgba(59,130,246,0.5)] dark:focus:shadow-[0_0_15px_rgba(0,255,255,0.6)]',
      'disabled:cursor-not-allowed disabled:opacity-30',
      sizeClasses[size],
      variantClasses[variant],
      {
        'border-red-500 dark:border-red-500 focus:shadow-[0_0_10px_rgba(255,0,64,0.5)]': hasError,
        'border-green-500 dark:border-green-400 focus:shadow-[0_0_10px_rgba(57,255,20,0.5)]': success,
        'hover:border-gray-400 dark:hover:border-cyan-500/70 focus:border-blue-500 dark:focus:border-cyan-400': !hasError && !success,
        'hover:bg-gray-50 dark:hover:bg-cyan-900/20': !disabled && variant === 'default',
        'hover:bg-gray-100 dark:hover:bg-cyan-900/30': !disabled && variant === 'filled',
      },
      'w-full',
      className
    );

    const contentClasses = cn(
      'overflow-hidden bg-white dark:bg-black/95 backdrop-blur-md rounded-sm shadow-2xl',
      'border-2 border-gray-300 dark:border-cyan-400/50 shadow-lg dark:shadow-[0_0_30px_rgba(0,255,255,0.4)]',
      'z-[9999]',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      'data-[side=bottom]:slide-in-from-top-2',
      'data-[side=left]:slide-in-from-right-2',
      'data-[side=right]:slide-in-from-left-2',
      'data-[side=top]:slide-in-from-bottom-2'
    );

    const itemClasses = cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-3 px-4 text-sm font-mono outline-none',
      'text-gray-900 dark:text-cyan-100 hover:bg-gray-100 dark:hover:bg-cyan-900/40 hover:text-gray-900 dark:hover:text-cyan-200 hover:shadow-[inset_0_0_20px_rgba(59,130,246,0.1)] dark:hover:shadow-[inset_0_0_20px_rgba(0,255,255,0.2)]',
      'focus:bg-gray-100 dark:focus:bg-cyan-900/50 focus:text-gray-900 dark:focus:text-cyan-200',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
    );

    // For single select
    if (!multiple) {
      return (
        <div ref={ref} className="w-full">
          {label && (
            <label htmlFor={id} className="block text-sm font-mono text-gray-700 dark:text-cyan-300 mb-1">
              {'> '}{label}
              {required && <span className="text-red-500 dark:text-red-400 ml-1 animate-pulse">*</span>}
            </label>
          )}
          
          <SelectPrimitive.Root
            value={value as string}
            defaultValue={defaultValue as string}
            onValueChange={onChange}
            disabled={disabled}
          >
            <SelectPrimitive.Trigger
              id={id}
              className={triggerClasses}
              aria-label={ariaLabel || label || placeholder}
              aria-invalid={hasError}
              aria-required={required}
            >
              <SelectPrimitive.Value placeholder={placeholder} className="text-gray-900 dark:text-cyan-100" />
              <SelectPrimitive.Icon asChild>
                <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </SelectPrimitive.Icon>
            </SelectPrimitive.Trigger>
            
            <SelectPrimitive.Portal>
              <SelectPrimitive.Content className={contentClasses} position="popper" sideOffset={5}>
                <SelectPrimitive.Viewport className="p-1 max-h-[300px]">
                  {Object.entries(groupedOptions).map(([group, groupOptions]) => (
                    <div key={group}>
                      {group !== 'default' && (
                        <SelectPrimitive.Label className="px-4 py-3 text-sm font-mono text-gray-600 dark:text-gray-400">
                          {group}
                        </SelectPrimitive.Label>
                      )}
                      {groupOptions.map((option) => (
                        <SelectPrimitive.Item
                          key={option.value}
                          value={option.value}
                          disabled={option.disabled}
                          className={itemClasses}
                        >
                          <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                          <SelectPrimitive.ItemIndicator className="absolute right-2 flex items-center justify-center">
                            <Check className="h-4 w-4" />
                          </SelectPrimitive.ItemIndicator>
                        </SelectPrimitive.Item>
                      ))}
                    </div>
                  ))}
                  {(!options || options.length === 0) && (
                    <div className="px-4 py-3 text-base text-gray-600 dark:text-gray-400">
                      {noOptionsMessage}
                    </div>
                  )}
                </SelectPrimitive.Viewport>
              </SelectPrimitive.Content>
            </SelectPrimitive.Portal>
          </SelectPrimitive.Root>
          
          {(helperText || errorMessage) && (
            <p className={cn(
              'mt-1 text-sm',
              hasError ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'
            )}>
              {errorMessage || helperText}
            </p>
          )}
        </div>
      );
    }

    // Multiple select not yet implemented with Radix UI
    // TODO: Implement custom multi-select using checkboxes in a dropdown
    
    return (
      <div ref={ref} className="w-full">
        <p className="text-sm text-gray-500">
          Multiple select is not yet implemented with Radix UI
        </p>
      </div>
    );
  }
);

Select.displayName = 'Select';