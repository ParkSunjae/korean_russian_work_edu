"use client";

import { useEffect } from "react";
import Navigation from "@/components/Navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleBeforeUnload = () => {
      navigator.sendBeacon("/api/statistics/visitor");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:block md:w-64 md:fixed md:inset-y-0 md:left-0">
        <Navigation />
      </div>
      <div className="md:hidden">
        <Navigation />
      </div>
      <main className="flex-1 md:ml-64 overflow-y-auto">{children}</main>
    </div>
  );
}
