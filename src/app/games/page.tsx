"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Alert, AlertDescription } from "@/components/Alert";
import { Mic, MicOff } from "lucide-react";
import { WORDS } from "@/constants/words";
import type { WordType } from "@/constants/words";
import PageLayout from '@/components/PageLayout';

interface GameWord extends WordType {
  x: number;
  y: number;
  id: number;
  matched?: boolean;
}

interface MatchedWordCount extends GameWord {
  count: number;
  totalScore: number;
}

export default function GamesPage() {
  const [gameState, setGameState] = useState<"ready" | "playing" | "ended">("ready");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [level, setLevel] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [speed, setSpeed] = useState(2000);
  const [fallingWords, setFallingWords] = useState<GameWord[]>([]);
  const [matchedWords, setMatchedWords] = useState<MatchedWordCount[]>([]);
  const [displayMode, setDisplayMode] = useState<"korean" | "russian" | "romanization">("korean");
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognition = useRef<any>(null);

  const startGame = () => {
    setGameState("playing");
    setScore(0);
    
    // 레벨별 초기 설정 정의
    const levelSettings = {
      1: { lives: 10, speed: 2000, interval: 3000 },
      2: { lives: 7, speed: 1500, interval: 2500 },
      3: { lives: 5, speed: 1000, interval: 2000 }
    };

    // 선택된 레벨의 설정 가져오기
    const currentSettings = levelSettings[selectedLevel as keyof typeof levelSettings];

    setLives(currentSettings.lives);
    setSpeed(currentSettings.speed);
    setFallingWords([]);
    setMatchedWords([]);
    setLevel(1);

    if (recognition.current) {
      recognition.current.continuous = true;
      recognition.current.start();
      setIsListening(true);
    }
  };

  return (
    <PageLayout title="게임" titleRu="Игры">
      <div className="space-y-6">
        {gameState === "ready" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              레벨 선택 / Выбор уровня:
            </label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(Number(e.target.value))}
              className="w-full p-2 border rounded-md text-base"
            >
              <option value={1}>초급 / Начальный</option>
              <option value={2}>중급 / Средний</option>
              <option value={3}>고급 / Продвинутый</option>
            </select>
            <Button onClick={startGame} className="w-full mt-4">
              게임 시작 / Начать игру
            </Button>
          </div>
        )}

        {/* 나머지 게임 UI 컴포넌트들 */}
      </div>
    </PageLayout>
  );
}
