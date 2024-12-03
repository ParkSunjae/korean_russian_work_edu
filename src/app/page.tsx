"use client";

import { useState, useEffect } from "react";
import { Notice } from "@/types/notice";
import { Statistics } from '@/types/statistics';

export default function Home() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [viewingNotice, setViewingNotice] = useState<Notice | null>(null);
  const [stats, setStats] = useState<Statistics | null>(null);

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

    // 페이지 방문 기록
    fetch('/api/statistics', {
      method: 'POST',
      body: JSON.stringify({ type: 'visit' })
    });

    // 통계 데이터 로드
    fetch('/api/statistics', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  // 메뉴 이름 매핑
  const MENU_NAMES: { [key: string]: { ko: string; ru: string } } = {
    words: { ko: '단어', ru: 'Слова' },
    sentences: { ko: '문장', ru: 'Предложения' },
    games: { ko: '게임', ru: 'Игры' },
    // ... 다른 메뉴들
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 lg:p-8 max-w-7xl mx-auto">
      {/* 헤더 섹션 */}
      <section className="w-full text-center mb-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">
          한국어 학습 플랫폼
          <span className="block text-xl md:text-3xl text-gray-600 mt-2">
            Платформа изучения корейского языка
          </span>
        </h1>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          한글 자음, 모음부터 문장까지 단계별로 학습하세요
          <span className="block mt-1">
            Изучайте корейский язык шаг за шагом
          </span>
        </p>
      </section>

      {/* 공지사항 섹션 */}
      <section className="w-full max-w-4xl mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold mb-4">
            최근 공지사항 / Последние объявления
          </h2>
          {viewingNotice ? (
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold">{viewingNotice.title}</h3>
                <div className="text-sm text-gray-500 mt-1">
                  {viewingNotice.createdAt && new Date(viewingNotice.createdAt).toLocaleDateString("ko-KR")}
                </div>
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
                  <button 
                    onClick={() => setViewingNotice(notice)} 
                    className="w-full text-left group"
                  >
                    <div className="font-medium group-hover:text-blue-600 transition-colors">
                      {notice.title}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {notice.createdAt && new Date(notice.createdAt).toLocaleDateString("ko-KR")}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* 통계 섹션 */}
      <section className="w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 방문자 수 카드 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-3">
              누적 방문자 수
              <span className="block text-sm text-gray-600 mt-1">
                Общее количество посещений
              </span>
            </h2>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl md:text-3xl font-bold text-blue-600">
                {stats?.totalVisits.toLocaleString()}
              </p>
              <span className="text-gray-500">명</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              마지막 업데이트: {stats?.lastUpdated && new Date(stats.lastUpdated).toLocaleString('ko-KR')}
            </p>
          </div>

          {/* 메뉴 선택 횟수 카드 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-3">
              메뉴 선택 횟수
              <span className="block text-sm text-gray-600 mt-1">
                Количество выборов меню
              </span>
            </h2>
            <div className="space-y-2">
              {stats?.menuStats && Object.entries(stats.menuStats)
                .filter(([menuId]) => menuId !== 'home')
                .sort(([,a], [,b]) => b.count - a.count)
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
                ))
              }
            </div>
          </div>

          {/* 자주 학습된 단어 카드 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-3">
              자주 학습된 단어
              <span className="block text-sm text-gray-600 mt-1">
                Часто изучаемые слова
              </span>
            </h2>
            <div className="space-y-2">
              {stats?.wordStats && Object.values(stats.wordStats)
                .sort((a, b) => b.count - a.count)
                .slice(0, 5)
                .map(word => (
                  <div key={word.korean} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded text-sm">
                    <span className="flex-1">
                      {word.korean} ({word.russian})
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-600">{word.count}</span>
                      <span className="text-xs text-gray-500">회</span>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
