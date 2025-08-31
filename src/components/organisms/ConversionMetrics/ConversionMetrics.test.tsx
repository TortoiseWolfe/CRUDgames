import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { ConversionMetrics } from './ConversionMetrics';
import { TrendingUp } from 'lucide-react';

describe('ConversionMetrics', () => {
  const mockMetrics = [
    {
      id: 'conversion-rate',
      label: 'Conversion Rate',
      value: 24.5,
      suffix: '%',
      color: 'success' as const,
      trend: {
        value: 12,
        isPositive: true
      }
    },
    {
      id: 'total-users',
      label: 'Total Users',
      value: 1234,
      prefix: '',
      icon: <TrendingUp className="h-5 w-5" />,
      color: 'primary' as const
    },
    {
      id: 'avg-time',
      label: 'Avg Time',
      value: '3:45',
      suffix: 'min',
      color: 'warning' as const
    }
  ];

  beforeEach(() => {
    vi.useFakeTimers();
    // Mock requestAnimationFrame for animations
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      return setTimeout(() => cb(Date.now()), 0) as unknown as number;
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('renders all metrics', () => {
    render(<ConversionMetrics metrics={mockMetrics} />);
    
    expect(screen.getByText('Conversion Rate')).toBeInTheDocument();
    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.getByText('Avg Time')).toBeInTheDocument();
  });

  it('displays metric values correctly', () => {
    render(<ConversionMetrics metrics={mockMetrics} animated={false} />);
    
    expect(screen.getByText('24.5')).toBeInTheDocument();
    expect(screen.getByText('1234')).toBeInTheDocument();
    expect(screen.getByText('3:45')).toBeInTheDocument();
  });

  it('shows prefixes and suffixes', () => {
    render(<ConversionMetrics metrics={mockMetrics} />);
    
    expect(screen.getByText('%')).toBeInTheDocument();
    expect(screen.getByText('min')).toBeInTheDocument();
  });

  it('displays trend indicators when provided', () => {
    render(<ConversionMetrics metrics={mockMetrics} />);
    
    expect(screen.getByText(/↑ 12%/)).toBeInTheDocument();
    expect(screen.getByText('vs last period')).toBeInTheDocument();
  });

  it('applies color classes based on color prop', () => {
    const { container } = render(<ConversionMetrics metrics={mockMetrics} />);
    
    const successMetric = container.querySelector('.bg-green-50');
    const primaryMetric = container.querySelector('.bg-blue-50');
    const warningMetric = container.querySelector('.bg-yellow-50');
    
    expect(successMetric).toBeInTheDocument();
    expect(primaryMetric).toBeInTheDocument();
    expect(warningMetric).toBeInTheDocument();
  });

  it('renders with grid layout by default', () => {
    const { container } = render(<ConversionMetrics metrics={mockMetrics} />);
    
    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
  });

  it('renders with horizontal layout when specified', () => {
    const { container } = render(<ConversionMetrics metrics={mockMetrics} layout="horizontal" />);
    
    const flex = container.querySelector('.flex.flex-wrap');
    expect(flex).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ConversionMetrics metrics={mockMetrics} className="custom-metrics" />
    );
    
    expect(container.firstChild).toHaveClass('custom-metrics');
  });

  it('handles empty metrics array', () => {
    const { container } = render(<ConversionMetrics metrics={[]} />);
    
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild?.childNodes.length).toBe(0);
  });

  it('renders custom icons when provided', () => {
    const metricsWithIcon = [{
      id: 'test',
      label: 'Test Metric',
      value: 100,
      icon: <TrendingUp data-testid="custom-icon" />
    }];
    
    render(<ConversionMetrics metrics={metricsWithIcon} />);
    
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('handles string values correctly', () => {
    const stringMetrics = [{
      id: 'status',
      label: 'Status',
      value: 'Active'
    }];
    
    render(<ConversionMetrics metrics={stringMetrics} animated={false} />);
    
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('applies animation classes when visible', async () => {
    const { container, rerender } = render(<ConversionMetrics metrics={mockMetrics} />);
    
    // Initially opacity-0
    const initialMetrics = container.querySelectorAll('.opacity-0');
    expect(initialMetrics.length).toBe(mockMetrics.length);
    
    // Advance timers to trigger visibility change (100ms delay in component)
    act(() => {
      vi.advanceTimersByTime(150); // A bit more than the 100ms delay
    });
    
    // Force a rerender to update the DOM
    rerender(<ConversionMetrics metrics={mockMetrics} />);
    
    // Now should be opacity-100
    const visibleMetrics = container.querySelectorAll('.opacity-100');
    expect(visibleMetrics.length).toBe(mockMetrics.length);
  });

  it('has proper accessibility attributes', () => {
    const { container } = render(<ConversionMetrics metrics={mockMetrics} />);
    
    const region = container.querySelector('[role="region"]');
    expect(region).toHaveAttribute('aria-label', 'Conversion metrics');
  });

  it('handles negative trends correctly', () => {
    const metricsWithNegativeTrend = [{
      id: 'test',
      label: 'Test',
      value: 50,
      trend: {
        value: -5,
        isPositive: false
      }
    }];
    
    render(<ConversionMetrics metrics={metricsWithNegativeTrend} />);
    
    expect(screen.getByText(/↓ 5%/)).toBeInTheDocument();
  });

  it('renders all color variants', () => {
    const colorMetrics = [
      { id: '1', label: 'Primary', value: 1, color: 'primary' as const },
      { id: '2', label: 'Secondary', value: 2, color: 'secondary' as const },
      { id: '3', label: 'Success', value: 3, color: 'success' as const },
      { id: '4', label: 'Warning', value: 4, color: 'warning' as const },
      { id: '5', label: 'Error', value: 5, color: 'error' as const },
    ];
    
    const { container } = render(<ConversionMetrics metrics={colorMetrics} />);
    
    expect(container.querySelector('.bg-blue-50')).toBeInTheDocument();
    expect(container.querySelector('.bg-gray-50')).toBeInTheDocument();
    expect(container.querySelector('.bg-green-50')).toBeInTheDocument();
    expect(container.querySelector('.bg-yellow-50')).toBeInTheDocument();
    expect(container.querySelector('.bg-red-50')).toBeInTheDocument();
  });
});
