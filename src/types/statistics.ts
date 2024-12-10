import type { MenuStats, Word } from "./prisma";

export interface MenuStat {
  name: string;
  menuName: string;
  menuNameRu: string;
  clickCount: number;
  lastClicked: string;
}

export interface WordStat {
  korean: string;
  russian: string;
  listenCount: number;
}

export interface Statistics {
  totalVisits: number;
  lastUpdated: string;
  menuStats: Record<string, MenuStat>;
  wordStats: WordStat[];
}
