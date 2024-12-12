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

interface ExampleDialog {
  첫발화: string;
  마지막발화?: string;
}

interface ExampleQuestion {
  본문?: string;
  질문?: string;
  대화내용?: ExampleDialog;
  답변보기: string[];
  correct: string | number;
}

interface Example {
  문제번호: string;
  순서: number;
  지시문: string;
  보기대화: ExampleQuestion;
  적용문제: number[];
}

interface TopikExample {
  예제문제: {
    [key: string]: Example;
  };
}

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
    if (!examId.match(/^\d+[A-Z](?:_READ)?$/)) {
      // 91B 또는 91B_READ 형식 허용
      router.push("/exams");
      return;
    }

    const loadQuestions = async () => {
      try {
        // examId에서 _READ가 있는지 확인하여 파일명 결정
        const formattedExamId = examId.includes("_READ")
          ? examId.replace(/(\d+)([A-Z])_READ/, "$1_$2_read") // 91B_READ -> 91_B_read
          : examId.replace(/(\d+)([A-Z])/, "$1_$2"); // 91B -> 91_B

        const response = await fetch(`/data/topik_questions_${formattedExamId}.json`);

        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }

        const data = await response.json();
        if (!data.questions || !Array.isArray(data.questions)) {
          throw new Error("Invalid questions data");
        }

        setTest(data);

        // 예제 데이터도 함께 로드
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

  const handlePlayPronunciation = useCallback(async (text: string, lang: string) => {
    if (!text) return;

    try {
      const audio = new Audio(`/api/tts?text=${encodeURIComponent(text)}&lang=${lang}`);
      await audio.play();
    } catch (error) {
      console.error("Failed to play audio:", error);
      alert("오디오 재생에 실패했습니다.");
    }
  }, []);

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
      // 적용문제 배열이 있는지 확인 후 includes 호출
      if (example?.적용문제?.includes?.(currentQuestion.number)) {
        return {
          ...example,
          exampleNumber: key,
        };
      }
    }
    return null;
  }, [examples, currentQuestion]);

  // 예제 표시 여부 처리
  useEffect(() => {
    if (examples && currentQuestion) {
      // 현재 문제에 해당하는 예제 찾기
      let foundExampleType = null;
      for (const [type, example] of Object.entries(examples.예제문제)) {
        if (example.적용문제.includes(currentQuestion.number)) {
          foundExampleType = type;
          break;
        }
      }

      if (foundExampleType) {
        setSelectedExampleType(foundExampleType);
        setShowingExample(true);
      } else {
        // 해당하는 예제가 없으면 예제 숨기기
        setShowingExample(false);
      }
    }
  }, [currentQuestion, examples]);

  // 시험 완료 처리
  const handleComplete = () => {
    if (!test || !currentQuestion) return;

    setIsComplete(true);
    const answersString = encodeURIComponent(JSON.stringify(answers));
    router.push(`/exams/${examId}/result?answers=${answersString}`);
  };

  const renderExample = (example: Example) => {
    const { 보기대화 } = example;

    return (
      <>
        {/* 보문 표시 */}
        {보기대화.본문 && (
          <div className="text-lg leading-relaxed bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
            {test?.testInfo.type === "listening" && 보기대화.대화내용 ? (
              <>
                <div>{보기대화.대화내용.첫발화}</div>
                {보기대화.대화내용.마지막발화 && <div>{보기대화.대화내용.마지막발화}</div>}
              </>
            ) : (
              보기대화.본문
            )}
          </div>
        )}
        {/* 질문 표시 */}
        {보기대화.질문 && <div className="text-lg font-medium mt-4 p-4 bg-gray-50 rounded-lg">{보기대화.질문}</div>}
        {/* 보기 표시 */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {보기대화.답변보기.map((option: string, index: number) => {
            const isCorrect = String(보기대화.correct) === String(index + 1);
            return (
              <div
                key={index}
                className={`text-sm p-3 rounded-lg transition-colors ${
                  isCorrect ? "bg-blue-50 border border-blue-200 text-blue-700" : "bg-gray-50 text-gray-600"
                }`}
              >
                <span className="mr-2 text-gray-500">({index + 1})</span>
                {option}
              </div>
            );
          })}
        </div>
      </>
    );
  };

  const playTextToSpeech = useCallback(async (text: string, isMale?: boolean) => {
    try {
      // 기존 음성 중지
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ko-KR";
      utterance.rate = 0.9;
      utterance.pitch = 1;

      // 사용 가능한 음성 가져오기
      const voices = window.speechSynthesis.getVoices();
      // 한국어 음성 필터링
      const koreanVoices = voices.filter((voice) => voice.lang.includes("ko"));

      if (koreanVoices.length > 0) {
        // 남성/여성 음성 선택
        if (isMale) {
          // 남성 음성 설정 (pitch를 낮게)
          utterance.pitch = 0.8;
        } else {
          // 여성 음성 설정 (pitch를 높게)
          utterance.pitch = 1.2;
        }
        // 가능한 경우 특정 음성 선택
        utterance.voice = koreanVoices[0];
      }

      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error("TTS 재생 실패:", error);
      alert("음성 재생에 실패했습니다.");
    }
  }, []);

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
            {/* 예제 영역 */}
            {showingExample && examples && selectedExampleType && (
              <div className="mb-8 bg-gray-50 p-4 rounded-lg">
                <div className="font-bold mb-2">{selectedExampleType}</div>
                <div className="text-sm text-gray-600 mb-4">{examples.예제문제[selectedExampleType]?.지시문}</div>
                <div className="bg-white p-4 rounded border border-gray-200">
                  <div className="space-y-4">{examples.예제문제[selectedExampleType] && renderExample(examples.예제문제[selectedExampleType])}</div>
                </div>
              </div>
            )}

            {/* 문제 내용 */}
            <div className="flex justify-between items-start">
              <div className="space-y-4 w-full">
                {/* 읽기 시험 문제 */}
                {test.testInfo.type === "reading" && (
                  <>
                    {/* 지문 */}
                    {currentQuestion.passage && (
                      <div className="text-lg leading-relaxed whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">{currentQuestion.passage}</div>
                    )}

                    {/* 대화문/짧은 지문 */}
                    {currentQuestion.context && <div className="text-lg leading-relaxed bg-gray-50 p-4 rounded-lg">{currentQuestion.context}</div>}
                    {/* 질문 */}
                    {currentQuestion.question && <div className="text-lg font-medium mt-4">{currentQuestion.question}</div>}
                    {/* 순서 배열 문제 */}
                    {currentQuestion.sentences && (
                      <div className="space-y-2">
                        {currentQuestion.sentences.map((sentence, index) => (
                          <div key={index} className="text-lg bg-gray-50 p-3 rounded-lg">
                            ({String.fromCharCode(97 + index)}) {sentence}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 웹페이지 형식 문제 */}
                    {currentQuestion.content && (
                      <div className="space-y-2">
                        {currentQuestion.content.website && <div className="text-sm text-gray-500 mb-2">{currentQuestion.content.website}</div>}
                        {currentQuestion.content.dialog?.map((line, index) => (
                          <div key={index} className="text-lg">
                            {line}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* 듣기 시험 문제 - 기존 코드 유지 */}
                {test.testInfo.type === "listening" && (
                  <div className="flex justify-between items-start">
                    <div className="space-y-4 w-full">
                      {currentQuestion.dialogue?.map((line, index) => (
                        <div key={index} className="text-lg mb-2">
                          {line.speaker === "man" ? "남자: " : "여자: "}
                          {line.text}
                        </div>
                      ))}
                      {currentQuestion.text && <div className="text-lg font-medium mt-4">{currentQuestion.text}</div>}
                    </div>

                    {/* 음성 재생 버튼 수정 */}
                    <button
                      onClick={() => {
                        if (currentQuestion.dialogue) {
                          // 각 대화를 순차적으로 재생
                          currentQuestion.dialogue.forEach((line, index) => {
                            setTimeout(() => {
                              playTextToSpeech(line.text, line.speaker === "man");
                            }, index * 2000); // 각 대사 사이에 2초 간격
                          });
                        } else if (currentQuestion.text) {
                          playTextToSpeech(currentQuestion.text);
                        }
                      }}
                      className="p-3 rounded-full hover:bg-gray-100 transition-colors"
                      aria-label="듣기"
                    >
                      <Volume2 className="w-6 h-6 text-blue-600" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 답안 선택 영역 */}
            <div className="space-y-4 mt-8">
              {currentQuestion?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(String(index + 1))}
                  className={`w-full p-4 rounded-lg border text-left transition-colors ${
                    selectedAnswer
                      ? index + 1 === parseInt(selectedAnswer)
                        ? "bg-blue-50 border-blue-500"
                        : "bg-gray-50 border-gray-200"
                      : "hover:bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-gray-500">{test.testInfo.type === "reading" ? `(${index + 1})` : index + 1}</span>
                    <div className="font-medium whitespace-pre-wrap">{option}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* 다음 문제 버는 완료 버튼 */}
            <div className="flex justify-end mt-8">
              {currentQuestionIndex < (test?.questions.length || 0) - 1 ? (
                <button
                  onClick={handleNextQuestion}
                  disabled={!selectedAnswer}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  다음 문제
                </button>
              ) : (
                <button
                  onClick={handleComplete}
                  disabled={!selectedAnswer}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  시험 완료
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
