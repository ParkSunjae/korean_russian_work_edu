"use client";

import React, { useState } from "react";
import { Home, Type, Languages, BookOpen, MessageSquare, Gamepad, Bell, Menu, X } from "lucide-react";
import MenuLink from "./MenuLink";

const menuItems = [
  { href: "/", label: "홈", labelRu: "Главная", icon: Home, id: "home" },
  { href: "/consonants", label: "자음", labelRu: "Согласные", icon: Type, id: "consonants" },
  { href: "/vowels", label: "모음", labelRu: "Гласные", icon: Languages, id: "vowels" },
  { href: "/syllables", label: "자음+모음", labelRu: "Слоги", icon: BookOpen, id: "syllables" },
  { href: "/batchims", label: "받침", labelRu: "Батчим", icon: BookOpen, id: "batchims" },
  { href: "/words", label: "단어", labelRu: "Слова", icon: BookOpen, id: "words" },
  { href: "/exams", label: "시험", labelRu: "Экзамен", icon: MessageSquare, id: "exams" },
  { href: "/games", label: "게임", labelRu: "Игры", icon: Gamepad, id: "games" },
  { href: "/suggestions", label: "건의사항", labelRu: "Предложения", icon: Bell, id: "suggestions" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="fixed top-4 right-4 z-50 p-2 rounded-lg bg-white shadow-md md:hidden">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <nav
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg md:shadow-none transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 overflow-y-auto md:h-screen border-r border-gray-200`}
      >
        <ul className="space-y-4 p-4">
          {menuItems.map((item) => (
            <li key={item.href}>
              <MenuLink
                href={item.href}
                menuName={item.label}
                menuNameRu={item.labelRu}
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
      </nav>
    </>
  );
}
