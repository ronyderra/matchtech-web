"use client";

import styles from "./data-display.module.css";
import { cn } from "./cn";

export type ProgressBarProps = {
  value: number;
  max: number;
  label?: string;
};

export function ProgressBar({ value, max, label }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(value, max));
  const percent = max > 0 ? (clamped / max) * 100 : 0;

  return (
    <div className={styles.progressRoot}>
      <div className={styles.progressTrack} aria-hidden="true">
        <div
          className={cn(styles.progressBar)}
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className={styles.progressLabel}>
        <span>{label}</span>
        <span>{Math.round(percent)}%</span>
      </div>
    </div>
  );
}

