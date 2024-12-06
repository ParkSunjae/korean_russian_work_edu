import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Statistics, MenuStat } from "@/types/statistics";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // 기본 통계 데이터 조회
    const [visitStats, menuStats, topWords] = await Promise.all([
      prisma.statistics.findFirst({
        orderBy: { lastUpdated: "desc" },
      }),
      prisma.menuStats.findMany(),
      // 자주 학습된 단어 조회
      prisma.wordStats.findMany({
        take: 5,
        orderBy: {
          count: "desc",
        },
        select: {
          korean: true,
          count: true,
          dictionary: {
            select: {
              russian: true,
            },
          },
        },
      }),
    ]);

    // 메뉴 통계 데이터 가공
    const menuStatsMap = menuStats.reduce((acc, stat) => {
      acc[stat.menuId] = {
        name: stat.name,
        nameRu: stat.nameRu,
        count: stat.count,
      };
      return acc;
    }, {} as Record<string, MenuStat>);

    // 자주 학습된 단어 데이터 가공
    const formattedWordStats = topWords
      .filter((stat) => stat.dictionary)
      .map((stat) => ({
        korean: stat.korean,
        russian: stat.dictionary.russian,
        count: stat.count,
      }));

    const statistics: Statistics = {
      totalWords: await prisma.dictionary.count(),
      todayWords: 0,
      totalPhrases: 0,
      todayPhrases: 0,
      totalVisits: visitStats?.totalVisits || 0,
      lastUpdated: visitStats?.lastUpdated.toISOString() || new Date().toISOString(),
      menuStats: menuStatsMap,
      wordStats: formattedWordStats,
      recentWords: [],
      recentPhrases: [],
    };

    return NextResponse.json(statistics);
  } catch (error) {
    console.error("Failed to fetch statistics:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
