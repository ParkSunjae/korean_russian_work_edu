import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const stats = await prisma.visitorStats.upsert({
      where: {
        id: "total", // 단일 레코드 유지
      },
      update: {
        totalCount: {
          increment: 1,
        },
        lastUpdated: new Date(),
      },
      create: {
        id: "total",
        totalCount: 1,
        lastUpdated: new Date(),
      },
    });

    return NextResponse.json({ success: true, data: stats });
  } catch (error) {
    console.error("Failed to update visitor count:", error);
    return NextResponse.json({ error: "Failed to update visitor count" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const stats = await prisma.visitorStats.findFirst({
      where: {
        id: "total",
      },
    });

    return NextResponse.json({
      totalCount: stats?.totalCount || 0,
      lastUpdated: stats?.lastUpdated || new Date(),
    });
  } catch (error) {
    console.error("Failed to fetch visitor statistics:", error);
    return NextResponse.json({ error: "Failed to fetch visitor statistics" }, { status: 500 });
  }
}
