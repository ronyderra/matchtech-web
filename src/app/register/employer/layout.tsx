import type { ReactNode } from "react";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Employer Registration | MatchTech";
const DESCRIPTION = "Create your MatchTech hiring account to swipe-first hire talent and match faster.";

export const metadata: Metadata = createPageMetadata({
  pathname: "/register/employer",
  title: TITLE,
  description: DESCRIPTION,
  robots: {
    index: false,
    follow: false,
  },
});

export default function EmployerRegisterLayout({ children }: { children: ReactNode }) {
  return children;
}

