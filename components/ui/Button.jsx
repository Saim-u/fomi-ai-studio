'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * Reusable Button Component
 * Light theme, tiered 6px border-radius, accessible focus ring, no gradient slop.
 *
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'ghost' | 'outline' | 'danger'} [props.variant='primary']
 * @param {'xs' | 'sm' | 'md' | 'lg' | 'icon'} [props.size='md']
 * @param {boolean} [props.isLoading=false]
 * @param {React.ReactNode} [props.leftIcon]
 * @param {React.ReactNode} [props.rightIcon]
 * @param {string} [props.className]
 * @param {boolean} [props.disabled]
 * @param {React.ReactNode} props.children
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled = false,
  children,
  onClick,
  type = 'button',
  ...rest
}) {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium transition-all duration-150 ease-premium rounded-btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white select-none active:scale-[0.98]';

  // Map any legacy 'gradient' request directly to clean solid primary (Linear style #5E6AD2)
  const resolvedVariant = variant === 'gradient' ? 'primary' : variant;

  const variants = {
    primary:
      'bg-accent hover:bg-accent-hover text-white shadow-subtle border border-accent/20 active:bg-accent-hover',
    secondary:
      'bg-base-surface hover:bg-base-subtle text-content-primary border border-border-subtle hover:border-border-strong shadow-subtle active:bg-base-muted',
    ghost:
      'bg-transparent hover:bg-base-subtle text-content-secondary hover:text-content-primary active:bg-base-muted',
    outline:
      'bg-transparent border border-border-subtle hover:border-border-strong text-content-primary hover:bg-base-subtle active:bg-base-muted',
    danger:
      'bg-danger hover:bg-[#B91C1C] text-white border border-danger/30 shadow-subtle active:bg-[#991B1B]',
  };

  const sizes = {
    xs: 'text-xs px-2.5 py-1 min-h-[28px] gap-1.5',
    sm: 'text-xs px-3 py-1.5 min-h-[32px] gap-2',
    md: 'text-sm px-3.5 py-2 min-h-[38px] gap-2',
    lg: 'text-sm px-4.5 py-2.5 min-h-[42px] gap-2.5 font-medium',
    icon: 'p-2 min-w-[36px] min-h-[36px]',
  };

  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={isLoading}
      onClick={isDisabled ? undefined : onClick}
      className={cn(
        baseStyles,
        variants[resolvedVariant] || variants.primary,
        sizes[size] || sizes.md,
        isDisabled && 'opacity-50 cursor-not-allowed active:scale-100 shadow-none pointer-events-none',
        className
      )}
      {...rest}
    >
      {isLoading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin text-current" />
      ) : (
        leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
      )}
      <span className="truncate">{children}</span>
      {!isLoading && rightIcon && (
        <span className="inline-flex shrink-0">{rightIcon}</span>
      )}
    </button>
  );
}
