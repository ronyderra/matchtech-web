"use client";

import { HTMLAttributes, ReactNode } from "react";
import styles from "./feedback.module.css";
import { cn } from "./cn";

export type NoResultsStateProps = HTMLAttributes<HTMLDivElement> & {
  title: ReactNode;
  description?: ReactNode;
};

export function NoResultsState({
  title,
  description,
  className,
  ...props
}: NoResultsStateProps) {
  return (
    <div className={cn(styles.stateBlock, className)} {...props}>
      <div className={styles.stateTitle}>{title}</div>
      {description ? (
        <div className={styles.stateDescription}>{description}</div>
      ) : null}
    </div>
  );
}

