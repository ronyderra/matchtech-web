"use client";

import { HTMLAttributes } from "react";
import styles from "./surface.module.css";
import { cn } from "./cn";

export type BadgeProps = HTMLAttributes<HTMLSpanElement>;

export function Badge({ className, ...props }: BadgeProps) {
  return <span className={cn(styles.badge, className)} {...props} />;
}

