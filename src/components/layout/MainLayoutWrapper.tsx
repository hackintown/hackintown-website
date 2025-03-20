"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import { ThemeProvider } from "next-themes";
import TopNavbar from "@/components/ui/Navbar/TopNavbar";
import { useEffect } from "react";
import Navbar from "../ui/Navbar/Navbar";

interface MainLayoutWrapperProps {
  children: React.ReactNode;
  interClass: string;
  jostClass: string;
  poppinsClass: string;
}

export default function MainLayoutWrapper({
  children,
  interClass,
  jostClass,
  poppinsClass,
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
    <body className={`${interClass} ${jostClass} ${poppinsClass} antialiased`}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {!isAdminRoute && (
          <div className="fixed top-0 w-full z-50 flex flex-col">
            <Navbar />
          </div>
        )}
        <main>{children}</main>
      </ThemeProvider>
    </body>
  );
}
