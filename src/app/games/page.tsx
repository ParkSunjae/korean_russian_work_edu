"use client";

import { useState } from "react";
import FallingWordsGame from "./components/FallingWordsGame";
import PageHeader from "@/components/layout/PageHeader";

// 게임 타입 정의
type GameType = {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType;
};

// 게임 목록 정의
const GAMES: GameType[] = [
  {
    id: "falling-words",
    title: "단어 떨어뜨리기",
    description: "떨어지는 단어를 음성으로 맞추는 게임입니다.",
    component: FallingWordsGame,
  },
  // 추가 게임들은 여기에 추가
];

export default function GamesPage() {
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <PageHeader backLabel={selectedGame ? "게임 목록으로" : "뒤로 가기"} onBack={selectedGame ? () => setSelectedGame(null) : undefined} />

        {selectedGame ? (
          <selectedGame.component />
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {GAMES.map((game) => (
              <div
                key={game.id}
                className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedGame(game)}
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-1">{game.title}</h2>
                <p className="text-sm text-gray-600">{game.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
