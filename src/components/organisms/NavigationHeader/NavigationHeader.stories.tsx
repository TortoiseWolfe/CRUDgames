import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { NavigationHeader } from './NavigationHeader';
import { GamepadIcon, Code, Cpu, Globe } from 'lucide-react';

const meta = {
  title: 'Organisms/NavigationHeader',
  component: NavigationHeader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Responsive navigation header with dropdown menus, mobile support, and sticky behavior.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    ctaAction: { action: 'CTA clicked' },
    variant: {
      control: 'select',
      options: ['default', 'transparent', 'dark', 'minimal'],
    },
  },
} satisfies Meta<typeof NavigationHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    logoText: 'CRUDgames',
    ctaText: 'Start Project',
    ctaAction: () => console.log('Start project clicked'),
  },
};

export const Transparent: Story = {
  args: {
    ...Default.args,
    variant: 'transparent',
  },
  decorators: [
    (Story) => (
      <div 
        className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600"
        style={{ paddingTop: 0 }}
      >
        <Story />
        <div className="p-8 text-white">
          <h1 className="text-4xl font-bold mb-4">Transparent Header</h1>
          <p>Scroll to see the header background appear</p>
        </div>
      </div>
    ),
  ],
};

export const Dark: Story = {
  args: {
    ...Default.args,
    variant: 'dark',
  },
};

export const Minimal: Story = {
  args: {
    ...Default.args,
    variant: 'minimal',
    showMobileMenu: false,
  },
};

export const CustomLinks: Story = {
  args: {
    logoText: 'GameStudio',
    links: [
      { label: 'Games', href: '#games', icon: <GamepadIcon className="h-4 w-4" /> },
      { 
        label: 'Services', 
        href: '#services',
        icon: <Code className="h-4 w-4" />,
        children: [
          { label: 'Unity Development', href: '#unity' },
          { label: 'Unreal Engine', href: '#unreal' },
          { label: 'Web Games', href: '#web' },
          { label: 'Mobile Games', href: '#mobile' },
        ]
      },
      { 
        label: 'Technology', 
        href: '#tech',
        icon: <Cpu className="h-4 w-4" />,
        children: [
          { label: 'Game Engines', href: '#engines' },
          { label: 'Multiplayer', href: '#multiplayer' },
          { label: 'Cloud Gaming', href: '#cloud' },
        ]
      },
      { label: 'Blog', href: 'https://blog.example.com', external: true, icon: <Globe className="h-4 w-4" /> },
    ],
    ctaText: 'Get Quote',
    ctaAction: () => console.log('Get quote clicked'),
  },
};

export const WithCustomLogo: Story = {
  args: {
    logo: (
      <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg">
        <span className="text-white font-bold text-xl">CG</span>
      </div>
    ),
    logoText: 'CRUDgames',
    ctaText: 'Play Demo',
    ctaAction: () => console.log('Play demo clicked'),
  },
};

export const NoSticky: Story = {
  args: {
    ...Default.args,
    sticky: false,
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <div className="h-screen p-8 bg-gray-100">
          <h1 className="text-2xl font-bold">Non-sticky header</h1>
          <p>Scroll down - the header won&apos;t follow</p>
        </div>
      </div>
    ),
  ],
};

export const NoCTA: Story = {
  args: {
    logoText: 'CRUDgames',
    // No ctaAction provided
  },
};

export const MobileView: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const CompleteExample: Story = {
  args: {
    logo: <GamepadIcon className="h-8 w-8 text-purple-600" />,
    logoText: 'CRUDgames',
    links: [
      { label: 'Home', href: '/' },
      { 
        label: 'Our Games', 
        href: '#games',
        children: [
          { label: 'Action Games', href: '#action' },
          { label: 'Strategy Games', href: '#strategy' },
          { label: 'RPG Games', href: '#rpg' },
          { label: 'Puzzle Games', href: '#puzzle' },
        ]
      },
      { 
        label: 'Services', 
        href: '#services',
        children: [
          { label: 'Full Game Development', href: '#full-dev' },
          { label: 'Game Porting', href: '#porting' },
          { label: 'Multiplayer Backend', href: '#backend' },
          { label: 'Game Consulting', href: '#consulting' },
        ]
      },
      { label: 'Portfolio', href: '#portfolio' },
      { label: 'Team', href: '#team' },
      { label: 'Blog', href: '#blog' },
      { label: 'Contact', href: '#contact' },
    ],
    ctaText: 'Start Your Game',
    ctaAction: () => console.log('Start game project'),
    variant: 'default',
    sticky: true,
    showMobileMenu: true,
  },
};