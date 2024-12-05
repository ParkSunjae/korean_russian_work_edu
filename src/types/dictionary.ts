export interface DictionaryEntry {
  id: string;
  korean: string;
  russian: string;
  english: string;
  pronunciation: string;
  definition: string;
  definition_ru: string;
  category: string;
  difficulty: string;
  examples: string[];
}

export interface DictionaryData {
  words: DictionaryEntry[];
}
