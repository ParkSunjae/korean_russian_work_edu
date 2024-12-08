import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function POST(request: Request) {
  try {
    const wordData = await request.json();

    const word = await prisma.word.upsert({
      where: { korean: wordData.korean },
      update: {
        listenCount: { increment: 1 }
      },
      create: {
        korean: wordData.korean,
        russian: wordData.russian,
        pronunciation: wordData.pronunciation,
        listenCount: 1
      }
    });

    return NextResponse.json({ success: true, data: word });
  } catch (error) {
    console.error("Failed to update word stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update word stats" },
      { status: 500 }
    );
  }
} 