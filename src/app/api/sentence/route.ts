import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import type { Sentence } from "@/types/prisma";
import { koreanToEnglish } from "@/libs/pronunciation";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const search = searchParams.get("search") || "";
    const exact = searchParams.get("exact") === "true";

    const skip = (page - 1) * limit;

    // 한글 문장만 검색 (정확한 검색 또는 부분 검색)
    const whereCondition = exact ? { korean: search } : { korean: { contains: search, mode: "insensitive" } };

    const [total, sentences] = await Promise.all([
      prisma.sentence.count({ where: whereCondition }),
      prisma.sentence.findMany({
        where: whereCondition,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
    ]);

    // 정확한 검색에서 결과가 없는 경우 새로운 문장 생성 가능 여부 반환
    const canCreate = exact && total === 0;

    return NextResponse.json({
      success: true,
      sentences,
      canCreate,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      },
    });
  } catch (error) {
    console.error("Sentence API error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch sentences" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { korean } = await request.json();

    if (!korean?.trim()) {
      return NextResponse.json({ success: false, error: "Korean text is required" }, { status: 400 });
    }

    const normalizedKorean = korean.trim();

    try {
      // 번역 API 호출
      const translateResponse = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ korean: normalizedKorean }),
      });

      if (!translateResponse.ok) {
        throw new Error("Translation failed");
      }

      const translateData = await translateResponse.json();

      // 새 문장 생성 시도
      const newSentence = await prisma.sentence.create({
        data: {
          korean: normalizedKorean,
          russian: translateData.russian,
          pronunciation: koreanToEnglish(normalizedKorean),
          category: "general",
          difficulty: "normal",
          listenCount: 0,
        },
      });

      return NextResponse.json({
        success: true,
        data: newSentence,
        message: "Sentence created successfully",
      });
    } catch (error) {
      // Prisma unique constraint error (P2002) 처리
      if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
        // 이미 존재하는 문장 조회
        const existingSentence = await prisma.sentence.findUnique({
          where: { korean: normalizedKorean },
        });

        return NextResponse.json(
          {
            success: false,
            error: "Sentence already exists",
            data: existingSentence,
          },
          { status: 409 }
        );
      }
      throw error;
    }
  } catch (error) {
    console.error("Sentence API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to create sentence";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
