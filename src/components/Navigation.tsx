"use client";

import Link from "next/link";
import { Home, Type, Languages, BookOpen, MessageSquare, Gamepad, Bell } from "lucide-react";

const menuItems = [
  { href: "/", label: "홈", labelRu: "Главная", icon: Home },
  { href: "/consonants", label: "자음", labelRu: "Согласные", icon: Type },
  { href: "/vowels", label: "모음", labelRu: "Гласные", icon: Languages },
  { href: "/syllables", label: "자음+모음", labelRu: "Слоги", icon: BookOpen },
  { href: "/words", label: "단어", labelRu: "Слова", icon: BookOpen },
  { href: "/sentences", label: "문장", labelRu: "Предложения", icon: MessageSquare },
  { href: "/games", label: "게임", labelRu: "Игры", icon: Gamepad },
  { href: "/notices", label: "공지사항", labelRu: "Объявления", icon: Bell },
];

export function Navigation() {
  return (
    <nav className="w-64 bg-gray-100 p-6">
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex items-center gap-3 py-2 px-4 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition-colors"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
              <span className="text-sm text-gray-500">({item.labelRu})</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
