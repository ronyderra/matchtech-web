"use client";

import { HTMLAttributes, ReactNode } from "react";
import styles from "./filtering.module.css";
import { cn } from "./cn";
import { FilterChip } from "./filter-chip";

export type ActiveFilter = {
  id: string;
  label: ReactNode;
};

export type ActiveFiltersBarProps = HTMLAttributes<HTMLDivElement> & {
  filters: ActiveFilter[];
  onRemove?: (id: string) => void;
  onClearAll?: () => void;
};

export function ActiveFiltersBar({
  filters,
  onRemove,
  onClearAll,
  className,
  ...props
}: ActiveFiltersBarProps) {
  if (filters.length === 0) return null;

  return (
    <div className={cn(styles.activeFiltersBar, className)} {...props}>
      <span className={styles.activeFiltersLabel}>Filters:</span>
      {filters.map((filter) => (
        <FilterChip
          key={filter.id}
          active
          onClick={() => onRemove?.(filter.id)}
        >
          {filter.label} ✕
        </FilterChip>
      ))}
      {onClearAll ? (
        <button
          type="button"
          className={styles.filterChip}
          onClick={onClearAll}
        >
          Clear all
        </button>
      ) : null}
    </div>
  );
}

