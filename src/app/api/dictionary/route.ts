import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "30", 10);
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    const [total, words] = await Promise.all([
      prisma.dictionary.count({
        where: {
          OR: [{ korean: { contains: search, mode: "insensitive" } }, { russian: { contains: search, mode: "insensitive" } }],
        },
      }),
      prisma.dictionary.findMany({
        where: {
          OR: [{ korean: { contains: search, mode: "insensitive" } }, { russian: { contains: search, mode: "insensitive" } }],
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
    ]);

    return NextResponse.json({
      words,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      },
    });
  } catch (error) {
    console.error("Dictionary API error:", error);
    return NextResponse.json({ error: "Failed to fetch dictionary" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { korean, russian, pronunciation } = body;

    if (!korean || !russian) {
      return NextResponse.json({ success: false, error: "Korean and Russian texts are required" }, { status: 400 });
    }

    // 먼저 존재하는 단어 체크
    const existingWord = await prisma.dictionary.findUnique({
      where: { korean },
      include: {
        stats: true,
      },
    });

    if (existingWord) {
      return NextResponse.json({
        success: false,
        error: "Word already exists",
        data: existingWord,
      });
    }

    // 새 단어 생성
    const newWord = await prisma.dictionary.create({
      data: {
        korean,
        russian,
        pronunciation: pronunciation || "",
        english: "",
        definition: "",
        definition_ru: "",
        category: "general",
        difficulty: "basic",
      },
    });

    // 통계 데이터 생성
    const stats = await prisma.wordStats.create({
      data: {
        dictionary: {
          connect: {
            id: newWord.id,
          },
        },
        count: 0,
        lastUsed: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        ...newWord,
        stats,
      },
    });
  } catch (error) {
    console.error("Dictionary API error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, error: "Failed to create word" }, { status: 500 });
  }
}
