"use client";

import { SelectHTMLAttributes } from "react";
import styles from "./input.module.css";
import { cn } from "./cn";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  invalid?: boolean;
};

function ChevronDownIcon(props: { className?: string }) {
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Select({ invalid, className, children, ...props }: SelectProps) {
  return (
    <span className={styles.selectWrap}>
      <select
        className={cn(
          styles.control,
          styles.select,
          invalid && styles.invalid,
          className
        )}
        aria-invalid={invalid || undefined}
        {...props}
      >
        {children}
      </select>
      <ChevronDownIcon className={styles.chevron} />
    </span>
  );
}

