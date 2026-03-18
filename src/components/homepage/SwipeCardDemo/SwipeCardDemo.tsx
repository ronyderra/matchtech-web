"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import styles from "./SwipeCardDemo.module.css";
import type { AppUser } from "@/store/user-store";
import type { CompanyDetails, TalentDetails } from "@/types";

type CardType = "company" | "talent";

type CardTheme =
  | "blue"
  | "violet"
  | "teal"
  | "amber"
  | "rose"
  | "emerald";

const THEME_COLORS: Record<
  CardTheme,
  {
    bannerStart: string;
    bannerMid: string;
    bannerEnd: string;
    typePillBg: string;
    typePillColor: string;
    typePillBorder: string;
    bulletBg: string;
  }
> = {
  blue: {
    bannerStart: "rgba(10, 102, 194, 1)",
    bannerMid: "rgba(23, 65, 102, 1)",
    bannerEnd: "rgba(2, 6, 23, 1)",
    typePillBg: "rgba(10, 102, 194, 0.08)",
    typePillColor: "rgb(30, 64, 175)",
    typePillBorder: "rgba(10, 102, 194, 0.14)",
    bulletBg: "rgba(10, 102, 194, 0.35)",
  },
  violet: {
    bannerStart: "rgba(124, 58, 237, 1)",
    bannerMid: "rgba(76, 29, 149, 1)",
    bannerEnd: "rgba(30, 27, 75, 1)",
    typePillBg: "rgba(124, 58, 237, 0.08)",
    typePillColor: "rgb(91, 33, 182)",
    typePillBorder: "rgba(124, 58, 237, 0.14)",
    bulletBg: "rgba(124, 58, 237, 0.35)",
  },
  teal: {
    bannerStart: "rgba(20, 184, 166, 1)",
    bannerMid: "rgba(15, 118, 110, 1)",
    bannerEnd: "rgba(4, 47, 46, 1)",
    typePillBg: "rgba(20, 184, 166, 0.08)",
    typePillColor: "rgb(13, 148, 136)",
    typePillBorder: "rgba(20, 184, 166, 0.14)",
    bulletBg: "rgba(20, 184, 166, 0.35)",
  },
  amber: {
    bannerStart: "rgba(245, 158, 11, 1)",
    bannerMid: "rgba(180, 83, 9, 1)",
    bannerEnd: "rgba(69, 26, 3, 1)",
    typePillBg: "rgba(245, 158, 11, 0.08)",
    typePillColor: "rgb(161, 98, 7)",
    typePillBorder: "rgba(245, 158, 11, 0.14)",
    bulletBg: "rgba(245, 158, 11, 0.35)",
  },
  rose: {
    bannerStart: "rgba(244, 63, 94, 1)",
    bannerMid: "rgba(190, 18, 60, 1)",
    bannerEnd: "rgba(76, 5, 25, 1)",
    typePillBg: "rgba(244, 63, 94, 0.08)",
    typePillColor: "rgb(190, 18, 60)",
    typePillBorder: "rgba(244, 63, 94, 0.14)",
    bulletBg: "rgba(244, 63, 94, 0.35)",
  },
  emerald: {
    bannerStart: "rgba(16, 185, 129, 1)",
    bannerMid: "rgba(5, 150, 105, 1)",
    bannerEnd: "rgba(6, 78, 59, 1)",
    typePillBg: "rgba(16, 185, 129, 0.08)",
    typePillColor: "rgb(4, 120, 87)",
    typePillBorder: "rgba(16, 185, 129, 0.14)",
    bulletBg: "rgba(16, 185, 129, 0.35)",
  },
};

export type SwipeCardData = {
  type: CardType;
  theme?: CardTheme;
  title: string;
  subtitle: string;
  metaLine: string;
  topRightPill: string;
  avatarText: string;
  /** Optional: path or URL for profile/logo image (e.g. /images/people/leah.jpg). Shows in the circle. */
  avatarImageUrl?: string;
  /** Optional: path or URL for banner/header image (e.g. /images/office.jpg). Fills the top section. */
  bannerImageUrl?: string;
  description: string;
  tags: string[];
  quickFacts: { label: string; value: string }[];
  detailItems: string[];
  /** Company cards only: company name and about. */
  companyName?: string;
  companyAbout?: string;
  companyFacts?: { label: string; value: string }[];
};

