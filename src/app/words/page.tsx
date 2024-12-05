"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, Search, Volume2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { DictionaryEntry } from "@/types/dictionary";

export default function WordsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [words, setWords] = useState<DictionaryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 20;

  const loadWords = useCallback(async (page: number, search: string = "") => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/dictionary?page=${page}&limit=${itemsPerPage}&search=${search}`
      );
      const data = await response.json();
      setWords(data.words);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error("Failed to load dictionary:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWords(currentPage);
  }, [currentPage, loadWords]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    setCurrentPage(1);
    loadWords(1, term);
  };

  const handleSearchClick = () => {
    if (!searchTerm) return;
    setCurrentPage(1);
    loadWords(1, searchTerm);
  };

  const handlePlayPronunciation = async (word: DictionaryEntry, language: "ko" | "ru") => {
    const text = language === "ko" ? word.korean : word.russian;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === "ko" ? "ko-KR" : "ru-RU";
    speechSynthesis.speak(utterance);

    if (language === "ko") {
      try {
        await fetch("/api/statistics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "word",
            data: {
              korean: word.korean,
              russian: word.russian,
              pronunciation: word.pronunciation
            }
          }),
        });
      } catch (error) {
        console.error("Error saving statistics:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-[1400px] mx-auto px-4">
        {/* 헤더 섹션 */}
        <div className="mb-6">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-3 transition-colors duration-200">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">뒤로 가기</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">단어</h1>
          <p className="mt-2 text-gray-600">단어를 검색하고 추가하여 학습하세요.</p>
          <p className="mt-1 text-gray-500">Ищите, добавляйте и учите слова.</p>
        </div>

        {/* 검색 섹션 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex gap-4 mb-3">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="단어 검색 / Поиск слов"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleSearchClick}
              disabled={isLoading || !searchTerm}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              {isLoading ? "검색 중..." : <Search className="w-5 h-5" />}
            </button>
          </div>

          {/* 검색 결과 */}
          {/* 검색 결과는 기존과 동일하게 유지 */}
        </div>

        {/* 단어 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {isLoading ? (
            <div>로딩 중...</div>
          ) : (
            words.map((word) => (
              <div
                key={word.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-xl font-bold text-indigo-600">{word.korean}</div>
                    <div className="flex gap-2">
                      <button onClick={() => handlePlayPronunciation(word, "ko")} className="p-1.5 rounded-full bg-indigo-50 hover:bg-indigo-100">
                        <Volume2 className="w-4 h-4 text-indigo-600" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-900">{word.russian}</span>
                      <button onClick={() => handlePlayPronunciation(word, "ru")} className="p-1.5 rounded-full bg-indigo-50 hover:bg-indigo-100">
                        <Volume2 className="w-4 h-4 text-indigo-600" />
                      </button>
                    </div>
                    <div className="text-sm text-gray-500">{word.pronunciation}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === page
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
