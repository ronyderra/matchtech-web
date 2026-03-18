import { SwipeLayout } from "@/components/SwipeLayout";

import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";

const TITLE = "MatchTech Style Guide | MatchTech";
const DESCRIPTION = "Internal UI style guide and component validation (noindex).";

export const metadata: Metadata = createPageMetadata({
  pathname: "/style-guide",
  title: TITLE,
  description: DESCRIPTION,
  robots: {
    index: false,
    follow: false,
  },
});

export default function StyleGuidePage() {
  return (
    <div>
      <h1>MatchTech Style Guide</h1>
      <p>
        This page exists to visually validate the core design tokens: colors,
        typography, radii, and layout widths.
      </p>

      <section style={{ marginTop: 32, marginBottom: 32 }}>
        <h2>Swipe Layout Preview</h2>
        <p>Example of the swipe column sized using layout tokens.</p>
        <div style={{ marginTop: 16 }}>
          <SwipeLayout />
        </div>
      </section>
    </div>
  );
}

