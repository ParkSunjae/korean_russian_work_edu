"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuLinkProps {
  href: string;
  menuName: string;
  menuNameRu: string;
  children: React.ReactNode;
  className?: string;
}

export default function MenuLink({ href, menuName, menuNameRu, children, className = "" }: MenuLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const updateMenuStats = async () => {
    try {
      await fetch("/api/statistics/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          menuName,
          menuNameRu,
        }),
      });
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
