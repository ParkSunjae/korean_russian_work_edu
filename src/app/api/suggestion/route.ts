import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    // DB에서 건의사항 조회
    const [total, suggestions] = await Promise.all([
      prisma.suggestion.count({
        where: {
          OR: [{ title: { contains: search, mode: "insensitive" } }, { content: { contains: search, mode: "insensitive" } }],
        },
      }),
      prisma.suggestion.findMany({
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
      suggestions,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      },
    });
  } catch (error) {
    console.error("Failed to fetch suggestions:", error);
    return NextResponse.json({ error: "건의사항을 불러오는데 실패했습니다." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, author } = body;

    if (!title || !content || !author) {
      return NextResponse.json({ error: "제목, 내용, 작성자는 필수 입력사항입니다." }, { status: 400 });
    }

    const suggestion = await prisma.suggestion.create({
      data: {
        title,
        content,
        author,
      },
    });

    return NextResponse.json({
      success: true,
      data: suggestion,
    });
  } catch (error) {
    console.error("Failed to create suggestion:", error);
    return NextResponse.json({ error: "건의사항 등록에 실패했습니다." }, { status: 500 });
  }
}
