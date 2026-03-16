"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./SwipeCardDemo.module.css";

type CardType = "company" | "talent";

type SwipeCardData = {
  type: CardType;
  title: string;
  subtitle: string;
  metaLine: string;
  topRightPill: string;
  avatarText: string;
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
];

const IDLE_MS = 3800;
const SWIPE_MS = 1000;
const TRANSITION_MS = 700;
const PAUSE_AFTER_SWIPES = 4;

export function SwipeCardDemo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<"idle" | "swiping" | "done">("idle");
  const [swipeDir, setSwipeDir] = useState<1 | -1>(1);
  const [exitingIndex, setExitingIndex] = useState<number | null>(null);
  const [exitingSwipeDir, setExitingSwipeDir] = useState<1 | -1>(1);
  const [transitioningFromBack, setTransitioningFromBack] = useState(false);
  const [showMatch, setShowMatch] = useState(false);
  const [indicatorVisible, setIndicatorVisible] = useState(false);
  const [swipeCount, setSwipeCount] = useState(0);
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
        setShowMatch(dir === 1);
        setIndicatorVisible(false);
      }, SWIPE_MS)
    );
  }, [currentIndex, swipeDir]);

  useEffect(() => {
    if (phase !== "idle" || swipeCount >= PAUSE_AFTER_SWIPES) return;
    const t = setTimeout(startSwipe, IDLE_MS);
    return () => clearTimeout(t);
  }, [phase, swipeCount, startSwipe]);

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
      setSwipeCount((c) => c + 1);
      setPhase("idle");
      setShowMatch(false);
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
                      styles.bannerUnified,
                    ].join(" ")}
                  >
                    <span className={styles.bannerType}>
                      {card.type === "company" ? "Company" : "Talent"}
                    </span>
                    <div className={styles.bannerAvatar}>{card.avatarText}</div>
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
      {showMatch && (
        <div className={`${styles.matchBadge} ${styles.visible}`}>Match</div>
      )}
    </div>
  );
}
