import { ReactNode } from "react";
import styles from "./SwipeLayout.module.css";

type SwipeLayoutProps = {
  children?: ReactNode;
};

export function SwipeLayout({ children }: SwipeLayoutProps) {
  return (
    <section className={styles.root}>
      <header>
        <p className={styles.badge}>Early concept · Swipe to match</p>
        <h1 className={styles.headline}>Find your next role faster.</h1>
        <p className={styles.lede}>
          MatchTech lets candidates and companies swipe on each other. When
          both sides say yes, it is an instant match.
        </p>
      </header>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h2 className={styles.cardTitle}>Senior Frontend Engineer</h2>
            <p className={styles.cardSubtitle}>Acme.dev · Remote · Full-time</p>
          </div>
          <span className={styles.pill}>€110k–€140k · Equity</span>
        </div>

        <div className={styles.cardBody}>
          Work with a modern stack to build a swipe-first hiring experience for
          thousands of candidates and hiring teams.
        </div>

        <div className={styles.metaRow}>
          <span className={styles.metaItem}>5+ years experience</span>
          <span className={styles.metaItem}>React · TypeScript · Next.js</span>
          <span className={styles.metaItem}>Europe · Remote friendly</span>
        </div>

        <div className={styles.cardFooter}>
          <p className={styles.supportingText}>
            Swipe right if you&apos;d talk to this team. Left to pass and keep
            exploring.
          </p>

          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.swipeButton} ${styles.swipeReject}`}
            >
              ✕
            </button>
            <button
              type="button"
              className={`${styles.swipeButton} ${styles.swipeMatch}`}
            >
              ✓
            </button>
          </div>
        </div>
      </div>

      {children && <div className={styles.stack}>{children}</div>}
    </section>
  );
}

