"use client";

import { ReactNode } from "react";
import { Header } from "@/components/homepage/Header/Header";

export default function RegisterLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div style={{ paddingTop: 80 }}>{children}</div>
    </>
  );
}

