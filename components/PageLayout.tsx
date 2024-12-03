"use client";

import { useState, useEffect } from "react";
import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  titleRu?: string;
  showBackButton?: boolean;
}

const PageLayout = ({ children, title, titleRu, showBackButton = false }: PageLayoutProps) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="flex items-center gap-4 mb-6">
        {showBackButton && (
          <button onClick={() => router.push("/")} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>뒤로가기</span>
          </button>
        )}
        <h1 className="text-2xl md:text-3xl font-bold">
          {title}
          {titleRu && <span className="text-gray-500 ml-2 text-lg">| {titleRu}</span>}
        </h1>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">{children}</div>
    </div>
  );
};

export default PageLayout;
