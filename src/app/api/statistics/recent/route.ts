import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import type { WordStat } from "@/types/statistics";

export const dynamic = "force-dynamic";

interface RecentResponse {
  items: Array<WordStat>;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const limit = parseInt(searchParams.get("limit") || "5", 10);

    if (type !== "word" && type !== "phrase") {
      return NextResponse.json({ error: "Invalid type parameter" }, { status: 400 });
    }

    const items = await prisma.wordStats.findMany({
      take: limit,
      orderBy: {
        lastUsed: "desc",
      },
      select: {
        korean: true,
        count: true,
        dictionary: {
          select: {
            russian: true,
          },
        },
      },
    });

    const formattedItems = items
      .filter((item) => item.dictionary)
      .map((item) => ({
        korean: item.korean,
        russian: item.dictionary.russian,
        count: item.count,
      }));

    return NextResponse.json<RecentResponse>({
      items: formattedItems,
    });
  } catch (error) {
    console.error("Failed to fetch recent items:", error);
    return NextResponse.json({ error: "Failed to fetch recent items" }, { status: 500 });
  }
}
