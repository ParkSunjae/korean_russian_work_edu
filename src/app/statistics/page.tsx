"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import type { Statistics } from "@/types/statistics";

export default function StatisticsPage() {
  const [stats, setStats] = useState<Statistics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/statistics/summary");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("통계 데이터를 불러오는데 실패했습니다:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <PageHeader title="사이트 통계 / Статистика сайта" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 방문자 통계 */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-bold mb-4">총 방문자 / Всего посетителей</h2>
            <p className="text-3xl font-bold text-blue-600">{stats?.totalVisits || 0}</p>
            <p className="text-sm text-gray-500 mt-2">마지막 업데이트: {new Date(stats?.lastUpdated || "").toLocaleString()}</p>
          </div>

          {/* 메뉴 통계 */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-bold mb-4">인기 메뉴 / Популярные разделы</h2>
            <div className="space-y-3">
              {Object.values(stats?.menuStats || {})
                .sort((a, b) => b.count - a.count)
                .slice(0, 5)
                .map((menu) => (
                  <div key={menu.menuName} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{menu.menuName}</p>
                      <p className="text-sm text-gray-500">{menu.menuNameRu}</p>
                    </div>
                    <span className="text-blue-600 font-medium">{menu.count}회</span>
                  </div>
                ))}
            </div>
          </div>

          {/* 인기 단어 */}
          <div className="bg-white p-6 rounded-lg shadow-sm border md:col-span-2">
            <h2 className="text-xl font-bold mb-4">자주 듣는 단어 / Часто прослушиваемые слова</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {stats?.wordStats.map((word) => (
                <div key={word.korean} className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-lg font-medium">{word.korean}</p>
                  <p className="text-sm text-gray-600">{word.russian}</p>
                  <p className="text-sm text-blue-600 mt-1">{word.listenCount}회 재생</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
