import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sam Mroz",
  description: "Sam Mroz's Personal Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "flex flex-col min-h-screen")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* <Toaster /> */}
          <Nav />
          <main className="grow flex flex-col">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
