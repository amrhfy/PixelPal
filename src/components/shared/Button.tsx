"use client";

import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
  motionProps?: HTMLMotionProps<"button">;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    leftIcon, 
    rightIcon, 
    isLoading, 
    fullWidth,
    motionProps,
    children,
    disabled,
    ...props 
  }, ref) => {
    const baseStyles = `
      relative inline-flex items-center justify-center gap-2
      select-none overflow-hidden font-medium
      transition-all duration-200 ease-in-out
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30
      disabled:cursor-not-allowed disabled:opacity-60
    `;
    
    const variants = {
      primary: `
        bg-primary text-white
        shadow-[0_1px_2px_0_rgb(0_0_0_/_0.05)]
        hover:bg-primary-dark
        active:scale-[0.98]
        disabled:bg-primary/70
      `,
      secondary: `
        bg-white text-foreground
        border border-border/60
        shadow-[0_1px_2px_0_rgb(0_0_0_/_0.05)]
        hover:bg-accent hover:border-border
        active:scale-[0.98]
        disabled:bg-white
      `,
      outline: `
        border-2 border-primary/20 text-primary
        hover:bg-primary/5 hover:border-primary/30
        active:scale-[0.98]
        disabled:border-primary/10 disabled:text-primary/50
      `,
      ghost: `
        text-foreground hover:bg-accent
        active:scale-[0.98]
        disabled:text-foreground/50
      `,
      link: `
        text-primary underline-offset-4 hover:underline
        disabled:text-primary/50
      `,
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs rounded-lg gap-1.5',
      md: 'h-10 px-4 text-sm rounded-lg gap-2',
      lg: 'h-12 px-6 text-base rounded-xl gap-2.5',
    };

    const iconSizes = {
      sm: 'text-base',
      md: 'text-lg',
      lg: 'text-xl',
    };

    return (
      <motion.button
        ref={ref}
        {...motionProps}
        className={twMerge(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={isLoading || disabled}
        whileTap={!disabled && !isLoading ? { scale: 0.98 } : undefined}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && (
              <span className={iconSizes[size]}>
                {leftIcon}
              </span>
            )}
            {children}
            {rightIcon && (
              <span className={iconSizes[size]}>
                {rightIcon}
              </span>
            )}
          </>
        )}

        {/* Hover effect overlay */}
        {variant !== 'link' && (
          <span className="absolute inset-0 bg-white/0 hover:bg-white/10 transition-colors duration-200" />
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button; 
