import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "50");
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const subcategory = searchParams.get("subcategory") || "";

  const skip = (page - 1) * limit;

  try {
    const whereCondition: Prisma.WordWhereInput = {
      AND: [
        search
          ? {
              OR: [{ korean: { contains: search } }, { russian: { contains: search } }],
            }
          : {},
        category ? { category } : {},
        subcategory ? { subcategory } : {},
      ].filter(Boolean),
    };

    const total = await prisma.word.count({ where: whereCondition });
    const totalPages = Math.ceil(total / limit);

    const words = await prisma.word.findMany({
      where: whereCondition,
      take: limit,
      skip,
      orderBy: [{ category: "asc" }, { korean: "asc" }],
    });

    return NextResponse.json({
      words,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
      },
    });
  } catch (error) {
    console.error("Error fetching dictionary:", error);
    return NextResponse.json({ error: "단어 조회 중 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { korean, russian, pronunciation } = body;

    // 입력값 검증
    if (!korean?.trim()) {
      return NextResponse.json({ success: false, error: "Korean text is required" }, { status: 400 });
    }

    if (!russian?.trim()) {
      return NextResponse.json({ success: false, error: "Russian text is required" }, { status: 400 });
    }

    const normalizedKorean = korean.trim();

    try {
      // 새 단어 생성 시도
      const newWord = await prisma.word.create({
        data: {
          korean: normalizedKorean,
          russian: russian.trim(),
          pronunciation: pronunciation?.trim() || "",
          listenCount: 0,
        },
      });

      return NextResponse.json({
        success: true,
        data: newWord,
        message: "Word created successfully",
      });
    } catch (error) {
      // Prisma unique constraint error (P2002) 처리
      if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
        // 이미 존재하는 단어 조회
        const existingWord = await prisma.word.findUnique({
          where: { korean: normalizedKorean },
        });

        return NextResponse.json(
          {
            success: false,
            error: "Word already exists",
            data: existingWord,
          },
          { status: 409 }
        ); // 409 Conflict
      }
      throw error; // 다른 에러는 상위 catch 블록으로 전달
    }
  } catch (error) {
    console.error("Dictionary API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to create word";
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
