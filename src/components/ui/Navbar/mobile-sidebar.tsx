'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Code2,
  Shield,
  Cloud,
  Database,
  Cpu,
  Network,
  Building2,
  Users,
  GraduationCap,
  FileText,
  BarChart,
} from 'lucide-react';

const services = [
  {
    title: "Software Development",
    href: "/services/software-development",
    icon: Code2,
  },
  {
    title: "Cybersecurity",
    href: "/services/cybersecurity",
    icon: Shield,
  },
  {
    title: "Cloud Services",
    href: "/services/cloud",
    icon: Cloud,
  },
  {
    title: "Database Management",
    href: "/services/database",
    icon: Database,
  },
];

const solutions = [
  {
    title: "Digital Transformation",
    href: "/solutions/digital-transformation",
    icon: Cpu,
  },
  {
    title: "Enterprise Architecture",
    href: "/solutions/enterprise-architecture",
    icon: Network,
  },
  {
    title: "Financial Services",
    href: "/solutions/financial",
    icon: Building2,
  },
  {
    title: "Healthcare IT",
    href: "/solutions/healthcare",
    icon: Users,
  },
];

const company = [
  {
    title: "About Us",
    href: "/about",
    icon: Users,
  },
  {
    title: "Careers",
    href: "/careers",
    icon: GraduationCap,
  },
  {
    title: "Case Studies",
    href: "/case-studies",
    icon: FileText,
  },
  {
    title: "Blog",
    href: "/blog",
    icon: BarChart,
  },
];

export function MobileSidebar() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-[300px] p-0" title="Menu">
        <div className="flex flex-col gap-4 p-6">
          <Link
            href="/"
            className="text-lg font-semibold"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="services">
              <AccordionTrigger>Services</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2">
                  {services.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-2 rounded-md p-2 hover:bg-accent"
                        onClick={() => setOpen(false)}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="solutions">
              <AccordionTrigger>Solutions</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2">
                  {solutions.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-2 rounded-md p-2 hover:bg-accent"
                        onClick={() => setOpen(false)}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="company">
              <AccordionTrigger>Company</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2">
                  {company.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-2 rounded-md p-2 hover:bg-accent"
                        onClick={() => setOpen(false)}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Link
            href="/contact"
            className="text-lg font-semibold"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}