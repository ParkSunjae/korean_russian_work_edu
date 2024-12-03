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
    definition: "다른 사람을 만났을 때 하는 기본적인 인사말",
    definition_ru: "Базовое приветствие при встрече с другим человеком",
  },
  {
    id: "2",
    korean: "감사합니다",
    russian: "Спасибо",
    romanization: "gamsahamnida",
    category: "인사",
    level: "초급",
    definition: "누군가의 도움이나 친절에 대해 고마움을 표현하는 말",
    definition_ru: "Выражение благодарности за чью-то помощь или доброту",
  },
  {
    id: "3",
    korean: "죄송합니다",
    russian: "Извините",
    romanization: "joesonghamnida",
    category: "인사",
    level: "초급",
    definition: "상대방에게 미안한 마음을 ���중하게 표현하는 말",
    definition_ru: "Вежливое выражение сожаления или извинения",
  },
  {
    id: "4",
    korean: "안녕히 계세요",
    russian: "До свидания (тому, кто остается)",
    romanization: "annyeonghi gyeseyo",
    category: "인사",
    level: "초급",
    definition: "자신이 떠날 때 남아있는 사람에게 하는 인사",
    definition_ru: "Прощание с тем, кто остается на месте",
  },
  {
    id: "5",
    korean: "잘 다녀오겠습니다",
    russian: "Я пошёл",
    romanization: "jal danyeogetseumnida",
    category: "인사",
    level: "초급",
    definition: "집을 나설 때 가족에게 하는 인사말",
    definition_ru: "Прощание с семьей при выходе из дома",
  },
  {
    id: "6",
    korean: "다녀왔습니다",
    russian: "Я вернулся",
    romanization: "danyeowatseumnida",
    category: "인사",
    level: "초급",
    definition: "외출 후 집에 돌아왔을 때 하는 인사말",
    definition_ru: "Приветствие при возвращении домой",
  },
  {
    id: "7",
    korean: "맛있게 드세요",
    russian: "Приятного аппетита",
    romanization: "masitge deuseyo",
    category: "식사",
    level: "초급",
    definition: "다른 사람이 식사할 때 하는 인사말",
    definition_ru: "Пожелание приятного аппетита другому человеку",
  },
  {
    id: "8",
    korean: "잘 먹었습니다",
    russian: "Спасибо за еду",
    romanization: "jal meogeotseumnida",
    category: "식사",
    level: "초급",
    definition: "식사를 마친 후 감사한 마음을 표현하는 말",
    definition_ru: "Выражение благодарности после еды",
  },
  {
    id: "9",
    korean: "처음 뵙겠습니다",
    russian: "Рад с вами познакомиться",
    romanization: "cheoeum boepgesseumnida",
    category: "인사",
    level: "초급",
    definition: "처음 만나는 사람에게 하는 정중한 인사말",
    definition_ru: "Вежливое приветствие при первой встрече",
  },
  {
    id: "10",
    korean: "다음에 또 봐요",
    russian: "Увидимся в следующий раз",
    romanization: "daeume tto bwayo",
    category: "인사",
    level: "초급",
    definition: "헤어질 때 다시 만날 것을 기약하며 하는 인사",
    definition_ru: "Прощание с обещанием новой встречи",
  },
  {
    id: "11",
    korean: "오랜만이에요",
    russian: "Давно не виделись",
    romanization: "oraenmanieyo",
    category: "인사",
    level: "초급",
    definition: "오랫동안 만나지 못했던 사람을 만났을 때 하는 인사",
    definition_ru: "Приветствие при встрече после долгого перерыва",
  },
  {
    id: "12",
    korean: "어떻게 지내세요?",
    russian: "Как поживаете?",
    romanization: "eotteoke jinaeseyo?",
    category: "안부",
    level: "초급",
    definition: "상대방의 근황을 물어보는 안부 인사",
    definition_ru: "Вопрос о том, как идут дела у собеседника",
  },
  {
    id: "13",
    korean: "축하드립니다",
    russian: "Поздравляю вас",
    romanization: "chukadeurimnida",
    category: "축하",
    level: "초급",
    definition: "상대방의 기쁜 일을 축하하는 공손한 표현",
    definition_ru: "Вежливое поздравление с радостным событием",
  },
  {
    id: "14",
    korean: "건강하세요",
    russian: "Будьте здоровы",
    romanization: "geonganghaseyo",
    category: "인사",
    level: "초급",
    definition: "상대방의 건강을 기원하는 인사말",
    definition_ru: "Пожелание здоровья собеседнику",
  },
  {
    id: "15",
    korean: "수고하셨습니다",
    russian: "Спасибо за работу",
    romanization: "sugohasyeotseumnida",
    category: "인사",
    level: "초급",
    definition: "상대방의 노고를 치하하는 인사말",
    definition_ru: "Выражение благодарности за чью-то работу или усилия",
  },
  {
    id: "16",
    korean: "괜찮으세요?",
    russian: "Вы в порядке?",
    romanization: "gwaenchanuseyo?",
    category: "안부",
    level: "초급",
    definition: "상대방의 상태를 걱정하며 묻는 말",
    definition_ru: "Вопрос о самочувствии собеседника",
  },
  {
    id: "17",
    korean: "실례합니다",
    russian: "Извините за беспокойство",
    romanization: "sillyehamnida",
    category: "예의",
    level: "초급",
    definition: "다른 사람에게 방해가 될 수 있는 행동을 할 때 하는 말",
    definition_ru: "Извинение перед тем, как побеспокоить кого-то",
  },
  {
    id: "18",
    korean: "천만에요",
    russian: "Не за что",
    romanization: "cheonmaneyo",
    category: "응답",
    level: "초급",
    definition: "감사 인사를 받았을 때 하는 겸손한 답변",
    definition_ru: "Скромный ответ на благодарность",
  },
  {
    id: "19",
    korean: "화이팅!",
    russian: "Удачи!",
    romanization: "hwaiting!",
    category: "응원",
    level: "초급",
    definition: "상대방을 격려하고 응원하는 말",
    definition_ru: "Выражение поддержки и подбадривания",
  },
  {
    id: "20",
    korean: "조심하세요",
    russian: "Будьте осторожны",
    romanization: "josimhaseyo",
    category: "인사",
    level: "초급",
    definition: "상대방의 안전을 걱정하며 하는 당부의 말",
    definition_ru: "Предупреждение быть осторожным",
  },
  {
    id: "21",
    korean: "잘 자요",
    russian: "Спокойной ночи",
    romanization: "jal jayo",
    category: "인사",
    level: "초급",
    definition: "잠자리에 들 때 하는 인사말",
    definition_ru: "Пожелание спокойной ночи перед сном",
  },
  {
    id: "22",
    korean: "좋은 꿈 꾸세요",
    russian: "Приятных снов",
    romanization: "jo-eun kkum kkuseyo",
    category: "인사",
    level: "초급",
    definition: "잠자리에 들 때 좋은 꿈을 꾸기를 바라는 인사말",
    definition_ru: "Пожелание приятных снов перед сном",
  },
  {
    id: "23",
    korean: "식사하셨어요?",
    russian: "Вы поели?",
    romanization: "siksahasyeosseoyo?",
    category: "안부",
    level: "초급",
    definition: "상대방의 식사 여부를 묻는 안부 인사",
    definition_ru: "Вопрос о том, поел ли собеседник",
  },
  {
    id: "24",
    korean: "좋은 아침이에요",
    russian: "Доброе утро",
    romanization: "jo-eun achimieyo",
    category: "인사",
    level: "초급",
    definition: "아침에 만났을 때 하는 인사말",
    definition_ru: "Утреннее приветствие",
  },
  {
    id: "25",
    korean: "안녕히 주무세요",
    russian: "Спокойной ночи",
    romanization: "annyeonghi jumuseyo",
    category: "인사",
    level: "초급",
    definition: "밤에 헤어질 때 하는 공손한 인사말",
    definition_ru: "Вежливое пожелание спокойной ночи",
  },
  {
    id: "26",
    korean: "이름이 뭐예요?",
    russian: "Как вас зовут?",
    romanization: "ireumi mwoyeyo?",
    category: "소개",
    level: "초급",
    definition: "상대방의 이름을 물어보는 질문",
    definition_ru: "Вопрос об имени собеседника",
  },
  {
    id: "27",
    korean: "만나서 반갑습니다",
    russian: "Рад встрече",
    romanization: "mannaseo bangapseumnida",
    category: "인사",
    level: "초급",
    definition: "처음 만난 사람에게 기쁜 마음을 표현하는 인사말",
    definition_ru: "Выражение радости от знакомства",
  },
  {
    id: "28",
    korean: "무슨 일이에요?",
    russian: "Что случилось?",
    romanization: "museun irieyo?",
    category: "질문",
    level: "초급",
    definition: "상대방에게 무슨 일이 있는지 묻는 말",
    definition_ru: "Вопрос о том, что произошло",
  },
  {
    id: "29",
    korean: "축하해요",
    russian: "Поздравляю",
    romanization: "chukahaeyo",
    category: "축하",
    level: "초급",
    definition: "친근한 사이에서 하는 축하 인사",
    definition_ru: "Неформальное поздравление",
  },
  {
    id: "30",
    korean: "힘내세요",
    russian: "Держитесь",
    romanization: "himneseyo",
    category: "응원",
    level: "초급",
    definition: "어려움을 겪는 사람을 격려하는 말",
    definition_ru: "Подбадривание человека в трудной ситуации",
  },
  {
    id: "31",
    korean: "어디 가세요?",
    russian: "Куда вы идёте?",
    romanization: "eodi gaseyo?",
    category: "질문",
    level: "초급",
    definition: "상대방의 목적지를 묻는 질문",
    definition_ru: "Вопрос о том, куда направляется собеседник",
  },
  {
    id: "32",
    korean: "잘 가요",
    russian: "Пока",
    romanization: "jal gayo",
    category: "인사",
    level: "초급",
    definition: "친근한 사이에서 헤어질 때 하는 인사",
    definition_ru: "Неформальное прощание",
  },
  {
    id: "33",
    korean: "들어오세요",
    russian: "Входите",
    romanization: "deureoseyo",
    category: "초대",
    level: "초급",
    definition: "상대방을 안으로 들어오라고 초대하는 말",
    definition_ru: "Приглашение войти",
  },
] as const;

// 카테고리 타입 정의
const CATEGORIES = ["all", "인사", "식사", "안부", "축하", "응원", "질문", "예의", "응답", "초대"] as const;
type Category = (typeof CATEGORIES)[number];

export default function SentencesPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");

  // 실제 카테고리 목록 생성 (sentences 데이터의 카테고리 포함)
  const categories = Array.from(new Set(["all", ...sentences.map(s => s.category)]));

  const filteredSentences = selectedCategory === "all" 
    ? sentences 
    : sentences.filter((s) => s.category === selectedCategory);

  return (
    <PageLayout title="문장" titleRu="Предложения" showBackButton>
      <div className="space-y-6">
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category as Category)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                selectedCategory === category 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">설명: </span>
                    {sentence.definition}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Описание: </span>
                    {sentence.definition_ru}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
