import { memo } from "react";
import { Word } from "../types";

const WordItem = memo(({ word }: { word: Word }) => {
  return (
    <div
      className={`
        absolute px-3 py-2 bg-white border rounded shadow
        transition-all duration-200
        ${word.matched ? "opacity-0 scale-110" : "opacity-100 scale-100"}
      `}
      style={{
        left: `${word.x}%`,
        top: `${word.y}%`,
        transform: "translateX(-50%)",
      }}
    >
      {word.korean}
    </div>
  );
});

WordItem.displayName = "WordItem";

export default WordItem;
