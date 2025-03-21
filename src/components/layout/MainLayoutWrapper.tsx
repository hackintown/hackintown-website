"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import { ThemeProvider } from "next-themes";
import Navbar from "../ui/Navbar/Navbar";

interface MainLayoutWrapperProps {
  children: React.ReactNode;
  interClass: string;
  jostClass: string;
  poppinsClass: string;
}

export default function MainLayoutWrapper({
  children,
  interClass,
  jostClass,
  poppinsClass,
}: MainLayoutWrapperProps) {
  const segments = useSelectedLayoutSegments();
  const isAdminRoute = segments[0] === "admin";

  return (
    <body className={`${interClass} ${jostClass} ${poppinsClass} antialiased`}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {!isAdminRoute && <Navbar />}
        <main>{children}</main>
      </ThemeProvider>
    </body>
  );
}
