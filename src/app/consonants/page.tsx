"use client";

import { Volume2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ConsonantsPage() {
  const router = useRouter();

  const consonants = [
    { char: "ㄱ", name: "기역", romanization: "g/k", audio: "/audio/consonants/giyeok.mp3" },
    { char: "ㄴ", name: "니은", romanization: "n", audio: "/audio/consonants/nieun.mp3" },
    { char: "ㄷ", name: "디귿", romanization: "d/t", audio: "/audio/consonants/digeut.mp3" },
    { char: "ㄹ", name: "리을", romanization: "r/l", audio: "/audio/consonants/rieul.mp3" },
    { char: "ㅁ", name: "미음", romanization: "m", audio: "/audio/consonants/mieum.mp3" },
    { char: "ㅂ", name: "비읍", romanization: "b/p", audio: "/audio/consonants/bieup.mp3" },
    { char: "ㅅ", name: "시옷", romanization: "s", audio: "/audio/consonants/siot.mp3" },
    { char: "ㅇ", name: "이응", romanization: "ng", audio: "/audio/consonants/ieung.mp3" },
    { char: "ㅈ", name: "지읒", romanization: "j", audio: "/audio/consonants/jieut.mp3" },
    { char: "ㅊ", name: "치읓", romanization: "ch", audio: "/audio/consonants/chieut.mp3" },
    { char: "ㅋ", name: "키읔", romanization: "k", audio: "/audio/consonants/kieuk.mp3" },
    { char: "ㅌ", name: "티읕", romanization: "t", audio: "/audio/consonants/tieut.mp3" },
    { char: "ㅍ", name: "피읖", romanization: "p", audio: "/audio/consonants/pieup.mp3" },
    { char: "ㅎ", name: "히읗", romanization: "h", audio: "/audio/consonants/hieut.mp3" },
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
            <span className="font-medium">뒤로 가기 / Назад</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">한글 자음 / Корейские согласные</h1>
          <p className="mt-2 text-gray-600">
            총 14개의 기본 자음과 그 발음을 배워보세요.
            <span className="block text-sm mt-1">Изучите 14 базовых согласных букв и их произношение.</span>
          </p>
        </div>

        {/* 자음 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {consonants.map((consonant) => (
            <div
              key={consonant.char}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="text-5xl font-bold text-indigo-600">{consonant.char}</div>
                  <button
                    onClick={() => playAudio(consonant.audio)}
                    className="p-2 rounded-full bg-indigo-50 hover:bg-indigo-100 transition-colors duration-200"
                    aria-label={`${consonant.name} 발음 듣기`}
                  >
                    <Volume2 className="w-5 h-5 text-indigo-600" />
                  </button>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">{consonant.name}</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">로마자:</span>
                    <span className="text-sm font-medium text-indigo-600">{consonant.romanization}</span>
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
