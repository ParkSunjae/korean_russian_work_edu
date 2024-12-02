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
