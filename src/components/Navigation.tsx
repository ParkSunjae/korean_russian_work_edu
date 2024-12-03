"use client";

import Link from "next/link";
import { Home, Type, Languages, BookOpen, MessageSquare, Gamepad, Bell } from "lucide-react";
import { useRouter } from 'next/navigation';
import { ALL_MENU_ITEMS } from '@/utils/statistics';

export default function Navigation() {
  const router = useRouter();

  const handleMenuClick = async (menuId: string, path: string) => {
    try {
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
    router.push(path);
  };

  return (
    <nav className="flex gap-4">
      {ALL_MENU_ITEMS.map(item => (
        <button
          key={item.id}
          onClick={() => handleMenuClick(item.id, `/${item.id}`)}
          className="px-4 py-2 rounded-lg hover:bg-gray-100"
        >
          {item.name} / {item.nameRu}
        </button>
      ))}
    </nav>
  );
}
