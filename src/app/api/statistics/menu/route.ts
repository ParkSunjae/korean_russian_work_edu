import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function POST(request: Request) {
  try {
    const { menuName, menuNameRu } = await request.json();

    if (!menuName || !menuNameRu) {
      return NextResponse.json({ error: "Menu name and Russian name are required" }, { status: 400 });
    }

    const menuStat = await prisma.menuStats.upsert({
      where: { menuName },
      update: {
        clickCount: { increment: 1 },
        lastClicked: new Date(),
      },
      create: {
        menuName,
        menuNameRu,
        clickCount: 1,
      },
    });

    return NextResponse.json({ success: true, data: menuStat });
  } catch (error) {
    console.error("Failed to update menu statistics:", error);
    return NextResponse.json({ error: "Failed to update menu statistics" }, { status: 500 });
  }
}
