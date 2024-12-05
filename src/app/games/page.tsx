"use client";

import { Mic, MicOff, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import { WORDS } from "@/constants/words";
import type { WordType } from "@/constants/words";

interface Word extends WordType {
  x: number;
  y: number;
  id: number;
  matched?: boolean;
}

interface MatchedWordCount extends Word {
  count: number;
  totalScore: number;
}

export default function FallingWordsGame() {
  const router = useRouter();
  const [gameState, setGameState] = useState<"ready" | "playing" | "ended">("ready");
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(10);
  const [fallingWords, setFallingWords] = useState<Word[]>([]);
  const [matchedWords, setMatchedWords] = useState<MatchedWordCount[]>([]);
  const [speed, setSpeed] = useState<number>(2000);
  const [level, setLevel] = useState<number>(1);
  const [displayMode, setDisplayMode] = useState<"korean" | "russian" | "pronunciation">("korean");
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");

  const recognition = useRef<any>(null);
  // Speech Recognition 설정
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognition.current = new SpeechRecognition();
        recognition.current.continuous = true;
        recognition.current.lang = displayMode === "russian" ? "ru-RU" : "ko-KR";

        recognition.current.onresult = (event: any) => {
          const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
          setTranscript(transcript);
          handleVoiceInput(transcript);
        };

        recognition.current.onend = () => {
          if (gameState === "playing") {
            recognition.current.start();
          }
        };
      }
    }
  }, [displayMode, gameState]);

  // 게임 시작 함수
  const startGame = () => {
    setGameState("playing");
    setScore(0);
    setFallingWords([]); // 기존 단어들 초기화
    setMatchedWords([]);

    // 난이도에 따른 초기 설정
    const difficultySettings: { [key: number]: { lives: number; speed: number } } = {
      1: { lives: 10, speed: 2000 },
      2: { lives: 7, speed: 1500 },
      3: { lives: 5, speed: 1000 },
    };

    setLives(difficultySettings[selectedLevel].lives);
    setSpeed(difficultySettings[selectedLevel].speed);
    setLevel(1);

    // 음성 인식 시작
    if (recognition.current) {
      recognition.current.continuous = true;
      recognition.current.start();
      setIsListening(true);
    }
  };

  // 게임 종료 함수
  const endGame = () => {
    setGameState("ended");
    if (recognition.current) {
      recognition.current.stop();
      setIsListening(false);
    }
  };

  const generateWord = useCallback(() => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    const randomX = Math.random() * 80 + 10; // 화면 가로 범위 내에서 랜덤 위치
    return {
      ...randomWord,
      x: randomX,
      y: 0,
      id: Date.now(),
      matched: false,
    };
  }, []);

  // 음성 입력 처리 함수
  const handleVoiceInput = (input: string) => {
    if (!input) return;

    setFallingWords((prev) => {
      const newWords = [...prev];
      const matchIndex = newWords
        .map((word, index) => ({ word, index }))
        .sort((a, b) => b.word.y - a.word.y)
        .find(({ word }) => !word.matched && checkAnswer(input, word))?.index;

      if (matchIndex !== undefined) {
        const matchedWord = newWords[matchIndex];
        newWords[matchIndex] = { ...matchedWord, matched: true };

        // 점수 계산
        const points = calculatePoints(matchedWord.y);

        setMatchedWords((prev) => {
          const existingWordIndex = prev.findIndex((w) => w.korean === matchedWord.korean && w.russian === matchedWord.russian);

          if (existingWordIndex !== -1) {
            const updatedWords = [...prev];
            const existingWord = updatedWords[existingWordIndex];
            updatedWords[existingWordIndex] = {
              ...existingWord,
              count: existingWord.count + 1,
              totalScore: existingWord.totalScore + points,
            };
            return updatedWords;
          }

          return [
            ...prev,
            {
              ...matchedWord,
              count: 1,
              totalScore: points,
              id: matchedWord.id,
              x: matchedWord.x,
              y: matchedWord.y,
            },
          ];
        });

        setScore((prev) => prev + points);

        setTimeout(() => {
          setFallingWords((words) => words.filter((w) => w.id !== matchedWord.id));
        }, 200);
      }

      return newWords;
    });
  };

  // 답변 확인 함수
  const checkAnswer = (input: string, word: Word) => {
    const normalizedInput = input.toLowerCase().trim();
    const normalizedKorean = word.korean.toLowerCase().trim();
    const normalizedRussian = word.russian.toLowerCase().trim();
    const normalizedPronunciation = word.pronunciation.toLowerCase().trim();

    const cleanRussian = normalizedRussian.replace("ё", "е");

    return (
      normalizedInput === normalizedKorean ||
      normalizedInput === cleanRussian ||
      normalizedInput === normalizedPronunciation ||
      normalizedKorean.includes(normalizedInput) ||
      cleanRussian.includes(normalizedInput) ||
      normalizedPronunciation.includes(normalizedInput)
    );
  };

  // 점수 계산 함수
  const calculatePoints = (yPosition: number): number => {
    if (yPosition < 30) return 30;
    if (yPosition < 60) return 20;
    return 10;
  };

  // 게임 루프 최적화
  useEffect(() => {
    let gameLoop: NodeJS.Timeout;
    let wordGenerator: NodeJS.Timeout;

    if (gameState === "playing") {
      // 단어 생성 주기
      wordGenerator = setInterval(() => {
        setFallingWords((prev) => {
          if (prev.length >= 8) return prev;
          const newWord = generateWord();
          return [...prev, newWord];
        });
      }, 2000);

      // 단어 낙하 주기
      gameLoop = setInterval(() => {
        setFallingWords((prev) =>
          prev
            .map((word) => ({
              ...word,
              y: word.y + 0.5, // 낙하 속도 조정
            }))
            .filter((word) => {
              if (word.y >= 90 && !word.matched) {
                setLives((lives) => lives - 1);
                return false;
              }
              return word.y < 100;
            })
        );
      }, 16); // 60fps에 가까운 부드러운 애니메이션을 위해 16ms 간격 사용
    }

    return () => {
      clearInterval(gameLoop);
      clearInterval(wordGenerator);
    };
  }, [gameState, generateWord]);

  // 목숨 감시
  useEffect(() => {
    if (lives <= 0) {
      endGame();
    }
  }, [lives]);

  // 레벨 업데이트
  useEffect(() => {
    const newLevel = Math.floor(score / 100) + 1;
    if (newLevel !== level) {
      setLevel(newLevel);
      setSpeed((prev) => Math.max(prev * 0.9, 500));
    }
  }, [score, level]);
  const toggleDisplayMode = () => {
    setDisplayMode((current) => {
      switch (current) {
        case "korean":
          return "russian";
        case "russian":
          return "pronunciation";
        default:
          return "korean";
      }
    });
  };

  const getDisplayText = (word: Word) => {
    switch (displayMode) {
      case "korean":
        return `${word.korean} ${word.pronunciation} (${word.russian})`;
      case "russian":
        return `${word.russian} (${word.korean} ${word.pronunciation})`;
      case "pronunciation":
        return `${word.pronunciation} (${word.korean}, ${word.russian})`;
      default:
        return `${word.korean} ${word.pronunciation} (${word.russian})`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-[1400px] mx-auto px-4">
        {/* 헤더 섹션 */}
        <div className="mb-6">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-3 transition-colors duration-200">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">뒤로 가기</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">단어 게임</h1>
          <p className="mt-2 text-gray-600">내려오는 단어를 말하면서 학습해보세요.</p>
          <p className="mt-1 text-gray-500">Учите слова, произнося падающие слова.</p>
        </div>

        {/* 게임 컨테이너 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* 게임 상태 표시 */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-sm text-gray-600">점수 / Счет</div>
                <div className="text-2xl font-bold text-indigo-600">{score}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600">목숨 / Жизни</div>
                <div className="text-2xl font-bold text-red-600">{lives}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600">레벨 / Уровень</div>
                <div className="text-2xl font-bold text-green-600">{level}</div>
              </div>
              <button
                onClick={toggleDisplayMode}
                className="hidden sm:block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                {displayMode === "korean" ? "한국어" : displayMode === "russian" ? "러시아어" : "발음"}
              </button>
            </div>
          </div>

          {gameState === "ready" && (
            <div className="p-6">
              <div className="max-w-md mx-auto space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">난이도 선택 / Выбор уровня</label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value={1}>초급 / Начальный</option>
                    <option value={2}>중급 / Средний</option>
                    <option value={3}>고급 / Продвинутый</option>
                  </select>
                </div>
                <button onClick={startGame} className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  게임 시작 / Начать игру
                </button>
              </div>
            </div>
          )}

          {/* 게임 화면 */}
          {gameState === "playing" && (
            <div className="p-4">
              {/* 음성 인식 상태 */}
              <div className="mb-4 flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <VoiceStatus isListening={isListening} />
                <button onClick={endGame} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  게임 종료 / Завершить
                </button>
              </div>

              {/* 게임 영역 */}
              <div className="relative h-[60vh] border-2 border-gray-200 rounded-lg bg-gray-50">
                {fallingWords.map((word) => (
                  <div
                    key={word.id}
                    className={`absolute px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm 
    transition-all duration-200 transform -translate-x-1/2
    ${word.matched ? "opacity-0 scale-150 text-green-600" : ""}`}
                    style={{
                      left: `${word.x}%`,
                      top: `${word.y}%`,
                      transition: "top 16ms linear", // 부드러운 낙하 움직임
                    }}
                  >
                    {getDisplayText(word)}
                  </div>
                ))}
              </div>

              {/* 음성 인식 결과 */}
              {transcript && <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">인식된 음성 / Распознанный голос: {transcript}</div>}
            </div>
          )}

          {/* 게임 종료 화면 */}
          {gameState === "ended" && (
            <div className="p-6">
              <div className="max-w-md mx-auto space-y-6">
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 text-center">
                  <h2 className="text-2xl font-bold text-indigo-900 mb-2">게임 종료! / Игра окончена!</h2>
                  <p className="text-indigo-700">
                    최종 점수: {score} / Итоговый счет: {score}
                  </p>
                  <p className="text-indigo-700">
                    최고 레벨: {level} / Максимальный уровень: {level}
                  </p>
                </div>
                <button onClick={startGame} className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  다시 시작 / Начать заново
                </button>
              </div>
            </div>
          )}

          {/* 맞춘 단어 목록 */}
          <div className="p-4 border-t border-gray-200">
            <h3 className="font-bold mb-2">맞춘 단어 목록 / Список угаданных слов:</h3>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-3 bg-gray-50 rounded-lg">
              {matchedWords.map((word, index) => (
                <div key={index} className="bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-sm flex items-center gap-2">
                  <span className="text-gray-900">
                    {word.korean} - {word.russian}
                  </span>
                  <span className="bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full text-xs">{word.count}회</span>
                  <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full text-xs">{word.totalScore}점</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// VoiceStatus 컴포넌트
function VoiceStatus({ isListening }: { isListening: boolean }) {
  return (
    <div className="flex items-center gap-2">
      {isListening ? (
        <>
          <Mic className="w-5 h-5 text-green-500 animate-pulse" />
          <span className="text-green-600 text-sm">음성 인식 활성화 / Голосовой ввод активен</span>
        </>
      ) : (
        <>
          <MicOff className="w-5 h-5 text-red-500" />
          <span className="text-red-600 text-sm">음성 인식 비활성화 / Голосовой ввод отключен</span>
        </>
      )}
    </div>
  );
}
