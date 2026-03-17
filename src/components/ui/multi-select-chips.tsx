"use client";

import { useMemo } from "react";
import styles from "./advanced-inputs.module.css";
import { cn } from "./cn";
import { Chip } from "./chip";

export type MultiSelectChipsOption = {
  value: string;
  label: string;
};

export type MultiSelectChipsProps = {
  options: MultiSelectChipsOption[];
  value: string[];
  onChange: (value: string[]) => void;
  maxSelected?: number;
};

export function MultiSelectChips({
  options,
  value,
  onChange,
  maxSelected,
}: MultiSelectChipsProps) {
  const selectedSet = useMemo(() => new Set(value), [value]);
  function toggle(optionValue: string) {
    if (selectedSet.has(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
      return;
    }
    if (maxSelected !== undefined && value.length >= maxSelected) return;
    onChange([...value, optionValue]);
  }

  return (
    <div className={styles.multiChipsRoot} role="group" aria-label="Multi select">
      <div className={styles.multiChipsOptions}>
        {options.map((opt) => {
          const selected = selectedSet.has(opt.value);
          const disabled =
            !selected && maxSelected !== undefined && value.length >= maxSelected;
          return (
            <button
              key={opt.value}
              type="button"
              className={styles.multiChipButton}
              onClick={() => toggle(opt.value)}
              disabled={disabled}
              aria-pressed={selected}
              aria-disabled={disabled}
            >
              <Chip
                className={cn(
                  selected && styles.multiChipSelected,
                  disabled && styles.multiChipDisabled
                )}
              >
                {opt.label}
              </Chip>
            </button>
          );
        })}
      </div>
      {maxSelected !== undefined ? (
        <div className={styles.multiChipsHint}>
          {value.length}/{maxSelected} selected
        </div>
      ) : null}
    </div>
  );
}

