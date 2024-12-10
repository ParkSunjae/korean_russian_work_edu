import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const notices = await prisma.notice.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(notices);
  } catch (error) {
    console.error("Error fetching notices:", error);
    return NextResponse.json({ error: "공지사항을 불러오는데 실패했습니다." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const noticeData = await request.json();
    const notice = await prisma.notice.create({
      data: noticeData,
    });
    return NextResponse.json(notice);
  } catch (error) {
    console.error("Failed to create notice:", error);
    return NextResponse.json({ error: "Failed to create notice" }, { status: 500 });
  }
}
