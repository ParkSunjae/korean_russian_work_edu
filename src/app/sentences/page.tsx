"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";

const sentences = [
  {
    id: "1",
    korean: "안녕하세요",
    russian: "Здравствуйте",
    romanization: "annyeonghaseyo",
    category: "인사",
    level: "초급",
  },
  {
    id: "2",
    korean: "감사합니다",
    russian: "Спасибо",
    romanization: "gamsahamnida",
    category: "인사",
    level: "초급",
  },
  {
    id: "3",
    korean: "저는 한국어를 공부합니다",
    russian: "Я изучаю корейский язык",
    romanization: "jeoneun hangugeo-reul gongbuhamnida",
    category: "자기소개",
    level: "초급",
  },
  {
    id: "4",
    korean: "지금 몇 시예요?",
    russian: "Который сейчас час?",
    romanization: "jigeum myeot siyeyo?",
    category: "시간",
    level: "초급",
  },
  {
    id: "5",
    korean: "이것은 책입니다",
    russian: "Это книга",
    romanization: "igeoseun chaeg-imnida",
    category: "사물",
    level: "초급",
  },
  {
    id: "6",
    korean: "날씨가 좋네요",
    russian: "Хорошая погода",
    romanization: "nalssiga jonneyo",
    category: "날씨",
    level: "초급",
  },
  {
    id: "7",
    korean: "어디에서 왔어요?",
    russian: "Откуда вы?",
    romanization: "eodie-eseo wasseoyo?",
    category: "자기소개",
    level: "초급",
  },
  {
    id: "8",
    korean: "맛있게 드세요",
    russian: "Приятного аппетита",
    romanization: "masitge deuseyo",
    category: "식사",
    level: "초급",
  },
  {
    id: "9",
    korean: "내일 만나요",
    russian: "Увидимся завтра",
    romanization: "naeil mannayo",
    category: "인사",
    level: "초급",
  },
  {
    id: "10",
    korean: "좋은 하루 보내세요",
    russian: "Хорошего дня",
    romanization: "jo-eun haru bonaeseyo",
    category: "인사",
    level: "초급",
  },
] as const;

export default function SentencesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const categories = ["all", ...Array.from(new Set(sentences.map((s) => s.category)))];

  const filteredSentences = selectedCategory === "all" ? sentences : sentences.filter((s) => s.category === selectedCategory);

  return (
    <PageLayout title="문장" titleRu="Предложения" showBackButton>
      <div className="space-y-6">
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                selectedCategory === category ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category === "all" ? "전체" : category}
            </button>
          ))}
        </div>

        <div className="grid gap-4">
          {filteredSentences.map((sentence) => (
            <div key={sentence.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">{sentence.korean}</h3>
                  <p className="text-gray-600">{sentence.russian}</p>
                  <p className="text-sm text-gray-500">{sentence.romanization}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded">{sentence.level}</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">{sentence.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
