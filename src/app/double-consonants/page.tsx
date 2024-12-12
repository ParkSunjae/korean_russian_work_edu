"use client";

import { Volume2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface Example {
  korean: string;
  russian: string;
  audio: string;
}

interface DoubleConsonant {
  char: string;
  name: string;
  nameRu: string;
  romanization: string;
  base: string;
  description: string;
  descriptionRu: string;
  pronunciation: string;
  pronunciationRu: string;
  audio: string;
  examples: Example[];
}

export default function DoubleConsonantsPage() {
  const router = useRouter();

  const doubleConsonants: DoubleConsonant[] = [
    {
      char: "ㄲ",
      name: "쌍기역",
      nameRu: "ссанг-гиёк",
      romanization: "kk",
      base: "ㄱ",
      description: "기역(ㄱ)을 두 번 쓴 자음",
      descriptionRu: "Удвоенная согласная ㄱ",
      pronunciation: "영어의 'k'보다 더 강하게 발음",
      pronunciationRu: "Произносится сильнее, чем обычный 'к'",
      audio: "/audio/double-consonants/kkada.mp3",
      examples: [
        {
          korean: "까다 (быть сложным)",
          russian: "까다롭다 - сложный, требовательный",
          audio: "/audio/double-consonants/kkada.mp3",
        },
        {
          korean: "꽃 (цветок)",
          russian: "꽃 - цветок",
          audio: "/audio/double-consonants/kkot.mp3",
        },
        {
          korean: "꿈 (сон)",
          russian: "꿈 - сон, мечта",
          audio: "/audio/double-consonants/kkum.mp3",
        },
      ],
    },
    {
      char: "ㄸ",
      name: "쌍디귿",
      nameRu: "ссанг-дигыт",
      romanization: "tt",
      base: "ㄷ",
      description: "디귿(ㄷ)을 두 번 쓴 자음",
      descriptionRu: "Удвоенная согласная ㄷ",
      pronunciation: "영어의 't'보다 더 강하게 발음",
      pronunciationRu: "Произносится сильнее, чем обычный 'т'",
      audio: "/audio/double-consonants/ttada.mp3",
      examples: [
        {
          korean: "따다 (срывать)",
          russian: "따다 - срывать, собирать",
          audio: "/audio/double-consonants/ttada.mp3",
        },
        {
          korean: "떡 (рисовый пирог)",
          russian: "떡 - рисовый пирог",
          audio: "/audio/double-consonants/tteok.mp3",
        },
        {
          korean: "때 (время)",
          russian: "때 - время, момент",
          audio: "/audio/double-consonants/ttae.mp3",
        },
      ],
    },
    {
      char: "ㅃ",
      name: "쌍비읍",
      nameRu: "ссанг-биып",
      romanization: "pp",
      base: "ㅂ",
      description: "비읍(ㅂ)을 두 번 쓴 자음",
      descriptionRu: "Удвоенная согласная ㅂ",
      pronunciation: "영어의 'p'보다 더 강하게 발음",
      pronunciationRu: "Произносится сильнее, чем обычный 'п'",
      audio: "/audio/double-consonants/ppalli.mp3",
      examples: [
        {
          korean: "빨리 (быстро)",
          russian: "빨리 - быстро",
          audio: "/audio/double-consonants/ppalli.mp3",
        },
        {
          korean: "뿌리 (корень)",
          russian: "뿌리 - корень",
          audio: "/audio/double-consonants/ppuri.mp3",
        },
        {
          korean: "뼈 (кость)",
          russian: "뼈 - кость",
          audio: "/audio/double-consonants/ppyeo.mp3",
        },
      ],
    },
    {
      char: "ㅆ",
      name: "쌍시옷",
      nameRu: "ссанг-сиот",
      romanization: "ss",
      base: "ㅅ",
      description: "시옷(ㅅ)을 두 번 쓴 자음",
      descriptionRu: "Удвоенная согласная ㅅ",
      pronunciation: "영어의 's'보다 더 강하게 발음",
      pronunciationRu: "Произносится сильнее, чем обычный 'с'",
      audio: "/audio/double-consonants/ssada.mp3",
      examples: [
        {
          korean: "싸다 (дешёвый)",
          russian: "싸다 - дешёвый",
          audio: "/audio/double-consonants/ssada.mp3",
        },
        {
          korean: "쓰다 (писать)",
          russian: "쓰다 - писать, горький",
          audio: "/audio/double-consonants/sseuda.mp3",
        },
        {
          korean: "씨 (семя)",
          russian: "씨 - семя",
          audio: "/audio/double-consonants/ssi.mp3",
        },
      ],
    },
    {
      char: "ㅉ",
      name: "쌍지읒",
      nameRu: "ссанг-чиыт",
      romanization: "jj",
      base: "ㅈ",
      description: "지읒(ㅈ)을 두 번 쓴 자음",
      descriptionRu: "Удвоенная согласная ㅈ",
      pronunciation: "영어의 'j'보다 더 강하게 발음",
      pronunciationRu: "Произносится сильнее, чем обычный 'ч'",
      audio: "/audio/double-consonants/jjada.mp3",
      examples: [
        {
          korean: "짜다 (солёный)",
          russian: "짜다 - солёный",
          audio: "/audio/double-consonants/jjada.mp3",
        },
        {
          korean: "찌다 (тушить)",
          russian: "찌다 - тушить, варить на пару",
          audio: "/audio/double-consonants/jjida.mp3",
        },
        {
          korean: "쭈다 (сжиматься)",
          russian: "쭈다 - сжиматься, стесняться",
          audio: "/audio/double-consonants/jjuda.mp3",
        },
      ],
    },
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
          <h1 className="text-3xl font-bold text-gray-900">쌍자음 / Двойные согласные</h1>
          <p className="mt-2 text-gray-600">
            5개의 쌍자음과 그 발음을 배워보세요.
            <span className="block text-sm mt-1">Изучите 5 двойных согласных букв и их произношение.</span>
          </p>
        </div>

        {/* 쌍자음 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {doubleConsonants.map((consonant) => (
            <div
              key={consonant.char}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200"
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-5xl font-bold text-indigo-600">{consonant.char}</div>
                    <div className="text-3xl text-gray-400">←</div>
                    <div className="text-4xl text-gray-500">{consonant.base}</div>
                  </div>
                  <button
                    onClick={() => playAudio(consonant.audio)}
                    className="p-2 rounded-full bg-indigo-50 hover:bg-indigo-100 transition-colors duration-200"
                    aria-label={`${consonant.name} 발음 듣기`}
                  >
                    <Volume2 className="w-5 h-5 text-indigo-600" />
                  </button>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    {consonant.name}
                    <span className="text-sm text-gray-500 ml-2">({consonant.nameRu})</span>
                  </h2>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-gray-600">로마자:</span>
                    <span className="text-sm font-medium text-indigo-600">{consonant.romanization}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{consonant.description}</p>
                  <p className="text-sm text-gray-500 mb-3">{consonant.descriptionRu}</p>
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-1">예문 / Примеры:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {consonant.examples.map((example, index) => (
                        <li key={index} className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{example.korean}</p>
                            <p className="text-gray-500">{example.russian}</p>
                          </div>
                          <button onClick={() => playAudio(example.audio)} className="p-1.5 rounded-full hover:bg-gray-200 transition-colors">
                            <Volume2 className="w-4 h-4 text-gray-600" />
                          </button>
                        </li>
                      ))}
                    </ul>
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
