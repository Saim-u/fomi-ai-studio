'use client';

import { useState, useEffect, useCallback } from 'react';
import { mockHistory, mockPrompts } from '../lib/mockData';
import { APP_CONFIG, AI_MODELS, STYLE_PRESETS, ASPECT_RATIOS } from '../lib/constants';

/**
 * useGeneration hook
 * Encapsulates full generation state, API communications, iteration trees,
 * branching logic, and credit balance.
 */
export function useGeneration() {
  const [prompt, setPrompt] = useState(
    'A professional portrait photograph of a smiling 31-year-old tech-enabled woman with warm brown eyes and soft auburn hair, cream-colored cashmere sweater, muted gallery backdrop'
  );
  const [activeCanvasPrompt, setActiveCanvasPrompt] = useState(prompt);
  const [mode, setMode] = useState('image');
  const [count, setCount] = useState(4);
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [model, setModel] = useState('fomi-ultra');
  const [style, setStyle] = useState('photorealistic');
  const [seed, setSeed] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [guidanceScale, setGuidanceScale] = useState(7.5);
  const [credits, setCredits] = useState(APP_CONFIG.defaultCredits);

  // Creative results & iteration nodes
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [error, setError] = useState(null);

  // Signature Iteration Tree states
  const [branchParent, setBranchParent] = useState(null);
  const [selectedCompareIds, setSelectedCompareIds] = useState([]);

  // Load history from API route on mount
  useEffect(() => {
    let mounted = true;
    async function fetchHistory() {
      try {
        const res = await fetch('/api/history');
        if (res.ok) {
          const data = await res.json();
          if (mounted && data?.history) {
            setHistory(data.history);
            // Preload canvas with full iteration history
            setResults(data.history);
          }
        }
      } catch {
        if (mounted) {
          setHistory(mockHistory);
          setResults(mockHistory);
        }
      } finally {
        if (mounted) setIsLoadingHistory(false);
      }
    }
    fetchHistory();
    return () => {
      mounted = false;
    };
  }, []);

  // Pick random inspiration prompt
  const setRandomPrompt = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * mockPrompts.length);
    setPrompt(mockPrompts[randomIndex]);
  }, []);

  // Set branch parent from an existing node
  const branchFromNode = useCallback((node, toastCallback) => {
    setBranchParent(node);
    setPrompt(node.prompt);
    if (node.aspectRatio) setAspectRatio(node.aspectRatio);
    toastCallback?.(`Branching from Node #${node.id.slice(-4)}. Modifications will inherit parent lineage.`, 'info');
  }, []);

  // Cancel branch
  const cancelBranch = useCallback(() => {
    setBranchParent(null);
  }, []);

  // Toggle node for A/B comparison (up to 2 nodes)
  const toggleCompareNode = useCallback((id, toastCallback) => {
    setSelectedCompareIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 2) {
        toastCallback?.('You can compare 2 nodes at a time (replaced first selection)', 'info');
        return [prev[1], id];
      }
      return [...prev, id];
    });
  }, []);

  const clearCompare = useCallback(() => {
    setSelectedCompareIds([]);
  }, []);

  // Execute generation with parent branch tracking
  const generate = useCallback(
    async (toastCallback) => {
      if (!prompt.trim() || isGenerating) return;

      if (credits < count) {
        toastCallback?.('Insufficient credits to generate this batch!', 'error');
        return;
      }

      setIsGenerating(true);
      setError(null);
      setActiveCanvasPrompt(prompt);

      try {
        const parentId = branchParent ? branchParent.id : null;

        const payload = {
          prompt: prompt.trim(),
          count: branchParent ? 1 : count, // Single branch node or root batch
          aspectRatio,
          model,
          style,
          seed: seed || undefined,
          negativePrompt: negativePrompt.trim() || undefined,
          guidanceScale,
          parentId,
        };

        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          throw new Error(`Generation failed with status ${res.status}`);
        }

        const data = await res.json();
        const newImages = (data.images || []).map((img) => ({
          ...img,
          parentId,
        }));

        // Deduct credits
        setCredits((prev) => Math.max(0, prev - (branchParent ? 1 : count)));

        // Prepend new images to results and history
        setResults((prev) => [...newImages, ...prev]);
        setHistory((prev) => [...newImages, ...prev]);

        toastCallback?.(
          branchParent
            ? `Branched new node from parent #${branchParent.id.slice(-4)}!`
            : `Synthesized ${newImages.length} creative variations!`,
          'success'
        );

        // Reset branch context after successful branch
        setBranchParent(null);
      } catch (err) {
        console.error('Generation error:', err);
        setError(err.message || 'Error occurred while generating');
        toastCallback?.('Generation failed. Please try again.', 'error');
      } finally {
        setIsGenerating(false);
      }
    },
    [prompt, count, aspectRatio, model, style, seed, negativePrompt, guidanceScale, credits, isGenerating, branchParent]
  );

  // Upscale image simulation
  const upscale = useCallback((item, toastCallback) => {
    toastCallback?.(`Upscaling "${item.prompt.slice(0, 30)}..." to 4K Master`, 'info');
    setTimeout(() => {
      setResults((prev) =>
        prev.map((r) =>
          r.id === item.id
            ? {
                ...r,
                width: 3840,
                height: 3840,
                isUpscaled: true,
                model: `${r.model || 'Fomi Ultra'} (4K Master)`,
              }
            : r
        )
      );
      toastCallback?.('4K Upscaling complete!', 'success');
    }, 1200);
  }, []);

  // Toggle favorite flag
  const toggleFavorite = useCallback((id, toastCallback) => {
    let nowFavorite = false;
    setResults((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          nowFavorite = !item.isFavorite;
          return { ...item, isFavorite: nowFavorite };
        }
        return item;
      })
    );
    setHistory((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, isFavorite: !item.isFavorite };
        }
        return item;
      })
    );
    toastCallback?.(
      nowFavorite ? 'Added to favorites' : 'Removed from favorites',
      'info'
    );
  }, []);

  // Clear workspace canvas
  const clearCanvas = useCallback((toastCallback) => {
    setResults([]);
    toastCallback?.('Canvas cleared. History preserved.', 'info');
  }, []);

  return {
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
    error,
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
  };
}
