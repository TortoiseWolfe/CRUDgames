'use client';

import { forwardRef, InputHTMLAttributes } from 'react';

export interface HoneypotFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'style'> {
  fieldName?: string;
  onTrap?: () => void;
}

export const HoneypotField = forwardRef<HTMLInputElement, HoneypotFieldProps>(
  ({ fieldName = 'website', onTrap, onChange, ...props }, ref) => {
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // If honeypot is filled, it's likely a bot
      if (e.target.value && onTrap) {
        onTrap();
      }
      
      // Still call original onChange if provided
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <>
        {/* Visually hidden but still accessible to bots */}
        <div 
          style={{
            position: 'absolute',
            left: '-9999px',
            width: '1px',
            height: '1px',
            overflow: 'hidden',
          }}
          aria-hidden="true"
        >
          <label htmlFor={fieldName}>
            {/* Bot-tempting label */}
            Website URL (Leave blank)
          </label>
          <input
            ref={ref}
            type="text"
            id={fieldName}
            name={fieldName}
            autoComplete="off"
            tabIndex={-1}
            onChange={handleChange}
            {...props}
          />
        </div>
        
        {/* Additional CSS-based hiding for extra protection */}
        <style jsx>{`
          @media screen and (min-width: 0px) {
            #${fieldName} {
              display: none !important;
            }
          }
        `}</style>
      </>
    );
  }
);

HoneypotField.displayName = 'HoneypotField';