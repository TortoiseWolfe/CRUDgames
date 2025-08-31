'use client';

import { forwardRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/atoms/Button';
import Link from 'next/link';
import { 
  Menu, 
  X, 
  ChevronDown,
  GamepadIcon,
  Home,
  Briefcase,
  Users,
  Mail,
  ExternalLink,
  ArrowRight,
  Sun,
  Moon
} from 'lucide-react';

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
  icon?: React.ReactNode;
  children?: NavLink[];
}

export interface NavigationHeaderProps {
  logo?: React.ReactNode;
  logoText?: string;
  logoHref?: string;
  links?: NavLink[];
  ctaText?: string;
  ctaAction?: () => void;
  variant?: 'default' | 'transparent' | 'dark' | 'minimal';
  sticky?: boolean;
  showMobileMenu?: boolean;
  className?: string;
}

export const NavigationHeader = forwardRef<HTMLElement, NavigationHeaderProps>(
  (
    {
      logo,
      logoText = 'CRUDgames.com',
      logoHref = 'https://crudgames.com',
      links,
      ctaText = 'Get Started',
      ctaAction,
      variant = 'default',
      sticky = true,
      showMobileMenu = true,
      className,
    },
    ref
  ) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    // Initialize theme from localStorage or system preference
    useEffect(() => {
      const stored = localStorage.getItem('theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = stored === 'dark' || (!stored && systemPrefersDark) ? 'dark' : 'light';
      
      setTheme(initialTheme);
      if (initialTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }, []);

    // Handle theme toggle
    const toggleTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    useEffect(() => {
      if (!sticky) return;

      const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [sticky]);

    const defaultLinks: NavLink[] = links || [
      { label: 'Home', href: '/', icon: <Home className="h-4 w-4" /> },
      { 
        label: 'Services', 
        href: '#services',
        icon: <Briefcase className="h-4 w-4" />,
        children: [
          { label: 'Game Development', href: '#game-dev' },
          { label: 'Backend Services', href: '#backend' },
          { label: 'Multiplayer Infrastructure', href: '#multiplayer' },
          { label: 'Consulting', href: '#consulting' },
        ]
      },
      { label: 'Portfolio', href: '#portfolio', icon: <GamepadIcon className="h-4 w-4" /> },
      { label: 'About', href: '#about', icon: <Users className="h-4 w-4" /> },
      { label: 'Contact', href: '#contact', icon: <Mail className="h-4 w-4" /> },
    ];

    const variantClasses = {
      default: cn(
        'bg-white dark:bg-gray-900 border-b dark:border-gray-700',
        isScrolled && sticky && 'shadow-md'
      ),
      transparent: cn(
        'bg-transparent',
        isScrolled && sticky && 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md'
      ),
      dark: 'bg-gray-900 text-white border-b border-gray-800',
      minimal: 'bg-white dark:bg-gray-900',
    };

    const textColorClasses = {
      default: 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white',
      transparent: isScrolled ? 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white' : 'text-white hover:text-gray-200',
      dark: 'text-gray-300 hover:text-white',
      minimal: 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white',
    };

    const renderLink = (link: NavLink, index: number) => {
      const hasChildren = link.children && link.children.length > 0;
      const isOpen = openDropdown === link.label;

      if (hasChildren) {
        return (
          <div key={index} className="relative">
            <button
              onClick={() => setOpenDropdown(isOpen ? null : link.label)}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-lg transition-colors',
                textColorClasses[variant]
              )}
            >
              {link.icon}
              {link.label}
              <ChevronDown 
                className={cn(
                  'h-4 w-4 transition-transform',
                  isOpen && 'rotate-180'
                )}
              />
            </button>
            
            {isOpen && link.children && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                {link.children.map((child, childIndex) => (
                  <Link
                    key={childIndex}
                    href={child.href}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setOpenDropdown(null)}
                  >
                    {child.label}
                    {child.external && <ExternalLink className="inline ml-1 h-3 w-3" />}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      }

      return (
        <Link
          key={index}
          href={link.href}
          className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-lg transition-colors',
            textColorClasses[variant]
          )}
        >
          {link.icon}
          {link.label}
          {link.external && <ExternalLink className="h-4 w-4" />}
        </Link>
      );
    };

    return (
      <header
        ref={ref}
        className={cn(
          'transition-all duration-300',
          sticky && 'sticky top-0 z-40',
          variantClasses[variant],
          className
        )}
      >
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              href={logoHref}
              className="flex items-center gap-2 font-bold text-xl"
            >
              {logo || <GamepadIcon className="h-8 w-8 text-purple-600" />}
              <span className={cn(variant === 'dark' ? 'text-white' : 'text-gray-900 dark:text-white')}>
                {logoText}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {defaultLinks.map((link, index) => renderLink(link, index))}
            </div>

            {/* CTA Button and Theme Toggle */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  "hover:bg-gray-100 dark:hover:bg-gray-800",
                  variant === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                )}
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </button>
              {ctaAction && (
                <Button
                  onClick={ctaAction}
                  variant={variant === 'dark' ? 'secondary' : 'primary'}
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  {ctaText}
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            {showMobileMenu && (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  'md:hidden p-2 rounded-lg',
                  textColorClasses[variant]
                )}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            )}
          </div>

          {/* Mobile Navigation */}
          {showMobileMenu && isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="space-y-2">
                {defaultLinks.map((link, index) => {
                  if (link.children) {
                    return (
                      <div key={index}>
                        <button
                          onClick={() => setOpenDropdown(
                            openDropdown === link.label ? null : link.label
                          )}
                          className={cn(
                            'w-full flex items-center justify-between px-3 py-2 rounded-lg',
                            textColorClasses[variant]
                          )}
                        >
                          <span className="flex items-center gap-2">
                            {link.icon}
                            {link.label}
                          </span>
                          <ChevronDown 
                            className={cn(
                              'h-4 w-4 transition-transform',
                              openDropdown === link.label && 'rotate-180'
                            )}
                          />
                        </button>
                        
                        {openDropdown === link.label && (
                          <div className="ml-6 mt-2 space-y-1">
                            {link.children.map((child, childIndex) => (
                              <Link
                                key={childIndex}
                                href={child.href}
                                className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                                onClick={() => {
                                  setOpenDropdown(null);
                                  setIsMobileMenuOpen(false);
                                }}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={index}
                      href={link.href}
                      className={cn(
                        'flex items-center gap-2 px-3 py-2 rounded-lg',
                        textColorClasses[variant]
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  );
                })}
                
                {/* Theme Toggle for Mobile */}
                <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={toggleTheme}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 rounded-lg",
                      "hover:bg-gray-100 dark:hover:bg-gray-800",
                      textColorClasses[variant]
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                      <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                    </span>
                  </button>
                </div>
                
                {ctaAction && (
                  <div className="pt-4">
                    <Button
                      onClick={() => {
                        ctaAction();
                        setIsMobileMenuOpen(false);
                      }}
                      variant={variant === 'dark' ? 'secondary' : 'primary'}
                      className="w-full"
                    >
                      {ctaText}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>
    );
  }
);

NavigationHeader.displayName = 'NavigationHeader';