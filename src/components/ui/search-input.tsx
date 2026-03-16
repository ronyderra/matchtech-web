"use client";

import { ChangeEvent } from "react";
import styles from "./advanced-inputs.module.css";
import { cn } from "./cn";
import { Input } from "./input";

export type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  loading?: boolean;
  onClear?: () => void;
  fullWidth?: boolean;
};

export function SearchInput({
  value,
  onChange,
  placeholder,
  loading,
  onClear,
  fullWidth = true,
}: SearchInputProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  const showClear = !!value && !loading && !!onClear;

  return (
    <div className={cn(styles.searchRoot, fullWidth && "w-full")}>
      <span className={styles.searchIcon} aria-hidden="true">
        🔍
      </span>
      <Input
        className={styles.searchInput}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <span className={styles.searchClear}>
        {loading ? (
          <span aria-hidden="true">⏳</span>
        ) : showClear ? (
          <button
            type="button"
            className={styles.searchClearButton}
            onClick={onClear}
            aria-label="Clear search"
          >
            ✕
          </button>
        ) : null}
      </span>
    </div>
  );
}

