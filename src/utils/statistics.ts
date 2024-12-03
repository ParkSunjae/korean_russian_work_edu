import fs from 'fs';
import path from 'path';
import { Statistics } from '@/types/statistics';

const STATS_FILE = path.join(process.cwd(), 'data', 'statistics.json');

// 모든 메뉴 아이템 정의
export const ALL_MENU_ITEMS = [
  { id: 'home', name: '홈', nameRu: 'Главная' },
  { id: 'consonants', name: '자음', nameRu: 'Согласные' },
  { id: 'vowels', name: '모음', nameRu: 'Гласные' },
  { id: 'syllables', name: '자음+모음', nameRu: 'Слоги' },
  { id: 'words', name: '단어', nameRu: 'Слова' },
  { id: 'sentences', name: '문장', nameRu: 'Предложения' },
  { id: 'games', name: '게임', nameRu: 'Игры' },
  { id: 'notices', name: '공지사항', nameRu: 'Объявления' }
] as const;

// 초기 통계 생성 함수 수정
const createInitialStats = (): Statistics => {
  const initialMenuStats = ALL_MENU_ITEMS.reduce((acc, menu) => {
    acc[menu.id] = {
      id: menu.id,
      count: 0,
      lastClicked: new Date().toISOString(),
      name: menu.name,
      nameRu: menu.nameRu
    };
    return acc;
  }, {} as Statistics['menuStats']);

  return {
    totalVisits: 0,
    menuStats: initialMenuStats,
    wordStats: {},
    lastUpdated: new Date().toISOString()
  };
};

export const getStatistics = (): Statistics => {
  try {
    if (!fs.existsSync(STATS_FILE)) {
      const initialStats = createInitialStats();
      fs.writeFileSync(STATS_FILE, JSON.stringify(initialStats, null, 2));
      return initialStats;
    }
    
    const stats = JSON.parse(fs.readFileSync(STATS_FILE, 'utf-8'));
    
    // 새로운 메뉴가 추가되었을 때를 대비해 누락된 메뉴 추가
    ALL_MENU_ITEMS.forEach(menu => {
      if (!stats.menuStats[menu.id]) {
        stats.menuStats[menu.id] = {
          id: menu.id,
          count: 0,
          lastClicked: new Date().toISOString(),
          name: menu.name,
          nameRu: menu.nameRu
        };
      }
    });
    
    return stats;
  } catch (error) {
    console.error('통계 데이터 로드 실패:', error);
    return createInitialStats();
  }
};

export const updateStatistics = async (type: 'visit' | 'menu' | 'word', data?: any) => {
  try {
    const stats = getStatistics();
    
    switch (type) {
      case 'visit':
        stats.totalVisits += 1;
        stats.lastUpdated = new Date().toISOString();
        break;
      case 'menu':
        const menuId = data as string;
        const menuItem = ALL_MENU_ITEMS.find(item => item.id === menuId);
        if (!stats.menuStats[menuId] && menuItem) {
          stats.menuStats[menuId] = {
            id: menuId,
            count: 0,
            lastClicked: new Date().toISOString(),
            name: menuItem.name,
            nameRu: menuItem.nameRu
          };
        }
        if (stats.menuStats[menuId]) {
          stats.menuStats[menuId].count += 1;
          stats.menuStats[menuId].lastClicked = new Date().toISOString();
        }
        break;
      case 'word':
        const word = data as { korean: string; russian: string };
        if (!stats.wordStats[word.korean]) {
          stats.wordStats[word.korean] = {
            korean: word.korean,
            russian: word.russian,
            count: 0
          };
        }
        stats.wordStats[word.korean].count += 1;
        break;
    }
    
    stats.lastUpdated = new Date().toISOString();
    await fs.promises.writeFile(STATS_FILE, JSON.stringify(stats, null, 2));
    
  } catch (error) {
    console.error('통계 업데이트 실패:', error);
  }
}; 