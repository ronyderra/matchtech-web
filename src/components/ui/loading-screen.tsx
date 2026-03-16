"use client";

import styles from "./feedback.module.css";
import { Spinner } from "./spinner";

export type LoadingScreenProps = {
  message?: string;
};

export function LoadingScreen({ message = "Loading MatchTech…" }: LoadingScreenProps) {
  return (
    <div className={styles.loadingScreen}>
      <Spinner size="md" />
      <div className={styles.loadingText}>{message}</div>
    </div>
  );
}

