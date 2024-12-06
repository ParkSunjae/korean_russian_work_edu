"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Volume2, Plus } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import type { Sentence } from "@/types/prisma";

export default function SentencesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const loadSentences = useCallback(async (page: number, search: string = "") => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/sentence?page=${page}&limit=20&search=${search}`);
      if (!response.ok) throw new Error("Failed to fetch sentences");
      const data = await response.json();
      setSentences(data.sentences || []);
      setTotalPages(data.pagination?.totalPages || 0);
    } catch (error) {
      console.error("Failed to load sentences:", error);
      setSentences([]);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSentences(currentPage);
  }, [currentPage, loadSentences]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePlayPronunciation = async (sentence: Sentence, language: "ko" | "ru") => {
    const text = language === "ko" ? sentence.korean : sentence.russian;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === "ko" ? "ko-KR" : "ru-RU";
    speechSynthesis.speak(utterance);
  };

  const handleSearchClick = async () => {
    if (!searchTerm) return;
    setIsLoading(true);

    try {
      const normalizedSearch = searchTerm.trim().toLowerCase();
      const searchResponse = await fetch(`/api/sentence?search=${normalizedSearch}`);
      if (!searchResponse.ok) throw new Error("Failed to search sentences");

      const searchData = await searchResponse.json();
      setSentences(searchData.sentences || []);
      setTotalPages(searchData.pagination?.totalPages || 1);
    } catch (error) {
      console.error("Error during search:", error);
      alert(error instanceof Error ? error.message : "처리 중 오류가 발생했습니다.");
      setSentences([]);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick();
    } else if (e.key === "Escape") {
      handleReset();
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    setCurrentPage(1);
    loadSentences(1, "");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <PageHeader title="문장 목록" />
          <button
            onClick={() => (window.location.href = "/sentences/new")}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>새 문장</span>
          </button>
        </div>

        {/* 검색 섹션 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              placeholder="문장 검색 / Поиск предложений"
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex gap-2 shrink-0">
              <button
                onClick={handleSearchClick}
                disabled={isLoading || !searchTerm}
                className="w-full sm:w-24 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>검색</span>
              </button>
              <button onClick={handleReset} className="w-full sm:w-24 px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                초기화
              </button>
            </div>
          </div>
        </div>

        {/* 문장 그리드 */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">로딩 중...</div>
          ) : sentences.length > 0 ? (
            sentences.map((sentence) => (
              <div key={sentence.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="text-lg font-medium text-gray-900">{sentence.korean}</div>
                    <button onClick={() => handlePlayPronunciation(sentence, "ko")} className="p-2 rounded-full hover:bg-gray-100">
                      <Volume2 className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  <div className="flex justify-between items-start">
                    <div className="text-base text-gray-700">{sentence.russian}</div>
                    <button onClick={() => handlePlayPronunciation(sentence, "ru")} className="p-2 rounded-full hover:bg-gray-100">
                      <Volume2 className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  {sentence.pronunciation && <div className="text-sm text-gray-500">{sentence.pronunciation}</div>}
                  {(sentence.koreanDesc || sentence.russianDesc) && (
                    <div className="pt-2 border-t">
                      {sentence.koreanDesc && <div className="text-sm text-gray-600">{sentence.koreanDesc}</div>}
                      {sentence.russianDesc && <div className="text-sm text-gray-600 mt-1">{sentence.russianDesc}</div>}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">검색 결과가 없습니다</div>
          )}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm rounded-lg bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50"
            >
              이전
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm rounded-lg bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50"
            >
              다음
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
