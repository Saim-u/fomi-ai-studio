import { NextResponse } from 'next/server';
import { hashString } from '../../../lib/utils';
import { ASPECT_RATIOS, AI_MODELS } from '../../../lib/constants';

/**
 * POST /api/generate
 * Synthesizes mock AI generation results with realistic latency and deterministic seeds.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      prompt,
      count = 4,
      aspectRatio = '1:1',
      model = 'fomi-ultra',
      style = 'photorealistic',
      seed: userSeed,
    } = body;

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return NextResponse.json(
        { error: 'Prompt is required for generation' },
        { status: 400 }
      );
    }

    // Determine target dimensions based on aspect ratio
    const ratioConfig = ASPECT_RATIOS.find((r) => r.id === aspectRatio) || {
      width: 1024,
      height: 1024,
    };

    // Simulate 1.5s neural synthesis delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const baseSeed = userSeed || hashString(prompt);
    const modelObj = AI_MODELS.find((m) => m.id === model) || {
      name: 'Fomi Ultra 2.5',
    };

    // Generate output array with Pollinations AI, driven by the prompt text.
    // The prompt-hash seed makes every generation deterministic: same prompt => same image.
    const images = Array.from({ length: Math.min(count, 8) }).map((_, idx) => {
      const itemSeed = baseSeed + idx * 7919;
      const encodedPrompt = encodeURIComponent(prompt.trim());
      const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${ratioConfig.width}&height=${ratioConfig.height}&seed=${itemSeed}&nologo=true`;

      return {
        id: `gen-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
        url,
        width: ratioConfig.width,
        height: ratioConfig.height,
        seed: itemSeed,
        prompt: prompt.trim(),
        aspectRatio,
        model: modelObj.name,
        style,
        createdAt: 'Just now',
        likes: Math.floor(Math.random() * 5),
        isFavorite: false,
      };
    });

    return NextResponse.json({
      id: `batch-${Date.now()}`,
      images,
      metadata: {
        prompt: prompt.trim(),
        count: images.length,
        aspectRatio,
        model: modelObj.name,
        style,
        latencyMs: 1500,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error('API /api/generate error:', err);
    return NextResponse.json(
      { error: 'Failed to process AI generation batch' },
      { status: 500 }
    );
  }
}
