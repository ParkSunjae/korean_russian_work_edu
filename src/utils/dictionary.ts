import dictionaryData from "../../public/data/dictionary-data.json";
import { DictionaryEntry, DictionaryData } from "@/types/dictionary";

export const koreanDictionary = (dictionaryData as DictionaryData).words.map((word, index) => ({
  ...word,
  id: String(index + 1),
  english: word.english || "",
  definition: word.definition || "",
  definition_ru: word.definition_ru || "",
  category: word.category || "기본",
  difficulty: word.difficulty || "초급",
  examples: word.examples || [],
}));
