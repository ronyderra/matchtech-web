"use client";

import { HTMLAttributes } from "react";
import styles from "./form.module.css";
import { cn } from "./cn";

export type ErrorMessageProps = HTMLAttributes<HTMLParagraphElement>;

export function ErrorMessage({ className, ...props }: ErrorMessageProps) {
  return <p className={cn(styles.error, className)} {...props} />;
}