function formatLocation(city?: string | null, country?: string | null) {
  const parts = [city, country].filter((p) => p && String(p).trim());
  return parts.join(", ");
}

function pickTheme(backgroundColor?: string): CardTheme | undefined {
  if (!backgroundColor) return undefined;
  const entry = (Object.entries(THEME_COLORS) as [CardTheme, (typeof THEME_COLORS)[CardTheme]][])
    .find(([, v]) => v.bannerStart === backgroundColor);
  return entry?.[0];
}

export function profileToSwipeCardData(user: AppUser): SwipeCardData {
  if (user.type === "talent") {
    const t = user as TalentDetails;
    const name = t.fullName?.trim() || `${t.firstName ?? ""} ${t.lastName ?? ""}`.trim() || "Your profile";
    const role = t.jobPosition?.departments?.[0] || t.role || "Role preference";
    const location = formatLocation(t.city, t.country) || formatLocation(t.address?.city, t.address?.country);
    const metaBits = [
      t.yearsOfExperience ? `${t.yearsOfExperience}+ years` : null,
      t.workPreference && t.workPreference !== "any" ? t.workPreference : null,
      t.availableFrom ? `Available: ${t.availableFrom}` : null,
      location || null,
    ].filter(Boolean);

    const skills = (t.skills ?? []).filter(Boolean).slice(0, 8);
    const languages = (t.languages ?? []).filter(Boolean).slice(0, 3);
    const expCount = (t.experiences ?? []).length;

    return {
      type: "talent",
      theme: pickTheme(t.backgroundColor) ?? "violet",
      title: name,
      subtitle: role,
      metaLine: metaBits.join(" · "),
      topRightPill: expCount ? `${expCount} roles` : t.yearsOfExperience ? `${t.yearsOfExperience} yrs exp` : "Profile",
      avatarText: (t.firstName?.[0] ?? "U") + (t.lastName?.[0] ?? ""),
      avatarImageUrl: t.avatarUrl || t.imageUrl || undefined,
      description: (t.bio ?? "").trim() || "Bio will be available when MatchTech goes live.",
      tags: skills,
      quickFacts: [
        t.availableFrom ? { label: "Availability", value: t.availableFrom } : null,
        t.workPreference && t.workPreference !== "any" ? { label: "Work style", value: t.workPreference } : null,
        languages.length ? { label: "Languages", value: languages.join(", ") } : null,
      ].filter(Boolean) as { label: string; value: string }[],
      detailItems: (t.experiences ?? [])
        .slice(0, 3)
        .map((e) => [e.jobTitle, e.companyName].filter(Boolean).join(" · "))
        .filter((s) => s.trim().length > 0),
    };
  }

  const c = user as CompanyDetails;
  const firstPosition = c.positions?.[0];
  const location = formatLocation(c.address?.city, c.address?.country);
  const posTitle = firstPosition?.industry || firstPosition?.departments?.[0] || "Open position";
  const posMeta = [
    firstPosition?.workPreference && firstPosition.workPreference !== "any" ? firstPosition.workPreference : null,
    location || null,
    c.industry || null,
  ].filter(Boolean);

  return {
    type: "company",
    theme: pickTheme(c.backgroundColor) ?? "blue",
    title: firstPosition?.id ? firstPosition.id : posTitle,
    subtitle: c.companyName || "Your company",
    metaLine: posMeta.join(" · "),
    topRightPill: c.positions?.length ? `${c.positions.length} positions` : "Hiring soon",
    avatarText: (c.companyName?.[0] ?? "C").toUpperCase(),
    avatarImageUrl: c.logoUrl || c.imageUrl || undefined,
    companyName: c.companyName || undefined,
    companyAbout: (c.description ?? "").trim() || undefined,
    companyFacts: [
      c.industry ? { label: "Industry", value: c.industry } : null,
      location ? { label: "Location", value: location } : null,
    ].filter(Boolean) as { label: string; value: string }[],
    description:
      firstPosition?.shortDescription ||
      "We’ll finalize your company card once MatchTech goes live.",
    tags: (firstPosition?.skillsRequired ?? []).slice(0, 8),
    quickFacts: [
      c.positions?.length ? { label: "Open roles", value: String(c.positions.length) } : null,
      firstPosition?.employmentType && firstPosition.employmentType !== "any"
        ? { label: "Employment", value: firstPosition.employmentType }
        : null,
    ].filter(Boolean) as { label: string; value: string }[],
    detailItems: (c.positions ?? [])
      .slice(0, 3)
      .map((p) => [p.industry, p.departments?.[0], p.workPreference].filter(Boolean).join(" · "))
      .filter((s) => s.trim().length > 0),
  };
}

