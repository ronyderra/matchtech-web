"use client";

import { HTMLAttributes, ReactNode } from "react";
import styles from "./feedback.module.css";
import { cn } from "./cn";
import { Button } from "./button";

export type RetryBlockProps = HTMLAttributes<HTMLDivElement> & {
  message: ReactNode;
  retryLabel?: string;
  onRetry?: () => void;
};

export function RetryBlock({
  message,
  retryLabel = "Retry",
  onRetry,
  className,
  ...props
}: RetryBlockProps) {
  return (
    <div className={cn(styles.retryBlock, className)} {...props}>
      <span>{message}</span>
      {onRetry ? (
        <Button type="button" size="sm" variant="secondary" onClick={onRetry}>
          {retryLabel}
        </Button>
      ) : null}
    </div>
  );
}

