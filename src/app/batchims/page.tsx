"use client";

import React, { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent } from "@/components/Card";

const BATCHIMS = [
  { char: "ㄱ", sound: "기역", examples: ["각", "국", "박"] },
  { char: "ㄴ", sound: "니은", examples: ["간", "신", "안"] },
  { char: "ㄷ", sound: "디귿", examples: ["닫", "곧", "받"] },
  { char: "ㄹ", sound: "리을", examples: ["갈", "밀", "살"] },
  { char: "ㅁ", sound: "미음", examples: ["감", "밤", "삼"] },
  { char: "ㅂ", sound: "비읍", examples: ["갑", "집", "숲"] },
  { char: "ㅅ", sound: "시옷", examples: ["갓", "옷", "낫"] },
  { char: "ㅇ", sound: "이응", examples: ["강", "공", "방"] },
  { char: "ㅈ", sound: "지읒", examples: ["깎", "낚", "쫓"] },
  { char: "ㅊ", sound: "치읓", examples: ["갛", "낳", "좋"] },
  { char: "ㅋ", sound: "키읔", examples: ["깎", "넋", "닭"] },
  { char: "ㅌ", sound: "티읕", examples: ["앉", "잊", "짖"] },
  { char: "ㅍ", sound: "피읖", examples: ["앞", "잎", "숲"] },
  { char: "ㅎ", sound: "히읗", examples: ["앟", "잃", "좋"] },
];

const BatchimsPage: React.FC = () => {
  const playPronunciation = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ko-KR";
    speechSynthesis.speak(utterance);
  };

  return (
    <PageLayout title="받침" titleRu="Батчим">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <p className="text-gray-700 mb-2">받침은 한글 음절의 끝소리를 나타내는 자음입니다.</p>
            <p className="text-gray-600">Батчим - это согласная буква в конце слога в корейском языке.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {BATCHIMS.map((batchim) => (
              <Card key={batchim.char} className="bg-white shadow-md rounded-lg">
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl font-bold text-blue-600">{batchim.char}</span>
                    <span className="text-lg text-gray-600">{batchim.sound}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">예시 / Примеры</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {batchim.examples.map((example, index) => (
                      <li key={index} className="text-gray-700 flex items-center gap-2">
                        {example}
                        <button onClick={() => playPronunciation(example)} className="text-blue-500 hover:text-blue-700">
                          🔊
                        </button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default BatchimsPage;