export function ProfileCardPreview({ user }: { user: AppUser }) {
  const card = profileToSwipeCardData(user);
  const limitedDescription = limitToSentences(card.description, 2);
  const theme = card.theme ?? "blue";
  const themeColors = THEME_COLORS[theme];
  const cardThemeStyle: React.CSSProperties = {
    ["--card-banner-start" as string]: themeColors.bannerStart,
    ["--card-banner-mid" as string]: themeColors.bannerMid,
    ["--card-banner-end" as string]: themeColors.bannerEnd,
    ["--card-type-pill-bg" as string]: themeColors.typePillBg,
    ["--card-type-pill-color" as string]: themeColors.typePillColor,
    ["--card-type-pill-border" as string]: themeColors.typePillBorder,
    ["--card-bullet-bg" as string]: themeColors.bulletBg,
  };

  return (
    <div className={[styles.root, styles.previewRoot].join(" ")}>
      <div className={styles.stack}>
        <div className={[styles.cardSlot, styles.front].filter(Boolean).join(" ")}>
          <div className={styles.card} style={cardThemeStyle}>
            <div className={styles.cardTop}>
              <div
                className={[
                  styles.banner,
                  !card.bannerImageUrl && styles.bannerUnified,
                ].filter(Boolean).join(" ")}
                style={
                  card.bannerImageUrl
                    ? { backgroundImage: `url(${card.bannerImageUrl})` }
                    : undefined
                }
              >
                <span className={styles.bannerType}>
                  {card.type === "company" ? "Company" : "Talent"}
                </span>
                <div className={styles.bannerAvatar}>
                  {card.avatarImageUrl ? (
                    <Image
                      src={card.avatarImageUrl}
                      alt={card.type === "company" ? "Company logo" : "Candidate photo"}
                      className={
                        card.avatarImageUrl.endsWith(".svg")
                          ? styles.bannerAvatarImgContain
                          : styles.bannerAvatarImg
                      }
                      width={96}
                      height={96}
                      unoptimized
                    />
                  ) : (
                    card.avatarText
                  )}
                </div>
                {card.topRightPill ? (
                  <span className={styles.bannerHighlight}>{card.topRightPill}</span>
                ) : null}
              </div>
            </div>

            <div className={styles.cardMain}>
              <div className={styles.metaRowTop}>
                <span className={styles.typePill}>
                  {card.type === "company" ? "Company" : "Talent"}
                </span>
                <span className={styles.scorePill}>
                  Match score <strong>92%</strong>
                </span>
              </div>

              {card.type === "company" && (card.companyName || card.companyAbout) && (
                <>
                  <p className={styles.sectionLabel}>About the company</p>
                  {card.companyName ? (
                    <h3 className={styles.companyName}>{card.companyName}</h3>
                  ) : null}
                  {card.companyAbout ? (
                    <p className={styles.companyAbout}>{card.companyAbout}</p>
                  ) : null}
                  {card.companyFacts && card.companyFacts.length > 0 ? (
                    <div className={styles.factsGrid}>
                      {card.companyFacts.map((f) => (
                        <div key={f.label} className={styles.factItem}>
                          <span className={styles.factLabel}>{f.label}</span>
                          <span className={styles.factValue}>{f.value}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  <p className={styles.sectionLabel}>Role we&apos;re hiring for</p>
                </>
              )}

              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardSubtitle}>{card.subtitle}</p>
              <p className={styles.cardMetaLine}>{card.metaLine}</p>
              <p className={styles.cardBody}>{limitedDescription}</p>

              <div className={styles.factsGrid}>
                {card.quickFacts.map((f) => (
                  <div key={f.label} className={styles.factItem}>
                    <span className={styles.factLabel}>{f.label}</span>
                    <span className={styles.factValue}>{f.value}</span>
                  </div>
                ))}
              </div>

              <div className={styles.divider} />

              <div className={styles.skillsRow}>
                {card.tags.map((tag) => (
                  <span key={tag} className={styles.skillTag}>
                    {tag}
                  </span>
                ))}
              </div>

              <ul className={styles.detailsList}>
                {card.detailItems.map((t) => (
                  <li key={t} className={styles.detailsItem}>
                    <span className={styles.bulletDot} aria-hidden="true" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.cardBottom}>
              <button type="button" disabled className={`${styles.actionButton} ${styles.actionPass}`}>
                <span className={styles.actionIcon}>✕</span>
                <span className={styles.actionLabel}>Pass</span>
              </button>
              <button type="button" disabled className={`${styles.actionButton} ${styles.actionInfo}`}>
                <span className={styles.actionIcon}>i</span>
                <span className={styles.actionLabel}>Info</span>
              </button>
              <button type="button" disabled className={`${styles.actionButton} ${styles.actionMatch}`}>
                <span className={styles.actionIcon}>✓</span>
                <span className={styles.actionLabel}>Match</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const CARDS: SwipeCardData[] = [
  {
    type: "company",
    theme: "blue",
    title: "Senior Frontend Engineer",
    subtitle: "I-Need.com · Product team",
    metaLine: "Remote · Full-time · Europe",
    topRightPill: "€110k–€140k · Equity",
    avatarText: "A",
    avatarImageUrl: "/assets/companyImages/company-1.png",
    companyName: "I-Need.com",
    companyAbout:
      "We build a swipe-first hiring platform used by thousands of candidates and hiring teams every month. Product-led, remote-first, and growing across Europe.",
    companyFacts: [
      { label: "Industry", value: "HR Tech" },
      { label: "Size", value: "~80 people" },
      { label: "HQ", value: "Amsterdam" },
    ],
    description:
      "Help shape our core product experience: own UI architecture, design system, and accessibility. You’ll work with product and backend in a small, async-friendly team.",
    tags: ["React", "TypeScript", "Next.js", "5+ years"],
    quickFacts: [
      { label: "Level", value: "Senior" },
      { label: "Team", value: "12 engineers" },
      { label: "Process", value: "2 interviews" },
    ],
    detailItems: [
      "Own core UI architecture and performance",
      "Design system and accessibility standards",
      "Async-friendly team across EU time zones",
    ],
  },
  {
    type: "talent",
    theme: "violet",
    title: "Leah Kim",
    subtitle: "Product Designer",
    metaLine: "7+ years · Remote-first · CET",
    topRightPill: "7 yrs exp",
    avatarText: "LK",
    avatarImageUrl: "/assets/profileImages/2.jpg",
    description:
      "Designs thoughtful, research-driven experiences for B2B SaaS teams. Previously at Flow Studio and Northline.",
    tags: ["Product design", "Figma", "Design systems", "User research"],
    quickFacts: [
      { label: "Availability", value: "2 weeks" },
      { label: "Work style", value: "Remote" },
      { label: "Focus", value: "SaaS UX" },
    ],
    detailItems: [
      "Strong discovery → delivery collaboration",
      "Runs workshops and rapid prototyping",
      "Comfortable owning a full product area",
    ],
  },
  {
    type: "company",
    theme: "teal",
    title: "Backend Engineer",
    subtitle: "DataFirst · Platform",
    metaLine: "Hybrid · Berlin · Full-time",
    topRightPill: "€90k–€120k · Stock options",
    avatarText: "D",
    avatarImageUrl: "/assets/companyImages/company-2.png",
    companyName: "Hugging-Life",
    companyAbout:
      "Data infrastructure and analytics for enterprise. We help companies unify data pipelines, real-time events, and BI. Series B, 200+ employees.",
    companyFacts: [
      { label: "Industry", value: "Data / Analytics" },
      { label: "Size", value: "200+" },
      { label: "HQ", value: "Berlin" },
    ],
    description:
      "Own APIs and data pipelines that power matching, notifications, and analytics at scale across the platform.",
    tags: ["Go", "PostgreSQL", "Redis", "Distributed systems"],
    quickFacts: [
      { label: "Stack", value: "Go + Postgres" },
      { label: "On-call", value: "1x / month" },
      { label: "Impact", value: "Core platform" },
    ],
    detailItems: [
      "Build reliable services with SLAs",
      "Improve observability and tooling",
      "Work closely with product and data",
    ],
  },
  {
    type: "talent",
    theme: "amber",
    title: "Jordan Lee",
    subtitle: "UX Researcher",
    metaLine: "5+ years · Hybrid · PST",
    topRightPill: "5 yrs exp",
    avatarText: "JL",
    avatarImageUrl: "/assets/profileImages/4.jpg",
    description:
      "Uncovers user needs and shapes product strategy through mixed-method research. Led research at Horizon and Stellar.",
    tags: ["User research", "Interviews", "Usability", "Analytics"],
    quickFacts: [
      { label: "Availability", value: "1 month" },
      { label: "Work style", value: "Hybrid" },
      { label: "Focus", value: "B2B discovery" },
    ],
    detailItems: [
      "End-to-end research from planning to insights",
      "Strong stakeholder and workshop facilitation",
      "Quant and qual with clear deliverables",
    ],
  },
  {
    type: "company",
    theme: "rose",
    title: "Product Manager",
    subtitle: "ScaleUp · Growth",
    metaLine: "Remote · Full-time · Americas",
    topRightPill: "€100k–€130k · Bonus",
    avatarText: "S",
    avatarImageUrl: "/assets/companyImages/company-3.png",
    companyName: "LogigCloud",
    companyAbout:
      "B2B growth and engagement platform for mid-market and enterprise. We help sales and marketing teams align and convert. Remote-first, 150+ people.",
    companyFacts: [
      { label: "Industry", value: "SaaS / Growth" },
      { label: "Size", value: "150+" },
      { label: "HQ", value: "Austin" },
    ],
    description:
      "Drive roadmap and go-to-market for our core product. Own discovery, prioritization, and launch with design and engineering.",
    tags: ["Product", "Roadmap", "B2B", "4+ years"],
    quickFacts: [
      { label: "Level", value: "Senior" },
      { label: "Team", value: "Product + Eng" },
      { label: "Process", value: "Case + fit" },
    ],
    detailItems: [
      "Own discovery, prioritization, and launch",
      "Work with design and engineering leads",
      "Metrics-driven and customer-close",
    ],
  },
  {
    type: "talent",
    theme: "emerald",
    title: "Sam Rivera",
    subtitle: "Full-Stack Engineer",
    metaLine: "6+ years · Remote · EST",
    topRightPill: "6 yrs exp",
    avatarText: "SR",
    avatarImageUrl: "/assets/profileImages/michael-dam-mEZ3PoFGs_k-unsplash.jpg",
    description:
      "Builds scalable web apps and APIs with React and Node. Shipped products at FinTech and health-tech startups.",
    tags: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    quickFacts: [
      { label: "Availability", value: "3 weeks" },
      { label: "Work style", value: "Remote" },
      { label: "Focus", value: "Full-stack" },
    ],
    detailItems: [
      "Strong in both frontend and backend",
      "Experience with regulated industries",
      "Comfortable leading technical decisions",
    ],
  },
];

function limitToSentences(text: string, maxSentences: number): string {
  if (!text) return text;
  const matches = text.match(/[^.!?]*[.!?]/g);
  if (!matches) return text;
  const limited = matches.slice(0, maxSentences).join(" ").trim();
  return limited || text;
}

const IDLE_MS = 3800;
const SWIPE_MS = 1000;
const TRANSITION_MS = 900;
const EXIT_FADE_MS = 1300;

export function SwipeCardDemo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<"idle" | "swiping" | "done">("idle");
  const [swipeDir, setSwipeDir] = useState<1 | -1>(1);
  const [exitingIndex, setExitingIndex] = useState<number | null>(null);
  const [exitingDir, setExitingDir] = useState<1 | -1>(1);
  const [transitioningFromBack, setTransitioningFromBack] = useState(false);
  const [indicatorVisible, setIndicatorVisible] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  }, []);

  const startSwipe = useCallback(() => {
    const dir: 1 | -1 = swipeDir === 1 ? -1 : 1;
    setPhase("swiping");
    setSwipeDir(dir);
    setIndicatorVisible(true);
    timers.current.push(
      setTimeout(() => {
        const oldFront = currentIndex;
        setExitingIndex(oldFront);
        setExitingDir(dir);
        // Advance to next card. We do NOT animate the old card into the back;
        // it simply swipes out, and the next card becomes the new front.
        setCurrentIndex((i) => (i + 1) % CARDS.length);
        setTransitioningFromBack(true);
        setPhase("done");
        setIndicatorVisible(false);

        timers.current.push(
          setTimeout(() => {
            setExitingIndex(null);
          }, EXIT_FADE_MS)
        );
      }, SWIPE_MS)
    );
  }, [currentIndex, swipeDir]);

  useEffect(() => {
    if (phase !== "idle") return;
    const t = setTimeout(startSwipe, IDLE_MS);
    return () => clearTimeout(t);
  }, [phase, startSwipe]);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  useEffect(() => {
    if (phase !== "done") return;
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTransitioningFromBack(false);
      });
    });
    const t = setTimeout(() => {
      setPhase("idle");
    }, TRANSITION_MS + 50);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [phase]);

  const nextIndex = (currentIndex + 1) % CARDS.length;

  const SWIPE_OFFSET_PCT = 35;
  const getCardTransform = (index: number) => {
    const isFront = index === currentIndex;
    const isExiting = index === exitingIndex;
    if (isFront && phase === "swiping")
      return `translateX(${swipeDir * SWIPE_OFFSET_PCT}%) rotate(${swipeDir * 10}deg)`;
    if (isExiting)
      return `translateX(${exitingDir * SWIPE_OFFSET_PCT}%) rotate(${exitingDir * 10}deg)`;
    return undefined;
  };

  return (
    <div className={styles.root}>
      <div className={styles.stack}>
        {CARDS.map((card, index) => {
          const isFront = index === currentIndex;
          const isNext = index === nextIndex;
          const isExiting = index === exitingIndex;
          if (!isFront && !isNext && !isExiting) return null;

          const role = isFront ? "front" : isNext ? "mid" : "back";
          const swipeClass =
            isFront && phase === "swiping"
              ? swipeDir === 1
                ? styles.swipingRight
                : styles.swipingLeft
              : "";

          const theme = card.theme ?? "blue";
          const themeColors = THEME_COLORS[theme];
          const limitedDescription = limitToSentences(card.description, 2);
          const cardThemeStyle: React.CSSProperties = {
            ["--card-banner-start" as string]: themeColors.bannerStart,
            ["--card-banner-mid" as string]: themeColors.bannerMid,
            ["--card-banner-end" as string]: themeColors.bannerEnd,
            ["--card-type-pill-bg" as string]: themeColors.typePillBg,
            ["--card-type-pill-color" as string]: themeColors.typePillColor,
            ["--card-type-pill-border" as string]: themeColors.typePillBorder,
            ["--card-bullet-bg" as string]: themeColors.bulletBg,
          };

          return (
            <div
              key={index}
              className={[
                styles.cardSlot,
                role === "mid" && styles.mid,
                role === "front" && styles.front,
                isExiting && styles.exiting,
                isFront && transitioningFromBack && styles.transitioningFromBack,
                isFront && swipeClass,
              ]
                .filter(Boolean)
                .join(" ")}
              style={{
                transform: getCardTransform(index),
                opacity: isExiting
                  ? 0
                  : isFront && phase === "swiping"
                    ? 0.5
                    : undefined,
              }}
            >
              <div className={styles.card} style={cardThemeStyle}>
                <div className={styles.cardTop}>
                  <div
                    className={[
                      styles.banner,
                      !card.bannerImageUrl && styles.bannerUnified,
                    ].filter(Boolean).join(" ")}
                    style={
                      card.bannerImageUrl
                        ? { backgroundImage: `url(${card.bannerImageUrl})` }
                        : undefined
                    }
                  >
                    <span className={styles.bannerType}>
                      {card.type === "company" ? "Company" : "Talent"}
                    </span>
                    <div className={styles.bannerAvatar}>
                      {card.avatarImageUrl ? (
                        <Image
                          src={card.avatarImageUrl}
                      alt={card.type === "company" ? "Company logo" : "Candidate photo"}
                          className={
                            card.avatarImageUrl.endsWith(".svg")
                              ? styles.bannerAvatarImgContain
                              : styles.bannerAvatarImg
                          }
                          width={96}
                          height={96}
                          unoptimized
                        />
                      ) : (
                        card.avatarText
                      )}
                    </div>
                    <span className={styles.bannerHighlight}>{card.topRightPill}</span>
                  </div>
                </div>

                <div
                  className={[
                    styles.cardMain,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div className={styles.metaRowTop}>
                    <span className={styles.typePill}>
                      {card.type === "company" ? "Company" : "Talent"}
                    </span>
                    <span className={styles.scorePill}>
                      Match score <strong>92%</strong>
                    </span>
                  </div>

                  {card.type === "company" && (card.companyName || card.companyAbout) && (
                    <>
                      <p className={styles.sectionLabel}>About the company</p>
                      {card.companyName && (
                        <h3 className={styles.companyName}>{card.companyName}</h3>
                      )}
                      {card.companyAbout && (
                        <p className={styles.companyAbout}>{card.companyAbout}</p>
                      )}
                      {card.companyFacts && card.companyFacts.length > 0 && (
                        <div className={styles.factsGrid}>
                          {card.companyFacts.map((f) => (
                            <div key={f.label} className={styles.factItem}>
                              <span className={styles.factLabel}>{f.label}</span>
                              <span className={styles.factValue}>{f.value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <p className={styles.sectionLabel}>Role we&apos;re hiring for</p>
                    </>
                  )}

                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardSubtitle}>{card.subtitle}</p>
                  <p className={styles.cardMetaLine}>{card.metaLine}</p>
                  <p className={styles.cardBody}>{limitedDescription}</p>

                  <div className={styles.factsGrid}>
                    {card.quickFacts.map((f) => (
                      <div key={f.label} className={styles.factItem}>
                        <span className={styles.factLabel}>{f.label}</span>
                        <span className={styles.factValue}>{f.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className={styles.divider} />

                  <div className={styles.skillsRow}>
                    {card.tags.map((tag) => (
                      <span key={tag} className={styles.skillTag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <ul className={styles.detailsList}>
                    {card.detailItems.map((t) => (
                      <li key={t} className={styles.detailsItem}>
                        <span className={styles.bulletDot} aria-hidden="true" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.cardBottom}>
                  <button type="button" disabled className={`${styles.actionButton} ${styles.actionPass}`}>
                    <span className={styles.actionIcon}>✕</span>
                    <span className={styles.actionLabel}>Pass</span>
                  </button>
                  <button type="button" disabled className={`${styles.actionButton} ${styles.actionInfo}`}>
                    <span className={styles.actionIcon}>i</span>
                    <span className={styles.actionLabel}>Info</span>
                  </button>
                  <button
                    type="button"
                    disabled
                    className={`${styles.actionButton} ${styles.actionMatch}`}
                  >
                    <span className={styles.actionIcon}>✓</span>
                    <span className={styles.actionLabel}>Match</span>
                  </button>
                </div>

                {isFront && phase === "swiping" && (
                  <div
                    className={[
                      styles.indicatorOverlay,
                      indicatorVisible && styles.visible,
                      swipeDir === 1 ? styles.indicatorMatch : styles.indicatorPass,
                    ].join(" ")}
                  >
                    <span className={styles.indicatorIcon}>
                      {swipeDir === 1 ? "✓" : "✕"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
