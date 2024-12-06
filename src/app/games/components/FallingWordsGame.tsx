"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import GameBoard from "@/app/games/components/GameBoard";
import type { Word } from "@/types/prisma";

export default function FallingWordsGame() {
  const router = useRouter();
  const [words, setWords] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadWords = useCallback(async () => {
    try {
      const response = await fetch("/api/dictionary");
      if (!response.ok) throw new Error("Failed to fetch words");

      const data = await response.json();
      if (!data.words?.length) {
        setError("단어장에 단어가 없습니다. 먼저 단어를 추가해주세요.");
        return;
      }

      setWords(data.words);
      setError(null);
    } catch (error) {
      setError("단어를 불러오는데 실패했습니다.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWords();
  }, [loadWords]);

  if (isLoading) {
    return <div className="text-center py-8">로딩 중...</div>;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-50 rounded-lg">
        <p className="text-red-500 mb-4">{error}</p>
        <button onClick={() => router.push("/words")} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          단어 추가하기
        </button>
      </div>
    );
  }

  return <GameBoard words={words} />;
}
