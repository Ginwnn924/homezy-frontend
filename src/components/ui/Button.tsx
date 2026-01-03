import { ButtonHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth = false, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      // Deep Navy background, White text
      primary: 'bg-primary text-white hover:bg-[#2A466D] hover:shadow-lg focus:ring-primary/20',

      // Warm Gold background, White text
      gold: 'bg-secondary text-white hover:bg-[#D9B972] hover:shadow-gold focus:ring-secondary/20',

      // Gray background (cho nút phụ)
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 focus:ring-gray-200',

      // Outline Primary
      outline: 'border-2 border-primary text-primary bg-transparent hover:bg-primary/5 active:bg-primary/10 focus:ring-primary/20',

      // Ghost (text only)
      ghost: 'text-primary hover:bg-primary/5 active:bg-primary/10',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-6 py-2.5 text-base', // Padding rộng hơn chút cho sang
      lg: 'px-8 py-3.5 text-lg',
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={twMerge(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
