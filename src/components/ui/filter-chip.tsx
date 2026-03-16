"use client";

import { HTMLAttributes } from "react";
import styles from "./filtering.module.css";
import { cn } from "./cn";

export type FilterChipProps = HTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
};

export function FilterChip({ active, className, children, ...props }: FilterChipProps) {
  return (
    <button
      type="button"
      className={cn(
        styles.filterChip,
        active && styles.filterChipActive,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

