"use client";

import { HTMLAttributes, ReactNode } from "react";
import styles from "./data-display.module.css";
import { cn } from "./cn";

export type StatTrend = "up" | "down" | "none";

export type StatCardProps = HTMLAttributes<HTMLDivElement> & {
  label: ReactNode;
  value: ReactNode;
  helperText?: ReactNode;
  trend?: StatTrend;
};

export function StatCard({
  label,
  value,
  helperText,
  trend = "none",
  className,
  ...props
}: StatCardProps) {
  return (
    <div className={cn(styles.statCard, className)} {...props}>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statValueRow}>
        <div className={styles.statValue}>{value}</div>
        {trend !== "none" && (
          <span
            className={cn(
              styles.statHelper,
              trend === "up" ? styles.statTrendUp : styles.statTrendDown
            )}
          >
            {trend === "up" ? "↑" : "↓"}
          </span>
        )}
      </div>
      {helperText ? (
        <div className={styles.statHelper}>{helperText}</div>
      ) : null}
    </div>
  );
}

