'use client';

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/layout/Navbar';
import HistoryBar from '../components/layout/HistoryBar';
import ControlPanel from '../components/layout/ControlPanel';
import WorkspaceGrid from '../components/workspace/WorkspaceGrid';
import SpatialCanvas from '../components/canvas/SpatialCanvas';
import CommandBar from '../components/canvas/CommandBar';
import Toast from '../components/ui/Toast';
import { useGeneration } from '../hooks/useGeneration';
import { useIsMobile, useIsTablet } from '../hooks/useMediaQuery';
import { SlidersHorizontal, ChevronUp, ChevronDown } from 'lucide-react';

// Dynamic imports for modals to keep initial bundle ultra-lean
const PreviewModal = dynamic(
  () => import('../components/workspace/PreviewModal'),
  { ssr: false }
);
const CommandPalette = dynamic(
  () => import('../components/canvas/CommandPalette'),
  { ssr: false }
);
const CompareModal = dynamic(
  () => import('../components/canvas/CompareModal'),
  { ssr: false }
);

/**
 * Fomi Canvas — The Iteration-First Creative Environment
 * Main Page integrating the Spatial Canvas tree, Command Bar,
 * A/B Comparison Mode, and Studio Grid fallback.
 */
export default function WorkspacePage() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // Generation state & actions from custom hook
  const {
    prompt,
    setPrompt,
    activeCanvasPrompt,
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
    credits,
    results,
    history,
    isGenerating,
    isLoadingHistory,
    branchParent,
    branchFromNode,
    cancelBranch,
    selectedCompareIds,
    toggleCompareNode,
    clearCompare,
    generate,
    upscale,
    toggleFavorite,
    clearCanvas,
    setRandomPrompt,
  } = useGeneration();

  // View state: 'canvas' (Fomi Canvas iteration tree) or 'grid' (classic studio)
  const [viewMode, setViewMode] = useState('canvas');
  const [activeTool, setActiveTool] = useState('image-gen');
  const [activeHistoryId, setActiveHistoryId] = useState(null);
  const [previewItem, setPreviewItem] = useState(null);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: '', type: 'success' });

  const showToast = useCallback((message, type = 'success') => {
    setToast({ isOpen: true, message, type });
  }, []);

  // Global hotkeys: ⌘+K (command palette) and C (compare selected nodes)
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      // ⌘+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }
      // 'C' shortcut to compare nodes when not typing in an input
      if (
        (e.key === 'c' || e.key === 'C') &&
        !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)
      ) {
        if (selectedCompareIds.length === 2) {
          e.preventDefault();
          setIsCompareOpen(true);
        } else if (selectedCompareIds.length === 1) {
          showToast('Select one more node to compare (2 nodes required)', 'info');
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [selectedCompareIds, showToast]);

  const handleGenerate = () => {
    generate(showToast);
    if (isMobile) {
      setMobileDrawerOpen(false);
    }
  };

  const handleSelectHistoryItem = (item) => {
    setActiveHistoryId(item.id);
    setPreviewItem(item);
  };

  // Preview cycling helpers
  const currentPreviewIndex = previewItem
    ? results.findIndex((r) => r.id === previewItem.id)
    : -1;
  const hasPrev = currentPreviewIndex > 0;
  const hasNext = currentPreviewIndex >= 0 && currentPreviewIndex < results.length - 1;

  const handlePrevPreview = () => {
    if (hasPrev) setPreviewItem(results[currentPreviewIndex - 1]);
  };

  const handleNextPreview = () => {
    if (hasNext) setPreviewItem(results[currentPreviewIndex + 1]);
  };

  // Nodes selected for A/B comparison
  const compareNodes = results.filter((r) => selectedCompareIds.includes(r.id));

  return (
    <div className="min-h-screen bg-base-bg text-content-primary flex flex-col selection:bg-accent selection:text-white">
      {/* 1. Top Navigation Bar */}
      <Navbar
        activeTool={activeTool}
        onSelectTool={(toolId) => {
          setActiveTool(toolId);
          showToast(`Selected tool: ${toolId}`, 'info');
        }}
        credits={credits}
        viewMode={viewMode}
        onToggleViewMode={(mode) => setViewMode(mode)}
        onOpenPalette={() => setIsPaletteOpen(true)}
        onOpenGallery={() => showToast('Opening Inspiration Gallery', 'info')}
        onOpenAssets={() => showToast('Opening Project Assets', 'info')}
      />

      {/* 2. Sub-Header History / Roll Strip */}
      <HistoryBar
        items={history}
        activeId={activeHistoryId}
        onSelect={handleSelectHistoryItem}
        isLoading={isLoadingHistory}
      />

      {/* 3. Main Workspace Area */}
      {viewMode === 'canvas' ? (
        /* SPATIAL CANVAS MODE (The Hero Iteration Environment) */
        <main className="flex-1 w-full max-w-[1920px] mx-auto p-3 sm:p-5 flex flex-col relative">
          <SpatialCanvas
            nodes={results}
            activeBranchParentId={branchParent?.id}
            selectedCompareIds={selectedCompareIds}
            onToggleCompare={(id) => toggleCompareNode(id, showToast)}
            onBranchFromNode={(node) => branchFromNode(node, showToast)}
            onPreviewNode={setPreviewItem}
            onUpscaleNode={(node) => upscale(node, showToast)}
            onToggleFavorite={(id) => toggleFavorite(id, showToast)}
            onShowToast={showToast}
            isGenerating={isGenerating}
          />

          {/* Floating Command Bar at Bottom */}
          <CommandBar
            prompt={prompt}
            setPrompt={setPrompt}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            branchParent={branchParent}
            onCancelBranch={cancelBranch}
            model={model}
            setModel={setModel}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
            count={count}
            setCount={setCount}
            onOpenPalette={() => setIsPaletteOpen(true)}
            credits={credits}
          />
        </main>
      ) : (
        /* STUDIO GRID MODE (Classic 3-column split) */
        <main className="flex-1 max-w-[1920px] w-full mx-auto px-3 sm:px-5 py-4 flex flex-col lg:flex-row gap-5 items-start">
          {/* Mobile / Tablet Collapsible Drawer Pill */}
          <div className="lg:hidden w-full mb-3">
            <button
              type="button"
              onClick={() => setMobileDrawerOpen((prev) => !prev)}
              className="flex items-center justify-between w-full px-4 py-2.5 rounded-card bg-base-surface border border-border-subtle shadow-subtle text-xs font-medium text-content-primary"
            >
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-accent" />
                <span>Generation Parameters & Prompt</span>
              </div>
              {mobileDrawerOpen ? (
                <ChevronUp className="w-4 h-4 text-content-secondary" />
              ) : (
                <ChevronDown className="w-4 h-4 text-content-secondary" />
              )}
            </button>
          </div>

          {/* Desktop Fixed Left Control Panel */}
          <ControlPanel
            prompt={prompt}
            setPrompt={setPrompt}
            onRandomPrompt={setRandomPrompt}
            mode={mode}
            setMode={setMode}
            count={count}
            setCount={setCount}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
            model={model}
            setModel={setModel}
            style={style}
            setStyle={setStyle}
            seed={seed}
            setSeed={setSeed}
            negativePrompt={negativePrompt}
            setNegativePrompt={setNegativePrompt}
            guidanceScale={guidanceScale}
            setGuidanceScale={setGuidanceScale}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            credits={credits}
            className="hidden lg:flex sticky top-20"
          />

          {mobileDrawerOpen && (
            <div className="lg:hidden w-full">
              <ControlPanel
                prompt={prompt}
                setPrompt={setPrompt}
                onRandomPrompt={setRandomPrompt}
                mode={mode}
                setMode={setMode}
                count={count}
                setCount={setCount}
                aspectRatio={aspectRatio}
                setAspectRatio={setAspectRatio}
                model={model}
                setModel={setModel}
                style={style}
                setStyle={setStyle}
                seed={seed}
                setSeed={setSeed}
                negativePrompt={negativePrompt}
                setNegativePrompt={setNegativePrompt}
                guidanceScale={guidanceScale}
                setGuidanceScale={setGuidanceScale}
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
                credits={credits}
              />
            </div>
          )}

          {/* Right Canvas / Workspace Grid */}
          <WorkspaceGrid
            items={results}
            activePrompt={activeCanvasPrompt}
            activeModel={model}
            activeRatio={aspectRatio}
            activeStyle={style}
            isGenerating={isGenerating}
            generatingCount={count}
            onPreview={setPreviewItem}
            onUpscale={(item) => upscale(item, showToast)}
            onToggleFavorite={(id) => toggleFavorite(id, showToast)}
            onSelectPrompt={(p) => {
              setPrompt(p);
              showToast('Prompt loaded into generator input', 'info');
            }}
            onClearCanvas={() => clearCanvas(showToast)}
            onShowToast={showToast}
          />
        </main>
      )}

      {/* 4. Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        onSelectModel={(mId) => {
          setModel(mId);
          showToast(`AI Model switched to ${mId}`, 'success');
        }}
        onSelectRatio={(rId) => {
          setAspectRatio(rId);
          showToast(`Aspect ratio set to ${rId}`, 'info');
        }}
        onCompare={() => setIsCompareOpen(true)}
        canCompare={selectedCompareIds.length === 2}
        onRandomPrompt={setRandomPrompt}
        onBranchLatest={() => {
          if (results.length > 0) {
            branchFromNode(results[0], showToast);
          }
        }}
        onToggleView={() => setViewMode((prev) => (prev === 'canvas' ? 'grid' : 'canvas'))}
        viewMode={viewMode}
      />

      {/* 5. A/B Comparison Modal (Hotkey: C) */}
      <CompareModal
        isOpen={isCompareOpen}
        nodes={compareNodes}
        onClose={() => setIsCompareOpen(false)}
        onPickWinner={(winnerNode) => {
          branchFromNode(winnerNode, showToast);
          clearCompare();
        }}
        onShowToast={showToast}
      />

      {/* 6. Full Resolution Modal Inspector */}
      <PreviewModal
        isOpen={Boolean(previewItem)}
        item={previewItem}
        onClose={() => setPreviewItem(null)}
        onNext={handleNextPreview}
        onPrev={handlePrevPreview}
        hasNext={hasNext}
        hasPrev={hasPrev}
        onUpscale={(item) => upscale(item, showToast)}
        onToggleFavorite={(id) => toggleFavorite(id, showToast)}
        onShowToast={showToast}
      />

      {/* 7. Toast Notification System */}
      <Toast
        isOpen={toast.isOpen}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
