'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Code2,
  Shield,
  Cloud,
  Database,
  Smartphone,
  Globe,
  Cpu,
  Network,
  Building2,
  Users,
  GraduationCap,
  Headphones,
  FileText,
  BarChart,
  Lightbulb,
} from 'lucide-react';

const services = [
  {
    title: "Software Development",
    href: "/services/software-development",
    description: "Custom software solutions tailored to your needs",
    icon: Code2,
  },
  {
    title: "Cybersecurity",
    href: "/services/cybersecurity",
    description: "Comprehensive security solutions for your business",
    icon: Shield,
  },
  {
    title: "Cloud Services",
    href: "/services/cloud",
    description: "Scalable cloud infrastructure and solutions",
    icon: Cloud,
  },
  {
    title: "Database Management",
    href: "/services/database",
    description: "Efficient database solutions and optimization",
    icon: Database,
  },
];

const solutions = [
  {
    title: "Enterprise Solutions",
    items: [
      {
        title: "Digital Transformation",
        href: "/solutions/digital-transformation",
        description: "Modernize your business operations",
        icon: Cpu,
      },
      {
        title: "Enterprise Architecture",
        href: "/solutions/enterprise-architecture",
        description: "Scalable enterprise-grade solutions",
        icon: Network,
      },
    ],
  },
  {
    title: "Industry Solutions",
    items: [
      {
        title: "Financial Services",
        href: "/solutions/financial",
        description: "Solutions for banking and finance",
        icon: Building2,
      },
      {
        title: "Healthcare IT",
        href: "/solutions/healthcare",
        description: "Digital healthcare solutions",
        icon: Users,
      },
    ],
  },
];

const company = [
  {
    title: "About Us",
    href: "/about",
    description: "Our story and mission",
    icon: Users,
  },
  {
    title: "Careers",
    href: "/careers",
    description: "Join our growing team",
    icon: GraduationCap,
  },
  {
    title: "Case Studies",
    href: "/case-studies",
    description: "Success stories and results",
    icon: FileText,
  },
  {
    title: "Blog",
    href: "/blog",
    description: "Insights and updates",
    icon: BarChart,
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[600px] gap-3 p-4 md:grid-cols-2">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <li key={service.href}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={service.href}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="h-5 w-5" />
                          <div className="text-sm font-medium leading-none">{service.title}</div>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {service.description}
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                );
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[600px] lg:w-[700px] lg:grid-cols-2">
              {solutions.map((group) => (
                <li key={group.title}>
                  <div className="mb-3 text-sm font-medium leading-none text-muted-foreground">
                    {group.title}
                  </div>
                  <ul className="space-y-2">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <li key={item.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={item.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="flex items-center gap-2">
                                <Icon className="h-5 w-5" />
                                <div className="text-sm font-medium leading-none">{item.title}</div>
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {item.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Company</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px]">
              {company.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="h-5 w-5" />
                          <div className="text-sm font-medium leading-none">{item.title}</div>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {item.description}
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                );
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/contact" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}