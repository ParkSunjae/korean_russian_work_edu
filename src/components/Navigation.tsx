"use client";

import Link from "next/link";
import { Home, Type, Languages, BookOpen, MessageSquare, Gamepad, Bell } from "lucide-react";
import { useRouter } from 'next/navigation';

const menuItems = [
  { href: "/", label: "홈", labelRu: "Главная", icon: Home, id: 'home' },
  { href: "/consonants", label: "자음", labelRu: "Согласные", icon: Type, id: 'consonants' },
  { href: "/vowels", label: "모음", labelRu: "Гласные", icon: Languages, id: 'vowels' },
  { href: "/syllables", label: "자음+모음", labelRu: "Слоги", icon: BookOpen, id: 'syllables' },
  { href: "/words", label: "단어", labelRu: "Слова", icon: BookOpen, id: 'words' },
  { href: "/sentences", label: "문장", labelRu: "Предложения", icon: MessageSquare, id: 'sentences' },
  { href: "/games", label: "게임", labelRu: "Игры", icon: Gamepad, id: 'games' },
  { href: "/notices", label: "공지사항", labelRu: "Объявления", icon: Bell, id: 'notices' },
];

export function Navigation() {
  const router = useRouter();

  const handleMenuClick = async (menuId: string, href: string) => {
    try {
      // 메뉴 클릭 통계 업데이트
      await fetch('/api/statistics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'menu',
          data: menuId
        })
      });
    } catch (error) {
      console.error('메뉴 통계 업데이트 실패:', error);
    }

    router.push(href);
  };

  return (
    <nav className="w-64 bg-gray-100 p-6">
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li key={item.href}>
            <button
              onClick={() => handleMenuClick(item.id, item.href)}
              className="flex items-center gap-3 py-2 px-4 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition-colors w-full text-left"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
              <span className="text-sm text-gray-500">({item.labelRu})</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
