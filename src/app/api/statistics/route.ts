import { NextResponse } from 'next/server';
import { getStatistics, updateStatistics } from '@/utils/statistics';

export async function GET() {
  try {
    const stats = await getStatistics();
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read statistics' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { type, data } = await request.json();
    const updatedStats = await updateStatistics(type, data);
    console.log('Updated stats:', updatedStats);
    return NextResponse.json({ success: true, stats: updatedStats });
  } catch (error) {
    console.error('통계 업데이트 실패:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update statistics' },
      { status: 500 }
    );
  }
} 