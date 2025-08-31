import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { HoneypotField } from './HoneypotField';

describe('HoneypotField', () => {
  it('renders hidden honeypot field', () => {
    const { container } = render(<HoneypotField />);
    
    const hiddenDiv = container.querySelector('[aria-hidden="true"]');
    expect(hiddenDiv).toBeInTheDocument();
    expect(hiddenDiv).toHaveStyle({
      position: 'absolute',
      left: '-9999px',
      width: '1px',
      height: '1px',
      overflow: 'hidden',
    });
  });

  it('uses default field name "website"', () => {
    const { container } = render(<HoneypotField />);
    
    const input = container.querySelector('input[name="website"]');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'website');
  });

  it('uses custom field name when provided', () => {
    const { container } = render(<HoneypotField fieldName="url" />);
    
    const input = container.querySelector('input[name="url"]');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'url');
  });

  it('has negative tabIndex to prevent keyboard focus', () => {
    const { container } = render(<HoneypotField />);
    
    const input = container.querySelector('input');
    expect(input).toHaveAttribute('tabIndex', '-1');
  });

  it('has autocomplete off', () => {
    const { container } = render(<HoneypotField />);
    
    const input = container.querySelector('input');
    expect(input).toHaveAttribute('autocomplete', 'off');
  });

  it('calls onTrap when honeypot is filled', () => {
    const onTrap = vi.fn();
    const { container } = render(<HoneypotField onTrap={onTrap} />);
    
    const input = container.querySelector('input') as HTMLInputElement;
    
    // Bot fills in the honeypot field
    fireEvent.change(input, { target: { value: 'https://spam.com' } });
    
    expect(onTrap).toHaveBeenCalledTimes(1);
  });

  it('does not call onTrap when honeypot remains empty', () => {
    const onTrap = vi.fn();
    const { container } = render(<HoneypotField onTrap={onTrap} />);
    
    const input = container.querySelector('input') as HTMLInputElement;
    
    // Field remains empty (normal user behavior)
    fireEvent.change(input, { target: { value: '' } });
    
    expect(onTrap).not.toHaveBeenCalled();
  });

  it('calls original onChange handler', () => {
    const onChange = vi.fn();
    const { container } = render(<HoneypotField onChange={onChange} />);
    
    const input = container.querySelector('input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test' } });
    
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: 'test'
        })
      })
    );
  });

  it('calls both onTrap and onChange when appropriate', () => {
    const onTrap = vi.fn();
    const onChange = vi.fn();
    const { container } = render(
      <HoneypotField onTrap={onTrap} onChange={onChange} />
    );
    
    const input = container.querySelector('input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'bot-input' } });
    
    expect(onTrap).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('has a bot-tempting label', () => {
    const { container } = render(<HoneypotField />);
    
    const label = container.querySelector('label[for="website"]');
    expect(label).toHaveTextContent('Website URL (Leave blank)');
  });

  it('is properly hidden from screen readers', () => {
    const { container } = render(<HoneypotField />);
    
    const hiddenDiv = container.querySelector('[aria-hidden="true"]');
    expect(hiddenDiv).toHaveAttribute('aria-hidden', 'true');
  });

  it('forwards other props to input', () => {
    const { container } = render(
      <HoneypotField 
        placeholder="Do not fill"
        className="honeypot-input"
        data-testid="honeypot"
      />
    );
    
    const input = container.querySelector('input');
    expect(input).toHaveAttribute('placeholder', 'Do not fill');
    expect(input).toHaveAttribute('class', 'honeypot-input');
    expect(input).toHaveAttribute('data-testid', 'honeypot');
  });

  it('includes CSS to hide the field', () => {
    const { container } = render(<HoneypotField fieldName="trap" />);
    
    // Check that style tag is rendered
    const style = container.querySelector('style');
    expect(style).toBeInTheDocument();
    expect(style?.textContent).toContain('#trap');
    expect(style?.textContent).toContain('display: none !important');
  });
});