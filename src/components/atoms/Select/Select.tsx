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
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-base',
  lg: 'h-12 px-4 text-lg',
};

const variantClasses = {
  default: 'bg-white border border-gray-300',
  filled: 'bg-gray-50 border border-gray-300',
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
      'inline-flex items-center justify-between rounded-md font-medium transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      sizeClasses[size],
      variantClasses[variant],
      {
        'border-red-500 focus:ring-red-500': hasError,
        'border-green-500 focus:ring-green-500': success,
        'border-gray-300 focus:ring-blue-500': !hasError && !success,
        'hover:bg-gray-50': !disabled && variant === 'default',
        'hover:bg-gray-100': !disabled && variant === 'filled',
      },
      'w-full',
      className
    );

    const contentClasses = cn(
      'overflow-hidden bg-white rounded-md shadow-lg',
      'border border-gray-200',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      'data-[side=bottom]:slide-in-from-top-2',
      'data-[side=left]:slide-in-from-right-2',
      'data-[side=right]:slide-in-from-left-2',
      'data-[side=top]:slide-in-from-bottom-2'
    );

    const itemClasses = cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-2 px-3 text-sm outline-none',
      'focus:bg-gray-100 focus:text-gray-900',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
    );

    // For single select
    if (!multiple) {
      return (
        <div ref={ref} className="w-full">
          {label && (
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
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
              <SelectPrimitive.Value placeholder={placeholder} />
              <SelectPrimitive.Icon asChild>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </SelectPrimitive.Icon>
            </SelectPrimitive.Trigger>
            
            <SelectPrimitive.Portal>
              <SelectPrimitive.Content className={contentClasses} position="popper">
                <SelectPrimitive.Viewport className="p-1">
                  {Object.entries(groupedOptions).map(([group, groupOptions]) => (
                    <div key={group}>
                      {group !== 'default' && (
                        <SelectPrimitive.Label className="px-3 py-2 text-xs font-semibold text-gray-500">
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
                    <div className="px-3 py-2 text-sm text-gray-500">
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
              hasError ? 'text-red-600' : 'text-gray-500'
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