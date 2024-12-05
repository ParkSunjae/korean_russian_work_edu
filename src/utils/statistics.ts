import fs from "fs/promises";
import path from "path";
import { Statistics, MenuStat } from "@/types/statistics";

const STATISTICS_FILE = path.join(process.cwd(), "public/data/statistics.json");

export async function readStatistics(): Promise<Statistics> {
  try {
    const data = await fs.readFile(STATISTICS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // 파일이 없거나 읽기 실패시 기본값 반환
    return {
      totalVisits: 0,
      lastUpdated: new Date().toISOString(),
      menuStats: {},
      wordStats: [],
    };
  }
}

export async function writeStatistics(statistics: Statistics): Promise<void> {
  await fs.writeFile(STATISTICS_FILE, JSON.stringify(statistics, null, 2));
}

export async function updateStatistics(type: string, data: any): Promise<Statistics> {
  try {
    const stats = await readStatistics();

    switch (type) {
      case "menu": {
        const menuId = data.id;
        const count = (stats.menuStats[menuId]?.count || 0) + 1;

        if (!stats.menuStats[menuId]) {
          stats.menuStats[menuId] = {
            name: data.name,
            nameRu: data.nameRu,
            count: 1,
            lastClicked: new Date().toISOString(),
          };
        } else {
          stats.menuStats[menuId].count = count;
          stats.menuStats[menuId].lastClicked = new Date().toISOString();
        }
        break;
      }
      case "word": {
        const { korean, russian, pronunciation } = data;
        const existingWordIndex = stats.wordStats.findIndex((word) => word.korean === korean);

        if (existingWordIndex === -1) {
          stats.wordStats.push({
            korean,
            russian,
            pronunciation,
            count: 1,
          });
        } else {
          stats.wordStats[existingWordIndex].count += 1;
        }

        // 카운트 기준으로 내림차순 정렬
        stats.wordStats.sort((a, b) => b.count - a.count);
        break;
      }
    }

    stats.lastUpdated = new Date().toISOString();
    await writeStatistics(stats);
    return stats;
  } catch (error) {
    console.error("통계 업데이트 실패:", error);
    throw error;
  }
}
