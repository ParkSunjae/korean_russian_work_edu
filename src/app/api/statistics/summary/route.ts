import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import type { MenuStat } from "@/types/statistics";
import type { MenuStats } from "@/types/prisma";

export async function GET() {
  try {
    const [visitStats, menuStats, topWords] = await Promise.all([
      prisma.visitorStats.findFirst({
        orderBy: { lastUpdated: "desc" },
      }),
      prisma.menuStats.findMany(),
      prisma.word.findMany({
        where: { listenCount: { gt: 0 } },
        orderBy: { listenCount: "desc" },
        take: 10,
      }),
    ]);

    const menuStatsMap = menuStats.reduce((acc: Record<string, MenuStat>, stat: MenuStats) => {
      acc[stat.menuName] = {
        name: stat.menuName,
        nameRu: stat.menuNameRu,
        count: stat.clickCount,
      };
      return acc;
    }, {});

    return NextResponse.json({
      totalVisits: visitStats?.totalCount || 0,
      lastUpdated: visitStats?.lastUpdated || new Date(),
      menuStats: menuStatsMap,
      wordStats: topWords,
    });
  } catch (error) {
    console.error("Failed to fetch statistics:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
