"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { Notice } from "@/types/prisma";

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
          if (line.startsWith("- ")) {
            return (
              <li key={index} className="ml-4 mb-1">
                {line.replace("- ", "")}
              </li>
            );
          }
          if (line.startsWith("---")) {
            return <hr key={index} className="my-6 border-t border-gray-300" />;
          }
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
  const [notices, setNotices] = useState<Notice[]>([]);
  const [expandedNoticeId, setExpandedNoticeId] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch("/api/notices");
        const data = await response.json();
        setNotices(data);
        if (data.length > 0) {
          setExpandedNoticeId(data[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch notices:", error);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">TOPIK 학습 / Изучение TOPIK</h1>

        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">사이트 소개 / О сайте</h2>
          <p className="text-gray-700 mb-2">TOPIK 시험 준비를 위한 한국어 학습 사이트입니다.</p>
          <p className="text-gray-500 text-sm">Сайт для изучения корейского языка и подготовки к экзамену TOPIK.</p>
        </div>

        {notices.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <h2 className="text-xl font-bold p-6 pb-4">공지사항 / Объявления</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <tbody>
                  {notices.map((notice) => (
                    <NoticeRow
                      key={notice.id}
                      notice={notice}
                      isExpanded={expandedNoticeId === notice.id}
                      onToggle={() => setExpandedNoticeId(expandedNoticeId === notice.id ? null : notice.id)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
