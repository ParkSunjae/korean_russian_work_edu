"use client";

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/Button";
import { Card, CardContent } from "@/components/Card";

interface WordType {
  korean: string;
  russian: string;
  pronunciation: string;
}

async function fetchTranslations(korean: string) {
  try {
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ korean }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching translations:", error);
    return {
      russian: "",
      pronunciation: "",
    };
  }
}

const WordsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dictionary, setDictionary] = useState<WordType[]>([]);
  const [filteredWords, setFilteredWords] = useState<WordType[]>([]);
  const [searchResult, setSearchResult] = useState<WordType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  // 사전 데이터 로드
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
    setFilteredWords(dictionary.filter((word) => word.korean.includes(term) || word.russian.includes(term)));
    setCurrentPage(1); // 검색 시 페이지를 첫 페이지로 초기화
  };

  const koreanToEnglish = (text: string): string => {
    const CHOSUNG = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
    const JUNGSUNG = ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"];
    const JONGSUNG = [
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
    ];

    const KOREAN_TO_ENG: { [key: string]: string } = {
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
    };

    let result = "";
    for (let char of text) {
      if (/[가-힣]/.test(char)) {
        const charCode = char.charCodeAt(0) - 0xac00;
        const cho = Math.floor(charCode / (21 * 28));
        const jung = Math.floor((charCode % (21 * 28)) / 28);
        const jong = charCode % 28;

        result += (KOREAN_TO_ENG[CHOSUNG[cho]] || "") + (KOREAN_TO_ENG[JUNGSUNG[jung]] || "") + (jong > 0 ? KOREAN_TO_ENG[JONGSUNG[jong]] || "" : "");
      }
    }
    return result;
  };

  const handleSearchClick = async () => {
    if (!searchTerm) return;

    setIsLoading(true);
    const existingWord = dictionary.find((word) => word.korean === searchTerm);

    if (existingWord) {
      setSearchResult(existingWord);
    } else {
      try {
        const pronunciation = koreanToEnglish(searchTerm);
        const response = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ korean: searchTerm }),
        });

        const data = await response.json();
        const newWord = {
          korean: searchTerm,
          russian: data.russian || "",
          pronunciation: pronunciation,
        };

        setSearchResult(newWord);
      } catch (error) {
        console.error("Error processing word:", error);
      }
    }
    setIsLoading(false);
  };

  const handleAddWord = async () => {
    if (searchResult) {
      const isDuplicate = dictionary.some((word) => word.korean === searchResult.korean);

      if (!isDuplicate) {
        try {
          const response = await fetch("/api/dictionary", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(searchResult),
          });

          if (response.ok) {
            setDictionary([...dictionary, searchResult]);
            setFilteredWords([...dictionary, searchResult]);
            setSearchResult(null);
            setSearchTerm("");
          }
        } catch (error) {
          console.error("Failed to save word:", error);
        }
      }
    }
  };

  const playPronunciation = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  // 페이징 처리
  const totalPages = Math.ceil(filteredWords.length / itemsPerPage);
  const currentWords = filteredWords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <PageLayout title="단어" titleRu="Слова">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardContent>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">단어 검색 / Поиск слов</h2>
              <div className="flex flex-col gap-2">
                <div className="flex gap-4">
                  <input type="text" placeholder="검색 / Поиск" value={searchTerm} onChange={handleSearch} className="flex-1 p-2 border rounded" />
                  <Button onClick={handleSearchClick} disabled={isLoading || !searchTerm} className="bg-blue-500 text-white">
                    {isLoading ? "검색 중..." : <Search className="w-4 h-4" />}
                  </Button>
                </div>
                <div className="text-sm text-gray-500 text-center italic">검색하고 추가하여 학습하세요 / Ищите, добавляйте и учите</div>
              </div>
            </div>

            {searchResult && (
              <div className="mb-6 bg-white p-4 rounded-lg shadow">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="font-semibold">한국어:</span> {searchResult.korean}
                  </div>
                  <div>
                    <span className="font-semibold">러시아어:</span> {searchResult.russian}
                  </div>
                  <div>
                    <span className="font-semibold">발음:</span> {searchResult.pronunciation}
                    <button onClick={() => playPronunciation(searchResult.pronunciation)} className="ml-2 text-blue-500 hover:text-blue-700">
                      🔊
                    </button>
                  </div>
                </div>
                <Button onClick={handleAddWord} className="w-full bg-green-500 text-white">
                  단어 추가하기 / Добавить слово
                </Button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {currentWords.map((word, index) => (
                <Card key={index} className="bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold text-blue-600">{word.korean}</span>
                      <button onClick={() => playPronunciation(word.pronunciation)} className="text-blue-500 hover:text-blue-700 p-2">
                        🔊
                      </button>
                    </div>
                    <div className="space-y-2">
                      <div className="text-lg text-gray-700">{word.russian}</div>
                      <div className="text-sm text-gray-500">{word.pronunciation}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPage === page ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default WordsPage;
