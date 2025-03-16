"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import DesktopMenu from "./DesktopMenu";
import MobMenu from "./MobMenu";
import { NAVIGATION_MENUS } from "./constants";
import { throttle } from "lodash";
import { cn } from "@/lib/utils";
import DarkModeToggle from "../DarkModeToggle";
import { Search } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > 20);

      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    }, 100);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Initial check
    handleResize();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [lastScrollY]);

  return (
    <motion.header
      className={cn(
        "nav-container",
        isScrolled
          ? "nav-scrolled bg-background/95 backdrop-blur-md"
          : "bg-transparent",
        "py-1 transition-all duration-300 ease-in-out",
        !isVisible && "-translate-y-full"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="container">
        <div className="flex h-16 items-center justify-between max-w-full">
          <Logo />

          <DesktopNavigation />

          <div className="flex items-center gap-2">
            {isMobile && <MobMenu Menus={NAVIGATION_MENUS} />}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full bg-background/80 shadow-sm border border-border/20 hover:border-primary/30 transition-colors">
                <Search className="h-5 w-5 text-foreground/70" />
              </div>
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

const Logo = () => (
  <Link href="/" className="block text-2xl font-bold group">
    <span className="text-2xl xl:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent whitespace-nowrap group-hover:from-accent group-hover:to-primary transition-all duration-500">
      Hackintown
    </span>
  </Link>
);

const DesktopNavigation = () => (
  <nav className="hidden lg:flex items-center gap-2">
    <ul className="flex items-center gap-2 text-base">
      {NAVIGATION_MENUS.map((menu) => (
        <DesktopMenu key={menu.name} menu={menu} />
      ))}
    </ul>
  </nav>
);
