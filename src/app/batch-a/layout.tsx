import type { ReactNode } from "react";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Batch A Components | MatchTech";
const DESCRIPTION = "UI component sandbox for MatchTech (noindex).";

export const metadata: Metadata = createPageMetadata({
  pathname: "/batch-a",
  title: TITLE,
  description: DESCRIPTION,
  robots: {
    index: false,
    follow: false,
  },
});

export default function BatchALayout({ children }: { children: ReactNode }) {
  return children;
}

