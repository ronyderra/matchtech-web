import type { ReactNode } from "react";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Registration received | MatchTech";
const DESCRIPTION = "Thanks for registering. We will notify you when MatchTech goes live.";

export const metadata: Metadata = createPageMetadata({
  pathname: "/register/thank-you",
  title: TITLE,
  description: DESCRIPTION,
  robots: {
    index: false,
    follow: false,
  },
});

export default function RegisterThankYouLayout({ children }: { children: ReactNode }) {
  return children;
}

