'use client';

import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * Toast notification component.
 * Elevated dark surface, clean 1px border, floating shadow, accessible contrast.
 *
 * @param {Object} props
 * @param {string} props.message
 * @param {'success' | 'error' | 'info'} [props.type='success']
 * @param {boolean} props.isOpen
 * @param {function(): void} props.onClose
 * @param {number} [props.duration=3000]
 */
export default function Toast({
  message,
  type = 'success',
  isOpen,
  onClose,
  duration = 3000,
}) {
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-success shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-danger shrink-0" />,
    info: <Info className="w-4 h-4 text-accent shrink-0" />,
  };

  const borders = {
    success: 'border-success/40 bg-surface-elevated text-content-primary shadow-floating',
    error: 'border-danger/40 bg-surface-elevated text-content-primary shadow-floating',
    info: 'border-accent/40 bg-surface-elevated text-content-primary shadow-floating',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-3 left-3 sm:left-auto sm:right-6 sm:bottom-6 z-50 flex items-center gap-3 px-4 py-3 rounded-panel border text-sm max-w-none sm:max-w-sm',
        'animate-in fade-in slide-in-from-bottom-5 duration-150 ease-premium',
        borders[type] || borders.success
      )}
    >
      {icons[type] || icons.success}
      <p className="flex-1 text-xs font-medium leading-relaxed text-content-primary">{message}</p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close notification"
        className="p-1 rounded-btn hover:bg-base-subtle text-content-secondary hover:text-content-primary transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
