"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import SubMenuFooter from "./SubMenuFooter";

interface SubMenuItem {
  name: string;
  desc: string;
  iconName?: keyof typeof import("lucide-react");
  group?: string;
  href: string;
}

interface MenuItem {
  name: string;
  gridCols?: 1 | 2 | 3;
  subMenu?: SubMenuItem[];
  subMenuHeading?: string[];
  href?: string;
  layout?: "grouped" | "default";
  footerText?: string;
  footerLink?: string;
}

interface DesktopMenuProps {
  menu: MenuItem;
}

const subMenuAnimate = {
  enter: {
    opacity: 1,
    rotateX: 0,
    transition: { duration: 0.5, ease: "easeOut" },
    display: "block",
  },
  exit: {
    opacity: 0,
    rotateX: -15,
    transition: { duration: 0.5, ease: "easeIn" },
    transitionEnd: { display: "none" },
  },
} as const;

export default function DesktopMenu({ menu }: DesktopMenuProps) {
  const [isHover, setIsHover] = useState(false);

  const handleMenuItemClick = () => {
    setIsHover(false);
  };

  const hasSubMenu = React.useMemo(
    () => menu?.subMenu && menu?.subMenu?.length > 0,
    [menu?.subMenu]
  );

  const getIcon = React.useCallback(
    (iconName: keyof typeof LucideIcons | undefined) => {
      if (!iconName) return null;
      const Icon = LucideIcons[iconName] as LucideIcons.LucideIcon;
      return Icon ? <Icon className="h-5 w-5 text-primary" /> : null;
    },
    []
  );

  const groupedSubMenus = React.useMemo(() => {
    if (!menu.subMenu || menu.layout !== "grouped") return null;

    return menu.subMenu.reduce((acc, item) => {
      const group = item.group || "default";
      if (!acc[group]) acc[group] = [];
      acc[group].push(item);
      return acc;
    }, {} as Record<string, SubMenuItem[]>);
  }, [menu.subMenu, menu.layout]);

  return (
    <motion.li
      className="group/link"
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
      key={menu.name}
    >
      {!hasSubMenu && menu.href ? (
        <Link href={menu.href}>
          <span className="flex items-center text-foreground font-medium text-xs xl:text-base gap-1 hover:bg-primary/5 cursor-pointer px-3 py-1 rounded-xl transition-all duration-200">
            {menu.name}
          </span>
        </Link>
      ) : (
        <span className="flex items-center font-medium text-xs text-foreground xl:text-base gap-1 hover:bg-primary/5 cursor-pointer px-3 py-1 rounded-xl transition-all duration-200">
          {menu.name}
          {hasSubMenu && (
            <ChevronDown
              className="mt-[0.6px] group-hover/link:rotate-180 duration-200 size-5 text-foreground/70 group-hover/link:text-primary"
              aria-hidden="true"
            />
          )}
        </span>
      )}

      {hasSubMenu && (
        <motion.div
          className="sub-menu"
          initial="exit"
          animate={isHover ? "enter" : "exit"}
          variants={subMenuAnimate}
          role="menu"
          aria-label={`${menu.name} submenu`}
        >
          {menu.layout === "grouped" &&
          groupedSubMenus &&
          menu.subMenuHeading ? (
            <>
              <div className="grid grid-cols-2 gap-8">
                {menu.subMenuHeading.map((heading, idx) => (
                  <div key={idx} className="space-y-4">
                    <h3 className="sub-menu-heading">{heading}</h3>
                    <div className="space-y-4 pt-2">
                      {groupedSubMenus[heading]?.map((submenu) => (
                        <Link
                          href={submenu.href || "#"}
                          key={submenu.name}
                          onClick={handleMenuItemClick}
                          className="sub-menu-item group"
                        >
                          {submenu.iconName && (
                            <div className="sub-menu-icon">
                              {getIcon(submenu.iconName)}
                            </div>
                          )}
                          <div>
                            <h4 className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                              {submenu.name}
                            </h4>
                            <p className="text-sm text-foreground/70 group-hover:text-foreground/90 transition-colors duration-200">
                              {submenu.desc}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {menu.footerText && menu.footerLink && (
                <SubMenuFooter
                  text={menu.footerText}
                  href={menu.footerLink}
                  className="mt-6 -mx-[15px] -mb-[15px] rounded-t-none"
                />
              )}
            </>
          ) : (
            <>
              <div
                className={cn(
                  "grid gap-7",
                  menu.gridCols === 3 && "grid-cols-3",
                  menu.gridCols === 2 && "grid-cols-2",
                  (!menu.gridCols || menu.gridCols === 1) && "grid-cols-1"
                )}
              >
                {menu.subMenu?.map((submenu, i) => (
                  <Link
                    href={submenu.href || "#"}
                    key={`${menu.name}-submenu-${i}`}
                    onClick={handleMenuItemClick}
                    className="relative cursor-pointer group"
                  >
                    {menu.gridCols &&
                      menu.gridCols > 1 &&
                      menu?.subMenuHeading?.[i] && (
                        <p className="sub-menu-heading mb-3">
                          {menu.subMenuHeading[i]}
                        </p>
                      )}
                    <div className="sub-menu-item">
                      {submenu.iconName && (
                        <div className="sub-menu-icon">
                          {getIcon(submenu.iconName)}
                        </div>
                      )}
                      <div>
                        <h6 className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                          {submenu.name}
                        </h6>
                        <p className="text-sm text-foreground/70 group-hover:text-foreground/90 transition-colors duration-200">
                          {submenu.desc}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              {menu.footerText && menu.footerLink && (
                <SubMenuFooter
                  text={menu.footerText}
                  href={menu.footerLink}
                  className="mt-6 -mx-[15px] -mb-[15px] rounded-t-none"
                />
              )}
            </>
          )}
        </motion.div>
      )}
    </motion.li>
  );
}
