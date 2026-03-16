"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import styles from "./SwipeCardDemo.module.css";

type CardType = "company" | "talent";

type SwipeCardData = {
  type: CardType;
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
};

const CARDS: SwipeCardData[] = [
  {
    type: "company",
    title: "Senior Frontend Engineer",
    subtitle: "Acme.dev · Product team",
    metaLine: "Remote · Full-time · Europe",
    topRightPill: "€110k–€140k · Equity",
    avatarText: "A",
    avatarImageUrl: "/assets/profileImages/1.jpg",
    description:
      "Help build a swipe-first hiring experience used by thousands of candidates and hiring teams every month.",
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
    title: "Backend Engineer",
    subtitle: "DataFirst · Platform",
    metaLine: "Hybrid · Berlin · Full-time",
    topRightPill: "€90k–€120k · Stock options",
    avatarText: "D",
    avatarImageUrl: "/assets/profileImages/3.jpg",
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
    title: "Product Manager",
    subtitle: "ScaleUp · Growth",
    metaLine: "Remote · Full-time · Americas",
    topRightPill: "€100k–€130k · Bonus",
    avatarText: "S",
    avatarImageUrl: "/assets/profileImages/5.jpg",
    description:
      "Drive roadmap and go-to-market for a growing B2B product used by mid-market and enterprise teams.",
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

const IDLE_MS = 3800;
const SWIPE_MS = 1000;
const TRANSITION_MS = 700;

export function SwipeCardDemo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<"idle" | "swiping" | "done">("idle");
  const [swipeDir, setSwipeDir] = useState<1 | -1>(1);
  const [exitingIndex, setExitingIndex] = useState<number | null>(null);
  const [exitingSwipeDir, setExitingSwipeDir] = useState<1 | -1>(1);
  const [transitioningFromBack, setTransitioningFromBack] = useState(false);
  const [indicatorVisible, setIndicatorVisible] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  }, []);

  const startSwipe = useCallback(() => {
    setPhase("swiping");
    setSwipeDir((d) => (d === 1 ? -1 : 1));
    setIndicatorVisible(true);
    const dir: 1 | -1 = swipeDir === 1 ? -1 : 1;
    timers.current.push(
      setTimeout(() => {
        setExitingIndex(currentIndex);
        setExitingSwipeDir(dir);
        setCurrentIndex((i) => (i + 1) % CARDS.length);
        setTransitioningFromBack(true);
        setPhase("done");
        setIndicatorVisible(false);
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
      setExitingIndex(null);
      setPhase("idle");
    }, TRANSITION_MS + 50);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [phase]);

  const getSlotRole = (index: number) => {
    const next = (currentIndex + 1) % CARDS.length;
    if (index === currentIndex) return "front";
    if (index === next) return "mid";
    return "back";
  };

  const SWIPE_OFFSET_PCT = 35;
  const getCardTransform = (index: number) => {
    const isFront = index === currentIndex;
    const isExiting = index === exitingIndex;
    if (isFront && phase === "swiping")
      return `translateX(${swipeDir * SWIPE_OFFSET_PCT}%) rotate(${swipeDir * 10}deg)`;
    if (isExiting)
      return `translateX(${exitingSwipeDir * SWIPE_OFFSET_PCT}%) rotate(${exitingSwipeDir * 10}deg)`;
    return undefined;
  };

  return (
    <div className={styles.root}>
      <div className={styles.stack}>
        {CARDS.map((card, index) => {
          const role = getSlotRole(index);
          const isExiting = index === exitingIndex;
          const isFront = index === currentIndex;
          const swipeClass =
            isFront && phase === "swiping"
              ? swipeDir === 1
                ? styles.swipingRight
                : styles.swipingLeft
              : "";

          return (
            <div
              key={index}
              className={[
                styles.cardSlot,
                role === "back" && styles.back,
                role === "mid" && styles.mid,
                role === "front" && styles.front,
                isFront && transitioningFromBack && styles.transitioningFromBack,
                isFront && swipeClass,
                isExiting && styles.exiting,
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
              <div className={styles.card}>
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
                          alt=""
                          className={styles.bannerAvatarImg}
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

                  <h2 className={styles.cardTitle}>{card.title}</h2>
                  <p className={styles.cardSubtitle}>{card.subtitle}</p>
                  <p className={styles.cardMetaLine}>{card.metaLine}</p>
                  <p className={styles.cardBody}>{card.description}</p>

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
                  <button type="button" className={`${styles.actionButton} ${styles.actionPass}`}>
                    <span className={styles.actionIcon}>✕</span>
                    <span className={styles.actionLabel}>Pass</span>
                  </button>
                  <button type="button" className={`${styles.actionButton} ${styles.actionInfo}`}>
                    <span className={styles.actionIcon}>i</span>
                    <span className={styles.actionLabel}>Info</span>
                  </button>
                  <button
                    type="button"
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
