"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch and set default to light
  useEffect(() => {
    setMounted(true);
    if (!theme) {
      setTheme("light");
    }
  }, [theme, setTheme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!mounted) {
    return <div className="w-10 h-10 rounded-full animate-pulse bg-muted" />;
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full border border-border 
        bg-background
        dark:border-border dark:bg-background
        shadow-sm
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1"
    >
      <div className="relative w-5 h-5">
        <Sun
          className="absolute inset-0 h-5 w-5 rotate-0 scale-100 
            text-primary transition-all duration-300 ease-in-out
            dark:-rotate-90 dark:scale-0"
        />
        <Moon
          className="absolute inset-0 h-5 w-5 rotate-90 scale-0 
            text-primary transition-all duration-300 ease-in-out
            dark:rotate-0 dark:scale-100"
        />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}