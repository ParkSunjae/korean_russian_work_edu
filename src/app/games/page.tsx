"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Card, CardContent } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Alert, AlertDescription } from "@/components/Alert";
import { Mic, MicOff } from "lucide-react";
import { WORDS } from "@/constants/words";
import type { WordType } from "@/constants/words";
import PageLayout from "@/components/PageLayout";

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

const FallingWordsGame = () => {
  const [gameState, setGameState] = useState<"ready" | "playing" | "ended">("ready");
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(10);
  const [userInput, setUserInput] = useState<string>("");
  const [fallingWords, setFallingWords] = useState<Word[]>([]);
  const [matchedWords, setMatchedWords] = useState<MatchedWordCount[]>([]);
  const [speed, setSpeed] = useState<number>(2000);
  const [level, setLevel] = useState<number>(1);
  const [displayMode, setDisplayMode] = useState<"korean" | "russian" | "pronunciation">("korean");
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");

  const recognition = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognition.current = new SpeechRecognition();
        recognition.current.continuous = true;
        recognition.current.lang = displayMode === "russian" ? "ru-RU" : "ko-KR";

        recognition.current.onresult = (event: any) => {
          const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
          console.log("Raw transcript:", transcript);
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

  const handleVoiceInput = (input: string) => {
    if (!input) return;

    console.log("Voice input received:", input);

    setFallingWords((prev) => {
      const newWords = [...prev];
      const matchIndex = newWords
        .map((word, index) => ({ word, index }))
        .sort((a, b) => b.word.y - a.word.y)
        .find(({ word }) => !word.matched && checkAnswer(input, word))?.index;

      if (matchIndex !== undefined) {
        const matchedWord = newWords[matchIndex];
        newWords[matchIndex] = { ...matchedWord, matched: true };

        setMatchedWords((prev) => {
          const existingWordIndex = prev.findIndex((w) => w.korean === matchedWord.korean && w.russian === matchedWord.russian);

          if (existingWordIndex !== -1) {
            const newMatchedWords = [...prev];
            newMatchedWords[existingWordIndex] = {
              ...newMatchedWords[existingWordIndex],
              count: newMatchedWords[existingWordIndex].count + 1,
              totalScore: newMatchedWords[existingWordIndex].totalScore + 20,
            };
            return newMatchedWords;
          }
          return [...prev, { ...matchedWord, count: 1, totalScore: 20 }];
        });

        setScore((s) => s + 20);

        setTimeout(() => {
          setFallingWords((words) => words.filter((w) => w.id !== matchedWord.id));
        }, 200);
      }
      return newWords;
    });
  };

  const generateWord = useCallback(() => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    let randomX: number = Math.random() * 80 + 10;

    const occupiedAreas = fallingWords.map((word) => ({
      start: word.x - 15,
      end: word.x + 15,
    }));

    let attempts = 0;
    while (occupiedAreas.some((area) => randomX >= area.start && randomX <= area.end) && attempts < 20) {
      randomX = Math.random() * 80 + 10;
      attempts++;
    }

    if (attempts >= 20) {
      return null;
    }

    return {
      ...randomWord,
      x: randomX,
      y: 0,
      id: Date.now(),
    };
  }, []);

  useEffect(() => {
    let gameLoop: NodeJS.Timeout;
    let wordGenerator: NodeJS.Timeout;

    if (gameState === "playing") {
      const generationInterval = Math.max(3000 - level * 200, 1000);

      wordGenerator = setInterval(() => {
        setFallingWords((prev) => {
          const newWord = generateWord();
          if (!newWord) return prev;

          const isOverlapping = prev.some((word) => Math.abs(word.x - newWord.x) < 30);

          return isOverlapping ? prev : [...prev, newWord];
        });
      }, generationInterval);

      gameLoop = setInterval(() => {
        setFallingWords((prev) => {
          return prev
            .map((word) => ({
              ...word,
              y: word.y + 1,
            }))
            .filter((word) => {
              if (word.y >= 90) {
                setLives((lives) => lives - 1);
                return false;
              }
              return true;
            });
        });
      }, speed);
    }

    return () => {
      clearInterval(gameLoop);
      clearInterval(wordGenerator);
    };
  }, [gameState, speed, level, generateWord]);

  useEffect(() => {
    if (lives <= 0) {
      setGameState("ended");
    }
  }, [lives]);

  useEffect(() => {
    const newLevel = Math.floor(score / 20) + 1;
    if (newLevel !== level) {
      setLevel(newLevel);
      setSpeed((prev) => Math.max(prev * 0.9, 500));
    }
  }, [score, level]);

  const startGame = () => {
    setGameState("playing");
    setScore(0);
    setLives(selectedLevel === 1 ? 10 : selectedLevel === 2 ? 7 : 5);
    setFallingWords([]);
    setMatchedWords([]);
    setSpeed(selectedLevel === 1 ? 2000 : selectedLevel === 2 ? 1500 : 1000);
    setLevel(1);
    if (recognition.current) {
      recognition.current.continuous = true;
      recognition.current.start();
      setIsListening(true);
    }
  };

  const endGame = () => {
    setGameState("ended");
    if (recognition.current) {
      recognition.current.stop();
      setIsListening(false);
    }
  };

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

  const handleInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = userInput.trim();
    if (!input) return;

    const matchedWordIndex = fallingWords.findIndex((word) => checkAnswer(input, word));

    if (matchedWordIndex !== -1) {
      const matchedWord = fallingWords[matchedWordIndex];
      setMatchedWords((prev) => [...prev, { ...matchedWord, count: 1, totalScore: 20 }]);
      setScore((prev) => prev + 20);

      setFallingWords((prev) => prev.filter((_, index) => index !== matchedWordIndex));

      if ((score + 20) % 100 === 0) {
        setLives((prev) => prev + 1);
      }
    }

    setUserInput("");
  };

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

  const VoiceStatus = ({ isListening }: { isListening: boolean }) => (
    <div className="flex items-center gap-2 text-sm">
      {isListening ? (
        <>
          <Mic className="w-4 h-4 text-green-500 animate-pulse" />
          <span className="text-green-600">음성 인식 활성화 / Голосовой ввод активен</span>
        </>
      ) : (
        <>
          <MicOff className="w-4 h-4 text-red-500" />
          <span className="text-red-600">음성 인식 비활성화 / Голосовой ввод отключен</span>
        </>
      )}
    </div>
  );

  return (
    <div className="p-2 sm:p-4 bg-gray-50 min-h-screen">
      <Card className="w-full max-w-4xl mx-auto bg-white">
        <CardContent className="p-3 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold text-center mb-4">
            내려오는 단어를 말해서 맞추기
            <span className="block text-lg sm:text-xl text-gray-600 mt-1">Произнесите падающие слова</span>
          </h1>

          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 bg-gray-100 p-3 rounded-lg">
            <div className="grid grid-cols-3 gap-4 w-full sm:flex sm:gap-8 mb-3 sm:mb-0">
              <div className="text-center sm:text-left">
                <div className="text-sm text-gray-600">점수 / Счет</div>
                <div className="text-lg font-bold">{score}</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-sm text-gray-600">목숨 / Жизни</div>
                <div className="text-lg font-bold text-red-500">{lives}</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-sm text-gray-600">레벨 / Уровень</div>
                <div className="text-lg font-bold text-blue-500">{level}</div>
              </div>
            </div>
            <Button onClick={toggleDisplayMode} className="w-full sm:w-auto bg-purple-500 hover:bg-purple-600">
              {displayMode === "korean" ? "한국어" : displayMode === "russian" ? "러시아어" : "발음"}
            </Button>
          </div>

          {gameState === "ready" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">레벨 선택 / Выбор уровня:</label>
              <select value={selectedLevel} onChange={(e) => setSelectedLevel(Number(e.target.value))} className="w-full p-2 border rounded-md text-base">
                <option value={1}>초급 / Начальный</option>
                <option value={2}>중급 / Средний</option>
                <option value={3}>고급 / Продвинутый</option>
              </select>
            </div>
          )}

          <div className="relative h-[50vh] sm:h-96 border-2 border-gray-200 rounded-lg mb-4 overflow-hidden bg-gray-50">
            {fallingWords.map((word) => (
              <div
                key={word.id}
                className={`absolute px-2 sm:px-3 py-1 sm:py-2 bg-white border border-gray-300 rounded shadow-sm transition-all duration-200 text-sm sm:text-base
                  ${word.matched ? "opacity-0 scale-150 text-green-500" : ""}`}
                style={{
                  left: `${word.x}%`,
                  top: `${word.y}%`,
                  transform: "translateX(-50%)",
                }}
              >
                {getDisplayText(word)}
              </div>
            ))}
          </div>

          <div className="space-y-3">
            {gameState === "ready" && (
              <Button onClick={startGame} className="w-full bg-green-500 hover:bg-green-600">
                게임 시작 / Начать игру
              </Button>
            )}

            {gameState === "playing" && (
              <div className="space-y-3">
                <div className="flex flex-col gap-2">
                  <Button onClick={endGame} variant="destructive" className="w-full">
                    게임 종료 / Завершить игру
                  </Button>
                  <VoiceStatus isListening={isListening} />
                </div>
                {transcript && <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">인식된 음성: {transcript} / Распознанный голос</div>}
              </div>
            )}

            {gameState === "ended" && (
              <div className="space-y-3">
                <Alert className="bg-blue-50 border-blue-200">
                  <AlertDescription className="text-center">
                    <div className="font-bold text-lg">게임 종료! / Игра окончена!</div>
                    <div className="text-sm mt-1">
                      최종 점수: {score} / 최고 레벨: {level}
                    </div>
                    <div className="text-sm">
                      Итоговый счет: {score} / Максимальный уровень: {level}
                    </div>
                  </AlertDescription>
                </Alert>
                <Button onClick={startGame} className="w-full bg-green-500 hover:bg-green-600">
                  다시 시작 / Начать заново
                </Button>
              </div>
            )}
          </div>

          <div className="mt-4">
            <h3 className="font-bold mb-2">맞춘 단어 목록 / Список угаданных слов:</h3>
            <div className="flex flex-wrap gap-2 max-h-28 sm:max-h-32 overflow-y-auto p-2 bg-gray-50 rounded-lg">
              {matchedWords.map((word, index) => (
                <div key={index} className="bg-green-100 px-2 py-1 rounded text-xs sm:text-sm flex items-center gap-1 sm:gap-2">
                  <span>
                    {word.korean} - {word.russian}
                  </span>
                  <span className="bg-green-200 px-1.5 py-0.5 rounded-full text-xs">{word.count}회</span>
                  <span className="bg-blue-200 px-1.5 py-0.5 rounded-full text-xs">{word.totalScore}점</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FallingWordsGame;
