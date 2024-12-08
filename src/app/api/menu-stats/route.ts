import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function POST(request: Request) {
  try {
    const { menuId, name, nameRu } = await request.json();

    const menuStats = await prisma.menuStats.upsert({
      where: { menuName: menuId },
      update: {
        clickCount: { increment: 1 },
        lastClicked: new Date()
      },
      create: {
        menuName: menuId,
        menuNameRu: nameRu,
        clickCount: 1,
        lastClicked: new Date()
      }
    });

    return NextResponse.json({ success: true, data: menuStats });
  } catch (error) {
    console.error("Failed to update menu stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update menu stats" },
      { status: 500 }
    );
  }
} 