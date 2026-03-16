"use client";

import { HTMLAttributes, ReactNode } from "react";
import styles from "./filtering.module.css";
import { cn } from "./cn";

export type FilterGroupProps = HTMLAttributes<HTMLDivElement> & {
  title?: ReactNode;
};

export function FilterGroup({ title, className, children, ...props }: FilterGroupProps) {
  return (
    <section className={cn(styles.filterGroup, className)} {...props}>
      {title ? <div className={styles.filterGroupTitle}>{title}</div> : null}
      {children}
    </section>
  );
}

