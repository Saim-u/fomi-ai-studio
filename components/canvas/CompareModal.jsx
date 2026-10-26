'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  X,
  Trophy,
  Download,
  SplitSquareVertical,
} from 'lucide-react';
import Button from '../ui/Button';
import { downloadImage } from '../../lib/utils';
import { cn } from '../../lib/utils';

/**
 * CompareModal provides side-by-side A/B evaluation for 2 canvas nodes.
 * Premium black & orange theme, crisp 1px borders, soft modal elevation.
 */
export default function CompareModal({
  isOpen,
  nodes = [],
  onClose,
  onPickWinner,
  onShowToast,
}) {
  const [winnerId, setWinnerId] = useState(null);

  if (!isOpen || nodes.length < 2) return null;

  const [nodeA, nodeB] = nodes;

  const handlePickWinner = (winnerNode) => {
    setWinnerId(winnerNode.id);
    onPickWinner?.(winnerNode);
    onShowToast?.(`Selected "${winnerNode.prompt.slice(0, 30)}..." as winning branch head!`, 'success');
    setTimeout(() => onClose(), 500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[92vh] rounded-panel bg-surface-elevated border border-border-subtle shadow-modal overflow-hidden flex flex-col p-4 sm:p-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-border-subtle mb-4">
          <div className="flex items-center gap-2.5">
            <SplitSquareVertical className="w-5 h-5 text-accent" />
            <div>
              <h2 className="text-sm sm:text-base font-semibold text-content-primary flex items-center gap-2">
                Canvas A/B Comparison
                <span className="text-xs font-normal text-content-secondary font-mono">(Hotkey: C)</span>
              </h2>
              <p className="text-xs text-content-secondary">
                Compare visual coherence side-by-side. Designate a winner to advance the branch lineage.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close comparison modal"
            className="p-1.5 rounded-btn hover:bg-base-subtle text-content-secondary hover:text-content-primary transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Side-by-Side Dual Viewport */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto min-h-[380px] p-0.5">
          {/* Node A */}
          <div
            className={cn(
              'relative flex flex-col rounded-card bg-base-surface border p-3.5 transition-all shadow-subtle',
              winnerId === nodeA.id ? 'border-accent ring-2 ring-accent/30' : 'border-border-subtle'
            )}
          >
            <div className="flex items-center justify-between mb-2.5 text-xs">
              <span className="font-medium text-accent font-mono text-[11px]">
                Candidate A (#{nodeA.id.slice(-4)})
              </span>
              <span className="px-2 py-0.5 rounded-btn bg-base-subtle border border-border-subtle text-[10px] text-content-secondary font-mono">
                {nodeA.model || 'Fomi Ultra'}
              </span>
            </div>
            <div className="relative flex-1 w-full min-h-[260px] rounded-btn overflow-hidden bg-base-subtle border border-border-subtle mb-3">
              <Image
                src={nodeA.url}
                alt={nodeA.prompt}
                fill
                sizes="50vw"
                className="object-contain"
              />
            </div>
            <p className="text-xs text-content-primary font-normal line-clamp-2 mb-3 leading-relaxed">
              "{nodeA.prompt}"
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-border-subtle gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => handlePickWinner(nodeA)}
                leftIcon={<Trophy className="w-3.5 h-3.5" />}
                className="flex-1"
              >
                Pick Winner & Branch
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => downloadImage(nodeA.url, `candidate-A-${nodeA.seed}.jpg`)}
                leftIcon={<Download className="w-3.5 h-3.5" />}
              >
                Save
              </Button>
            </div>
          </div>

          {/* Node B */}
          <div
            className={cn(
              'relative flex flex-col rounded-card bg-base-surface border p-3.5 transition-all shadow-subtle',
              winnerId === nodeB.id ? 'border-accent ring-2 ring-accent/30' : 'border-border-subtle'
            )}
          >
            <div className="flex items-center justify-between mb-2.5 text-xs">
              <span className="font-medium text-accent font-mono text-[11px]">
                Candidate B (#{nodeB.id.slice(-4)})
              </span>
              <span className="px-2 py-0.5 rounded-btn bg-base-subtle border border-border-subtle text-[10px] text-content-secondary font-mono">
                {nodeB.model || 'Fomi Pro'}
              </span>
            </div>
            <div className="relative flex-1 w-full min-h-[260px] rounded-btn overflow-hidden bg-base-subtle border border-border-subtle mb-3">
              <Image
                src={nodeB.url}
                alt={nodeB.prompt}
                fill
                sizes="50vw"
                className="object-contain"
              />
            </div>
            <p className="text-xs text-content-primary font-normal line-clamp-2 mb-3 leading-relaxed">
              "{nodeB.prompt}"
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-border-subtle gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => handlePickWinner(nodeB)}
                leftIcon={<Trophy className="w-3.5 h-3.5" />}
                className="flex-1"
              >
                Pick Winner & Branch
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => downloadImage(nodeB.url, `candidate-B-${nodeB.seed}.jpg`)}
                leftIcon={<Download className="w-3.5 h-3.5" />}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
