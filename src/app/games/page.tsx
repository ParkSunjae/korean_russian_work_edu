"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

const WORDS = [
  { korean: "나무", russian: "Дерево", romanization: "namu" },
  { korean: "하늘", russian: "Небо", romanization: "haneul" },
  { korean: "바람", russian: "Ветер", romanization: "baram" },
  { korean: "지구본", russian: "Глобус", romanization: "jigubon" },
  { korean: "책상", russian: "Стол", romanization: "chaeksang" },
  { korean: "희귀", russian: "Редкий", romanization: "huigwi" },
  { korean: "전문", russian: "Специалист", romanization: "jeonmun" },
];

interface Word {
  korean: string;
  russian: string;
  romanization: string;
  x: number;
  y: number;
  id: number;
}

const FallingWordsGame = () => {
  const [gameState, setGameState] = useState<"ready" | "playing" | "ended">("ready");
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(10);
  const [userInput, setUserInput] = useState<string>("");
  const [fallingWords, setFallingWords] = useState<Word[]>([]);
  const [matchedWords, setMatchedWords] = useState<Word[]>([]);
  const [speed, setSpeed] = useState<number>(2000);
  const [level, setLevel] = useState<number>(1);
  const [displayMode, setDisplayMode] = useState<"korean" | "russian" | "romanization">("korean");
  const [selectedLevel, setSelectedLevel] = useState<number>(1);

  const generateWord = useCallback(() => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    const randomX = Math.random() * 80 + 10;
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
      wordGenerator = setInterval(() => {
        setFallingWords((prev) => [...prev, generateWord()]);
      }, 3000);

      gameLoop = setInterval(() => {
        setFallingWords((prev) => {
          const newWords = prev
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
          return newWords;
        });
      }, speed);
    }

    return () => {
      clearInterval(gameLoop);
      clearInterval(wordGenerator);
    };
  }, [gameState, speed, generateWord]);

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
    setLives(selectedLevel === 1 ? 10 : selectedLevel === 2 ? 7 : 5); // 레벨에 따른 목숨 설정
    setFallingWords([]);
    setMatchedWords([]);
    setSpeed(selectedLevel === 1 ? 2000 : selectedLevel === 2 ? 1500 : 1000); // 레벨에 따른 속도 설정
    setLevel(1);
  };

  const endGame = () => {
    setGameState("ended");
  };

  const checkAnswer = (input: string, word: Word) => {
    const normalizedInput = input.toLowerCase().trim();
    const normalizedKorean = word.korean.toLowerCase();
    const normalizedRussian = word.russian.toLowerCase();
    const normalizedRomanization = word.romanization.toLowerCase();

    return normalizedInput === normalizedKorean || normalizedInput === normalizedRussian || normalizedInput === normalizedRomanization;
  };

  const handleInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = userInput.trim();
    if (!input) return;

    const matchedWordIndex = fallingWords.findIndex((word) => checkAnswer(input, word));

    if (matchedWordIndex !== -1) {
      const matchedWord = fallingWords[matchedWordIndex];
      setMatchedWords((prev) => [...prev, matchedWord]);
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
          return "romanization";
        default:
          return "korean";
      }
    });
  };

  const getDisplayText = (word: Word) => {
    switch (displayMode) {
      case "korean":
        return `${word.korean} (${word.russian})`;
      case "russian":
        return `${word.russian} (${word.korean})`;
      case "romanization":
        return `${word.romanization} (${word.korean}, ${word.russian})`;
      default:
        return `${word.korean} (${word.russian})`;
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <Card className="w-full max-w-4xl mx-auto bg-white">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold text-center mb-6">내려오는 단어 맞추기 / Угадай падающее слово</h1>
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 bg-gray-100 p-4 rounded-lg">
            <div className="flex gap-8">
              <div className="text-lg font-bold">점수: {score} / Счет</div>
              <div className="text-lg font-bold text-red-500">목숨: {lives} / Жизни</div>
              <div className="text-lg font-bold text-blue-500">레벨: {level} / Уровень</div>
            </div>
            <Button onClick={toggleDisplayMode} className="bg-purple-500 hover:bg-purple-600 mt-4 md:mt-0">
              {displayMode === "korean" ? "한국어" : displayMode === "russian" ? "러시아어" : "로마자"}
            </Button>
          </div>

          {gameState === "ready" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">레벨 선택 / Выбор уровня:</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(Number(e.target.value))}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value={1}>초급 / Начальный</option>
                <option value={2}>중급 / Средний</option>
                <option value={3}>고급 / Продвинутый</option>
              </select>
            </div>
          )}

          <div className="relative h-96 border-2 border-gray-200 rounded-lg mb-4 overflow-hidden bg-gray-50">
            {fallingWords.map((word) => (
              <div
                key={word.id}
                className="absolute px-3 py-2 bg-white border border-gray-300 rounded shadow-sm"
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

          <div className="space-y-4">
            {gameState === "ready" && (
              <Button onClick={startGame} className="w-full bg-green-500 hover:bg-green-600">
                게임 시작 / Начать игру
              </Button>
            )}

            {gameState === "playing" && (
              <div className="space-y-4">
                <form onSubmit={handleInput} className="flex gap-2">
                  <Input
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="단어를 입력하세요 (한국어/러시아어/로마자) / Введите слово (корейский/русский/романизация)"
                    className="flex-1"
                    autoFocus
                  />
                  <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                    입력 / Ввод
                  </Button>
                  <Button onClick={endGame} variant="destructive">
                    게임 종료 / Завершить игру
                  </Button>
                </form>
              </div>
            )}

            {gameState === "ended" && (
              <div className="space-y-4">
                <Alert className="bg-blue-50 border-blue-200">
                  <AlertDescription className="text-center text-lg font-bold">
                    게임 종료! 최종 점수: {score} / 최고 레벨: {level} / Игра окончена! Итоговый счет: {score} / Максимальный уровень: {level}
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
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 bg-gray-50 rounded-lg">
              {matchedWords.map((word, index) => (
                <div key={index} className="bg-green-100 px-3 py-2 rounded text-sm">
                  {word.korean} - {word.russian} ({word.romanization})
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
