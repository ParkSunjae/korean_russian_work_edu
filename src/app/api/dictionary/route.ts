import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import type { Word } from "@/types/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const search = searchParams.get("search") || "";
    const exact = searchParams.get("exact") === "true";

    const skip = (page - 1) * limit;

    // 한글 단어만 검색 (정확한 검색 또는 부분 검색)
    const whereCondition = exact ? { korean: search } : { korean: { contains: search, mode: "insensitive" } };

    const [total, words] = await Promise.all([
      prisma.word.count({ where: whereCondition }),
      prisma.word.findMany({
        where: whereCondition,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
    ]);

    // 정확한 검색에서 결과가 없는 경우 새로운 단어 생성 가능 여부 반환
    const canCreate = exact && total === 0;

    return NextResponse.json({
      success: true,
      words,
      canCreate,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      },
    });
  } catch (error) {
    console.error("Dictionary API error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch words" }, { status: 500 });
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
