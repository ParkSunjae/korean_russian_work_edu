import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 20;
    const search = searchParams.get('search') || '';

    // 전체 개수 조회
    const total = await prisma.dictionary.count({
      where: {
        OR: [
          { korean: { contains: search } },
          { russian: { contains: search } }
        ]
      }
    });

    // 페이징 처리된 데이터 조회
    const words = await prisma.dictionary.findMany({
      where: {
        OR: [
          { korean: { contains: search } },
          { russian: { contains: search } }
        ]
      },
      include: {
        examples: true,
        stats: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip: (page - 1) * limit,
      take: limit
    });

    // 클라이언트에 맞는 형식으로 변환
    const formattedWords = words.map(word => ({
      ...word,
      examples: word.examples.map(ex => ex.text)
    }));

    return NextResponse.json({
      words: formattedWords,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Failed to fetch dictionary:', error);
    return NextResponse.json({ error: 'Failed to fetch dictionary' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const wordData = await request.json();
    
    const word = await prisma.dictionary.create({
      data: {
        korean: wordData.korean,
        english: wordData.english || "",
        russian: wordData.russian,
        pronunciation: wordData.pronunciation,
        definition: wordData.definition || "",
        definition_ru: wordData.definition_ru || "",
        category: wordData.category || "기본",
        difficulty: wordData.difficulty || "초급",
        examples: {
          create: wordData.examples?.map((text: string) => ({ text })) || []
        }
      },
      include: {
        examples: true
      }
    });

    return NextResponse.json(word);
  } catch (error) {
    console.error('Failed to create word:', error);
    return NextResponse.json({ error: 'Failed to create word' }, { status: 500 });
  }
}
