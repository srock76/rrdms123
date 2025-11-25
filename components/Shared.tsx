import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';

// Dynamic Icon Component
export const Icon = ({ name, className = "", size = 24 }: { name: string; className?: string; size?: number }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const LucideIcon = (LucideIcons as any)[name];
  if (!LucideIcon) return <LucideIcons.HelpCircle size={size} className={className} />;
  return <LucideIcon size={size} className={className} />;
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  isLoading,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg';
  
  const variants = {
    primary: 'bg-[var(--primary)] text-white hover:opacity-90 focus:ring-[var(--primary)]',
    secondary: 'bg-[var(--secondary)] text-white hover:opacity-90 focus:ring-[var(--secondary)]',
    outline: 'border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? <LucideIcons.Loader2 className="animate-spin mr-2" /> : null}
      {children}
    </button>
  );
};

export const Input: React.FC<InputHTMLAttributes<HTMLInputElement> & { label?: string }> = ({ label, className = '', ...props }) => (
  <div className="mb-4">
    {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
    <input
      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition-all ${className}`}
      {...props}
    />
  </div>
);

export const TextArea: React.FC<TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }> = ({ label, className = '', ...props }) => (
  <div className="mb-4">
    {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
    <textarea
      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition-all ${className}`}
      {...props}
    />
  </div>
);

export const Section = ({ children, className = '', bg = 'white' }: { children: React.ReactNode; className?: string; bg?: 'white' | 'gray' | 'dark' }) => {
    const bgColors = {
        white: 'bg-white',
        gray: 'bg-gray-50',
        dark: 'bg-[var(--secondary)] text-white'
    }
  return (
    <section className={`py-16 md:py-24 ${bgColors[bg]} ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};

export const SectionHeader = ({ title, subtitle, center = true }: { title: string; subtitle?: string; center?: boolean }) => (
  <div className={`mb-12 ${center ? 'text-center' : ''}`}>
    <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
    {subtitle && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);
