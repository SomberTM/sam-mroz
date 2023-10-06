import { Cantata_One } from "next/font/google";
import React from "react";

const canata = Cantata_One({ weight: "400", subsets: ["latin"] });

export function Cantata({ children }: { children: React.ReactNode }) {
  return <div className={canata.className}>{children}</div>;
}
