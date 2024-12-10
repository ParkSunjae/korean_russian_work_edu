import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { Prisma } from "@prisma/client";

export async function GET() {
  try {
    // 카테고리별 단어 조회
    const words = await prisma.word.findMany({
      select: {
        category: true,
        subcategory: true,
      },
      where: {
        NOT: {
          OR: [{ category: null }, { subcategory: null }],
        },
      },
    });

    // 카테고리 매핑
    const categories: Record<string, string[]> = {};
    words.forEach((word) => {
      const { category, subcategory } = word;
      if (category && subcategory) {
        if (!categories[category]) {
          categories[category] = [];
        }
        if (!categories[category].includes(subcategory)) {
          categories[category].push(subcategory);
        }
      }
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "카테고리 조회 중 오류가 발생했습니다." }, { status: 500 });
  }
}
