import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import type { VisitorStats } from "@/types/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stats = await prisma.visitorStats.findFirst({
      orderBy: {
        lastUpdated: "desc",
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

export async function POST() {
  try {
    const stats = await prisma.visitorStats.upsert({
      where: {
        id: "visitor-stats", // 단일 레코드 유지
      },
      update: {
        totalCount: {
          increment: 1,
        },
      },
      create: {
        id: "visitor-stats",
        totalCount: 1,
      },
    });

    return NextResponse.json({ success: true, data: stats });
  } catch (error) {
    console.error("Failed to update visitor count:", error);
    return NextResponse.json({ error: "Failed to update visitor count" }, { status: 500 });
  }
}
