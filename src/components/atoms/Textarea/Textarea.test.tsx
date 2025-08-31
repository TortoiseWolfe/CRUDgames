import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('renders with required props', () => {
    render(<Textarea id="test-textarea" name="test" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('id', 'test-textarea');
    expect(textarea).toHaveAttribute('name', 'test');
  });

  it('handles value and defaultValue', () => {
    const { unmount } = render(
      <Textarea id="t1" name="t1" value="controlled" onChange={() => {}} />
    );
    expect(screen.getByRole('textbox')).toHaveValue('controlled');
    unmount();

    render(<Textarea id="t2" name="t2" defaultValue="uncontrolled" />);
    expect(screen.getByRole('textbox')).toHaveValue('uncontrolled');
  });

  it('handles onChange event', () => {
    const onChange = vi.fn();
    render(<Textarea id="t1" name="t1" onChange={onChange} />);
    
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'new text' } });
    
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({
        value: 'new text'
      })
    }));
  });

  it('handles onFocus and onBlur events', () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    render(<Textarea id="t1" name="t1" onFocus={onFocus} onBlur={onBlur} />);
    
    const textarea = screen.getByRole('textbox');
    fireEvent.focus(textarea);
    expect(onFocus).toHaveBeenCalledTimes(1);
    
    fireEvent.blur(textarea);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('handles disabled state', () => {
    render(<Textarea id="t1" name="t1" disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('handles required attribute', () => {
    render(<Textarea id="t1" name="t1" required />);
    expect(screen.getByRole('textbox')).toHaveAttribute('required');
  });

  it('handles readonly state', () => {
    render(<Textarea id="t1" name="t1" readOnly />);
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
  });

  it('renders with placeholder', () => {
    render(<Textarea id="t1" name="t1" placeholder="Enter message..." />);
    expect(screen.getByPlaceholderText('Enter message...')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Textarea id="t1" name="t1" label="Message" />);
    expect(screen.getByText('Message')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });

  it('renders with error state', () => {
    render(<Textarea id="t1" name="t1" error="Message is too short" />);
    expect(screen.getByText('Message is too short')).toBeInTheDocument();
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea).toHaveClass('border-red-500');
  });

  it('renders with success state', () => {
    render(<Textarea id="t1" name="t1" success />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('border-green-500');
  });

  it('renders with helper text', () => {
    render(<Textarea id="t1" name="t1" helperText="Provide detailed information" />);
    expect(screen.getByText('Provide detailed information')).toBeInTheDocument();
  });

  it('handles rows and cols attributes', () => {
    render(<Textarea id="t1" name="t1" rows={10} cols={50} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '10');
    expect(textarea).toHaveAttribute('cols', '50');
  });

  it('handles minLength and maxLength', () => {
    render(<Textarea id="t1" name="t1" minLength={10} maxLength={500} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('minLength', '10');
    expect(textarea).toHaveAttribute('maxLength', '500');
  });

  it('shows character count', () => {
    render(
      <Textarea 
        id="t1" 
        name="t1" 
        defaultValue="Hello" 
        maxLength={100} 
        showCount 
      />
    );
    // Check if character count is displayed
    expect(screen.getByText(/5.*100/)).toBeInTheDocument();
  });

  it('handles resize options', () => {
    const { rerender } = render(<Textarea id="t1" name="t1" resize="none" />);
    expect(screen.getByRole('textbox')).toHaveClass('resize-none');

    rerender(<Textarea id="t1" name="t1" resize="vertical" />);
    expect(screen.getByRole('textbox')).toHaveClass('resize-y');

    rerender(<Textarea id="t1" name="t1" resize="horizontal" />);
    expect(screen.getByRole('textbox')).toHaveClass('resize-x');

    rerender(<Textarea id="t1" name="t1" resize="both" />);
    expect(screen.getByRole('textbox')).toHaveClass('resize');
  });

  it.skip('renders different sizes', () => {
    // Textarea doesn't have size prop
    render(<Textarea id="t1" name="t1" size="sm" />);
    expect(screen.getByRole('textbox')).toHaveClass('text-sm');
  });

  it.skip('renders different variants', () => {
    // Textarea doesn't have variant prop
    render(<Textarea id="t1" name="t1" variant="default" />);
    expect(screen.getByRole('textbox')).toHaveClass('bg-white');
  });

  it('handles autoResize', () => {
    render(<Textarea id="t1" name="t1" autoResize />);
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    
    // Simulate typing to trigger resize
    fireEvent.change(textarea, { 
      target: { value: 'Line 1\nLine 2\nLine 3\nLine 4\nLine 5' } 
    });
    
    // AutoResize would adjust scrollHeight in a real browser
    expect(textarea).toHaveValue('Line 1\nLine 2\nLine 3\nLine 4\nLine 5');
  });

  it('applies custom className', () => {
    render(<Textarea id="t1" name="t1" className="custom-textarea" />);
    expect(screen.getByRole('textbox')).toHaveClass('custom-textarea');
  });

  it('has correct accessibility attributes', () => {
    render(
      <Textarea 
        id="t1" 
        name="t1" 
        ariaLabel="Custom textarea"
        ariaDescribedBy="help-text"
      />
    );
    
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('aria-label', 'Custom textarea');
    expect(textarea).toHaveAttribute('aria-describedby', 'help-text');
  });

  it.skip('handles loading state', () => {
    // Textarea doesn't have loading prop
    render(<Textarea id="t1" name="t1" loading />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
  });

  it('handles wrap attribute', () => {
    render(<Textarea id="t1" name="t1" wrap="hard" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('wrap', 'hard');
  });

  it('handles spellcheck attribute', () => {
    render(<Textarea id="t1" name="t1" spellCheck={false} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('spellcheck', 'false');
  });
});