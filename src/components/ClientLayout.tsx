"use client";

import Navigation from "@/components/Navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-64 shrink-0 border-r border-gray-200 bg-white">
        <Navigation />
      </div>
      <main className="flex-1 px-4 py-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
} 