"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ChevronDown, ChevronUp, Volume2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface GrammarPoint {
  id: string;
  level: string;
  pattern: string;
  patternRu: string;
  meaning: string;
  meaningRu: string;
  description: string;
  descriptionRu: string;
  examples: {
    korean: string;
    russian: string;
    audio?: string;
  }[];
}

export default function GrammarPage() {
  const router = useRouter();
  const [expandedColumn, setExpandedColumn] = useState<number | null>(null);
  const [grammarPoints, setGrammarPoints] = useState<GrammarPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGrammarPoints = async () => {
      try {
        const response = await fetch("/data/topik_1_grammer.json");
        const data = await response.json();
        setGrammarPoints(data.grammarPoints);
      } catch (error) {
        console.error("Failed to load grammar points:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadGrammarPoints();
  }, []);

  const toggleExpand = (id: string) => {
    const columnIndex = Math.floor((parseInt(id) - 1) / 3);
    setExpandedColumn(expandedColumn === columnIndex ? null : columnIndex);
  };

  const isExpanded = (id: string) => {
    const columnIndex = Math.floor((parseInt(id) - 1) / 3);
    return expandedColumn === columnIndex;
  };

  const playAudio = (audioPath: string) => {
    const audio = new Audio(audioPath);
    audio.play().catch((error) => {
      console.error("오디오 재생 실패:", error);
      alert("오디오 파일을 재생할 수 없습니다.");
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-6 flex items-center justify-center">
        <p className="text-gray-600">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4">
        {/* 헤더 섹션 */}
        <div className="mb-6">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-3 transition-colors duration-200">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">뒤로 가기 / Назад</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">TOPIK 1급 문법 / Грамматика TOPIK 1</h1>
          <p className="mt-2 text-gray-600">
            TOPIK 1급에 나오는 주요 문법을 배워보세요.
            <span className="block text-sm mt-1">Изучите основную грамматику уровня TOPIK 1.</span>
          </p>
        </div>

        {/* 문법 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {grammarPoints.map((point) => (
            <div key={point.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <button onClick={() => toggleExpand(point.id)} className="w-full px-5 py-4 flex justify-between items-start hover:bg-gray-50 transition-colors">
                <div className="text-left">
                  <span className="inline-block px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded mb-2">{point.level}</span>
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">{point.pattern}</h2>
                  <p className="text-sm text-gray-500">{point.patternRu}</p>
                </div>
                {isExpanded(point.id) ? <ChevronUp className="w-5 h-5 text-gray-400 mt-1" /> : <ChevronDown className="w-5 h-5 text-gray-400 mt-1" />}
              </button>

              {isExpanded(point.id) && (
                <div className="px-5 py-4 border-t border-gray-200 bg-gray-50">
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-900 mb-1">{point.meaning}</h3>
                    <p className="text-sm text-gray-500">{point.meaningRu}</p>
                  </div>

                  <div className="mb-4 p-3 bg-white rounded-lg">
                    <p className="text-gray-700 text-sm leading-relaxed mb-1">{point.description}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{point.descriptionRu}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 text-sm">예문 / Примеры:</h4>
                    <div className="space-y-2">
                      {point.examples.map((example, index) => (
                        <div key={index} className="p-3 bg-white rounded-lg">
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <p className="font-medium text-gray-900">{example.korean}</p>
                              <p className="text-sm text-gray-600">{example.russian}</p>
                            </div>
                            {example.audio && (
                              <button onClick={() => playAudio(example.audio!)} className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                                <Volume2 className="w-4 h-4 text-gray-600" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
