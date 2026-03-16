"use client";

import { InputHTMLAttributes, ReactNode } from "react";
import styles from "./toggle.module.css";
import { cn } from "./cn";

export type SwitchProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "children"
> & {
  children?: ReactNode;
};

export function Switch({ className, children, ...props }: SwitchProps) {
  return (
    <label className={cn(styles.row, className)}>
      <input
        type="checkbox"
        className={styles.switchInput}
        role="switch"
        {...props}
      />
      <span className={styles.switchTrack} aria-hidden="true">
        <span className={styles.switchThumb} />
      </span>
      {children ? <span className={styles.labelText}>{children}</span> : null}
    </label>
  );
}

