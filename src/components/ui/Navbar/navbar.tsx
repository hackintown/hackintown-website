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
import { IoIosArrowForward } from "react-icons/io";
import { Button } from "../button";
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

    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIfMobile();
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkIfMobile);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkIfMobile);
    };
  }, [lastScrollY]);

  return (
    <motion.header
      className={cn(
        "fixed w-full z-50 bg-background shadow-sm",
        "top-[36px] sm:top-[36px] md:top-[41px]",
        isScrolled && " !top-[64px] shadow-sm bg-opacity-95 backdrop-blur-sm",
        "transition-all duration-300",
        !isVisible && "-translate-y-full"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container">
        <div className="flex h-16 items-center justify-between max-w-full">
          <Logo />

          <DesktopNavigation />

          <div className="flex items-center gap-2">
            {isMobile && <MobMenu Menus={NAVIGATION_MENUS} />}
            <div className="flex items-center gap-4">
              <DarkModeToggle />

              <Button
                variant="primary"
                size={"xs"}
                className="hidden sm:flex sm:size-sm md:size-md lg:size-lg"
                rightIcon={<IoIosArrowForward />}
              >
                Get a Quote
              </Button>

              <Button
                variant="primary"
                size={"lg"}
                className="flex sm:hidden"
                rightIcon={<IoIosArrowForward />}
              >
                Get a Quote
              </Button>
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
