"use client";

import { FC, useState, useEffect, useCallback, useRef, memo } from "react";
import { Mic, MicOff } from "lucide-react";
import { WORDS } from "@/constants/words";
import { useSpeechRecognition } from "../useSpeechRecognition";
import { Word, MatchedWordCount } from "../types";
import WordItem from "./WordItem";

const LevelSelector = memo(({ selectedLevel, onLevelSelect }: { selectedLevel: number; onLevelSelect: (level: number) => void }) => (
  <div className="flex justify-center gap-2">
    {[1, 2, 3].map((level) => (
      <button
        key={level}
        onClick={() => onLevelSelect(level)}
        className={`
          px-4 py-2 rounded-lg font-medium transition-colors
          ${selectedLevel === level ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
        `}
      >
        {level === 1 ? "초급" : level === 2 ? "중급" : "고급"}
      </button>
    ))}
  </div>
));

LevelSelector.displayName = "LevelSelector";

const FallingWordsGame: FC = () => {
  const [gameState, setGameState] = useState<"ready" | "playing" | "paused" | "ended">("ready");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(10);
  const [fallingWords, setFallingWords] = useState<Word[]>([]);
  const [matchedWords, setMatchedWords] = useState<MatchedWordCount[]>([]);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [transcript, setTranscript] = useState("");
  const [lastRecognized, setLastRecognized] = useState<{
    text: string;
    timestamp: number;
    matched: boolean;
    matchedWord: string | null;
  } | null>(null);

  const { isListening, startListening, stopListening } = useSpeechRecognition();

  const handleVoiceInput = useCallback(
    (input: string) => {
      if (!input || gameState !== "playing") return;

      const normalizedInput = input.toLowerCase().trim();
      console.log("Voice Input:", normalizedInput);

      let matched = false;
      let matchedWord: Word | null = null;

      setFallingWords((prev) => {
        const matchingWordIndex = prev.findIndex((word) => {
          if (word.matched) return false;

          const normalizedKorean = word.korean.toLowerCase().trim();
          const isMatch = normalizedInput === normalizedKorean || (normalizedInput.length >= 2 && normalizedKorean.includes(normalizedInput));

          if (isMatch) {
            matched = true;
            matchedWord = word;
            return true;
          }
          return false;
        });

        if (matchingWordIndex === -1) {
          setLastRecognized({
            text: input,
            timestamp: Date.now(),
            matched: false,
            matchedWord: null,
          });
          return prev;
        }

        const points = 10;
        setScore((s) => s + points);

        setMatchedWords((prevMatched) => {
          const existingIndex = prevMatched.findIndex((w) => w.korean === matchedWord?.korean);
          if (existingIndex !== -1) {
            return prevMatched.map((w, i) => (i === existingIndex ? { ...w, count: w.count + 1, totalScore: w.totalScore + points } : w));
          }
          return matchedWord ? [...prevMatched, { ...matchedWord, count: 1, totalScore: points }] : prevMatched;
        });

        setLastRecognized({
          text: input,
          timestamp: Date.now(),
          matched: true,
          matchedWord: matchedWord?.korean || null,
        });

        return prev.filter((_, index) => index !== matchingWordIndex);
      });
    },
    [gameState]
  );

  const togglePause = useCallback(() => {
    if (gameState === "playing") {
      stopListening();
      setGameState("paused");
    } else if (gameState === "paused") {
      setGameState("playing");
    }
  }, [gameState, stopListening]);

  useEffect(() => {
    if (gameState === "playing") {
      startListening((text, isFinal) => {
        setTranscript(text);
        if (isFinal) {
          handleVoiceInput(text);
          setTranscript("");
        }
      });
    } else {
      stopListening();
      setTranscript("");
    }
  }, [gameState, startListening, stopListening, handleVoiceInput]);

  const startGame = useCallback(() => {
    setGameState("playing");
    setScore(0);
    setLives(selectedLevel === 1 ? 10 : selectedLevel === 2 ? 7 : 5);
    setFallingWords([]);
    setMatchedWords([]);
    setTranscript("");
    setLastRecognized(null);
  }, [selectedLevel]);

  const endGame = useCallback(() => {
    stopListening();
    setGameState("ended");
    setTranscript("");
    setLastRecognized(null);
  }, [stopListening]);

  const RecognitionResult = ({
    result,
  }: {
    result: {
      text: string;
      timestamp: number;
      matched: boolean;
      matchedWord: string | null;
    } | null;
  }) => {
    if (!result) return null;

    return (
      <div
        className={`
          px-4 py-2 rounded-lg text-sm font-medium
          ${result.matched ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
          transition-all duration-300
        `}
      >
        <span className="font-bold">입력: </span>
        {result.text}
        {result.matched && result.matchedWord && (
          <>
            <span className="mx-2">→</span>
            <span className="font-bold">{result.matchedWord}</span>
          </>
        )}
        {result.matched ? " ✓" : " ✗"}
      </div>
    );
  };

  useEffect(() => {
    let gameLoop: NodeJS.Timeout;
    let wordGenerator: NodeJS.Timeout;

    if (gameState === "playing") {
      wordGenerator = setInterval(() => {
        setFallingWords((prev) => {
          if (prev.length >= 5) return prev;

          const newWord = {
            ...WORDS[Math.floor(Math.random() * WORDS.length)],
            x: Math.random() * 80 + 10,
            y: 0,
            id: Date.now(),
            matched: false,
          };

          if (prev.some((word) => word.korean === newWord.korean)) {
            return prev;
          }

          return [...prev, newWord];
        });
      }, 2000);

      gameLoop = setInterval(() => {
        setFallingWords((prev) => {
          return prev
            .map((word) => ({
              ...word,
              y: word.y + 0.5,
            }))
            .filter((word) => {
              if (word.y >= 90) {
                setLives((l) => l - 1);
                return false;
              }
              return true;
            });
        });
      }, 50);
    }

    return () => {
      clearInterval(gameLoop);
      clearInterval(wordGenerator);
    };
  }, [gameState]);

  useEffect(() => {
    if (lives <= 0) {
      endGame();
    }
  }, [lives, endGame]);

  const handleLevelSelect = useCallback(
    (level: number) => {
      if (gameState === "playing" || gameState === "paused") return;
      setSelectedLevel(level);
    },
    [gameState]
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="space-y-6 mb-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="text-gray-600 mb-1">점수</div>
            <div className="text-2xl font-bold text-blue-600">{score}</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="text-gray-600 mb-1">목숨</div>
            <div className="text-2xl font-bold text-blue-600">{lives}</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="text-gray-600 mb-1">마이크</div>
            <div className="text-blue-600">{isListening ? <Mic className="mx-auto w-6 h-6" /> : <MicOff className="mx-auto w-6 h-6" />}</div>
          </div>
        </div>

        <div className="text-center">
          <div className="text-sm text-gray-600 mb-3">난이도</div>
          <LevelSelector selectedLevel={selectedLevel} onLevelSelect={handleLevelSelect} />
        </div>
      </div>

      {gameState === "ready" ? (
        <div className="text-center py-8">
          <button onClick={startGame} className="px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-xl hover:bg-blue-700 transition-colors">
            게임 시작
          </button>
        </div>
      ) : gameState === "playing" || gameState === "paused" ? (
        <div>
          <div className="relative h-[60vh] border-2 border-blue-100 rounded-xl bg-gradient-to-b from-blue-50 to-white overflow-hidden">
            {gameState === "paused" && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                <div className="text-white text-3xl font-bold">일시정지</div>
              </div>
            )}
            {fallingWords.map((word) => (
              <WordItem key={word.id} word={word} />
            ))}
          </div>
          <div className="mt-6 space-y-4">
            {transcript && gameState === "playing" && (
              <div className="px-6 py-3 bg-blue-50 rounded-xl text-sm">
                <span className="font-medium text-blue-700">인식 중: </span>
                <span className="text-gray-700">{transcript}</span>
              </div>
            )}
            <div className="flex justify-between items-center gap-4">
              <div className="flex-1">
                <RecognitionResult result={lastRecognized} />
              </div>
              <div className="flex gap-3">
                <button onClick={togglePause} className="px-6 py-3 bg-yellow-500 text-white font-medium rounded-xl hover:bg-yellow-600 transition-colors">
                  {gameState === "paused" ? "계속하기" : "일시정지"}
                </button>
                <button onClick={endGame} className="px-6 py-3 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 transition-colors">
                  종료
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">게임 종료!</h2>
          <p className="text-lg text-gray-600 mb-6">최종 점수: {score}</p>
          <button onClick={startGame} className="px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-xl hover:bg-blue-700 transition-colors">
            다시 시작
          </button>
        </div>
      )}
    </div>
  );
};

export default FallingWordsGame;
