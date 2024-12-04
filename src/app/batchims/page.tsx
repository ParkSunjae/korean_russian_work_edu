"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { BATCHIMS } from "@/data/batchims";
import type { Batchim } from "@/data/batchims";

export default function BatchimsPage() {
  const [selectedBatchim, setSelectedBatchim] = useState<Batchim>(BATCHIMS[0]);

  return (
    <PageLayout title="받침" titleRu="Батчим">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 받침 설명 */}
          <div className="mb-8">
            <p className="text-gray-700 mb-2">
              받침은 한글 음절의 끝소리를 나타내는 자음입니다.
            </p>
            <p className="text-gray-600">
              Батчим - это согласная буква в конце слога в корейском языке.
            </p>
          </div>

          {/* 받침 선택 버튼들 */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-medium mb-4">받침 선택 / Выберите батчим</h3>
            <div className="flex flex-wrap gap-3">
              {BATCHIMS.map((batchim) => (
                <button
                  key={batchim.char}
                  onClick={() => setSelectedBatchim(batchim)}
                  className={`px-6 py-3 rounded-lg text-xl font-medium transition-all
                    ${selectedBatchim.char === batchim.char
                      ? "bg-blue-500 text-white shadow-md transform scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {batchim.char}
                </button>
              ))}
            </div>
          </div>

          {/* 선택된 받침 상세 정보 */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* 헤더 */}
            <div className="bg-gray-50 p-6 border-b">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-blue-600">
                  {selectedBatchim.char}
                </span>
                <div>
                  <h2 className="text-xl font-semibold">발음 / Произношение</h2>
                  <p className="text-lg text-gray-600">{selectedBatchim.sound}</p>
                </div>
              </div>
            </div>

            {/* 본문 */}
            <div className="p-6">
              {/* 설명 */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">설명 / Объяснение</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">{selectedBatchim.description}</p>
                  <p className="text-gray-600">{selectedBatchim.description_ru}</p>
                </div>
              </div>

              {/* 예시 */}
              <div>
                <h3 className="text-lg font-semibold mb-3">예시 / Примеры</h3>
                <div className="grid gap-3">
                  {selectedBatchim.examples.map((example, index) => (
                    <div 
                      key={index}
                      className="bg-gray-50 p-4 rounded-lg flex justify-between items-center hover:bg-gray-100 transition-colors"
                    >
                      <div className="space-y-1">
                        <span className="text-xl font-medium">{example.word}</span>
                        <div className="text-sm text-gray-500">
                          {example.pronunciation}
                        </div>
                      </div>
                      <span className="text-gray-600 text-lg">{example.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
