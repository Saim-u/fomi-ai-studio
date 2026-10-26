'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, History, Heart } from 'lucide-react';
import { cn } from '../../lib/utils';
import Skeleton from '../ui/Skeleton';

/**
 * Top horizontal filmstrip / history roll of past creations.
 * Premium dark theme, 1px border, subtle lift on hover, 2px accent ring with offset when active.
 *
 * @param {Object} props
 * @param {Array<Object>} props.items
 * @param {string} [props.activeId]
 * @param {function(Object): void} props.onSelect
 * @param {boolean} [props.isLoading=false]
 */
export default function HistoryBar({
  items = [],
  activeId,
  onSelect,
  isLoading = false,
}) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      aria-label="Recent generations history"
      className="w-full min-w-0 bg-base-surface border-b border-border-subtle py-2 px-3 sm:px-5 select-none relative"
    >
      <div className="max-w-[1920px] mx-auto flex items-center gap-2.5 min-w-0">
        {/* Title Tag */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs text-content-secondary shrink-0 font-medium tracking-wide pr-3 border-r border-border-subtle">
          <History className="w-3.5 h-3.5 text-content-secondary" />
          <span>Roll</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-btn bg-base-subtle border border-border-subtle text-content-secondary font-mono">
            {items.length}
          </span>
        </div>

        {/* Scroll Left Button */}
        <button
          type="button"
          onClick={() => scroll('left')}
          aria-label="Scroll history left"
          className="hidden md:flex p-1 rounded-btn text-content-secondary hover:text-content-primary hover:bg-base-subtle transition-colors shrink-0"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Horizontal Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex-1 min-w-0 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {isLoading
            ? Array.from({ length: 12 }).map((_, idx) => (
                <Skeleton
                  key={idx}
                  variant="thumbnail"
                  className="w-12 h-12 sm:w-13 sm:h-13 rounded-card shrink-0"
                />
              ))
            : items.map((item) => {
                const isActive = item.id === activeId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelect?.(item)}
                    aria-label={`Select creation: ${item.prompt}`}
                    className={cn(
                      'group relative w-12 h-12 sm:w-13 sm:h-13 rounded-card overflow-hidden shrink-0 border transition-all duration-150 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
                      isActive
                        ? 'border-accent ring-2 ring-accent ring-offset-2 ring-offset-canvas shadow-subtle'
                        : 'border-border-subtle hover:border-accent hover:-translate-y-0.5 hover:shadow-subtle'
                    )}
                  >
                    <Image
                      src={item.url}
                      alt={item.prompt || 'Generated preview'}
                      fill
                      sizes="56px"
                      className="object-cover transition-transform duration-200 group-hover:scale-105"
                    />

                    {/* Favorite badge */}
                    {item.isFavorite && (
                      <span className="absolute top-1 right-1 p-0.5 rounded-full bg-canvas/85 backdrop-blur-xs text-rose-400 border border-border-subtle/60 shadow-xs">
                        <Heart className="w-2.5 h-2.5 fill-current" />
                      </span>
                    )}

                    {/* Aspect Ratio pill on hover */}
                    <span className="absolute bottom-1 left-1 px-1 py-0.2 rounded-btn bg-black/75 text-[9px] text-white font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.aspectRatio}
                    </span>
                  </button>
                );
              })}
        </div>

        {/* Scroll Right Button */}
        <button
          type="button"
          onClick={() => scroll('right')}
          aria-label="Scroll history right"
          className="hidden md:flex p-1 rounded-btn text-content-secondary hover:text-content-primary hover:bg-base-subtle transition-colors shrink-0"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
