"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Select } from "@/components/Select";
import { Button } from "@/components/Button";
import { Volume2 } from "lucide-react";
import { DictionaryEntry } from "@/types/dictionary";
import { koreanDictionary } from "@/utils/dictionary";

interface DictionaryState {
  dictionary: DictionaryEntry[];
  categories: string[];
  difficulties: string[];
}

const KoreanDictionary = () => {
  const [dictionary, setDictionary] = useState<DictionaryEntry[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [difficulties, setDifficulties] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setDictionary(koreanDictionary);
    setCategories(["all", ...Array.from(new Set(koreanDictionary.map((word) => word.category)))]);
    setDifficulties(["all", ...Array.from(new Set(koreanDictionary.map((word) => word.difficulty)))]);
    setIsLoading(false);
  }, []);

  // 발음 재생 함수
  const speakText = (text: string, lang: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.8;

      utterance.onerror = (event) => {
        console.error("Speech synthesis error:", event);
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  const playPronunciation = (word: DictionaryEntry, language: "ko" | "en" | "ru") => {
    switch (language) {
      case "ko":
        speakText(word.korean, "ko-KR");
        break;
      case "en":
        speakText(word.english, "en-US");
        break;
      case "ru":
        speakText(word.russian, "ru-RU");
        break;
    }
  };

  const handlePlayPronunciation = async (word: DictionaryEntry, language: "ko" | "en" | "ru") => {
    // 발음 재생
    playPronunciation(word, language);

    // 통계 저장 (한국어 발음 버튼 클릭 시에만)
    if (language === "ko") {
      try {
        const wordData = {
          korean: word.korean,
          russian: word.russian,
          pronunciation: word.pronunciation,
        };

        console.log("저장할 단어 데이터:", wordData);

        const response = await fetch("/api/statistics", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "word",
            data: wordData,
          }),
        });

        const result = await response.json();
        if (!result.success) {
          console.error("Failed to save word statistics:", result.error);
        } else {
          console.log("단어 통계 저장 성공:", result.data);
        }
      } catch (error) {
        console.error("Failed to update word statistics:", error);
      }
    }
  };

  const filteredWords = dictionary.filter(
    (word) =>
      (word.korean.includes(searchTerm) ||
        word.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.russian.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "all" || word.category === selectedCategory) &&
      (selectedDifficulty === "all" || word.difficulty === selectedDifficulty)
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>사전을 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>한국어 단어 사전 | Корейско-русский словарь</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 space-y-2">
            <Input placeholder="단어 검색 (한국어, 영어, 러시아어)" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

            <div className="flex space-x-2 z-auto">
              <Select
                label="카테고리"
                options={[
                  { value: "all", label: "전체 카테고리" },
                  ...categories.map((category) => ({
                    value: category,
                    label: category,
                  })),
                ]}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              />

              <Select
                label="난이도"
                options={[
                  { value: "all", label: "전체 난이도" },
                  ...difficulties.map((difficulty) => ({
                    value: difficulty,
                    label: difficulty,
                  })),
                ]}
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {filteredWords.map((word) => (
              <Card key={word.id} className="hover:bg-gray-50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex flex-col">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold">{word.korean}</h3>
                          <Button variant="ghost" size="icon" onClick={() => handlePlayPronunciation(word, "ko")} title="한국어 발음 듣기">
                            <Volume2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>{word.english}</span>
                          <Button variant="ghost" size="icon" onClick={() => handlePlayPronunciation(word, "en")} title="영어 발음 듣기">
                            <Volume2 className="h-4 w-4" />
                          </Button>
                          |<span>{word.russian}</span>
                          <Button variant="ghost" size="icon" onClick={() => handlePlayPronunciation(word, "ru")} title="러시아어 발음 듣기">
                            <Volume2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="border-l-2 border-blue-500 pl-2">
                        <p className="text-sm">{word.definition}</p>
                        <p className="mt-2 italic text-sm text-gray-700">예시: {word.examples[0] || "예시 없음"}</p>
                      </div>

                      <div className="border-l-2 border-red-500 pl-2">
                        <p className="text-sm">{word.definition_ru}</p>
                        <p className="mt-2 italic text-sm text-gray-700">Пример: {word.examples[1] || "Нет примера"}</p>
                      </div>
                    </div>

                    <div className="mt-4 text-xs text-gray-500">
                      <span className="mr-2">카테고리: {word.category}</span>
                      <span>난이도: {word.difficulty}</span>
                      <span className="ml-2">발음: {word.pronunciation}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredWords.length === 0 && (
            <p className="text-center text-gray-500">
              일치하는 단어가 없습니다.
              <br />
              Соответствующие слова не найдены.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default KoreanDictionary;
