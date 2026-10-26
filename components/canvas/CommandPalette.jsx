'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Sparkles,
  Columns2,
  GitBranch,
  Ratio,
  Cpu,
  Layers,
  X,
  CornerDownLeft,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { AI_MODELS, ASPECT_RATIOS } from '../../lib/constants';

/**
 * CommandPalette (⌘+K / Ctrl+K)
 * Pro-tier keyboard accelerator in the premium black & orange theme.
 * Backdrop blur, elevated dark panel, ambient shadow, orange selection signal.
 */
export default function CommandPalette({
  isOpen,
  onClose,
  onSelectModel,
  onSelectRatio,
  onCompare,
  canCompare,
  onRandomPrompt,
  onBranchLatest,
  onToggleView,
  viewMode,
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const commands = [
    {
      id: 'toggle-view',
      title: viewMode === 'canvas' ? 'Switch to Studio Grid View' : 'Switch to Spatial Canvas View',
      category: 'View',
      icon: <Layers className="w-4 h-4 text-accent" />,
      action: () => {
        onToggleView();
        onClose();
      },
    },
    {
      id: 'compare-nodes',
      title: 'Compare Selected Nodes (Side-by-Side A/B)',
      category: 'Iteration',
      icon: <Columns2 className="w-4 h-4 text-accent" />,
      disabled: !canCompare,
      badge: canCompare ? 'Ready' : 'Select 2 nodes first',
      action: () => {
        if (canCompare) {
          onCompare();
          onClose();
        }
      },
    },
    {
      id: 'branch-latest',
      title: 'Branch from Latest Generation',
      category: 'Iteration',
      icon: <GitBranch className="w-4 h-4 text-accent" />,
      action: () => {
        onBranchLatest();
        onClose();
      },
    },
    {
      id: 'inspire',
      title: 'Surprise me with random prompt',
      category: 'Creative',
      icon: <Sparkles className="w-4 h-4 text-accent" />,
      action: () => {
        onRandomPrompt();
        onClose();
      },
    },
    ...AI_MODELS.map((m) => ({
      id: `model-${m.id}`,
      title: `Switch Model to ${m.name}`,
      category: 'AI Models',
      icon: <Cpu className="w-4 h-4 text-content-secondary" />,
      action: () => {
        onSelectModel(m.id);
        onClose();
      },
    })),
    ...ASPECT_RATIOS.map((r) => ({
      id: `ratio-${r.id}`,
      title: `Set Aspect Ratio to ${r.id} (${r.name})`,
      category: 'Format',
      icon: <Ratio className="w-4 h-4 text-content-secondary" />,
      action: () => {
        onSelectRatio(r.id);
        onClose();
      },
    })),
  ];

  const filtered = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex] && !filtered[selectedIndex].disabled) {
        filtered[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl rounded-panel bg-surface-elevated border border-border-subtle shadow-modal overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border-subtle bg-surface-elevated">
          <Search className="w-4 h-4 text-content-secondary shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or search actions (Esc to exit)..."
            className="w-full bg-transparent text-xs sm:text-sm text-content-primary placeholder:text-content-secondary/60 outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close command palette"
            className="p-1 rounded-btn hover:bg-base-subtle text-content-secondary hover:text-content-primary transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Command List */}
        <div className="max-h-80 overflow-y-auto p-1.5 space-y-0.5">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-content-secondary">
              No matching commands found.
            </div>
          ) : (
            filtered.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  type="button"
                  disabled={cmd.disabled}
                  onClick={cmd.disabled ? undefined : cmd.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2 rounded-btn text-xs transition-colors text-left',
                    isSelected ? 'bg-accent-subtle text-accent' : 'text-content-primary hover:bg-base-subtle',
                    cmd.disabled && 'opacity-40 cursor-not-allowed hover:bg-transparent text-content-secondary'
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    {cmd.icon}
                    <span className="font-medium">{cmd.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {cmd.badge && (
                      <span className="px-1.5 py-0.5 rounded-btn text-[10px] bg-base-subtle border border-border-subtle text-content-secondary font-mono">
                        {cmd.badge}
                      </span>
                    )}
                    <span className="text-[10px] text-content-secondary uppercase font-mono">
                      {cmd.category}
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-base-subtle border-t border-border-subtle flex items-center justify-between text-[11px] text-content-secondary">
          <span>Navigate with ↑ ↓ keys</span>
          <span className="flex items-center gap-1">
            <span>Execute</span>
            <CornerDownLeft className="w-3 h-3 text-content-secondary" />
          </span>
        </div>
      </div>
    </div>
  );
}
