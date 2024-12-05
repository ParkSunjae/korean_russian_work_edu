"use client";

import React from "react";

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  titleRu?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, title, titleRu }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow w-full">
        <div className="max-w-[1400px] mx-auto py-2 pl-72 pr-4">
          <h1 className="text-2xl font-bold text-gray-900">
            {title}
            <span className="block text-lg text-gray-600">{titleRu}</span>
          </h1>
        </div>
      </header>
      <main className="flex-1">
        <div className="max-w-[1400px] mx-auto pl-72 pr-4 py-6">
          <div className="max-w-[1000px]">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default PageLayout;
