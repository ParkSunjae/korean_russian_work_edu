"use client";

import React from "react";

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  titleRu?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, title, titleRu }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-start">
      <header className="bg-white shadow w-full">
        <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {title}
            <span className="block text-lg text-gray-600">{titleRu}</span>
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-4 sm:px-4 lg:px-6 w-full">
        <div className="px-4 py-4 sm:px-0">{children}</div>
      </main>
    </div>
  );
};

export default PageLayout;
