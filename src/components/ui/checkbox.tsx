"use client";

import { InputHTMLAttributes, ReactNode } from "react";
import styles from "./toggle.module.css";
import { cn } from "./cn";

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "children"
> & {
  children?: ReactNode;
};

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Checkbox({ className, children, ...props }: CheckboxProps) {
  return (
    <label className={cn(styles.row, className)}>
      <input type="checkbox" className={styles.checkboxInput} {...props} />
      <span className={styles.checkboxBox} aria-hidden="true">
        <CheckIcon />
      </span>
      {children ? <span className={styles.labelText}>{children}</span> : null}
    </label>
  );
}

