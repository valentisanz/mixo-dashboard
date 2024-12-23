"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Settings,
  Package,
  CreditCard,
  Wrench,
  Boxes,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import { signOut } from "next-auth/react";

interface SidebarProps {
  collapsed: boolean;
}

const menuItems = [
  { name: "Máquinas", icon: Package, href: "/dashboard/machines" },
  { name: "Facturación", icon: CreditCard, href: "/dashboard/billing" },
  { name: "Servicios", icon: Wrench, href: "/" },
  { name: "Stock", icon: Boxes, href: "/" },
  { name: "Mantenimiento", icon: Wrench, href: "/" },
  { name: "Configuración", icon: Settings, href: "/" },
];

export function Sidebar({ collapsed }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div
      className={`flex flex-col h-screen bg-zinc-300 text-black transition-all duration-300 ease-in-out ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="p-4 flex justify-between items-center">
        {!collapsed && (
          <Image
            src="/images/logo.png"
            alt="Logo de mi página"
            width={200}
            height={100}
          />
        )}
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <span
                className={`flex items-center p-2 mt-2 rounded-lg  ${
                  pathname === item.href ? "bg-gray-700" : "hover:bg-gray-400"
                }`}
              >
                <item.icon
                  className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-2"} ${
                    pathname === item.href ? "text-white" : ""
                  }`}
                />
                {!collapsed && (
                  <span
                    className={`${pathname === item.href ? "text-white" : ""}`}
                  >
                    {item.name}
                  </span>
                )}
              </span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-4">
        <Button
          variant="destructive"
          className={`w-full ${collapsed ? "justify-center" : "justify-start"}`}
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-2"} `} />
          {!collapsed && (
            <span className="text-white font-bold">Cerrar sesión</span>
          )}
        </Button>
      </div>
    </div>
  );
}
