"use client";

import { InputHTMLAttributes } from "react";
import styles from "./input.module.css";
import { cn } from "./cn";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

export function Input({ invalid, className, ...props }: InputProps) {
  return (
    <input
      className={cn(styles.control, invalid && styles.invalid, className)}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}

