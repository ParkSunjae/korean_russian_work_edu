import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '한국어 공부 사이트 | Сайт для изучения корейского языка',
  description: '한국어 단어 사전 (영어, 러시아어 번역 포함)',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={`${inter.className} antialiased`}>
        <header className="bg-blue-600 text-white p-4">
          <div className="container mx-auto">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <h1 className="text-2xl font-bold">
                한국어 공부 사이트 | 
                <span className="text-blue-100 ml-2">
                  Сайт для изучения корейского языка
                </span>
              </h1>
            </Link>
          </div>
        </header>

        <div className="flex min-h-[calc(100vh-4rem)]">
          <Navigation />
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}