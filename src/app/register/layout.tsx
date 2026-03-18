import { ReactNode } from "react";
import type { Metadata } from "next";
import { Header } from "@/components/homepage/Header/Header";
import { createPageMetadata } from "@/lib/seo/metadata";

const REGISTER_TITLE = "Register | MatchTech";
const REGISTER_DESCRIPTION = "Create your MatchTech account to swipe-first hire as a job seeker or employer.";

export const metadata: Metadata = createPageMetadata({
  pathname: "/register",
  title: REGISTER_TITLE,
  description: REGISTER_DESCRIPTION,
  robots: {
    index: false,
    follow: false,
  },
});

export default function RegisterLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div style={{ paddingTop: 80 }}>{children}</div>
    </>
  );
}

