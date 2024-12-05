"use client";

import { Volume2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BatchimsPage() {
  const router = useRouter();

  const batchims = [
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

  const playPronunciation = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ko-KR";
    speechSynthesis.speak(utterance);
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
          <h1 className="text-3xl font-bold text-gray-900">받침</h1>
          <p className="mt-2 text-gray-600">받침은 한글 음절의 끝소리를 나타내는 자음입니다.</p>
          <p className="mt-1 text-gray-500">Батчим - это согласная буква в конце слога в корейском языке.</p>
        </div>

        {/* 받침 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {batchims.map((batchim) => (
            <div
              key={batchim.char}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="text-5xl font-bold text-indigo-600">{batchim.char}</div>
                  <div className="text-lg font-medium text-gray-600">{batchim.sound}</div>
                </div>
                <div className="mt-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">예시 / Примеры</h2>
                  <div className="space-y-2">
                    {batchim.examples.map((example, index) => (
                      <div key={index} className="flex items-center justify-between px-3 py-1 bg-gray-50 rounded-md">
                        <span className="text-gray-800 font-medium">{example}</span>
                        <button
                          onClick={() => playPronunciation(example)}
                          className="p-1.5 rounded-full bg-indigo-50 hover:bg-indigo-100 transition-colors duration-200"
                          aria-label={`${example} 발음 듣기`}
                        >
                          <Volume2 className="w-4 h-4 text-indigo-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
