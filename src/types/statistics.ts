import { MenuId } from '@/constants/menu';

export interface MenuStat {
  id: MenuId;
  count: number;
  lastClicked: string;
  name: string;
  nameRu: string;
}

export interface WordStat {
  korean: string;
  russian: string;
  count: number;
}

export interface Statistics {
  totalVisits: number;
  menuStats: Record<MenuId, MenuStat>;
  wordStats: Record<string, WordStat>;
  lastUpdated: string;
} 