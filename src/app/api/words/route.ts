import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import path from "path";
import fs from "fs/promises";

export async function POST() {
  try {
    const filePath = path.join(process.cwd(), "public/data/topik_1_vocabulary.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(fileContent);

    let addedCount = 0;
    let updatedCount = 0;

    for (const category of data.categories) {
      for (const subcategory of category.subcategories) {
        for (const word of subcategory.words) {
          const existingWord = await prisma.word.findFirst({
            where: {
              korean: word.korean,
              russian: word.russian,
            },
          });

          if (existingWord) {
            await prisma.word.update({
              where: { id: existingWord.id },
              data: {
                pronunciation: word.pronunciation,
                category: category.name,
                subcategory: subcategory.name,
              },
            });
            updatedCount++;
          } else {
            await prisma.word.create({
              data: {
                korean: word.korean,
                russian: word.russian,
                pronunciation: word.pronunciation,
                category: category.name,
                subcategory: subcategory.name,
              },
            });
            addedCount++;
          }
        }
      }
    }

    return NextResponse.json({
      message: "TOPIK I 어휘가 성공적으로 처리되었습니다.",
      addedCount,
      updatedCount,
    });
  } catch (error) {
    console.error("Error processing TOPIK vocabulary:", error);
    return NextResponse.json({ error: "TOPIK 어휘 처리 중 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const count = parseInt(searchParams.get("count") || "50");

  try {
    const words = await prisma.word.findMany({
      take: count,
      orderBy: { korean: "asc" },
    });

    return NextResponse.json(words);
  } catch (error) {
    console.error("Error fetching words:", error);
    return NextResponse.json({ error: "단어 조회 중 오류가 발생했습니다." }, { status: 500 });
  }
}
