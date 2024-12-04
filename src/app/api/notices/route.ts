import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Notice } from '@/types/notice';

const NOTICES_FILE = path.join(process.cwd(), 'src/data/notices.json');

async function readNotices(): Promise<Notice[]> {
  try {
    const data = await fs.readFile(NOTICES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      await fs.writeFile(NOTICES_FILE, '[]');
      return [];
    }
    throw error;
  }
}

async function writeNotices(notices: Notice[]): Promise<void> {
  await fs.writeFile(NOTICES_FILE, JSON.stringify(notices, null, 2));
}

export async function GET() {
  try {
    const notices = await readNotices();
    return NextResponse.json(notices);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch notices' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const notice = await request.json();
    const notices = await readNotices();
    notices.push({ ...notice, id: Date.now().toString(), createdAt: new Date().toISOString() });
    await writeNotices(notices);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add notice' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const notices = await readNotices();
    const filtered = notices.filter(notice => notice.id !== id);
    await writeNotices(filtered);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete notice' }, { status: 500 });
  }
}
