"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, Search, Volume2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { DictionaryEntry } from "@/types/dictionary";

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
    const searchResponse = await fetch(`/api/dictionary?page=1&limit=${itemsPerPage}&search=${searchTerm}`);
    const searchData = await searchResponse.json();

    // 검색 결과가 있으면 바로 표시
    if (searchData.words.length > 0) {
      setWords(searchData.words);
      setTotalPages(searchData.pagination.totalPages);
      setIsLoading(false);
      return;
    }

    // 2. 검색 결과가 없으면 새 단어 생성 시도
    try {
      // 러시아어 번역 가져오기
      const translateResponse = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ korean: searchTerm }),
      });
      const translateData = await translateResponse.json();

      if (!translateData.success) {
        console.error("번역 실패:", translateData.error);
        alert("번역에 실패했습니다: " + translateData.error);
        setIsLoading(false);
        return;
      }

      // 새 단어 생성
      const newWord = {
        korean: searchTerm,
        russian: translateData.russian,
        english: "", 
        pronunciation: koreanToEnglish(searchTerm),
        definition: "",
        definition_ru: "",
        category: "기본",
        difficulty: "초급",
        examples: []
      };

      // DB에 저장
      const createResponse = await fetch("/api/dictionary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newWord),
      });

      const result = await createResponse.json();

      if (!result.success) {
        // 이미 존재하는 단어인 경우
        if (result.error === 'Word already exists' && result.existingWord) {
          setWords([result.existingWord]);
          setTotalPages(1);
        } else {
          console.error("단어 생성 실패:", result.error);
          alert("단어 생성에 실패했습니다: " + result.error);
        }
      } else {
        // 성공적으로 생성된 경우
        setWords([result.data]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("단어 생성 중 오류 발생:", error);
      alert("단어 생성 중 오류가 발생했습니다.");
    }
  } catch (error) {
    console.error("검색 중 오류 발생:", error);
    alert("검색 중 오류가 발생했습니다.");
  } finally {
    setIsLoading(false);
  }
};
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    handleSearchClick();
  } else if (e.key === 'Escape') {
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
              pronunciation: word.pronunciation
            }
          }),
        });
      } catch (error) {
        console.error("Error saving statistics:", error);
      }
    }
  };

  // handleReset 함수 추가
  const handleReset = () => {
    setSearchTerm("");
    setCurrentPage(1);
    loadWords(1, "");
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
          <div className="flex gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              placeholder="단어 검색 / Поиск слов"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleSearchClick}
              disabled={isLoading || !searchTerm}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              <span className="hidden sm:inline">검색</span>
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-5 h-5" 
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
              <span className="hidden sm:inline">초기화</span>
            </button>
          </div>
        </div>

        {/* 검색 결과 */}
        {/* 검색 결과는 기존과 동일하게 유지 */}

        {/* 단어 그리드 */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {isLoading ? (
              <div className="col-span-full text-center py-8">로딩 중...</div>
            ) : words.length > 0 ? (
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
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500">
                검색 결과가 없습니다 / Результаты не найдены
              </div>
            )}
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {/* 이전 페이지 버튼 */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white"
              >
                이전
              </button>

              {/* 페이지 번호들 */}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => {
                  // 현재 페이지 주변 2페이지와 첫/마지막 페이지만 표시
                  return page === 1 || 
                         page === totalPages || 
                         Math.abs(currentPage - page) <= 2;
                })
                .map((page, index, array) => {
                  // 생략 부호(...) 표시 로직
                  if (index > 0 && array[index - 1] !== page - 1) {
                    return (
                      <span key={`ellipsis-${page}`} className="px-4 py-2">
                        ...
                      </span>
                    );
                  }
                  
                  return (
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
                  );
                })}

              {/* 다음 페이지 버튼 */}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white"
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
