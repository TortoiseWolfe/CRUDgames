'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Sun, Moon, Power } from 'lucide-react';

export interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'holographic' | 'terminal' | 'power' | 'matrix';
}

export const ThemeToggle = ({ 
  className, 
  showLabel = false,
  size = 'md',
  variant = 'holographic'
}: ThemeToggleProps) => {
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

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const buttonSizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-2.5',
  };

  const getVariantStyles = () => {
    const isLight = theme === 'light';
    
    switch (variant) {
      case 'terminal':
        return cn(
          'bg-black border-2',
          isLight ? 
            'border-green-600/60 text-green-500 shadow-[0_0_20px_rgba(0,255,0,0.3),inset_0_0_15px_rgba(0,255,0,0.1)]' :
            'border-green-400/80 text-green-300 shadow-[0_0_30px_rgba(0,255,0,0.5),inset_0_0_20px_rgba(0,255,0,0.2)]',
          'hover:shadow-[0_0_40px_rgba(0,255,0,0.6)] hover:border-green-400',
          'before:absolute before:inset-0 before:bg-gradient-to-b before:from-green-500/10 before:to-transparent before:pointer-events-none'
        );
      
      case 'power':
        return cn(
          'bg-gradient-to-br border-2',
          isLight ?
            'from-slate-800 via-gray-900 to-slate-800 border-slate-600 text-amber-500' :
            'from-slate-900 via-black to-slate-900 border-amber-600/60 text-amber-400',
          isLight ?
            'shadow-[inset_0_2px_4px_rgba(0,0,0,0.6),0_0_20px_rgba(255,176,0,0.3)]' :
            'shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_0_30px_rgba(255,176,0,0.5)]',
          'hover:shadow-[0_0_40px_rgba(255,176,0,0.7)] transition-all duration-300'
        );
      
      case 'matrix':
        return cn(
          'bg-black border',
          isLight ?
            'border-blue-600/60 text-blue-500' :
            'border-cyan-400/60 text-cyan-300',
          'shadow-[0_0_30px_rgba(0,255,255,0.4),inset_0_0_20px_rgba(0,255,255,0.1)]',
          'hover:shadow-[0_0_50px_rgba(0,255,255,0.6)]',
          'overflow-hidden relative',
          'before:absolute before:inset-0 before:bg-[linear-gradient(0deg,transparent_24%,rgba(0,255,255,0.05)_25%,rgba(0,255,255,0.05)_26%,transparent_27%,transparent_74%,rgba(0,255,255,0.05)_75%,rgba(0,255,255,0.05)_76%,transparent_77%,transparent)] before:bg-[size:10px_10px] before:pointer-events-none'
        );
      
      default: // holographic
        return cn(
          'bg-gradient-to-br border-2 relative overflow-hidden',
          isLight ?
            'from-purple-900/30 via-pink-900/20 to-blue-900/30 border-purple-600/60' :
            'from-purple-950/60 via-pink-950/40 to-blue-950/60 border-purple-500/80',
          'shadow-[0_0_30px_rgba(147,51,234,0.4),inset_0_0_20px_rgba(147,51,234,0.1)]',
          'hover:shadow-[0_0_50px_rgba(147,51,234,0.6),inset_0_0_30px_rgba(147,51,234,0.2)]',
          'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-purple-400/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-1000 before:pointer-events-none',
          isLight ? 'text-purple-600' : 'text-purple-300'
        );
    }
  };

  const getIconStyles = () => {
    switch (variant) {
      case 'terminal':
        return 'drop-shadow-[0_0_8px_rgba(0,255,0,0.8)]';
      case 'power':
        return 'drop-shadow-[0_0_8px_rgba(255,176,0,0.8)]';
      case 'matrix':
        return 'drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]';
      default:
        return 'drop-shadow-[0_0_8px_rgba(147,51,234,0.8)]';
    }
  };

  const getLabelStyles = () => {
    switch (variant) {
      case 'terminal':
        return 'text-green-400 drop-shadow-[0_0_5px_currentColor]';
      case 'power':
        return 'text-amber-400 drop-shadow-[0_0_5px_currentColor]';
      case 'matrix':
        return 'text-cyan-400 drop-shadow-[0_0_5px_currentColor]';
      default:
        return 'text-purple-400 drop-shadow-[0_0_5px_currentColor]';
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "rounded-sm transition-all duration-300 inline-flex items-center gap-2 backdrop-blur-md font-mono uppercase tracking-wider relative",
        buttonSizeClasses[size],
        getVariantStyles(),
        "hover:scale-105 active:scale-95",
        className
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      aria-checked={theme === 'dark'}
      role="switch"
    >
      {/* Scan line effect for all variants */}
      <div className="absolute inset-0 pointer-events-none rounded-sm overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[2px] animate-[scan-line_3s_linear_infinite]" />
      </div>
      
      {variant === 'power' ? (
        <Power className={cn(sizeClasses[size], getIconStyles(), theme === 'dark' && 'animate-pulse')} />
      ) : theme === 'light' ? (
        <Moon className={cn(sizeClasses[size], getIconStyles())} />
      ) : (
        <Sun className={cn(sizeClasses[size], getIconStyles(), 'animate-pulse')} />
      )}
      {showLabel && (
        <span className={cn("text-xs font-bold", getLabelStyles())}>
          {variant === 'power' ? (theme === 'dark' ? 'ON' : 'OFF') : 
           variant === 'terminal' ? (theme === 'light' ? '> DARK' : '> LIGHT') :
           (theme === 'light' ? 'DARK' : 'LIGHT')}
        </span>
      )}
    </button>
  );
};

ThemeToggle.displayName = 'ThemeToggle';