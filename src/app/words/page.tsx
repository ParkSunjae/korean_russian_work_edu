"use client";

import { Volume2, ArrowLeft, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface WordType {
  korean: string;
  russian: string;
  pronunciation: string;
}

export default function WordsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [dictionary, setDictionary] = useState<WordType[]>([]);
  const [filteredWords, setFilteredWords] = useState<WordType[]>([]);
  const [searchResult, setSearchResult] = useState<WordType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const response = await fetch("/api/dictionary");
        const data = await response.json();
        setDictionary(data.words);
        setFilteredWords(data.words);
      } catch (error) {
        console.error("Failed to load dictionary:", error);
      }
    };
    loadDictionary();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredWords(dictionary.filter((word) => word.korean.toLowerCase().includes(term) || word.russian.toLowerCase().includes(term)));
    setCurrentPage(1);
  };

  const handleSearchClick = async () => {
    if (!searchTerm) return;
    setIsLoading(true);

    const existingWord = dictionary.find((word) => word.korean === searchTerm);
    if (existingWord) {
      setSearchResult(existingWord);
    } else {
      try {
        // 1. 한글->영문 발음 생성
        const koreanToEngResponse = await fetch("/api/translate/korean-to-eng", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ korean: searchTerm }),
        });

        const engData = await koreanToEngResponse.json();
        console.log("영문 발음 데이터:", engData);

        // 2. 러시아어 번역 가져오기
        const response = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ korean: searchTerm }),
        });

        const data = await response.json();
        console.log("러시아어 번역 데이터:", data);

        // 3. 검색 결과 설정
        const newWord = {
          korean: searchTerm,
          russian: data.russian || "",
          pronunciation: engData.pronunciation || data.pronunciation || "", // 발음 우선순위 설정
        };

        console.log("최종 생성된 단어 데이터:", newWord);
        setSearchResult(newWord);
      } catch (error) {
        console.error("Error processing word:", error);
      }
    }
    setIsLoading(false);
  };

  const handleAddWord = async () => {
    if (searchResult) {
      try {
        let wordToSave = { ...searchResult };

        // pronunciation이 비어있는 경우 한글->영문 변환 수행
        if (!wordToSave.pronunciation) {
          const koreanToEngResponse = await fetch("/api/translate/korean-to-eng", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ korean: wordToSave.korean }),
          });

          const engData = await koreanToEngResponse.json();
          wordToSave.pronunciation = engData.pronunciation;
        }

        console.log("저장할 단어 데이터:", wordToSave);

        const response = await fetch("/api/dictionary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(wordToSave),
        });

        if (response.ok) {
          setDictionary([...dictionary, wordToSave]);
          setFilteredWords([...dictionary, wordToSave]);
          setSearchResult(null);
          setSearchTerm("");
        }
      } catch (error) {
        console.error("Failed to save word:", error);
      }
    }
  };

  const handlePlayPronunciation = async (word: WordType, language: "ko" | "ru") => {
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
            data: word,
          }),
        });
      } catch (error) {
        console.error("Error saving statistics:", error);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const totalPages = Math.ceil(filteredWords.length / itemsPerPage);
  const currentWords = filteredWords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
              onKeyPress={handleKeyPress}
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
          {searchResult && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">한국어:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium">{searchResult.korean}</span>
                    <button onClick={() => handlePlayPronunciation(searchResult, "ko")} className="p-1.5 rounded-full bg-indigo-50 hover:bg-indigo-100">
                      <Volume2 className="w-4 h-4 text-indigo-600" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">러시아어:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium">{searchResult.russian}</span>
                    <button onClick={() => handlePlayPronunciation(searchResult, "ru")} className="p-1.5 rounded-full bg-indigo-50 hover:bg-indigo-100">
                      <Volume2 className="w-4 h-4 text-indigo-600" />
                    </button>
                  </div>
                </div>
              </div>
              <button onClick={handleAddWord} className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                단어 추가하기 / Добавить слово
              </button>
            </div>
          )}
        </div>

        {/* 단어 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {currentWords.map((word, index) => (
            <div
              key={index}
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
          ))}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === page ? "bg-indigo-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
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
