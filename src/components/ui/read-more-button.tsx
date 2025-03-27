"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ReadMoreButtonProps {
  text?: string;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  showArrow?: boolean;
}

export const ReadMoreButton = ({
  text = "Read More",
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
  showArrow = true,
}: ReadMoreButtonProps) => {
  const baseStyles = "inline-flex items-center gap-2 font-medium transition-all duration-300";

  const variantStyles = {
    primary: "text-primary hover:text-primary/80",
    secondary: "text-secondary hover:text-secondary/80",
    ghost: "text-muted-foreground hover:text-foreground",
  };

  const sizeStyles = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const arrowAnimation = {
    rest: { x: 0 },
    hover: { x: 4 },
  };

  const Component = href ? "a" : "button";
  const componentProps = href ? { href } : { onClick };

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <Component
        {...componentProps}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          "group relative",
          "after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-[72%]",
          className
        )}
      >
        <span>{text}</span>
        {showArrow && (
          <motion.span
            variants={arrowAnimation}
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <ArrowRight className="h-4 w-4" />
          </motion.span>
        )}
      </Component>
    </motion.div>
  );
}; 