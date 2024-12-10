"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import type { TopikTest } from "@/types/topik";

// SVG 아이콘 컴포넌트 정의
const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const VolumeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
);

export default function ExamResultPage() {
  const params = useParams();
  const examId = params.examId as string;
  const searchParams = useSearchParams();
  const answers = JSON.parse(searchParams.get("answers") || "{}");
  const [test, setTest] = useState<TopikTest | null>(null);
  const [score, setScore] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const loadTest = async () => {
      try {
        const formattedExamId = examId.includes("_READ") ? examId.replace(/(\d+)([A-Z])_READ/, "$1_$2_read") : examId.replace(/(\d+)([A-Z])/, "$1_$2");

        const response = await fetch(`/data/topik_questions_${formattedExamId}.json`);

        if (!response.ok) {
          throw new Error("Failed to fetch test data");
        }

        const data: TopikTest = await response.json();
        setTest(data);

        // 점수 계산
        let totalScore = 0;
        data.questions.forEach((question) => {
          if (answers[question.number] === question.correct) {
            totalScore += question.points;
          }
        });
        setScore(totalScore);
      } catch (error) {
        console.error("Failed to load test:", error);
        router.push("/exams");
      }
    };

    if (examId) {
      loadTest();
    }
  }, [examId, answers, router]);

  if (!test) return <div>로딩 중...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <PageHeader title="시험 결과" />

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">총점: {score}점</h2>
              <div className="text-sm text-gray-600">
                총 {test.questions.length}문제 중 {Object.keys(answers).length}문제 응시
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => router.push("/exams")} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                시험 목록으로
              </button>
              <button
                onClick={() => router.push(`/exams/${examId}`)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                다시 풀기
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold">오답 노트</h3>
          {test.questions.map((question) => {
            const isCorrect = answers[question.number] === question.correct;
            if (!isCorrect) {
              return (
                <div key={question.number} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="mb-4">
                    <span className="text-red-500 font-bold">문제 {question.number}</span>
                    <span className="text-gray-500 ml-2">({question.points}점)</span>
                  </div>

                  {/* 문제 내용 */}
                  <div className="mb-4">
                    {/* 듣기 시험 */}
                    {question.type === "dialogue" && (
                      <>
                        {question.dialogue?.map((line, index) => (
                          <div key={index} className="text-gray-700">
                            {line.speaker === "man" ? "남자: " : "여자: "}
                            {line.text}
                          </div>
                        ))}
                        {question.text && <div className="text-gray-700 mt-2">{question.text}</div>}
                      </>
                    )}

                    {/* 읽기 시험 */}
                    {/* 일반 지문 */}
                    {question.type === "passage" && question.passage && <div className="text-gray-700 whitespace-pre-wrap">{question.passage}</div>}

                    {/* 대화문/짧은 지문 */}
                    {question.context && <div className="text-gray-700">{question.context}</div>}

                    {/* 순서 배열 문제 */}
                    {question.type === "sequence" && question.sentences && (
                      <div className="space-y-2">
                        {question.sentences.map((sentence, index) => (
                          <div key={index} className="text-gray-700">
                            ({String.fromCharCode(97 + index)}) {sentence}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 웹페이지 형식 문제 */}
                    {question.type === "webPage" && question.content && (
                      <div className="space-y-2">
                        {question.content.website && <div className="text-sm text-gray-500">{question.content.website}</div>}
                        {question.content.dialog?.map((line, index) => (
                          <div key={index} className="text-gray-700">
                            {line}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 문제 질문 */}
                    {question.question && <div className="text-gray-700 font-medium mt-4">{question.question}</div>}
                  </div>

                  {/* 정답과 오답 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-2">내가 선택한 답</div>
                      <div className="p-3 bg-red-50 border border-red-200 rounded">{question.options[parseInt(answers[question.number]) - 1]}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-2">정답</div>
                      <div className="p-3 bg-green-50 border border-green-200 rounded">{question.options[parseInt(question.correct) - 1]}</div>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}
