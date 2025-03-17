"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import { ThemeProvider } from "next-themes";
import TopNavbar from "@/components/ui/Navbar/TopNavbar";
import Navbar from "@/components/ui/Navbar/Navbar";
import { useEffect } from "react";

interface MainLayoutWrapperProps {
  children: React.ReactNode;
  interClass: string;
}

export default function MainLayoutWrapper({
  children,
  interClass,
}: MainLayoutWrapperProps) {
  const segments = useSelectedLayoutSegments();
  const isAdminRoute = segments[0] === "admin";

  // Dynamically measure and set the top navbar height for responsive layouts
  useEffect(() => {
    const updateTopNavHeight = () => {
      const topNav = document.querySelector(".top-navbar") as HTMLElement;
      if (topNav) {
        const height = `${topNav.offsetHeight}px`;
        document.documentElement.style.setProperty(
          "--top-navbar-height",
          height
        );
      }
    };

    // Update on mount and window resize
    updateTopNavHeight();
    window.addEventListener("resize", updateTopNavHeight);

    return () => window.removeEventListener("resize", updateTopNavHeight);
  }, []);

  return (
    <body className={`${interClass} antialiased`}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {!isAdminRoute && (
          <div className="fixed top-0 w-full z-50 flex flex-col">
            <TopNavbar />
            <Navbar />
          </div>
        )}
        <main className="pt-36 sm:pt-24">
          {children}
        </main>
      </ThemeProvider>
    </body>
  );
}
