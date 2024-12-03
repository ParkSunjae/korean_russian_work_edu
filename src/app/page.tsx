"use client";

import { useState, useEffect } from "react";
import { Notice } from "@/types/notice";

export default function Home() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [viewingNotice, setViewingNotice] = useState<Notice | null>(null);

  useEffect(() => {
    fetch("/api/notices")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch notices");
        return res.json();
      })
      .then((data) => {
        const latestNotices = [...data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3);
        setNotices(latestNotices);
      })
      .catch((error) => {
        console.error("Error fetching notices:", error);
        setNotices([]);
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-4 lg:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
        한국어 학습 플랫폼 | <span className="text-gray-600">Платформа изучения корейского языка</span>
      </h1>
      <p className="text-lg text-gray-600 text-center max-w-2xl mb-12">
        한글 자음, 모음부터 문장까지 단계별로 학습하세요 | Изучайте корейский язык шаг за шагом
      </p>

      <div className="w-full max-w-4xl bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">최근 공지사항 | Последние объявления</h2>
        {viewingNotice ? (
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold">{viewingNotice.title}</h3>
              <div className="text-sm text-gray-500 mt-1">{viewingNotice.createdAt && new Date(viewingNotice.createdAt).toLocaleDateString("ko-KR")}</div>
            </div>
            <div className="min-h-[100px] whitespace-pre-wrap">{viewingNotice.content}</div>
            <button
              onClick={() => setViewingNotice(null)}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              목록으로
            </button>
          </div>
        ) : (
          <ul className="divide-y">
            {notices.map((notice) => (
              <li key={notice.id} className="py-3">
                <button onClick={() => setViewingNotice(notice)} className="w-full text-left group">
                  <div className="font-medium group-hover:text-blue-600 transition-colors">{notice.title}</div>
                  <div className="text-sm text-gray-500 mt-1">{notice.createdAt && new Date(notice.createdAt).toLocaleDateString("ko-KR")}</div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
