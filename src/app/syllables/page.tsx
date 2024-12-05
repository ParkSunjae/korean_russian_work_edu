"use client";

import { Volume2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function SyllablesPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [selectedVowel, setSelectedVowel] = useState("ㅏ");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const vowels = [
    { char: "ㅏ", name: "아" },
    { char: "ㅑ", name: "야" },
    { char: "ㅓ", name: "어" },
    { char: "ㅕ", name: "여" },
    { char: "ㅗ", name: "오" },
    { char: "ㅛ", name: "요" },
    { char: "ㅜ", name: "우" },
    { char: "ㅠ", name: "유" },
    { char: "ㅡ", name: "으" },
    { char: "ㅣ", name: "이" },
  ];

  const consonants = [
    { char: "ㄱ", name: "기역" },
    { char: "ㄴ", name: "니은" },
    { char: "ㄷ", name: "디귿" },
    { char: "ㄹ", name: "리을" },
    { char: "ㅁ", name: "미음" },
    { char: "ㅂ", name: "비읍" },
    { char: "ㅅ", name: "시옷" },
    { char: "ㅇ", name: "이응" },
    { char: "ㅈ", name: "지읒" },
    { char: "ㅊ", name: "치읓" },
    { char: "ㅋ", name: "키읔" },
    { char: "ㅌ", name: "티읕" },
    { char: "ㅍ", name: "피읖" },
    { char: "ㅎ", name: "히읗" },
  ];

  // 자음과 모음을 조합하여 음절 생성
  const getSyllable = (consonant: string, vowel: string) => {
    return consonant + vowel;
  };

  // 자음과 모음의 로마자 매핑 추가
  const consonantToRomaja: { [key: string]: string } = {
    ㄱ: "g",
    ㄴ: "n",
    ㄷ: "d",
    ㄹ: "r",
    ㅁ: "m",
    ㅂ: "b",
    ㅅ: "s",
    ㅇ: "",
    ㅈ: "j",
    ㅊ: "ch",
    ㅋ: "k",
    ㅌ: "t",
    ㅍ: "p",
    ㅎ: "h",
  };

  const vowelToRomaja: { [key: string]: string } = {
    ㅏ: "a",
    ㅑ: "ya",
    ㅓ: "eo",
    ㅕ: "yeo",
    ㅗ: "o",
    ㅛ: "yo",
    ㅜ: "u",
    ㅠ: "yu",
    ㅡ: "eu",
    ㅣ: "i",
  };

  // playAudio 함수 수정
  const playAudio = (consonant: string, vowel: string) => {
    const consonantRomaja = consonantToRomaja[consonant];
    const vowelRomaja = vowelToRomaja[vowel];
    const audioPath = `/audio/syllables/${consonantRomaja}${vowelRomaja}.mp3`;
    const audio = new Audio(audioPath);
    audio.play().catch((error) => {
      console.error("오디오 재생 실패:", error);
      alert("오디오 파일을 재생할  없습니다.");
    });
  };

  if (!isClient) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(14)].map((_, i) => (
              <div key={i} className="h-40 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5" />
          뒤로 가기
        </button>
      </div>

      {/* 모음 선택 영역 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">자음+모음</h1>
        <p className="mt-2 text-gray-600">자음과 모음을 선택하여 글자를 만들어보세요</p>

        <div className="mt-4">
          <h3 className="text-sm sm:text-lg font-semibold mb-2">모음 선택</h3>
          <div className="flex flex-wrap gap-2">
            {vowels.map((vowel) => (
              <button
                key={vowel.char}
                onClick={() => setSelectedVowel(vowel.char)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  selectedVowel === vowel.char ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {vowel.char}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 자음+모음 조합 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {consonants.map((consonant) => {
          const syllable = getSyllable(consonant.char, selectedVowel);
          return (
            <div key={consonant.char} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-4">
                <div className="text-5xl font-bold text-blue-600">{syllable}</div>
                <div className="flex flex-col items-end gap-1">
                  <button
                    onClick={() => playAudio(consonant.char, selectedVowel)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label={`${syllable} 발음 듣기`}
                  >
                    <Volume2 className="w-6 h-6 text-blue-600" />
                  </button>
                  <span className="text-xs text-gray-500">3번 반복</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-lg font-medium text-gray-800">
                  {consonant.name} + {selectedVowel}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
