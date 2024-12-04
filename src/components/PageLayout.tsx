"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  titleRu?: string;
  showBackButton?: boolean;
}

export default function PageLayout({ children, title, titleRu }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20 md:pt-8">
        {(title || titleRu) && (
          <div className="mb-8 bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
            {title && (
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
                {title}
              </h1>
            )}
            {titleRu && (
              <p className="text-gray-600 mt-1 text-sm md:text-base">
                {titleRu}
              </p>
            )}
          </div>
        )}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
