import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RadioGroup } from './Radio';

describe('RadioGroup', () => {
  const defaultOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  it('renders with required props', () => {
    render(
      <RadioGroup 
        id="radio-group" 
        name="test-radio" 
        options={defaultOptions} 
      />
    );
    
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 3')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(
      <RadioGroup 
        id="radio-group" 
        name="test-radio" 
        label="Select an option"
        options={defaultOptions} 
      />
    );
    
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('handles value selection', () => {
    render(
      <RadioGroup 
        id="radio-group" 
        name="test-radio" 
        value="option2"
        options={defaultOptions} 
      />
    );
    
    const option2 = screen.getByLabelText('Option 2') as HTMLInputElement;
    expect(option2.checked).toBe(true);
  });

  it('handles defaultValue', () => {
    render(
      <RadioGroup 
        id="radio-group" 
        name="test-radio" 
        defaultValue="option3"
        options={defaultOptions} 
      />
    );
    
    const option3 = screen.getByLabelText('Option 3') as HTMLInputElement;
    expect(option3.checked).toBe(true);
  });

  it('handles onChange event', () => {
    const onChange = vi.fn();
    render(
      <RadioGroup 
        id="radio-group" 
        name="test-radio" 
        options={defaultOptions}
        onChange={onChange}
      />
    );
    
    fireEvent.click(screen.getByLabelText('Option 2'));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('option2');
  });

  it('handles disabled state for entire group', () => {
    render(
      <RadioGroup 
        id="radio-group" 
        name="test-radio" 
        options={defaultOptions}
        disabled
      />
    );
    
    const radios = screen.getAllByRole('radio');
    radios.forEach(radio => {
      expect(radio).toBeDisabled();
    });
  });

  it('handles disabled state for individual options', () => {
    const optionsWithDisabled = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2', disabled: true },
      { value: 'option3', label: 'Option 3' },
    ];
    
    render(
      <RadioGroup 
        id="radio-group" 
        name="test-radio" 
        options={optionsWithDisabled}
      />
    );
    
    expect(screen.getByLabelText('Option 1')).not.toBeDisabled();
    expect(screen.getByLabelText('Option 2')).toBeDisabled();
    expect(screen.getByLabelText('Option 3')).not.toBeDisabled();
  });

  it('handles required attribute', () => {
    render(
      <RadioGroup 
        id="radio-group" 
        name="test-radio" 
        options={defaultOptions}
        required
      />
    );
    
    // Required is set on the radiogroup, not individual radios
    const radiogroup = screen.getByRole('radiogroup');
    expect(radiogroup).toHaveAttribute('aria-required', 'true');
  });

  it('renders with error state', () => {
    render(
      <RadioGroup 
        id="radio-group" 
        name="test-radio" 
        options={defaultOptions}
        error="Please select an option"
      />
    );
    
    expect(screen.getByText('Please select an option')).toBeInTheDocument();
    const radiogroup = screen.getByRole('radiogroup');
    expect(radiogroup).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders with helper text', () => {
    render(
      <RadioGroup 
        id="radio-group" 
        name="test-radio" 
        options={defaultOptions}
        helperText="Choose your preferred option"
      />
    );
    
    expect(screen.getByText('Choose your preferred option')).toBeInTheDocument();
  });

  it('renders with descriptions for options', () => {
    const optionsWithDescriptions = [
      { value: 'option1', label: 'Option 1', description: 'First choice' },
      { value: 'option2', label: 'Option 2', description: 'Second choice' },
    ];
    
    render(
      <RadioGroup 
        id="radio-group" 
        name="test-radio" 
        options={optionsWithDescriptions}
      />
    );
    
    expect(screen.getByText('First choice')).toBeInTheDocument();
    expect(screen.getByText('Second choice')).toBeInTheDocument();
  });

  it('renders in horizontal orientation', () => {
    render(
      <RadioGroup 
        id="radio-group" 
        name="test-radio" 
        options={defaultOptions}
        orientation="horizontal"
      />
    );
    
    const radiogroup = screen.getByRole('radiogroup');
    expect(radiogroup).toHaveClass('flex-row');
  });

  it('applies custom className', () => {
    render(
      <RadioGroup 
        id="radio-group" 
        name="test-radio" 
        options={defaultOptions}
        className="custom-radio-group"
      />
    );
    
    const radiogroup = screen.getByRole('radiogroup').parentElement;
    expect(radiogroup).toHaveClass('custom-radio-group');
  });

  it('has correct accessibility attributes', () => {
    render(
      <RadioGroup 
        id="radio-group" 
        name="test-radio" 
        options={defaultOptions}
        label="Choose option"
        helperText="Help text"
      />
    );
    
    const radiogroup = screen.getByRole('radiogroup');
    expect(radiogroup).toHaveAttribute('aria-label', 'Choose option');
    // aria-describedby will reference the helper text element
    const helperText = screen.getByText('Help text');
    expect(helperText).toBeInTheDocument();
  });
  it('renders with different sizes', () => {
    const { rerender } = render(
      <RadioGroup 
        id="radio-group" 
        name="test-radio" 
        options={[{ value: 'opt1', label: 'Option' }]}
        size="sm"
      />
    );
    
    let radio = screen.getByRole('radio');
    expect(radio).toHaveClass('h-4', 'w-4');
    
    rerender(
      <RadioGroup 
        id="radio-group" 
        name="test-radio" 
        options={[{ value: 'opt1', label: 'Option' }]}
        size="lg"
      />
    );
    
    radio = screen.getByRole('radio');
    expect(radio).toHaveClass('h-6', 'w-6');
  });
});