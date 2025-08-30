'use client';

import { forwardRef, useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, X, Check } from 'lucide-react';

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

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  ({
    id,
    value,
    defaultValue,
    options,
    multiple = false,
    searchable = false,
    clearable = false,
    size = 'md',
    variant = 'default',
    placeholder = 'Select an option',
    disabled = false,
    error = false,
    loading = false,
    required = false,
    success = false,
    label,
    helperText,
    noOptionsMessage = 'No options found',
    onChange,
    onSearch,
    ariaLabel,
    className,
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedValues, setSelectedValues] = useState<string[]>(() => {
      if (value !== undefined) {
        return Array.isArray(value) ? value : [value];
      }
      if (defaultValue !== undefined) {
        return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
      }
      return [];
    });
    
    const containerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (value !== undefined) {
        setSelectedValues(Array.isArray(value) ? value : value ? [value] : []);
      }
    }, [value]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setSearchQuery('');
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [isOpen, searchable]);

    const filteredOptions = searchQuery
      ? options.filter(option => 
          option.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : options;

    const groupedOptions = filteredOptions.reduce((acc, option) => {
      const group = option.group || '';
      if (!acc[group]) acc[group] = [];
      acc[group].push(option);
      return acc;
    }, {} as Record<string, SelectOption[]>);

    const handleSelect = (optionValue: string) => {
      if (multiple) {
        const newValues = selectedValues.includes(optionValue)
          ? selectedValues.filter(v => v !== optionValue)
          : [...selectedValues, optionValue];
        setSelectedValues(newValues);
        onChange?.(newValues);
      } else {
        setSelectedValues([optionValue]);
        onChange?.(optionValue);
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedValues([]);
      onChange?.(multiple ? [] : '');
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setSearchQuery(query);
      onSearch?.(query);
    };

    const getDisplayValue = () => {
      if (selectedValues.length === 0) return placeholder;
      if (multiple) {
        if (selectedValues.length === 1) {
          const option = options.find(o => o.value === selectedValues[0]);
          return option?.label || selectedValues[0];
        }
        return `${selectedValues.length} selected`;
      }
      const option = options.find(o => o.value === selectedValues[0]);
      return option?.label || selectedValues[0];
    };

    const hasError = !!error;
    const errorMessage = typeof error === 'string' ? error : '';

    const sizeClasses = {
      sm: 'h-8 text-sm',
      md: 'h-10 text-base',
      lg: 'h-12 text-lg',
    };

    const triggerClasses = cn(
      'w-full flex items-center justify-between px-3 py-2',
      'border rounded-md transition-colors duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
      sizeClasses[size],
      {
        'bg-white': variant === 'default',
        'bg-gray-50': variant === 'filled',
        'border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500': !hasError && !success,
        'border-red-500 hover:border-red-600 focus:border-red-600 focus:ring-red-500': hasError,
        'border-green-500 hover:border-green-600 focus:border-green-600 focus:ring-green-500': success,
        'cursor-pointer': !disabled,
      },
      className
    );

    const dropdownClasses = cn(
      'absolute z-50 w-full mt-1 bg-white border border-gray-200',
      'rounded-md shadow-lg max-h-60 overflow-auto',
      'focus:outline-none'
    );

    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;
    const listboxId = `${id}-listbox`;

    return (
      <div className="w-full" ref={ref}>
        {label && (
          <label 
            htmlFor={id}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
            {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
          </label>
        )}
        
        <div className="relative" ref={containerRef}>
          <div
            id={id}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-controls={listboxId}
            aria-label={ariaLabel || label}
            aria-describedby={`${helperText ? helperId : ''} ${hasError ? errorId : ''}`}
            aria-invalid={hasError}
            aria-required={required}
            tabIndex={disabled ? -1 : 0}
            className={triggerClasses}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            onKeyDown={(e) => {
              if (disabled) return;
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsOpen(!isOpen);
              } else if (e.key === 'Escape') {
                setIsOpen(false);
              }
            }}
          >
            <span className={cn(
              'flex-1 truncate',
              selectedValues.length === 0 && 'text-gray-500'
            )}>
              {loading ? 'Loading...' : getDisplayValue()}
            </span>
            
            <div className="flex items-center gap-1">
              {clearable && selectedValues.length > 0 && !disabled && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-0.5 hover:bg-gray-100 rounded"
                  aria-label="Clear selection"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <ChevronDown className={cn(
                'h-4 w-4 transition-transform',
                isOpen && 'rotate-180'
              )} />
            </div>
          </div>

          {isOpen && !disabled && (
            <div className={dropdownClasses}>
              {searchable && (
                <div className="p-2 border-b">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search..."
                    className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}
              
              <ul
                id={listboxId}
                role="listbox"
                aria-multiselectable={multiple}
                className="py-1"
              >
                {filteredOptions.length === 0 ? (
                  <li className="px-3 py-2 text-sm text-gray-500">
                    {noOptionsMessage}
                  </li>
                ) : (
                  Object.entries(groupedOptions).map(([group, groupOptions]) => (
                    <div key={group}>
                      {group && (
                        <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase">
                          {group}
                        </div>
                      )}
                      {groupOptions.map((option) => {
                        const isSelected = selectedValues.includes(option.value);
                        return (
                          <li
                            key={option.value}
                            role="option"
                            aria-selected={isSelected}
                            aria-disabled={option.disabled}
                            className={cn(
                              'px-3 py-2 text-sm cursor-pointer',
                              'flex items-center justify-between',
                              'hover:bg-gray-100',
                              {
                                'bg-blue-50': isSelected,
                                'text-gray-400 cursor-not-allowed': option.disabled,
                              }
                            )}
                            onClick={() => !option.disabled && handleSelect(option.value)}
                          >
                            <span>{option.label}</span>
                            {isSelected && <Check className="h-4 w-4 text-blue-600" />}
                          </li>
                        );
                      })}
                    </div>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>
        
        <div className="mt-1">
          {helperText && !hasError && (
            <p id={helperId} className="text-sm text-gray-500">
              {helperText}
            </p>
          )}
          
          {hasError && errorMessage && (
            <p id={errorId} className="text-sm text-red-600" role="alert">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';