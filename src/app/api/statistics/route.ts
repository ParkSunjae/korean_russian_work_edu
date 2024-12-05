import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const STATISTICS_FILE = path.join(process.cwd(), "public/data/statistics.json");

interface WordStat {
  korean: string;
  russian: string;
  pronunciation: string;
  count: number;
}

interface Statistics {
  totalVisits: number;
  lastUpdated: string;
  menuStats: Record<string, { name: string; nameRu: string; count: number }>;
  wordStats: WordStat[];
}

async function initializeStatisticsFile() {
  const initialData = {
    totalVisits: 0,
    lastUpdated: new Date().toISOString(),
    menuStats: {},
    wordStats: [],
  };
  await fs.writeFile(STATISTICS_FILE, JSON.stringify(initialData, null, 2));
  return initialData;
}

async function readStatistics(): Promise<Statistics> {
  try {
    const data = await fs.readFile(STATISTICS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // 파일이 없으면 초기화
    return initializeStatisticsFile();
  }
}

async function writeStatistics(statistics: Statistics): Promise<void> {
  await fs.writeFile(STATISTICS_FILE, JSON.stringify(statistics, null, 2));
}

export async function POST(request: Request) {
  const { type, data } = await request.json();
  const statistics = await readStatistics();

  if (type === "word") {
    // 단어 데이터 유효성 검사
    if (!data.korean || !data.russian || !data.pronunciation) {
      console.error("Invalid word data:", data);
      return NextResponse.json({ success: false, error: "Invalid word data" }, { status: 400 });
    }

    // 기존 단어 찾기
    const existingWordIndex = statistics.wordStats.findIndex((word) => word.korean === data.korean && word.russian === data.russian);

    if (existingWordIndex === -1) {
      // 새 단어 추가
      const newWord: WordStat = {
        korean: data.korean,
        russian: data.russian,
        pronunciation: data.pronunciation,
        count: 1,
      };
      statistics.wordStats.push(newWord);
      console.log("Added new word:", newWord);
    } else {
      // 기존 단어 카운트 증가
      statistics.wordStats[existingWordIndex].count += 1;
      console.log("Updated word count:", statistics.wordStats[existingWordIndex]);
    }

    // 카운트 기준 내림차순 정렬
    statistics.wordStats.sort((a, b) => b.count - a.count);
  } else if (type === "menu") {
    if (!statistics.menuStats[data.id]) {
      statistics.menuStats[data.id] = {
        name: data.name,
        nameRu: data.nameRu,
        count: 0,
      };
    }
    statistics.menuStats[data.id].count += 1;
  }

  statistics.lastUpdated = new Date().toISOString();
  await writeStatistics(statistics);

  return NextResponse.json({ success: true, data: statistics.wordStats });
}

export async function GET() {
  const statistics = await readStatistics();
  return NextResponse.json(statistics);
}
