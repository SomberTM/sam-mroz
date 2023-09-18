import { Montserrat as MonsterratFont } from "next/font/google";
import React from "react";

const monsterrat = MonsterratFont({ subsets: ["latin"] });

export function Montserrat({ children }: { children: React.ReactNode }) {
  return <div className={monsterrat.className}>{children}</div>;
}
