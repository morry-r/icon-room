import clsx from 'clsx';
import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

interface ButtonVariantsProps {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

const variantStyles = {
  default: 'bg-blue-500 text-white hover:bg-blue-400 active:bg-blue-600',
  secondary: 'bg-gray-500 text-white hover:bg-gray-400 active:bg-gray-600',
  outline: 'bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-50 active:bg-blue-100',
  ghost: 'bg-transparent text-blue-500 hover:bg-blue-50 active:bg-blue-100',
  destructive: 'bg-red-500 text-white hover:bg-red-400 active:bg-red-600'
};

const sizeStyles = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
  icon: 'h-8 w-8 p-0'
};

export function buttonVariants({ 
  variant = 'default', 
  size = 'md' 
}: ButtonVariantsProps = {}) {
  return clsx(
    'flex items-center rounded-lg font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
    variantStyles[variant],
    sizeStyles[size]
  );
}

export const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ 
  children, 
  className, 
  variant = 'default', 
  size = 'md', 
  ...rest 
}, ref) => {
  return (
    <button
      ref={ref}
      {...rest}
      className={clsx(
        buttonVariants({ variant, size }),
        className,
      )}
    >
      {children}
    </button>
  );
});
Button.displayName = 'Button';
