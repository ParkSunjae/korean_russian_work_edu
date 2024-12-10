"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuLinkProps {
  href: string;
  menuId: string;
  menuName: string;
  menuNameRu: string;
  children: React.ReactNode;
  className?: string;
}

export default function MenuLink({ href, menuId, menuName, menuNameRu, children, className = "" }: MenuLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const updateMenuStats = async () => {
    try {
      const response = await fetch("/api/statistics/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          menuId,
          menuName,
          menuNameRu,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update menu stats");
      }
    } catch (error) {
      console.error("Failed to update menu stats:", error);
    }
  };

  return (
    <Link href={href} onClick={updateMenuStats} className={`${className} ${isActive ? "bg-indigo-50 text-indigo-600" : ""}`}>
      {children}
    </Link>
  );
}
