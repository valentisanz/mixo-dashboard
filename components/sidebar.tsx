"use client";

import { useState, useEffect } from "react";
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
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Image from "next/image";

interface SidebarProps {
  onCollapse?: (collapsed: boolean) => void;
}

const menuItems = [
  { name: "Máquinas", icon: Package, href: "/" },
  { name: "Facturación", icon: CreditCard, href: "/facturacion" },
  { name: "Servicios", icon: Wrench, href: "/" },
  { name: "Stock", icon: Boxes, href: "/" },
  { name: "Mantenimiento", icon: Wrench, href: "/" },
  { name: "Configuración", icon: Settings, href: "/" },
];

export function Sidebar({ onCollapse }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (isSmallScreen) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [isSmallScreen]);

  useEffect(() => {
    if (onCollapse) {
      onCollapse(collapsed);
    }
  }, [collapsed, onCollapse]);


  return (
    <div
      className={`flex flex-col h-screen bg-zinc-400 text-white transition-all duration-300 ease-in-out ${
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
                className={`flex items-center p-2 rounded-lg hover:bg-gray-700 ${
                  pathname === item.href ? "bg-gray-700" : ""
                }`}
              >
                <item.icon
                  className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-2"}`}
                />
                {!collapsed && <span>{item.name}</span>}
              </span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-4">
        <Button
          variant="ghost"
          className={`w-full ${collapsed ? "justify-center" : "justify-start"}`}
          onClick={() => console.log("Logout")}
        >
          <LogOut className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-2"}`} />
          {!collapsed && <span>Cerrar sesión</span>}
        </Button>
      </div>
    </div>
  );
}
