import { NextResponse } from 'next/server';
import { mockHistory } from '../../../lib/mockData';

/**
 * GET /api/history
 * Returns the creator's generation history filmstrip items.
 */
export async function GET() {
  try {
    return NextResponse.json({
      history: mockHistory,
      total: mockHistory.length,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('API /api/history error:', err);
    return NextResponse.json(
      { error: 'Failed to retrieve generation history' },
      { status: 500 }
    );
  }
}
