/**
 * @file mockData.js
 * Curated mock datasets for Fomi workspace: styles, models, aspect ratios,
 * starter prompts, and persistent generation history with visual tree lineage.
 */

import { STYLE_PRESETS, AI_MODELS, ASPECT_RATIOS } from './constants';

export const stylePresets = STYLE_PRESETS;
export const models = AI_MODELS;
export const aspectRatios = ASPECT_RATIOS;

export const mockPrompts = [
  'A professional portrait photograph of a smiling 31-year-old tech-enabled woman with warm brown eyes and soft auburn hair, cream-colored cashmere sweater, muted gallery backdrop',
  'Futuristic glass architectural pavilion nestled in misty Scandinavian pine forest, dusk hour, soft warm interior glow, architectural digest feature',
  'Hyperrealistic macro photography of a crystal hummingbird sipping iridescent dew from a bioluminescent orchid, raytracing, 8k',
  'Cinematic street scene in Tokyo during soft twilight rain, neon reflections in puddles, umbrella silhouette, 35mm anamorphic style',
  'Minimalist ceramic vase on beige travertine pedestal, dramatic angled sunbeam shadows, contemporary Scandinavian interior design',
  'Retro-futuristic concept vehicle cruising through an Arizona desert salt flat at sunset, dust trails, golden hour cinematic flare',
];

export const mockHistory = [
  {
    id: 'hist-1',
    parentId: null, // Root node
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    prompt: 'A professional portrait photograph of a smiling 31-year-old tech-enabled woman with warm brown eyes and soft auburn hair',
    aspectRatio: '1:1',
    model: 'Fomi Ultra 2.5',
    style: 'photorealistic',
    seed: 849201,
    createdAt: '2 mins ago',
    likes: 14,
    isFavorite: true,
  },
  {
    id: 'hist-2',
    parentId: 'hist-1', // Branch of hist-1
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    prompt: 'Studio portrait with soft window light, natural freckles, thoughtful expression, muted pastel tones',
    aspectRatio: '4:5',
    model: 'Fomi Pro v2',
    style: 'portrait',
    seed: 391847,
    createdAt: '12 mins ago',
    likes: 22,
    isFavorite: false,
  },
  {
    id: 'hist-3',
    parentId: 'hist-1', // Sibling branch of hist-1
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    prompt: 'Editorial portrait against neutral beige canvas, subtle smile, gold earrings, crisp catchlights',
    aspectRatio: '1:1',
    model: 'Fomi Ultra 2.5',
    style: 'photorealistic',
    seed: 114829,
    createdAt: '45 mins ago',
    likes: 31,
    isFavorite: true,
  },
  {
    id: 'hist-4',
    parentId: 'hist-2', // Branch of branch hist-2!
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    prompt: 'Chiaroscuro male portrait, directional side light, authentic skin texture, cinematic rim glow',
    aspectRatio: '1:1',
    model: 'Fomi Ultra 2.5',
    style: 'photorealistic',
    seed: 902184,
    createdAt: '1 hour ago',
    likes: 8,
    isFavorite: false,
  },
  {
    id: 'hist-5',
    parentId: null, // Second root spine
    url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80',
    prompt: 'Cyberpunk alleyway with neon signs reflecting in wet asphalt, steam vents, deep blues and magenta',
    aspectRatio: '16:9',
    model: 'Fomi Ultra 2.5',
    style: 'cyberpunk',
    seed: 391820,
    createdAt: '3 hours ago',
    likes: 54,
    isFavorite: true,
  },
  {
    id: 'hist-6',
    parentId: 'hist-5', // Branch of hist-5
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    prompt: 'Abstract liquid glass ribbons floating in zero gravity, chromatic dispersion, octane 3d render',
    aspectRatio: '1:1',
    model: 'Fomi Pro v2',
    style: '3d-render',
    seed: 489201,
    createdAt: '5 hours ago',
    likes: 67,
    isFavorite: true,
  },
  {
    id: 'hist-7',
    parentId: null, // Third root spine
    url: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=600&q=80',
    prompt: 'Moody Nordic mist over a tranquil obsidian mountain lake, solitary pine tree, cinematic color grade',
    aspectRatio: '16:9',
    model: 'Fomi Flash',
    style: 'cinematic',
    seed: 672941,
    createdAt: 'Yesterday',
    likes: 42,
    isFavorite: false,
  },
  {
    id: 'hist-8',
    parentId: 'hist-7', // Branch of hist-7
    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    prompt: 'Expressive watercolor botanical arrangement, organic pigment bleed, raw handmade paper texture',
    aspectRatio: '4:5',
    model: 'Fomi Pro v2',
    style: 'watercolor',
    seed: 192840,
    createdAt: 'Yesterday',
    likes: 29,
    isFavorite: false,
  },
];
