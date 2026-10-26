'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * Accessible Dropdown Component with keyboard navigation.
 * Premium dark theme, semantic tokens, 6px input radius, 8px menu radius.
 *
 * @param {Object} props
 * @param {Array<{id: string, name: string, badge?: string, description?: string}>} props.options
 * @param {string} props.value - Currently selected option id
 * @param {function(string): void} props.onChange - Selection callback
 * @param {string} [props.label] - Accessible label
 * @param {string} [props.placeholder='Select...']
 * @param {string} [props.className]
 */
export default function Dropdown({
  options = [],
  value,
  onChange,
  label,
  placeholder = 'Select option...',
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef(null);
  const listboxRef = useRef(null);

  const selectedOption = options.find((opt) => opt.id === value);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Sync highlighted index when opened
  useEffect(() => {
    if (isOpen) {
      const idx = options.findIndex((opt) => opt.id === value);
      setHighlightedIndex(idx >= 0 ? idx : 0);
    }
  }, [isOpen, value, options]);

  // Handle keyboard interaction
  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsOpen(true);
        }
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex((prev) => (prev + 1) % options.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex((prev) => (prev - 1 + options.length) % options.length);
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (highlightedIndex >= 0 && options[highlightedIndex]) {
            onChange(options[highlightedIndex].id);
            setIsOpen(false);
          }
          break;
        case 'Escape':
        case 'Tab':
          setIsOpen(false);
          break;
        default:
          break;
      }
    },
    [isOpen, highlightedIndex, options, onChange]
  );

  return (
    <div className={cn('relative w-full', className)} ref={containerRef}>
      {label && (
        <label className="block text-xs font-medium text-content-secondary mb-1.5">
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={label || 'Select option'}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        className={cn(
          'w-full flex items-center justify-between px-3 py-2 rounded-btn text-xs sm:text-sm',
          'bg-base-surface hover:bg-base-subtle border border-border-subtle hover:border-border-strong',
          'text-content-primary shadow-subtle transition-all duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
          isOpen && 'border-accent ring-2 ring-accent/20'
        )}
      >
        <div className="flex items-center gap-2 truncate">
          <span className="truncate font-medium text-content-primary">
            {selectedOption ? selectedOption.name : placeholder}
          </span>
          {selectedOption?.badge && (
            <span className="px-1.5 py-0.5 text-[10px] font-medium rounded-btn bg-accent-subtle text-accent border border-accent/20">
              {selectedOption.badge}
            </span>
          )}
        </div>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-content-secondary transition-transform duration-150 shrink-0 ml-2',
            isOpen && 'rotate-180 text-accent'
          )}
        />
      </button>

      {/* Menu dropdown */}
      {isOpen && (
        <ul
          ref={listboxRef}
          role="listbox"
          tabIndex={-1}
          aria-label={label || 'Options'}
          className={cn(
            'absolute z-50 left-0 right-0 mt-1 max-h-64 overflow-y-auto rounded-card p-1',
            'bg-base-elevated border border-border-subtle shadow-floating',
            'animate-in fade-in-50 zoom-in-95 duration-150'
          )}
        >
          {options.map((opt, index) => {
            const isSelected = opt.id === value;
            const isHighlighted = index === highlightedIndex;

            return (
              <li
                key={opt.id}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(opt.id);
                  setIsOpen(false);
                }}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={cn(
                  'flex items-center justify-between px-3 py-2 rounded-btn text-xs cursor-pointer transition-colors',
                  isHighlighted ? 'bg-base-subtle text-content-primary' : 'text-content-primary',
                  isSelected && 'bg-accent-subtle text-accent font-medium'
                )}
              >
                <div className="flex flex-col gap-0.5 truncate pr-2">
                  <div className="flex items-center gap-2">
                    <span className="truncate">{opt.name}</span>
                    {opt.badge && (
                      <span className="px-1.5 py-0.5 text-[9px] rounded-btn bg-base-subtle border border-border-subtle text-content-secondary">
                        {opt.badge}
                      </span>
                    )}
                  </div>
                  {opt.description && (
                    <span className="text-[11px] text-content-secondary truncate">
                      {opt.description}
                    </span>
                  )}
                </div>
                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-accent shrink-0" />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
