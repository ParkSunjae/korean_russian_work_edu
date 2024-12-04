export interface Word {
  korean: string;
  english?: string;
  russian: string;
  romanization: string;
  pronunciation?: string;
}

export interface DictionaryData {
  dictionary: Word[];
  categories: string[];
  difficulties: string[];
} 