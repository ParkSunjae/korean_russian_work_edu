import { NextResponse } from 'next/server'
import { readNotices, writeNotices, deleteNotice } from '@/utils/notices'
import { Notice } from '@/types/notice'

export async function GET() {
  const notices = await readNotices()
  return NextResponse.json(notices)
}

export async function POST(request: Request) {
  const notice: Notice = await request.json()
  const notices = await readNotices()
  notice.id = (notices.length + 1).toString()
  notice.createdAt = new Date().toISOString()
  notices.push(notice)
  await writeNotices(notices)
  return NextResponse.json(notice)
}

export async function PUT(request: Request) {
  const notice: Notice = await request.json()
  const notices = await readNotices()
  const index = notices.findIndex(n => n.id === notice.id)
  if (index !== -1) {
    notices[index] = { ...notice, updatedAt: new Date().toISOString() }
    await writeNotices(notices)
    return NextResponse.json(notices[index])
  }
  return NextResponse.json({ error: 'Notice not found' }, { status: 404 })
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  await deleteNotice(id)
  return NextResponse.json({ success: true })
} 