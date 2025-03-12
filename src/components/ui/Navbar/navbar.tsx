'use client';

import * as React from 'react';
import Link from 'next/link';
import { Monitor } from 'lucide-react';
import { MainNav } from '@/components/ui/Navbar/main-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { MobileSidebar } from '@/components/ui/Navbar/mobile-sidebar';

export function Navbar() {
    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex h-20 items-center border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center gap-4 md:gap-8">
                <MobileSidebar />
                <Link href="/" className="flex items-center gap-2 md:gap-3">
                    <Monitor className="h-6 w-6 text-primary md:h-8 md:w-8" />
                    <span className="font-bold text-xl md:text-2xl">TechPro Solutions</span>
                </Link>
            </div>

            <div className="hidden flex-1 md:flex md:justify-center">
                <MainNav />
            </div>

            <div className="ml-auto flex items-center gap-4">
                <Button variant="default" className="hidden md:inline-flex" asChild>
                    <Link href="/contact">Get Started</Link>
                </Button>
                <ThemeToggle />
            </div>
        </div>
    );
}