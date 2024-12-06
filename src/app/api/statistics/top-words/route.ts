import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    const [total, words] = await Promise.all([
      prisma.word.count({
        where: {
          OR: [{ korean: { contains: search, mode: "insensitive" } }, { russian: { contains: search, mode: "insensitive" } }],
        },
      }),
      prisma.word.findMany({
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
    return NextResponse.json({ error: "Failed to fetch words" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { korean, russian, pronunciation } = body;

    if (!korean || !russian) {
      return NextResponse.json({ success: false, error: "Korean and Russian texts are required" }, { status: 400 });
    }

    // 기존 단어 체크
    const existingWord = await prisma.word.findUnique({
      where: { korean },
    });

    if (existingWord) {
      return NextResponse.json({
        success: false,
        error: "Word already exists",
        data: existingWord,
      });
    }

    // 새 단어 생성
    const newWord = await prisma.word.create({
      data: {
        korean,
        russian,
        pronunciation: pronunciation || "",
        listenCount: 0,
      },
    });

    return NextResponse.json({
      success: true,
      data: newWord,
    });
  } catch (error) {
    console.error("Dictionary API error:", error);
    return NextResponse.json({ success: false, error: "Failed to create word" }, { status: 500 });
  }
}
