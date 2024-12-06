import { MenuId } from "@/constants/menu";

export interface MenuStat {
  name: string;
  nameRu: string;
  count: number;
}

export interface WordStat {
  korean: string;
  russian: string;
  count: number;
}

export interface Statistics {
  totalWords: number;
  todayWords: number;
  totalPhrases: number;
  todayPhrases: number;
  totalVisits: number;
  lastUpdated: string;
  menuStats: Record<string, MenuStat>;
  wordStats: WordStat[];
  recentWords: WordStat[];
  recentPhrases: WordStat[];
}
