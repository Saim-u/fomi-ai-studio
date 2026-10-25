'use client';

import React, { useRef, useEffect } from 'react';
import {
  Sparkles,
  Dice5,
  X,
  SlidersHorizontal,
  Palette,
  Image as ImageIcon,
  Video,
  CornerDownLeft,
  Check,
  Zap,
} from 'lucide-react';
import Button from '../ui/Button';
import Dropdown from '../ui/Dropdown';
import Accordion from '../ui/Accordion';
import {
  ASPECT_RATIOS,
  IMAGE_COUNTS,
  AI_MODELS,
  STYLE_PRESETS,
  APP_CONFIG,
} from '../../lib/constants';
import { cn } from '../../lib/utils';
import Image from 'next/image';

/**
 * Control Panel: Creative parameters, prompt input, model picker, and generation controls.
 * Light theme, semantic tokens, 6px buttons/inputs, 12px panel radius, no gradients.
 */
export default function ControlPanel({
  prompt,
  setPrompt,
  onRandomPrompt,
  mode,
  setMode,
  count,
  setCount,
  aspectRatio,
  setAspectRatio,
  model,
  setModel,
  style,
  setStyle,
  seed,
  setSeed,
  negativePrompt,
  setNegativePrompt,
  guidanceScale,
  setGuidanceScale,
  onGenerate,
  isGenerating,
  credits,
  className = '',
}) {
  const textareaRef = useRef(null);

  // Auto-grow textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  }, [prompt]);

  // Keyboard shortcut Ctrl+Enter / Cmd+Enter
  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      if (prompt.trim() && !isGenerating) {
        onGenerate();
      }
    }
  };

  const selectedStyle = STYLE_PRESETS.find((s) => s.id === style);

  return (
    <aside
      aria-label="Generation controls"
      className={cn(
        'w-full lg:w-[360px] shrink-0 bg-base-surface border border-border-subtle rounded-panel flex flex-col p-4 space-y-3.5 shadow-subtle',
        className
      )}
    >
      {/* Top Mode Tabs: Image vs Video */}
      <div className="flex items-center p-0.5 rounded-card bg-base-subtle border border-border-subtle">
        <button
          type="button"
          onClick={() => setMode('image')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-1.5 rounded-btn text-xs font-medium transition-all duration-150',
            mode === 'image'
              ? 'bg-accent text-white shadow-subtle'
              : 'text-content-secondary hover:text-content-primary'
          )}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Image</span>
        </button>
        <button
          type="button"
          onClick={() => setMode('video')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-1.5 rounded-btn text-xs font-medium transition-all duration-150',
            mode === 'video'
              ? 'bg-accent text-white shadow-subtle'
              : 'text-content-secondary hover:text-content-primary'
          )}
        >
          <Video className="w-3.5 h-3.5" />
          <span>Video</span>
          <span className="text-[9px] px-1 py-0.2 rounded-btn bg-white/20 text-white font-mono">
            New
          </span>
        </button>
      </div>

      {/* Prompt Textarea */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="prompt-input"
            className="text-xs font-medium text-content-primary flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Prompt</span>
          </label>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onRandomPrompt}
              title="Surprise me with a random prompt"
              aria-label="Inspire me with random prompt"
              className="px-1.5 py-0.5 text-content-secondary hover:text-accent hover:bg-base-subtle rounded-btn text-xs transition-colors flex items-center gap-1"
            >
              <Dice5 className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden sm:inline">Inspire</span>
            </button>
            {prompt && (
              <button
                type="button"
                onClick={() => setPrompt('')}
                title="Clear prompt"
                aria-label="Clear prompt"
                className="p-1 text-content-secondary hover:text-danger hover:bg-danger-subtle rounded-btn transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="relative">
          <textarea
            id="prompt-input"
            ref={textareaRef}
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={APP_CONFIG.maxPromptLength}
            placeholder="Describe your imagination to be converted to a piece of art..."
            className="w-full resize-none rounded-btn bg-base-subtle/50 border border-border-subtle p-2.5 text-xs sm:text-sm text-content-primary placeholder:text-content-secondary/60 focus:bg-base-surface focus:border-accent focus:ring-1 focus:ring-accent transition-all outline-none leading-relaxed"
          />
          <div className="flex items-center justify-between text-[11px] text-content-secondary px-0.5 pt-1">
            <span className="flex items-center gap-1">
              <CornerDownLeft className="w-3 h-3 text-content-secondary" />
              <span>⌘+Enter to generate</span>
            </span>
            <span className="font-mono">
              {prompt.length}/{APP_CONFIG.maxPromptLength}
            </span>
          </div>
        </div>
      </div>

      {/* # Images Count Selector */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-content-primary">Outputs (#)</label>
        <div className="grid grid-cols-4 gap-1 p-0.5 rounded-card bg-base-subtle border border-border-subtle">
          {IMAGE_COUNTS.map((num) => {
            const isSelected = count === num;
            return (
              <button
                key={num}
                type="button"
                onClick={() => setCount(num)}
                aria-pressed={isSelected}
                className={cn(
                  'py-1 rounded-btn text-xs font-medium transition-all duration-150',
                  isSelected
                    ? 'bg-accent text-white shadow-subtle'
                    : 'text-content-secondary hover:text-content-primary hover:bg-base-surface/60'
                )}
              >
                {num}
              </button>
            );
          })}
        </div>
      </div>

      {/* Aspect Ratio Selector */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-content-primary">Aspect Ratio</label>
        <div className="grid grid-cols-5 gap-1.5">
          {ASPECT_RATIOS.map((ratio) => {
            const isSelected = aspectRatio === ratio.id;
            return (
              <button
                key={ratio.id}
                type="button"
                onClick={() => setAspectRatio(ratio.id)}
                aria-pressed={isSelected}
                title={`${ratio.name} (${ratio.id})`}
                className={cn(
                  'flex flex-col items-center justify-center p-2 rounded-btn border text-center transition-all duration-150 group',
                  isSelected
                    ? 'bg-accent-subtle border-accent text-accent font-medium'
                    : 'bg-base-surface border-border-subtle text-content-secondary hover:text-content-primary hover:border-border-strong'
                )}
              >
                <div
                  className={cn(
                    'border border-current rounded-[2px] mb-1.5 opacity-80 group-hover:opacity-100',
                    ratio.id === '1:1' && 'w-3 h-3',
                    ratio.id === '16:9' && 'w-4 h-2.5',
                    ratio.id === '9:16' && 'w-2.5 h-4',
                    ratio.id === '4:5' && 'w-3 h-3.5',
                    ratio.id === '3:2' && 'w-3.5 h-2.5'
                  )}
                />
                <span className="text-[10px] font-mono leading-none">
                  {ratio.id}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Model Selection Dropdown */}
      <div className="space-y-1.5">
        <Dropdown
          label="AI Model"
          options={AI_MODELS}
          value={model}
          onChange={setModel}
        />
      </div>

      {/* Styles Accordion (8 presets grid) */}
      <Accordion
        title="Style Presets"
        icon={<Palette className="w-3.5 h-3.5" />}
        badge={selectedStyle ? selectedStyle.name : 'None'}
        defaultOpen={true}
      >
        <div className="grid grid-cols-4 gap-1.5 pt-1">
          {STYLE_PRESETS.map((preset) => {
            const isSelected = style === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => setStyle(isSelected ? null : preset.id)}
                aria-pressed={isSelected}
                title={preset.description}
                className={cn(
                  'group relative aspect-square rounded-btn overflow-hidden border transition-all duration-150 text-left',
                  isSelected
                    ? 'border-accent ring-2 ring-accent/30 shadow-subtle'
                    : 'border-border-subtle hover:border-border-strong opacity-85 hover:opacity-100'
                )}
              >
                <Image
                  src={preset.thumbnail}
                  alt={preset.name}
                  fill
                  sizes="80px"
                  className="object-cover transition-transform duration-200 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex items-end p-1">
                  <span className="text-[9px] font-medium text-white tracking-tight truncate">
                    {preset.name}
                  </span>
                </div>
                {isSelected && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-accent text-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </Accordion>

      {/* Advanced Settings Accordion */}
      <Accordion
        title="Advanced Settings"
        icon={<SlidersHorizontal className="w-3.5 h-3.5" />}
        defaultOpen={false}
      >
        <div className="space-y-2.5 pt-1">
          {/* Negative Prompt */}
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-content-secondary">
              Negative Prompt (things to avoid)
            </label>
            <input
              type="text"
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              placeholder="blurry, distorted, extra limbs, lowres..."
              className="w-full px-2.5 py-1.5 rounded-btn bg-base-subtle/60 border border-border-subtle text-xs text-content-primary placeholder:text-content-secondary/60 outline-none focus:bg-base-surface focus:border-accent"
            />
          </div>

          {/* Guidance Scale slider */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-medium text-content-secondary">Guidance Scale (CFG)</span>
              <span className="font-mono text-accent font-medium">{guidanceScale}</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              step="0.5"
              value={guidanceScale}
              onChange={(e) => setGuidanceScale(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-base-subtle rounded-btn appearance-none cursor-pointer accent-accent"
            />
            <div className="flex justify-between text-[9px] text-content-secondary font-mono">
              <span>Creative (4.0)</span>
              <span>Balanced (7.5)</span>
              <span>Strict (15.0)</span>
            </div>
          </div>

          {/* Seed Input */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-medium text-content-secondary">Seed</span>
              <button
                type="button"
                onClick={() => setSeed(Math.floor(Math.random() * 999999))}
                className="text-accent hover:text-accent-hover text-[10px] font-medium underline"
              >
                Randomize
              </button>
            </div>
            <input
              type="number"
              value={seed || ''}
              onChange={(e) => setSeed(e.target.value ? parseInt(e.target.value, 10) : '')}
              placeholder="Random seed (leave empty for random)"
              className="w-full px-2.5 py-1.5 rounded-btn bg-base-subtle/60 border border-border-subtle text-xs text-content-primary placeholder:text-content-secondary/60 outline-none focus:bg-base-surface focus:border-accent font-mono"
            />
          </div>
        </div>
      </Accordion>

      {/* Primary Action Button: Solid #5E6AD2 */}
      <div className="pt-2 space-y-2">
        <Button
          variant="primary"
          size="lg"
          isLoading={isGenerating}
          disabled={!prompt.trim() || isGenerating}
          onClick={onGenerate}
          leftIcon={<Sparkles className="w-4 h-4" />}
          className="w-full font-medium"
        >
          {isGenerating ? 'Synthesizing...' : `Generate ${count} ${count > 1 ? 'Images' : 'Image'}`}
        </Button>

        <div className="flex items-center justify-between px-0.5 text-[11px] text-content-secondary">
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-accent" />
            <span>Cost: <strong className="text-content-primary font-medium">{count}</strong> {count === 1 ? 'credit' : 'credits'}</span>
          </span>
          <span>Balance: <strong className="text-content-primary font-medium">{credits}</strong> credits left</span>
        </div>
      </div>
    </aside>
  );
}
