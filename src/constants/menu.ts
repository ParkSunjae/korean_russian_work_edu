import { Home, Type, Languages, BookOpen, MessageSquare, Gamepad, Bell } from "lucide-react";

export const MENU_ITEMS = [
  { href: "/", label: "홈", labelRu: "Главная", icon: Home, id: 'home' },
  { href: "/consonants", label: "자음", labelRu: "Согласные", icon: Type, id: 'consonants' },
  { href: "/vowels", label: "모음", labelRu: "Гласные", icon: Languages, id: 'vowels' },
  { href: "/syllables", label: "자음+모음", labelRu: "Слоги", icon: BookOpen, id: 'syllables' },
  { href: "/words", label: "단어", labelRu: "Слова", icon: BookOpen, id: 'words' },
  { href: "/sentences", label: "문장", labelRu: "Предложения", icon: MessageSquare, id: 'sentences' },
  { href: "/games", label: "게임", labelRu: "Игры", icon: Gamepad, id: 'games' },
  { href: "/notices", label: "공지사항", labelRu: "Объявления", icon: Bell, id: 'notices' },
] as const;

export type MenuId = typeof MENU_ITEMS[number]['id'];

export const MENU_LABELS: Record<MenuId, { ko: string; ru: string }> = {
  home: { ko: '홈', ru: 'Главная' },
  consonants: { ko: '자음', ru: 'Согласные' },
  vowels: { ko: '모음', ru: 'Гласные' },
  syllables: { ko: '자음+모음', ru: 'Слоги' },
  words: { ko: '단어', ru: 'Слова' },
  sentences: { ko: '문장', ru: 'Предложения' },
  games: { ko: '게임', ru: 'Игры' },
  notices: { ko: '공지사항', ru: 'Объявления' },
}; 