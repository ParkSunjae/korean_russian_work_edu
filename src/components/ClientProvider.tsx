"use client";

import { Navigation } from "@/components/Navigation";
import { useEffect } from "react";

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 페이지 언로드(닫기) 시 방문 기록
    const handleUnload = () => {
      // sendBeacon을 사용하여 비동기 요청 보장
      navigator.sendBeacon('/api/statistics', JSON.stringify({
        type: 'visit',
        data: { increment: true }
      }));
    };

    window.addEventListener('unload', handleUnload);
    
    return () => {
      window.removeEventListener('unload', handleUnload);
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Navigation />
      <main className="flex-1 md:ml-56">
        {children}
      </main>
    </div>
  );
} 