"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Navigation = dynamic(() => import("./Navigation"), {
  ssr: false,
});

interface ClientProviderProps {
  children: React.ReactNode;
}

export default function ClientProvider({ children }: ClientProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <Navigation />
      <main className="flex-1 p-4 lg:p-8 mt-16 lg:mt-0 overflow-x-hidden">{children}</main>
    </div>
  );
}
