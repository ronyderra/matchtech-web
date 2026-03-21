"use client";

import Link from "next/link";
import { useSwipeOnboardingGate } from "@/lib/swipeOnboardingGate";
import deckStyles from "@/components/dashboard/CompanySwipeDeck/CompanySwipeDeck.module.css";
import styles from "./SwipeOnboardingGateCenter.module.css";

/**
 * Full-width centered gate: only thing shown on /dashboard/swipe until CV + survey are done.
 */
export function SwipeOnboardingGateCenter() {
  const { cvUploaded, surveyCompleted } = useSwipeOnboardingGate();

  return (
    <div className={styles.root}>
      <section
        className={[deckStyles.gatePanel, styles.panel].join(" ")}
        aria-label="Swipe prerequisites"
      >
        <div className={styles.intro}>
          <p className={deckStyles.gateEyebrow}>Before you can swipe</p>
          <h2 className={deckStyles.gateTitle}>Complete 2 quick steps</h2>
          <p className={deckStyles.gateText}>
            To unlock company swiping, upload your CV and answer a short survey first.
          </p>
        </div>

        <div className={deckStyles.gateChecklist}>
          <div className={deckStyles.gateRow}>
            <span className={deckStyles.gateRowLabel}>1) Upload a CV</span>
            <span
              className={`${deckStyles.gateStatus} ${cvUploaded ? deckStyles.completed : deckStyles.pending}`}
            >
              {cvUploaded ? "Completed" : "Pending"}
            </span>
          </div>
          <div className={deckStyles.gateRow}>
            <span className={deckStyles.gateRowLabel}>2) Answer a simple survey</span>
            <span
              className={`${deckStyles.gateStatus} ${surveyCompleted ? deckStyles.completed : deckStyles.pending}`}
            >
              {surveyCompleted ? "Completed" : "Pending"}
            </span>
          </div>
        </div>

        <div className={[deckStyles.gateActions, styles.actionsCenter].join(" ")}>
          <Link href="/dashboard/upload-cv" className={deckStyles.gateButton}>
            Upload CV
          </Link>
          <Link href="/dashboard/survey" className={deckStyles.gateButtonSecondary}>
            Take survey
          </Link>
        </div>
      </section>
    </div>
  );
}
