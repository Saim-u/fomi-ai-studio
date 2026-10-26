'use client';

import React, { memo, useState } from 'react';
import Image from 'next/image';
import {
  Download,
  Heart,
  Share2,
  Sparkles,
  Check,
  ZoomIn,
} from 'lucide-react';
import { cn, downloadImage, copyToClipboard } from '../../lib/utils';

/**
 * ResultCard displays an individual generated artwork in studio grid.
 * Surface-dark card, 1px border, 8px radius, subtle lift on hover.
 */
const ResultCard = memo(function ResultCard({
  item,
  index = 0,
  onPreview,
  onUpscale,
  onToggleFavorite,
  onShowToast,
}) {
  const [isCopied, setIsCopied] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleShare = async (e) => {
    e.stopPropagation();
    const success = await copyToClipboard(item.url);
    if (success) {
      setIsCopied(true);
      onShowToast?.('Image URL copied to clipboard!', 'success');
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    downloadImage(item.url, `fomi-${item.seed || 'art'}.jpg`);
    onShowToast?.('Download started', 'info');
  };

  const handleUpscale = (e) => {
    e.stopPropagation();
    onUpscale?.(item);
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    onToggleFavorite?.(item.id);
  };

  const ratioClasses = {
    '1:1': 'aspect-square',
    '16:9': 'aspect-video',
    '9:16': 'aspect-[9/16]',
    '4:5': 'aspect-[4/5]',
    '3:2': 'aspect-[3/2]',
  };
  const ratioClass = ratioClasses[item.aspectRatio] || 'aspect-square';

  return (
    <article
      tabIndex={0}
      role="button"
      onClick={() => onPreview?.(item)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onPreview?.(item);
        }
      }}
      aria-label={`View creation: ${item.prompt}`}
      style={{ animationDelay: `${index * 60}ms` }}
      className={cn(
        'group relative rounded-card overflow-hidden bg-base-surface border border-border-subtle hover:border-accent',
        'transition-all duration-150 ease-premium hover:-translate-y-0.5 hover:shadow-elevated',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas animate-fade-up cursor-pointer',
        ratioClass
      )}
    >
      {/* Background Image */}
      <Image
        src={item.url}
        alt={item.prompt || 'AI generated artwork'}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        onLoad={() => setImageLoaded(true)}
        className={cn(
          'object-cover transition-transform duration-300 group-hover:scale-105',
          imageLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
        )}
      />

      {/* Top badges: aspect ratio & favorite */}
      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
        <span className="px-1.5 py-0.5 rounded-btn bg-canvas/80 backdrop-blur-sm text-[10px] font-mono text-content-primary border border-border-subtle shadow-xs">
          {item.aspectRatio}
        </span>
        <button
          type="button"
          onClick={handleFavorite}
          aria-label={item.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className={cn(
            'pointer-events-auto p-1.5 rounded-btn backdrop-blur-sm transition-colors shadow-xs border',
            item.isFavorite
              ? 'bg-canvas text-rose-400 border-rose-500/40'
              : 'bg-canvas/80 text-content-secondary hover:text-rose-400 border-border-subtle hover:bg-canvas'
          )}
        >
          <Heart className={cn('w-3.5 h-3.5', item.isFavorite && 'fill-current')} />
        </button>
      </div>

      {/* Hover Overlay with Action Buttons */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex flex-col justify-end p-3 z-20">
        {/* Action icons bar */}
        <div className="flex items-center justify-between gap-1.5 pb-2 mb-2 border-b border-white/15">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleUpscale}
              aria-label="Upscale 4x"
              title="Upscale 4x"
              className="p-1.5 rounded-btn bg-surface-elevated/95 hover:bg-accent hover:text-white text-content-primary transition-colors flex items-center gap-1 text-[11px] border border-border-subtle"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="font-semibold text-[10px]">4X</span>
            </button>
            <button
              type="button"
              onClick={handleDownload}
              aria-label="Download image"
              title="Download image"
              className="p-1.5 rounded-btn bg-surface-elevated/95 hover:bg-surface-elevated text-content-primary transition-colors border border-border-subtle"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleShare}
              aria-label="Copy image link"
              title="Copy image link"
              className="p-1.5 rounded-btn bg-surface-elevated/95 hover:bg-surface-elevated text-content-primary transition-colors border border-border-subtle"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-success" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPreview?.(item);
            }}
            aria-label="Full size view"
            title="Inspect"
            className="p-1.5 rounded-btn bg-surface-elevated/95 hover:bg-surface-elevated text-content-primary transition-colors border border-border-subtle"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Prompt snippet & metadata */}
        <p className="text-xs text-white line-clamp-2 font-normal leading-relaxed mb-1">
          {item.prompt}
        </p>

        <div className="flex items-center justify-between text-[10px] text-white/80 font-mono">
          <span>Seed: {item.seed || 'Auto'}</span>
          <span>{item.model || 'Fomi AI'}</span>
        </div>
      </div>
    </article>
  );
});

export default ResultCard;
