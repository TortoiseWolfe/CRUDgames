import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TrustBadges } from './TrustBadges';
import { Shield, Lock } from 'lucide-react';

describe('TrustBadges', () => {
  const mockBadges = [
    {
      id: 'security',
      icon: <Shield className="h-6 w-6" />,
      title: 'Secure Platform',
      description: 'Bank-level encryption',
      value: '256-bit',
    },
    {
      id: 'privacy',
      icon: <Lock className="h-6 w-6" />,
      title: 'Privacy Protected',
      description: 'GDPR compliant',
      highlight: true,
    },
    {
      id: 'users',
      title: 'Active Users',
      value: '10,000+',
    },
  ];

  it('renders all badges', () => {
    render(<TrustBadges badges={mockBadges} />);
    
    expect(screen.getByText('Secure Platform')).toBeInTheDocument();
    expect(screen.getByText('Privacy Protected')).toBeInTheDocument();
    expect(screen.getByText('Active Users')).toBeInTheDocument();
  });

  it('renders badge values when provided', () => {
    render(<TrustBadges badges={mockBadges} />);
    
    expect(screen.getByText('256-bit')).toBeInTheDocument();
    expect(screen.getByText('10,000+')).toBeInTheDocument();
  });

  it('renders descriptions when showDescriptions is true', () => {
    render(<TrustBadges badges={mockBadges} showDescriptions={true} variant="grid" />);
    
    expect(screen.getByText('Bank-level encryption')).toBeInTheDocument();
    expect(screen.getByText('GDPR compliant')).toBeInTheDocument();
  });

  it('does not render descriptions when showDescriptions is false', () => {
    render(<TrustBadges badges={mockBadges} showDescriptions={false} />);
    
    expect(screen.queryByText('Bank-level encryption')).not.toBeInTheDocument();
    expect(screen.queryByText('GDPR compliant')).not.toBeInTheDocument();
  });

  it('applies horizontal variant styling', () => {
    const { container } = render(<TrustBadges badges={mockBadges} variant="horizontal" />);
    
    const wrapper = container.querySelector('.flex.flex-wrap.justify-center');
    expect(wrapper).toBeInTheDocument();
  });

  it('applies grid variant styling', () => {
    const { container } = render(<TrustBadges badges={mockBadges} variant="grid" />);
    
    const wrapper = container.querySelector('.grid');
    expect(wrapper).toBeInTheDocument();
  });

  it('applies compact variant styling', () => {
    render(<TrustBadges badges={mockBadges} variant="compact" />);
    
    // Compact variant has specific rounded-full styling
    const badges = document.querySelectorAll('.rounded-full');
    expect(badges.length).toBeGreaterThan(0);
  });

  it('applies detailed variant styling', () => {
    render(<TrustBadges badges={mockBadges} variant="detailed" />);
    
    // Detailed variant has specific shadow-md styling
    const badges = document.querySelectorAll('.shadow-md');
    expect(badges.length).toBe(mockBadges.length);
  });

  it('highlights badges when highlight is true', () => {
    const { container } = render(<TrustBadges badges={mockBadges} variant="compact" />);
    
    // Check for highlight styling on the privacy badge
    const highlightedBadge = container.querySelector('.ring-2.ring-purple-500');
    expect(highlightedBadge).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <TrustBadges badges={mockBadges} className="custom-badges" />
    );
    
    expect(container.firstChild).toHaveClass('custom-badges');
  });

  it('renders with empty badges array', () => {
    const { container } = render(<TrustBadges badges={[]} />);
    
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders badges without icons', () => {
    const badgesWithoutIcons = [
      { id: 'test1', title: 'Test Badge 1' },
      { id: 'test2', title: 'Test Badge 2' },
    ];
    
    render(<TrustBadges badges={badgesWithoutIcons} />);
    
    expect(screen.getByText('Test Badge 1')).toBeInTheDocument();
    expect(screen.getByText('Test Badge 2')).toBeInTheDocument();
  });

  it('renders detailed variant with all content', () => {
    render(<TrustBadges badges={mockBadges} variant="detailed" showDescriptions={true} />);
    
    // Check all elements are present in detailed view
    expect(screen.getByText('Secure Platform')).toBeInTheDocument();
    expect(screen.getByText('256-bit')).toBeInTheDocument();
    expect(screen.getByText('Bank-level encryption')).toBeInTheDocument();
  });

  it('handles mixed badge configurations', () => {
    const mixedBadges = [
      { id: '1', title: 'Only Title' },
      { id: '2', title: 'With Value', value: '99%' },
      { id: '3', title: 'With Description', description: 'Test desc' },
      { id: '4', title: 'Full Badge', value: '100', description: 'Complete', highlight: true },
    ];
    
    render(<TrustBadges badges={mixedBadges} variant="detailed" />);
    
    expect(screen.getByText('Only Title')).toBeInTheDocument();
    expect(screen.getByText('99%')).toBeInTheDocument();
    expect(screen.getByText('Test desc')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('renders numeric values correctly', () => {
    const numericBadges = [
      { id: '1', title: 'Score', value: 100 },
      { id: '2', title: 'Rating', value: 4.5 },
    ];
    
    render(<TrustBadges badges={numericBadges} />);
    
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });
});