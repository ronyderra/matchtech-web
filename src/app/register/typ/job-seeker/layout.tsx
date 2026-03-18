import type { ReactNode } from "react";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Job Seeker Signup | MatchTech";
const DESCRIPTION = "Sign up to join MatchTech and experience swipe-first hiring for job seekers.";

export const metadata: Metadata = createPageMetadata({
  pathname: "/register/typ/job-seeker",
  title: TITLE,
  description: DESCRIPTION,
  robots: {
    index: false,
    follow: false,
  },
});

export default function JobSeekerTypeformLayout({ children }: { children: ReactNode }) {
  return children;
}

