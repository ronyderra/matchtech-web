"use client";

import styles from "./navigation-2.module.css";
import { cn } from "./cn";

export type PaginationProps = {
  page: number;
  pageCount: number;
  onPageChange?: (page: number) => void;
  className?: string;
};

export function Pagination({
  page,
  pageCount,
  onPageChange,
  className,
}: PaginationProps) {
  const canPrev = page > 1;
  const canNext = page < pageCount;

  function goTo(next: number) {
    if (next < 1 || next > pageCount) return;
    onPageChange?.(next);
  }

  const pages = [];
  for (let i = 1; i <= pageCount; i += 1) {
    pages.push(i);
  }

  return (
    <div className={cn(styles.pagination, className)} aria-label="Pagination">
      <button
        type="button"
        className={styles.pageButton}
        onClick={() => goTo(page - 1)}
        disabled={!canPrev}
      >
        Prev
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          className={cn(
            styles.pageButton,
            p === page && styles.pageButtonActive
          )}
          onClick={() => goTo(p)}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        className={styles.pageButton}
        onClick={() => goTo(page + 1)}
        disabled={!canNext}
      >
        Next
      </button>
    </div>
  );
}

