"use client";

import { HTMLAttributes } from "react";
import styles from "./filtering.module.css";
import { cn } from "./cn";

export type FilterPanelProps = HTMLAttributes<HTMLDivElement>;

export function FilterPanel({ className, ...props }: FilterPanelProps) {
  return <div className={cn(styles.filterPanel, className)} {...props} />;
}

