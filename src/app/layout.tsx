import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Nav } from "@/components/nav";
import { cn } from "@/lib/utils";

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
          <Nav />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
