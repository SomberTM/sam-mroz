import { Cinzel as CinzelFont } from "next/font/google";
import React from "react";

const cinzel = CinzelFont({ subsets: ["latin"] });

export function Cinzel({ children }: { children: React.ReactNode }) {
  return <div className={cinzel.className}>{children}</div>;
}
