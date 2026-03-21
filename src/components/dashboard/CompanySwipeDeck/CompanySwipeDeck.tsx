"use client";

import { useEffect, useState } from "react";
import { COMPANY_SWIPE_CARDS } from "./companyCards";
import styles from "./CompanySwipeDeck.module.css";

type Action = "pass" | "info" | "match";
type SwipeDirection = "left" | "right" | null;
const SWIPE_ANIMATION_MS = 340;

type CompanySwipeDeckProps = {
  /** When set, deck sits in the center column with side panels; action bar follows the column. */
  variant?: "default" | "threeColumn";
};

function RequirementWeightDots({ weight }: { weight: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <span className={styles.reqWeightDots} aria-label={`Weight ${weight} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={i < weight ? styles.reqDotOn : styles.reqDotOff}
          aria-hidden
        >
          {i < weight ? "●" : "○"}
        </span>
      ))}
    </span>
  );
}

export function CompanySwipeDeck({ variant = "default" }: CompanySwipeDeckProps) {
  const [index, setIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<SwipeDirection>(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const currentIndex = index % COMPANY_SWIPE_CARDS.length;
  const nextIndex = (currentIndex + 1) % COMPANY_SWIPE_CARDS.length;
  const current = COMPANY_SWIPE_CARDS[currentIndex];
  const next = COMPANY_SWIPE_CARDS[nextIndex];

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
    if (swipeDirection) return;

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
    const pd = card.positionDetail;

    return (
      <>
        {/* 1) Header — gradient + meta + comp + logo (unchanged look) */}
        <header className={styles.swipeCardHeader} aria-label="Role summary">
          <div className={[styles.banner, styles.bannerUnified].join(" ")}>
            <span className={styles.bannerType} title={card.roleMeta}>
              {card.roleMeta}
            </span>
            <span className={styles.bannerHighlight}>{card.compensation}</span>
            <div className={styles.bannerAvatar}>
              <img
                src={card.logoUrl}
                alt="Company logo"
                className={styles.bannerAvatarImgContain}
              />
            </div>
          </div>
        </header>

        {/* 2–4) About grid (5 boxes) · Requirements grid (6 boxes) · Footer — spaced stack */}
        <div className={styles.swipeCardContent}>
          <section className={styles.swipeCardAbout} aria-labelledby="swipe-about-heading">
            <div className={styles.swipePanel}>
              <h2 id="swipe-about-heading" className={styles.swipePanelHead}>
                About the position
              </h2>
              <div className={styles.swipePanelBody}>
                <div className={styles.aboutGridFive}>
                  <div className={styles.aboutGridFiveTitle}>
                    <h3 className={styles.aboutRoleTitle}>{card.roleTitle}</h3>
                  </div>
                  <div className={styles.aboutGridFiveCell}>
                    <span className={styles.aboutGridFiveLabel}>Team / domain</span>
                    <span className={styles.aboutGridFiveValue}>{pd.teamDomain}</span>
                  </div>
                  <div className={styles.aboutGridFiveCell}>
                    <span className={styles.aboutGridFiveLabel}>Location / type</span>
                    <span className={styles.aboutGridFiveValue}>{pd.locationType}</span>
                  </div>
                  <div className={styles.aboutGridFiveCell}>
                    <span className={styles.aboutGridFiveLabel}>Compensation</span>
                    <span className={styles.aboutGridFiveValue}>{card.compensation}</span>
                  </div>
                  <div className={styles.aboutGridFiveCell}>
                    <span className={styles.aboutGridFiveLabel}>Seniority</span>
                    <span className={styles.aboutGridFiveValue}>{pd.seniority}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.swipeCardRequirements} aria-labelledby="swipe-reqs-heading">
            <div className={styles.swipePanel}>
              <h2 id="swipe-reqs-heading" className={styles.swipePanelHead}>
                Requirements
              </h2>
              <ul className={styles.requirementsGridSix} role="list">
                {Array.from({ length: 6 }, (_, slotIndex) => {
                  const row = pd.requirementMatrix[slotIndex] ?? null;
                  if (!row) {
                    return (
                      <li
                        key={`req-slot-${slotIndex}`}
                        className={styles.requirementGridCellEmpty}
                        aria-hidden
                      />
                    );
                  }
                  const isRequired = row.required === "Yes";
                  return (
                    <li
                      key={`${row.category}-${slotIndex}-${row.requirement.slice(0, 20)}`}
                      className={styles.requirementGridCell}
                    >
                      <span className={styles.requirementCategory}>{row.category}</span>
                      <p className={styles.requirementTitle}>{row.requirement}</p>
                      <p className={styles.requirementLevel}>{row.level}</p>
                      <div className={styles.requirementRowFoot}>
                        <span className={isRequired ? styles.reqTagMust : styles.reqTagPref}>
                          {isRequired ? "Required" : "Preferred"}
                        </span>
                        <div className={styles.requirementWeightWrap}>
                          <span className={styles.requirementWeightCaption}>Weight</span>
                          <RequirementWeightDots weight={row.weight} />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>

          <footer className={styles.swipeCardFooter}>
            <p className={styles.swipeCardFooterText}>
              <strong>Info</strong> — company, full role brief, culture, benefits, and recruiting partners.
            </p>
          </footer>
        </div>
      </>
    );
  }

  return (
    <div
      className={[styles.root, variant === "threeColumn" ? styles.rootThreeColumn : ""].filter(Boolean).join(" ")}
    >
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
            disabled={!!swipeDirection}
            className={`${styles.actionBtn} ${styles.pass}`}
            onClick={() => onAction("pass")}
            aria-label="Pass"
            title="Pass"
          >
            <span aria-hidden="true">✕</span>
          </button>
          <button
            type="button"
            disabled={!!swipeDirection}
            className={`${styles.actionBtn} ${styles.info}`}
            onClick={() => onAction("info")}
            aria-label="Info"
            title="Info"
          >
            <span aria-hidden="true">i</span>
          </button>
          <button
            type="button"
            disabled={!!swipeDirection}
            className={`${styles.actionBtn} ${styles.match}`}
            onClick={() => onAction("match")}
            aria-label="Match"
            title="Match"
          >
            <span aria-hidden="true">✓</span>
          </button>
        </div>
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
                  <p className={styles.sheetCompanyMore}>{current.companyMore}</p>
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
