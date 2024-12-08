import type { MenuStats, Word } from "./prisma";

export interface MenuStat {
  menuId: string;
  name: string;
  nameRu: string;
  count: number;
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
  menuStats: MenuStat[];
  wordStats: WordStat[];
}
