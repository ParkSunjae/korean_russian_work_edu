import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import type { Suggestion } from "@/types/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    const [total, suggestions] = await Promise.all([
      prisma.suggestion.count({
        where: {
          OR: [{ title: { contains: search, mode: "insensitive" } }, { content: { contains: search, mode: "insensitive" } }],
        },
      }),
      prisma.suggestion.findMany({
        where: {
          OR: [{ title: { contains: search, mode: "insensitive" } }, { content: { contains: search, mode: "insensitive" } }],
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
    ]);

    return NextResponse.json({
      suggestions,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      },
    });
  } catch (error) {
    console.error("Suggestion API error:", error);
    return NextResponse.json({ error: "Failed to fetch suggestions" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, author } = body;

    if (!title || !content || !author) {
      return NextResponse.json({ success: false, error: "Title, content and author are required" }, { status: 400 });
    }

    const suggestion = await prisma.suggestion.create({
      data: {
        title,
        content,
        author,
      },
    });

    return NextResponse.json({
      success: true,
      data: suggestion,
    });
  } catch (error) {
    console.error("Suggestion API error:", error);
    return NextResponse.json({ success: false, error: "Failed to create suggestion" }, { status: 500 });
  }
}
