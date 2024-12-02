import fs from "fs/promises";
import path from "path";
import { Notice } from "../types/notice";

const NOTICES_FILE = path.join(process.cwd(), "public/data/notices.json");

// 공지사항 목록 읽기
export async function readNotices(): Promise<Notice[]> {
  try {
    const data = await fs.readFile(NOTICES_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // 파일이 없는 경우 빈 배열 반환
    return [];
  }
}

// 공지사항 저장
export async function writeNotices(notices: Notice[]): Promise<void> {
  // data 디렉토리가 없으면 생성
  const dir = path.dirname(NOTICES_FILE);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }

  // 공지사항을 JSON 파일로 저장
  await fs.writeFile(NOTICES_FILE, JSON.stringify(notices, null, 2));
}

// 공지사항 추가
export async function addNotice(notice: Notice): Promise<void> {
  const notices = await readNotices();
  notices.push(notice);
  await writeNotices(notices);
}

// 공지사항 수정
export async function updateNotice(notice: Notice): Promise<void> {
  const notices = await readNotices();
  const index = notices.findIndex((n) => n.id === notice.id);
  if (index !== -1) {
    notices[index] = notice;
    await writeNotices(notices);
  }
}

// 공지사항 삭제
export async function deleteNotice(id: string): Promise<void> {
  const notices = await readNotices();
  const filtered = notices.filter((notice) => notice.id !== id);
  await writeNotices(filtered);
}
