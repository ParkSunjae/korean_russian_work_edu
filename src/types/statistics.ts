export interface MenuStat {
  id: string;
  count: number;
  lastClicked: string;
  name: string;
  nameRu: string;
}

export interface Statistics {
  totalVisits: number;
  menuStats: {
    [key: string]: MenuStat;
  };
  wordStats: {
    [key: string]: {
      korean: string;
      russian: string;
      count: number;
    };
  };
  lastUpdated: string;
} 