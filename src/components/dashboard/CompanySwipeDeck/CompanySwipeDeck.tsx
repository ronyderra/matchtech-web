"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { COMPANY_SWIPE_CARDS } from "./companyCards";
import styles from "./CompanySwipeDeck.module.css";

type Action = "pass" | "info" | "match";
type SwipeDirection = "left" | "right" | null;
const SWIPE_ANIMATION_MS = 340;

type CompanySwipeDeckProps = {
  /** When set, deck sits in the center column with side panels; action bar follows the column. */
  variant?: "default" | "threeColumn";
};

export function CompanySwipeDeck({ variant = "default" }: CompanySwipeDeckProps) {
  const [index, setIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<SwipeDirection>(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
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

  useEffect(() => {
    if (!isInfoOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isInfoOpen]);

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

    setIsInfoOpen(true);
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
    <div
      className={[styles.root, variant === "threeColumn" ? styles.rootThreeColumn : ""].filter(Boolean).join(" ")}
    >
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

      {isInfoOpen ? (
        <>
          <button
            type="button"
            aria-label="Close position details"
            className={styles.sheetBackdrop}
            onClick={() => setIsInfoOpen(false)}
          />
          <section className={styles.infoSheet} aria-label="Position details">
            {/* Top: company details */}
            <header className={styles.sheetCompanyTop}>
              <button
                type="button"
                aria-label="Close"
                className={styles.sheetClose}
                onClick={() => setIsInfoOpen(false)}
              >
                ✕
              </button>
              <div className={styles.sheetCompanyTopInner}>
                <div className={styles.sheetLogoWrap}>
                  <img
                    src={current.logoUrl}
                    alt=""
                    className={styles.sheetLogo}
                  />
                </div>
                <div className={styles.sheetCompanyText}>
                  <p className={styles.sheetEyebrow}>Company</p>
                  <h3 className={styles.sheetCompanyName}>{current.companyName}</h3>
                  <p className={styles.sheetCompanyAbout}>{current.about}</p>
                </div>
              </div>
              <div className={styles.sheetFacts}>
                {current.facts.map((fact) => (
                  <div key={fact.label} className={styles.sheetFactItem}>
                    <span className={styles.sheetFactLabel}>{fact.label}</span>
                    <span className={styles.sheetFactValue}>{fact.value}</span>
                  </div>
                ))}
              </div>
            </header>

            {/* Left: position · Right: HR partners */}
            <div className={styles.sheetSplit}>
              <div className={styles.sheetColPosition}>
                <p className={styles.sheetEyebrow}>Position details</p>
                <h3 className={styles.sheetTitle}>{current.roleTitle}</h3>
                <p className={styles.sheetMeta}>{current.roleMeta}</p>
                <div className={styles.sheetQuickRow}>
                  {current.positionDetail.postedAgo ? (
                    <span className={styles.sheetPill}>{current.positionDetail.postedAgo}</span>
                  ) : null}
                  <span className={styles.sheetPill}>{current.positionDetail.seniority}</span>
                  <span className={styles.sheetPill}>{current.positionDetail.employmentType}</span>
                  <span className={styles.sheetPill}>{current.positionDetail.location}</span>
                </div>
                {current.positionDetail.teamSize ? (
                  <p className={styles.sheetTeamSize}>
                    <span className={styles.sheetTeamSizeLabel}>Team size</span>{" "}
                    {current.positionDetail.teamSize}
                  </p>
                ) : null}

                <p className={styles.sheetCompensation}>{current.compensation}</p>
                <p className={styles.sheetLead}>{current.positionDetail.summary}</p>

                <h4 className={styles.sheetSectionTitle}>Role overview</h4>
                <p className={styles.sheetBody}>{current.positionDetail.roleOverview}</p>

                <h4 className={styles.sheetSectionTitle}>What you&apos;ll do</h4>
                <ul className={styles.sheetList}>
                  {current.positionDetail.responsibilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <h4 className={styles.sheetSectionTitle}>Requirements</h4>
                <ul className={styles.sheetList}>
                  {current.positionDetail.requirements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                {current.positionDetail.niceToHave && current.positionDetail.niceToHave.length > 0 ? (
                  <>
                    <h4 className={styles.sheetSectionTitle}>Nice to have</h4>
                    <ul className={styles.sheetListMuted}>
                      {current.positionDetail.niceToHave.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </>
                ) : null}

                <h4 className={styles.sheetSectionTitle}>Benefits &amp; compensation</h4>
                <ul className={styles.sheetList}>
                  {current.positionDetail.benefits.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <h4 className={styles.sheetSectionTitle}>Team &amp; culture</h4>
                <p className={styles.sheetBody}>{current.positionDetail.teamAndCulture}</p>

                <h4 className={styles.sheetSectionTitle}>Tech stack &amp; focus</h4>
                <div className={styles.sheetTags}>
                  {current.tags.map((tag) => (
                    <span key={tag} className={styles.sheetTag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <h4 className={styles.sheetSectionTitle}>Role highlights</h4>
                <ul className={styles.sheetHighlights}>
                  {current.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <aside className={styles.sheetColHr} aria-label="HR partner companies">
                <h4 className={styles.sheetAsideTitle}>HR companies working with this position</h4>
                <p className={styles.sheetAsideHint}>
                  Partner recruiters and agencies that collaborate on roles like this one.
                </p>
                <ul className={styles.hrPartnerList}>
                  {current.partnerHrs.map((p) => (
                    <li key={p.name} className={styles.hrPartnerCard}>
                      <span className={styles.hrPartnerName}>{p.name}</span>
                      {p.tagline ? (
                        <span className={styles.hrPartnerTagline}>{p.tagline}</span>
                      ) : null}
                      {p.region ? (
                        <span className={styles.hrPartnerRegion}>{p.region}</span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}
