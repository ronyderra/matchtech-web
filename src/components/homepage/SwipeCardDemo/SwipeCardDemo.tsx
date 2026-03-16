"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./SwipeCardDemo.module.css";

type JobCard = {
  title: string;
  company: string;
  workMode: string;
  employmentType: string;
  salaryRange: string;
  description: string;
  tags: string[];
};

const CARDS: JobCard[] = [
  {
    title: "Senior Frontend Engineer",
    company: "Acme.dev",
    workMode: "Remote",
    employmentType: "Full-time",
    salaryRange: "€110k–€140k · Equity",
    description:
      "Work with a modern stack to build a swipe-first hiring experience for thousands of candidates and hiring teams.",
    tags: ["5+ years", "React", "TypeScript", "Next.js"],
  },
  {
    title: "Product Designer",
    company: "Flow Studio",
    workMode: "Hybrid",
    employmentType: "Full-time",
    salaryRange: "€75k–€95k",
    description:
      "Shape the future of how job seekers and companies connect. Own discovery, matching, and onboarding flows.",
    tags: ["Figma", "Design systems", "User research"],
  },
  {
    title: "Backend Engineer",
    company: "DataFirst",
    workMode: "On-site",
    employmentType: "Full-time",
    salaryRange: "€90k–€120k",
    description:
      "Design and run APIs and services that power real-time matching, notifications, and analytics at scale.",
    tags: ["Go", "PostgreSQL", "Redis", "5+ years"],
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
                <div className={styles.cardHeader}>
                  <div>
                    <h2 className={styles.cardTitle}>{card.title}</h2>
                    <p className={styles.cardSubtitle}>
                      {card.company} · {card.workMode} · {card.employmentType}
                    </p>
                  </div>
                  <span className={styles.pill}>{card.salaryRange}</span>
                </div>
                <p className={styles.cardBody}>{card.description}</p>
                <div className={styles.metaRow}>
                  {card.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
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
