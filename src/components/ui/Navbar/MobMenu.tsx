"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import * as LucideIcons from "lucide-react";
import SubMenuFooter from "./SubMenuFooter";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SubMenuItem {
  name: string;
  desc?: string;
  href: string;
  iconName: keyof typeof import("lucide-react");
  group?: string;
}

interface MenuItem {
  name: string;
  href?: string;
  subMenuHeading?: string[];
  subMenu?: SubMenuItem[];
  gridCols?: 1 | 2 | 3;
  footerText?: string;
  footerLink?: string;
  layout?: "grouped" | "default";
}

interface MobMenuProps {
  Menus: MenuItem[];
}

export default function MobMenu({ Menus }: MobMenuProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [clicked, setClicked] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    setClicked(null);
    setSearchQuery("");
  };

  const getIcon = useCallback((iconName: keyof typeof LucideIcons) => {
    const Icon = LucideIcons[iconName] as LucideIcons.LucideIcon;
    return Icon ? <Icon className="h-5 w-5" /> : null;
  }, []);

  const menuAnimation = {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: "0%", opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
    transition: { type: "spring", damping: 25, stiffness: 200 },
  };

  const subMenuAnimation = {
    enter: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.2 },
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.2 },
        opacity: { duration: 0.1 },
      },
    },
  };

  const filteredMenus = useMemo(
    () =>
      Menus.map((menu) => ({
        ...menu,
        subMenu: menu.subMenu?.filter(
          (item) =>
            item.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
            item.desc?.toLowerCase().includes(debouncedQuery.toLowerCase())
        ),
      })).filter(
        (menu) =>
          menu.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          (menu.subMenu && menu.subMenu.length > 0)
      ),
    [Menus, debouncedQuery]
  );

  const handleMenuItemClick = () => {
    setIsOpen(false);
    setClicked(null);
    setSearchQuery("");
  };

  return (
    <div className="relative">
      <button
        className={cn(
          "lg:hidden z-[999] relative p-2 rounded-full transition-all duration-300",
          isOpen
            ? "bg-primary text-primary-foreground rotate-90"
            : "hover:bg-primary/10 hover:scale-105"
        )}
        onClick={toggleDrawer}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="size-7" /> : <Menu className="size-7" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed h-lvh inset-0 top-0 bg-background/98 backdrop-blur-xl z-50 py-24"
            {...menuAnimation}
          >
            <div className="h-full flex flex-col">
              {/* Search Bar */}
              <div className="px-6 pb-6 border-b border-border/20">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    placeholder="Search menu..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-muted/50 rounded-xl border border-border/10 
                    focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30
                    placeholder:text-muted-foreground/70 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Menu Content */}
              <nav className="flex-1 overflow-y-auto">
                <ul className="p-6 space-y-3">
                  {filteredMenus.map((menu, i) => {
                    const isClicked = clicked === i;
                    const hasSubMenu = menu.subMenu && menu.subMenu.length > 0;

                    return (
                      <li
                        key={menu.name}
                        className={cn(
                          "rounded-xl overflow-hidden border transition-all duration-300",
                          isClicked
                            ? "border-primary/20 bg-primary/5 shadow-lg shadow-primary/5"
                            : "border-transparent hover:border-border/20"
                        )}
                      >
                        {menu.href && !hasSubMenu ? (
                          <Link
                            href={menu.href}
                            className="flex items-center gap-3 p-4 hover:bg-primary/5 rounded-xl transition-all duration-300"
                            onClick={handleMenuItemClick}
                          >
                            <span className="font-medium text-foreground/90">
                              {menu.name}
                            </span>
                          </Link>
                        ) : (
                          <button
                            className="w-full flex items-center justify-between p-4 hover:bg-primary/5 rounded-xl transition-all duration-300"
                            onClick={() => setClicked(isClicked ? null : i)}
                            aria-expanded={isClicked}
                          >
                            <span className="font-medium text-foreground/90">
                              {menu.name}
                            </span>
                            {hasSubMenu && (
                              <ChevronDown
                                className={cn(
                                  "h-4 w-4 text-primary transition-transform duration-300",
                                  isClicked && "rotate-180"
                                )}
                              />
                            )}
                          </button>
                        )}

                        <AnimatePresence>
                          {hasSubMenu && isClicked && (
                            <motion.div
                              initial="exit"
                              animate="enter"
                              exit="exit"
                              variants={subMenuAnimation}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-4 space-y-2">
                                {menu.subMenu?.map((item) => (
                                  <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={handleMenuItemClick}
                                    className="flex items-start gap-4 p-3 rounded-xl hover:bg-primary/5 
                                    transition-all duration-300 hover:translate-x-1"
                                  >
                                    {item.iconName && (
                                      <div
                                        className="p-2.5 rounded-lg bg-primary/10 text-primary 
                                      shadow-sm shadow-primary/10 transition-colors duration-300"
                                      >
                                        {getIcon(item.iconName)}
                                      </div>
                                    )}
                                    <div>
                                      <h4 className="font-medium text-foreground/90">
                                        {item.name}
                                      </h4>
                                      {item.desc && (
                                        <p className="text-sm text-muted-foreground mt-1">
                                          {item.desc}
                                        </p>
                                      )}
                                    </div>
                                  </Link>
                                ))}
                              </div>

                              {menu.footerText && menu.footerLink && (
                                <div className="px-4 pb-4">
                                  <SubMenuFooter
                                    text={menu.footerText}
                                    href={menu.footerLink}
                                    className="rounded-xl bg-muted/50 border border-border/10"
                                  />
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
