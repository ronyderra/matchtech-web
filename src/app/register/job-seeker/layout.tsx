import type { ReactNode } from "react";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Job Seeker Registration | MatchTech";
const DESCRIPTION = "Create your MatchTech job seeker account and build a profile for swipe-first hiring.";

export const metadata: Metadata = createPageMetadata({
  pathname: "/register/job-seeker",
  title: TITLE,
  description: DESCRIPTION,
  robots: {
    index: false,
    follow: false,
  },
});

export default function JobSeekerRegisterLayout({ children }: { children: ReactNode }) {
  return children;
}

