"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import { ChevronDown, ChevronUp } from "lucide-react";

const EXAM_CARDS = [
  {
    id: "91B",
    name: "모의시험",
    description: "듣기 통합 (1번 ~ 30번)",
    type: "listening",
    level: "TOPIK I",
    duration: "30분",
    totalQuestions: 30,
  },
  {
    id: "91B_READ",
    name: "모의시험",
    description: "읽기 (31번 ~ 70번)",
    type: "reading",
    level: "TOPIK I",
    duration: "40분",
    totalQuestions: 40,
  },
];

export default function ExamsPage() {
  const router = useRouter();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <PageHeader title="TOPIK 시험 / TOPIK ТЕСТ" />

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">시험 유의사항 / Правила проведения экзамена</h2>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-2">
            <button onClick={() => toggleSection("before")} className="w-full p-4 flex justify-between items-center text-left">
              <h3 className="text-lg font-semibold">시험 시작 전 / До начала экзамена</h3>
              {openSection === "before" ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
            </button>
            {openSection === "before" && (
              <div className="p-4 pt-0 border-t border-gray-200">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-blue-800">신분증 지참 필수 / Обязательно наличие удостоверения личности</h4>
                    <p className="text-gray-800 mb-1">유효한 신분증(여권, 외국인등록증 등)을 반드시 지참해야 하며, 미지참 시 시험 응시가 불가능합니다.</p>
                    <p className="text-sm text-gray-600">
                      Вам необходимо иметь при себе действительное удостоверение личности (паспорт, регистрационная карта иностранца и т.д.). Без него сдача
                      экзамена невозможна.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-800">수험표 확인 / Проверьте экзаменационный лист</h4>
                    <p className="text-gray-800 mb-1">수험표를 통해 본인의 고사장 위치와 수험번호를 확인하시기 바랍니다.</p>
                    <p className="text-sm text-gray-600">Проверьте местоположение вашего экзаменационного зала и номер кандидата на экзаменационном листе.</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-800">전자기기 제출 / Сдайте электронные устройства</h4>
                    <p className="text-gray-800 mb-1">
                      휴대전화, 스마트워치 등 모든 전자기기는 시험 시작 전에 감독관에게 제출해야 합니다. 미제출 시 부정행위로 간주될 수 있습니다.
                    </p>
                    <p className="text-sm text-gray-600">
                      Все электронные устройства, такие как мобильные телефоны и смарт-часы, должны быть сданы экзаменатору до начала экзамена. Несдача может
                      считаться нарушением правил.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-2">
            <button onClick={() => toggleSection("during")} className="w-full p-4 flex justify-between items-center text-left">
              <h3 className="text-lg font-semibold">시험 중 / Во время экзамена</h3>
              {openSection === "during" ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
            </button>
            {openSection === "during" && (
              <div className="p-4 pt-0 border-t border-gray-200">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-blue-800">본인 확인 / Подтверждение личности</h4>
                    <p className="text-gray-800 mb-1">시험 중 신분증을 책상 위에 올려두어야 하며, 감독관의 본인 확인 절차에 협조해야 합니다.</p>
                    <p className="text-sm text-gray-600">
                      Удостоверение личности должно находиться на столе в течение экзамена, и вы должны сотрудничать при проверке личности экзаменатором.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-800">답안 작성 / Заполнение ответов</h4>
                    <p className="text-gray-800 mb-1">
                      감독관이 배부한 필기구만 사용하여 답안을 작성해야 하며, 수정이 필요한 경우 수정테이프를 사용할 수 있습니다.
                    </p>
                    <p className="text-sm text-gray-600">
                      Используйте только письменные принадлежности, предоставленные экзаменатором. При необходимости внесения изменений используйте
                      корректирующую ленту.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-800">부정행위 금지 / Запрещены нарушения правил</h4>
                    <p className="text-gray-800 mb-1">타인의 답안을 보거나, 부정행위 시도 시 해당 시험이 무효 처리되며, 향후 응시 자격이 제한될 수 있습니다.</p>
                    <p className="text-sm text-gray-600">
                      Копирование ответов других участников или попытки нарушения правил приведут к аннулированию экзамена и ограничению на дальнейшее участие.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <button onClick={() => toggleSection("after")} className="w-full p-4 flex justify-between items-center text-left">
              <h3 className="text-lg font-semibold">시험 종료 후 / После завершения экзамена</h3>
              {openSection === "after" ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
            </button>
            {openSection === "after" && (
              <div className="p-4 pt-0 border-t border-gray-200">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-blue-800">답안지 제출 / Сдача бланков ответов</h4>
                    <p className="text-gray-800 mb-1">시험 종료 후 모든 답안지와 문제지를 감독관에게 제출해야 하며, 이를 외부로 반출할 수 없습니다.</p>
                    <p className="text-sm text-gray-600">
                      По завершении экзамена сдайте все бланки ответов и задания экзаменатору. Вынос их за пределы зала запрещен.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-800">퇴실 안내 / Уход из экзаменационного зала</h4>
                    <p className="text-gray-800 mb-1">감독관의 지시에 따라 질서를 유지하며 퇴실해야 합니다.</p>
                    <p className="text-sm text-gray-600">Покидайте экзаменационный зал в соответствии с указаниями экзаменатора, соблюдая порядок.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">예제 시험 안내 / Информация о пробном тесте</h2>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>
                <span className="text-gray-800">듣기 시험 시간은 30분, 읽기 시험 시간은 40분입니다.</span>
                <br />
                <span className="text-sm">Время прослушивания - 30 минут, время чтения - 40 минут.</span>
              </li>
              <li>
                <span className="text-gray-800">듣기 30문항, 읽기 40문항으로 구성되어 있습니다.</span>
                <br />
                <span className="text-sm">Состоит из 30 вопросов на аудирование и 40 вопросов на чтение.</span>
              </li>
              <li>
                <span className="text-gray-800">문제를 다 풀기 전에 시험을 중단하면 진행상황이 저장되지 않습니다.</span>
                <br />
                <span className="text-sm">Если вы прервете тест до его завершения, ваш прогресс не будет сохранен.</span>
              </li>
              <li>
                <span className="text-gray-800">답을 선택한 후 '다음 문제' 버튼을 클릭하면 다음 문제로 이동합니다.</span>
                <br />
                <span className="text-sm">После выбора ответа нажмите кнопку 'Следующий вопрос', чтобы перейти к следующему вопросу.</span>
              </li>
              <li>
                <span className="text-gray-800">마지막 문제에서는 '시험 완료' 버튼이 나타납니다.</span>
                <br />
                <span className="text-sm">На последнем вопросе появится кнопка 'Завершить тест'.</span>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-gray-700 mb-2">
                <span>더 많은 TOPIK 기출문제를 풀어보시려면:</span>
                <br />
                <span className="text-sm">Чтобы решить больше предыдущих тестов TOPIK:</span>
              </p>
              <a
                href="https://www.topik.go.kr/TWSTDY/TWSTDY0080.do"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                <span>TOPIK 기출문제 풀이 바로가기 / Перейти к предыдущим тестам TOPIK</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {EXAM_CARDS.map((exam) => (
            <button
              key={exam.id}
              onClick={() => router.push(`/exams/${exam.id}`)}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-left hover:shadow-md transition-shadow relative"
            >
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-lg font-semibold text-gray-800">{exam.name}</h2>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">{exam.level}</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">{exam.type === "listening" ? "듣기" : "읽기"}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">{exam.description}</p>
              <div className="flex justify-between items-center mt-3 text-sm">
                <span className="text-gray-500">총 {exam.totalQuestions}문항</span>
                <span className="text-gray-500">{exam.duration}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
