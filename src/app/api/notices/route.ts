import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { Notice } from "@/types/notice";

const NOTICES_FILE = path.join(process.cwd(), "src/data/notice.json");

async function readNotices(): Promise<Notice[]> {
  const data = await fs.readFile(NOTICES_FILE, "utf-8");
  return JSON.parse(data);
}

export async function GET() {
  const notices = await readNotices();
  return NextResponse.json(notices);
}
