"use client";

import { HTMLAttributes, ReactNode } from "react";
import styles from "./feedback.module.css";
import { cn } from "./cn";

export type PermissionDeniedProps = HTMLAttributes<HTMLDivElement> & {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
};

export function PermissionDenied({
  title,
  description,
  action,
  className,
  ...props
}: PermissionDeniedProps) {
  return (
    <div className={cn(styles.stateBlock, className)} {...props}>
      <div className={styles.stateTitle}>{title}</div>
      {description ? (
        <div className={styles.stateDescription}>{description}</div>
      ) : null}
      {action}
    </div>
  );
}

