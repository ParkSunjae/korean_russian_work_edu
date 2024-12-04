import { koreanDictionary } from "@/utils/dictionary";

export interface WordType {
  korean: string;
  russian: string;
  pronunciation: string;
}

export const WORDS: WordType[] = koreanDictionary.map(word => ({
  korean: word.korean,
  russian: word.russian,
  pronunciation: word.pronunciation
})); 