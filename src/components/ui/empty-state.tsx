"use client";

import { HTMLAttributes, ReactNode } from "react";
import styles from "./data-display.module.css";
import { cn } from "./cn";

export type EmptyStateProps = HTMLAttributes<HTMLDivElement> & {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
};

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div className={cn(styles.emptyState, className)} {...props}>
      {icon ? <div className={styles.emptyIcon}>{icon}</div> : null}
      <div className={styles.emptyTitle}>{title}</div>
      {description ? (
        <div className={styles.emptyDescription}>{description}</div>
      ) : null}
      {action}
    </div>
  );
}

