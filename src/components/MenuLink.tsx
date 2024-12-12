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
  onNavigate?: () => void;
}

export default function MenuLink({ href, menuId, menuName, menuNameRu, children, className = "", onNavigate }: MenuLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const handleClick = async () => {
    try {
      await fetch("/api/statistics/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          menuId,
          menuName,
          menuNameRu,
        }),
      });

      onNavigate?.();
    } catch (error) {
      console.error("Failed to update menu stats:", error);
      onNavigate?.();
    }
  };

  return (
    <Link href={href} onClick={handleClick} className={`${className} ${isActive ? "bg-indigo-50 text-indigo-600" : ""}`}>
      {children}
    </Link>
  );
}
