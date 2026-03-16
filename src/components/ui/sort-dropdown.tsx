"use client";

import styles from "./filtering.module.css";
import { DropdownMenu } from "./dropdown-menu";

export type SortOption = {
  id: string;
  label: string;
};

export type SortDropdownProps = {
  value: string;
  options: SortOption[];
  onChange: (id: string) => void;
};

export function SortDropdown({ value, options, onChange }: SortDropdownProps) {
  const active = options.find((opt) => opt.id === value);
  return (
    <span className={styles.sortDropdown}>
      <DropdownMenu
        triggerLabel={active ? `Sort: ${active.label}` : "Sort"}
        items={options.map((opt) => ({ id: opt.id, label: opt.label }))}
        onSelectItem={onChange}
      />
    </span>
  );
}

