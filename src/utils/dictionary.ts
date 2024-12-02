import dictionaryData from "@/data/dictionary-data.json";

export const loadDictionaryData = async () => {
  try {
    return dictionaryData;
  } catch (error) {
    console.error("Error loading dictionary data:", error);
    return {
      dictionary: [],
      categories: [],
      difficulties: [],
    };
  }
};

export interface Word {
  korean: string;
  english: string;
  russian: string;
  pronunciation?: string;
}

export const koreanDictionary: Word[] = [
  {
    korean: '안녕하세요',
    english: 'Hello',
    russian: 'Здравствуйте',
    pronunciation: 'annyeonghaseyo',
  },
  {
    korean: '감사합니다',
    english: 'Thank you',
    russian: 'Спасибо',
    pronunciation: 'gamsahamnida',
  },
  {
    korean: '사랑',
    english: 'Love',
    russian: 'Любовь',
    pronunciation: 'sarang',
  },
  {
    korean: '친구',
    english: 'Friend',
    russian: 'Друг',
    pronunciation: 'chingu',
  },
  {
    korean: '가족',
    english: 'Family',
    russian: 'Семья',
    pronunciation: 'gajok',
  },
  {
    korean: '학교',
    english: 'School',
    russian: 'Школа',
    pronunciation: 'hakgyo',
  },
  {
    korean: '음식',
    english: 'Food',
    russian: 'Еда',
    pronunciation: 'eumsik',
  },
  {
    korean: '물',
    english: 'Water',
    russian: 'Вода',
    pronunciation: 'mul',
  },
  {
    korean: '책',
    english: 'Book',
    russian: 'Книга',
    pronunciation: 'chaek',
  },
  {
    korean: '시간',
    english: 'Time',
    russian: 'Время',
    pronunciation: 'sigan',
  },
]
