import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientProvider from "@/components/ClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "한국어 학습 플랫폼 | Платформа изучения корейского языка",
  description: "한글 자음, 모음부터 문장까지 단계별로 학습하세요",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
