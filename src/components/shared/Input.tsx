"use client";

import { InputHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    label, 
    error, 
    hint,
    leftIcon,
    rightIcon,
    disabled,
    required,
    ...props 
  }, ref) => {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1.5"
      >
        {label && (
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">
              {label}
              {required && (
                <span className="text-primary ml-1">*</span>
              )}
            </label>
            {hint && (
              <span className="text-xs text-muted-foreground">
                {hint}
              </span>
            )}
          </div>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            disabled={disabled}
            className={twMerge(
              `w-full rounded-lg border bg-transparent px-3 py-2 text-sm
              transition-colors placeholder:text-muted-foreground/50
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30
              disabled:cursor-not-allowed disabled:opacity-50`,
              error ? 
                'border-red-500 focus-visible:ring-red-500/30' : 
                'border-border hover:border-primary/50',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground">
              {rightIcon}
            </div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-5 left-0 text-xs text-red-500"
            >
              {error}
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  }
);

Input.displayName = 'Input';

export default Input; 
