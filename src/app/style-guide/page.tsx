import { SwipeLayout } from "@/components/SwipeLayout";

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

