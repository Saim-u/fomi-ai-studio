'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Heart,
  Trash2,
  Check,
  Compass,
} from 'lucide-react';
import ResultCard from './ResultCard';
import Skeleton from '../ui/Skeleton';
import { copyToClipboard } from '../../lib/utils';
import { mockPrompts } from '../../lib/mockData';

/**
 * WorkspaceGrid renders the creative canvas:
 * Top prompt metadata banner, responsive masonry result grid,
 * light skeleton placeholders during generation, and minimal empty state.
 */
export default function WorkspaceGrid({
  items = [],
  activePrompt = '',
  activeModel = '',
  activeRatio = '1:1',
  activeStyle = '',
  isGenerating = false,
  generatingCount = 4,
  onPreview,
  onUpscale,
  onToggleFavorite,
  onSelectPrompt,
  onClearCanvas,
  onShowToast,
}) {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [filterFavorites, setFilterFavorites] = useState(false);

  const handleCopyPrompt = async () => {
    if (!activePrompt) return;
    const success = await copyToClipboard(activePrompt);
    if (success) {
      setCopiedPrompt(true);
      onShowToast?.('Active prompt copied to clipboard', 'success');
      setTimeout(() => setCopiedPrompt(false), 2000);
    }
  };

  const displayedItems = filterFavorites
    ? items.filter((item) => item.isFavorite)
    : items;

  const ratioClasses = {
    '1:1': 'aspect-square',
    '16:9': 'aspect-video',
    '9:16': 'aspect-[9/16]',
    '4:5': 'aspect-[4/5]',
    '3:2': 'aspect-[3/2]',
  };
  const skeletonRatio = ratioClasses[activeRatio] || 'aspect-square';

  return (
    <section
      id="main-content"
      aria-label="Generated results canvas"
      className="flex-1 flex flex-col min-w-0 space-y-3.5"
    >
      {/* Top Prompt Metadata Card */}
      <div className="rounded-card bg-base-surface border border-border-subtle p-3 sm:p-3.5 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-medium uppercase tracking-wider text-accent flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Active Canvas Prompt
            </span>
            {activeModel && (
              <span className="px-2 py-0.5 rounded-btn bg-base-subtle border border-border-subtle text-[10px] font-mono text-content-secondary">
                {activeModel}
              </span>
            )}
            {activeRatio && (
              <span className="px-2 py-0.5 rounded-btn bg-base-subtle border border-border-subtle text-[10px] font-mono text-content-secondary">
                {activeRatio}
              </span>
            )}
            {activeStyle && (
              <span className="px-2 py-0.5 rounded-btn bg-accent-subtle border border-accent/20 text-[10px] font-mono text-accent font-medium">
                {activeStyle}
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-content-primary font-normal truncate sm:line-clamp-1">
            {activePrompt || 'Awaiting prompt input to synthesize creative variations...'}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
          {activePrompt && (
            <button
              type="button"
              onClick={handleCopyPrompt}
              title="Copy active prompt"
              aria-label="Copy prompt"
              className="p-1.5 px-2.5 rounded-btn bg-base-subtle hover:bg-base-muted text-content-secondary hover:text-content-primary border border-border-subtle transition-colors flex items-center gap-1.5 text-xs font-medium"
            >
              {copiedPrompt ? (
                <Check className="w-3.5 h-3.5 text-success" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span className="hidden md:inline">Copy</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setFilterFavorites((prev) => !prev)}
            aria-pressed={filterFavorites}
            title={filterFavorites ? 'Show all results' : 'Show only favorites'}
            aria-label="Filter favorites"
            className={`p-1.5 px-2.5 rounded-btn border transition-colors flex items-center gap-1.5 text-xs font-medium ${
              filterFavorites
                ? 'bg-rose-50 text-rose-600 border-rose-200'
                : 'bg-base-subtle hover:bg-base-muted text-content-secondary hover:text-content-primary border-border-subtle'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${filterFavorites ? 'fill-current' : ''}`} />
            <span className="hidden md:inline">Saved</span>
          </button>

          {items.length > 0 && (
            <button
              type="button"
              onClick={onClearCanvas}
              title="Clear canvas results"
              aria-label="Clear canvas results"
              className="p-2 rounded-btn bg-base-subtle hover:bg-danger-subtle text-content-secondary hover:text-danger border border-border-subtle transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Responsive 2 -> 3 -> 4 columns */}
      {displayedItems.length === 0 && !isGenerating ? (
        /* Empty State */
        <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-panel bg-base-surface border border-dashed border-border-subtle min-h-[440px]">
          <div className="w-12 h-12 rounded-card bg-accent-subtle border border-accent/20 flex items-center justify-center mb-3 text-accent shadow-subtle">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-sm sm:text-base font-semibold text-content-primary mb-1">
            {filterFavorites ? 'No saved favorites yet' : 'Your studio creations will appear here'}
          </h2>
          <p className="text-xs sm:text-sm text-content-secondary max-w-md mb-5 leading-relaxed">
            {filterFavorites
              ? 'Click the heart icon on any generated artwork to store it in your favorites collection.'
              : 'Enter a creative prompt or choose an inspiring preset below to begin synthesis.'}
          </p>

          {!filterFavorites && (
            <div className="w-full max-w-lg space-y-2 text-left">
              <span className="text-[11px] font-medium uppercase tracking-wider text-content-secondary px-0.5">
                Starter Prompts:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {mockPrompts.slice(0, 4).map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSelectPrompt?.(p)}
                    className="p-2.5 rounded-btn bg-base-subtle hover:bg-base-muted border border-border-subtle hover:border-accent text-left transition-all duration-150 group"
                  >
                    <p className="text-xs text-content-primary font-normal line-clamp-2 leading-relaxed">
                      "{p}"
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Grid of creations */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-3.5">
          {/* Skeleton placeholders while generating */}
          {isGenerating &&
            Array.from({ length: generatingCount }).map((_, idx) => (
              <Skeleton
                key={`generating-skel-${idx}`}
                variant="card"
                aspectRatio={skeletonRatio}
              />
            ))}

          {/* Actual items */}
          {displayedItems.map((item, idx) => (
            <ResultCard
              key={item.id}
              item={item}
              index={idx}
              onPreview={onPreview}
              onUpscale={onUpscale}
              onToggleFavorite={onToggleFavorite}
              onShowToast={onShowToast}
            />
          ))}
        </div>
      )}
    </section>
  );
}
