"use client";

import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubMenuFooterProps {
  className?: string;
  text?: string;
  href?: string;
}

const SubMenuFooter = ({ className, text, href }: SubMenuFooterProps) => {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-center justify-between px-4 py-3 bg-primary/5 rounded-b-lg border-t border-primary/10",
        className
      )}
    >
      <div className="text-sm  mb-2 md:mb-0">
        {text || "Ready to get started?"}
        <Link
          href={href || "/contact"}
          className="font-semibold text-sm text-primary hover:text-primary/80 transition-colors px-2"
        >
          Let&apos;s talk
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-2 text-sm">
        <Link
          href="mailto:clientsupport@hackintown.com"
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
        >
          <Mail className="h-4 w-4" />
          <span>info@hackintown.com</span>
        </Link>

        <Link
          href="tel:+918851967714"
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
        >
          <Phone className="h-4 w-4" />
          <span>+91 8851967714</span>
        </Link>
      </div>
    </div>
  );
};

export default SubMenuFooter;
