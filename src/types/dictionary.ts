export interface DictionaryEntry {
  id: string;
  korean: string;
  russian: string;
  pronunciation?: string;
  category?: string;
  subcategory?: string;
  listenCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DictionaryData {
  words: DictionaryEntry[];
}

export interface DictionaryResponse {
  words: DictionaryEntry[];
}
