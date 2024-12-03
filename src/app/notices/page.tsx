"use client";

import { useState, useEffect } from "react";
import { Notice } from "@/types/notice";
import PageLayout from "@/components/PageLayout";
import { ArrowLeft, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NoticesPage() {
  const router = useRouter();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [viewingNotice, setViewingNotice] = useState<Notice | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch("/api/notices")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch notices");
        return res.json();
      })
      .then(setNotices)
      .catch((error) => {
        console.error("Error fetching notices:", error);
        setNotices([]);
      });
  }, []);

  // 검색 필터링
  const filteredNotices = notices.filter(
    (notice) => notice.title.toLowerCase().includes(searchTerm.toLowerCase()) || notice.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 페이징 처리
  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage);
  const paginatedNotices = filteredNotices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <PageLayout title="공지사항" titleRu="Объявления" showBackButton>
      <div className="space-y-6">
        {!viewingNotice && (
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="제목 또는 내용으로 검색"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <button
              onClick={() => setViewingNotice({ id: "", title: "", content: "", createdAt: "" })}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors whitespace-nowrap"
            >
              공지사항 등록
            </button>
          </div>
        )}

        {viewingNotice ? (
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold">{viewingNotice.title}</h3>
              <div className="text-sm text-gray-500 mt-1">{viewingNotice.createdAt && new Date(viewingNotice.createdAt).toLocaleDateString("ko-KR")}</div>
            </div>
            <div className="min-h-[200px] whitespace-pre-wrap">{viewingNotice.content}</div>
            <div className="flex justify-end">
              <button onClick={() => setViewingNotice(null)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                목록으로
              </button>
            </div>
          </div>
        ) : (
          <>
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
                  {paginatedNotices.map((notice, index) => (
                    <tr key={notice.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 border-b text-sm text-gray-500">{filteredNotices.length - ((currentPage - 1) * itemsPerPage + index)}</td>
                      <td className="px-6 py-4 border-b text-sm">
                        <button onClick={() => setViewingNotice(notice)} className="font-medium text-blue-600 hover:text-blue-800 text-left">
                          {notice.title}
                        </button>
                      </td>
                      <td className="px-6 py-4 border-b text-sm text-gray-500">{notice.createdAt && new Date(notice.createdAt).toLocaleDateString("ko-KR")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 페이징 */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-md ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </PageLayout>
  );
}
