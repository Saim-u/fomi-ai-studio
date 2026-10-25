'use client';

import React, { useState, useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * Accessible Accordion component with smooth animated reveal.
 * Light theme, semantic tokens, 8px card radius.
 *
 * @param {Object} props
 * @param {string} props.title - Accordion header title
 * @param {React.ReactNode} [props.icon] - Leading icon
 * @param {string | number} [props.badge] - Optional badge tag
 * @param {boolean} [props.defaultOpen=false]
 * @param {React.ReactNode} props.children - Collapsible content
 * @param {string} [props.className]
 */
export default function Accordion({
  title,
  icon,
  badge,
  defaultOpen = false,
  children,
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentId = useId();
  const headerId = useId();

  return (
    <div
      className={cn(
        'border border-border-subtle rounded-card bg-base-surface transition-colors shadow-subtle',
        isOpen && 'border-border-strong',
        className
      )}
    >
      <button
        type="button"
        id={headerId}
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-3.5 py-2.5 text-left transition-colors hover:bg-base-subtle/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-card"
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-content-secondary text-xs">{icon}</span>}
          <span className="text-xs font-medium text-content-primary">
            {title}
          </span>
          {badge !== undefined && (
            <span className="px-2 py-0.5 text-[10px] font-medium rounded-btn bg-accent-subtle text-accent border border-accent/20">
              {badge}
            </span>
          )}
        </div>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-content-secondary transition-transform duration-200',
            isOpen && 'rotate-180 text-accent'
          )}
        />
      </button>

      <div
        id={contentId}
        role="region"
        aria-labelledby={headerId}
        className={cn(
          'grid transition-all duration-200 ease-premium',
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
        )}
      >
        <div className="overflow-hidden">
          <div className="p-3.5 pt-2 border-t border-border-subtle space-y-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
