"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from 'next/navigation';
import { MENU_ITEMS } from '@/constants/menu';
import type { MenuId } from '@/constants/menu';

export function Navigation() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = async (menuId: MenuId, href: string) => {
    try {
      const statsResponse = await fetch('/api/statistics');
      const currentStats = await statsResponse.json();
      const currentCount = currentStats.menuStats[menuId]?.count || 0;

      await fetch('/api/statistics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'menu',
          data: { menuId, count: currentCount + 1 }
        })
      });

      router.push(href);
      setIsOpen(false); // 모바일에서 메뉴 클릭 시 닫기
    } catch (error) {
      console.error('메뉴 통계 업데이트 실패:', error);
      router.push(href);
    }
  };

  return (
    <>
      {/* 모바일 햄버거 버�� - 오른쪽으로 이동 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 p-2 rounded-lg bg-white shadow-md md:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 네비게이션 메뉴 */}
      <nav
        className={`
          fixed md:static inset-y-0 left-0 z-40
          w-56 bg-white shadow-lg md:shadow-none
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          overflow-y-auto md:h-screen
          border-r border-gray-200
        `}
      >
        <div className="p-4 space-y-1">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => handleMenuClick(item.id, item.href)}
              className="flex flex-col w-full px-4 py-3 rounded-lg
                text-gray-700 hover:text-indigo-600 hover:bg-indigo-50
                transition-all duration-200 text-left group"
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-5 w-5 group-hover:text-indigo-600 transition-colors" />
                <span className="font-medium">{item.label}</span>
              </div>
              <span className="text-sm text-gray-500 ml-8 mt-1 group-hover:text-indigo-400">
                {item.labelRu}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
