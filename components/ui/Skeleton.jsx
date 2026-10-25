import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Skeleton shimmer component for loading states.
 * Premium light theme shimmer (#F4F4F5 to #E5E5E5) with subtle white specular highlight.
 * No dark shimmers or dark overlays.
 *
 * @param {Object} props
 * @param {'card' | 'thumbnail' | 'text' | 'circle' | 'rect'} [props.variant='rect']
 * @param {string} [props.className]
 * @param {string} [props.aspectRatio='aspect-square']
 */
export default function Skeleton({
  variant = 'rect',
  className = '',
  aspectRatio = 'aspect-square',
}) {
  const baseShimmer = 'relative overflow-hidden bg-base-subtle animate-shimmer';

  if (variant === 'card') {
    return (
      <div
        className={cn(
          'relative rounded-card overflow-hidden border border-border-subtle bg-base-surface shadow-subtle flex flex-col justify-between p-2.5',
          aspectRatio,
          className
        )}
      >
        <div className={cn('w-full flex-1 rounded-btn', baseShimmer)} />
        <div className="pt-2 space-y-1.5">
          <div className={cn('h-2.5 w-3/4 rounded-btn', baseShimmer)} />
          <div className="flex items-center gap-2">
            <div className={cn('h-2 w-1/3 rounded-btn', baseShimmer)} />
            <div className={cn('h-2 w-1/4 rounded-btn', baseShimmer)} />
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'thumbnail') {
    return (
      <div
        className={cn(
          'w-13 h-13 rounded-card border border-border-subtle shrink-0',
          baseShimmer,
          className
        )}
      />
    );
  }

  if (variant === 'circle') {
    return (
      <div
        className={cn('rounded-full shrink-0', baseShimmer, className)}
      />
    );
  }

  if (variant === 'text') {
    return (
      <div
        className={cn('h-2.5 w-full rounded-btn', baseShimmer, className)}
      />
    );
  }

  return (
    <div
      className={cn('rounded-card', baseShimmer, className)}
    />
  );
}
