import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    // 방문자 통계
    const visitorStats = await prisma.visitorStats.findFirst();

    // 메뉴 통계
    const menuStats = await prisma.menuStats.findMany({
      orderBy: {
        clickCount: "desc",
      },
    });

    // 단어 통계
    const wordStats = await prisma.word.findMany({
      take: 5,
      orderBy: {
        listenCount: "desc",
      },
      select: {
        korean: true,
        russian: true,
        listenCount: true,
      },
    });

    return NextResponse.json({
      visitorStats: visitorStats || { totalCount: 0 },
      menuStats,
      wordStats,
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    return NextResponse.json({ error: "통계 조회 중 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function POST() {
  try {
    const stats = await prisma.visitorStats.upsert({
      where: {
        id: "total", // 고정된 ID 사용
      },
      update: {
        totalCount: {
          increment: 1,
        },
      },
      create: {
        id: "total",
        totalCount: 1,
      },
    });

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error updating visitor stats:", error);
    return NextResponse.json({ error: "방문자 통계 업데이트 중 오류가 발생했습니다." }, { status: 500 });
  }
}
