"use client";

import Link from "next/link";
import { Home, Type, Languages, BookOpen, MessageSquare, Gamepad, Bell, Menu, X, CircleDot } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const menuItems = [
  { href: "/", label: "홈", labelRu: "Главная", icon: Home },
  { href: "/consonants", label: "자음", labelRu: "Согласные", icon: Type },
  { href: "/vowels", label: "모음", labelRu: "Гласные", icon: Languages },
  { href: "/syllables", label: "자음+모음", labelRu: "Слоги", icon: BookOpen },
  { href: "/batchims", label: "받침", labelRu: "Патчим", icon: CircleDot },
  { href: "/words", label: "단어", labelRu: "Слова", icon: BookOpen },
  { href: "/sentences", label: "문장", labelRu: "Предложения", icon: MessageSquare },
  { href: "/games", label: "게임", labelRu: "Игры", icon: Gamepad },
  { href: "/notices", label: "공지사항", labelRu: "Объявления", icon: Bell },
];

const Navigation = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setIsMobile(true);
        setIsCollapsed(false);
      } else if (width >= 768 && width < 1024) {
        setIsMobile(false);
        setIsCollapsed(true);
      } else {
        setIsMobile(false);
        setIsCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    setMounted(true);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 right-4 p-3 rounded-full bg-white shadow-md hover:bg-gray-50 transition-all duration-300 ease-in-out z-50"
          aria-label="메뉴 토글"
        >
          {isOpen ? <X className="h-6 w-6 text-gray-600" /> : <Menu className="h-6 w-6 text-gray-600" />}
        </button>
      )}

      <nav
        className={`
          fixed lg:static h-full 
          bg-white shadow-lg lg:shadow-none
          transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-16" : "w-auto min-w-[4rem] max-w-[20rem]"}
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          z-40
          overflow-hidden
        `}
      >
        <ul className="pt-20 lg:pt-6 px-2 pb-6 space-y-2 h-full overflow-y-auto">
          {menuItems.map((item) => (
            <li key={item.href} className="relative group">
              <Link
                href={item.href}
                onClick={() => isMobile && setIsOpen(false)}
                className={`
                  flex items-center gap-3 
                  py-3 px-4 rounded-lg
                  text-gray-700 hover:text-gray-900 
                  hover:bg-gray-50 active:bg-gray-100
                  transition-all duration-200
                  ${isCollapsed ? "justify-center" : ""}
                  ${pathname === item.href ? "bg-gray-50 text-gray-900" : ""}
                `}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && (
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-medium leading-snug truncate">{item.label}</span>
                    <span className="text-sm text-gray-500 leading-snug truncate">{item.labelRu}</span>
                  </div>
                )}
              </Link>
              {isCollapsed && (
                <div className="absolute left-full top-0 ml-2 hidden group-hover:block min-w-[200px] bg-white rounded-lg shadow-lg py-2 px-4 z-50">
                  <div className="font-medium mb-1">{item.label}</div>
                  <div className="text-sm text-gray-500">{item.labelRu}</div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {isMobile && isOpen && <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden" onClick={() => setIsOpen(false)} />}
    </>
  );
};

export default Navigation;
