'use client'

import Link from 'next/link'
import { 
  Home,
  Type,
  Languages,
  BookOpen,
  MessageSquare,
  Gamepad,
  Bell
} from 'lucide-react'

const menuItems = [
  { href: '/', label: '홈', icon: Home },
  { href: '/consonants', label: '자음', icon: Type },
  { href: '/vowels', label: '모음', icon: Languages },
  { href: '/syllables', label: '자음+모음', icon: BookOpen },
  { href: '/words', label: '단어', icon: BookOpen },
  { href: '/sentences', label: '문장', icon: MessageSquare },
  { href: '/games', label: '게임', icon: Gamepad },
  { href: '/notices', label: '공지사항', icon: Bell },
]

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
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
} 