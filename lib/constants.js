/**
 * @file constants.js
 * Application-wide configuration and UI constants for Fomi AI Workspace.
 */

export const APP_CONFIG = {
  name: 'Fomi',
  tagline: 'Professional AI Creative Studio',
  version: '1.4.0',
  defaultCredits: 150,
  maxPromptLength: 1000,
  generateKeyCombo: 'Ctrl+Enter / ⌘+Enter',
};

export const WORKSPACE_TOOLS = [
  { id: 'select', label: 'Select tool', icon: 'MousePointer2', shortcut: 'V' },
  { id: 'pan', label: 'Pan canvas', icon: 'Hand', shortcut: 'H' },
  { id: 'image-gen', label: 'Text to Image', icon: 'Sparkles', shortcut: 'I', active: true },
  { id: 'video-gen', label: 'Text to Video', icon: 'Video', shortcut: 'M' },
  { id: 'edit', label: 'AI Inpaint & Edit', icon: 'Wand2', shortcut: 'E' },
  { id: 'upscale', label: 'AI Upscaler 4K', icon: 'Maximize2', shortcut: 'U' },
];

export const ASPECT_RATIOS = [
  { id: '1:1', label: '1:1', name: 'Square', width: 1024, height: 1024, ratioClass: 'aspect-square' },
  { id: '16:9', label: '16:9', name: 'Landscape', width: 1280, height: 720, ratioClass: 'aspect-video' },
  { id: '9:16', label: '9:16', name: 'Story / Reel', width: 720, height: 1280, ratioClass: 'aspect-[9/16]' },
  { id: '4:5', label: '4:5', name: 'Instagram', width: 1080, height: 1350, ratioClass: 'aspect-[4/5]' },
  { id: '3:2', label: '3:2', name: 'Photography', width: 1200, height: 800, ratioClass: 'aspect-[3/2]' },
];

export const IMAGE_COUNTS = [1, 2, 4, 8];

export const AI_MODELS = [
  {
    id: 'fomi-ultra',
    name: 'Fomi Ultra 2.5',
    badge: 'Flagship',
    description: 'Studio photorealism, maximum prompt adherence and typographic fidelity.',
    speed: '~1.8s',
  },
  {
    id: 'fomi-pro',
    name: 'Fomi Pro v2',
    badge: 'Popular',
    description: 'High dynamic range, cinematic lighting and rich artistic style depth.',
    speed: '~1.2s',
  },
  {
    id: 'fomi-flash',
    name: 'Fomi Flash',
    badge: 'Fast',
    description: 'Near-instant iteration, ideal for rapid creative exploration and storyboarding.',
    speed: '~0.6s',
  },
];

export const STYLE_PRESETS = [
  {
    id: 'photorealistic',
    name: 'Photoreal',
    description: '35mm lens, natural daylight, raw film texture',
    thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80',
    promptModifier: 'shot on 35mm f/1.8 lens, natural lighting, ultra high detail, 8k resolution, raw photography',
  },
  {
    id: 'anime',
    name: 'Anime',
    description: 'Makoto Shinkai style, vibrant sky, rich cel shading',
    thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=240&q=80',
    promptModifier: 'anime aesthetic, makoto shinkai cinematic colors, vibrant sky, intricate line art, 4k master',
  },
  {
    id: '3d-render',
    name: '3D Render',
    description: 'Octane render, Raytracing, soft studio reflections',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=240&q=80',
    promptModifier: 'octane render 3d, ray tracing, subsurface scattering, soft volumetric studio lighting, clay and glass materials',
  },
  {
    id: 'cinematic',
    name: 'Cinematic',
    description: 'Anamorphic flare, moody atmospheric rim light',
    thumbnail: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=240&q=80',
    promptModifier: 'cinematic movie still, anamorphic lens flare, dramatic color grading, atmospheric smoke, panavision look',
  },
  {
    id: 'watercolor',
    name: 'Watercolor',
    description: 'Organic watercolor bleed, cold-press paper grain',
    thumbnail: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=240&q=80',
    promptModifier: 'expressive watercolor painting, wet-on-wet paint bleed, textured cotton watercolor paper, fine pigment splatters',
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Neon hues, night rain, futuristic cyber aesthetics',
    thumbnail: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=240&q=80',
    promptModifier: 'cyberpunk neo-tokyo style, vivid neon pink and cyan reflections, wet asphalt, dense holographic signs',
  },
  {
    id: 'portrait',
    name: 'Portrait',
    description: 'Chiaroscuro studio lighting, skin micro-details',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80',
    promptModifier: 'editorial beauty portrait, rim lighting, authentic skin texture, shallow depth of field, 85mm portraiture',
  },
  {
    id: 'product',
    name: 'Product',
    description: 'Commercial clean backdrop, crisp softbox specular',
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=240&q=80',
    promptModifier: 'commercial product photography, clean minimalist podium, crisp studio softbox highlights, high-end catalog look',
  },
];
