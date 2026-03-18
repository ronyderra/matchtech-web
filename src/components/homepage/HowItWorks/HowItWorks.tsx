import { Container, Section } from "@/components/ui";
import styles from "./HowItWorks.module.css";

const STEPS = [
  {
    number: 1,
    title: "Swipe",
    description:
      "Swipe through roles and candidates. Pass or match in seconds and focus on what fits job seekers and hiring teams.",
    icon: (
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <rect x="25" y="30" width="50" height="60" rx="3" stroke="#235675" strokeWidth="2" fill="none" />
        <rect x="25" y="30" width="50" height="12" rx="3" fill="#235675" fillOpacity="0.1" />
        <line x1="32" y1="48" x2="68" y2="48" stroke="#235675" strokeWidth="1.5" strokeOpacity="0.3" />
        <line x1="32" y1="56" x2="65" y2="56" stroke="#235675" strokeWidth="1.5" strokeOpacity="0.3" />
        <line x1="32" y1="64" x2="62" y2="64" stroke="#235675" strokeWidth="1.5" strokeOpacity="0.3" />
        <circle cx="75" cy="35" r="14" stroke="#235675" strokeWidth="2" fill="none" />
        <line x1="85" y1="45" x2="95" y2="55" stroke="#235675" strokeWidth="2" strokeLinecap="round" />
        <rect x="35" y="72" width="4" height="12" fill="#235675" fillOpacity="0.4" />
        <rect x="42" y="68" width="4" height="16" fill="#235675" fillOpacity="0.4" />
        <rect x="49" y="74" width="4" height="10" fill="#235675" fillOpacity="0.4" />
        <rect x="56" y="70" width="4" height="14" fill="#235675" fillOpacity="0.4" />
      </svg>
    ),
  },
  {
    number: 2,
    title: "Get matched",
    description:
      "When both sides match, you're connected. Get introduced to the right roles and talent with less back-and-forth.",
    icon: (
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <rect x="10" y="35" width="40" height="50" rx="3" stroke="#235675" strokeWidth="2" fill="none" />
        <rect x="10" y="35" width="40" height="10" rx="3" fill="#235675" fillOpacity="0.1" />
        <rect x="70" y="30" width="40" height="55" rx="3" stroke="#235675" strokeWidth="2" fill="none" />
        <rect x="70" y="30" width="40" height="10" rx="3" fill="#235675" fillOpacity="0.15" />
        <path d="M55 55 L65 55" stroke="#235675" strokeWidth="2" strokeLinecap="round" />
        <path d="M60 50 L65 55 L60 60" stroke="#235675" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <line x1="30" y1="60" x2="90" y2="60" stroke="#235675" strokeWidth="1.5" strokeDasharray="2 2" strokeOpacity="0.4" />
        <line x1="18" y1="52" x2="42" y2="52" stroke="#235675" strokeWidth="1.5" strokeOpacity="0.3" />
        <line x1="18" y1="60" x2="38" y2="60" stroke="#235675" strokeWidth="1.5" strokeOpacity="0.3" />
        <line x1="78" y1="47" x2="102" y2="47" stroke="#235675" strokeWidth="1.5" strokeOpacity="0.3" />
        <line x1="78" y1="55" x2="100" y2="55" stroke="#235675" strokeWidth="1.5" strokeOpacity="0.3" />
        <line x1="78" y1="63" x2="98" y2="63" stroke="#235675" strokeWidth="1.5" strokeOpacity="0.3" />
      </svg>
    ),
  },
  {
    number: 3,
    title: "Start working",
    description:
      "Take the next step with confidence. Move from match to offer or hire and start working together.",
    icon: (
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path d="M60 25 L45 30 L45 50 C45 65 55 75 60 85 C65 75 75 65 75 50 L75 30 Z" stroke="#235675" strokeWidth="2" fill="none" />
        <path d="M52 50 L58 56 L68 44" stroke="#235675" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <rect x="30" y="70" width="60" height="40" rx="3" stroke="#235675" strokeWidth="2" fill="none" />
        <rect x="30" y="70" width="60" height="12" rx="3" fill="#235675" fillOpacity="0.1" />
        <line x1="38" y1="88" x2="82" y2="88" stroke="#235675" strokeWidth="1.5" strokeOpacity="0.3" />
        <line x1="38" y1="96" x2="75" y2="96" stroke="#235675" strokeWidth="1.5" strokeOpacity="0.3" />
        <line x1="38" y1="104" x2="70" y2="104" stroke="#235675" strokeWidth="1.5" strokeOpacity="0.3" />
      </svg>
    ),
  },
] as const;

export function HowItWorks() {
  return (
    <Section className={styles.section}>
      <Container>
        <header className={styles.header}>
          <h2 className={styles.title}>How swipe-first hiring works for job seekers and employers</h2>
        </header>

        <div className={styles.cardGrid} role="list">
          {STEPS.map((step) => (
            <article
              key={step.number}
              className={styles.card}
              role="listitem"
            >
              <div className={styles.badge}>{step.number}</div>
              <div className={styles.iconWrap}>{step.icon}</div>
              <h3 className={styles.cardTitle}>{step.title}</h3>
              <p className={styles.cardDescription}>{step.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
