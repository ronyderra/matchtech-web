"use client";

import type React from "react";
import { HTMLAttributes, ReactNode } from "react";
import styles from "./layout.module.css";
import { cn } from "./cn";

export type DividerProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  label?: ReactNode;
};

export function Divider({ label, className, ...props }: DividerProps) {
  if (!label) {
    return (
      <hr
        className={cn(styles.divider, className)}
        {...(props as unknown as React.HTMLAttributes<HTMLHRElement>)}
      />
    );
  }

  return (
    <div className={cn(styles.dividerWithLabel, className)} {...props}>
      <span className={styles.dividerLine} aria-hidden="true" />
      <span className={styles.dividerLabel}>{label}</span>
      <span className={styles.dividerLine} aria-hidden="true" />
    </div>
  );
}

