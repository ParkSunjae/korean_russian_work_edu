"use client";

import { useState, useEffect } from "react";
import { Notice } from "@/types/notice";
import { Statistics } from "@/types/statistics";
import React from "react";

export default function Home() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [stats, setStats] = useState<Statistics | null>(null);

  useEffect(() => {
    fetch("/api/notices")
      .then((res) => res.json())
      .then((data: Notice[]) => {
        const latestNotices = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3);
        setNotices(latestNotices);
      })
      .catch((error) => console.error("Error fetching notices:", error));

    // Load statistics data
    fetch("/api/statistics")
      .then((res) => res.json())
      .then((data: Statistics) => {
        console.log("통계 데이터:", data); // 데이터 확인용 로그
        setStats(data);
      })
      .catch((error) => console.error("Error fetching statistics:", error));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <section className="w-full text-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold mb-4">
            한국어 학습 플랫폼
            <span className="block text-xl md:text-3xl text-gray-600 mt-2">Платформа изучения корейского языка</span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            한글 자음, 모음부터 문장까지 단계별로 학습하세요
            <span className="block mt-1">Изучайте корейский язык шаг за шагом</span>
          </p>
        </section>

        {/* Recent Notices Section */}
        <section className="w-full max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold mb-4">최근 공지사항 / Последние объявления</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2">제목</th>
                  <th className="py-2">날짜</th>
                </tr>
              </thead>
              <tbody>
                {notices.map((notice) => (
                  <tr key={notice.id}>
                    <td className="border px-4 py-2">{notice.title}</td>
                    <td className="border px-4 py-2">{new Date(notice.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="w-full max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Visitor Count Card */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-3">
                누적 방문자 수<span className="block text-sm text-gray-600 mt-1">Общее количество посещений</span>
              </h2>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl md:text-3xl font-bold text-blue-600">
                  {stats?.totalVisits ? stats.totalVisits.toLocaleString() : '0'}
                </p>
                <span className="text-gray-500">명</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">마지막 업데이트: {stats?.lastUpdated ? new Date(stats.lastUpdated).toLocaleString('ko-KR') : '-'}</p>
            </div>

            {/* Menu Selection Count Card */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-3">
                메뉴 선택 횟수
                <span className="block text-sm text-gray-600 mt-1">Количество выборов меню</span>
              </h2>
              <div className="space-y-2">
                {stats?.menuStats &&
                  Object.entries(stats.menuStats)
                    .filter(([menuId]) => menuId !== "home")
                    .sort(([, a], [, b]) => b.count - a.count)
                    .map(([menuId, menuStat]) => (
                      <div key={menuId} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded text-sm">
                        <span className="flex-1">
                          {menuStat.name} / {menuStat.nameRu}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-600">{menuStat.count}</span>
                          <span className="text-xs text-gray-500">회</span>
                        </div>
                      </div>
                    ))}
              </div>
            </div>

            {/* Frequently Studied Words Card */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-3">
                자주 학습된 단어
                <span className="block text-sm text-gray-600 mt-1">Часто изучаемые слова</span>
              </h2>
              <div className="space-y-2">
                {stats?.wordStats &&
                  stats.wordStats.slice(0, 5).map((word) => (
                    <div key={word.korean} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded text-sm">
                      <span className="flex-1">
                        {word.korean} ({word.russian})
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-600">{word.count}</span>
                        <span className="text-xs text-gray-500">회</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
