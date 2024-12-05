import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DICTIONARY_FILE = path.join(process.cwd(), "src/data/dictionary-data.json");

async function readDictionary() {
  const data = await fs.readFile(DICTIONARY_FILE, "utf-8");
  return JSON.parse(data);
}

async function writeDictionary(dictionary: any) {
  await fs.writeFile(DICTIONARY_FILE, JSON.stringify(dictionary, null, 2));
}

export async function GET() {
  const dictionary = await readDictionary();
  return NextResponse.json(dictionary);
}

export async function POST(request: Request) {
  const newWord = await request.json();
  const dictionary = await readDictionary();
  dictionary.words.push(newWord);
  await writeDictionary(dictionary);
  return NextResponse.json({ success: true });
}
