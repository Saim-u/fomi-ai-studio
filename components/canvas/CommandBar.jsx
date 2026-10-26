'use client';

import React from 'react';
import {
  Sparkles,
  Command,
  GitBranch,
  X,
  Ratio,
  Cpu,
} from 'lucide-react';
import Button from '../ui/Button';
import { AI_MODELS } from '../../lib/constants';

/**
 * CommandBar
 * Keyboard-first prompt dock fixed at the bottom of the spatial canvas.
 * Docked edge-to-edge on mobile, floating on desktop. Dark elevated surface,
 * 1px border, ambient shadow, and a single orange generate action.
 */
export default function CommandBar({
  prompt,
  setPrompt,
  onGenerate,
  isGenerating,
  branchParent,
  onCancelBranch,
  model,
  setModel,
  aspectRatio,
  setAspectRatio,
  count,
  setCount,
  onOpenPalette,
  credits,
}) {
  const selectedModel = AI_MODELS.find((m) => m.id === model) || AI_MODELS[0];

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      if (prompt.trim() && !isGenerating) {
        onGenerate();
      }
    }
  };

  return (
    <div className="fixed bottom-0 sm:bottom-5 inset-x-0 z-40 px-0 sm:px-6 pointer-events-none flex justify-center">
      <div className="w-full max-w-4xl pointer-events-auto rounded-t-panel sm:rounded-panel bg-surface-elevated border-t border-x-0 sm:border border-border-subtle shadow-floating p-2 sm:p-2.5 pb-[calc(0.5rem+env(safe-area-inset-bottom))] sm:pb-2.5 flex flex-col gap-2">
        {/* Branch Context Indicator */}
        {branchParent && (
          <div className="flex items-center justify-between px-3 py-1.5 rounded-btn bg-accent-subtle border border-accent/25 text-xs animate-in fade-in slide-in-from-bottom-2 duration-150">
            <div className="flex items-center gap-2 min-w-0">
              <GitBranch className="w-3.5 h-3.5 text-accent shrink-0" />
              <span className="font-medium text-accent shrink-0">Branching:</span>
              <span className="truncate text-content-primary">"{branchParent.prompt.slice(0, 60)}..."</span>
            </div>
            <button
              type="button"
              onClick={onCancelBranch}
              className="text-content-secondary hover:text-content-primary p-0.5 rounded-btn ml-2 shrink-0 transition-colors"
              title="Cancel branching (generate new root)"
              aria-label="Cancel branch context"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Input Row */}
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          {/* Quick Command Palette Button */}
          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Open command palette (⌘K)"
            title="Command Palette (⌘K)"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-2 rounded-btn bg-base-subtle hover:bg-base-muted border border-border-subtle text-xs text-content-secondary hover:text-content-primary font-medium transition-colors shrink-0"
          >
            <Command className="w-3.5 h-3.5 text-content-secondary" />
            <span className="font-mono text-[10px] text-content-secondary">⌘K</span>
          </button>

          {/* Prompt Input */}
          <div className="relative flex-1 min-w-0">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={branchParent ? 'Describe modifications for this branch...' : 'Describe imagination to synthesize on canvas...'}
              className="w-full px-3.5 py-2 rounded-btn bg-base-subtle/50 border border-border-subtle text-xs sm:text-sm text-content-primary placeholder:text-content-secondary/60 outline-none focus:bg-base-surface focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            />
          </div>

          {/* Model Pill */}
          <button
            type="button"
            onClick={onOpenPalette}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-2 rounded-btn bg-base-subtle hover:bg-base-muted border border-border-subtle text-xs text-content-secondary hover:text-content-primary transition-colors shrink-0"
          >
            <Cpu className="w-3.5 h-3.5 text-content-secondary" />
            <span className="font-medium text-content-primary truncate max-w-[90px]">
              {selectedModel.name.replace('Fomi ', '')}
            </span>
          </button>

          {/* Aspect Ratio Pill */}
          <button
            type="button"
            onClick={() => {
              const ratios = ['1:1', '16:9', '9:16', '4:5', '3:2'];
              const nextIndex = (ratios.indexOf(aspectRatio) + 1) % ratios.length;
              setAspectRatio(ratios[nextIndex]);
            }}
            title="Click to toggle aspect ratio"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-2 rounded-btn bg-base-subtle hover:bg-base-muted border border-border-subtle text-xs font-mono text-content-primary transition-colors shrink-0"
          >
            <Ratio className="w-3.5 h-3.5 text-content-secondary" />
            <span>{aspectRatio}</span>
          </button>

          {/* Generate Button: the single primary orange signal */}
          <Button
            variant="primary"
            size="md"
            isLoading={isGenerating}
            disabled={!prompt.trim() || isGenerating}
            onClick={onGenerate}
            leftIcon={<Sparkles className="w-4 h-4" />}
            className="shrink-0 font-medium px-2.5 sm:px-3.5"
          >
            {isGenerating ? 'Generating...' : branchParent ? 'Branch Node' : 'Generate'}
          </Button>
        </div>
      </div>
    </div>
  );
}
