"use client";

import Link from "next/link";
import { Home, Type, Languages, BookOpen, MessageSquare, Gamepad, Bell, Menu } from "lucide-react";
import { useState, useEffect } from "react";

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
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 화면 크기 변경 감지
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    // 초기 실행
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 모바일에서 메뉴 선택시 자동으로 닫기
  const handleMenuClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* 모바일 메뉴 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          fixed top-4 right-4 z-50 
          p-2 rounded-md 
          bg-gray-100 hover:bg-gray-200
          transition-all duration-300
          ${isMobile ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* 네비게이션 */}
      <nav
        className={`
          fixed lg:static 
          w-64 h-full 
          bg-gray-100 p-6 
          transition-all duration-300 ease-in-out
          ${isMobile ? (isOpen ? "translate-x-0 shadow-lg" : "-translate-x-full") : "translate-x-0"}
          z-40
        `}
      >
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={handleMenuClick}
                className={`
                  flex items-center gap-3 
                  py-2 px-4 rounded-md 
                  text-gray-700 hover:text-gray-900 hover:bg-gray-200 
                  transition-colors
                  ${isMobile ? "text-lg" : "text-base"}
                `}
              >
                <item.icon className={`${isMobile ? "h-5 w-5" : "h-4 w-4"} flex-shrink-0`} />
                <span className="flex-grow">{item.label}</span>
                <span
                  className={`
                  text-sm text-gray-500
                  ${isMobile ? "hidden sm:inline" : "inline"}
                `}
                >
                  ({item.labelRu})
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* 모바일 오버레이 */}
      {isMobile && isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setIsOpen(false)} />}
    </>
  );
}
