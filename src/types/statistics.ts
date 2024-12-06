import type { MenuStats, Word } from "./prisma";

export interface MenuStat {
  name: string;
  nameRu: string;
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
  wordStats: Word[];
  recentWords: Word[];
  recentPhrases: Word[];
}
