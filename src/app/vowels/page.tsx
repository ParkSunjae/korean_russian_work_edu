"use client";

import { Volume2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function VowelsPage() {
  const router = useRouter();

  const vowels = [
    { char: "ㅏ", name: "아", romanization: "a", audio: "/audio/vowels/a.mp3" },
    { char: "ㅑ", name: "야", romanization: "ya", audio: "/audio/vowels/ya.mp3" },
    { char: "ㅓ", name: "어", romanization: "eo", audio: "/audio/vowels/eo.mp3" },
    { char: "ㅕ", name: "여", romanization: "yeo", audio: "/audio/vowels/yeo.mp3" },
    { char: "ㅗ", name: "오", romanization: "o", audio: "/audio/vowels/o.mp3" },
    { char: "ㅛ", name: "요", romanization: "yo", audio: "/audio/vowels/yo.mp3" },
    { char: "ㅜ", name: "우", romanization: "u", audio: "/audio/vowels/u.mp3" },
    { char: "ㅠ", name: "유", romanization: "yu", audio: "/audio/vowels/yu.mp3" },
    { char: "ㅡ", name: "으", romanization: "eu", audio: "/audio/vowels/eu.mp3" },
    { char: "ㅣ", name: "이", romanization: "i", audio: "/audio/vowels/i.mp3" },
    { char: "ㅐ", name: "애", romanization: "ae", audio: "/audio/vowels/ae.mp3" },
    { char: "ㅒ", name: "얘", romanization: "yae", audio: "/audio/vowels/yae.mp3" },
    { char: "ㅔ", name: "에", romanization: "e", audio: "/audio/vowels/e.mp3" },
    { char: "ㅖ", name: "예", romanization: "ye", audio: "/audio/vowels/ye.mp3" },
    { char: "ㅘ", name: "와", romanization: "wa", audio: "/audio/vowels/wa.mp3" },
    { char: "ㅙ", name: "왜", romanization: "wae", audio: "/audio/vowels/wae.mp3" },
    { char: "ㅚ", name: "외", romanization: "oe", audio: "/audio/vowels/oe.mp3" },
    { char: "ㅝ", name: "워", romanization: "wo", audio: "/audio/vowels/wo.mp3" },
    { char: "ㅞ", name: "웨", romanization: "we", audio: "/audio/vowels/we.mp3" },
    { char: "ㅟ", name: "위", romanization: "wi", audio: "/audio/vowels/wi.mp3" },
    { char: "ㅢ", name: "의", romanization: "ui", audio: "/audio/vowels/ui.mp3" },
  ];

  const playAudio = (audioPath: string) => {
    const audio = new Audio(audioPath);
    audio.play().catch((error) => {
      console.error("오디오 재생 실패:", error);
      alert("오디오 파일을 재생할 수 없습니다.");
    });
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
          <h1 className="text-3xl font-bold text-gray-900">한글 모음</h1>
          <p className="mt-2 text-gray-600">총 21개의 기본 모음과 그 발음을 배워보세요.</p>
        </div>

        {/* 모음 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {vowels.map((vowel) => (
            <div
              key={vowel.char}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="text-5xl font-bold text-indigo-600">{vowel.char}</div>
                  <button
                    onClick={() => playAudio(vowel.audio)}
                    className="p-2 rounded-full bg-indigo-50 hover:bg-indigo-100 transition-colors duration-200"
                    aria-label={`${vowel.name} 발음 듣기`}
                  >
                    <Volume2 className="w-5 h-5 text-indigo-600" />
                  </button>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">{vowel.name}</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">로마자:</span>
                    <span className="text-sm font-medium text-indigo-600">{vowel.romanization}</span>
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
