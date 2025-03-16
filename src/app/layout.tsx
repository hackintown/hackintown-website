import type { Metadata } from "next";
import "./globals.css";
import { Figtree } from "next/font/google";
import MainLayoutWrapper from "@/components/layout/MainLayoutWrapper";

// Configure Figtree font with various weights for different use cases
const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Hackintown Tech",
  description: "Hackintown Tech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <MainLayoutWrapper interClass={figtree.variable}>
        {children}
      </MainLayoutWrapper>
    </html>
  );
}
