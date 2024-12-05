import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { MenuId } from "@/constants/menu";

export async function GET() {
  try {
    const [stats, menuStats, wordStats] = await Promise.all([
      prisma.statistics.findFirst(),
      prisma.menuStats.findMany(),
      prisma.wordStats.findMany({
        orderBy: { count: 'desc' },
        take: 10
      })
    ]);

    // 기본값 설정
    const defaultStats = {
      totalVisits: 0,
      lastUpdated: new Date().toISOString(),
      menuStats: {},
      wordStats: []
    };

    // 메뉴 통계 변환
    const formattedMenuStats = menuStats.reduce<Record<MenuId, any>>((acc, stat) => ({
      ...acc,
      [stat.menuId]: {
        name: stat.name,
        nameRu: stat.nameRu,
        count: stat.count,
        lastClicked: stat.lastClicked
      }
    }), {} as Record<MenuId, any>);

    return NextResponse.json({
      totalVisits: stats?.totalVisits || defaultStats.totalVisits,
      lastUpdated: stats?.lastUpdated || defaultStats.lastUpdated,
      menuStats: formattedMenuStats,
      wordStats: wordStats.map(stat => ({
        korean: stat.korean,
        russian: stat.russian,
        pronunciation: stat.pronunciation,
        count: stat.count
      }))
    });
  } catch (error) {
    console.error('Failed to fetch statistics:', error);
    return NextResponse.json({ error: 'Failed to fetch statistics' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received request body:', body);

    if (!body || !body.type || !body.data) {
      console.error('Invalid request body:', body);
      return NextResponse.json(
        { error: 'Invalid request body', received: body },
        { status: 400 }
      );
    }

    const { type, data } = body;

    switch (type) {
      case 'menu': {
        const menuId = data.id;
        const { name, nameRu } = data;
        
        if (!menuId || !name || !nameRu) {
          console.error('Missing menu data:', data);
          return NextResponse.json(
            { error: 'Missing required menu data', received: data },
            { status: 400 }
          );
        }

        // 메뉴 통계 업데이트
        const result = await prisma.menuStats.upsert({
          where: { menuId },
          update: {
            count: { increment: 1 },
            lastClicked: new Date()
          },
          create: {
            menuId,
            name,
            nameRu,
            count: 1,
            lastClicked: new Date()
          }
        });

        return NextResponse.json({ success: true, data: result });
      }

      case 'word': {
        const { korean, russian, pronunciation } = data;
        if (!korean || !russian || !pronunciation) {
          console.error('Missing word data:', data);
          return NextResponse.json(
            { error: 'Missing required word data', received: data },
            { status: 400 }
          );
        }

        // 단어 통계 업데이트
        const result = await prisma.wordStats.upsert({
          where: { korean },
          update: {
            count: { increment: 1 },
            lastUsed: new Date()
          },
          create: {
            korean,
            russian,
            pronunciation,
            count: 1,
            lastUsed: new Date()
          }
        });

        return NextResponse.json({ success: true, data: result });
      }

      default:
        console.error('Invalid statistics type:', type);
        return NextResponse.json(
          { error: 'Invalid statistics type', received: { type, data } },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Failed to update statistics:', error);
    return NextResponse.json(
      { error: 'Failed to update statistics', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
