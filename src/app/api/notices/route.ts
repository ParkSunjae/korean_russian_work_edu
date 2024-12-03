import { NextResponse } from "next/server";
import { readNotices, writeNotices, deleteNotice } from "@/utils/notices";
import { Notice } from "@/types/notice";

export async function GET() {
  try {
    const notices = await readNotices();
    return NextResponse.json(notices);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch notices" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const notice: Notice = await request.json();
    const notices = await readNotices();

    const newNotice = {
      ...notice,
      id: (notices.length + 1).toString(),
      createdAt: new Date().toISOString(),
    };

    notices.push(newNotice);
    await writeNotices(notices);
    return NextResponse.json(newNotice);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create notice" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const notice: Notice = await request.json();
    const notices = await readNotices();
    const index = notices.findIndex((n) => n.id === notice.id);

    if (index !== -1) {
      notices[index] = {
        ...notice,
        updatedAt: new Date().toISOString(),
      };
      await writeNotices(notices);
      return NextResponse.json(notices[index]);
    }
    return NextResponse.json({ error: "Notice not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update notice" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await deleteNotice(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete notice" }, { status: 500 });
  }
}
