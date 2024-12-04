export interface BatchimExample {
  word: string;
  pronunciation: string;
  meaning: string;
}

export interface Batchim {
  char: string;
  sound: string;
  examples: BatchimExample[];
  description: string;
  description_ru: string;
}

export const BATCHIMS: Batchim[] = [
  { 
    char: 'ㄱ', 
    sound: 'k/g', 
    examples: [
      { word: '국', pronunciation: '[국]', meaning: 'суп' },
      { word: '박', pronunciation: '[박]', meaning: 'тыква' }
    ],
    description: '단어 끝에서 [ㄱ] 소리로 발음됩니다.',
    description_ru: 'Произносится как [к] в конце слова'
  },
  // ... 기존 데이터
  // 추가 받침들
  { 
    char: 'ㄹ', 
    sound: 'l/r', 
    examples: [
      { word: '달', pronunciation: '[달]', meaning: 'луна' },
      { word: '물', pronunciation: '[물]', meaning: 'вода' }
    ],
    description: '단어 끝에서 [ㄹ] 소리로 발음됩니다.',
    description_ru: 'Произносится как [л] в конце слова'
  },
  { 
    char: 'ㅁ', 
    sound: 'm', 
    examples: [
      { word: '감', pronunciation: '[감]', meaning: 'хурма' },
      { word: '숨', pronunciation: '[숨]', meaning: 'дыхание' }
    ],
    description: '항상 [ㅁ] 소리로 발음됩니다.',
    description_ru: 'Всегда произносится как [м]'
  }
]; 