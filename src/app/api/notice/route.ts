import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import type { Notice } from "@/types/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    const [total, notices] = await Promise.all([
      prisma.notice.count({
        where: {
          OR: [{ title: { contains: search, mode: "insensitive" } }, { content: { contains: search, mode: "insensitive" } }],
        },
      }),
      prisma.notice.findMany({
        where: {
          OR: [{ title: { contains: search, mode: "insensitive" } }, { content: { contains: search, mode: "insensitive" } }],
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
    ]);

    return NextResponse.json({
      notices,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      },
    });
  } catch (error) {
    console.error("Notice API error:", error);
    return NextResponse.json({ error: "Failed to fetch notices" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json({ success: false, error: "Title and content are required" }, { status: 400 });
    }

    const notice = await prisma.notice.create({
      data: {
        title,
        content,
      },
    });

    return NextResponse.json({
      success: true,
      data: notice,
    });
  } catch (error) {
    console.error("Notice API error:", error);
    return NextResponse.json({ success: false, error: "Failed to create notice" }, { status: 500 });
  }
}
