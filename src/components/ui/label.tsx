"use client";

import { ComponentPropsWithoutRef } from "react";
import styles from "./typography.module.css";
import { cn } from "./cn";

export type LabelProps = ComponentPropsWithoutRef<"label"> & {
  required?: boolean;
};

export function Label({ required, className, children, ...props }: LabelProps) {
  return (
    <label className={cn(styles.label, className)} {...props}>
      <span>{children}</span>
      {required ? (
        <span className={styles.requiredMark} aria-hidden="true">
          *
        </span>
      ) : null}
    </label>
  );
}

