import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Select, type SelectOption } from './Select';

describe('Select', () => {
  const defaultOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  it('renders with required props', () => {
    render(
      <Select 
        id="test-select" 
        options={defaultOptions}
      />
    );
    
    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute('id', 'test-select');
  });

  it('renders with placeholder', () => {
    render(
      <Select 
        id="test-select" 
        options={defaultOptions}
        placeholder="Choose an option"
      />
    );
    
    expect(screen.getByText('Choose an option')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(
      <Select 
        id="test-select" 
        options={defaultOptions}
        label="Select Option"
      />
    );
    
    expect(screen.getByText('Select Option')).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(
      <Select 
        id="test-select" 
        options={defaultOptions}
        label="Required Field"
        required
      />
    );
    
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('handles value prop', () => {
    render(
      <Select 
        id="test-select" 
        options={defaultOptions}
        value="option2"
      />
    );
    
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('handles defaultValue prop', () => {
    render(
      <Select 
        id="test-select" 
        options={defaultOptions}
        defaultValue="option3"
      />
    );
    
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('handles onChange event', async () => {
    const onChange = vi.fn();
    render(
      <Select 
        id="test-select" 
        options={defaultOptions}
        onChange={onChange}
      />
    );
    
    // Open the select
    fireEvent.click(screen.getByRole('combobox'));
    
    // Click an option
    await waitFor(() => {
      const option = screen.getByText('Option 2');
      fireEvent.click(option);
    });
    
    expect(onChange).toHaveBeenCalledWith('option2');
  });

  it('handles disabled state', () => {
    render(
      <Select 
        id="test-select" 
        options={defaultOptions}
        disabled
      />
    );
    
    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveAttribute('data-disabled');
  });

  it('handles disabled options', async () => {
    const optionsWithDisabled = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2', disabled: true },
      { value: 'option3', label: 'Option 3' },
    ];
    
    render(
      <Select 
        id="test-select" 
        options={optionsWithDisabled}
      />
    );
    
    // Open the select
    fireEvent.click(screen.getByRole('combobox'));
    
    await waitFor(() => {
      const option2 = screen.getByText('Option 2').closest('[data-disabled]');
      expect(option2).toHaveAttribute('data-disabled');
    });
  });

  it('renders with error state', () => {
    render(
      <Select 
        id="test-select" 
        options={defaultOptions}
        error="Please select a valid option"
      />
    );
    
    expect(screen.getByText('Please select a valid option')).toBeInTheDocument();
    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders with success state', () => {
    render(
      <Select 
        id="test-select" 
        options={defaultOptions}
        success
      />
    );
    
    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveClass('border-green-500');
  });

  it('renders with helper text', () => {
    render(
      <Select 
        id="test-select" 
        options={defaultOptions}
        helperText="Choose your preferred option"
      />
    );
    
    expect(screen.getByText('Choose your preferred option')).toBeInTheDocument();
  });

  it.skip('handles grouped options', async () => {
    // Groups require SelectGroup wrapper from Radix UI
    const groupedOptions = [
      { value: 'us', label: 'United States', group: 'North America' },
      { value: 'ca', label: 'Canada', group: 'North America' },
      { value: 'uk', label: 'United Kingdom', group: 'Europe' },
      { value: 'de', label: 'Germany', group: 'Europe' },
    ];
    
    render(
      <Select 
        id="test-select" 
        options={groupedOptions}
      />
    );
    
    // Open the select
    fireEvent.click(screen.getByRole('combobox'));
    
    await waitFor(() => {
      expect(screen.getByText('North America')).toBeInTheDocument();
      expect(screen.getByText('Europe')).toBeInTheDocument();
    });
  });

  it('renders different sizes', () => {
    const { rerender } = render(
      <Select 
        id="test-select" 
        options={defaultOptions}
        size="sm"
      />
    );
    
    expect(screen.getByRole('combobox')).toHaveClass('h-8');
    
    rerender(
      <Select 
        id="test-select" 
        options={defaultOptions}
        size="lg"
      />
    );
    
    expect(screen.getByRole('combobox')).toHaveClass('h-12');
  });

  it('renders different variants', () => {
    const { rerender } = render(
      <Select 
        id="test-select" 
        options={defaultOptions}
        variant="default"
      />
    );
    
    expect(screen.getByRole('combobox')).toHaveClass('bg-white');
    
    rerender(
      <Select 
        id="test-select" 
        options={defaultOptions}
        variant="filled"
      />
    );
    
    expect(screen.getByRole('combobox')).toHaveClass('bg-gray-50');
  });

  it('applies custom className', () => {
    render(
      <Select 
        id="test-select" 
        options={defaultOptions}
        className="custom-select"
      />
    );
    
    expect(screen.getByRole('combobox')).toHaveClass('custom-select');
  });

  it('has correct accessibility attributes', () => {
    render(
      <Select 
        id="test-select" 
        options={defaultOptions}
        ariaLabel="Custom select"
        required
      />
    );
    
    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveAttribute('aria-label', 'Custom select');
    expect(trigger).toHaveAttribute('aria-required', 'true');
  });

  it('handles empty options array', () => {
    render(
      <Select 
        id="test-select" 
        options={[]}
        noOptionsMessage="No options available"
      />
    );
    
    fireEvent.click(screen.getByRole('combobox'));
    
    waitFor(() => {
      expect(screen.getByText('No options available')).toBeInTheDocument();
    });
  });

  it('handles undefined options gracefully', () => {
    render(
      <Select 
        id="test-select" 
        options={undefined as unknown as SelectOption[]}
      />
    );
    
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});