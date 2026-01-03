import { InputHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-semibold text-gray-700 block tracking-wide">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={id}
            ref={ref}
            className={twMerge(
              'w-full px-4 py-3 bg-white border border-gray-200 rounded-lg outline-none transition-all duration-300',
              'text-gray-900 placeholder:text-gray-400',
              'focus:border-primary focus:ring-4 focus:ring-primary/5 hover:border-gray-300',
              'disabled:bg-gray-50 disabled:text-gray-500',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/10',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-red-500 mt-1 font-medium animate-pulse">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
