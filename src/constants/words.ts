import { koreanDictionary, Word } from "@/utils/dictionary";

export interface WordType {
  korean: string;
  russian: string;
  romanization: string;
  pronunciation: string;
}

export const WORDS: WordType[] = koreanDictionary.map((word: Word) => ({
  korean: word.korean,
  russian: word.russian,
  romanization: word.korean,
  pronunciation: word.pronunciation || `[${word.korean}]`
})); 