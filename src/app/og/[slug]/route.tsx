import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/seo/site";
import { absoluteUrl } from "@/lib/seo/url";

export const runtime = "edge";

function SwipeMock({
  left,
  top,
  rotate,
  tone,
}: {
  left: number;
  top: number;
  rotate: number;
  tone: "blue" | "violet" | "teal";
}) {
  const tones = {
    blue: {
      a: "rgba(10, 102, 194, 0.95)",
      b: "rgba(0, 70, 145, 0.18)",
      c: "rgba(148, 163, 184, 0.28)",
    },
    violet: {
      a: "rgba(124, 58, 237, 0.95)",
      b: "rgba(91, 33, 182, 0.18)",
      c: "rgba(148, 163, 184, 0.28)",
    },
    teal: {
      a: "rgba(20, 184, 166, 0.95)",
      b: "rgba(13, 148, 136, 0.18)",
      c: "rgba(148, 163, 184, 0.28)",
    },
  }[tone];

  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width: 360,
        height: 220,
        display: "flex",
        borderRadius: 28,
        transform: `rotate(${rotate}deg)`,
        background: `linear-gradient(135deg, ${tones.a} 0%, rgba(0,0,0,0) 80%), radial-gradient(circle at 20% 0%, ${tones.b} 0%, rgba(0,0,0,0) 55%)`,
        border: "1px solid rgba(255,255,255,0.18)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.20)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(255,255,255,0.10), rgba(255,255,255,0))",
          opacity: 0.75,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 28,
          top: 26,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 18,
            background: "rgba(255,255,255,0.10)",
            border: "1px solid rgba(255,255,255,0.20)",
          }}
        />
        <div
          style={{
            marginTop: 18,
            width: 240,
            height: 16,
            borderRadius: 10,
            background: "rgba(255,255,255,0.14)",
          }}
        />
        <div
          style={{
            marginTop: 10,
            width: 290,
            height: 14,
            borderRadius: 10,
            background: tones.c,
          }}
        />
      </div>
      <div style={{ position: "absolute", left: 28, bottom: 26, right: 28, display: "flex", gap: 16 }}>
        <div
          style={{
            flex: 1,
            height: 34,
            borderRadius: 14,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.18)",
          }}
        />
        <div
          style={{
            flex: 0.7,
            height: 34,
            borderRadius: 14,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.18)",
          }}
        />
      </div>
    </div>
  );
}

export async function GET(
  _req: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const pickedSlug = slug ?? "default";
  const baseUrl = absoluteUrl("/");
  const logoUrl = new URL("/brand/matchtech-wordmark-square.png", baseUrl).toString();

  const contentBySlug = {
    default: {
      title: "Swipe-first hiring, built for fast matches",
      description: "MatchTech is a swipe-based recruitment platform for job seekers and employers.",
      bgA: "rgba(10, 102, 194, 0.95)",
      bgB: "rgba(2, 6, 23, 0.98)",
      tone: "blue" as const,
    },
    homepage: {
      title: "Swipe to Match,\nFind the Right Fit Faster",
      description: "Swipe-first hiring. Match faster. Find the right fit with MatchTech.",
      bgA: "rgba(10, 102, 194, 0.95)",
      bgB: "rgba(124, 58, 237, 0.95)",
      tone: "violet" as const,
    },
  } as const;

  const picked = contentBySlug[pickedSlug as keyof typeof contentBySlug] ?? contentBySlug.default;
  const titleLines = picked.title.split("\n");

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          padding: 72,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: `radial-gradient(circle at 12% 10%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 42%), linear-gradient(135deg, ${picked.bgA} 0%, ${picked.bgB} 100%)`,
          color: "white",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
        }}
      >
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 18,
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.22)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <img src={logoUrl} width={40} height={40} alt="" />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 34, fontWeight: 800, lineHeight: "1.05" }}>{SITE_NAME}</div>
            <div style={{ marginTop: 6, fontSize: 18, color: "rgba(255,255,255,0.82)" }}>
              Swipe-based hiring platform
            </div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 12, alignItems: "center" }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "rgba(255,255,255,0.70)",
                boxShadow: "0 0 0 6px rgba(255,255,255,0.08)",
              }}
              aria-hidden
            />
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.82)", fontWeight: 600 }}>
              HR tech
            </div>
          </div>
        </div>

        <div
          style={{
            position: "relative",
            paddingTop: 26,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: 54,
              fontWeight: 900,
              lineHeight: 1.02,
              maxWidth: 880,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {titleLines.map((line, idx) => (
              <div key={`${idx}-${line}`}>{line}</div>
            ))}
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 24,
              lineHeight: 1.25,
              color: "rgba(255,255,255,0.88)",
              maxWidth: 800,
              fontWeight: 500,
            }}
          >
            {picked.description}
          </div>

          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              display: "flex",
            }}
          >
            <SwipeMock left={720} top={250} rotate={10} tone={picked.tone} />
            <SwipeMock left={520} top={270} rotate={-8} tone="teal" />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              height: 42,
              padding: "0 16px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.20)",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 7,
                background: "rgba(255,255,255,0.18)",
              }}
            />
            <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: "-0.01em" }}>
              Job seekers + employers
            </div>
          </div>
          <div style={{ marginLeft: "auto", fontSize: 14, color: "rgba(255,255,255,0.78)" }}>
            matchtech • swipe hire
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}

