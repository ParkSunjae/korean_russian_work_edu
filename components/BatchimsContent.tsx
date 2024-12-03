"use client";

import PageLayout from "@/components/PageLayout";

interface Batchim {
  consonant: string;
  combinations: string[];
  pronunciation: string;
  description: string;
  descriptionRu: string;
}

const batchims: Batchim[] = [
  {
    consonant: "ㄱ",
    combinations: ["악", "박", "삭", "착", "학"],
    pronunciation: "k˺",
    description: "종성 'ㄱ'은 영어의 'k'와 비슷하지만 소리를 내지 않고 입술을 닫습니다.",
    descriptionRu: "Конечный 'ㄱ' похож на английский 'k', но произносится без выдоха",
  },
  {
    consonant: "ㄴ",
    combinations: ["안", "반", "산", "찬", "한"],
    pronunciation: "n",
    description: "종성 'ㄴ'은 영어의 'n'과 같은 발음입니다.",
    descriptionRu: "Конечный 'ㄴ' произносится как английский 'n'",
  },
  {
    consonant: "ㄷ",
    combinations: ["앋", "받", "샅", "찻", "핫"],
    pronunciation: "t˺",
    description: "종성 'ㄷ'은 영어의 't'와 비슷하지만 소리를 내지 않고 입술을 닫습니다.",
    descriptionRu: "Конечный 'ㄷ' похож на английский 't', но произносится без выдоха",
  },
  {
    consonant: "ㄹ",
    combinations: ["알", "발", "살", "찰", "할"],
    pronunciation: "l/r",
    description: "종성 'ㄹ'은 영어의 'l'과 비슷한 발음입니다.",
    descriptionRu: "Конечный 'ㄹ' похож на английский 'l'",
  },
  {
    consonant: "ㅁ",
    combinations: ["암", "밤", "삼", "참", "함"],
    pronunciation: "m",
    description: "종성 'ㅁ'은 영어의 'm'과 같은 발음입니다.",
    descriptionRu: "Конечный 'ㅁ' произносится как английский 'm'",
  },
  {
    consonant: "ㅂ",
    combinations: ["압", "밥", "삽", "찹", "합"],
    pronunciation: "p˺",
    description: "종성 'ㅂ'은 영어의 'p'와 비슷하지만 소리를 내지 않고 입술을 닫습니다.",
    descriptionRu: "Конечный 'ㅂ' похож на английский 'p', но произносится без выдоха",
  },
  {
    consonant: "ㅇ",
    combinations: ["앙", "방", "상", "창", "항"],
    pronunciation: "ŋ",
    description: "종성 'ㅇ'은 영어의 'ng'와 같은 발음입니다.",
    descriptionRu: "Конечный 'ㅇ' произносится как английский 'ng'",
  },
  {
    consonant: "ㄲ",
    combinations: ["낚", "떡", "깎", "쌕", "빡"],
    pronunciation: "k˺",
    description: "종성 'ㄲ'은 'ㄱ'과 같은 발음입니다.",
    descriptionRu: "Конечный 'ㄲ' произносится как 'ㄱ'",
  },
  {
    consonant: "ㄳ",
    combinations: ["몫", "넋", "닭", "삯", "값"],
    pronunciation: "k˺",
    description: "종성 'ㄳ'은 'ㄱ'으로 발음됩니다.",
    descriptionRu: "Конечный 'ㄳ' произносится как 'ㄱ'",
  },
  {
    consonant: "ㄵ",
    combinations: ["앉", "얹", "붙", "없", "잊"],
    pronunciation: "n",
    description: "종성 'ㄵ'은 'ㄴ'으로 발음됩니다.",
    descriptionRu: "Конечный 'ㄵ' произносится как 'ㄴ'",
  },
  {
    consonant: "ㄶ",
    combinations: ["많", "않", "닳", "싫", "끊"],
    pronunciation: "n",
    description: "종성 'ㄶ'은 'ㄴ'으로 발음됩니다.",
    descriptionRu: "Конечный 'ㄶ' произносится как 'ㄴ'",
  },
  {
    consonant: "ㄺ",
    combinations: ["닭", "맑", "늙", "읽", "밝"],
    pronunciation: "k˺",
    description: "종성 'ㄺ'은 'ㄱ'으로 발음됩니다.",
    descriptionRu: "Конечный 'ㄺ' произносится как 'ㄱ'",
  },
  {
    consonant: "ㄻ",
    combinations: ["삶", "젊", "옮", "굶", "핥"],
    pronunciation: "m",
    description: "종성 'ㄻ'은 'ㅁ'으로 발음됩니다.",
    descriptionRu: "Конечный 'ㄻ' произносится как 'ㅁ'",
  },
  {
    consonant: "ㄼ",
    combinations: ["여덟", "넓", "밟", "읊", "훑"],
    pronunciation: "l/p˺",
    description: "종성 'ㄼ'은 뒤에 오는 소리에 따라 'ㄹ' 또는 'ㅂ'으로 발음됩니다.",
    descriptionRu: "Конечный 'ㄼ' произносится как 'ㄹ' или 'ㅂ' в зависимости от следующего звука",
  },
];

export default function BatchimsContent() {
  return (
    <PageLayout title="받침" titleRu="Патчим (Конечные согласные)">
      <div className="space-y-6">
        <p className="text-gray-600 mb-8">
          받침은 한글 음절의 종성(끝소리)을 나타내는 자음입니다. 기본 받침 7개와 복합 받침을 학습해보세요.
          <br />
          <span className="text-sm text-gray-500">Патчим - это согласные звуки, которые находятся в конце слога. Изучите 7 основных и составных патчимов.</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {batchims.map((group) => (
            <div key={group.consonant} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-2xl font-bold">{group.consonant}</h3>
                <span className="text-sm text-gray-500">[{group.pronunciation}]</span>
              </div>
              <div className="grid grid-cols-5 gap-2 mb-3">
                {group.combinations.map((combo) => (
                  <div key={combo} className="bg-white p-2 rounded text-center hover:bg-gray-100 transition-colors">
                    {combo}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 mb-2">{group.description}</p>
              <p className="text-sm text-gray-500 italic">{group.descriptionRu}</p>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
