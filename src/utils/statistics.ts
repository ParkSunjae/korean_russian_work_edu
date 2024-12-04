import fs from 'fs';
import { Statistics } from '@/types/statistics';
import { MenuId } from '@/constants/menu';
import { DATA_PATHS } from '@/constants/paths';

export const getStatistics = (): Statistics => {
  try {
    return JSON.parse(fs.readFileSync(DATA_PATHS.STATISTICS, 'utf-8'));
  } catch (error) {
    console.error('통계 데이터 읽기 실패:', error);
    throw error;
  }
};

type StatisticsData = 
  | { type: 'menu'; data: { menuId: MenuId; count: number } }
  | { type: 'word'; data: { korean: string; russian: string } }
  | { type: 'visit'; data: { increment: boolean } };

export const updateStatistics = async (
  type: StatisticsData['type'],
  data: StatisticsData extends { type: typeof type } ? StatisticsData['data'] : never
): Promise<Statistics> => {
  try {
    const stats = getStatistics();

    switch (type) {
      case 'menu':
        const { menuId, count } = data as { menuId: MenuId; count: number };
        if (menuId in stats.menuStats) {
          stats.menuStats[menuId].count = count;
          stats.menuStats[menuId].lastClicked = new Date().toISOString();
          console.log(`��뉴 ${menuId} 카운트 업데이트: ${count}`);
        }
        break;

      case 'word':
        const { korean, russian } = data as { korean: string; russian: string };
        if (!stats.wordStats[korean]) {
          stats.wordStats[korean] = { korean, russian, count: 0 };
        }
        stats.wordStats[korean].count += 1;
        break;

      case 'visit':
        const visitData = data as { increment: boolean };
        if (visitData.increment) {
          stats.totalVisits = (stats.totalVisits || 0) + 1;
          console.log('방문자 수 증가:', stats.totalVisits);
        }
        break;
    }

    stats.lastUpdated = new Date().toISOString();
    await fs.promises.writeFile(DATA_PATHS.STATISTICS, JSON.stringify(stats, null, 2), 'utf-8');
    return stats;
  } catch (error) {
    console.error('통계 업데이트 실패:', error);
    throw error;
  }
}; 