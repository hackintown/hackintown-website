"use client";

import { useState, useCallback, useEffect, useMemo, useRef, JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Search,
  Code,
  Zap,
  Layers,
  Server,
  Globe,
  Cpu,
} from "lucide-react";
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
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle body scroll lock when menu is open
  useEffect(() => {
    if (isOpen) {
      // Prevent background scrolling when menu is open
      document.body.style.overflow = "hidden";

      // Focus search input when menu opens
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 300);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Debounce search input for better performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close menu on escape key press
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [isOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Handle swipe to close menu
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;

    const touchEnd = e.targetTouches[0].clientX;
    const diff = touchStart - touchEnd;

    // If swiped left more than 100px, close the menu
    if (diff > 100) {
      setIsOpen(false);
      setTouchStart(null);
    }
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    setClicked(null);
    setSearchQuery("");
  };

  const getIcon = useCallback((iconName: keyof typeof LucideIcons) => {
    const Icon = LucideIcons[iconName] as LucideIcons.LucideIcon;
    return Icon ? <Icon className="h-5 w-5" /> : null;
  }, []);

  // Enhanced animations for smoother transitions
  const menuAnimation = {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: "0%", opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 300,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  };

  const menuItemAnimation = {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.2 },
  };

  const subMenuAnimation = {
    enter: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.3, ease: "easeOut" },
        opacity: { duration: 0.2, ease: "easeIn" },
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.2, ease: "easeIn" },
        opacity: { duration: 0.1, ease: "easeOut" },
      },
    },
  };

  // Backdrop blur animation
  const backdropAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
  };

  // Memoize filtered menus for performance
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

  // Get category icon based on menu name
  const getCategoryIcon = (name: string) => {
    const iconMap: Record<string, JSX.Element> = {
      Services: <Layers className="h-5 w-5 text-primary" />,
      Solutions: <Zap className="h-5 w-5 text-secondary" />,
      Products: <Code className="h-5 w-5 text-accent" />,
      Company: <Globe className="h-5 w-5 text-chart-3" />,
      Resources: <Server className="h-5 w-5 text-chart-4" />,
      Technology: <Cpu className="h-5 w-5 text-chart-1" />,
    };

    return iconMap[name] || null;
  };

  return (
    <div className="relative">
      {/* Menu toggle button with animation */}
      <motion.button
        className="lg:hidden z-[999] relative p-2 hover:bg-primary/5 rounded-md transition-all duration-200"
        onClick={toggleDrawer}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={
            isOpen ? { rotate: 180, scale: 1.1 } : { rotate: 0, scale: 1 }
          }
          transition={{ duration: 0.3, ease: "anticipate" }}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-primary" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop blur overlay */}
            <motion.div
              className="fixed inset-0 top-16 bg-background/30 backdrop-blur-sm z-40 mobile-menu-backdrop"
              onClick={toggleDrawer}
              {...backdropAnimation}
            />

            {/* Mobile menu panel */}
            <motion.div
              ref={menuRef}
              className="fixed inset-y-0 left-0 top-16 w-[85%] max-w-sm bg-background/95 backdrop-blur-xl z-50 border-r border-border/20 shadow-xl mobile-menu-panel"
              {...menuAnimation}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
            >
              <div className="h-full flex flex-col pt-20">
                {/* Search Bar with enhanced styling */}
                <div className="p-4 border-b border-border/10">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/70" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search menu..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-primary/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Menu Content with animations */}
                <nav className="flex-1 overflow-y-auto mobile-menu-content">
                  {filteredMenus.length > 0 ? (
                    <ul className="p-4 space-y-3">
                      {filteredMenus.map((menu, i) => {
                        const isClicked = clicked === i;
                        const hasSubMenu =
                          menu.subMenu && menu.subMenu.length > 0;
                        const categoryIcon = getCategoryIcon(menu.name);

                        return (
                          <motion.li
                            key={menu.name}
                            className={cn(
                              "rounded-xl overflow-hidden border border-transparent",
                              isClicked && "border-primary/20 bg-primary/[0.03]"
                            )}
                            {...menuItemAnimation}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            {menu.href && !hasSubMenu ? (
                              <Link
                                href={menu.href}
                                className="mobile-menu-item group"
                                onClick={handleMenuItemClick}
                              >
                                <div className="flex items-center gap-3">
                                  {categoryIcon && (
                                    <div className="p-2 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
                                      {categoryIcon}
                                    </div>
                                  )}
                                  <span className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                                    {menu.name}
                                  </span>
                                </div>
                              </Link>
                            ) : (
                              <motion.button
                                className="w-full mobile-menu-item group"
                                onClick={() => setClicked(isClicked ? null : i)}
                                aria-expanded={isClicked}
                                whileTap={{ scale: 0.98 }}
                              >
                                <div className="flex items-center gap-3">
                                  {categoryIcon && (
                                    <div className="p-2 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
                                      {categoryIcon}
                                    </div>
                                  )}
                                  <span className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                                    {menu.name}
                                  </span>
                                </div>
                                {hasSubMenu && (
                                  <motion.div
                                    animate={{ rotate: isClicked ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-primary"
                                  >
                                    <ChevronDown className="h-5 w-5" />
                                  </motion.div>
                                )}
                              </motion.button>
                            )}

                            <AnimatePresence>
                              {hasSubMenu && isClicked && (
                                <motion.div
                                  initial="exit"
                                  animate="enter"
                                  exit="exit"
                                  variants={subMenuAnimation}
                                  className="overflow-hidden bg-gradient-to-b from-transparent to-primary/[0.02]"
                                >
                                  <div className="px-4 pb-4 space-y-2 pt-2">
                                    {menu.subMenu?.map((item, idx) => (
                                      <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                      >
                                        <Link
                                          href={item.href}
                                          onClick={handleMenuItemClick}
                                          className="mobile-submenu-item group"
                                        >
                                          {item.iconName && (
                                            <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-200">
                                              {getIcon(item.iconName)}
                                            </div>
                                          )}
                                          <div>
                                            <h4 className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                                              {item.name}
                                            </h4>
                                            {item.desc && (
                                              <p className="text-sm text-foreground/70 mt-0.5 group-hover:text-foreground/90 transition-colors duration-200">
                                                {item.desc}
                                              </p>
                                            )}
                                          </div>
                                        </Link>
                                      </motion.div>
                                    ))}
                                  </div>

                                  {menu.footerText && menu.footerLink && (
                                    <motion.div
                                      className="px-4 pb-4"
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: 0.2 }}
                                    >
                                      <SubMenuFooter
                                        text={menu.footerText}
                                        href={menu.footerLink}
                                        className="rounded-lg"
                                      />
                                    </motion.div>
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.li>
                        );
                      })}
                    </ul>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-40 p-4 text-center">
                      <Search className="h-10 w-10 text-primary/30 mb-2" />
                      <p className="text-foreground/70">No menu items found</p>
                      <p className="text-sm text-foreground/50">
                        Try a different search term
                      </p>
                    </div>
                  )}
                </nav>

                {/* Footer with SubMenuFooter component */}
                <div className="mt-auto p-4 border-t border-border/10 bg-gradient-to-r from-primary/5 to-transparent">
                  <SubMenuFooter
                    text="Ready to transform your business?"
                    href="/contact"
                    className="rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
