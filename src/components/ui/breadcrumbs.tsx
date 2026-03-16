"use client";

import Link from "next/link";
import styles from "./navigation-2.module.css";
import { cn } from "./cn";

export type BreadcrumbItem = {
  href?: string;
  label: string;
  active?: boolean;
};

export type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      className={cn(styles.breadcrumbs, className)}
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const content = item.href && !isLast ? (
          <Link href={item.href} className={styles.crumbLink}>
            {item.label}
          </Link>
        ) : (
          <span className={styles.crumbCurrent}>{item.label}</span>
        );
        return (
          <span key={item.label} style={{ display: "inline-flex", alignItems: "center" }}>
            {index > 0 && <span aria-hidden="true">/</span>}
            {content}
          </span>
        );
      })}
    </nav>
  );
}

