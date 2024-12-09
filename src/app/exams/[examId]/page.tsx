"use client";

import { useState, useEffect, useCallback } from "react";
import { Volume2, Clock } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import type { TopikTest, TopikQuestion, TopikExamples } from "@/types/topik";

// 시험 타입별 제한 시간 (분)
const TIME_LIMITS = {
  listening: 40,
  reading: 60,
};

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();
  const examId = params.examId as string;

  const [test, setTest] = useState<TopikTest | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [showingExample, setShowingExample] = useState(true);
  const [examples, setExamples] = useState<TopikExamples | null>(null);
  const [selectedExampleType, setSelectedExampleType] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({}); // 모든 답변 저장
  const [isComplete, setIsComplete] = useState(false); // 시험 완료 여부

  useEffect(() => {
    if (!examId.match(/^\d+[A-Z]$/)) {
      // 예: "91B"
      router.push("/exams");
      return;
    }

    const loadQuestions = async () => {
      try {
        const formattedExamId = examId.replace(/(\d+)([A-Z])/, "$1_$2");
        const response = await fetch(`/data/topik_questions_${formattedExamId}.json`);

        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
          throw new Error("Failed to fetch questions");
        }

        const data = await response.json();
        if (!data.questions || !Array.isArray(data.questions)) {
          throw new Error("Invalid questions data");
        }

        setTest(data);

        const exampleResponse = await fetch(`/data/topik_example_${formattedExamId}.json`);
        if (exampleResponse.ok) {
          const exampleData = await exampleResponse.json();
          setExamples(exampleData);
        }
      } catch (error) {
        console.error("Failed to load questions:", error);
        router.push("/exams");
      } finally {
        setIsLoading(false);
      }
    };

    if (examId) {
      loadQuestions();
    }
  }, [examId, router]);

  // 시험 시작 시간 설정
  useEffect(() => {
    if (test?.testInfo.type) {
      const timeLimit = TIME_LIMITS[test.testInfo.type];
      if (timeLimit) {
        setTimeLeft(timeLimit * 60); // 분을 초로 변환
      }
    }
  }, [test]);

  // 타이머 실행
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // 시간 종료 시 처리
  useEffect(() => {
    if (timeLeft === 0) {
      alert("시험 시간이 종료되었습니다.");
      router.push("/exams");
    }
  }, [timeLeft, router]);

  // 시간을 분:초 형식으로 변환하는 함수
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const currentQuestion = test?.questions[currentQuestionIndex];

  const handlePlayPronunciation = (text: string, language: "ko" | "ru") => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === "ko" ? "ko-KR" : "ru-RU";
    speechSynthesis.speak(utterance);
  };

  const handleAnswerSelect = (optionId: string) => {
    if (!currentQuestion) return;

    setSelectedAnswer(optionId);
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.number]: optionId,
    }));
  };

  const handleNextQuestion = () => {
    if (test && currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  };

  // 현재 문제에 해당하는 예제 찾기
  const getCurrentExample = useCallback(() => {
    if (!examples?.예제문제 || !currentQuestion) return null;

    // 현재 문제 번호에 해당하는 예제 찾기
    for (const key in examples.예제문제) {
      const example = examples.예제문제[key];
      if (example.적용문제.includes(currentQuestion.number)) {
        return {
          ...example,
          exampleNumber: key,
        };
      }
    }
    return null;
  }, [examples, currentQuestion]);

  // 시험 완료 처리
  const handleComplete = () => {
    if (!test || !currentQuestion) return;

    setIsComplete(true);
    router.push(`/exams/${examId}/result?answers=${JSON.stringify(answers)}`);
  };

  if (isLoading) {
    return <div className="text-center py-8">로딩 중...</div>;
  }

  if (!test || !currentQuestion) {
    return <div className="text-center py-8">문제를 불러올 수 없습니다.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <PageHeader title={test.testInfo.name} />

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* 예제 영역 */}
          {getCurrentExample() && (
            <div className="mb-8 bg-gray-50 p-4 rounded-lg">
              <div className="font-bold mb-2">{getCurrentExample()?.exampleNumber}</div>
              <div className="text-sm text-gray-600 mb-4">{getCurrentExample()?.지시문}</div>
              <div className="bg-white p-4 rounded border border-gray-200">
                <div className="mb-4">
                  {(() => {
                    const example = getCurrentExample();
                    if (!example) return null;

                    const { 보기대화 } = example;

                    if (보기대화.대화내용) {
                      return (
                        <div className="space-y-2">
                          <div>{보기대화.대화내용.첫발화}</div>
                          {보기대화.대화내용.마지막발화 && <div>{보기대화.대화내용.마지막발화}</div>}
                        </div>
                      );
                    }

                    if (보기대화.안내문) {
                      return <div>{보기대화.안내문}</div>;
                    }

                    if (보기대화.질문) {
                      return (
                        <div>
                          <div className="mb-2">질문: {보기대화.질문}</div>
                          {보기대화.답변 && <div>답변: {보기대화.답변}</div>}
                        </div>
                      );
                    }

                    return null;
                  })()}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {getCurrentExample()?.보기대화.답변보기.map((option: string, index: number) => (
                    <div key={index} className="text-sm text-gray-600 p-2 bg-gray-50 rounded">
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 시험 정보 및 타이머 */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">
              문제 {currentQuestion.number} / {test.testInfo.totalQuestions}
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">배점: {currentQuestion.points}점</div>
              {timeLeft !== null && (
                <div className={`flex items-center gap-2 font-mono text-lg ${timeLeft < 300 ? "text-red-500" : "text-gray-700"}`}>
                  <Clock className="w-5 h-5" />
                  {formatTime(timeLeft)}
                </div>
              )}
            </div>
          </div>

          {/* 문제 내용 */}
          <div className="space-y-6 mb-8">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                {currentQuestion?.dialogue ? (
                  currentQuestion.dialogue.map((line, index) => (
                    <div key={index} className="text-lg font-medium">
                      {line.speaker === "man" ? "남자: " : "여자: "}
                      {line.text}
                    </div>
                  ))
                ) : currentQuestion?.text ? (
                  <div className="text-lg font-medium">{currentQuestion.text}</div>
                ) : null}
              </div>
              {/* 음성 재생 버튼 */}
              {(() => {
                const text = currentQuestion?.dialogue?.[0]?.text;
                if (!text) return null;

                return (
                  <button onClick={() => handlePlayPronunciation(text, "ko")} className="p-2 rounded-full hover:bg-gray-100">
                    <Volume2 className="w-5 h-5 text-gray-600" />
                  </button>
                );
              })()}
            </div>
          </div>

          {/* 보기 */}
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(String(index + 1))}
                disabled={false}
                className={`w-full p-4 rounded-lg border text-left transition-colors ${
                  selectedAnswer
                    ? index + 1 === parseInt(selectedAnswer)
                      ? "bg-blue-50 border-blue-500"
                      : "bg-gray-50 border-gray-200"
                    : "hover:bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="font-medium">{option}</div>
                </div>
              </button>
            ))}
          </div>

          {/* 다음 문제 버는 완료 버튼 */}
          {selectedAnswer && (
            <div className="mt-6 flex justify-between">
              <button onClick={() => setSelectedAnswer(null)} className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                답변 변경
              </button>
              {currentQuestionIndex < test.questions.length - 1 ? (
                <button
                  onClick={() => {
                    setIsAnswered(true);
                    handleNextQuestion();
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  다음 문제
                </button>
              ) : (
                <button onClick={handleComplete} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  시험 완료
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
