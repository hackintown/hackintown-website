import type { MenuItem } from "./types";

export const NAVIGATION_MENUS = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Trending News",
    subMenuHeading: ["Trending News", "Trending Articles"],
    subMenu: [
      {
        name: "Trending News",
        desc: "Trending news articles",
        href: "/trending-news",
        iconName: "Activity",
        group: "Trending News",
      },
      {
        name: "Trending Articles",
        desc: "Trending articles",
        href: "/trending-articles",
        iconName: "LineChart",
        group: "Trending Articles",
      },
      {
        name: "Trending Videos",
        desc: "Trending videos",
        href: "/trending-videos",
        iconName: "Calendar",
        group: "Trending Videos",
      },
      {
        name: "Trending Podcasts",
        desc: "Trending podcasts",
        href: "/trending-podcasts",
        iconName: "CalendarDays",
        group: "Trending Podcasts",
      },
    ],
    gridCols: 2,
    layout: "grouped",
    footerText: "Ready to get started?",
    footerLink: "/contact",
  },
  {
    name: "Entertainment",
    href: "/entertainment",
  },
  {
    name: "News",
    href: "/news",
  },
  {
    name: "FAQs",
    href: "/faqs",
  },
  {
    name: "Contact Us",
    href: "/contact-us",
  },
] as const satisfies MenuItem[];

export type NavigationMenu = (typeof NAVIGATION_MENUS)[number];
