import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const count = parseInt(searchParams.get('count') || '50');

  try {
    const words = await prisma.word.findMany({
      take: count,
      where: {
        korean: {
          not: ''
        }
      },
      select: {
        id: true,
        korean: true,
        russian: true
      }
    });

    // 단어 배열을 랜덤하게 섞기
    const shuffledWords = [...words].sort(() => Math.random() - 0.5);

    return NextResponse.json(shuffledWords);
  } catch (error) {
    console.error('Error fetching words:', error);
    return NextResponse.json(
      { error: 'Failed to fetch words' },
      { status: 500 }
    );
  }
} 