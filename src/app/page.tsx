'use client'

import { useState, useEffect } from 'react'
import { Notice } from '@/types/notice'
import Link from 'next/link'

export default function Home() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [viewingNotice, setViewingNotice] = useState<Notice | null>(null)

  useEffect(() => {
    fetch('/api/notices')
      .then(res => res.json())
      .then(data => {
        // 최신 3개만 필터링
        const latestNotices = [...data]
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 3)
        setNotices(latestNotices)
      })
  }, [])

  return (
    <div className="max-w-4xl mx-auto">
      {viewingNotice ? (
        // 상세 보기 화면
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="border-b pb-4 mb-4">
            <h3 className="text-xl font-bold mb-2">{viewingNotice.title}</h3>
            <div className="flex justify-between text-sm text-gray-500">
              <span>작성일: {new Date(viewingNotice.createdAt).toLocaleDateString('ko-KR')}</span>
              {viewingNotice.updatedAt && (
                <span>수정일: {new Date(viewingNotice.updatedAt).toLocaleDateString('ko-KR')}</span>
              )}
            </div>
          </div>
          <div className="min-h-[200px] whitespace-pre-wrap mb-6">
            {viewingNotice.content}
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setViewingNotice(null)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              목록으로
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">공지사항</h2>
            <Link 
              href="/notices" 
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              더보기
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-600">번호</th>
                  <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-600">제목</th>
                  <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-600">날짜</th>
                </tr>
              </thead>
              <tbody>
                {notices.map((notice, index) => (
                  <tr key={notice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 border-b text-sm text-gray-500">
                      {notices.length - index}
                    </td>
                    <td className="px-6 py-4 border-b text-sm">
                      <button
                        onClick={() => setViewingNotice(notice)}
                        className="font-medium text-blue-600 hover:text-blue-800 text-left"
                      >
                        {notice.title}
                      </button>
                    </td>
                    <td className="px-6 py-4 border-b text-sm text-gray-500">
                      {new Date(notice.createdAt).toLocaleDateString('ko-KR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}