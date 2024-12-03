export interface Sentence {
  id: string;
  korean: string;
  russian: string;
  romanization: string;
  category: string;
  level: "초급" | "중급" | "고급";
}
