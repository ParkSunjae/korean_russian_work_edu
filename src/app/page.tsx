"use client";

import { NextResponse } from "next/server";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import type { Statistics } from "@/types/statistics";
import type { Notice } from "@/types/prisma";
import { ChevronDown, ChevronRight } from "lucide-react";

const MENU_ITEMS = [
  {
    id: "exams",
    name: "TOPIK 시험",
    nameRu: "TOPIK ТЕСТ",
    description: "모의고사를 풀어보세요",
    descriptionRu: "Решайте пробные тесты",
    href: "/exams",
  },
  {
    id: "games",
    name: "학습 게임",
    nameRu: "Обучающие игры",
    description: "게임으로 한국어를 배워보세요",
    descriptionRu: "Изучайте корейский через игры",
    href: "/games",
  },
  {
    id: "suggestions",
    name: "건의사항",
    nameRu: "Предложения",
    description: "개선사항을 제안해주세요",
    descriptionRu: "Предложите улучшения",
    href: "/suggestions",
  },
];

interface NoticeRowProps {
  notice: Notice;
  isExpanded: boolean;
  onToggle: () => void;
}

const NoticeRow = ({ notice, isExpanded, onToggle }: NoticeRowProps) => {
  const formatContent = (content: string) => {
    try {
      const formattedContent = content.split("\\n\\n").join("\n").split("\\n").join("\n");

      return formattedContent
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .map((line, index) => {
          // 제목 처리
          if (line.startsWith("# ")) {
            return (
              <h1 key={index} className="text-2xl font-bold mb-4">
                {line.replace("# ", "")}
              </h1>
            );
          }
          if (line.startsWith("## ")) {
            return (
              <h2 key={index} className="text-xl font-bold mt-6 mb-3">
                {line.replace("## ", "")}
              </h2>
            );
          }
          if (line.startsWith("### ")) {
            return (
              <h3 key={index} className="text-lg font-bold mt-4 mb-2">
                {line.replace("### ", "")}
              </h3>
            );
          }

          // 목록 처리
          if (line.startsWith("- ")) {
            return (
              <li key={index} className="ml-4 mb-1">
                {line.replace("- ", "")}
              </li>
            );
          }

          // 구분선 처리
          if (line.startsWith("---")) {
            return <hr key={index} className="my-6 border-t border-gray-300" />;
          }

          // 일반 텍스트
          return (
            <p key={index} className="mb-2">
              {line}
            </p>
          );
        });
    } catch (error) {
      console.error("Error formatting content:", error);
      return <p className="text-gray-800">내용을 표시할 수 없습니다.</p>;
    }
  };

  return (
    <>
      <tr className="hover:bg-gray-50 cursor-pointer transition-colors" onClick={onToggle}>
        <td className="border-b px-4 py-3">
          <div className="flex items-center gap-2">
            {isExpanded ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
            <span className="font-medium">{notice.title}</span>
          </div>
        </td>
        <td className="border-b px-4 py-3 text-gray-500 text-sm">{new Date(notice.createdAt).toLocaleDateString()}</td>
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan={2} className="border-b bg-gray-50">
            <div className="px-6 py-4">
              <div className="bg-white rounded-lg p-6 shadow-sm prose max-w-none">{formatContent(notice.content)}</div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default function HomePage() {
  const router = useRouter();
  const [stats, setStats] = useState<Statistics | null>(null);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedNoticeId, setExpandedNoticeId] = useState<string | null>(null);

  useEffect(() => {
    const initializePage = async () => {
      try {
        // 방문자 수 업데이트
        await fetch("/api/statistics", {
          method: "POST",
          credentials: "include",
        });

        // 통계 데이터 로드
        const [statsRes, noticesRes] = await Promise.all([fetch("/api/statistics"), fetch("/api/notices")]);

        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }

        if (noticesRes.ok) {
          const noticesData = await noticesRes.json();
          setNotices(noticesData.slice(0, 3));
        }
      } catch (error) {
        console.error("Error initializing page:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializePage();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">로딩 중...</div>
          <div className="text-gray-600">Загрузка...</div>
        </div>
      </div>
    );
  }

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
            <h2 className="text-lg md:text-xl font-bold mb-4">공지사항 / Объявления</h2>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">제목 / Заголовок</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 w-32">날짜 / Дата</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {notices.length > 0 ? (
                    notices.map((notice) => (
                      <NoticeRow
                        key={notice.id}
                        notice={notice}
                        isExpanded={expandedNoticeId === notice.id}
                        onToggle={() => setExpandedNoticeId(expandedNoticeId === notice.id ? null : notice.id)}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="px-4 py-3 text-center text-gray-500">
                        공지사항이 없습니다 / Нет объявлений
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
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
                <p className="text-2xl md:text-3xl font-bold text-blue-600">{stats?.totalVisits ? stats.totalVisits.toLocaleString() : "0"}</p>
                <span className="text-gray-500">명</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">마지막 업데이트: {stats?.lastUpdated ? new Date(stats.lastUpdated).toLocaleString("ko-KR") : "-"}</p>
            </div>

            {/* Menu Selection Count Card */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-3">
                메뉴 선택 횟수
                <span className="block text-sm text-gray-600 mt-1">Количество выборов меню</span>
              </h2>
              <div className="space-y-2">
                {stats?.menuStats &&
                  Object.values(stats.menuStats)
                    .filter((menuStat) => menuStat.name !== "home")
                    .map((menuStat) => (
                      <div key={menuStat.name} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded text-sm">
                        <span className="flex-1">
                          {menuStat.menuName} / {menuStat.menuNameRu}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-600">{menuStat.clickCount}</span>
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
                {stats?.wordStats && stats.wordStats.length > 0 ? (
                  stats.wordStats.map((word) => (
                    <div key={word.korean} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded text-sm">
                      <span className="flex-1">
                        {word.korean} ({word.russian})
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-600">{word.listenCount}</span>
                        <span className="text-xs text-gray-500">회</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-2">학습 기록이 없습니다</div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
