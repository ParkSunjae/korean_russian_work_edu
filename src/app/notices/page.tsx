"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Notice } from "@/types/notice";

const ITEMS_PER_PAGE = 10; // 페이지당 항목 수

export default function NoticesPage() {
  const router = useRouter();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [filteredNotices, setFilteredNotices] = useState<Notice[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [viewingNotice, setViewingNotice] = useState<Notice | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // 공지사항 목록 로드
  useEffect(() => {
    fetch("/api/notices")
      .then((res) => res.json())
      .then((data) => {
        const sortedNotices = [...data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setNotices(sortedNotices);
        setFilteredNotices(sortedNotices);
      });
  }, []);

  // 검색어 변경 시 필터링
  useEffect(() => {
    const filtered = notices.filter(
      (notice) => notice.title.toLowerCase().includes(searchTerm.toLowerCase()) || notice.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNotices(filtered);
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  }, [searchTerm, notices]);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredNotices.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedNotices = filteredNotices.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // 페이지 변경 처리
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 공지사항 추가
  const handleAdd = () => {
    const newNotice: Notice = {
      id: "", // ID는 서버에서 생성
      title: "",
      content: "",
      date: new Date().toISOString(),
      createdAt: "",
    };
    setEditingNotice(newNotice);
    setIsEditing(true);
  };

  // 공지사항 수정
  const handleEdit = (notice: Notice) => {
    setEditingNotice(notice);
    setIsEditing(true);
  };

  // 공지사항 삭제
  const handleDelete = async (id: string) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const response = await fetch("/api/notices", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setNotices((prev) => prev.filter((notice) => notice.id !== id));
        setViewingNotice(null);
      }
    }
  };

  // 공지사항 저장
  const handleSave = async (notice: Notice) => {
    if (!notice.title.trim() || !notice.content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const method = notice.id ? "PUT" : "POST";
    const response = await fetch("/api/notices", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(notice),
    });

    if (response.ok) {
      const updatedNotice = await response.json();
      setNotices((prev) => {
        if (method === "PUT") {
          return prev.map((n) => (n.id === updatedNotice.id ? updatedNotice : n));
        }
        return [...prev, updatedNotice];
      });
      setIsEditing(false);
      setEditingNotice(null);
    }
  };

  // 상세 보기 처리
  const handleView = (notice: Notice) => {
    setViewingNotice(notice);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" />
            뒤로 가기
          </button>
          <h2 className="text-2xl font-bold">공지사항</h2>
        </div>
        <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          공지사항 등록
        </button>
      </div>

      {isEditing ? (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <input
            type="text"
            value={editingNotice?.title || ""}
            onChange={(e) => setEditingNotice((prev) => (prev ? { ...prev, title: e.target.value } : null))}
            placeholder="제목을 입력하세요"
            className="w-full p-2 border rounded-md mb-4"
          />
          <textarea
            value={editingNotice?.content || ""}
            onChange={(e) => setEditingNotice((prev) => (prev ? { ...prev, content: e.target.value } : null))}
            placeholder="내용을 입력하세요"
            className="w-full p-2 border rounded-md mb-4 h-32"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setIsEditing(false);
                setEditingNotice(null);
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              취소
            </button>
            <button onClick={() => editingNotice && handleSave(editingNotice)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              저장
            </button>
          </div>
        </div>
      ) : viewingNotice ? (
        // 상세 보기 화면
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="border-b pb-4 mb-4">
            <h3 className="text-xl font-bold mb-2">{viewingNotice.title}</h3>
            <div className="flex justify-between text-sm text-gray-500">
              <span>작성일: {viewingNotice.createdAt ? new Date(viewingNotice.createdAt).toLocaleDateString("ko-KR") : "-"}</span>
              {viewingNotice.updatedAt && <span>수정일: {new Date(viewingNotice.updatedAt).toLocaleDateString("ko-KR")}</span>}
            </div>
          </div>
          <div className="min-h-[200px] whitespace-pre-wrap mb-6">{viewingNotice.content}</div>
          <div className="flex justify-end gap-2">
            <button onClick={() => setViewingNotice(null)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
              목록으로
            </button>
            <button
              onClick={() => {
                handleEdit(viewingNotice);
                setViewingNotice(null);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              수정
            </button>
            <button
              onClick={() => {
                handleDelete(viewingNotice.id);
                setViewingNotice(null);
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              삭제
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* 검색 영역 */}
          <div className="mb-6">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="제목 또는 내용으로 검색"
                  className="w-full pl-10 pr-4 py-2 border rounded-md"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                공지사항 등록
              </button>
            </div>
          </div>

          {/* 테이블 */}
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-600">번호</th>
                  <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-600">제목</th>
                  <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-600">날짜</th>
                  <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-600">관리</th>
                </tr>
              </thead>
              <tbody>
                {paginatedNotices.map((notice, index) => (
                  <tr key={notice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 border-b text-sm text-gray-500">{filteredNotices.length - (startIndex + index)}</td>
                    <td className="px-6 py-4 border-b text-sm">
                      <button onClick={() => handleView(notice)} className="font-medium text-blue-600 hover:text-blue-800 text-left">
                        {notice.title}
                      </button>
                    </td>
                    <td className="px-6 py-4 border-b text-sm text-gray-500">
                      {notice.createdAt ? new Date(notice.createdAt).toLocaleDateString("ko-KR") : "-"}
                    </td>
                    <td className="px-6 py-4 border-b text-sm">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(notice)} className="text-blue-600 hover:text-blue-800">
                          수정
                        </button>
                        <button onClick={() => handleDelete(notice.id)} className="text-red-600 hover:text-red-800">
                          삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 페이지네이션 */}
          <div className="flex justify-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-md ${currentPage === page ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
