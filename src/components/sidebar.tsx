'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  LayoutGrid,
  Lightbulb,
  FileText,
  Users,
  Briefcase,
  Phone,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const sidebarItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: LayoutGrid, label: 'Services', href: '/services' },
  { icon: Lightbulb, label: 'Solutions', href: '/solutions' },
  { icon: FileText, label: 'Case Studies', href: '/case-studies' },
  { icon: Users, label: 'About Us', href: '/about' },
  { icon: Briefcase, label: 'Careers', href: '/careers' },
  { icon: Phone, label: 'Contact', href: '/contact' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col gap-2 bg-background p-4">
      <div className="flex-1 space-y-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.href}
              variant={pathname === item.href ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start gap-2',
                pathname === item.href && 'bg-primary text-primary-foreground'
              )}
            >
              <Link href={item.href}>
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
}