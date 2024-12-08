"use client";

import { useState, useEffect, useCallback } from "react";
import { Mic, MicOff, Pause, Play, X } from "lucide-react";
import WordItem from "@/app/games/components/WordItem";
import type { Word } from "@/types/prisma";
import type { GameWord } from "@/app/games/types";
import { useSpeechRecognition } from "@/app/games/useSpeechRecognition";

interface GameBoardProps {
  words: Word[];
}

export default function GameBoard({ words }: GameBoardProps) {
  const [gameWords, setGameWords] = useState<GameWord[]>([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(20);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [difficulty, setDifficulty] = useState<"easy" | "normal" | "hard">("normal");
  const [recognizedText, setRecognizedText] = useState("");

  const createGameWord = useCallback(
    (word: Word): GameWord => ({
      ...word,
      x: Math.random() * 80 + 10,
      y: -10,
      matched: false,
      speed: Math.random() * (0.5 * level) + 0.5,
    }),
    [level]
  );

  const startGame = useCallback(() => {
    setIsPlaying(true);
    setIsPaused(false);
    setScore(0);
    setLevel(1);
    setLives(20);
    setGameWords([]);
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => {
      if (!prev) {
        setIsMicOn(false);
      }
      return !prev;
    });
  }, []);

  const endGame = useCallback(() => {
    setIsPlaying(false);
    setIsPaused(false);
    setGameWords([]);
    setIsMicOn(false);
  }, []);

  const handleWordMatch = useCallback(
    (matchedWord: GameWord) => {
      setGameWords((prev) => prev.map((word) => (word.id === matchedWord.id ? { ...word, matched: true } : word)));
      setScore((prev) => prev + (difficulty === "easy" ? 5 : difficulty === "normal" ? 10 : 15));
    },
    [difficulty]
  );

  const handleSpeechResult = useCallback((text: string) => {
    setRecognizedText(text);

    // 음성 인식된 텍스트 전처리 (한글만 추출)
    const cleanedText = text.trim()
      .replace(/[^가-힣]/g, '')  // 한글이 아닌 문자 모두 제거
      .toLowerCase();

    if (!cleanedText) return;

    // 현재 화면의 모든 단어와 매칭 시도
    setGameWords(prev => {
      let matched = false;
      return prev.map(word => {
        if (word.matched) return word;

        // 게임 단어 전처리
        const cleanedWord = word.korean.trim()
          .replace(/[^가-힣]/g, '')
          .toLowerCase();

        // 매칭 조건 확인
        const isExactMatch = cleanedText === cleanedWord;
        const isPartialMatch = cleanedWord.includes(cleanedText) || 
                              cleanedText.includes(cleanedWord);
        const isMatch = isExactMatch || isPartialMatch;

        if (isMatch && !matched) {
          matched = true;
          handleWordMatch(word);  // 점수 증가 등 처리
          return { ...word, matched: true };
        }
        return word;
      });
    });
  }, [handleWordMatch]);

  const { startListening, stopListening } = useSpeechRecognition({
    onResult: handleSpeechResult,
    language: "ko-KR",
  });

  // 마이크 토글 시 음성 인식 시작/중지
  const toggleMic = useCallback(() => {
    setIsMicOn((prev) => {
      const newState = !prev;
      if (newState) {
        startListening();
      } else {
        stopListening();
        setRecognizedText("");
      }
      return newState;
    });
  }, [startListening, stopListening]);

  // 게임 종료나 일시정지 시 음성 인식 중지
  useEffect(() => {
    if (!isPlaying || isPaused) {
      stopListening();
      setRecognizedText("");
    }
  }, [isPlaying, isPaused, stopListening]);

  useEffect(() => {
    if (!isPlaying || isPaused) return;

    const interval = setInterval(() => {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setGameWords((prev) => [...prev, createGameWord(randomWord)]);
    }, 2000 / level); // 레벨이 올라갈수록 단어가 더 자주 생성됨

    return () => clearInterval(interval);
  }, [isPlaying, isPaused, words, createGameWord, level]);

  useEffect(() => {
    if (!isPlaying || isPaused) return;

    const interval = setInterval(() => {
      setGameWords((prev) => {
        const newWords = prev
          .map((word) => ({
            ...word,
            y: word.y + word.speed,
          }))
          .filter((word) => !word.matched);

        // 화면 아래로 벗어난 단어 처리
        const missedWords = newWords.filter((word) => word.y >= 100);
        if (missedWords.length > 0) {
          setLives((prev) => {
            const newLives = prev - missedWords.length;
            if (newLives <= 0) endGame();
            return Math.max(0, newLives);
          });
        }

        return newWords.filter((word) => word.y < 100);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying, isPaused, endGame]);

  // 점수에 따른 레벨 업
  useEffect(() => {
    setLevel(Math.floor(score / 100) + 1);
  }, [score]);

  return (
    <div className="relative w-full h-[600px] bg-gray-100 rounded-lg overflow-hidden">
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <div className="text-xl font-bold">레벨: {level}</div>
          <div className="text-xl font-bold">점수: {score}</div>
          <div className="text-xl font-bold">목숨: {lives}</div>
        </div>
        <div className="flex gap-2">
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as "easy" | "normal" | "hard")}
            className="px-2 py-1 rounded border"
            disabled={isPlaying}
          >
            <option value="easy">쉬움</option>
            <option value="normal">보통</option>
            <option value="hard">어려움</option>
          </select>
          {isPlaying && !isPaused && (
            <button onClick={toggleMic} className="p-2 rounded bg-white hover:bg-gray-100">
              {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>
          )}
          {isPlaying && (
            <>
              <button onClick={togglePause} className="p-2 rounded bg-white hover:bg-gray-100">
                {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
              </button>
              <button onClick={endGame} className="p-2 rounded bg-white hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>

      {(!isPlaying || isPaused) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <button onClick={startGame} className="px-6 py-3 bg-blue-500 text-white text-lg font-bold rounded-lg hover:bg-blue-600 transition-colors">
            {!isPlaying ? "게임 시작" : "계속하기"}
          </button>
        </div>
      )}

      {gameWords.map((word) => (
        <WordItem key={word.id} word={word} onMatch={handleWordMatch} />
      ))}

      {isMicOn && (
        <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded-lg p-3 shadow-lg">
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-1">인식된 음성:</div>
            <div className="text-lg font-medium">{recognizedText || "말해보세요..."}</div>
          </div>
        </div>
      )}
    </div>
  );
}
