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
  english?: string;
  russian: string;
  romanization: string;
  pronunciation?: string;
}

export interface Sentence {
  id: string;
  korean: string;
  russian: string;
  romanization: string;
  category: string;
  level: string;
  definition: string;
  definition_ru: string;
}

export const koreanDictionary: Word[] = [
  {
    korean: '안녕하세요',
    english: 'Hello',
    russian: 'Здравствуйте',
    pronunciation: 'annyeonghaseyo',
    romanization: 'annyeonghaseyo',
  },
  {
    korean: '감사합니다',
    english: 'Thank you',
    russian: 'Спасибо',
    pronunciation: 'gamsahamnida',
    romanization: 'gamsahamnida',
  },
  {
    korean: '사람',
    english: 'Person',
    russian: 'Человек',
    pronunciation: 'saram',
    romanization: 'saram',
  },
  {
    korean: '학교',
    english: 'School',
    russian: 'Школа',
    pronunciation: 'hakgyo',
    romanization: 'hakgyo',
  },
  {
    korean: '친구',
    english: 'Friend',
    russian: 'Друг',
    pronunciation: 'chingu',
    romanization: 'chingu',
  },
  {
    korean: '가족',
    english: 'Family',
    russian: 'Семья',
    pronunciation: 'gajok',
    romanization: 'gajok',
  },
  {
    korean: '시간',
    english: 'Time',
    russian: 'Время',
    pronunciation: 'sigan',
    romanization: 'sigan',
  },
  {
    korean: '음식',
    english: 'Food',
    russian: 'Еда',
    pronunciation: 'eumsik',
    romanization: 'eumsik',
  },
  {
    korean: '물',
    english: 'Water',
    russian: 'Вода',
    pronunciation: 'mul',
    romanization: 'mul',
  },
  {
    korean: '집',
    english: 'House',
    russian: 'Дом',
    pronunciation: 'jip',
    romanization: 'jip',
  },
  {
    korean: '책상',
    english: 'Desk',
    russian: 'Стол',
    pronunciation: 'chaeksang',
    romanization: 'chaeksang',
  },
  {
    korean: '의자',
    english: 'Chair',
    russian: 'Стул',
    pronunciation: 'uija',
    romanization: 'uija',
  },
  {
    korean: '창문',
    english: 'Window',
    russian: 'Окно',
    pronunciation: 'changmun',
    romanization: 'changmun',
  },
  {
    korean: '문',
    english: 'Door',
    russian: 'Дверь',
    pronunciation: 'mun',
    romanization: 'mun',
  },
  {
    korean: '사랑',
    english: 'Love',
    russian: 'Любовь',
    pronunciation: 'sarang',
    romanization: 'sarang',
  },
  {
    korean: '행복',
    english: 'Happiness',
    russian: 'Счастье',
    pronunciation: 'haengbok',
    romanization: 'haengbok',
  },
  {
    korean: '하늘',
    english: 'Sky',
    russian: 'Небо',
    pronunciation: 'haneul',
    romanization: 'haneul',
  },
  {
    korean: '바다',
    english: 'Sea',
    russian: 'Море',
    pronunciation: 'bada',
    romanization: 'bada',
  },
  {
    korean: '산',
    english: 'Mountain',
    russian: 'Гора',
    pronunciation: 'san',
    romanization: 'san',
  },
  {
    korean: '나무',
    english: 'Tree',
    russian: 'Дерево',
    pronunciation: 'namu',
    romanization: 'namu',
  },
  {
    korean: '꽃',
    english: 'Flower',
    russian: 'Цветок',
    pronunciation: 'kkot',
    romanization: 'kkot',
  },
  {
    korean: '태양',
    english: 'Sun',
    russian: 'Солнце',
    pronunciation: 'taeyang',
    romanization: 'taeyang',
  },
  {
    korean: '달',
    english: 'Moon',
    russian: 'Луна',
    pronunciation: 'dal',
    romanization: 'dal',
  },
  {
    korean: '별',
    english: 'Star',
    russian: 'Звезда',
    pronunciation: 'byeol',
    romanization: 'byeol',
  },
  {
    korean: '바람',
    english: 'Wind',
    russian: 'Ветер',
    pronunciation: 'baram',
    romanization: 'baram',
  },
  {
    korean: '비',
    english: 'Rain',
    russian: 'Дождь',
    pronunciation: 'bi',
    romanization: 'bi',
  },
  {
    korean: '눈',
    english: 'Snow',
    russian: 'Снег',
    pronunciation: 'nun',
    romanization: 'nun',
  },
  {
    korean: '아침',
    english: 'Morning',
    russian: 'Утро',
    pronunciation: 'achim',
    romanization: 'achim',
  },
  {
    korean: '점심',
    english: 'Lunch',
    russian: 'Обед',
    pronunciation: 'jeomsim',
    romanization: 'jeomsim',
  },
  {
    korean: '저녁',
    english: 'Evening',
    russian: 'Вечер',
    pronunciation: 'jeonyeok',
    romanization: 'jeonyeok',
  },
  {
    korean: '어제',
    english: 'Yesterday',
    russian: 'Вчера',
    pronunciation: 'eoje',
    romanization: 'eoje',
  },
  {
    korean: '오늘',
    english: 'Today',
    russian: 'Сегодня',
    pronunciation: 'oneul',
    romanization: 'oneul',
  },
  {
    korean: '내일',
    english: 'Tomorrow',
    russian: 'Завтра',
    pronunciation: 'naeil',
    romanization: 'naeil',
  },
  {
    korean: '숫자',
    english: 'Number',
    russian: 'Число',
    pronunciation: 'sutja',
    romanization: 'sutja',
  },
  {
    korean: '색깔',
    english: 'Color',
    russian: 'Цвет',
    pronunciation: 'saekkal',
    romanization: 'saekkal',
  },
  {
    korean: '이름',
    english: 'Name',
    russian: 'Имя',
    pronunciation: 'ireum',
    romanization: 'ireum',
  },
  {
    korean: '나이',
    english: 'Age',
    russian: 'Возраст',
    pronunciation: 'nai',
    romanization: 'nai',
  },
  {
    korean: '직업',
    english: 'Job',
    russian: 'Работа',
    pronunciation: 'jigeop',
    romanization: 'jigeop',
  },
  {
    korean: '전화',
    english: 'Phone',
    russian: 'Телефон',
    pronunciation: 'jeonhwa',
    romanization: 'jeonhwa',
  },
  {
    korean: '컴퓨터',
    english: 'Computer',
    russian: 'Компьютер',
    pronunciation: 'keompyuteo',
    romanization: 'keompyuteo',
  },
  {
    korean: '책',
    english: 'Book',
    russian: 'Книга',
    pronunciation: 'chaek',
    romanization: 'chaek',
  },
  {
    korean: '연필',
    english: 'Pencil',
    russian: 'Карандаш',
    pronunciation: 'yeonpil',
    romanization: 'yeonpil',
  }
]
