"use client";

import React, { useState } from "react";
import { Home, Type, Languages, BookOpen, MessageSquare, Gamepad, Bell, Menu, X } from "lucide-react";
import MenuLink from "./MenuLink";

const menuItems = [
  { id: "home", href: "/", label: "홈", labelRu: "Главная", icon: Home },
  { id: "consonants", href: "/consonants", label: "자음", labelRu: "Согласные", icon: Type },
  { id: "vowels", href: "/vowels", label: "모음", labelRu: "Гласные", icon: Languages },
  { id: "syllables", href: "/syllables", label: "자음+모음", labelRu: "Слоги", icon: BookOpen },
  { id: "double-consonants", href: "/double-consonants", label: "쌍자음", labelRu: "Двойные согласные", icon: Type },
  { id: "batchims", href: "/batchims", label: "받침", labelRu: "Батчим", icon: BookOpen },
  { id: "words", href: "/words", label: "단어", labelRu: "Слова", icon: BookOpen },
  { id: "grammar", href: "/grammar", label: "문법", labelRu: "Грамматика", icon: BookOpen },
  { id: "exams", href: "/exams", label: "시험", labelRu: "Экзамен", icon: MessageSquare },
  { id: "games", href: "/games", label: "게임", labelRu: "Игры", icon: Gamepad },
  { id: "suggestions", href: "/suggestions", label: "건의사항", labelRu: "Предложения", icon: Bell },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="fixed top-4 right-4 z-50 p-2 rounded-lg bg-white shadow-md md:hidden">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <nav
        className={`h-full bg-white shadow-lg md:shadow-none border-r border-gray-200 overflow-y-auto
          ${isOpen ? "fixed inset-0 z-40" : "hidden md:block"}`}
      >
        <div className="h-full overflow-y-auto">
          <ul className="space-y-4 p-4">
            {menuItems.map((item) => (
              <li key={item.href}>
                <MenuLink
                  href={item.href}
                  menuId={item.id}
                  menuName={item.label}
                  menuNameRu={item.labelRu}
                  onNavigate={closeMenu}
                  className="flex flex-col items-start gap-1 py-2 px-4 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition-colors w-full text-left"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                  <span className="text-sm text-gray-500">{item.labelRu}</span>
                </MenuLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
