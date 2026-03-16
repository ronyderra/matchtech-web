"use client";

import { HTMLAttributes } from "react";
import styles from "./surface.module.css";
import { cn } from "./cn";

export type SpinnerSize = "sm" | "md";

export type SpinnerProps = HTMLAttributes<HTMLSpanElement> & {
  size?: SpinnerSize;
  label?: string;
};

export function Spinner({
  size = "md",
  label = "Loading",
  className,
  ...props
}: SpinnerProps) {
  return (
    <span
      className={cn(
        styles.spinner,
        size === "sm" ? styles.spinnerSm : styles.spinnerMd,
        className
      )}
      role="status"
      aria-label={label}
      {...props}
    />
  );
}

