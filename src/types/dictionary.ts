export interface DictionaryEntry {
  id: string;
  korean: string;
  english: string;
  russian: string;
  pronunciation: string;
  definition: string;
  definition_ru: string;
  category: string;
  difficulty: string;
  examples: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DictionaryData {
  words: DictionaryEntry[];
}

export interface DictionaryResponse {
  words: DictionaryEntry[];
}
