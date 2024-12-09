"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import type { TopikTest } from "@/types/topik";

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
        const response = await fetch(`/data/topik_questions_${examId}.json`);
        if (!response.ok) throw new Error("Failed to fetch test data");

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
          <h2 className="text-2xl font-bold mb-4">총점: {score}점</h2>
          <div className="text-sm text-gray-600">
            총 {test.questions.length}문제 중 {Object.keys(answers).length}문제 응시
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
                    {question.dialogue?.map((line, index) => (
                      <div key={index} className="text-gray-700">
                        {line.speaker === "man" ? "남자: " : "여자: "}
                        {line.text}
                      </div>
                    ))}
                    {question.text && <div className="text-gray-700">{question.text}</div>}
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
