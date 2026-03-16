"use client";

import { TextareaHTMLAttributes } from "react";
import styles from "./input.module.css";
import { cn } from "./cn";

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean;
};

export function TextArea({ invalid, className, ...props }: TextAreaProps) {
  return (
    <textarea
      className={cn(
        styles.control,
        styles.textarea,
        invalid && styles.invalid,
        className
      )}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}

