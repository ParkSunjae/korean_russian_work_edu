"use client";

import Link from "next/link";
import { useCallback } from "react";

interface MenuLinkProps {
  href: string;
  menuName: string;
  menuNameRu: string;
  children: React.ReactNode;
  className?: string;
}

export default function MenuLink({ href, menuName, menuNameRu, children, className = "" }: MenuLinkProps) {
  const updateMenuStats = useCallback(async () => {
    try {
      await fetch("/api/statistics/menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ menuName, menuNameRu }),
      });
    } catch (error) {
      console.error("Failed to update menu statistics:", error);
    }
  }, [menuName, menuNameRu]);

  return (
    <Link href={href} onClick={updateMenuStats} className={`block p-4 rounded-lg hover:bg-gray-50 transition-colors ${className}`}>
      {children}
    </Link>
  );
}
