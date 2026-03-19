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
                      className={getAvatarImageClass(card.avatarImageUrl)}
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
    title: "Senior Software Engineer",
    subtitle: "Google · Search & AI",
    metaLine: "Mountain View · Full-time · Hybrid",
    topRightPill: "$220k-$320k · Equity",
    avatarText: "G",
    avatarImageUrl: "/assets/companyImages/google.png",
    companyName: "Google",
    companyAbout:
      "Google builds products used by billions across Search, YouTube, Android, Cloud, and AI research.",
    companyFacts: [
      { label: "Industry", value: "Internet & AI" },
      { label: "Size", value: "180k+ employees" },
      { label: "HQ", value: "Mountain View" },
    ],
    description:
      "Build large-scale systems powering products used worldwide. Partner with product and research teams to ship performant and reliable experiences.",
    tags: ["Distributed systems", "Go", "C++", "Large scale"],
    quickFacts: [
      { label: "Level", value: "Senior" },
      { label: "Team", value: "Search & AI" },
      { label: "Process", value: "Tech screens + onsite" },
    ],
    detailItems: [
      "Design and optimize critical backend services",
      "Ship features with strict reliability targets",
      "Collaborate across product, infra, and ML teams",
    ],
  },
  {
    type: "company",
    theme: "violet",
    title: "Cloud Platform Engineer",
    subtitle: "Microsoft · Azure",
    metaLine: "Seattle · Full-time · Hybrid",
    topRightPill: "$190k-$280k · RSU",
    avatarText: "M",
    avatarImageUrl: "/assets/companyImages/microsoft.png",
    companyName: "Microsoft",
    companyAbout:
      "Microsoft powers enterprise software, cloud infrastructure, and developer tools across the globe.",
    companyFacts: [
      { label: "Industry", value: "Cloud & Enterprise" },
      { label: "Size", value: "220k+ employees" },
      { label: "HQ", value: "Redmond" },
    ],
    description:
      "Develop cloud services that support millions of workloads. Improve scalability, security, and developer productivity across Azure.",
    tags: ["Azure", ".NET", "Kubernetes", "Cloud security"],
    quickFacts: [
      { label: "Level", value: "Senior" },
      { label: "Team", value: "Azure Core" },
      { label: "Process", value: "Technical + behavioral" },
    ],
    detailItems: [
      "Build resilient multi-tenant platform services",
      "Improve deployment and observability workflows",
      "Partner with security and product engineering",
    ],
  },
  {
    type: "company",
    theme: "teal",
    title: "iOS Framework Engineer",
    subtitle: "Apple · Core OS",
    metaLine: "Cupertino · Full-time · Onsite",
    topRightPill: "$210k-$300k · Equity",
    avatarText: "A",
    avatarImageUrl: "/assets/companyImages/apple.png",
    companyName: "Apple",
    companyAbout:
      "Apple designs iconic consumer hardware and software across iPhone, Mac, services, and wearables.",
    companyFacts: [
      { label: "Industry", value: "Consumer Technology" },
      { label: "Size", value: "160k+ employees" },
      { label: "HQ", value: "Cupertino" },
    ],
    description:
      "Create system-level features for Apple platforms with deep focus on performance, privacy, and polished user experience.",
    tags: ["Swift", "Objective-C", "Systems", "Performance"],
    quickFacts: [
      { label: "Level", value: "Senior" },
      { label: "Team", value: "Core OS" },
      { label: "Process", value: "Technical panel" },
    ],
    detailItems: [
      "Implement high-performance platform components",
      "Collaborate with hardware and UX teams",
      "Maintain strict quality and privacy standards",
    ],
  },
  {
    type: "company",
    theme: "amber",
    title: "Senior Backend Engineer",
    subtitle: "Amazon · AWS",
    metaLine: "Seattle · Full-time · Hybrid",
    topRightPill: "$180k-$270k · RSU",
    avatarText: "A",
    avatarImageUrl: "/assets/companyImages/amazon.png",
    companyName: "Amazon",
    companyAbout:
      "Amazon builds global consumer platforms and cloud services through AWS, e-commerce, and logistics innovation.",
    companyFacts: [
      { label: "Industry", value: "E-commerce & Cloud" },
      { label: "Size", value: "1.5M+ employees" },
      { label: "HQ", value: "Seattle" },
    ],
    description:
      "Build services that power highly available AWS products and internal platforms with strong operational excellence.",
    tags: ["Java", "AWS", "Microservices", "Reliability"],
    quickFacts: [
      { label: "Level", value: "Senior" },
      { label: "Team", value: "AWS Core" },
      { label: "Process", value: "Bar raiser loop" },
    ],
    detailItems: [
      "Design services with high throughput and low latency",
      "Own operations, dashboards, and incident response",
      "Drive architecture reviews across partner teams",
    ],
  },
  {
    type: "company",
    theme: "rose",
    title: "Machine Learning Engineer",
    subtitle: "NVIDIA · AI Platform",
    metaLine: "Santa Clara · Full-time · Hybrid",
    topRightPill: "$230k-$340k · Equity",
    avatarText: "N",
    avatarImageUrl: "/assets/companyImages/nvidia.png",
    companyName: "NVIDIA",
    companyAbout:
      "NVIDIA advances accelerated computing and AI infrastructure across GPUs, software platforms, and data center systems.",
    companyFacts: [
      { label: "Industry", value: "Semiconductors & AI" },
      { label: "Size", value: "30k+ employees" },
      { label: "HQ", value: "Santa Clara" },
    ],
    description:
      "Develop ML tooling and model optimization workflows that enable state-of-the-art AI applications at scale.",
    tags: ["Python", "CUDA", "PyTorch", "Model optimization"],
    quickFacts: [
      { label: "Level", value: "Senior" },
      { label: "Team", value: "AI Platform" },
      { label: "Process", value: "Technical deep dive" },
    ],
    detailItems: [
      "Optimize training and inference performance",
      "Collaborate with hardware and research teams",
      "Ship production-grade ML platform features",
    ],
  },
  {
    type: "company",
    theme: "emerald",
    title: "Product Engineer",
    subtitle: "Meta · Social Platform",
    metaLine: "Menlo Park · Full-time · Hybrid",
    topRightPill: "$210k-$310k · Equity",
    avatarText: "M",
    avatarImageUrl: "/assets/companyImages/meta.png",
    companyName: "Meta",
    companyAbout:
      "Meta builds social platforms and communication products connecting billions of people worldwide.",
    companyFacts: [
      { label: "Industry", value: "Social & AI" },
      { label: "Size", value: "70k+ employees" },
      { label: "HQ", value: "Menlo Park" },
    ],
    description:
      "Build end-to-end product experiences with speed and impact, from backend APIs to responsive interfaces.",
    tags: ["React", "Hack", "GraphQL", "Product sense"],
    quickFacts: [
      { label: "Level", value: "Senior" },
      { label: "Team", value: "Core Product" },
      { label: "Process", value: "Coding + product interview" },
    ],
    detailItems: [
      "Ship fast experiments with strong metrics ownership",
      "Build scalable APIs for high traffic products",
      "Work closely with design, data, and research",
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

function getAvatarImageClass(avatarImageUrl: string): string {
  if (avatarImageUrl.includes("/microsoft.png")) {
    return `${styles.bannerAvatarImg} ${styles.bannerAvatarImgMicrosoft}`;
  }
  if (avatarImageUrl.endsWith(".svg")) {
    return styles.bannerAvatarImgContain;
  }
  return styles.bannerAvatarImg;
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
                          className={getAvatarImageClass(card.avatarImageUrl)}
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
