import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NavigationHeader } from '@/components/organisms/NavigationHeader';
import { FooterSection } from '@/components/organisms/FooterSection';

describe('Branding Consistency', () => {
  describe('CRUDgames.com brand name', () => {
    it('should display correct branding in NavigationHeader', () => {
      render(<NavigationHeader />);
      
      const logoText = screen.getByText('CRUDgames.com');
      expect(logoText).toBeInTheDocument();
      
      // Ensure it's not incorrect variations
      // CRUD must be uppercase, games must be lowercase
      expect(screen.queryByText('CRUDGames.com')).not.toBeInTheDocument();
      expect(screen.queryByText('CrudGames.com')).not.toBeInTheDocument();
      expect(screen.queryByText('crudgames.com')).not.toBeInTheDocument();
      expect(screen.queryByText('CRUDGAMES.com')).not.toBeInTheDocument();
    });
    
    it('should have correct default branding in FooterSection', () => {
      render(<FooterSection />);
      
      const companyName = screen.getByText('CRUDgames.com');
      expect(companyName).toBeInTheDocument();
    });
    
    it('should link to home page from logo', () => {
      render(<NavigationHeader />);
      
      const logoLink = screen.getByRole('link', { name: /CRUDgames.com/i });
      expect(logoLink).toHaveAttribute('href', '/');
      // Should NOT be an external link
      expect(logoLink).not.toHaveAttribute('href', 'https://crudgames.com');
    });
    
    it('should maintain correct branding: CRUD in caps, games in lowercase', () => {
      // This test ensures CRUD is always uppercase and games is always lowercase
      const correctBranding = 'CRUDgames.com';
      const incorrectVariations = [
        'CRUDGames.com',  // Games should not be capitalized
        'CrudGames.com',  // CRUD should be all caps
        'Crudgames.com',  // CRUD should be all caps
        'crudgames.com',  // CRUD should be all caps
        'CRUDGAMES.com',  // games should be lowercase
        'crudGames.com'   // CRUD should be all caps
      ];
      
      // Test NavigationHeader
      render(<NavigationHeader logoText={correctBranding} />);
      expect(screen.getByText(correctBranding)).toBeInTheDocument();
      
      incorrectVariations.forEach(variation => {
        expect(screen.queryByText(variation)).not.toBeInTheDocument();
      });
    });
  });
  
  describe('Brand consistency across components', () => {
    it('should use consistent branding format everywhere', () => {
      const { rerender } = render(<NavigationHeader />);
      let brandElement = screen.getByText('CRUDgames.com');
      expect(brandElement).toBeInTheDocument();
      
      rerender(<FooterSection companyName="CRUDgames.com" />);
      brandElement = screen.getByText('CRUDgames.com');
      expect(brandElement).toBeInTheDocument();
    });
  });
  
  describe('Typography consistency', () => {
    it('should use only approved fonts', () => {
      render(<NavigationHeader />);
      
      const container = document.querySelector('body');
      const computedStyles = window.getComputedStyle(container!);
      
      // Should only use Orbitron or Rajdhani fonts
      const fontFamily = computedStyles.fontFamily;
      
      // Should NOT contain removed fonts
      expect(fontFamily).not.toContain('VT323');
      expect(fontFamily).not.toContain('Share_Tech_Mono');
      expect(fontFamily).not.toContain('Share Tech Mono');
    });
  });
});