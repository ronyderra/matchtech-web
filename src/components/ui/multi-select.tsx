"use client";

import { useState } from "react";
import styles from "./advanced-inputs.module.css";
import { cn } from "./cn";
import { Chip } from "./chip";

export type MultiSelectOption = {
  value: string;
  label: string;
};

export type MultiSelectProps = {
  options: MultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
};

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);

  function toggleOption(optionValue: string) {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  }

  const selectedOptions = options.filter((opt) => value.includes(opt.value));

  return (
    <div className={styles.multiRoot}>
      <div
        className={styles.multiField}
        onClick={() => setOpen((prev) => !prev)}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selectedOptions.length === 0 ? (
          <span style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-body-sm)" }}>
            {placeholder}
          </span>
        ) : (
          selectedOptions.map((opt) => (
            <Chip key={opt.value}>{opt.label}</Chip>
          ))
        )}
      </div>
      <div className={styles.multiDropdown}>
        {open && (
          <div className={styles.multiMenu} role="listbox">
            {options.map((opt) => {
              const selected = value.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  className={styles.multiOption}
                  onClick={() => toggleOption(opt.value)}
                >
                  <span>{opt.label}</span>
                  {selected ? <span aria-hidden="true">✓</span> : null}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

