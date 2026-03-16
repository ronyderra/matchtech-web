"use client";

import { HTMLAttributes } from "react";
import styles from "./surface.module.css";
import { cn } from "./cn";

export type ChipVariant = "default" | "primary" | "success" | "danger";

export type ChipProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: ChipVariant;
};

export function Chip({ variant = "default", className, ...props }: ChipProps) {
  return (
    <span
      className={cn(
        styles.chip,
        variant === "primary" && styles.chipPrimary,
        variant === "success" && styles.chipSuccess,
        variant === "danger" && styles.chipDanger,
        className
      )}
      {...props}
    />
  );
}

