"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, Search, Volume, Volume2 } from "lucide-react";
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

// 단어 카드 컴포넌트
const WordCard = ({ word, onPlayPronunciation }: { word: DictionaryEntry; onPlayPronunciation: (word: DictionaryEntry, lang: "ko" | "ru") => void }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      {word.category && (
        <div className="mb-2">
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">{word.category}</span>
          {word.subcategory && <span className="ml-2 text-xs font-medium text-gray-600 bg-gray-50 px-2 py-1 rounded">{word.subcategory}</span>}
        </div>
      )}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{word.korean}</h3>
          <p className="text-sm text-gray-600">{word.russian}</p>
          {word.pronunciation && <p className="text-xs text-gray-500 mt-1">[{word.pronunciation}]</p>}
        </div>
        <div className="flex gap-2">
          <button onClick={() => onPlayPronunciation(word, "ko")} className="text-blue-600 hover:text-blue-800" title="한국어 발음">
            <Volume className="w-5 h-5" />
          </button>
          <button onClick={() => onPlayPronunciation(word, "ru")} className="text-blue-600 hover:text-blue-800" title="러시아어 발음">
            <Volume2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 30, 50, 100];

export default function WordsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [words, setWords] = useState<DictionaryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState<{ [key: string]: string[] }>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");

  const loadWords = useCallback(async (page: number, search: string = "", category: string = "", subcategory: string = "") => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/dictionary?page=${page}&limit=${itemsPerPage}&search=${search}&category=${category}&subcategory=${subcategory}`);
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
    loadWords(currentPage, searchTerm, selectedCategory, selectedSubcategory);
  }, [currentPage, loadWords, searchTerm, selectedCategory, selectedSubcategory]);

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
    setCurrentPage(1);
    loadWords(1, searchTerm, selectedCategory, selectedSubcategory);
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
        await fetch("/api/word-stats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            korean: word.korean,
            russian: word.russian,
            pronunciation: word.pronunciation,
          }),
        });
      } catch (error) {
        console.error("Failed to update word stats:", error);
      }
    }
  };

  // 초기화 함수
  const handleReset = () => {
    setSearchTerm("");
    setCurrentPage(1);
    loadWords(1, "", selectedCategory, selectedSubcategory);
  };

  const handleInitializeWords = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/words", {
        method: "POST",
      });
      const data = await response.json();

      if (response.ok) {
        setMessage(`성공: ${data.addedCount}개 추가, ${data.updatedCount}개 업데이트됨`);
      } else {
        setMessage(`오류: ${data.error}`);
      }
    } catch (error) {
      console.error("Error initializing words:", error);
      setMessage("단어 초기화 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 카테고리 데이터 로드
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch("/api/words/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };
    loadCategories();
  }, []);

  // 페이지 번호 생성
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // 전체 페이지가 5페이지 이하인 경우
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // 전체 페이지가 5페이지 초과인 경우
      if (currentPage <= 3) {
        // 현재 페이지가 앞쪽인 경우
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // 현재 페이지가 뒤쪽인 경우
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // 현재 페이지가 중간인 경우
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <PageHeader title="단어 목록" />
          {/* <button
            onClick={handleInitializeWords}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            {isLoading ? "처리 중..." : "TOPIK I 단어 초기화"}
          </button> */}
        </div>

        {message && <div className={`mb-4 p-3 rounded ${message.includes("오류") ? "bg-red-100" : "bg-green-100"}`}>{message}</div>}

        {/* 검색 섹션 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
                placeholder="단어 검색 / Поиск слов"
                className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
              />
              <button onClick={handleSearchClick} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                검색
              </button>
              <button onClick={handleReset} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                초기화
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mt-2">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedSubcategory("");
              }}
              className="w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">모든 카테고리 / Все категории</option>
              {Object.keys(categories).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
              disabled={!selectedCategory}
              className="w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
            >
              <option value="">모든 하위 카테고리 / Все подкатегории</option>
              {selectedCategory &&
                categories[selectedCategory]?.map((subcategory) => (
                  <option key={subcategory} value={subcategory}>
                    {subcategory}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* 단어 그리드 */}
        <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {isLoading ? (
              <div className="col-span-full text-center py-6 sm:py-8">로딩 중...</div>
            ) : words.length > 0 ? (
              words.map((word) => <WordCard key={word.id} word={word} onPlayPronunciation={handlePlayPronunciation} />)
            ) : (
              <div className="col-span-full text-center py-6 sm:py-8 text-gray-500 text-sm sm:text-base">검색 결과가 없습니다 / Результаты не найдены</div>
            )}
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-6 sm:mt-8">
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                  loadWords(1, searchTerm, selectedCategory, selectedSubcategory);
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}개씩 보기
                  </option>
                ))}
              </select>

              <div className="flex gap-1.5 sm:gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white"
                >
                  이전
                </button>

                {getPageNumbers().map((pageNum, index) => (
                  <button
                    key={index}
                    onClick={() => typeof pageNum === "number" && setCurrentPage(pageNum)}
                    disabled={pageNum === "..."}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg ${
                      pageNum === currentPage
                        ? "bg-blue-600 text-white"
                        : pageNum === "..."
                        ? "bg-white text-gray-400"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white"
                >
                  다음
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
