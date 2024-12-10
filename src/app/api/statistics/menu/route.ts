import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function POST(request: Request) {
  try {
    const { menuId, menuName, menuNameRu } = await request.json();

    if (!menuId || !menuName || !menuNameRu) {
      return NextResponse.json({ error: "Required fields are missing" }, { status: 400 });
    }

    // 기존 메뉴 통계 찾기
    const existingStat = await prisma.menuStats.findUnique({
      where: { name: menuId },
    });

    let menuStat;
    if (existingStat) {
      // 기존 통계 업데이트
      menuStat = await prisma.menuStats.update({
        where: { id: existingStat.id },
        data: {
          clickCount: { increment: 1 },
          lastClicked: new Date(),
          menuName: menuName,
          menuNameRu: menuNameRu,
        },
      });
    } else {
      // 새 통계 생성
      menuStat = await prisma.menuStats.create({
        data: {
          name: menuId,
          menuName: menuName,
          menuNameRu: menuNameRu,
          clickCount: 1,
        },
      });
    }

    return NextResponse.json({ success: true, data: menuStat });
  } catch (error) {
    console.error("Failed to update menu statistics:", error);
    return NextResponse.json({ error: "Failed to update menu statistics" }, { status: 500 });
  }
}
