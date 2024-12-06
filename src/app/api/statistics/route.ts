import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { MenuId } from "@/constants/menu";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const [stats, menuStats, wordStats] = await Promise.all([
      prisma.statistics.findFirst(),
      prisma.menuStats.findMany(),
      prisma.wordStats.findMany({
        orderBy: { count: "desc" },
        take: 10,
      }),
    ]);

    // 기본값 설정
    const defaultStats = {
      totalVisits: 0,
      lastUpdated: new Date().toISOString(),
      menuStats: {},
      wordStats: [],
    };

    // 메뉴 통계 변환
    const formattedMenuStats = menuStats.reduce<Record<MenuId, any>>(
      (acc, stat) => ({
        ...acc,
        [stat.menuId]: {
          name: stat.name,
          nameRu: stat.nameRu,
          count: stat.count,
          lastClicked: stat.lastClicked,
        },
      }),
      {} as Record<MenuId, any>
    );

    return NextResponse.json({
      totalVisits: stats?.totalVisits || defaultStats.totalVisits,
      lastUpdated: stats?.lastUpdated || defaultStats.lastUpdated,
      menuStats: formattedMenuStats,
      wordStats: wordStats.map((stat) => ({
        korean: stat.korean,
        russian: stat.russian,
        pronunciation: stat.pronunciation,
        count: stat.count,
      })),
    });
  } catch (error) {
    console.error("Failed to fetch statistics:", error);
    return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const visitId = cookieStore.get("visit_id")?.value;

    // 이미 방문 기록이 있으면 카운트하지 않음
    if (visitId) {
      return NextResponse.json({
        success: true,
        message: "Already counted",
      });
    }

    // 기존 통계 가져오기
    let stats = await prisma.statistics.findFirst();

    if (!stats) {
      stats = await prisma.statistics.create({
        data: { totalVisits: 1 },
      });
    } else {
      stats = await prisma.statistics.update({
        where: { id: stats.id },
        data: { totalVisits: stats.totalVisits + 1 },
      });
    }

    const response = NextResponse.json({ success: true, data: stats });
    response.cookies.set("visit_id", "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24시간
    });

    return response;
  } catch (error) {
    console.error("Failed to update statistics:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update statistics",
      },
      { status: 500 }
    );
  }
}
