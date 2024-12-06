"use client";

import { memo } from "react";
import type { GameWord } from "../types";

interface WordItemProps {
  word: GameWord;
  onMatch?: (word: GameWord) => void;
}

const WordItem = memo(({ word, onMatch }: WordItemProps) => {
  return (
    <div
      className={`
        absolute px-4 py-2 bg-white border rounded-lg shadow-md cursor-pointer
        hover:bg-blue-50 transition-all duration-200
        ${word.matched ? "opacity-0 scale-110" : "opacity-100 scale-100"}
      `}
      style={{
        left: `${word.x}%`,
        top: `${word.y}%`,
        transform: "translate(-50%, -50%)",
      }}
      onClick={() => onMatch?.(word)}
    >
      <div className="text-lg font-medium">{word.korean}</div>
      <div className="text-sm text-gray-500">{word.russian}</div>
    </div>
  );
});

WordItem.displayName = "WordItem";

export default WordItem;
