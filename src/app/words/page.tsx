"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, Search, Volume2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { DictionaryEntry } from "@/types/dictionary";
import PageHeader from "@/components/layout/PageHeader";

// 한글 자음과 모음 매핑
const KOREAN_CHARS = {
  CONSONANTS: ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"],
  VOWELS: ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"],
  FINAL_CONSONANTS: [
    "",
    "ㄱ",
    "ㄲ",
    "ㄳ",
    "ㄴ",
    "ㄵ",
    "ㄶ",
    "ㄷ",
    "ㄹ",
    "ㄺ",
    "ㄻ",
    "ㄼ",
    "ㄽ",
    "ㄾ",
    "ㄿ",
    "ㅀ",
    "ㅁ",
    "ㅂ",
    "ㅄ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ],
};

type KoreanChar = "ㄱ" | "ㄲ" | "ㄴ" | "ㄷ" | "ㄸ" | "ㄹ" | "ㅁ" | "ㅂ" | "ㅃ" | "ㅅ" | "ㅆ" | "ㅇ" | "ㅈ" | "ㅉ" | "ㅊ" | "ㅋ" | "ㅌ" | "ㅍ" | "ㅎ";
type KoreanVowel =
  | "ㅏ"
  | "ㅐ"
  | "ㅑ"
  | "ㅒ"
  | "ㅓ"
  | "ㅔ"
  | "ㅕ"
  | "ㅖ"
  | "ㅗ"
  | "ㅘ"
  | "ㅙ"
  | "ㅚ"
  | "ㅛ"
  | "ㅜ"
  | "ㅝ"
  | "ㅞ"
  | "ㅟ"
  | "ㅠ"
  | "ㅡ"
  | "ㅢ"
  | "ㅣ";
type KoreanFinal =
  | ""
  | "ㄱ"
  | "ㄲ"
  | "ㄳ"
  | "ㄴ"
  | "ㄵ"
  | "ㄶ"
  | "ㄷ"
  | "ㄹ"
  | "ㄺ"
  | "ㄻ"
  | "ㄼ"
  | "ㄽ"
  | "ㄾ"
  | "ㄿ"
  | "ㅀ"
  | "ㅁ"
  | "ㅂ"
  | "ㅄ"
  | "ㅅ"
  | "ㅆ"
  | "ㅇ"
  | "ㅈ"
  | "ㅊ"
  | "ㅋ"
  | "ㅌ"
  | "ㅍ"
  | "ㅎ";

const ROMANIZATION: {
  CONSONANTS: Record<KoreanChar, string>;
  VOWELS: Record<KoreanVowel, string>;
  FINAL_CONSONANTS: Record<KoreanFinal, string>;
} = {
  // 초성
  CONSONANTS: {
    ㄱ: "g",
    ㄲ: "kk",
    ㄴ: "n",
    ㄷ: "d",
    ㄸ: "tt",
    ㄹ: "r",
    ㅁ: "m",
    ㅂ: "b",
    ㅃ: "pp",
    ㅅ: "s",
    ㅆ: "ss",
    ㅇ: "",
    ㅈ: "j",
    ㅉ: "jj",
    ㅊ: "ch",
    ㅋ: "k",
    ㅌ: "t",
    ㅍ: "p",
    ㅎ: "h",
  },
  // 중성
  VOWELS: {
    ㅏ: "a",
    ㅐ: "ae",
    ㅑ: "ya",
    ㅒ: "yae",
    ㅓ: "eo",
    ㅔ: "e",
    ㅕ: "yeo",
    ㅖ: "ye",
    ㅗ: "o",
    ㅘ: "wa",
    ㅙ: "wae",
    ㅚ: "oe",
    ㅛ: "yo",
    ㅜ: "u",
    ㅝ: "wo",
    ㅞ: "we",
    ㅟ: "wi",
    ㅠ: "yu",
    ㅡ: "eu",
    ㅢ: "ui",
    ㅣ: "i",
  },
  // 종성
  FINAL_CONSONANTS: {
    "": "",
    ㄱ: "k",
    ㄲ: "k",
    ㄳ: "k",
    ㄴ: "n",
    ㄵ: "n",
    ㄶ: "n",
    ㄷ: "t",
    ㄹ: "l",
    ㄺ: "k",
    ㄻ: "m",
    ㄼ: "l",
    ㄽ: "l",
    ㄾ: "l",
    ㄿ: "p",
    ㅀ: "l",
    ㅁ: "m",
    ㅂ: "p",
    ㅄ: "p",
    ㅅ: "t",
    ㅆ: "t",
    ㅇ: "ng",
    ㅈ: "t",
    ㅊ: "t",
    ㅋ: "k",
    ㅌ: "t",
    ㅍ: "p",
    ㅎ: "t",
  },
};
export default function WordsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [words, setWords] = useState<DictionaryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 30;

  const loadWords = useCallback(async (page: number, search: string = "") => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/dictionary?page=${page}&limit=${itemsPerPage}&search=${search}`);
      if (!response.ok) {
        throw new Error("Failed to fetch dictionary");
      }
      const data = await response.json();
      setWords(data.words || []);
      setTotalPages(data.pagination?.totalPages || 0);
    } catch (error) {
      console.error("Failed to load dictionary:", error);
      setWords([]);
      setTotalPages(0);
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
  };
  function koreanToEnglish(text: string): string {
    const result: string[] = [];

    for (const char of text) {
      // 한글이 아닌 경우 그대로 추가
      if (!/[가-힣]/.test(char)) {
        result.push(char);
        continue;
      }

      // 한글 유니코드 분해
      const charCode = char.charCodeAt(0) - 0xac00;

      // 초성, 중성, 종성 인덱스 계산
      const initialIndex = Math.floor(charCode / (21 * 28));
      const vowelIndex = Math.floor((charCode % (21 * 28)) / 28);
      const finalIndex = charCode % 28;

      // 각 자소를 가져옴
      const initial = KOREAN_CHARS.CONSONANTS[initialIndex];
      const vowel = KOREAN_CHARS.VOWELS[vowelIndex];
      const final = KOREAN_CHARS.FINAL_CONSONANTS[finalIndex];

      // 영문으로 변환
      const initialRoman = ROMANIZATION.CONSONANTS[initial as KoreanChar] || "";
      const vowelRoman = ROMANIZATION.VOWELS[vowel as KoreanVowel] || "";
      const finalRoman = final ? ROMANIZATION.FINAL_CONSONANTS[final as KoreanFinal] || "" : "";

      result.push(initialRoman + vowelRoman + finalRoman);
    }

    return result.join("");
  }
  // 검색 버튼 클릭 시 검색 실행
  const handleSearchClick = async () => {
    if (!searchTerm) return;
    setIsLoading(true);

    try {
      // 1. 기존 단어 검색
      const normalizedSearch = searchTerm.trim().toLowerCase();
      const searchResponse = await fetch(`/api/dictionary?search=${normalizedSearch}`);

      if (!searchResponse.ok) {
        throw new Error("Failed to search dictionary");
      }

      const searchData = await searchResponse.json();

      // 검색 결과가 있으면 표시
      if (searchData.words && searchData.words.length > 0) {
        setWords(searchData.words);
        setTotalPages(searchData.pagination?.totalPages || 1);
        setIsLoading(false);
        return;
      }

      // 2. 검색 결과가 없는 경우 새 단어 생성 시도
      const translateResponse = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ korean: normalizedSearch }),
      });

      const translateData = await translateResponse.json();

      if (!translateData.success) {
        throw new Error(translateData.error || "Translation failed");
      }

      // 3. 단어 생성 시도
      const createResponse = await fetch("/api/dictionary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          korean: normalizedSearch,
          russian: translateData.russian,
          pronunciation: koreanToEnglish(normalizedSearch),
        }),
      });

      const result = await createResponse.json();

      if (result.success) {
        setWords([result.data]);
        setTotalPages(1);
      } else {
        // 이미 존재하는 단어인 경우
        if (result.error === "Word already exists" && result.data) {
          setWords([result.data]);
          setTotalPages(1);
        } else {
          throw new Error(result.error || "Failed to create word");
        }
      }
    } catch (error) {
      console.error("Error during search/create:", error);
      alert(error instanceof Error ? error.message : "처리 중 오류가 발생했습니다.");
      setWords([]);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  };

  // Enter 키로 검색 실행
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick();
    } else if (e.key === "Escape") {
      handleReset();
    }
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
              pronunciation: word.pronunciation,
            },
          }),
        });
      } catch (error) {
        console.error("Error saving statistics:", error);
      }
    }
  };

  // 초기화 함수
  const handleReset = () => {
    setSearchTerm("");
    setCurrentPage(1);
    loadWords(1, "");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <PageHeader title="단어 목록" />
        {/* 검색 섹션 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              placeholder="단어 검색 / Поиск слов"
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
            />
            <div className="flex gap-2 shrink-0">
              <button
                onClick={handleSearchClick}
                disabled={isLoading || !searchTerm}
                className="w-full sm:w-24 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Search className="w-4 h-4" />
                <span>검색</span>
              </button>
              <button
                onClick={handleReset}
                className="w-full sm:w-24 px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                  <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                  <path d="M16 21h5v-5" />
                </svg>
                <span>초기화</span>
              </button>
            </div>
          </div>
        </div>

        {/* 단어 그리드 */}
        <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {isLoading ? (
              <div className="col-span-full text-center py-6 sm:py-8">로딩 중...</div>
            ) : words.length > 0 ? (
              words.map((word) => (
                <div key={word.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200">
                  <div className="p-3 sm:p-4">
                    <div className="flex justify-between items-start mb-2 sm:mb-3">
                      <div className="text-lg sm:text-xl font-bold text-indigo-600">{word.korean}</div>
                      <div className="flex gap-1.5 sm:gap-2">
                        <button onClick={() => handlePlayPronunciation(word, "ko")} className="p-1 sm:p-1.5 rounded-full bg-indigo-50 hover:bg-indigo-100">
                          <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                        <span className="text-sm sm:text-base text-gray-900">{word.russian}</span>
                        <button onClick={() => handlePlayPronunciation(word, "ru")} className="p-1 sm:p-1.5 rounded-full bg-indigo-50 hover:bg-indigo-100">
                          <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" />
                        </button>
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500">{word.pronunciation}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-6 sm:py-8 text-gray-500 text-sm sm:text-base">검색 결과가 없습니다 / Результаты не найдены</div>
            )}
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white"
              >
                이전
              </button>
              {/* ... 페이지 번호 버튼들은 동일하게 유지 ... */}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white"
              >
                다음
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
