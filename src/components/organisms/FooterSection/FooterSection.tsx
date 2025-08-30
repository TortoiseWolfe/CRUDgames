'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/atoms/Button';
import Link from 'next/link';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Youtube,
  Github,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  ExternalLink
} from 'lucide-react';

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  platform: 'facebook' | 'twitter' | 'linkedin' | 'instagram' | 'youtube' | 'github';
  url: string;
  label?: string;
}

export interface FooterSectionProps {
  columns?: FooterColumn[];
  socialLinks?: SocialLink[];
  companyName?: string;
  companyDescription?: string;
  copyrightText?: string;
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  newsletterTitle?: string;
  newsletterDescription?: string;
  onNewsletterSubmit?: (email: string) => void;
  showBackToTop?: boolean;
  variant?: 'default' | 'minimal' | 'centered' | 'modern';
  className?: string;
}

const socialIcons = {
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  youtube: Youtube,
  github: Github,
};

export const FooterSection = forwardRef<HTMLElement, FooterSectionProps>(
  (
    {
      columns,
      socialLinks,
      companyName = 'Your Company',
      companyDescription,
      copyrightText,
      contactInfo,
      newsletterTitle,
      newsletterDescription,
      onNewsletterSubmit,
      showBackToTop = true,
      variant = 'default',
      className,
    },
    ref
  ) => {
    const currentYear = new Date().getFullYear();
    const defaultCopyright = `© ${currentYear} ${companyName}. All rights reserved.`;
    
    const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email') as string;
      if (email && onNewsletterSubmit) {
        onNewsletterSubmit(email);
        e.currentTarget.reset();
      }
    };

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const defaultColumns: FooterColumn[] = columns || [
      {
        title: 'Product',
        links: [
          { label: 'Features', href: '#features' },
          { label: 'Pricing', href: '#pricing' },
          { label: 'Demo', href: '#demo' },
          { label: 'Reviews', href: '#reviews' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '#about' },
          { label: 'Blog', href: '#blog' },
          { label: 'Careers', href: '#careers' },
          { label: 'Contact', href: '#contact' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Documentation', href: '#docs' },
          { label: 'Help Center', href: '#help' },
          { label: 'API Reference', href: '#api' },
          { label: 'Status', href: '#status' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { label: 'Privacy Policy', href: '/privacy' },
          { label: 'Terms of Service', href: '/terms' },
          { label: 'Cookie Policy', href: '#cookies' },
          { label: 'License', href: '#license' },
        ],
      },
    ];

    const renderLink = (link: FooterLink) => {
      const linkContent = (
        <>
          {link.label}
          {link.external && <ExternalLink className="ml-1 h-3 w-3 inline" />}
        </>
      );

      if (link.external) {
        return (
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            {linkContent}
          </a>
        );
      }

      return (
        <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
          {linkContent}
        </Link>
      );
    };

    if (variant === 'minimal') {
      return (
        <footer ref={ref} className={cn('bg-gray-900 text-gray-400 py-8', className)}>
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-sm">{copyrightText || defaultCopyright}</p>
              </div>
              {socialLinks && socialLinks.length > 0 && (
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const Icon = socialIcons[social.platform];
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label || social.platform}
                        className="hover:text-white transition-colors"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </footer>
      );
    }

    if (variant === 'centered') {
      return (
        <footer ref={ref} className={cn('bg-gray-900 text-gray-400 py-16', className)}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-white mb-4">{companyName}</h3>
              {companyDescription && (
                <p className="text-gray-400 mb-8 max-w-2xl mx-auto">{companyDescription}</p>
              )}
              
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                {defaultColumns[0].links.concat(defaultColumns[1].links).map((link, index) => (
                  <div key={index}>{renderLink(link)}</div>
                ))}
              </div>

              {socialLinks && socialLinks.length > 0 && (
                <div className="flex justify-center space-x-4 mb-8">
                  {socialLinks.map((social, index) => {
                    const Icon = socialIcons[social.platform];
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label || social.platform}
                        className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    );
                  })}
                </div>
              )}

              <div className="border-t border-gray-800 pt-8">
                <p className="text-sm">{copyrightText || defaultCopyright}</p>
              </div>
            </div>
          </div>
        </footer>
      );
    }

    // Default and Modern variants
    return (
      <footer 
        ref={ref} 
        className={cn(
          'bg-gray-900 text-gray-400',
          variant === 'modern' ? 'py-20' : 'py-16',
          className
        )}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Top Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
              {/* Company Info */}
              <div className="lg:col-span-4">
                <h3 className="text-xl font-bold text-white mb-4">{companyName}</h3>
                {companyDescription && (
                  <p className="text-gray-400 mb-6">{companyDescription}</p>
                )}
                
                {/* Contact Info */}
                {contactInfo && (
                  <div className="space-y-3">
                    {contactInfo.email && (
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        <a href={`mailto:${contactInfo.email}`} className="hover:text-white transition-colors">
                          {contactInfo.email}
                        </a>
                      </div>
                    )}
                    {contactInfo.phone && (
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        <a href={`tel:${contactInfo.phone}`} className="hover:text-white transition-colors">
                          {contactInfo.phone}
                        </a>
                      </div>
                    )}
                    {contactInfo.address && (
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 mr-2 mt-1" />
                        <span>{contactInfo.address}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Links Columns */}
              <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
                {defaultColumns.slice(0, 3).map((column, index) => (
                  <div key={index}>
                    <h4 className="font-semibold text-white mb-4">{column.title}</h4>
                    <ul className="space-y-2">
                      {column.links.map((link, linkIndex) => (
                        <li key={linkIndex}>{renderLink(link)}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Newsletter */}
              {onNewsletterSubmit && (
                <div className="lg:col-span-3">
                  <h4 className="font-semibold text-white mb-4">
                    {newsletterTitle || 'Stay Updated'}
                  </h4>
                  <p className="text-sm mb-4">
                    {newsletterDescription || 'Subscribe to our newsletter for updates and insights.'}
                  </p>
                  <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      required
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-400"
                    />
                    <Button type="submit" variant="primary" size="sm" className="w-full">
                      Subscribe
                    </Button>
                  </form>
                </div>
              )}
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
              <div className="mb-4 sm:mb-0">
                <p className="text-sm">{copyrightText || defaultCopyright}</p>
                <div className="flex space-x-4 mt-2">
                  {defaultColumns[3].links.map((link, index) => (
                    <span key={index} className="text-sm">
                      {renderLink(link)}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              {socialLinks && socialLinks.length > 0 && (
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const Icon = socialIcons[social.platform];
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label || social.platform}
                        className={cn(
                          'transition-colors',
                          variant === 'modern' 
                            ? 'bg-gray-800 p-2 rounded-lg hover:bg-gray-700'
                            : 'hover:text-white'
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        )}
      </footer>
    );
  }
);

FooterSection.displayName = 'FooterSection';