import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { cookies } from "next/headers";

export async function GET() {
  try {
    // 모든 통계 데이터를 한 번에 가져오기
    const [visitorStats, menuStats, wordStats] = await Promise.all([
      prisma.visitorStats.findFirst(),
      prisma.menuStats.findMany({
        orderBy: { clickCount: 'desc' }
      }),
      prisma.word.findMany({
        where: {
          listenCount: {
            gt: 0  // 최소 1회 이상 들은 단어만
          }
        },
        orderBy: {
          listenCount: 'desc'  // 많이 들은 순서대로
        },
        take: 10,  // 상위 10개만
        select: {
          korean: true,
          russian: true,
          listenCount: true
        }
      })
    ]);

    return NextResponse.json({
      totalVisits: visitorStats?.totalCount || 0,
      lastUpdated: visitorStats?.lastUpdated || new Date(),
      menuStats: menuStats.map(stat => ({
        menuId: stat.menuName,
        name: stat.menuName,
        nameRu: stat.menuNameRu,
        count: stat.clickCount,
        lastClicked: stat.lastClicked
      })),
      wordStats: wordStats.map(word => ({
        korean: word.korean,
        russian: word.russian,
        listenCount: word.listenCount
      }))
    });
  } catch (error) {
    console.error("Failed to fetch statistics:", error);
    return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 });
  }
}

export async function POST() {
  try {
    const cookieStore = cookies();
    const visitId = cookieStore.get("visit_id")?.value;

    // 이미 방문 기록이 있으면 카운트하지 않음
    if (visitId) {
      return NextResponse.json({
        success: true,
        message: "Already counted"
      });
    }

    // 방문자 통계 업데이트
    let stats = await prisma.visitorStats.findFirst();

    if (!stats) {
      stats = await prisma.visitorStats.create({
        data: { totalCount: 1 }
      });
    } else {
      stats = await prisma.visitorStats.update({
        where: { id: stats.id },
        data: { totalCount: { increment: 1 } }
      });
    }

    // 24시간 유효한 쿠키 설정
    const response = NextResponse.json({ success: true, data: stats });
    response.cookies.set("visit_id", "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 // 24시간
    });

    return response;
  } catch (error) {
    console.error("Failed to update visitor count:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update visitor count" },
      { status: 500 }
    );
  }
}
