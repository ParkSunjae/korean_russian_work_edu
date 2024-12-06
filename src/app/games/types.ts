import type { WordType } from "@/constants/words";

export interface Word extends WordType {
  x: number;
  y: number;
  id: number;
  matched?: boolean;
}

export interface MatchedWordCount extends Word {
  count: number;
  totalScore: number;
}
