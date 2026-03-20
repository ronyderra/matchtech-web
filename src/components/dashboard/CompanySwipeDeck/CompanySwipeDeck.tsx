"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { COMPANY_SWIPE_CARDS } from "./companyCards";
import styles from "./CompanySwipeDeck.module.css";

type Action = "pass" | "info" | "match";
type SwipeDirection = "left" | "right" | null;
const SWIPE_ANIMATION_MS = 340;

export function CompanySwipeDeck() {
  const [index, setIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<SwipeDirection>(null);
  const [stepStatus, setStepStatus] = useState({
    cvUploaded: false,
    surveyCompleted: false,
  });

  const currentIndex = index % COMPANY_SWIPE_CARDS.length;
  const nextIndex = (currentIndex + 1) % COMPANY_SWIPE_CARDS.length;
  const current = COMPANY_SWIPE_CARDS[currentIndex];
  const next = COMPANY_SWIPE_CARDS[nextIndex];
  const canSwipe = stepStatus.cvUploaded && stepStatus.surveyCompleted;

  useEffect(() => {
    const cvUploaded = window.localStorage.getItem("onboarding.cvUploaded") === "true";
    const surveyCompleted = window.localStorage.getItem("onboarding.surveyCompleted") === "true";
    setStepStatus({ cvUploaded, surveyCompleted });
  }, []);

  useEffect(() => {
    if (!swipeDirection) return;
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % COMPANY_SWIPE_CARDS.length);
      setSwipeDirection(null);
    }, SWIPE_ANIMATION_MS);

    return () => clearTimeout(timer);
  }, [swipeDirection]);

  function onAction(action: Action) {
    if (swipeDirection || !canSwipe) return;

    if (action === "pass") {
      setSwipeDirection("left");
      return;
    }

    if (action === "match") {
      setSwipeDirection("right");
      return;
    }

    setIndex((prev) => (prev + 1) % COMPANY_SWIPE_CARDS.length);
  }

  function renderCard(card: (typeof COMPANY_SWIPE_CARDS)[number]) {
    return (
      <>
        <div className={styles.banner}>
          <span className={styles.companyPill}>Company</span>
          <p className={styles.compensation}>{card.compensation}</p>
        </div>

        <div className={styles.body}>
          <div className={styles.logoRow}>
            <img
              src={card.logoUrl}
              alt={`${card.companyName} logo`}
              className={styles.logo}
            />
            <h2 className={styles.companyName}>{card.companyName}</h2>
          </div>

          <p className={styles.about}>{card.about}</p>

          <div className={styles.facts}>
            {card.facts.map((fact) => (
              <div key={fact.label} className={styles.factItem}>
                <span className={styles.factLabel}>{fact.label}</span>
                <span className={styles.factValue}>{fact.value}</span>
              </div>
            ))}
          </div>

          <h3 className={styles.roleTitle}>{card.roleTitle}</h3>
          <p className={styles.roleMeta}>{card.roleMeta}</p>

          <div className={styles.tags}>
            {card.tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>

          <ul className={styles.highlights}>
            {card.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <section className={styles.desktopExtraInfo} aria-label="More company details">
            <h4 className={styles.extraTitle}>Company details</h4>
            <div className={styles.extraGrid}>
              <div className={styles.extraItem}>
                <span className={styles.extraLabel}>Compensation</span>
                <span className={styles.extraValue}>{card.compensation}</span>
              </div>
              <div className={styles.extraItem}>
                <span className={styles.extraLabel}>Role meta</span>
                <span className={styles.extraValue}>{card.roleMeta}</span>
              </div>
              <div className={styles.extraItem}>
                <span className={styles.extraLabel}>Profile ID</span>
                <span className={styles.extraValue}>{card.id}</span>
              </div>
              <div className={styles.extraItem}>
                <span className={styles.extraLabel}>Top skills</span>
                <span className={styles.extraValue}>{card.tags.join(", ")}</span>
              </div>
            </div>
          </section>

        </div>
      </>
    );
  }

  return (
    <div className={styles.root}>
      {!canSwipe ? (
        <section className={styles.gatePanel} aria-label="Swipe prerequisites">
          <p className={styles.gateEyebrow}>Before you can swipe</p>
          <h3 className={styles.gateTitle}>Complete 2 quick steps</h3>
          <p className={styles.gateText}>
            To unlock company swiping, upload your CV and answer a short survey first.
          </p>

          <div className={styles.gateChecklist}>
            <div className={styles.gateRow}>
              <span className={styles.gateRowLabel}>1) Upload a CV</span>
              <span className={`${styles.gateStatus} ${stepStatus.cvUploaded ? styles.completed : styles.pending}`}>
                {stepStatus.cvUploaded ? "Completed" : "Pending"}
              </span>
            </div>
            <div className={styles.gateRow}>
              <span className={styles.gateRowLabel}>2) Answer a simple survey</span>
              <span className={`${styles.gateStatus} ${stepStatus.surveyCompleted ? styles.completed : styles.pending}`}>
                {stepStatus.surveyCompleted ? "Completed" : "Pending"}
              </span>
            </div>
          </div>

          <div className={styles.gateActions}>
            <Link href="/dashboard/upload-cv" className={styles.gateButton}>
              Upload CV
            </Link>
            <Link href="/dashboard/survey" className={styles.gateButtonSecondary}>
              Take survey
            </Link>
          </div>
        </section>
      ) : null}

      <div className={styles.deck}>
        <article className={`${styles.card} ${styles.backCard}`} aria-hidden="true">
          {renderCard(next)}
        </article>

        <article
          className={[
            styles.card,
            styles.frontCard,
            swipeDirection === "left" ? styles.swipeLeft : "",
            swipeDirection === "right" ? styles.swipeRight : "",
          ].join(" ")}
        >
          {renderCard(current)}
        </article>
      </div>

      <div className={styles.actionsDock}>
        <div className={styles.actions}>
          <button
            type="button"
            disabled={!!swipeDirection || !canSwipe}
            className={`${styles.actionBtn} ${styles.pass}`}
            onClick={() => onAction("pass")}
            aria-label="Pass"
            title="Pass"
          >
            <span aria-hidden="true">✕</span>
          </button>
          <button
            type="button"
            disabled={!!swipeDirection || !canSwipe}
            className={`${styles.actionBtn} ${styles.info}`}
            onClick={() => onAction("info")}
            aria-label="Info"
            title="Info"
          >
            <span aria-hidden="true">i</span>
          </button>
          <button
            type="button"
            disabled={!!swipeDirection || !canSwipe}
            className={`${styles.actionBtn} ${styles.match}`}
            onClick={() => onAction("match")}
            aria-label="Match"
            title="Match"
          >
            <span aria-hidden="true">✓</span>
          </button>
        </div>
        {!canSwipe ? (
          <p className={styles.lockHint}>Complete onboarding steps to unlock swiping.</p>
        ) : null}
      </div>
    </div>
  );
}
