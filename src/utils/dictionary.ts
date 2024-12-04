import dictionaryData from "@/data/dictionary-data.json";

export interface Word {
  id: number;
  korean: string;
  english: string;
  russian: string;
  pronunciation: string;
  definition: string;
  definition_ru: string;
  category: string;
  difficulty: string;
  example: string;
  example_ru: string;
}

export interface DictionaryData {
  dictionary: Word[];
  categories: string[];
  difficulties: string[];
}

export const koreanDictionary = dictionaryData.dictionary as Word[];
