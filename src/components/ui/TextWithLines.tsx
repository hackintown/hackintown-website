"use client";

import { cn } from "@/lib/utils";

interface TextWithLinesProps {
    text: string;
    className?: string;
}

export default function TextWithLines({ text, className }: TextWithLinesProps) {
    return (
        <div className={cn("inline-block px-14 py-1.5 bg-background rounded-lg border border-border", className)}>
            <div className="relative flex items-center justify-center">
                {/* Left line */}
                <div className="absolute left-[-32px] top-1/2 -translate-y-1/2">
                    <div className="relative w-[27px] h-[2px] bg-primary">
                        <div className="absolute right-0 top-[-4px] w-4 h-[2px] bg-primary"></div>
                    </div>
                </div>

                <h6 className="text-xs font-normal font-poppins tracking-[0.6px] uppercase text-muted-foreground whitespace-nowrap">
                    {text}
                </h6>

                {/* Right line */}
                <div className="absolute right-[-32px] top-1/2 -translate-y-1/2">
                    <div className="relative w-[27px] h-[2px] bg-primary">
                        <div className="absolute left-0 top-[-4px] w-4 h-[2px] bg-primary"></div>
                    </div>
                </div>
            </div>
        </div>
    );
} 