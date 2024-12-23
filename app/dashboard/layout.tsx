"use client";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [collapsed, setCollapsed] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (isSmallScreen) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [isSmallScreen]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar collapsed={collapsed} />
      <main
        className={`flex-1 p-4 sm:p-6 md:p-8 overflow-auto transition-all duration-300 ease-in-out ${
          collapsed || isSmallScreen ? "ml-0" : "ml-1"
        }`}
      >
        <div className="container mx-auto p-4">{children}</div>
      </main>
    </div>
  );
}
