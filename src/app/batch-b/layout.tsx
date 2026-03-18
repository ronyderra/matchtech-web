import type { ReactNode } from "react";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Batch B Components | MatchTech";
const DESCRIPTION = "Advanced UI component sandbox for MatchTech (noindex).";

export const metadata: Metadata = createPageMetadata({
  pathname: "/batch-b",
  title: TITLE,
  description: DESCRIPTION,
  robots: {
    index: false,
    follow: false,
  },
});

export default function BatchBLayout({ children }: { children: ReactNode }) {
  return children;
}

