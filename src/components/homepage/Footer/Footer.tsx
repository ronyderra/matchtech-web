import Link from "next/link";
import { Container, Text } from "@/components/ui";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.topGrid}>
          <div className={styles.brandCol}>
            <Link href="/" className={styles.brand} aria-label="Go to MatchTech home">
              MatchTech
            </Link>

            <div className={styles.socialRow} aria-label="Social links">
              <a className={styles.socialIcon} href="#" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M13.5 22v-8h2.7l.4-3H13.5V9.1c0-.9.3-1.6 1.7-1.6H16.8V4.8c-.3 0-1.4-.1-2.7-.1-2.6 0-4.4 1.6-4.4 4.6V11H7.2v3h2.5v8h3.8Z"
                  />
                </svg>
              </a>
              <a className={styles.socialIcon} href="#" aria-label="X">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M18.9 2H22l-6.8 7.8L23 22h-6.6l-5.2-6.7L5.2 22H2l7.4-8.5L1 2h6.8l4.7 6.1L18.9 2Zm-1.2 18h1.7L6.9 3.9H5.1L17.7 20Z"
                  />
                </svg>
              </a>
              <a className={styles.socialIcon} href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-5 4.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2Zm0 2A1.8 1.8 0 1 0 13.8 12 1.8 1.8 0 0 0 12 10.2ZM18.4 6.7a.9.9 0 1 1-.9.9.9.9 0 0 1 .9-.9Z"
                  />
                </svg>
              </a>
              <a className={styles.socialIcon} href="#" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M6.9 6.9H3.7V20.3h3.2V6.9ZM5.3 3.7a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM20.3 20.3h-3.2v-6.6c0-1.6 0-3.6-2.2-3.6s-2.5 1.7-2.5 3.5v6.7H9.2V6.9h3.1v1.8h.1c.4-.8 1.6-2.1 3.4-2.1 3.6 0 4.3 2.4 4.3 5.5v8.2Z"
                  />
                </svg>
              </a>
            </div>

            <Text className={styles.miniLegal} variant="muted">
              © {year} MatchTech. All rights reserved.
            </Text>
            <Text className={styles.miniLegal} variant="muted">
              By using MatchTech, you agree to our{" "}
              <Link className={styles.inlineLink} href="/terms">
                Terms
              </Link>{" "}
              and{" "}
              <Link className={styles.inlineLink} href="/privacy">
                Privacy Policy
              </Link>
              .
            </Text>
          </div>

          <div className={styles.linksCol}>
            <div className={styles.linkGroup}>
              <p className={styles.linkTitle}>Product</p>
              <Link className={styles.link} href="/register/typ/job-seeker">
                Personal
              </Link>
              <Link className={styles.link} href="/register/employer">
                Business
              </Link>
              <Link className={styles.link} href="/style-guide">
                Style guide
              </Link>
            </div>

            <div className={styles.linkGroup}>
              <p className={styles.linkTitle}>Company</p>
              <Link className={styles.link} href="/about">
                About us
              </Link>
              <Link className={styles.link} href="/contact">
                Contact
              </Link>
              <Link className={styles.link} href="/partner">
                Partner with us
              </Link>
            </div>

            <div className={styles.linkGroup}>
              <p className={styles.linkTitle}>Legal</p>
              <Link className={styles.link} href="/cookies">
                Cookie policy
              </Link>
              <Link className={styles.link} href="/privacy">
                Privacy policy
              </Link>
              <Link className={styles.link} href="/terms">
                Terms of use
              </Link>
            </div>
          </div>

          <div className={styles.disclaimerCol}>
            <p className={styles.disclaimerTitle}>About MatchTech</p>
            <p className={styles.disclaimer}>
              MatchTech is a swipe-first hiring platform. Candidates and companies
              discover each other and connect when both sides are interested.
            </p>
            <p className={styles.disclaimer}>
              Information on this website is provided for product demonstration
              purposes and may change at any time. MatchTech does not guarantee
              outcomes or employment offers.
            </p>
            <p className={styles.disclaimerFoot}>
              Reproduction in whole or in part is strictly prohibited.
            </p>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <Text variant="muted" className={styles.bottomText}>
            Built for swipe-first hiring.
          </Text>
          <Text variant="muted" className={styles.bottomText}>
            Made with care for candidates and teams.
          </Text>
        </div>
      </Container>
    </footer>
  );
}

