import { MenuId } from "@/constants/menu";

export interface MenuStat {
  name: string;
  nameRu: string;
  count: number;
  lastClicked: string;
}

export interface WordStat {
  korean: string;
  russian: string;
  pronunciation: string;
  count: number;
}

export interface Statistics {
  totalVisits: number;
  lastUpdated: string;
  menuStats: Record<string, MenuStat>;
  wordStats: WordStat[];
}
