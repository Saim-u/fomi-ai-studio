'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import {
  X,
  Download,
  Copy,
  Check,
  Sparkles,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn, downloadImage, copyToClipboard } from '../../lib/utils';
import Button from '../ui/Button';

/**
 * High-fidelity Inspector / Preview Modal
 * Premium black & orange theme, focus trap, keyboard cycling (Left/Right/Esc).
 */
export default function PreviewModal({
  isOpen,
  item,
  onClose,
  onNext,
  onPrev,
  hasNext = false,
  hasPrev = false,
  onUpscale,
  onToggleFavorite,
  onShowToast,
}) {
  const modalRef = useRef(null);
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = async (text, fieldName) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedField(fieldName);
      onShowToast?.(`Copied ${fieldName} to clipboard!`, 'success');
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  // Keyboard navigation & accessibility focus trap
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasPrev) {
        onPrev?.();
      } else if (e.key === 'ArrowRight' && hasNext) {
        onNext?.();
      }

      // Trap focus
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    },
    [onClose, onPrev, onNext, hasPrev, hasNext]
  );

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    if (modalRef.current) {
      modalRef.current.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-prompt-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      {/* Modal Dialog Content */}
      <div
        ref={modalRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'relative w-full max-w-5xl max-h-[92vh] rounded-panel bg-surface-elevated border border-border-subtle shadow-modal overflow-hidden flex flex-col lg:flex-row',
          'animate-in zoom-in-95 duration-150 focus:outline-none'
        )}
      >
        {/* Close Button Top Right */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-3.5 right-3.5 z-30 p-1.5 rounded-btn bg-base-surface/90 hover:bg-base-surface text-content-secondary hover:text-content-primary border border-border-subtle shadow-subtle transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Side: Large Image Viewport + Nav Controls */}
        <div className="relative flex-1 bg-base-subtle flex items-center justify-center min-h-[220px] sm:min-h-[340px] lg:min-h-[540px] p-3 sm:p-4 select-none">
          <div className="relative w-full h-full max-h-[75vh] flex items-center justify-center">
            <Image
              src={item.url}
              alt={item.prompt || 'Generated art preview'}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="object-contain rounded-btn"
            />
          </div>

          {/* Previous Arrow */}
          {hasPrev && (
            <button
              type="button"
              onClick={onPrev}
              aria-label="View previous image (Left Arrow)"
              className="absolute left-3.5 p-2 rounded-btn bg-base-surface/90 hover:bg-base-surface text-content-primary border border-border-subtle shadow-subtle transition-all duration-150 hover:scale-105"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {/* Next Arrow */}
          {hasNext && (
            <button
              type="button"
              onClick={onNext}
              aria-label="View next image (Right Arrow)"
              className="absolute right-3.5 p-2 rounded-btn bg-base-surface/90 hover:bg-base-surface text-content-primary border border-border-subtle shadow-subtle transition-all duration-150 hover:scale-105"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Right Side: Creative Metadata & Action Panel */}
        <div className="w-full lg:w-[360px] border-t lg:border-t-0 lg:border-l border-border-subtle p-4 sm:p-5 flex flex-col justify-between overflow-y-auto max-h-[50vh] lg:max-h-[92vh] bg-base-surface">
          <div className="space-y-4">
            {/* Header info */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-medium text-accent">
                Generation Inspector
              </span>
              <span className="px-2 py-0.5 rounded-btn bg-base-subtle border border-border-subtle text-[10px] font-mono text-content-secondary">
                {item.aspectRatio}
              </span>
            </div>

            {/* Prompt Section */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-content-secondary">Prompt</span>
                <button
                  type="button"
                  onClick={() => handleCopy(item.prompt, 'Prompt')}
                  className="text-xs text-accent hover:text-accent-hover font-medium flex items-center gap-1"
                >
                  {copiedField === 'Prompt' ? <Check className="w-3 h-3 text-success" /> : <Copy className="w-3 h-3" />}
                  <span>Copy</span>
                </button>
              </div>
              <p
                id="modal-prompt-title"
                className="text-xs text-content-primary font-normal leading-relaxed bg-base-subtle p-3 rounded-btn border border-border-subtle"
              >
                {item.prompt}
              </p>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-btn bg-base-subtle border border-border-subtle space-y-0.5">
                <span className="text-[10px] uppercase text-content-secondary font-mono">Model</span>
                <p className="font-medium text-content-primary truncate">{item.model || 'Fomi Ultra 2.5'}</p>
              </div>

              <div className="p-2.5 rounded-btn bg-base-subtle border border-border-subtle space-y-0.5">
                <span className="text-[10px] uppercase text-content-secondary font-mono">Seed</span>
                <div className="flex items-center justify-between">
                  <p className="font-mono text-content-primary">{item.seed || '948210'}</p>
                  <button
                    type="button"
                    onClick={() => handleCopy(String(item.seed || '948210'), 'Seed')}
                    className="text-content-secondary hover:text-content-primary"
                    aria-label="Copy seed value"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="p-2.5 rounded-btn bg-base-subtle border border-border-subtle space-y-0.5">
                <span className="text-[10px] uppercase text-content-secondary font-mono">Dimensions</span>
                <p className="font-mono text-content-primary">{item.width || 1024} × {item.height || 1024}</p>
              </div>

              <div className="p-2.5 rounded-btn bg-base-subtle border border-border-subtle space-y-0.5">
                <span className="text-[10px] uppercase text-content-secondary font-mono">Generated</span>
                <p className="text-content-primary">{item.createdAt || 'Just now'}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons Footer */}
          <div className="pt-4 space-y-2 border-t border-border-subtle mt-4">
            <Button
              variant="primary"
              size="md"
              onClick={() => onUpscale?.(item)}
              leftIcon={<Sparkles className="w-4 h-4" />}
              className="w-full font-medium"
            >
              Upscale to 4K Ultra-Res
            </Button>

            <div className="grid grid-cols-3 gap-1.5">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => downloadImage(item.url, `fomi-${item.seed}.jpg`)}
                leftIcon={<Download className="w-3.5 h-3.5" />}
              >
                Download
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleCopy(item.url, 'Image Link')}
                leftIcon={<Share2 className="w-3.5 h-3.5" />}
              >
                Share
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onToggleFavorite?.(item.id)}
                leftIcon={
                  <Heart
                    className={cn(
                      'w-3.5 h-3.5',
                      item.isFavorite && 'fill-rose-500 text-rose-500'
                    )}
                  />
                }
              >
                {item.isFavorite ? 'Saved' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
