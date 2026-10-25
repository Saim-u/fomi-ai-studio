'use client';

import React, { useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import {
  ZoomIn,
  ZoomOut,
  GitBranch,
  Sparkles,
  Download,
  Eye,
} from 'lucide-react';
import { cn, downloadImage } from '../../lib/utils';
import Button from '../ui/Button';

/**
 * SpatialCanvas
 * An interactive, pannable and zoomable visual tree canvas.
 * Light theme dot grid, crisp white node cards with 1px borders,
 * clean Bezier branch curves with animated dash hover, no glows.
 */
export default function SpatialCanvas({
  nodes = [],
  activeBranchParentId,
  selectedCompareIds = [],
  onToggleCompare,
  onBranchFromNode,
  onPreviewNode,
  onUpscaleNode,
  onToggleFavorite,
  onShowToast,
  isGenerating = false,
}) {
  const containerRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 60, y: 40 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  const [hoveredEdge, setHoveredEdge] = useState(null);

  // Calculate layout coordinates for nodes in a clean spatial tree
  const positionedNodes = useMemo(() => {
    const nodeMap = new Map();
    let rootCount = 0;

    return nodes.map((node, index) => {
      const parent = node.parentId ? nodeMap.get(node.parentId) : null;

      let x, y;
      if (parent) {
        // Child branch node: offset to the right, staggered vertically
        const siblingIndex = (parent.childCount || 0);
        parent.childCount = siblingIndex + 1;
        x = parent.x + 320;
        y = parent.y + siblingIndex * 260 - 40;
      } else {
        // Root spine node: stack down the primary column
        x = 100;
        y = 120 + rootCount * 360;
        rootCount++;
      }

      const positioned = {
        ...node,
        x,
        y,
        width: 250,
        height: 310,
        childCount: 0,
      };
      nodeMap.set(node.id, positioned);
      return positioned;
    });
  }, [nodes]);

  // Handle panning with mouse drag
  const handleMouseDown = (e) => {
    if (e.target.closest('button, input, a, article')) return;
    setIsPanning(true);
    setStartPan({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (!isPanning) return;
    setPan({
      x: e.clientX - startPan.x,
      y: e.clientY - startPan.y,
    });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleWheel = (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
      setZoom((prev) => Math.min(Math.max(prev * zoomFactor, 0.4), 2.2));
    }
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 60, y: 40 });
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
      className={cn(
        'relative flex-1 w-full h-[calc(100vh-140px)] min-h-[580px] overflow-hidden rounded-panel select-none',
        'bg-[#FAFAFA] border border-border-subtle shadow-subtle cursor-grab active:cursor-grabbing'
      )}
      style={{
        backgroundImage: 'radial-gradient(circle, #E5E5E5 1.2px, transparent 1.2px)',
        backgroundSize: `${28 * zoom}px ${28 * zoom}px`,
        backgroundPosition: `${pan.x}px ${pan.y}px`,
      }}
    >
      {/* Canvas Floating Navigation Controls */}
      <div className="absolute top-4 right-4 z-30 flex items-center gap-1 p-1 rounded-card bg-base-surface/95 backdrop-blur-md border border-border-subtle shadow-elevated">
        <button
          type="button"
          onClick={() => setZoom((z) => Math.min(z + 0.15, 2.0))}
          title="Zoom In"
          aria-label="Zoom In"
          className="p-1.5 rounded-btn text-content-secondary hover:text-content-primary hover:bg-base-subtle transition-colors"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => setZoom((z) => Math.max(z - 0.15, 0.5))}
          title="Zoom Out"
          aria-label="Zoom Out"
          className="p-1.5 rounded-btn text-content-secondary hover:text-content-primary hover:bg-base-subtle transition-colors"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <div className="w-px h-3.5 bg-border-subtle mx-0.5" />
        <button
          type="button"
          onClick={resetView}
          title="Reset View (100%)"
          aria-label="Reset View"
          className="px-2 py-1 rounded-btn text-xs font-mono text-content-secondary hover:text-content-primary hover:bg-base-subtle transition-colors"
        >
          {Math.round(zoom * 100)}%
        </button>
      </div>

      {/* Canvas Top-Left Title Pill */}
      <div className="absolute top-4 left-4 z-30 flex items-center gap-2 p-1.5 px-3 rounded-card bg-base-surface/95 backdrop-blur-md border border-border-subtle shadow-elevated text-xs">
        <GitBranch className="w-4 h-4 text-accent" />
        <span className="font-medium text-content-primary">Iteration Trees</span>
        <span className="text-[10px] px-1.5 py-0.2 rounded-btn bg-accent-subtle text-accent font-mono font-medium border border-accent/20">
          {nodes.length} Nodes
        </span>
      </div>

      {/* Pannable & Zoomable Scene */}
      <div
        className="absolute inset-0 origin-top-left transition-transform duration-75"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
        }}
      >
        {/* SVG Connector Lines joining parent generation nodes to children */}
        <svg className="absolute inset-0 w-[4000px] h-[4000px] pointer-events-none overflow-visible z-0">
          {positionedNodes.map((node) => {
            if (!node.parentId) return null;
            const parent = positionedNodes.find((p) => p.id === node.parentId);
            if (!parent) return null;

            // Compute curve from right edge of parent to left edge of child
            const startX = parent.x + parent.width;
            const startY = parent.y + 115;
            const endX = node.x;
            const endY = node.y + 115;
            const dx = Math.abs(endX - startX) * 0.5;

            const edgeKey = `edge-${parent.id}-${node.id}`;
            const isHovered = hoveredEdge === edgeKey;
            const isActive = parent.id === activeBranchParentId || node.id === activeBranchParentId;

            const strokeColor = isActive ? '#5E6AD2' : isHovered ? '#5E6AD2' : '#D1D5DB';

            return (
              <g
                key={edgeKey}
                className="pointer-events-auto cursor-pointer"
                onMouseEnter={() => setHoveredEdge(edgeKey)}
                onMouseLeave={() => setHoveredEdge(null)}
              >
                {/* Invisible wider hit target */}
                <path
                  d={`M ${startX} ${startY} C ${startX + dx} ${startY}, ${endX - dx} ${endY}, ${endX} ${endY}`}
                  fill="none"
                  stroke="transparent"
                  strokeWidth="16"
                />
                {/* Visible 2px Bezier curve */}
                <path
                  d={`M ${startX} ${startY} C ${startX + dx} ${startY}, ${endX - dx} ${endY}, ${endX} ${endY}`}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth="2"
                  strokeDasharray={isHovered || isActive ? '6 4' : 'none'}
                  className={cn(
                    'transition-colors duration-150',
                    (isHovered || isActive) && 'animate-dash-flow'
                  )}
                />
                {/* Node connection terminal dot */}
                <circle
                  cx={endX}
                  cy={endY}
                  r="3.5"
                  fill={strokeColor}
                  className="transition-colors duration-150"
                />
              </g>
            );
          })}
        </svg>

        {/* Render Tree Nodes */}
        {positionedNodes.map((node, index) => {
          const isBranchParent = node.id === activeBranchParentId;
          const isCompareSelected = selectedCompareIds.includes(node.id);

          return (
            <article
              key={node.id}
              style={{
                transform: `translate(${node.x}px, ${node.y}px)`,
                width: `${node.width}px`,
              }}
              className={cn(
                'absolute rounded-card bg-base-surface border p-3 flex flex-col gap-2.5 transition-all duration-150 ease-premium group z-10',
                isBranchParent
                  ? 'border-accent ring-2 ring-accent ring-offset-2 ring-offset-white shadow-elevated'
                  : isCompareSelected
                  ? 'border-accent ring-2 ring-accent/40 shadow-elevated'
                  : 'border-border-subtle hover:border-accent hover:shadow-elevated hover:-translate-y-0.5'
              )}
            >
              {/* Node Header (Root / Branch tags) */}
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      'w-1.5 h-1.5 rounded-full',
                      node.parentId ? 'bg-accent' : 'bg-content-secondary'
                    )}
                  />
                  <span
                    className={cn(
                      'font-mono uppercase text-[10px] tracking-wider',
                      node.parentId ? 'text-accent font-medium' : 'text-content-secondary'
                    )}
                  >
                    {node.parentId ? `Branch #${node.id.slice(-4)}` : `Root #${index + 1}`}
                  </span>
                </div>

                {/* Compare Checkbox */}
                <label className="flex items-center gap-1 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isCompareSelected}
                    onChange={() => onToggleCompare?.(node.id)}
                    className="w-3.5 h-3.5 rounded-[4px] border-border-strong text-accent focus:ring-accent focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="text-[10px] text-content-secondary">Compare</span>
                </label>
              </div>

              {/* Node Image */}
              <div
                onClick={() => onPreviewNode?.(node)}
                className="relative w-full aspect-square rounded-btn overflow-hidden bg-base-subtle border border-border-subtle cursor-pointer group/img"
              >
                <Image
                  src={node.url}
                  alt={node.prompt}
                  fill
                  sizes="260px"
                  className="object-cover transition-transform duration-200 group-hover/img:scale-105"
                />
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.2 rounded-btn bg-black/70 text-[9px] font-mono text-white">
                  {node.aspectRatio}
                </span>
              </div>

              {/* Node Prompt */}
              <p className="text-xs text-content-primary line-clamp-2 leading-relaxed font-normal">
                "{node.prompt}"
              </p>

              {/* Node Footer Actions */}
              <div className="flex items-center justify-between pt-1.5 border-t border-border-subtle gap-1.5">
                <Button
                  variant={isBranchParent ? 'primary' : 'secondary'}
                  size="xs"
                  onClick={() => onBranchFromNode?.(node)}
                  leftIcon={<GitBranch className="w-3 h-3" />}
                  className="flex-1 text-[11px]"
                >
                  {isBranchParent ? 'Branching' : 'Branch'}
                </Button>

                <button
                  type="button"
                  onClick={() => onUpscaleNode?.(node)}
                  title="Upscale 4K"
                  aria-label="Upscale 4K"
                  className="p-1.5 rounded-btn bg-base-subtle hover:bg-base-muted text-content-secondary hover:text-content-primary border border-border-subtle transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => downloadImage(node.url, `node-${node.seed}.jpg`)}
                  title="Download"
                  aria-label="Download node image"
                  className="p-1.5 rounded-btn bg-base-subtle hover:bg-base-muted text-content-secondary hover:text-content-primary border border-border-subtle transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
