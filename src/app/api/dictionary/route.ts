import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// public/data 디렉토리 경로로 변경
const DATA_DIR = path.join(process.cwd(), "public", "data");
const DICTIONARY_FILE = path.join(DATA_DIR, "dictionary-data.json");

// 초기 데이터 구조
const initialData = {
  words: [],
};

async function ensureDirectoryExists() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

async function readDictionary() {
  try {
    await ensureDirectoryExists();

    try {
      await fs.access(DICTIONARY_FILE);
    } catch {
      // 파일이 없으면 초기 데이터로 생성
      await fs.writeFile(DICTIONARY_FILE, JSON.stringify(initialData, null, 2));
      return initialData;
    }

    const data = await fs.readFile(DICTIONARY_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading dictionary:", error);
    return initialData;
  }
}

async function writeDictionary(dictionary: any) {
  try {
    await ensureDirectoryExists();
    await fs.writeFile(DICTIONARY_FILE, JSON.stringify(dictionary, null, 2), {
      mode: 0o666, // 읽기/쓰기 권한 설정
    });
  } catch (error) {
    console.error("Error writing dictionary:", error);
    throw error;
  }
}

export async function GET() {
  try {
    const dictionary = await readDictionary();
    return NextResponse.json(dictionary);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "Failed to read dictionary" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newWord = await request.json();
    const dictionary = await readDictionary();

    // 중복 검사
    const exists = dictionary.words.some((word: any) => word.korean === newWord.korean);
    if (exists) {
      return NextResponse.json({ error: "Word already exists", word: newWord }, { status: 400 });
    }

    dictionary.words.push(newWord);
    await writeDictionary(dictionary);

    return NextResponse.json({
      success: true,
      message: "Word saved successfully",
      word: newWord,
    });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      {
        error: "Failed to save word",
        details: error instanceof Error ? error.message : "Unknown error",
        word: request.body,
      },
      { status: 500 }
    );
  }
}
