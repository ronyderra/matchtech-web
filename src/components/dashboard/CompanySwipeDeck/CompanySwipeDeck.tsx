"use client";

import { useMemo, useState } from "react";
import { COMPANY_SWIPE_CARDS } from "./companyCards";
import styles from "./CompanySwipeDeck.module.css";

type Action = "pass" | "info" | "match";

export function CompanySwipeDeck() {
  const [index, setIndex] = useState(0);
  const [stats, setStats] = useState({ pass: 0, info: 0, match: 0 });

  const current = COMPANY_SWIPE_CARDS[index % COMPANY_SWIPE_CARDS.length];
  const remaining = Math.max(COMPANY_SWIPE_CARDS.length - (index % COMPANY_SWIPE_CARDS.length) - 1, 0);
  const totalActions = stats.pass + stats.info + stats.match;

  const matchRate = useMemo(() => {
    if (!totalActions) return 0;
    return Math.round((stats.match / totalActions) * 100);
  }, [stats.match, totalActions]);

  function onAction(action: Action) {
    setStats((prev) => ({ ...prev, [action]: prev[action] + 1 }));
    setIndex((prev) => (prev + 1) % COMPANY_SWIPE_CARDS.length);
  }

  return (
    <div className={styles.root}>
      <article className={styles.card}>
        <div className={styles.banner}>
          <span className={styles.companyPill}>Company</span>
          <p className={styles.compensation}>{current.compensation}</p>
        </div>

        <div className={styles.body}>
          <div className={styles.logoRow}>
            <img
              src={current.logoUrl}
              alt={`${current.companyName} logo`}
              className={styles.logo}
            />
            <h2 className={styles.companyName}>{current.companyName}</h2>
          </div>

          <p className={styles.about}>{current.about}</p>

          <div className={styles.facts}>
            {current.facts.map((fact) => (
              <div key={fact.label} className={styles.factItem}>
                <span className={styles.factLabel}>{fact.label}</span>
                <span className={styles.factValue}>{fact.value}</span>
              </div>
            ))}
          </div>

          <h3 className={styles.roleTitle}>{current.roleTitle}</h3>
          <p className={styles.roleMeta}>{current.roleMeta}</p>

          <div className={styles.tags}>
            {current.tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>

          <ul className={styles.highlights}>
            {current.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className={styles.actions}>
            <button type="button" className={`${styles.actionBtn} ${styles.pass}`} onClick={() => onAction("pass")}>
              Pass
            </button>
            <button type="button" className={`${styles.actionBtn} ${styles.info}`} onClick={() => onAction("info")}>
              Info
            </button>
            <button type="button" className={`${styles.actionBtn} ${styles.match}`} onClick={() => onAction("match")}>
              Match
            </button>
          </div>
        </div>
      </article>

      <aside className={styles.panel}>
        <h3 className={styles.panelTitle}>Swipe activity</h3>
        <p className={styles.panelMuted}>Track your live actions while reviewing real companies.</p>
        <div className={styles.statGrid}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Passes</span>
            <span className={styles.statValue}>{stats.pass}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Info clicks</span>
            <span className={styles.statValue}>{stats.info}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Matches</span>
            <span className={styles.statValue}>{stats.match}</span>
          </div>
        </div>
        <div className={styles.statGrid} style={{ marginTop: 10 }}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Match rate</span>
            <span className={styles.statValue}>{matchRate}%</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Total swipes</span>
            <span className={styles.statValue}>{totalActions}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Remaining</span>
            <span className={styles.statValue}>{remaining}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
