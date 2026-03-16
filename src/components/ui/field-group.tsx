"use client";

import { HTMLAttributes, ReactNode } from "react";
import styles from "./form-utilities.module.css";
import { cn } from "./cn";

export type FieldGroupProps = HTMLAttributes<HTMLDivElement> & {
  label?: ReactNode;
  hint?: ReactNode;
};

export function FieldGroup({
  label,
  hint,
  className,
  children,
  ...props
}: FieldGroupProps) {
  return (
    <div className={cn(styles.fieldGroup, className)} {...props}>
      {label ? (
        <div className={styles.fieldGroupLabel}>{label}</div>
      ) : null}
      {hint ? <div className={styles.fieldGroupHint}>{hint}</div> : null}
      {children}
    </div>
  );
}

