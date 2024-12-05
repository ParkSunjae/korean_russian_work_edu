import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 30;
    const search = searchParams.get('search') || '';

    // 검색 조건 수정: contains 대신 equals 사용
    const where = search ? {
      OR: [
        { korean: { equals: search } },
        { russian: { equals: search } }
      ]
    } : {};

    // 전체 개수 조회
    const total = await prisma.dictionary.count({ where });

    // 페이징 처리된 데이터 조회
    const words = await prisma.dictionary.findMany({
      where,
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
    
    // 필수 필드 검증
    if (!wordData?.korean || !wordData?.russian) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields: korean and russian are required' 
      }, { status: 400 });
    }

    // 중복 검사 - 대소문자 구분 없이, 공백 제거 후 비교
    const normalizedKorean = wordData.korean.trim().toLowerCase();
    const existingWord = await prisma.dictionary.findFirst({
      where: {
        korean: {
          equals: normalizedKorean,
          mode: 'insensitive'  // 대소문자 구분 없이
        }
      }
    });

    if (existingWord) {
      return NextResponse.json({
        success: false,
        error: 'Word already exists',
        existingWord
      }, { status: 409 });
    }

    // 새 단어 생성
    const word = await prisma.dictionary.create({
      data: {
        korean: normalizedKorean,  // 정규화된 한국어 저장
        english: wordData.english?.trim() || "",
        russian: wordData.russian.trim(),
        pronunciation: wordData.pronunciation?.trim() || "",
        definition: wordData.definition?.trim() || "",
        definition_ru: wordData.definition_ru?.trim() || "",
        category: wordData.category?.trim() || "기본",
        difficulty: wordData.difficulty?.trim() || "초급",
        examples: {
          create: wordData.examples?.map((text: string) => ({ 
            text: text.trim() 
          })) || []
        }
      },
      include: {
        examples: true
      }
    });

    return NextResponse.json({
      success: true,
      data: word
    }, { status: 201 });

  } catch (error) {
    console.error('Dictionary creation error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create dictionary entry',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
