"use client";

import dynamic from "next/dynamic";

const Navigation = dynamic(() => import("./Navigation"), {
  ssr: false,
});

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <Navigation />
      <main className="flex-1 p-4 lg:p-8 mt-16 lg:mt-0 overflow-x-hidden">{children}</main>
    </div>
  );
}
