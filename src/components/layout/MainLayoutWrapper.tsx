"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import { ThemeProvider } from "next-themes";
import Navbar from "../ui/Navbar/Navbar";
import Footer from "../ui/Footer/Footer";
import { Toaster } from "react-hot-toast";

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
        {!isAdminRoute && <Footer />}
      </ThemeProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </body>
  );
}
