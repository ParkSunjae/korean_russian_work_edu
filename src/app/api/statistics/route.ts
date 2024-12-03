import { NextResponse } from 'next/server';
import { getStatistics, updateStatistics } from '@/utils/statistics';

export async function GET() {
  const stats = getStatistics();
  return NextResponse.json(stats);
}

export async function POST(request: Request) {
  const { type, data } = await request.json();
  await updateStatistics(type, data);
  return NextResponse.json({ success: true });
} 